import { MutationCache, QueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess(_data, _variables, _context, mutation) {
      queryClient.invalidateQueries({
        queryKey: mutation.options.mutationKey,
      })
    },
    onError(error, _variables, _context, _mutation) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message)
      }
      return toast.error(error.message)
    },
  }),
})
