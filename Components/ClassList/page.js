
// requiring libraries
import React, { useState } from 'react';
import { Text, View, TextInput, FlatList, Image, TouchableHighlight } from 'react-native';
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'
// requiring modules
import styles from './styles';
import db from '../../Hooks/initFirebase'


let classes = [] // list of classes
let lessons = [] // list of timetables
let week_ru = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] // days on Russian
let week_eng = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] // days on English
let classes_len = 0 // number of classes

export default function App({ route, navigation }) {

  const param = route.params // navigation data

  const [reload, setReload] = useState(0) // flatlist extraData

  
  React.useEffect(() => {

    const focusHandler = navigation.addListener('focus', async () => {

      // resetting arrays
      classes = []
      lessons = []

      // getting data from firebase
      let docRef = doc(db, 'Li7', week_eng[week_ru.indexOf(param.day)])
      let docSnap = await getDoc(docRef)
      let data = docSnap.data()
    
      // processing data
      Object.keys(data).forEach(e => {
  
        classes.push(e)
        lessons.push(data[e])
    
      });

      // saving number of classes
      classes_len = classes.length

      // rerendering flatlist
      setReload(reload+1)

    });

    return focusHandler;

  }, [navigation]);


  async function updateClass(e) {

    if ( index < classees_len ) { 

      // updating data at firebase

      let cityRef = await doc(db, 'Li7', week_eng[week_ru.indexOf(param.day)]);
      await setDoc(cityRef, { [e]: lessons[index] }, { merge: true });

      await updateDoc(cityRef, {
        [item]: deleteField()
      });

    }  

    // updating data on page
    classes[index] = e

    // reloading flatlist
    setReload(reload+1)

  }


  const deleteClass = async (index) => {

    // updating data on page
    classes.splice(index,1); 

    // reloading flatlist
    setReload(reload+1);

    // updating data at firebase
    console.log(week_eng[week_ru.indexOf(param.day)])
    let cityRef = doc(db, 'Li7', week_eng[week_ru.indexOf(param.day)]);
    await updateDoc(cityRef, {
      [item]: deleteField()
    });

  }


  // rendering
  return (

    <View style={styles.container}>

      <View style={{width: '25%'}}>

        <FlatList extraData={reload} scrollEnabled={false} data={classes} renderItem={({ item, index }) => (

          // class block

          <View style={styles.button}>

            {/* name input */}

            <TextInput style={styles.input}
                        placeholder='Класс'
                        placeholderTextColor={'#EDEDE9'}
                        onChangeText={async (e) => {
                      
                          // updating data on page
                          classes[index] = e
                      
                          // reloading flatlist
                          setReload(reload+1)

                          if ( index < classes_len ) { 
                      
                            // updating data at firebase
                      
                            let cityRef = await doc(db, 'Li7', week_eng[week_ru.indexOf(param.day)]);
                            await setDoc(cityRef, { [e]: lessons[index] }, { merge: true });
                      
                            await updateDoc(cityRef, {
                              [item]: deleteField()
                            });
                      
                          }  
                      
                        }}
                        value={classes[index]}/>

            {/* delete button */}

            <TouchableHighlight onPress={async () => {

              // updating data on page
              classes.splice(index,1); 
              lessons.splice(index,1); 

              // reloading flatlist
              setReload(reload+1);

              // updating data at firebase
              console.log(week_eng[week_ru.indexOf(param.day)])
              let cityRef = doc(db, 'Li7', week_eng[week_ru.indexOf(param.day)]);
              await updateDoc(cityRef, {
                [item]: deleteField()
              });

            }}>
              <Image style={styles.image}
              source={require('../../assets/del.png')}/>
            </TouchableHighlight>

            {/* open button */}

            <TouchableHighlight onPress={() => {
              navigation.navigate('DayEditor',{
                'param': param.param, 
                'day':week_eng[week_ru.indexOf(param.day)], 
                'class': item
              })
            }}>
              <Image style={styles.image}
              source={require('../../assets/open.png')}/>
            </TouchableHighlight>

          </View>

        )}/>

      </View>
                  
      {/* buttons */}

      <Text style={[styles.button2,{width: '25%',fontWeight: '700'}]} onPress={() => {classes.push(''); setReload(reload+1)}}>
        Добавить класс
      </Text>

      <Text style={[styles.button2,{width: '25%',fontWeight: '700'}]} onPress={() => navigation.navigate('Week',param.param)}>
        Назад
      </Text>

    </View>

  );

}
