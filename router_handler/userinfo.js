const db = require('../db/index')

exports.getUserInfo = (req,res) => {

    const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
    db.query(sql,req.user.id,(err,results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        res.send({
            status:0,
            message:'获取用户基本信息成功！',
            data:results[0]
        })
        })
        
    
}

exports.updateUserInfo = (req,res) => {
    const sql = 'update ev_users set ? where id = ?'
    db.query(sql,[req.body,req.user.id],(err,results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
        return res.cc('修改用户信息成功',0)
    })
}