import React, { useRef, useState } from 'react';
import { Animated, Text, View, TextInput, FlatList, Image, TouchableHighlight } from 'react-native';
import styles from './styles';
import db from '../../Hooks/initFirebase'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'

let names = []
let rooms = []
let week1 = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
let week2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


export default function App({ route, navigation }) {

  const param = route.params

  const [reload, setReload] = useState(0)
  
  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', async () => {

      names = []
      rooms = []
      
      let docRef = doc(db, 'Li7', param.day)//EquipmentButton
      let docSnap = await getDoc(docRef)
      let data = docSnap.data()
    
      names = data[param.class]

      if ( names != undefined ) {
        for (let i = 0; i < names.length; i++) {
          const a = names[i].split(' ');
          names[i] = names[i].substring(0, names[i].length - (a[a.length-1].length) - 1)
          rooms[i] = a[a.length-1].substring(1, a[a.length-1].length-1)
        }
      } else {
        names = []
        rooms = []
      }


      setReload(reload+1)

    });

    return focusHandler;

  }, [navigation]);


  const removeItem = (id) => {
    names.splice(id,1)
    rooms.splice(id,1)
    setReload(reload+1)
  };



  return (

    <View style={styles.container}>

      <View style={{width: '25%'}}>
        <FlatList extraData={reload} scrollEnabled={false} data={names} renderItem={({ item, index }) => (

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
                            onChangeText={(e) => {names[index] = e; setReload(reload+1)}}
                            value={names[index]}/>

                <TextInput style={styles.dateInput}
                            placeholder='Кабинет'
                            placeholderTextColor={'#5c4644'}
                            onChangeText={(e) => {rooms[index]= e; setReload(reload+1)}}
                            value={rooms[index]}/>
                
              </View>

            </View>
          </View>

        )}/>
      </View>
                  
      <Text style={[styles.button,{fontWeight: '700'}]} onPress={() => {
        names.push([])
        rooms.push([])
        setReload(reload+1)
      }}>
        Новый блок
      </Text>
      <Text style={[styles.button,{fontWeight: '700'}]} onPress={async () => {
        let arr = []
        for (let i = 0; i < names.length; i++) {
          arr[i] = names[i] + " (" + rooms[i] + ")"
        }
        let cityRef = await doc(db, 'Li7', param.day);
        await setDoc(cityRef, { [param.class]: arr }, { merge: true });
        navigation.navigate('AdminPanel', param)
      }}>
        Сохранить
      </Text>
      <Text style={[styles.button,{fontWeight: '700'}]} onPress={() => navigation.navigate('Week',param.param)}>
        Назад
      </Text>

    </View>

  );

}
