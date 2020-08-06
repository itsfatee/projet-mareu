import React, {useState} from 'react';
import firebase from '../Firebase';
import { 
  StyleSheet, Text,Button,Alert,
  View,ActivityIndicator, Image, TextInput, 
  Dimensions, TouchableOpacity } from 'react-native';
import {Card} from 'react-native-elements';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default class MeetingDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      subject_meet: '',
      place_meet: '',
      datetime_meet:'',
      particip_meet: '',
      isLoading: true
    };
  }
 
  /*componentDidMount() {
    const dbRef = firebase.firestore().collection('meetings').doc(this.state)
    dbRef.get().then((res) => {
      if (res.exists) {
        const meet = res.data();
        this.setState({
          key: res.id,
          subject_meet: meet.subject_meet,
          place_meet: meet.place_meet,
          datetime_meet: meet.datetime_meet,
          particip_meet: meet.particip_meet,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }*/


  deleteReunion() {
    const dbRef = firebase.firestore().collection('meetings').doc(this.props.params)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('Liste Reunions');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Supprimer la réunion',
      'Êtes vous sure de vouloir supprimer ?',
      [
        {text: 'Oui', onPress: () => this.deleteReunion()},
        {text: 'Non', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
  
    return (
      <Card
        title='DETAILS'
        image={require('../assets/meetings.jpg')}
        >
      <Text style={{marginBottom: 12}, {fontSize:20}} >Sujet : {this.state.subject_meet}</Text>
      <Text style={{marginBottom: 12}, {fontSize:20}} >Salle : {this.state.place_meet}</Text>
      <Text style={{marginBottom: 12}, {fontSize:20}} >Date et heure : {this.state.datetime_meet}</Text>
      <Text style={{marginBottom: 12}, {fontSize:20}} >Participants : {this.state.particip_meet}</Text>
      <Button
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='Supprimer' 
        onPress={() => this.openTwoButtonAlert()}
      />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
  },


  buttonSave: {
    backgroundColor: '#FF80AB',
    borderRadius: 20,
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: 'white'
  },
  text:{
    fontSize:25
  }
});
