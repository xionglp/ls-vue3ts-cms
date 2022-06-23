let BASE_URL = ""
const TIME_OUT = 10000

if (process.env.NODE_ENV === "development") {
  // 测试环境，api通过webpack进行代理， 解决跨域的问题
  BASE_URL = "/api"
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://123.207.32.32:8000/prod"
} else {
  BASE_URL = "http://123.207.32.32:8000/test"
}

export { BASE_URL, TIME_OUT }
