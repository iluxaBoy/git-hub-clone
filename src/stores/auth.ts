import { profilesQuery } from '@/utils/supaQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/database.types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }
    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profilesQuery(user.value.id)

      profile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  return {
    user,
    profile,
    setAuth,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
