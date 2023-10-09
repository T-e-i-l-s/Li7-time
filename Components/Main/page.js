
// requiring libraries
import * as Progress from 'react-native-progress'
import React, { useState } from 'react';
// requiring modules
import styles from './styles';
// getting dimentions of screen
import { Text, View, FlatList, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const colors = ['#E3D5CA','#F5EBE0']

const Mounths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']


export default function App({ route, navigation }) {

  const param = route.params // navigation data

  // time values
  const [ Hour, setHour ] = useState('')
  const [ Minute, setMinute ] = useState('')
  const [ sHour, setSHour ] = useState('')
  const [ sMinute, setSMinute ] = useState('')

  const [ Day, setDay ] = useState('')
  const [ Mounth, setMounth ] = useState('')
  const [ Mounth_i, setMounth_i ] = useState('')
  const [ Year, setYear ] = useState('')

  // was this page used
  const [ flag, setFlag ] = useState(false)

  // information
  const [ bellSchedule, setBellSchedule ] = useState(param['time'])
  const [ sBellSchedule, setSBellSchedule ] = useState(param['time'])
  const [ todaysSchedule, setTodaysSchedule ] = useState(param['array'])
  const [ events, setEvents ] = useState(param['events'])
  const [ progress, setProgress ] = useState([])
  const [ nextBell, setBell ] = useState(0)

  // value of columns in table
  const [ rowLen, setRowLen ] = useState(0)


  if ( !flag ) {

    setFlag(true) // true
    
    //finding max number of lessons
    let maxNumber = 0

    todaysSchedule.forEach(s => {

      if ( s.length > maxNumber ) {
        maxNumber = (s.length)
      }

    });

    setRowLen(maxNumber)


    // processing table
    let lessonNumbers = [''] // (first row in table)
    let progressTitles = [] // (above progress bar)

    for (let i = 0; i < maxNumber-1; i++) {

      lessonNumbers.push('' + (i+1))
      progressTitles.push(['Урок ' + (i+1), 0])

    }
    
    let progress = progressTitles
    todaysSchedule.unshift(lessonNumbers)

    
    // processing time ( 9.7 => 09.07 )
    let data = bellSchedule
    for (let i = 0; i < data.length; i++) {
      
      if ( ("" + data[i][1]).length == 1 ) { data[i][1] = '0'+data[i][1] } // begin hour
      if ( ("" + data[i][2]).length == 1 ) { data[i][2] = '0'+data[i][2] } // begin minute
      if ( ("" + data[i][3]).length == 1 ) { data[i][3] = '0'+data[i][3] } // end hour
      if ( ("" + data[i][4]).length == 1 ) { data[i][4] = '0'+data[i][4] } // end minute

    }
    setSBellSchedule(data)


    // updating function
    setInterval(() => {
  
      // updating time
      let now = new Date();
      let hour = now.getHours()
      let min =  now.getMinutes()
      let day = now.getDate()
      let mounth = now.getMonth()

      setMounth_i(now.getMonth())
      setYear(now.getFullYear())
      setHour(hour)
      setMinute(min)
      setSHour(hour)
      setSMinute(min)

      // processing time ( 9.7 => 09.07 )
      if ( ("" + hour).length == 1 ) { setSHour('0' + hour) } // hour
      if ( ("" + min).length == 1 ) { setSMinute('0' + min) } // minute
      if ( ("" + day).length == 1 ) { day = '0' + day } // day
      if ( ("" + mounth).length == 1 ) { mounth = '0' + mounth } // mounth

      setDay(day)
      setMounth(mounth)


      // updating progress
      for ( let i = 0; i < progress.length; i++ ) {

        // finding begin/end time of this lesson
        let lessonNow = []
        bellSchedule.forEach(e => {
          if (e[0] == progress[i][0]) {
            lessonNow = e
          }
        })

        const t = parseInt(hour*60) + parseInt(min) // minutes from 00.00 (now)
        const t1 = parseInt(lessonNow[1])*60 + parseInt(lessonNow[2]) // minutes from 00.00 (lesson begin)
        const t2 = parseInt(lessonNow[3])*60 + parseInt(lessonNow[4]) // minutes from 00.00 (lesson end)

        // updating progress value
        let progressValue = progress

        if ( t < t1 ) {
          progressValue[i][1] = 0
        } else if ( t > t2 ) {
          progressValue[i][1] = 1
        } else {
          progressValue[i][1] = ((t-t1)/(t2 - t1))
        }

        setProgress(progressValue)

      }


      // updating time before bell
      for (let i = 0; i < bellSchedule.length; i++) {

        const lessonNow = bellSchedule[i] // information about lesson(begin/end)
        const t = parseInt(hour*60) + parseInt(min) // minutes from 00.00 (now)
        const t1 = parseInt(lessonNow[1])*60 + parseInt(lessonNow[2]) // minutes from 00.00 (lesson begin)
        const t2 = parseInt(lessonNow[3])*60 + parseInt(lessonNow[4]) // minutes from 00.00 (lesson end)

        // counting
        if ( t < t1 ) {
          setBell(t1-t)
          return
        } else if ( t < t2 ) {
          setBell(t2-t)
          return
        }
        
      }

    }, 1000)
  }

  return (

    <View style={styles.container} onStartShouldSetResponder={() => {navigation.navigate('CodeInput', param)}}>

      <View style={styles.topBlock}>

        <View>

          {/* progress bars */}
          <View style={{marginBottom: '0.4%',width: windowWidth*0.8}}>

            <FlatList horizontal={true} scrollEnabled={false} data={progress} renderItem={({ item }) => (

              <View style={{marginLeft: windowWidth*0.8*0.001, width: windowWidth*0.8*(1/(progress.length)-0.001)}}>
                <Text style={styles.lessonNum}>{item[0]}</Text>
                <Progress.Bar progress={item[1]} width={null} height={windowHeight*0.02} color='#5c4644' style={[styles.progress]} />
              </View>

            )}/>

          </View>

          {/* addition info */}
          <Text style={styles.title}>До звонка <Text style={styles.text}>{nextBell} минут</Text></Text>
          <Text style={styles.title}>В столовой дежурят: <Text style={styles.text}>8A</Text></Text>

        </View>

        {/* time */}
        <View style={styles.timeBlock}>
          <Text style={styles.time}>{sHour + ':' + sMinute}</Text>
          <Text style={styles.date}>{Day + " " + Mounths[Mounth_i]}</Text>
        </View>

      </View>




      {/* date(above table) */}
      <Text style={[styles.text,{marginTop: '1.4%', marginLeft: '2%', width: '90%'}]}>{Day + '.' + Mounth + '.' + Year}</Text>

      <View style={styles.bottomBlock}>

        {/* table */}
        <View style={styles.tableBlock}>

          <View style={{backgroundColor:'#efedff'}}>

            <FlatList scrollEnabled={false} data={todaysSchedule} renderItem={({ item, index }) => (

              <View style={{backgroundColor: colors[index%2]}}>

                <FlatList horizontal={true} scrollEnabled={false} data={item} renderItem={({ item }) => (

                  <View style={[
                    styles.lessonBlock,{backgroundColor: colors[index%2], 
                    height: windowHeight*0.8*(1/(todaysSchedule.length+1)), 
                    width: windowWidth*0.8*(1/rowLen)}
                  ]}>
                    <Text style={styles.lesson}>{item}</Text>
                  </View>

                )}/>

              </View>

            )}/>


          </View>

        </View>


        <View style={styles.rightBlock}>

          <View style={{width: '80%'}}>

            {/* bell schedule */}
            <Text style={[styles.text,{width: '100%', textAlign: 'center'}]}>
              Рассписание звонков:
            </Text>
            <View style={{width: '100%' }}>
              <FlatList scrollEnabled={false} data={sBellSchedule} renderItem={({ item, index }) => (
                <View style={styles.eventBlock}>
                  <Text style={styles.eventName}>{item[0]}</Text>
                  <Text style={styles.eventTime}>{item[1] + '.' +  item[2] + '-' + item[3] + '.' +  item[4]}</Text>
                </View>
              )}/>
            </View>

            {/* events */}
            <Text style={[styles.text,{marginTop: '2%', width: '100%', textAlign: 'center'}]}>
              Ближайшие события:
            </Text>
            <View>
              <FlatList scrollEnabled={false} data={events} renderItem={({ item, index }) => (
                <View style={[styles.eventBlock]}>
                  <Text style={[styles.eventName,{width: (windowWidth*0.18*0.8), textAlign: 'center'}]}>{"" + (index+1) + "." + (" " + item)}</Text>
                </View>
              )}/>
            </View>
          </View>


        </View>

      </View>

    </View>

  );

}
