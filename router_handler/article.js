
// 导入数据库操作模块
const { ok } = require('assert')
const db = require('../db/index')

// 导入处理路径的 path 核心模块
const path = require('path')




// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  console.log(req.file) // 文件类型的数据
  console.log(req.body) // 文本类型的数据
  // 手动判断是否上传了文章封面
// if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

// TODO：表单数据合法，继续后面的处理流程...
// 导入数据库操作模块
const articleInfo = {
  // 标题、内容、状态、所属的分类Id
  ...req.body,
  // 文章封面在服务器端的存放路径
  // cover_img: path.join('/uploads', req.file.filename),
  // 文章发布时间
  pub_date: new Date(),
  // 文章作者的Id
  author_id: req.user.id,
}
const sql = `insert into ev_articles set ?`
// 执行 SQL 语句
db.query(sql, articleInfo, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)
  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('发布文章失败！')
  // 发布文章成功
  res.cc('发布文章成功', 0)
})
}


exports.getArticle=(req,res)=>{
  // res.send('ok')
console.log(res.params)
console.log(req.params)
// const pagesize = Number(req.params.pagesize) // 每页的数据条数
// const pagenum = Number(req.params.pagenum) // 当前页码
const pagesize = req.params.pagesize // 每页的数据条数
const pagenum = req.params.pagenum // 当前页码
const limit = pagesize// 每页的数据条数
const offset = (pagenum - 1) * pagesize // 从第几条数据开始返回

// 使用 LIMIT 和 OFFSET 进行分页查询
const  sql = `SELECT * FROM ev_articles LIMIT ${limit} OFFSET ${offset}`
// const  sql = `SELECT * FROM ev_articles`
// const  sql = `SELECT * FROM ev_articles LIMIT ? OFFSET ?`


// db.query(sql,[limit,offset],(err, results) => {
  db.query(sql,(err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.cc(err)
  // 2. 执行 SQL 语句成功
  res.send({
    status: 0,
    message: '获取文章列表成功！',
    data: results,
  })
})
}

// 删除
exports.deleteArticleById = (req, res) => {
  const sql = `update ev_articles set is_delete=1 where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('删除文章失败！')
  
    // 删除文章分类成功
    res.cc('删除文章成功！', 0)
  })
  // res.send('ok')
}

// 获取详情
exports.getArticleById = (req, res) => {
  const sql = `select * from  ev_articles where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
  
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
    
      // SQL 语句执行成功，但是没有查询到任何数据
      if (results.length !== 1) return res.cc('获取文章数据失败！')
    
      // 把数据响应给客户端
      res.send({
        status: 0,
        message: '获取文章数据成功！',
        data: results[0],
      })
    })
  // res.send('ok')
}

//更新文章

// 更新文章分类的处理函数
exports.updateArticle = (req, res) => {
  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句


  // 判断 分类名称 和 分类别名 是否被占用
  // if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
  // if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
  // if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

  // TODO：更新文章
  const sql = `update ev_articles set ? where Id=?`
  db.query(sql, [req.body, req.body.Id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新文章失败！')
    // 更新文章成功
    res.cc('更新文章成功！', 0)
  })

}



 