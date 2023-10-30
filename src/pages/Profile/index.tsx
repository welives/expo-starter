import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Drawer } from 'react-native-drawer-layout'
import React from 'react'
import { tw } from '~/utils'
import { useCounterStore } from '~/models'

export default () => {
  const [open, setOpen] = React.useState(false)
  const { count, inc, dec } = useCounterStore()
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return (
          <View style={tw`flex-1 items-center justify-center`}>
            <Text>Drawer content</Text>
          </View>
        )
      }}
    >
      <SafeAreaView style={tw`flex-1 items-center justify-center`}>
        <Button onPress={() => setOpen((prevOpen) => !prevOpen)} title={`${open ? 'Close' : 'Open'} drawer`} />
        <View style={tw`mt-3 items-center justify-center`}>
          <Button title="increment" onPress={inc}></Button>
          <Text>{count}</Text>
          <Button title="decrement" onPress={dec}></Button>
        </View>
      </SafeAreaView>
    </Drawer>
  )
}
