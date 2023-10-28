const fs = require('fs')
const path = require('path')
const { parse } = require('dotenv')
const z = require('zod')
const NODE_ENV = process.env.NODE_ENV ?? 'development'
/**
 * 同步读取文件
 * @param {string} file
 * @returns {fs.Stats | undefined}
 */
function tryStatSync(file) {
  try {
    return fs.statSync(file, { throwIfNoEntry: false })
  } catch {}
}
/**
 * 转成数组
 * @param {string | string[]} target
 * @returns {string[]}
 */
function toArray(target) {
  return Array.isArray(target) ? target : [target]
}
/**
 * 获取env文件列表
 * @param {string} mode
 * @returns {string[]}
 */
function getEnvFilesForMode(mode) {
  return [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.${mode}`,
    /** mode local file */ `.env.${mode}.local`,
  ]
}
/**
 * 一个用于给传入变量加上环境标识的函数
 * @param {string} name
 * @returns {string}
 */
function withEnvSuffix(name) {
  return NODE_ENV === 'production' ? name : `${name}.${NODE_ENV}`
}
/**
 * 加载环境变量
 * @param {string} envDir
 * @param {string | string[]} prefixes
 * @returns {object}
 */
function loadEnv(envDir, prefixes = 'EXPO_PUBLIC_') {
  prefixes = toArray(prefixes)
  const env = {}
  const envFiles = getEnvFilesForMode(NODE_ENV)
  const parsed = Object.fromEntries(
    envFiles.flatMap((file) => {
      const filePath = path.resolve(envDir, file)
      if (!tryStatSync(filePath)?.isFile()) return []
      return Object.entries(parse(fs.readFileSync(filePath)))
    })
  )
  for (const [key, value] of Object.entries(parsed)) {
    if (prefixes.some((prefix) => !key.startsWith(prefix))) {
      env[key] = value
    }
  }
  return env
}
const config = loadEnv(__dirname)
// 定义客户端常量的类型模式
const clientSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  API_KEY: z.string(),
})
/** @type {Record<keyof z.infer<typeof clientSchema>, string | undefined>} */
const _clientEnv = {
  NODE_ENV,
  API_KEY: config.API_KEY,
}
// 定义构建工具常量的类型模式
const buildSchema = z.object({
  ANDROID_PACKAGE: z.string(),
  APPLE_BUNDLE_ID: z.string(),
  EAS_PROJECT_ID: z.string(),
  EXPO_ACCOUNT_OWNER: z.string(),
})
/** @type {Record<keyof z.infer<typeof buildSchema>, string | undefined>} */
const _buildEnv = {
  ANDROID_PACKAGE: withEnvSuffix(config.ANDROID_PACKAGE),
  APPLE_BUNDLE_ID: withEnvSuffix(config.APPLE_BUNDLE_ID),
  EAS_PROJECT_ID: config.EAS_PROJECT_ID,
  EXPO_ACCOUNT_OWNER: config.EXPO_ACCOUNT_OWNER,
}
// 合并环境变量
const _env = { ..._clientEnv, ..._buildEnv }
// 合并类型模式
const mergeSchema = buildSchema.merge(clientSchema)
const parsed = mergeSchema.safeParse(_env)
if (parsed.success === false) {
  throw new Error('无效的环境变量')
}

module.exports = {
  withEnvSuffix,
  Env: parsed.data,
  ClientEnv: clientSchema.parse(_clientEnv),
}
