// 导入处理路径的 path 核心模块
const path = require('path')
// 导入数据库操作模块
const db = require('../db/index')

// 发布新文章的处理函数
exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
  
    // TODO：表单数据合法，继续后面的处理流程...
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }
    console.log({...req.body},77)
    const sql = `insert into ev_articles set ?`
    // 执行 SQL 语句
    db.query(sql, [articleInfo], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
    
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')
    
        // 发布文章成功
        res.cc('发布文章成功', 0)
    })
}

exports.getArticleList = (req,res) => {
    const sql = 'select title,name,pub_date,state from ev_articles,ev_article_cate where ev_articles.cate_id = ev_article_cate.id'
    db.query(sql,(err,results) => {
        if(err) return res.cc(err)
        res.send({
            status:0,
            message:'获取文章数据成功！',
            data:results
        })
    })
}