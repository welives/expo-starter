import { ExpoConfig, ConfigContext } from 'expo/config'
const { name, version } = require('./package.json')
import { Env, ClientEnv } from './env'
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name,
    slug: name,
    description: '一个简单的Expo基础项目模板',
    version,
    owner: Env.EXPO_ACCOUNT_OWNER,
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
    // runtimeVersion: {
    //   policy: 'appVersion',
    // },
    ios: {
      supportsTablet: true,
      bundleIdentifier: Env.APPLE_BUNDLE_ID,
      entitlements: {
        'com.apple.developer.networking.wifi-info': true,
      },
    },
    android: {
      package: Env.ANDROID_PACKAGE,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'app-icon-badge',
        {
          enabled: Env.NODE_ENV !== 'production',
          badges: [
            { text: Env.NODE_ENV, type: 'banner', color: 'white' },
            { text: version, type: 'ribbon', color: 'white' },
          ],
        },
      ],
    ],
    extra: {
      ...ClientEnv,
      eas: {
        ...(Env.EAS_PROJECT_ID && { projectId: Env.EAS_PROJECT_ID }),
      },
    },
  }
}
