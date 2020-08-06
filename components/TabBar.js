import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MeetingList from './MeetingList';
import AddMeeting from './AddMeeting';
import Home from './Home';

const Tab = createMaterialTopTabNavigator();

export default class Tabbar extends React.Component {
  render() {
    return (
      <Tab.Navigator>
            <Tab.Screen name="Acceuil" component={Home} initialParams={{type: 'home'}} />
            <Tab.Screen name="Liste Reunions" component={MeetingList} initialParams={{type: 'meetinglist'}} />
            <Tab.Screen name="Ajouter une réunion" component={AddMeeting} initialParams={{type: 'addmeeting'}} />
      </Tab.Navigator>
    )
  }
}