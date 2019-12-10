const path = require("path")// 统一不同平台的路径
const fs = require("fs")
const readline = require("readline")

const fullfilename = path.join(__dirname,'../','../','logs','access.log')
const readstream = fs.createReadStream(fullfilename)

const rl = readline.createInterface({
    input : readstream
})

let sumline = 0;
let chromeline = 0;

rl.on("line",(data)=>{
    if(!data){
        return ;
    }
    sumline++;
    let arr = data.split("--")
    if(arr && arr[2] && arr[2].indexOf("Chrome")!=-1){
        chromeline++
    }
})
rl.on("close",()=>{
    console.log(chromeline,sumline)
    console.log("chromeline percent --",(chromeline/sumline))
})