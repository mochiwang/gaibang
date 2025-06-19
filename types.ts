export type RootStackParamList = {
  // 首页与通用功能
  Landing: undefined;
  Login: undefined;
  Home: undefined;
  WhispererScreen: undefined;

  // 服务相关模块
  ServiceCategory: undefined; // 服务大厅
  TaskLocation: { serviceId: string }; // 地址输入页面
  TabMarket: {
    serviceId: string;
    lat?: number;
    lng?: number;
  }; // 服务者列表，带可选坐标

  // 服务者相关页面
  TaskerProfile: { taskerId: string }; // 服务者详情页
  Chat: { taskerId: string }; // 聊天页面
  Booking: { taskerId: string }; // 发起预约页面
  TaskerRegisterFlow: undefined; // 服务者注册流程入口

  // 其他页面（预留）
  MyTasks: undefined; // 我的任务列表
  Settings: undefined; // 设置页面
};
