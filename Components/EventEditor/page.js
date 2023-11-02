
// requiring libraries
import React, { useState } from 'react'
import { Text, View, TextInput, FlatList, Image, TouchableHighlight } from 'react-native'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'
// requiring modules
import styles from './styles'
import db from '../../Hooks/initFirebase'


export default function App({ route, navigation }) {

  const param = route.params // navigation data

  const [reload, setReload] = useState(0) // flatList extraData
  const [events, SetEvents] = useState(0) // events list
  
  
  React.useEffect(() => {

    const focusHandler = navigation.addListener('focus', async () => {

      // updating data
      SetEvents(param.events)
      setReload(reload+1)

    });

    return focusHandler

  }, [navigation])


  const removeItem = (id) => {
    events.splice(id,1) // remove from array
    setReload(reload+1) // rerender flatlist
  }


  const upload = async () => {
    // uploading data to firebase
    let cityRef = await doc(db, 'Li7', 'events');
    await setDoc(cityRef, { events: events }, { merge: true })
  }


  // rendering
  return (

    <View style={styles.container}>

      {/* events list */}

      <View style={{width: '25%'}}>

        <FlatList extraData={reload} scrollEnabled={false} data={events} renderItem={({ item, index }) => (

          <View style={{width: '100%'}}>

            <Text style={styles.inputName}>Событие {index+1}</Text>

            <View style={{width: '100%', flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>

              <TextInput style={styles.input}
                          placeholder=''
                          placeholderTextColor={'#5c4644'}
                          onChangeText={(e) => {events[index] = e; setReload(reload+1)}}
                          value={events[index]}/>

              <TouchableHighlight onPress={() => {removeItem(index)}}>
                <Image style={styles.image}
                source={require('../../assets/delete.png')}/>
              </TouchableHighlight>

            </View>
          </View>

        )}/>

      </View>
                  

      {/* buttons */}

      <Text style={[styles.button,{fontWeight: '700'}]} onPress={() => {
        events.push('') // add new event to array
        setReload(reload+1) // rerender flatlist
      }}>
        Новое событие
      </Text>


      <Text style={[styles.button,{fontWeight: '700'}]} onPress={async () => {
         // uploading data to firebase
         upload()
        // open administrator page
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
