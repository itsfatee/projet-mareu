import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactChipsInput from 'react-native-chips';
import { Icon } from 'react-native-elements';
import firebase from '../Firebase';

const { heigh, width } = Dimensions.get('window');


export function addMeeting(subject_meet,place_meet,particip_meet,date){
    const datetime_meet = date.toGMTString();
    firebase.firestore().collection('meetings').add({subject_meet,place_meet,particip_meet,datetime_meet});
  }

const AddMeetings = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [subject_meet, setSubject] = useState('');
    const [place_meet, setPlace] = useState('');
    const [particip_meet, setParticip] = useState([ ]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        //console.log(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <View style={styles.container}>
        <Text style={styles.title}>AJOUTER UNE REUNION</Text>
        <View style={styles.card}>
            <TextInput 
              style={styles.input} 
              placeholder="Sujet" 
              onChangeText={(text)=>{
                setSubject(text);
              }}
              value={subject_meet}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Salle"
              onChangeText={(text)=>{
                setPlace(text);
              }}
              value={place_meet}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Participants" 
              onChangeText={(text)=>{
              setParticip(text);
              }}
              value={particip_meet}
            />  
            
            <View style={styles.dateTimeButton}>
                <Icon
                  reverse
                  raised
                  name='event'
                  type='material'
                  containerStyle={styles.piker}
                  onPress={showDatepicker} />
                  <Icon
                    reverse
                    raised
                    name='alarm'
                    type='material'
                    containerStyle={styles.piker}
                    onPress={showTimepicker}
                  />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            
            <TouchableOpacity style = {styles.button} onPress={()=>{
                  addMeeting(subject_meet,place_meet,particip_meet,date)
                  setPlace('');
                  setSubject('');
                  setParticip('');
                  navigation.navigate("Liste Reunions")
                }}>
                <Text style = {styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
        </View>
        </View>
    );

}

export default AddMeetings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#AFAFAF'
    //justifyContent: 'center',
  },
  card:{
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 25,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300'
  },
  input: {
    width: width - 25,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    fontSize: 25,
    color: 'black',
    borderRadius:10,
    backgroundColor:'white'
  },
  chips:{
    height:60,
  },
  date: {
    width: width - 25,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
  },
  about:{
    marginBottom : 20,
    height: 100,
  },
  button:{
    marginTop: 20,
    backgroundColor:'#00b5ec',
    width: 150,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  piker:{
    backgroundColor:'#00b5ec',
    height: 60,
    borderRadius: 90/2,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    margin:15,
  },
  dateTimeButton:{
    width: width - 25,
    flexDirection: 'row',
   
  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});