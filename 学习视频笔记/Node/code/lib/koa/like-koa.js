const http = require("http")

// 组合中间件
function compose(middlewares){
    return function(ctx){
        // 中间件调用
        function dispatch(i){
            const fn = middlewares[i]
            try{
                return Promise.resolve(fn(ctx,dispatch.bind(null,i+1)))
            }catch(err){
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}

class LikeKoa2 {
    constructor(){
        this.middlewares = []
    }

    use(fn){
        this.middlewares.push(fn)
    }

    createCtx(req,res){
        const ctx = {
            req,
            res
        }
        ctx.query = req.query
        return ctx
    }

    handleReauest(ctx,fn){
        return fn(ctx)
    }
    callback(){
        const fn = compose(this.middlewares)
        return (req,res)=>{
            const ctx = this.createCtx(req,res)
            return this.handleReauest(ctx,fn)
        }
    }

    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args)
    }   
}
// 工厂函数
module.exports = LikeKoa2