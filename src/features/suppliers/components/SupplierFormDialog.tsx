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
import { useCreateSupplier, useUpdateSupplier } from "@/features/suppliers/hooks/useSuppliers"
import type { Supplier } from "@/types"

const supplierSchema = z.object({
  name: z.string().trim().min(2, "Supplier name must be at least 2 characters"),
  contactPerson: z.string().trim().min(2, "Contact person is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Address is required"),
})

type SupplierFormValues = z.infer<typeof supplierSchema>

const EMPTY_VALUES: SupplierFormValues = { name: "", contactPerson: "", email: "", phone: "", address: "" }

interface SupplierFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  supplier?: Supplier | null
}

export function SupplierFormDialog({ open, onOpenChange, supplier }: SupplierFormDialogProps) {
  const isEditing = Boolean(supplier)
  const createSupplier = useCreateSupplier()
  const updateSupplier = useUpdateSupplier()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SupplierFormValues>({ resolver: zodResolver(supplierSchema), defaultValues: EMPTY_VALUES })

  useEffect(() => {
    if (open) {
      reset(
        supplier
          ? {
              name: supplier.name,
              contactPerson: supplier.contactPerson,
              email: supplier.email,
              phone: supplier.phone,
              address: supplier.address,
            }
          : EMPTY_VALUES
      )
    }
  }, [open, supplier, reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (isEditing && supplier) {
        await updateSupplier.mutateAsync({ id: supplier.id, input: values })
        toast.success(`"${values.name}" updated`)
      } else {
        await createSupplier.mutateAsync(values)
        toast.success(`"${values.name}" added`)
      }
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    }
  })

  const isPending = isSubmitting || createSupplier.isPending || updateSupplier.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Supplier" : "Add Supplier"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update this supplier's details." : "Add a new supplier to your directory."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-name">Supplier Name</Label>
            <Input id="s-name" aria-invalid={!!errors.name} {...register("name")} />
            {errors.name && <p className="text-caption text-danger">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-contact">Contact Person</Label>
            <Input id="s-contact" aria-invalid={!!errors.contactPerson} {...register("contactPerson")} />
            {errors.contactPerson && <p className="text-caption text-danger">{errors.contactPerson.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="s-email">Email</Label>
              <Input id="s-email" type="email" aria-invalid={!!errors.email} {...register("email")} />
              {errors.email && <p className="text-caption text-danger">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="s-phone">Phone</Label>
              <Input id="s-phone" type="tel" aria-invalid={!!errors.phone} {...register("phone")} />
              {errors.phone && <p className="text-caption text-danger">{errors.phone.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-address">Address</Label>
            <Input id="s-address" aria-invalid={!!errors.address} {...register("address")} />
            {errors.address && <p className="text-caption text-danger">{errors.address.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : isEditing ? "Save Changes" : "Add Supplier"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
