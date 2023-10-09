
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
