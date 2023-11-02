
// requiring libraries
import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
// requiring modules
import styles from './styles';


export default function App({ route, navigation }) {

  const param = route.params // navigation data


  const [code, setCode] = useState('') // data from input
  
  
  async function check () {
    //compare with admin code
    if ( code != param.admin ) { // accepted
      navigation.navigate('Splash')
    } else { // rejected
      navigation.navigate('AdminPanel',param)
    }
  }
  

  // rendering
  return (

    <View style={styles.container}>

      <Text style={styles.inputName}>Код аккаунта</Text>

      <TextInput style={styles.input}
                  placeholder=''
                  placeholderTextColor={'#5c4644'}
                  maxLength={8}
                  onChangeText={(e) => setCode(e)}/>
                  
      <Text style={[styles.button, {fontWeight: '700'}]} onPress={check}>
        Войти
      </Text>

    </View>

  );

}
