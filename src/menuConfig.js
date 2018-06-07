// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home',
  },
  {
    name: '分组管理',
    path: '/group/index',
    icon: 'cascades',
  },
  {
    name: 'API管理',
    path: '/api/index',
    icon: 'copy',
  },
  {
    name: '流量控制',
    path: '/traffic/index',
    icon: 'shezhi',
  },
  {
    name: '签名密匙',
    path: '/auth/index',
    icon: 'shezhi',
  },
  {
    name: 'IP访问控制',
    path: '/IPStrategy/index',
    icon: 'shezhi',
  },
  {
    name: '应用管理',
    path: '/app/index',
    icon: 'yonghu',
  },
  {
    name: '\u521B\u5EFAAPI',
    path: '/api/new',
    icon: 'home',
  },
];

export { headerMenuConfig, asideMenuConfig };
