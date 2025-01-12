import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient

export const useSupabase = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabaseKey as string

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  }

  return supabase
}

export const useAuthSupabase = () => {
  const client = useSupabase()

  // const user = client.auth.getUser()
  // console.info('use auth supabase user:', user)
  // if (!user) {
  //   throw new Error('User not authenticated')
  // }

  return client
}

export default defineNuxtPlugin(() => {
  const supabase = useSupabase()
  return {
    provide: {
      supabase,
      authSupabase: useAuthSupabase
    }
  }
})
