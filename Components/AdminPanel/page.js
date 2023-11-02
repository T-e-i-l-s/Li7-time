
// requiring libraries
import React from 'react';
import { Text, View } from 'react-native';
// requiring modules
import styles from './styles';


export default function App({ route, navigation }) {

  const param = route.params // navigation data
  

  return (

    <View style={styles.container}>

      {/* buttons */}

      <Text style={styles.button} onPress={() => {navigation.navigate('Week', param)}}>
        Уроки
      </Text>

      <Text style={styles.button} onPress={() => {navigation.navigate('BellEditor', param)}}>
        Звонки
      </Text>

      <Text style={styles.button} onPress={() => {navigation.navigate('EventEditor', param)}}>
        События
      </Text>

      <Text style={[styles.button,{fontWeight: '700'}]} onPress={() => {navigation.navigate('Splash')}}>
        На главную
      </Text>

    </View>

  );

}
