
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window'); 

const aspectRatio = height/width;

let butWidth = 0

if(aspectRatio>1.6) {

  butWidth = "90%"

} else {

  butWidth = "25%"

}


export default StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#EDEDE9',
    alignItems: 'center',
    justifyContent: 'center',

    padding: RFValue(15)

  },


  inputName: { // Стиль названия textInput

    width: '100%',

    fontSize: RFValue(9),
    color: '#5c4644',
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'font',
    marginTop: RFValue(6)

  },


  input: { // Стиль textInput

    width: '90%',
    height: RFValue(20),

    fontSize: RFValue(9),
    textAlign: 'left',
    fontWeight: '500',
    color: '#5c4644',
    fontFamily: 'font',

    borderBottomColor: '#5c4644',
    borderBottomWidth: RFValue(1),

    outlineStyle: 'none',

  },


  image: { // Стиль textInput

    width: RFValue(13),
    height: RFValue(13),
    marginLeft: RFValue(3),

  },


  button: { // Стиль кнопки

    width: butWidth,

    backgroundColor: '#5c4644',

    fontSize: RFValue(9),
    color: '#e6e6e6',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'font',

    borderRadius: 1000,

    paddingVertical: RFValue(9),
    marginTop: RFValue(6)

  }

});
