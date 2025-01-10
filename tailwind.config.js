/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // カスタムのプライマリカラー
        secondary: '#9333ea' // カスタムのセカンダリカラー
      }
    }
  },
  plugins: []
}
