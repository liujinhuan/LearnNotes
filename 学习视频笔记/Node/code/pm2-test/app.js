const  http = require('http')

const server = http.createServer((req,res)=>{
    // 模拟记录日志
    console.log("hello")
    // 模拟记录出错
    console.error("假装出错")
    res.setHeader("Content-Type","application/json")
    res.end(JSON.stringify({
        errno:0,
        msg:"hello pm3"
    }))
})

server.listen(3000,()=>{
    console.log('server listen...')
})