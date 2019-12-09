const {loginCheck} = require("../controller/user")
const {
    SuccessModel,
    ErrorModel
}  = require("../model/resmodel")

const handleUser = (req,res)=>{
    const method = req.method

    if(method=="POST" && req.path=="/api/user/login"){
        const res = loginCheck(req.body.name,req.body.pass)
        if(res){
            return new SuccessModel('登录成功')
        }else{
            return new ErrorModel('登录失败')
        }
    }

}

module.exports = handleUser