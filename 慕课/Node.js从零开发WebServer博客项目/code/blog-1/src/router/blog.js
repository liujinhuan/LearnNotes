const {getList,getDetail} = require("../controller/blog")
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
        return{
            msg:"更新博客"
        }
    }

    if(method=="POST" && req.path=="/api/blog/add"){
        return{
            msg:"新增博客"
        }
    }

}

module.exports = handleBlog