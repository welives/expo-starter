import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { tw } from '~/utils'
import { TabsStackScreenProps, TabsStacks } from '~/routes/types'
import { useCounterStore, useCounterReset } from '~/models'

type Props = TabsStackScreenProps<TabsStacks>
export default ({ navigation }: Props) => {
  const count = useCounterStore.use.count()
  const inc = useCounterStore.use.inc()
  const dec = useCounterStore.use.dec()
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View>
        <Button title="Go Orboarding" onPress={() => navigation.navigate('ONBOARDING')}></Button>
        <View style={tw`my-3 items-center justify-center`}>
          <Button title="increment" onPress={inc}></Button>
          <Text>{count}</Text>
          <Button title="decrement" onPress={dec}></Button>
        </View>
        <Button title="reset" onPress={useCounterReset}></Button>
      </View>
    </SafeAreaView>
  )
}
