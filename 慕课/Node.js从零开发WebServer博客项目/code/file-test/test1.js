const path = require("path")// 统一不同平台的路径
const fs = require("fs")

const filename = path.resolve(__dirname,'data.txt')

// 读取文件：问题:文件很大的情况呢？
fs.readFile(filename,(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    // data是二进制类型，需要转为字符串
    console.log(data.toString())
})

// 写入:每次都写入也好性能？写个很大的文件呢？
const content = "this is new content"
const opt = {
    flag:'a'//写入方式是追加
}
fs.writeFile(filename,content,opt,(err)=>{
    if(err){
        console.log(err);
    }
})

// 判断文件是否存在？
fs.exists(filename,(exists)=>{
    console.log("exists is ",exists)
})