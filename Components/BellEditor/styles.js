
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


  titleBlock: { // Стиль textInput

    width: '100%',
    flexDirection: 'row'

  },



  inputName: { // Стиль названия textInput

    fontSize: RFValue(9),
    color: '#5c4644',
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'font',

    marginTop: RFValue(10)

  },


  inputBlock: { // Стиль textInput

    width: '100%',

  },


  input: { // Стиль textInput

    width: '100%',
    height: RFValue(20),

    fontSize: RFValue(9),
    textAlign: 'center',
    fontWeight: '500',
    color: '#5c4644',
    fontFamily: 'font',

    borderBottomColor: '#5c4644',
    borderBottomWidth: RFValue(1),

    outlineStyle: 'none'

  },


  inputRow: { // Стиль textInput

    width: '100%',
    flexDirection: 'row'

  },


  dateInput: { // Стиль textInput

    width: '25%',
    height: RFValue(20),

    fontSize: RFValue(9),
    textAlign: 'center',
    fontWeight: '500',
    color: '#5c4644',
    fontFamily: 'font',

    marginRight: '2%',

    borderBottomColor: '#5c4644',
    borderBottomWidth: RFValue(1),

    outlineStyle: 'none'

  },



  image: { // Стиль textInput

    width: RFValue(10),
    height: RFValue(10),

    marginLeft: RFValue(5),

    marginTop: RFValue(10)

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
