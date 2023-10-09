import React, { useRef, useState } from 'react';
import { Animated, Text, View, TextInput, FlatList, Image, TouchableHighlight } from 'react-native';
import styles from './styles';
import db from '../../Hooks/initFirebase'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'
import { Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window'); 

const aspectRatio = height/width;

let butWidth = 0

if(aspectRatio>1.6) {

  butWidth = "90%"

} else {

  butWidth = "25%"

}

let arr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

export default function App({ route, navigation }) {

  const param = route.params


  return (

    <View style={styles.container}>

      <View style={{width: butWidth}}>
        <FlatList scrollEnabled={false} data={arr} renderItem={({ item, index }) => (

          <View style={{width: '100%'}}>
                  
            <Text style={styles.button} onPress={() => navigation.navigate('ClassList',{'param': param, 'day': item})}>
              {item}
            </Text>

          </View>

        )}/>
      </View>
                  
      <Text style={[styles.button,{width: '25%', fontWeight: '700'}]} onPress={() => navigation.navigate('AdminPanel',param)}>
        Назад
      </Text>

    </View>

  );

}
