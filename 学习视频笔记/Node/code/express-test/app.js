const express =  require("express")

const  app = express()

app.use((req,res,next)=>{
    console.log("请求开始",req.method,req.url)
    next()
})
// 假设处理cookie
app.use((req,res,next)=>{
    req.cookie = {
        userid:'123123'
    }
    next()
})
// 假设处理postdata
app.use((req,res,next)=>{
    setTimeout(()=>{
        req.body = {
            a:100,b:200
        }
        next()
    })
})
// 处理api
app.use('/api',(req,res,next)=>{
    console.log("处理api路由")
    next()
})

// 处理api
app.get('/api',(req,res,next)=>{
    console.log("处理get路由")
    next()
})

// 处理api
app.post('/api',(req,res,next)=>{
    console.log("处理post路由")
    next()
})

// 处理api
app.get('/api/get-cookie',(req,res,next)=>{
    console.log("处理get-cookie路由")
    res.json({
        errno:0,
        data:req.cookie
    })
})


// 处理api
app.post('/api/get-post-data',(req,res,next)=>{
    console.log("处理get-post-data路由")
    res.json({
        errno:0,
        data:req.body
    })
})

// 404
app.use((req,res,next)=>{
    console.log("处理404")
    res.json({
        errno:-1,
        msg:'404 not found'
    })
})

app.listen(3001,()=>{
    console.log("server is running...")
})