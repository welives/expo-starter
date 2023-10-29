import Constants from 'expo-constants'
const Env = Constants.expoConfig?.extra ?? {}
if (Env.hasOwnProperty('eas')) {
  delete Env.eas
}
export { Env }
