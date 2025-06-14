export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Home: undefined;
  CreateTask: { serviceId: string }; // ✅ 支持从服务大厅跳转时传参数
  WhispererScreen: undefined;
};
