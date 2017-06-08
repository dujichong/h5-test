/**
 * @file
 * Created by hanan on 16/10/15.
 */

// 根目录
const rootPath = window.$spaRootPath || '';

const NotFound = r => require(['views/notfound'], r);
const News = r => require(['views/news'], r);
const Message = r => require(['views/message'], r);

const AppHelpList = r => require(['views/app/help/list'], r);
const AppHelpDetails = r => require(['views/app/help/details'], r);
const AppProdcutDetail = r => require(['views/app/product/detail'], r);
const AppUserLivingInformation = r => require(['views/app/user/living'], r);
const AppUserJobInformationJob = r => require(['views/app/user/job'], r);
const AppUserLoginRegistrationAgreement = r => require(['views/app/login/registration'], r);

const AppSellerDocumentaryEntry = r => require(['views/seller/documentary/entry'], r);
const AppSellerDocumentaryInformation = r => require(['views/seller/documentary/information'], r);
const AppSellerDocumentaryBaseInformation = r => require(['views/seller/documentary/base'], r);
const AppSellerDocumentaryPicturesInformation = r => require(['views/seller/documentary/pictures'], r);
const AppSellerDocumentaryLivingInformation = r => require(['views/seller/documentary/living'], r);
const AppSellerDocumentaryJobInformation = r => require(['views/seller/documentary/job'], r);
const AppSellerDocumentaryContactPersonInformation = r => require(['views/seller/documentary/contact'], r);
const SellerApplicatinAudit = r => require(['views/seller/application/audit'], r);
const SellerApplicatinAuditResult = r => require(['views/seller/application/audit-result'], r);
const SellerApplicatinRepayment = r => require(['views/seller/application/repayment'], r);
const SellerApplicatinSettled = r => require(['views/seller/application/settled'], r);

// 页面路由list
const routes = [
  {path: '/news', component: News, name: 'News'},
  {path: '/message', component: Message, name: 'Message'},

  {path: '/app/help/list', component: AppHelpList, name: 'AppHelpList'},
  {path: '/app/help/details', component: AppHelpDetails, name: 'AppHelpDetails'},
  {path: '/app/product/detail', component: AppProdcutDetail, name: 'AppProdcutDetail'},
  {path: '/app/user/living', component: AppUserLivingInformation, name: 'AppUserLivingInformation'},
  {path: '/app/user/job', component: AppUserJobInformationJob, name: 'AppUserJobInformationJob'},
  {path: '/app/login/registration', component: AppUserLoginRegistrationAgreement, name: 'AppUserLoginRegistrationAgreement'},

  {path: '/seller/documentary/entry', component: AppSellerDocumentaryEntry, name: 'AppSellerDocumentaryEntry'},
  {path: '/seller/documentary/information', component: AppSellerDocumentaryInformation, name: 'AppSellerDocumentaryInformation'},
  {path: '/seller/documentary/base', component: AppSellerDocumentaryBaseInformation, name: 'AppSellerDocumentaryBaseInformation'},
  {path: '/seller/documentary/pictures', component: AppSellerDocumentaryPicturesInformation, name: 'AppSellerDocumentaryPicturesInformation'},
  {path: '/seller/documentary/living', component: AppSellerDocumentaryLivingInformation, name: 'AppSellerDocumentaryLivingInformation'},
  {path: '/seller/documentary/job', component: AppSellerDocumentaryJobInformation, name: 'AppSellerDocumentaryJobInformation'},
  {path: '/seller/documentary/contact', component: AppSellerDocumentaryContactPersonInformation, name: 'AppSellerDocumentaryContactPersonInformation'},
  {path: '/seller/application/audit', component: SellerApplicatinAudit, name: 'SellerApplicatinAudit'},
  {path: '/seller/application/audit-result', component: SellerApplicatinAuditResult, name: 'SellerApplicatinAuditResult'},
  {path: '/seller/application/repayment', component: SellerApplicatinRepayment, name: 'SellerApplicatinRepayment'},
  {path: '/seller/application/settled', component: SellerApplicatinSettled, name: 'SellerApplicatinSettled'},

].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'NotFound'});

export default routes;
