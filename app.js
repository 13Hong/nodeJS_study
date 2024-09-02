const express = require('express')

const app = express()
const cors = require('cors')

app.use(cors())
// 配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件
app.use(express.urlencoded({extended:false}))

app.listen(3007,() => {
    console.log('api server running at http://127.0.0.1:3007')
})