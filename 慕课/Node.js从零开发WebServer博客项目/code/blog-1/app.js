const handleBlog = require("./src/router/blog")
const handleUser = require("./src/router/user")
const  querystring = require("querystring")

const getPostData =  (req)=>{
    const promise = new Promise((resolve,reject)=>{
        if(req.method!="POST"){
            resolve({})
            return 
        }

        if(req.headers['Content-Type']!="application/json"){
            resolve({})
            return 
        }

        let postdata = ''
        req.on("data",chunk=>{
            postdata+=chunk.toString()
        })
        req.on("end",()=>{
            if(!postdata){
                resolve({})
                return 
            }
            resolve(JSON.parse(postdata))
        })

    })
    return promise
}


const serverHandle = (req,res)=>{
    res.setHeader("Content-Type","application/json")
    // 提取path
    const url = req.url
    req.path = url.split("?")[0]
    // 提取query
    req.query = querystring.parse(url.split("?")[1])
    // 处理body
    getPostData(req).then((postdata)=>{
        req.body = postdata
        const blog = handleBlog(req,res)
        if(blog){
            res.end(JSON.stringify(blog))
            return 
        }
        const user = handleUser(req,res)
        if(user){
            res.end(JSON.stringify(user))
            return 
        }
        // 未匹配路由
        res.writeHead(404,{"Content-Type":"text/plain"})
        res.write("404 not found")
        res.end()
    })
}

module.exports = serverHandle

