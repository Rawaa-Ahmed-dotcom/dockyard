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
import { useCreateProduct, useUpdateProduct } from "@/features/products/hooks/useProducts"
import { PRODUCT_CATEGORIES } from "@/features/products/constants"
import { useWarehouses } from "@/features/warehouses/hooks/useWarehouses"
import type { Product } from "@/types"

const productSchema = z.object({
  name: z.string().trim().min(2, "Product name must be at least 2 characters"),
  sku: z
    .string()
    .trim()
    .min(3, "SKU must be at least 3 characters")
    .regex(/^[A-Za-z0-9-]+$/, "SKU can only contain letters, numbers, and hyphens"),
  category: z.string().min(1, "Select a category"),
  warehouseId: z.string().min(1, "Select a warehouse"),
  costPrice: z.number().min(0, "Cost price can't be negative"),
  sellingPrice: z.number().min(0, "Selling price can't be negative"),
  quantity: z.number().int("Quantity must be a whole number").min(0, "Quantity can't be negative"),
  reorderThreshold: z
    .number()
    .int("Threshold must be a whole number")
    .min(0, "Threshold can't be negative"),
  description: z.string().trim().max(500, "Keep the description under 500 characters").optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  sku: "",
  category: "",
  warehouseId: "",
  costPrice: 0,
  sellingPrice: 0,
  quantity: 0,
  reorderThreshold: 10,
  description: "",
}

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
}

export function ProductFormDialog({ open, onOpenChange, product }: ProductFormDialogProps) {
  const isEditing = Boolean(product)
  const { data: warehouses } = useWarehouses()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: EMPTY_VALUES,
  })

  useEffect(() => {
    if (open) {
      reset(
        product
          ? {
              name: product.name,
              sku: product.sku,
              category: product.category,
              warehouseId: product.warehouseId,
              costPrice: product.costPrice,
              sellingPrice: product.sellingPrice,
              quantity: product.quantity,
              reorderThreshold: product.reorderThreshold,
              description: product.description,
            }
          : EMPTY_VALUES
      )
    }
  }, [open, product, reset])

  const onSubmit = handleSubmit(async (values) => {
    const input = { ...values, description: values.description ?? "" }
    try {
      if (isEditing && product) {
        await updateProduct.mutateAsync({ id: product.id, input })
        toast.success(`"${values.name}" updated`)
      } else {
        await createProduct.mutateAsync(input)
        toast.success(`"${values.name}" added to inventory`)
      }
      onOpenChange(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError("sku", { message })
      toast.error(message)
    }
  })

  const isPending = isSubmitting || createProduct.isPending || updateProduct.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the product details below." : "Fill in the details to add a new product."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="e.g. Wireless Barcode Scanner" aria-invalid={!!errors.name} {...register("name")} />
              {errors.name && <p className="text-caption text-danger">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" placeholder="e.g. ELE-1001" aria-invalid={!!errors.sku} {...register("sku")} />
              {errors.sku && <p className="text-caption text-danger">{errors.sku.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="category" aria-invalid={!!errors.category}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-caption text-danger">{errors.category.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="warehouseId">Warehouse</Label>
              <Controller
                control={control}
                name="warehouseId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="warehouseId" aria-invalid={!!errors.warehouseId}>
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses?.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.warehouseId && <p className="text-caption text-danger">{errors.warehouseId.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="costPrice">Cost Price</Label>
              <Input id="costPrice" type="number" step="0.01" min="0" aria-invalid={!!errors.costPrice} {...register("costPrice", { valueAsNumber: true })} />
              {errors.costPrice && <p className="text-caption text-danger">{errors.costPrice.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sellingPrice">Selling Price</Label>
              <Input id="sellingPrice" type="number" step="0.01" min="0" aria-invalid={!!errors.sellingPrice} {...register("sellingPrice", { valueAsNumber: true })} />
              {errors.sellingPrice && <p className="text-caption text-danger">{errors.sellingPrice.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" min="0" step="1" aria-invalid={!!errors.quantity} {...register("quantity", { valueAsNumber: true })} />
              {errors.quantity && <p className="text-caption text-danger">{errors.quantity.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reorderThreshold">Reorder Threshold</Label>
              <Input
                id="reorderThreshold"
                type="number"
                min="0"
                step="1"
                aria-invalid={!!errors.reorderThreshold}
                {...register("reorderThreshold", { valueAsNumber: true })}
              />
              {errors.reorderThreshold && <p className="text-caption text-danger">{errors.reorderThreshold.message}</p>}
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                rows={3}
                placeholder="Short description shown on the product detail view"
                className="flex w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-small text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                {...register("description")}
              />
              {errors.description && <p className="text-caption text-danger">{errors.description.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : isEditing ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
