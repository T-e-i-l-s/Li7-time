
import db from '../../Hooks/initFirebase'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'


// data loading function
export default async function loadData ({ navigation }) {

    // getting day of week
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var date = new Date()
    var dayName = week[date.getDay()];

    if ( dayName == week[0] ) {
      dayName = week[1]
    }


    // getting data from firebase
    let docRef = doc(db, 'Li7', dayName) // connecting with firebase
    let docSnap = await getDoc(docRef)
    let data = docSnap.data() // getting lessons
  
    // processing data
    let timetables = [] // array for all timetables(all days)
    Object.keys(data).forEach( e => {

      let timetable = data[e] // array for today's timetable
      timetable.unshift(e) // supplement the class
      timetables.push(timetable) // supplement the week's timetable
      
    });


    docRef = doc(db, 'Li7', 'timetable') // connecting with firebase
    docSnap = await getDoc(docRef)
    data = docSnap.data() // getting lessons

    // processing data
    let bells = [] // array for all bell schedule
    for ( let i = 1; i <= Object.keys(data).length; i++ ) {

      bells.push(data[i]) // supplement the bell schedule

    }

    
    docRef = doc(db, 'Li7', 'events') // connecting with firebase
    docSnap = await getDoc(docRef)
    data = docSnap.data() // getting lessons
    let events = data.events // setting events list


    docRef = doc(db, 'Li7', 'admin') // connecting with firebase
    docSnap = await getDoc(docRef)
    data = docSnap.data() // getting lessons
    let adminCode = data.code // setting administrator code


    // loading main page
    navigation.navigate('Main',{
      'array': timetables, 
      'time': bells, 
      'events': events, 
      'admin': adminCode
    })

  }