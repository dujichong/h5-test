/**
 * Created by hanan on 16/11/22.
 */

import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data || {});
}];

axios.jsonConfig = {
  headers: {'Content-Type': 'application/json; charset=UTF-8'},
  transformRequest: [function (data) {
    return JSON.stringify(data);
  }]
};

export default axios;