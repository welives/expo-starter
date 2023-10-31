import './src/utils/global'
import 'expo-dev-client'
import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import { LogBox } from 'react-native'
import App from './src/App'
LogBox.ignoreAllLogs()

registerRootComponent(App)
