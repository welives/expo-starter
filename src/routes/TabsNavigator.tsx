import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { TabsStacks, TabsStackParamList, TabsStackScreenProps } from './types'
import { HomeScreen, ProfileScreen } from '../pages'

interface TabScreenOptions {
  title: string
  component: React.FC<TabsStackScreenProps<TabsStacks>>
  options: BottomTabNavigationOptions
}

const TabScreens: Record<TabsStacks, TabScreenOptions> = {
  [TabsStacks.HOME]: {
    title: 'Home',
    component: HomeScreen,
    options: {},
  },
  [TabsStacks.PROFILE]: {
    title: 'Profile',
    component: ProfileScreen,
    options: {},
  },
}
const Tabs = createBottomTabNavigator<TabsStackParamList>()
export default () => {
  return (
    <Tabs.Navigator
      initialRouteName={TabsStacks.HOME}
      screenOptions={() => {
        return {
          headerShown: false,
        }
      }}
    >
      {Object.entries(TabScreens).map(([key, value]) => (
        <Tabs.Screen
          key={key}
          name={key as TabsStacks}
          component={value.component}
          options={() => {
            return {
              tabBarLabel: value.title,
              headerTitleAlign: 'center',
              ...(value.options || {}),
            }
          }}
        ></Tabs.Screen>
      ))}
    </Tabs.Navigator>
  )
}
