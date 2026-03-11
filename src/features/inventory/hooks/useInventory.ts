import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { createMovement, listMovements, type MovementInput } from "@/services/inventory.service"

const MOVEMENTS_KEY = ["movements"] as const

export function useMovements() {
  return useQuery({ queryKey: MOVEMENTS_KEY, queryFn: listMovements })
}

export function useCreateMovement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: MovementInput) => createMovement(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MOVEMENTS_KEY })
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] })
    },
  })
}
