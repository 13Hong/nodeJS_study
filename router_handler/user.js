const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.regUser = (req,res) => {
    const userinfo = req.body
    if(!userinfo.username || !userinfo.password) {
        return res.send({status:1,message:'用户名或密码不合法！'})
    }

    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
          return res.send({ status: 1, message: err.message })
        }
        // 用户名被占用
        if (results.length > 0) {
          return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        }
        // TODO: 用户名可用，继续后续流程...
        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)

        // 定义插入新用户的 SQL 语句
        const sql = 'insert into ev_users set ?'
        // 调用db.query() 执行 SQL 语句
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results) => {
            if(err) return res.send({status:1,message:err.message})
            // 判断 SQL 语句是否执行成功
            if(results.affectedRows !== 1) return res.send({status:1,message:'注册用户失败，请稍后重试！'})
            // 注册用户成功
            res.send({status:0,message:'注册成功！'})
        })
      })

    // res.send('reguser OK')
}

exports.login = (req,res) => {
    res.send('login OK')
}