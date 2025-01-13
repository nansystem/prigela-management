import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/supabase-types'

let supabase: SupabaseClient<Database>

export const useSupabase = (): SupabaseClient<Database> => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabaseKey as string

  if (!supabase) {
    supabase = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  }
  return supabase
}

export default defineNuxtPlugin(() => {
  const supabase = useSupabase()
  return {
    provide: {
      supabase
    }
  }
})
