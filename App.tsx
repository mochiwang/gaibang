import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import WhispererScreen from './screens/WhispererScreen';

import { useUserStore } from './store/useUserStore';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// 未登录页面栈
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ title: '该帮', headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: '登录 / 进入' }}
      />
    </Stack.Navigator>
  );
}

// 登录后的抽屉菜单结构（Landing 为默认首页）
function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Landing">
      <Drawer.Screen
        name="Landing"
        component={LandingScreen}
        options={{ title: '该帮首页' }}
      />
      <Drawer.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{ title: '发布任务' }}
      />
      <Drawer.Screen
        name="WhispererScreen"
        component={WhispererScreen}
        options={{ title: '实时翻译助手' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const user = useUserStore((state) => state.user);

  return (
    <NavigationContainer>
      {user ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
