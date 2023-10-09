import Page from './navigate'

import * as Font from 'expo-font'

//подгружаем шрифты
Font.loadAsync({
  'font': require('./assets/fonts/Geologica.ttf'),
})

export default function App () {

  return (

    <Page/>

  )

}
