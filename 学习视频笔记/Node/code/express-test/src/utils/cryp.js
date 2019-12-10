const crypto = require("crypto")
// 密匙
const CRYPTO_KEY = 'qFlio@2019_+'

function md5(content){
    let md5 = crypto.createHash("md5")
    return md5.update(content).digest("hex")
}

function genPasword(password){
    let str = `password=${password}&key=${CRYPTO_KEY}`
    return md5(str)
}

// 明文一样，加密后的一样
// const res = genPasword('789adf')
// console.log(res)

module.exports = {
    genPasword
}