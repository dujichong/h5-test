/**
 * @file
 * Created by hanan on 16/10/15.
 */
const NotFound = r => require(['views/notfound'], r);

// 根目录
const rootPath = window.$spaRootPath || '';
const List = r => require(['views/app/help/list'], r);
const Details = r => require(['views/app/help/details'], r);


// 页面路由list
const routes = [
  {path: '/app/help/list', component: List, name: 'List'},
  {path: '/app/help/details', component: Details, name: 'Details'},

].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'NotFound'});

export default routes;
