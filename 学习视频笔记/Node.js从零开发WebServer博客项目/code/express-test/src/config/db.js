const env = process.env.NODE_ENV;

let MYSQL_CONFIG = {}
if(env=='dev'){
    MYSQL_CONFIG = {
        host:'localhost',
        port:'3306',
        user:'root',
        password:'***',
        database:'myblog'
    }
}
if(env=='production'){
    // 但其实生产的话这里肯定不一样
    MYSQL_CONFIG = {
        host:'localhost',
        port:'3306',
        user:'root',
        password:'***',
        database:'myblog'
    }
}

module.exports = MYSQL_CONFIGs

