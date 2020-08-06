import React from 'react';
import { View,Text,Dimensions,Image,StyleSheet,TouchableOpacity} from 'react-native';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class MeetingsDetails extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Bienvenue dans votre application de gestion de salles de réunions </Text>
                <Image style={styles.bg_img} source={require('../assets/meetings.jpg')}/>
                <TouchableOpacity   style={[styles.buttonContainer, styles.loginButton]} 
                    onPress={() => this.props.navigation.navigate('Connexion')} >
                    <Text>Déconnexion</Text>
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
      },

    bg_img:{
        //padding:10,
        paddingTop:100,
        width:'100%',
        height:300,
    }, 
    
    text:{
        paddingBottom:70,
        fontSize:30,
        fontFamily:'sans-serif-condensed'
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
        backgroundColor: "#FF0000",
      },
})