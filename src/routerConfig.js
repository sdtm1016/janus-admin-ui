// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import BlankLayout from './layouts/BlankLayout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

import ApiGroupList from './pages/ApiGroupList';

import ApiList from './pages/ApiList';

import TrafficLimitList from './pages/TrafficLimitList';

import ServiceAuthList from './pages/ServiceAuthList';

import IpStrategyList from './pages/IpStrategyList';

import AppList from './pages/AppList';

import ApiGroupDetail from './pages/ApiGroupDetail';

import ApiAddForm from './pages/ApiAddForm';
import Login from './pages/Login';

const routerConfig = [
  {
    path: '/IPStrategy/index',
    layout: HeaderAsideFooterResponsiveLayout,
    component: IpStrategyList,
  },
  {
    path: '/',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Dashboard,
  },
  {
    path: '/login',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/group/index',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ApiGroupList,
  },
  {
    path: '/traffic/index',
    layout: HeaderAsideFooterResponsiveLayout,
    component: TrafficLimitList,
  },
  {
    path: '/api/index',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ApiList,
  },
  {
    path: '/auth/index',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ServiceAuthList,
  },
  {
    path: '/app/index',
    layout: HeaderAsideFooterResponsiveLayout,
    component: AppList,
  },
  {
    path: '/group/:groupId',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ApiGroupDetail,
  },
  {
    path: '/api/new',
    layout: HeaderAsideFooterResponsiveLayout,
    component: ApiAddForm,
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
