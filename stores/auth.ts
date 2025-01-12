import { defineStore } from 'pinia'
import { useSupabase } from '~/utils/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    session: null as any,
    loading: false
  }),

  actions: {
    async initialize() {
      this.loading = true
      const supabase = useSupabase()

      const {
        data: { session },
        error
      } = await supabase.auth.getSession()
      if (error) throw error

      this.session = session
      this.user = session?.user ?? null

      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((_event, session) => {
        this.session = session
        this.user = session?.user ?? null
      })

      this.loading = false
      return subscription
    },

    async signOut() {
      const supabase = useSupabase()
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.user = null
      this.session = null
    }
  },

  getters: {
    isAuthenticated: state => !!state.user
  }
})
