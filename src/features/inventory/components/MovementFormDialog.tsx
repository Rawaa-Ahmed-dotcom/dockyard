import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCreateMovement } from "@/features/inventory/hooks/useInventory"
import { useProducts } from "@/features/products/hooks/useProducts"
import { useWarehouses } from "@/features/warehouses/hooks/useWarehouses"
import type { MovementType } from "@/types"

const MOVEMENT_TABS: { value: MovementType; label: string }[] = [
  { value: "stock-in", label: "Stock In" },
  { value: "stock-out", label: "Stock Out" },
  { value: "adjustment", label: "Adjustment" },
  { value: "transfer", label: "Transfer" },
]

const movementSchema = z
  .object({
    type: z.enum(["stock-in", "stock-out", "adjustment", "transfer"]),
    productId: z.string().min(1, "Select a product"),
    quantity: z.number().int("Must be a whole number").min(0, "Can't be negative"),
    toWarehouseId: z.string().optional(),
    reason: z.string().trim().min(3, "Add a short reason for this movement"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "transfer" && !data.toWarehouseId) {
      ctx.addIssue({ code: "custom", path: ["toWarehouseId"], message: "Select a destination warehouse" })
    }
    if (data.type !== "adjustment" && data.quantity < 1) {
      ctx.addIssue({ code: "custom", path: ["quantity"], message: "Quantity must be at least 1" })
    }
  })

type MovementFormValues = z.infer<typeof movementSchema>

interface MovementFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultType?: MovementType
}

export function MovementFormDialog({ open, onOpenChange, defaultType = "stock-in" }: MovementFormDialogProps) {
  const { data: products } = useProducts()
  const { data: warehouses } = useWarehouses()
  const createMovement = useCreateMovement()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MovementFormValues>({
    resolver: zodResolver(movementSchema),
    defaultValues: { type: defaultType, productId: "", quantity: 0, toWarehouseId: "", reason: "" },
  })

  useEffect(() => {
    if (open) reset({ type: defaultType, productId: "", quantity: 0, toWarehouseId: "", reason: "" })
  }, [open, defaultType, reset])

  const type = watch("type")
  const productId = watch("productId")
  const selectedProduct = products?.find((p) => p.id === productId)

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createMovement.mutateAsync({
        type: values.type,
        productId: values.productId,
        quantity: values.quantity,
        fromWarehouseId: selectedProduct?.warehouseId ?? null,
        toWarehouseId: values.type === "transfer" ? values.toWarehouseId ?? null : null,
        reason: values.reason,
        createdBy: "You",
      })
      toast.success("Movement recorded")
      onOpenChange(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError("quantity", { message })
      toast.error(message)
    }
  })

  const quantityLabel = type === "adjustment" ? "New Quantity" : "Quantity"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Movement</DialogTitle>
          <DialogDescription>Record a stock change and keep every movement traceable.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Tabs value={field.value} onValueChange={field.onChange}>
                <TabsList className="grid w-full grid-cols-4">
                  {MOVEMENT_TABS.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="productId">Product</Label>
            <Controller
              control={control}
              name="productId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="productId" aria-invalid={!!errors.productId}>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products?.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} · {p.sku}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.productId && <p className="text-caption text-danger">{errors.productId.message}</p>}
            {selectedProduct && (
              <p className="text-caption text-muted-foreground">
                Currently {selectedProduct.quantity} units in {warehouses?.find((w) => w.id === selectedProduct.warehouseId)?.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="quantity">{quantityLabel}</Label>
              <Input id="quantity" type="number" min="0" step="1" aria-invalid={!!errors.quantity} {...register("quantity", { valueAsNumber: true })} />
              {errors.quantity && <p className="text-caption text-danger">{errors.quantity.message}</p>}
            </div>

            {type === "transfer" && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="toWarehouseId">Destination</Label>
                <Controller
                  control={control}
                  name="toWarehouseId"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="toWarehouseId" aria-invalid={!!errors.toWarehouseId}>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses
                          ?.filter((w) => w.id !== selectedProduct?.warehouseId)
                          .map((w) => (
                            <SelectItem key={w.id} value={w.id}>
                              {w.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.toWarehouseId && <p className="text-caption text-danger">{errors.toWarehouseId.message}</p>}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reason">Reason</Label>
            <Input id="reason" placeholder="e.g. Purchase order received" aria-invalid={!!errors.reason} {...register("reason")} />
            {errors.reason && <p className="text-caption text-danger">{errors.reason.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Record Movement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
