import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';

const Stack = createStackNavigator();
import TabBar from './components/TabBar';
import Home from './components/Home';
import Auth from './components/Auth';
import Registration from './components/Registration';
import MeetingList from './components/MeetingList';
import MeetingDetails from './components/MeetingDetails';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>

<Stack.Navigator initialRouteName="Connexion">
          <Stack.Screen name="Connexion" component={Auth} />
          <Stack.Screen name="Inscription" component={Registration} />
          <Stack.Screen name="Home" component={TabBar}/>
          <Stack.Screen name="Liste" component={MeetingList}/>
          <Stack.Screen name="Details" component={MeetingDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
