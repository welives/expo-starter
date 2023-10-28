import { ExpoConfig, ConfigContext } from 'expo/config'
const { name, version } = require('./package.json')
import { ClientEnv } from './env'
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name,
    slug: name,
    description: '一个简单的Expo基础项目模板',
    version,
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    scheme: `com.${name}.linking`,
    assetBundlePatterns: ['**/*'],
    experiments: {
      tsconfigPaths: true,
    },
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    ios: {
      supportsTablet: true,
      entitlements: {
        'com.apple.developer.networking.wifi-info': true,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      ...ClientEnv,
    },
  }
}
