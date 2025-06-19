import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './navigation/BottomTabs';
import LoginScreen from './screens/LoginScreen';
import TabMarketScreen from './screens/TabMarketScreen'; // ✅ 新增：服务者列表页
import TaskerProfileScreen from './screens/TaskerProfileScreen'; // ✅ 新增：服务者详情页
import ChatScreen from './screens/ChatScreen';
import BookingScreen from './screens/BookingScreen'; 
import TaskerRegisterFlow from './screens/TaskerRegisterFlow';
import TaskLocationScreen from './screens/TaskLocationScreen';
import 'react-native-get-random-values';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 首页标签页 */}
        <Stack.Screen name="Landing" component={BottomTabs} />
        
        {/* 登录页 */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* 服务者列表页（通过服务类型筛选） */}
        <Stack.Screen name="TabMarket" component={TabMarketScreen} />

        {/* 服务者个人资料页 */}
        <Stack.Screen name="TaskerProfile" component={TaskerProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} /> 
        <Stack.Screen name="Booking" component={BookingScreen} /> 
        <Stack.Screen name="TaskerRegisterFlow" component={TaskerRegisterFlow} />
        <Stack.Screen name="TaskLocation" component={TaskLocationScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
