
// requiring libraries
import React, { useState } from 'react'
import { Text, View, TextInput, FlatList, Image, TouchableHighlight } from 'react-native'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'
// requiring modules
import styles from './styles'
import db from '../../Hooks/initFirebase'


let bells = [] // list of bells
// example
// [name, begin hour, begin minute, end hour, end minute]


export default function App({ route, navigation }) {

  const param = route.params // navigation data


  const [reload, setReload] = useState(0) // flatlist extraData
  

  React.useEffect(() => {

    const focusHandler = navigation.addListener('focus', async () => {

      bells = [] // clear array
      setReload(reload+1)

      // processing input data
      Object.keys(param.time).forEach(el => { 

        bells.push(param.time[el])
        setReload(reload+1)

      })

    });

    return focusHandler;

  }, [navigation])


  const removeItem = (id) => {

    bells.splice(id,1) // removing
    setReload(reload+1) // reloading flatlist
    
  }


  const upload = async () => {
    // uploading to firebase
    let cityRef = await doc(db, 'Li7', 'timetable');
    await setDoc(cityRef, { [1]: bells[0] });
    for (let i = 1; i < bells.length; i++) {
      await setDoc(cityRef, { [i+1]: bells[i] }, { merge: true });
    }
  }


  // rendering
  return (

    <View style={styles.container}>

      <View style={{width: '25%'}}>

        <FlatList extraData={reload} scrollEnabled={false} data={bells} renderItem={({ item, index }) => (

          // bell setting block

          <View style={{width: '100%'}}>

            {/* title + delete button */}

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
              
              {/* inputs */}

              <View style={styles.inputBlock}>

                {/* name input */}
                <TextInput style={styles.input}
                            placeholder='Название'
                            placeholderTextColor={'#5c4644'}
                            onChangeText={(e) => {bells[index][0] = e; setReload(reload+1)}}
                            value={bells[index][0]}/>

                {/* time inputs */}
                <View style={styles.inputRow}>

                  <TextInput style={styles.dateInput}
                              placeholder='чч1'
                              placeholderTextColor={'#5c4644'}
                              onChangeText={(e) => {bells[index][1] = e; setReload(reload+1)}}
                              value={bells[index][1]}/>

                  <TextInput style={styles.dateInput}
                              placeholder='мм1'
                              placeholderTextColor={'#5c4644'}
                              onChangeText={(e) => {bells[index][2] = e; setReload(reload+1)}}
                              value={bells[index][2]}/>

                  <TextInput style={styles.dateInput}
                              placeholder='чч2'
                              placeholderTextColor={'#5c4644'}
                              onChangeText={(e) => {bells[index][3] = e; setReload(reload+1)}}
                              value={bells[index][3]}/>

                  <TextInput style={[styles.dateInput, {marginRight: 0}]}
                              placeholder='мм2'
                              placeholderTextColor={'#5c4644'}
                              onChangeText={(e) => {bells[index][4] = e; setReload(reload+1)}}
                              value={bells[index][4]}/>

                </View>
                
              </View>

            </View>

          </View>

        )}/>

      </View>

      {/* buttons */}
                  
      <Text style={[styles.button, { fontWeight: '700' }]} onPress={() => {
        // add new bell to list
        bells.push([])
        setReload(reload+1)
      }}>
        Новый блок
      </Text>


      <Text style={[styles.button, { fontWeight: '700' }]} onPress={async () => {
        // uploading to firebase
        upload()
        // open main administrator page
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
