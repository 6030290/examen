import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatScreen';
import CommandDetailsScreen from '../components/CommandDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StatsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Statistieken" component={StatsScreen} />
            <Stack.Screen name="CommandoDetails" component={CommandDetailsScreen} />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Statistieken" component={StatsStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
