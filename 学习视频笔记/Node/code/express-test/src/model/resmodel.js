class BaseModel {
    constructor(data,msg){
        // 这里做了兼容，如果第一个参数就是字符串，那么就直接赋值给msg
        if(typeof data=="string"){
            this.msg = data;
            data = null;
            msg = null
        }
        if(data){
            this.data = data
        }
        if(msg){
            this.msg = msg
        }
    }
}

class SuccessModel extends BaseModel{
    constructor(data,msg){
        super(data,msg)
        this.errorno = 0
    }
}

class ErrorModel extends BaseModel{
    constructor(data,msg){
        super(data,msg)
        this.errorno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}