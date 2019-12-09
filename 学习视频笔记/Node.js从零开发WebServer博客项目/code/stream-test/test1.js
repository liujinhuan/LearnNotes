
// 标准输入输出
// process.stdin.pipe(process.stdout)

// req.pipe(res)
const http = require("http")
const server = http.createServer((req,res)=>{
    req.pipe(res)
})
server.listen(3000)