const path = require("path")// 统一不同平台的路径
const fs = require("fs")

function writelog(writestream,log){
    writestream.write(log+"\n")
}

function createWriteStream(filename){
    const fullfilename = path.join(__dirname,'../','../','logs',filename)
    const writestream = fs.createWriteStream(fullfilename,{
        flags:'a'
    })
    return writestream
}


const accesswritestream = createWriteStream("access.log")
function access (log) {
    writelog(accesswritestream,log)
}

module.exports = {
    access
}