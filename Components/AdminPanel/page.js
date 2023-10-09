import React, { useRef, useState } from 'react';
import { Animated, Text, View, TextInput } from 'react-native';
import styles from './styles';


export default function App({ route, navigation }) {

  const param = route.params
  

  return (

    <View style={styles.container}>

      <Text style={styles.button} onPress={() => {navigation.navigate('Week', param)}}>
        Уроки
      </Text>

      <Text style={styles.button} onPress={() => {navigation.navigate('LessonEditor', param)}}>
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
