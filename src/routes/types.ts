import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export enum AppStacks {
  ONBOARDING = 'ONBOARDING',
  BOTTOM_TABS = 'BOTTOM_TABS',
}

export enum TabsStacks {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
}

//********************************
// 嵌套导航的类型检查详细文档看这里
// https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
//********************************

export type AppStackParamList = {
  // 规律: 如果存在嵌套导航, 则用子级的参数类型来当作 NavigatorScreenParams 的泛型
  BOTTOM_TABS: NavigatorScreenParams<TabsStackParamList> | undefined
} & {
  [K in Exclude<keyof typeof AppStacks, 'BOTTOM_TABS'>]: undefined
}
export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>

export type TabsStackParamList = {
  [K in keyof typeof TabsStacks]: undefined
}
export type TabsStackScreenProps<T extends keyof TabsStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabsStackParamList, T>,
  // 规律: 如果存在嵌套导航, props 类型找它的父级导航进行组合就对了
  AppStackScreenProps<keyof typeof AppStacks>
>

export type RootStacks = AppStacks | TabsStacks
export type RootStackParamList = Prettify<AppStackParamList & TabsStackParamList>
export type RootStackScreenProps<T extends keyof RootStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, T>,
  BottomTabScreenProps<TabsStackParamList>
>
