
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
    flexDirection: 'row',
    marginTop: RFValue(20)

  },



  inputName: { // Стиль названия textInput

    fontSize: RFValue(9),
    color: '#5c4644',
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'font',

  },


  inputBlock: { // Стиль textInput

    width: '100%',

  },


  input: { // Стиль textInput

    width: '70%',
    height: RFValue(20),

    fontSize: RFValue(9),
    textAlign: 'center',
    fontWeight: '500',
    color: '#EDEDE9',
    fontFamily: 'font',

    borderBottomColor: '#EDEDE9',
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

    width: RFValue(13),
    height: RFValue(13),

    marginLeft: RFValue(5),

  },


  button: { // Стиль кнопки

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',

    backgroundColor: '#5c4644',

    borderRadius: 1000,

    padding:RFValue(7),
    marginTop: RFValue(9),

  },


  buttonTitle: { // Стиль кнопки

    width: '80%',

    fontSize: RFValue(9),
    color: '#e6e6e6',
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: 'font',

  },


  button2: { // Стиль кнопки

    width: '100%',

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
