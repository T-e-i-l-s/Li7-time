import React, { useRef, useState } from 'react';
import { Animated, Text, View, TextInput, FlatList, Image, TouchableHighlight } from 'react-native';
import styles from './styles';
import db from '../../Hooks/initFirebase'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'

let arr = []
let arr2 = []
let week1 = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
let week2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let arr_len = 0

export default function App({ route, navigation }) {

  const param = route.params
  const [reload, setReload] = useState(0)

  
  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', async () => {

      arr = []
      arr2 = []

      let docRef = doc(db, 'Li7', week2[week1.indexOf(param.day)])//EquipmentButton
      let docSnap = await getDoc(docRef)
      let data = docSnap.data()
    
      Object.keys(data).forEach(e => {
  
        arr.push(e)
        arr2.push(data[e])
    
      });

      arr_len = arr.length

      setReload(reload+1)

    });

    return focusHandler;

  }, [navigation]);



  return (

    <View style={styles.container}>

      <View style={{width: '25%'}}>
        <FlatList extraData={reload} scrollEnabled={false} data={arr} renderItem={({ item, index }) => (

          <View style={styles.button}>

            <TextInput style={styles.input}
                        placeholder='Класс'
                        placeholderTextColor={'#EDEDE9'}
                        onChangeText={async (e) => {

                          if ( index < arr_len ) { 

                            let cityRef = await doc(db, 'Li7', week2[week1.indexOf(param.day)]);
                            await setDoc(cityRef, { [e]: arr2[index] }, { merge: true });

                            await updateDoc(cityRef, {
                              [item]: deleteField()
                            });

                          }  

                          arr[index] = e
                          setReload(reload+1)}
                        }
                        value={arr[index]}/>

            <TouchableHighlight onPress={async() => {

              arr.splice(index,1); 
              setReload(reload+1);

              let cityRef = doc(db, 'Li7', week2[week1.indexOf(param.day)]);
      
              await updateDoc(cityRef, {
                [item]: deleteField()
              });

            }}>
              <Image style={styles.image}
              source={require('../../assets/del.png')}/>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {navigation.navigate('DayEditor',{'param': param.param, 'day':week2[week1.indexOf(param.day)], 'class': item})}}>
              <Image style={styles.image}
              source={require('../../assets/open.png')}/>
            </TouchableHighlight>

          </View>

        )}/>
      </View>
                  
      <Text style={[styles.button2,{width: '25%',fontWeight: '700'}]} onPress={() => {arr.push(''); setReload(reload+1)}}>
        Добавить класс
      </Text>
      <Text style={[styles.button2,{width: '25%',fontWeight: '700'}]} onPress={() => navigation.navigate('Week',param.param)}>
        Назад
      </Text>

    </View>

  );

}
