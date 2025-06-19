import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/useUserStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

export function withAuth<P extends {}>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  return function AuthGuard(props: P) {
    const user = useUserStore((state) => state.user);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
      // 只在明确未登录的情况下跳转
      if (user === null) {
        navigation.navigate('Login');
      }
    }, [user]);

    if (!user) return null;

    return <WrappedComponent {...props} />;
  };
}
