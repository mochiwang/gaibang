import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabTranslationScreen from '../screens/TabTranslationScreen';
import ServiceCategoryScreen from '../screens/ServiceCategoryScreen';
import TabMyTaskScreen from '../screens/TabMyTaskScreen';
import TabSettingsScreen from '../screens/TabSettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="翻译助手" component={TabTranslationScreen} />
      <Tab.Screen name="服务大厅" component={ServiceCategoryScreen} />
      <Tab.Screen name="我的任务" component={TabMyTaskScreen} />
      <Tab.Screen name="设置" component={TabSettingsScreen} />
    </Tab.Navigator>
  );
}
