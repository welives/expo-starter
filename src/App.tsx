import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigation from './routes/AppNavigator'
import { useDeviceContext } from 'twrnc'
import { tw } from './utils'

export default function App() {
  useDeviceContext(tw) // 加载自定义TailwindCSS配置
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
