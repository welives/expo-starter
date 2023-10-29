import { Dimensions, PixelRatio } from 'react-native'

// UI设计稿尺寸,单位px
const designSize = Object.freeze({
  width: parseInt(process.env.EXPO_PUBLIC_UI_WIDTH as string),
  height: parseInt(process.env.EXPO_PUBLIC_UI_HEIGHT as string),
})
// 获取设备屏幕尺寸,单位dp
const { width, height } = Dimensions.get('window')
// 设计稿缩放比
const designScale = Object.freeze({
  w: width / designSize.width,
  h: height / designSize.height,
})
const operation = Object.freeze({
  size: (uiSize: number, based: ScaleBased) => uiSize * designScale[based],
  px2dp: (px: number) => parseFloat(PixelRatio.roundToNearestPixel(px).toFixed(2)),
})

global.dp = function (uiSize: number, based: ScaleBased = 'w') {
  return uiSize > 1 ? operation.px2dp(operation.size(uiSize, based)) : uiSize
}
