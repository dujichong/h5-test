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
const AppUserJobInformationJob = r => require(['views/app/user/job'], r);
const AppUserLoginRegistrationAgreement = r => require(['views/app/login/registration'], r);

const AppSellerDocumentaryEntry = r => require(['views/sellerApp/documentary/entry'], r);
const AppSellerDocumentaryInformation = r => require(['views/sellerApp/documentary/information'], r);

// 页面路由list
const routes = [
  {path: '/app/help/list', component: AppHelpList, name: 'AppHelpList'},
  {path: '/app/help/details', component: AppHelpDetails, name: 'AppHelpDetails'},
  {path: '/app/product/detail', component: AppProdcutDetail, name: 'AppProdcutDetail'},
  {path: '/app/user/living', component: AppUserLivingInformation, name: 'AppUserLivingInformation'},
  {path: '/app/user/job', component: AppUserJobInformationJob, name: 'AppUserJobInformationJob'},
  {path: '/app/login/registration', component: AppUserLoginRegistrationAgreement, name: 'AppUserLoginRegistrationAgreement'},

  {path: '/sellerApp/documentary/entry', component: AppSellerDocumentaryEntry, name: 'AppSellerDocumentaryEntry'},
  {path: '/sellerApp/documentary/information', component: AppSellerDocumentaryInformation, name: 'AppSellerDocumentaryInformation'},

].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'NotFound'});

export default routes;
