import Axios from "axios";
export function request(config) {
  //1.创建实例
  const instance = Axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
  })
  //2.1  axios请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  //2.2  axios响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
  //3.发送网络请求
  return instance(config)
}
