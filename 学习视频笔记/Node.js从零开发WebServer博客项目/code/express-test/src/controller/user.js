const loginCheck = (name,pass)=>{
    if(name=="zhangsan"&& pass=="123456"){
        return true
    }else{
        return false
    }
}

module.exports = {
    loginCheck
}