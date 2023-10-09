
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#EDEDE9',
    alignItems: 'center',
    justifyContent: 'center',

  },


  loader: {

    borderRadius: 1000,
    borderWidth: RFValue ( 1 ),
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: '#5c4644',

    width: RFValue ( 20 ),
    height: RFValue ( 20 )

  },


  title: {

    width: '90%',

    color: '#5c4644',
    textAlign: 'center',
    fontSize: RFValue ( 9 ),
    fontWeight: '400',
    fontFamily: 'font',

    marginTop: '1%',

  },

});
