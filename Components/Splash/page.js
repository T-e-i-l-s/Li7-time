
// requiring libraries
import React, { useState } from 'react';
import { Animated, Text, View } from 'react-native';
// requiring modules
import styles from './styles';
import loadData from './loadData';

let rotation = 0 // rotation value

export default function App({ navigation }) {

  const [deg,setDeg] = useState(0) // rotation value


  React.useEffect(() => { 

    const focusHandler = navigation.addListener('focus', async () => {

      // starting rotation
      setInterval(() => {
        // update rotation degrees
        rotation += 10
        setDeg(rotation)
      },25)

      await loadData({ navigation }) // starting to receive data

    });

    return focusHandler;

  }, [navigation]);


  // rendering
  return (

    <View style={styles.container}>

      <Animated.View style={[styles.loader,{transform:[{ rotate: (deg)+'deg' }]}]}>

      </Animated.View>

      <Text style={styles.title}>Загрузка</Text>

    </View>

  );

}
