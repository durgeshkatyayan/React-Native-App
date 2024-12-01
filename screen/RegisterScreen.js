import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
const RegisterScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', fontSize: 30 }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 600 }} onPress={() => navigation.push('Register')}>
          Registration Form
        </Text>
        <Text onPress={()=>navigation.goBack()}>Go Back</Text>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen