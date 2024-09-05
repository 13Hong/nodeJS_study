const express = require('express')

const app = express()
const cors = require('cors')
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userinfo')
const artcateRouter = require('./router/artcate')
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
// 导入并使用文章路由模块
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)
app.use('/api',userRouter)
app.use('/my',userInfoRouter)
app.use('/my/article',artcateRouter)

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