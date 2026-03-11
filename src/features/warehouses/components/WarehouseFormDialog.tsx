import { useEffect } from "react"
import { useForm } from "react-hook-form"
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
import { useCreateWarehouse, useUpdateWarehouse } from "@/features/warehouses/hooks/useWarehouses"
import type { Warehouse } from "@/types"

const warehouseSchema = z.object({
  name: z.string().trim().min(2, "Warehouse name must be at least 2 characters"),
  location: z.string().trim().min(2, "Location is required"),
  capacity: z.number().int("Must be a whole number").min(1, "Capacity must be greater than 0"),
  manager: z.string().trim().min(2, "Manager name is required"),
})

type WarehouseFormValues = z.infer<typeof warehouseSchema>

const EMPTY_VALUES: WarehouseFormValues = { name: "", location: "", capacity: 1000, manager: "" }

interface WarehouseFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  warehouse?: Warehouse | null
}

export function WarehouseFormDialog({ open, onOpenChange, warehouse }: WarehouseFormDialogProps) {
  const isEditing = Boolean(warehouse)
  const createWarehouse = useCreateWarehouse()
  const updateWarehouse = useUpdateWarehouse()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WarehouseFormValues>({ resolver: zodResolver(warehouseSchema), defaultValues: EMPTY_VALUES })

  useEffect(() => {
    if (open) {
      reset(
        warehouse
          ? { name: warehouse.name, location: warehouse.location, capacity: warehouse.capacity, manager: warehouse.manager }
          : EMPTY_VALUES
      )
    }
  }, [open, warehouse, reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (isEditing && warehouse) {
        await updateWarehouse.mutateAsync({ id: warehouse.id, input: values })
        toast.success(`"${values.name}" updated`)
      } else {
        await createWarehouse.mutateAsync(values)
        toast.success(`"${values.name}" added`)
      }
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    }
  })

  const isPending = isSubmitting || createWarehouse.isPending || updateWarehouse.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Warehouse" : "Add Warehouse"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update this warehouse's details." : "Add a new warehouse location."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="w-name">Warehouse Name</Label>
            <Input id="w-name" aria-invalid={!!errors.name} {...register("name")} />
            {errors.name && <p className="text-caption text-danger">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="w-location">Location</Label>
            <Input id="w-location" placeholder="City, State" aria-invalid={!!errors.location} {...register("location")} />
            {errors.location && <p className="text-caption text-danger">{errors.location.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="w-capacity">Capacity</Label>
              <Input id="w-capacity" type="number" min="1" step="1" aria-invalid={!!errors.capacity} {...register("capacity", { valueAsNumber: true })} />
              {errors.capacity && <p className="text-caption text-danger">{errors.capacity.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="w-manager">Manager</Label>
              <Input id="w-manager" aria-invalid={!!errors.manager} {...register("manager")} />
              {errors.manager && <p className="text-caption text-danger">{errors.manager.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : isEditing ? "Save Changes" : "Add Warehouse"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
