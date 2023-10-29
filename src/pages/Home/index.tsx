import { View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { tw } from '~/core/utils'
import { TabsStackScreenProps, TabsStacks } from '~/routes/types'

type Props = TabsStackScreenProps<TabsStacks>
export default ({ navigation }: Props) => {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View>
        <Button title="Go Orboarding" onPress={() => navigation.navigate('ONBOARDING')}></Button>
      </View>
    </SafeAreaView>
  )
}
