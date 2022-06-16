import axios from "axios"

console.log("axios-demo")

// 1. axios实例对象
// axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
//   console.log(res.data)
// })

// 2. get请求， 并且传入参数
// axios
//   .get("http://httpbin.org/get", {
//     params: {
//       name: "xionglp",
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 3. post请求
// axios
//   .post("http://httpbin.org/post", {
//     data: {
//       name: "xlp",
//       age: 19
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 4. axios配置选项
// 4.1. 全局配置
axios.defaults.baseURL = "http://httpbin.org"
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// 4.2. 每个请求的单独配置
// axios
//   .get("/get", {
//     params: {
//       name: "xionglp",
//       age: 18
//     },
//     timeout: 5000
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 5. axios.all 多个请求，一起返回
// axios
//   .all([
//     axios.get("/get", { params: { name: "xionglp", age: 18 } }),
//     axios.post("/post", { data: { name: "xlp", age: 20 } })
//   ])
//   .then((res) => {
//     console.log(res)
//   })

// 6. axios 拦截器
// fn1: 请求发送成功会执行的函数
// fn2：请求发送失败会执行的函数

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    // 给请求添加token
    // isLoading动画效果
    console.log("请求成功的拦截")
    return config
  },
  (err) => {
    console.log("请求失败的拦截")
    return err
  }
)

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    console.log("响应成功的拦截")
    return res
  },
  (err) => {
    console.log("响应失败的拦截")
    return err
  }
)

// axios
//   .get("/get", {
//     params: {
//       name: "xionglp",
//       age: 18
//     },
//     timeout: 5000
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
