import { View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { tw } from '~/core/utils'
import { AppStackScreenProps, AppStacks } from '~/routes/types'

type Props = AppStackScreenProps<AppStacks>
export default ({ navigation }: Props) => {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View>
        <Button title="Go Profile" onPress={() => navigation.navigate('BOTTOM_TABS', { screen: 'PROFILE' })}></Button>
      </View>
    </SafeAreaView>
  )
}
