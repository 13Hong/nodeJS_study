const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req,res) => {
    const userinfo = req.body
    // if(!userinfo.username || !userinfo.password) {
    //     // return res.send({status:1,message:'用户名或密码不合法！'})
    //     return res.cc('用户名或密码不合法！')
    // }

    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
        //   return res.send({ status: 1, message: err.message })
        return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
        //   return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        return res.cc('用户名被占用，请更换其他用户名！')
        }
        // TODO: 用户名可用，继续后续流程...
        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)

        // 定义插入新用户的 SQL 语句
        const sql = 'insert into ev_users set ?'
        // 调用db.query() 执行 SQL 语句
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results) => {
            if(err)
            //  return res.send({status:1,message:err.message})
            return res.cc(err)
            // 判断 SQL 语句是否执行成功
            if(results.affectedRows !== 1)
            //  return res.send({status:1,message:'注册用户失败，请稍后重试！'})
            return res.cc('注册用户失败，请稍后重试！')
            // 注册用户成功
            // res.send({status:0,message:'注册成功！'})
            res.cc('注册成功！',0)
        })
      })

    // res.send('reguser OK')
}

exports.login = (req,res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username = ?'
    db.query(sql,[userinfo.username],(err,results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('登录失败')

        // 调用 `bcrypt.compareSync(用户提交的密码, 数据库中的密码)` 方法比较密码是否一致
        const compartResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compartResult) return res.cc('登录失败,密码输入错误')

        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn, // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
        // res.send('login OK')
    })


    
}