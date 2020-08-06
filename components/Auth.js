import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firebase from '../Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Auth extends React.Component{

    constructor() {
        super();
        this.state = { 
          email: '', 
          password: '',
          isLoading: false
        }
      }

      updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }

      userLogin = () => {
        if(this.state.email === '' && this.state.password === '') {
          Alert.alert('Veuillez remplir les champs!')
        }
         else {
          this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            console.log(res)
            console.log('User logged-in successfully!')
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
            this.props.navigation.navigate('Home')
          })
          .catch(error => this.setState({ errorMessage: error.message }))
        }
      }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <Text>Patientez...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
          <Image style={styles.user_img} source={require('../assets/user.png')} />
        <View style={styles.inputContainer}>
           <Image style={styles.inputIcon} source={require('../assets/email.png')}  />
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
             
            />
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon}  source={require('../assets/pwd.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
            />
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} 
         onPress={() => this.userLogin()}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity  
        onPress={() => this.props.navigation.navigate('Inscription')} >
            <Text>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFAFAF',
  },

  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:260,
      height:60,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',

  },

  inputs:{
      height:45,
      marginLeft:15,
      borderBottomColor: '#FFFFFF',
      flex:1,
      fontSize:20
  },

  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },

  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    
  },

  loginButton: {
    backgroundColor: "#00b5ec",
  },

  loginText: {
    color: 'white',
    fontSize:20
  },

  user_img:{
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom:25 
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },


});