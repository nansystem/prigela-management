import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { vi } from 'vitest'

// Piniaの初期化
const pinia = createPinia()
setActivePinia(pinia)

// Vue Test Utilsのグローバル設定
config.global.plugins = [pinia]
config.global.mocks = {
  $t: (msg: string) => msg
}

// グローバルなモック設定
vi.mock('~/utils/supabase', () => ({
  useSupabase: () => ({
    from: () => ({
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    })
  })
}))
