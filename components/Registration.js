import React from 'react';
import { ActivityIndicator,Alert,View,Text,Dimensions,StyleSheet,Image,TextInput,TouchableOpacity } from 'react-native';
import firebase from '../Firebase';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class MeetingsDetails extends React.Component {

    constructor() {
        super();
        this.state = { 
          fullName: '',
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

      registerUser = () => {
        if(this.state.email === '' && this.state.password === '') {
          Alert.alert('Veuillez renseigner les champs !')
        } else {
          this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            res.user.updateProfile({
              fullName: this.state.fullName
            })
            console.log('User registered successfully!')
            this.setState({
              isLoading: false,
              fullName: '',
              email: '', 
              password: ''
            })
            this.props.navigation.navigate('Connexion')
          })
          .catch(error => this.setState({ errorMessage: error.message, isLoading: false }))      
        }
      }

    render(){
        if(this.state.isLoading){
            return(
              <View style={styles.activity}>
                <Text>Enregistrement de vos données, patientez...</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )
          }
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={require('../assets/name.jpg')}  />
                <TextInput style={styles.inputs}
                    placeholder="Full Name"
                    value={this.state.fullName}
                    onChangeText={(val) => this.updateInputVal(val, 'fullName')}
                 />
                </View>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={require('../assets/email.png')}  />
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                    />
                </View>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon}  source={require('../assets/pwd.png')}/>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                />
                </View>

                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} 
                     onPress={() => this.registerUser()} >
                    <Text style={styles.loginText}>S'inscrire</Text>
                </TouchableOpacity>
              
            </View>
        )
        
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
            borderRadius:15,
            borderBottomWidth: 1,
            width:300,
            height:60,
            marginBottom:60,
            flexDirection: 'row',
            alignItems:'center',
            textAlign: 'center',
           
        },
      
        inputs:{
            height:45,
            marginLeft:16,
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




