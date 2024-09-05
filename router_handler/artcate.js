const db = require('../db/index')

exports.getArticleCates = (req,res) => {
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(sql,(err,results) => {
        if(err) return res.cc(err)
        
        res.send({
            status:0,
            message:'获取文章分类列表成功',
            data:results
        })
    })
}

exports.addArticleCates = (req,res) => {
    const sql = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(sql,[req.body.name,req.body.alias],(err,results) => {
        if(err) return res.cc(err)
        if(results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if(results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        const sql = 'insert into ev_article_cate set ?'
        db.query(sql,[req.body],(err,results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.send({
                status:0,
                message:'新增文章分类成功！'
            })
        })
    })
}

exports.deleteCateById = (req,res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql,[req.params.id],(err,results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')

        // 删除文章分类成功
        res.cc('删除文章分类成功！', 0)
    })
    
}

exports.getArticleById = (req,res) => {
    const sql = 'select * from ev_article_cate where id = ?'
    db.query(sql,[req.params.id],(err,results) => {
        if(err) return res.cc(err)
        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')

        res.send({
            status:0,
            message:'获取文章分类数据成功!',
            data:results[0]
        })
    })
}

exports.updateCateById = (req,res) => {
    const sql = 'select * from ev_article_cate where id != ? and (name = ? or alias = ?)'
    db.query(sql,[req.body.Id,req.body.name,req.body.alias],(err,results) => {
        if(err) return res.cc(err)
        if(results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if(results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        const sql = 'update ev_article_cate set ? where id = ?'
        db.query(sql,[req.body,req.body.Id],(err,results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            res.send({
                status:0,
                message:'更新文章分类成功！'
            })
        })
    })
}