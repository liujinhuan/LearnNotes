const mysql = require("mysql")
// 创建连接对象。但是这里生产和开发环境肯定是 不一样的，可以用通过NODE_ENV来判断。
const con = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'***',
    database:'myblog'
})
// 开始连接
con.connect()

const sql = `select * form blog;`
// 执行sql语句
con.query(sql,(err,result)=>{
    if(err){
        return ;
    }
    console.log(result)
})
// 关闭连接
con.end()