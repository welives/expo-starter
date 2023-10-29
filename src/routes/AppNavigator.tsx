import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStacks, AppStackParamList, AppStackScreenProps } from './types'
import { OnboardingScreen } from '../pages'
import TabsNavigator from './TabsNavigator'

interface AppScreenOptions {
  title: string
  component: React.FC<AppStackScreenProps<AppStacks>>
  options: NativeStackNavigationOptions
}

const AppScreens: Record<AppStacks, AppScreenOptions> = {
  [AppStacks.BOTTOM_TABS]: {
    title: 'BottomTabs',
    component: TabsNavigator,
    options: {
      headerShown: false, // 隐藏tabbar屏幕的导航栏
    },
  },
  [AppStacks.ONBOARDING]: {
    title: 'Onboarding',
    component: OnboardingScreen,
    options: { headerShown: false },
  },
}
const AppStack = createNativeStackNavigator<AppStackParamList>()
export default () => {
  return (
    <AppStack.Navigator
      initialRouteName={AppStacks.ONBOARDING}
      screenOptions={() => {
        return { gestureEnabled: false }
      }}
    >
      {Object.entries(AppScreens).map(([key, value]) => (
        <AppStack.Screen
          key={key}
          name={key as AppStacks}
          component={value.component}
          options={() => {
            return {
              title: value.title,
              headerTitleAlign: 'center',
              ...(value.options || {}),
            }
          }}
        />
      ))}
    </AppStack.Navigator>
  )
}
