/**
 * @file
 * Created by hanan on 16/10/15.
 */
const NotFound = r => require(['views/notfound'], r);
const AppProdcutDetail = r => require(['views/app/product/detail'], r);

// 根目录
const rootPath = window.$spaRootPath || '';

// 页面路由
const routes = [
  {path: '/app/product/detail', component: AppProdcutDetail, name: 'AppProdcutDetail'}
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'NotFound'});

export default routes;
