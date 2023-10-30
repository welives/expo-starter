import { MMKV } from 'react-native-mmkv'

// 定义不同场景下的mmkv存储键
enum MMKVSceneKey {
  DEVICE = 'mmkv-device-uuid',
  USER = 'mmkv-user',
}
// 创建默认的 mmkv 实例
const storage = new MMKV()
function getItem<T>(key: string): T {
  const value = storage.getString(key)
  return value ? JSON.parse(value) ?? null : null
}
function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value))
}
function removeItem(key: string) {
  storage.delete(key)
}

export { storage, getItem, setItem, removeItem, MMKVSceneKey }
