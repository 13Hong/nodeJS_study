const express = require('express')

const app = express()
const cors = require('cors')
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userinfo')
const joi = require('joi')
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(cors())
// 配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件
app.use(express.urlencoded({extended:false}))
app.use((req,res,next) => {
    res.cc = (err,status=1) => {
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))
app.use('/api',userRouter)
app.use('/my',userInfoRouter)

app.use((err,req,res,next) => {
    // 数据验证失败
    if(err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)
})
app.listen(3007,() => {
    console.log('api server running at http://127.0.0.1:3007')
})