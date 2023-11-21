import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createJSONStorage, persist } from 'zustand/middleware'
import createSelectors from './selectors'
import { MMKVSceneKey, zustandStorage } from '../utils'

interface State {
  token: string
  isLogged: boolean
}
interface Action {
  setToken: (token: string) => void
  removeToken: () => void
}

const initialState: State = {
  token: '',
  isLogged: false,
}
const userStore = create<State & Action>()(
  immer(
    persist(
      (set, get) => ({
        token: '',
        isLogged: false,
        setToken: (token) => set({ token, isLogged: true }),
        removeToken: () => set({ token: '', isLogged: false }),
      }),
      {
        //! 注意这里的 name 并不是创建 mmkv 实例的 ID，而是 mmkv 持久化数据的唯一 key
        name: MMKVSceneKey.USER,
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
)

export const useUserStore = createSelectors(userStore)
export function useUserReset() {
  userStore.setState(initialState)
}
