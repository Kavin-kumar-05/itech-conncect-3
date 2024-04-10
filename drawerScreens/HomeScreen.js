import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

import Classroom from '../bottomTabScreens/Classroom';
import Home from '../bottomTabScreens/Home';


function HomeScreen() {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator screenOptions={{headerShown:false}} tabBarStyle={{position: 'absolute', bottom: 20, left: 20, right: 20, borderRadius: 20, backgroundColor: 'white', elevation: 5, shadowColor: 'black', shadowOpacity: 0.2, shadowRadius: 15, shadowOffset: {width: 0, height: -5}}}>
      <BottomTab.Screen
        name="Feed"
        options={{ tabBarIcon: ({ color, size }) => { return <Ionicons name={'home'} size={size} color={color} /> } }}
        component={Home}
      />
      
      <BottomTab.Screen
        name="Classroom"
        options={{ tabBarIcon: ({ color, size }) => { return <Ionicons name={'school'} size={size} color={color} /> } }}
        component={Classroom}
      />
    </BottomTab.Navigator>
  );
}

export default HomeScreen;