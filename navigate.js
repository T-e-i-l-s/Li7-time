import Splash from './Components/Splash/page'
import Main from './Components/Main/page'
import CodeInput from './Components/CodeInput/page'
import AdminPanel from './Components/AdminPanel/page'
import EventEditor from './Components/EventEditor/page'
import BellEditor from './Components/BellEditor/page'
import Week from './Components/Week/page'
import ClassList from './Components/ClassList/page'
import DayEditor from './Components/DayEditor/page'


import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function Navigate () {

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={ Splash }
        options={ { headerShown: false, animationEnabled: false } }
      />
      <Stack.Screen
        name="Main"
        component={ Main }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="CodeInput"
        component={ CodeInput }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="AdminPanel"
        component={ AdminPanel }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="EventEditor"
        component={ EventEditor }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="BellEditor"
        component={ BellEditor }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="Week"
        component={ Week }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="ClassList"
        component={ ClassList }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="DayEditor"
        component={ DayEditor }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
    </Stack.Navigator>
  </NavigationContainer>

}
