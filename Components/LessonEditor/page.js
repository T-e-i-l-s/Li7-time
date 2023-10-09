import React, { useRef, useState } from 'react';
import { Animated, Text, View, TextInput, FlatList, Image, TouchableHighlight } from 'react-native';
import styles from './styles';
import db from '../../Hooks/initFirebase'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'

let arr = []

export default function App({ route, navigation }) {

  const param = route.params

  const [reload, setReload] = useState(0)
  
  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', async () => {

      arr = []
      let a = param.time
      Object.keys(param.time).forEach(el => {

        arr.push(a[el])
        console.log(arr)
        setReload(reload+1)

      })

    });

    return focusHandler;

  }, [navigation]);


  const removeItem = (id) => {
    arr.splice(id,1)
    setReload(reload+1)
  };



  return (

    <View style={styles.container}>

      <View style={{width: '25%'}}>
        <FlatList extraData={reload} scrollEnabled={false} data={arr} renderItem={({ item, index }) => (

          <View style={{width: '100%'}}>

            <View style={styles.titleBlock}>

              <Text style={styles.inputName}>№{index+1}</Text>
              <TouchableHighlight onPress={() => {
                removeItem(index)
              }}>
                <Image style={styles.image}
                source={require('../../assets/delete.png')}/>
              </TouchableHighlight>

            </View>

            <View style={{width: '100%', flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
              
              <View style={styles.inputBlock}>

                <TextInput style={styles.input}
                            placeholder='Название'
                            placeholderTextColor={'#5c4644'}
                            onChangeText={(e) => {arr[index][0] = e; setReload(reload+1)}}
                            value={arr[index][0]}/>

                <View style={styles.inputRow}>
                  <TextInput style={styles.dateInput}
                              placeholder='чч1'
                              placeholderTextColor={'#5c4644'}
                              onChangeText={(e) => {arr[index][1] = e; setReload(reload+1)}}
                              value={arr[index][1]}/>
                  <TextInput style={styles.dateInput}
                              placeholder='мм1'
                              placeholderTextColor={'#5c4644'}
                              onChangeText={(e) => {arr[index][2] = e; setReload(reload+1)}}
                              value={arr[index][2]}/>
                  <TextInput style={styles.dateInput}
                              placeholder='чч2'
                              placeholderTextColor={'#5c4644'}
                              onChangeText={(e) => {arr[index][3] = e; setReload(reload+1)}}
                              value={arr[index][3]}/>
                  <TextInput style={[styles.dateInput, {marginRight: 0}]}
                              placeholder='мм2'
                              placeholderTextColor={'#5c4644'}
                              onChangeText={(e) => {arr[index][4] = e; setReload(reload+1)}}
                              value={arr[index][4]}/>
                </View>
                
              </View>

            </View>
          </View>

        )}/>
      </View>
                  
      <Text style={[styles.button,{fontWeight: '700'}]} onPress={() => {
        arr.push([])
        setReload(reload+1)
      }}>
        Новый блок
      </Text>
      <Text style={[styles.button,{fontWeight: '700'}]} onPress={async () => {
        let cityRef = await doc(db, 'Li7', 'timetable');
        await setDoc(cityRef, { [1]: arr[0] });
        for (let i = 1; i < arr.length; i++) {
          await setDoc(cityRef, { [i+1]: arr[i] }, { merge: true });
        }
        navigation.navigate('AdminPanel', param)
      }}>
        Сохранить
      </Text>
      <Text style={[styles.button,{fontWeight: '700'}]} onPress={() => navigation.navigate('AdminPanel',param)}>
        Назад
      </Text>

    </View>

  );

}
