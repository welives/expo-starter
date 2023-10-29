declare module '@env' {
  interface Env {
    NODE_ENV: 'development' | 'test' | 'production'
    API_KEY: string
  }
  export const Env: Env
}
type Prettify<T> = { [P in keyof T]: T[P] } & {}
type ScaleBased = 'w' | 'h'
/**
 * 获取设计稿中像素值的真实dp
 * @param uiSize 设计稿尺寸
 * @param based 基准比例方案,默认用宽度方案
 * @returns
 */
function dp(uiSize: number, based: ScaleBased = 'w'): number
