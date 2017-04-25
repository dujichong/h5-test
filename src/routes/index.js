/**
 * @file
 * Created by hanan on 16/10/15.
 */
const NotFound = r => require(['views/notfound'], r);

// 根目录
const rootPath = window.$spaRootPath || '';
const AppHelpList = r => require(['views/app/help/list'], r);
const AppHelpDetails = r => require(['views/app/help/details'], r);
const AppProdcutDetail = r => require(['views/app/product/detail'], r);
const AppUserLivingInformation = r => require(['views/app/user/living'], r);
const AppUserJobInformationBusiness = r => require(['views/app/user/business'], r);
const AppUserJobInformationSalary = r => require(['views/app/user/salary'], r);

// 页面路由list
const routes = [
  {path: '/app/help/list', component: AppHelpList, name: 'AppHelpList'},
  {path: '/app/help/details', component: AppHelpDetails, name: 'AppHelpDetails'},
  {path: '/app/product/detail', component: AppProdcutDetail, name: 'AppProdcutDetail'},
  {path: '/app/user/living', component: AppUserLivingInformation, name: 'AppUserLivingInformation'},
  {path: '/app/user/business', component: AppUserJobInformationBusiness, name: 'AppUserJobInformationBusiness'},
  {path: '/app/user/salary', component: AppUserJobInformationSalary, name: 'AppUserJobInformationSalary'},

].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'NotFound'});

export default routes;
