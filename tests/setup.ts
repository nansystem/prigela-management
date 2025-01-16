import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

// Piniaの初期化
const pinia = createPinia()
setActivePinia(pinia)

// Vue Test Utilsのグローバル設定
config.global.plugins = [pinia]
config.global.mocks = {
  $t: (msg: string) => msg
}
