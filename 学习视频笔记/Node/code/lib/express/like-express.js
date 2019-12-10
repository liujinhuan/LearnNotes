const http = require("http")
const slice = Array.prototype.slice

class LikeExpress {
    constructor(){
        this.routes = {
            all:[],// app.use传入的中间件
            get:[],// app.get传入的中间件
            post:[]// app.post传入的中间件
        }
    }

    register(path){
        const info = {}
        if(typeof path=="string"){// 第一个参数是路由字符串
            info.path = path
            info.stack = slice.call(arguments,1)// 从第2位取中间件函数列表，转为数组
        }else{
            info.path = '/'
            info.stack = slice.call(arguments,0)// 从第1位取中间件函数列表，转为数组
        }
        return info
    }

    use(){
        const info = this.register.apply(this,arguments)
        this.routes.all.push(info)
    }

    get(){
        const info = this.register.apply(this,arguments)
        this.routes.get.push(info)
    }

    post(){
        const info = this.register.apply(this,arguments)
        this.routes.post.push(info)
    }

    match(method,url){
        let stack = [];
        if(url=='/favicon.ico'){
            return stack
        }
        // 获取routes
        let curROutes = []
        curROutes = curROutes.concat(this.routes.all)
        curROutes = curROutes.concat(this.routes[method])

        curROutes.forEach((routerinfo)=>{
            // 命中路由的话，就加入到statck中
            // url='/api-cookie' 且 path=='/'
            // url='/api-cookie' 且 path=='/api'
            // url='/api-cookie' 且 path=='/api/get-cookie'
            if(url.indexOf(routerinfo.path)==0){
                stack = stack.concat(routerinfo.stack)
            }
        })
        return stack
    }

    // 中间件核心
    handle(req,res,stack){
        const next = ()=>{
            // 拿到第一个匹配的中间件
            const middleware = stack.shift()
            if(middleware){
                // 执行中间件函数
                middleware(req,res,next)
            }
        }
        next()
    }


    callback(){
        return (req,res)=>{
            res.json = (data)=>{
                res.setHeader("Content-type",'application/json')
                res.end(JSON.stringify(data))
            }
            const url = req.url
            const method = req.method.toLowerCase()

            const resultList = this.match(method,url)
            console.log("resultList----",resultList.toString())
            this.handle(req,res,resultList)
        }
    }

    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args)
    }   
}
// 工厂函数
module.exports = ()=>{
    return new LikeExpress()
}