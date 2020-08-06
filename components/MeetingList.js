import React from 'react';
import { View,Dimensions,Text,FlatList,StyleSheet ,TouchableOpacity,Icon,Image,Button} from 'react-native';
import firebase from '../Firebase';
import DeleteMeeting from './MeetingDetails';
import { SearchBar } from 'react-native-elements';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class MeetingList extends React.Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('meetings');
        this.unsubscribe = null;

        this.state = {
          isLoading: true,
          meetings: [ ],
          key:' '
        };
      }

      onCollectionUpdate = (querySnapshot) => {
        const meetings = [];
        querySnapshot.forEach((doc) => {
          const { subject_meet, place_meet,datetime_meet,particip_meet } = doc.data();
          meetings.push({
            key: doc.id,
            doc, 
            subject_meet,
            place_meet,
            datetime_meet,
            particip_meet,
          });
        });

        this.setState({
          meetings,
          isLoading: false,
          
       });
      }

     

      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      }

    _onPress(){
      this.props.navigation.navigate('Details');
    }

      
    render(){
        return( 
          <FlatList
          data={this.state.meetings}
          keyExtractor={(item)=>item.key}
          renderItem={({item}) =>{
              return(
                <TouchableOpacity onPress={() => this._onPress(item)} >
                  <View style={styles.card}>
                          <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                              <Text style={styles.textSubj} >{item.subject_meet}</Text>
                              <Text style={styles.textTD}  >{item.datetime_meet}</Text>
                              
                          </View>
                          <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                              <View>
                                  <Text style={styles.text2} >{item.place_meet}</Text>
                                  <Text style={styles.text2}  >{item.particip_meet}</Text>
                              </View>
                          </View>
                  </View>
                  </TouchableOpacity>
              )
          }}
      />  
           
        )
    }

}

const styles = StyleSheet.create({
    
    bg_img:{
        width:60,
        height:60,
        borderRadius:30,
    },
    item: {
        flex: 1,
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 10,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
        alignItems:'center'
      },

      text: {
        fontSize: 20,
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 15,
      },

      card:{
        flex:1, 
        borderRadius:10,
        backgroundColor:'#AFAFAF',
        padding:10,
        marginBottom:20,
        width: '100%',
    },

    text2:{
      fontSize:20,
      fontFamily:'sans-serif-condensed',
    },

    textSubj:{
      fontSize:23,
      color:'white',
      fontFamily:'sans-serif-condensed',
      fontWeight:'bold'
    },

    textTD:{
      fontSize:20,
      color:'pink',
      fontFamily:'sans-serif-condensed',
      fontWeight:'bold'
    }




  });