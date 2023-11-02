
// requiring libraries
import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window'); 
const aspectRatio = height/width;
// requiring modules
import styles from './styles';


let butWidth = 0 // width of objects(input and button)


// processing width of objects(based on the diagonal)
if ( aspectRatio>1.6 ) { // big screen
  butWidth = "90%"
} else { // phone screen
  butWidth = "25%"
}


let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] // days list


export default function App({ route, navigation }) {

  const param = route.params // navigation data


  // rendering
  return (

    <View style={styles.container}>

      {/* day buttons */}

      <View style={{width: butWidth}}>

        <FlatList scrollEnabled={false} data={week} renderItem={({ item, index }) => (

          <View style={{width: '100%'}}>
                  
            <Text style={styles.button} onPress={() => navigation.navigate('ClassList',{'param': param, 'day': item})}>
              {item}
            </Text>

          </View>

        )}/>

      </View>

      {/* exit button */}
      
      <Text style={[styles.button,{width: butWidth, fontWeight: '700'}]} onPress={() => navigation.navigate('AdminPanel',param)}>
        Назад
      </Text>

    </View>

  );

}
