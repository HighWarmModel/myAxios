import { $http, resIF } from '../../http/index'

$http.post(resIF.baseURL, resIF.updateUserInfo, info, 2)
    .then(data => {
        if (data && data.code === 1) { // 操作成功返回值
          // do something
        } 
        else {
          // do something
        }
    })