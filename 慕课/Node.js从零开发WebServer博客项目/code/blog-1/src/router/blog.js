const {getList,getDetail,newBlog,updateBlog,deleteBlog} = require("../controller/blog")
const {
    SuccessModel,
    ErrorModel
}  = require("../model/resmodel")
const handleBlog = (req,res)=>{
    const method = req.method
    if(method=="GET" && req.path=="/api/blog/list"){
        let author = req.query.author
        let keyword = req.query.keyword
        const resdata = getList(author,keyword)
        return new SuccessModel(resdata)
    }

    if(method=="GET" && req.path=="/api/blog/detail"){
        let id = req.query.id
        let detail = getDetail(id)
        return new SuccessModel(detail)
    }

    if(method=="POST" && req.path=="/api/blog/update"){
        const id = req.query.id
        const blog = req.body
        const res = updateBlog(id,blog)
        if(res){
            return new SuccessModel('删除博客成功')
        }else{
            return new ErrorModel('删除博客失败')
        }
    }

    if(method=="POST" && req.path=="/api/blog/del"){
        const id = req.query.id
        const res = deleteBlog(id)
        if(res){
            return new SuccessModel('删除博客成功')
        }else{
            return new ErrorModel('删除博客失败')
        }
    }

    if(method=="POST" && req.path=="/api/blog/add"){
        const blog = req.body
        const res = newBlog(blog)
        if(res){
            return new SuccessModel(res)
        }else{
            return new ErrorModel(res)
        }
        
    }

}

module.exports = handleBlog