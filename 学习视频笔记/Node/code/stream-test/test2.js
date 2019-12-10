// 复制文件

// const path = require("path")// 统一不同平台的路径
// const fs = require("fs")

// const filename1 = path.resolve(__dirname,"data.txt")
// const filename2 = path.resolve(__dirname,"data-bak.txt")

// const ReadStream = fs.createReadStream(filename1)
// const WriteStream = fs.createWriteStream(filename2)

// // 关键部分
// ReadStream.pipe(WriteStream)

// ReadStream.on("data",(chunk)=>{
//     console.log(chunk.toString())
// })
// ReadStream.on("end",()=>{
//     console.log("copy done!")
// })


// http 读文件

const path = require("path")// 统一不同平台的路径
const fs = require("fs")
const http = require("http")
const filename1 = path.resolve(__dirname,"data.txt")

const server = http.createServer((req,res)=>{
    const ReadStream = fs.createReadStream(filename1)
    ReadStream.pipe(res)
})
server.listen(3000)