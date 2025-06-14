import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './navigation/BottomTabs';
import LoginScreen from './screens/LoginScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
// ...其他页面

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={BottomTabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
        {/* 其他功能页 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
