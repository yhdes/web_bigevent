// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01',
})

// 向外共享 db 数据库连接对象
module.exports = db

// 测试 mysql 模块能否正常工作
// db.query('select 1', (err, results) => {
//   // mysql 模块工作期间报错了
//   if(err) return console.log(err.message)
//   // 能够成功的执行 SQL 语句
//   console.log(results)
// }) 

// 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
// const user = { username: 'Spider-Man-2', password: 'pcc123' ,status:0}
// // 定义待执行的 SQL 语句,英文的？表示占位符
// const sqlStrr = 'insert into users (username, password,status) values (?, ?,?)'
// // 执行 SQL 语句，使用数组的形式，
// db.query(sqlStrr, [user.username, user.password,user.status], (err, results) => {
//   // 执行 SQL 语句失败了
//   if (err) return console.log(err.message)
//   // 成功了
//   // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
//   // 可以通过 affectedRows 属性，来判断是否插入数据成功
//   if (results.affectedRows === 1) {
//     console.log('插入数据成功!')
//   }
// })
