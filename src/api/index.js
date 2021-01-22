/* eslint-disable no-unused-vars */
import axios from 'axios'
// import router from '@/router'
// import config from '../../settingConfig.js'
// import { serialize } from "object-to-formdata";

var url = "http://localhost:5001/api"
export const instance = axios.create({
    baseURL: url,
    timeout: 0
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

// POST傳參序列化(添加請求攔截器)
// 在發送請求之前做某件事
// instance.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.common['Authorization'] = token;
//     }
//     // if (config.data != undefined && config.data.convertFormData) {
//     // config.headers['Content-Type'] = 'multipart/form-data';

//     // const options = {
//     //     indices: true
//     // }
//     // config.data = serialize(config.data, options)
//     // }
//     return config
// }, error => {
//     return Promise.reject(error)
// })

// 返回狀態判斷(添加回應攔截器)
// instance.interceptors.response.use(res => {
//     // 對回應資料做些事
//     return res
// }, error => {
//     if (error.response) {
//         switch (error.response.status) {
//             case 400:
//                 break
//             case 401:
//                 alert("驗證過期，請重新登入");
//                 router.push({ path: "/pages/login" });
//                 break
//             case 403:
//                 alert("驗證過期，請重新登入");
//                 router.push({ path: "/pages/login" });
//                 break
//             case 404:
//                 break
//             case 500:
//                 break
//             default:
//         }
//     }
//     // axios 配置裡必須要 return Promise.reject(error.response.data) 才能拿到錯誤欄位
//     return Promise.reject(error.response.data)
// })
export default instance