
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EDEDE9',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },


  topBlock: {

    flexDirection: 'row',
    width: windowWidth*0.8,
    marginTop: '2%', 
    marginLeft: '2%',

    height: windowHeight*0.15,

    alignItems: 'center',

  },


  timeBlock: {

    width: windowWidth*0.18, 

    alignItems: 'center',
    justifyContent: 'center',

  },


  time: {

    width: '100%',

    color: '#5c4644',
    textAlign: 'center',
    fontSize: RFValue ( 23 ),
    fontWeight: '600', 
    fontFamily: 'font'

  },


  date: {

    width: '100%',

    color: '#5c4644',
    textAlign: 'center',
    fontSize: RFValue ( 14 ),
    fontWeight: '500', 
    fontFamily: 'font'


  },


  progress:{

    backgroundColor:'#D6CCC2',

    borderColor:'#EDEDE9',

    borderRadius: RFValue ( 2 )
    
  },


  bottomBlock: {

    flexDirection: 'row',
    width: windowWidth*0.8,
    marginLeft: '2%',

  },


  tableBlock: {

    height: '81%', 
    width: '100%',

  },



  lessonNum: {

    width: '100%',

    color: '#5c4644',
    textAlign: 'center',
    fontSize: RFValue ( 8 ),
    fontWeight: '600', 
    fontFamily: 'font',

    marginBottom: '0.7%',

  },


  lessonBlock:{

    width: windowWidth*0.8*0.11,

    backgroundColor:'#efedff',

    borderColor:'#efedff',

    alignItems: 'center',
    justifyContent: 'center',
    
  },


  lesson: {

    width: '100%',

    color: '#5c4644',
    textAlign: 'center',
    fontSize: RFValue ( 6 ),
    fontWeight: '400', 
    fontFamily: 'font',

    marginTop: '0.4%',

  },


  rightBlock: {

    alignItems: 'center',
    justifyContent: 'flex-start',
    width: windowWidth*0.18

  },


  eventBlock: {

    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-start',

    marginTop: '1%'

  },


  eventName: {

    width: '50%',

    color: '#5c4644',
    textAlign: 'left',
    fontSize: RFValue ( 7 ),
    fontWeight: '400', 
    fontFamily: 'font',

  },


  eventTime: {

    width: '50%',

    color: '#5c4644',
    textAlign: 'right',
    fontSize: RFValue ( 7 ),
    fontWeight: '600', 
    fontFamily: 'font',

  },


  title: {

    width: '100%',

    color: '#5c4644',
    textAlign: 'left',
    fontSize: RFValue ( 8 ),
    fontWeight: '400', 
    fontFamily: 'font',

    marginTop: '0.4%',

  },


  text: {

    width: '100%',

    color: '#5c4644',
    textAlign: 'left',
    fontSize: RFValue ( 8 ),
    fontWeight: '600', 
    fontFamily: 'font',


  },

});
