const  http = require('http')
const  querystring = require('querystring')

const server = http.createServer((req,res)=>{
    const method = req.method
    const url = req.url
    const path = url.split("?")[0]
    const query = querystring.parse(url.split("?")[1])

    res.setHeader("Content-Type","application/json")

    const resdata = {
        method,
        url,
        path,
        query
    }

    if(method=="GET"){
        res.end(JSON.stringify(resdata))
    }

    if(method=="POST"){
        let  postdata = ""
        req.on("data",chunk=>{
            postdata += chunk.toString()
        })
        req.on("end",()=>{
            resdata.postdata = postdata
            res.end(JSON.stringify(resdata))
        })
    }
})

server.listen(3000,()=>{
    console.log('server listen...')
})