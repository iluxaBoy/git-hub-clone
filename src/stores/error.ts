import type { CustomError, ExtendedPostgresError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  type ActiveError = CustomError | null | ExtendedPostgresError
  type SetErrorParams = {
    error: string | PostgrestError | Error
    customCode?: number
  }

  const activeError = ref<ActiveError>(null)
  const isCustomError = ref(false)

  const setError = ({ error, customCode }: SetErrorParams) => {
    if (typeof error === 'string') isCustomError.value = true

    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customerCode = customCode || 500
      return
    }

    activeError.value = error
    activeError.value.statusCode = customCode || 500
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    setError,
    isCustomError,
    clearError,
  }
})
