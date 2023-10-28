declare module '@env' {
  interface Env {
    NODE_ENV: 'development' | 'test' | 'production'
    API_KEY: string
  }
  export const Env: Env
}
