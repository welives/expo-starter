import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import createSelectors from './selectors'

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
  immer((set, get) => ({
    token: '',
    isLogged: false,
    setToken: (token) => set({ token, isLogged: true }),
    removeToken: () => set({ token: '', isLogged: false }),
  }))
)
export const useUserStore = createSelectors(userStore)
export function useUserReset() {
  userStore.setState(initialState)
}
