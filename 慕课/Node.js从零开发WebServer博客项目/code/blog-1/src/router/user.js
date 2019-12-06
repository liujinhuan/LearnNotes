const handleUser = (req,res)=>{
    const method = req.method

    if(method=="POST" && req.path=="/api/user/log"){
        return{
            msg:"登录接口"
        }
    }

}

module.exports = handleUser