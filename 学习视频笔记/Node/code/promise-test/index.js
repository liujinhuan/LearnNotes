const fs = require("fs")
const path = require("path")

// function getFileContent(filname,callback){
//     const realname = path.resolve(__dirname,"files",filname)
//     fs.readFile(realname,(err,data)=>{
//         if(err){
//             console.log(err)
//             return 
//         }
//         callback(JSON.parse(data.toString()))
//     })
// }

// callback-hell
// getFileContent("a.json",(adata)=>{
//     console.log(adata)
//     getFileContent(adata.next,(bdata)=>{
//         console.log(bdata)
//         getFileContent(bdata.next,(cdata)=>{
//             console.log(cdata)
//         })
//     })
// })



function getFileContent(filname){
    const promise = new Promise((resolve,reject)=>{
        const realname = path.resolve(__dirname,"files",filname)
        fs.readFile(realname,(err,data)=>{
            if(err){
                reject(err)
                return 
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise
}
// promise 异步写法

// getFileContent("a.json").then((adata)=>{
//     console.log(adata)
//     return getFileContent(adata.next)
// }).then((bdata)=>{
//     console.log(bdata)
//     return getFileContent(bdata.next)
// }).then((cdata)=>{
//     console.log(cdata)
// })

// async/await要点

// 1. await后面可以追加promise对象
// 2. await必须包裹在async方法内
// 3. async函数返回的是promise对象
// 4. try-catch 截获promise中的reject的值

// koa2
// async function readFileData(){
//     // 同步写法
//     const adata = await getFileContent("a.json")
//     console.log("adata,",adata)
//     const bdata = await getFileContent(adata.next)
//     console.log("bdata,",bdata)
//     const cdata = await getFileContent(bdata.next)
//     console.log("cdata,",cdata)
// }
// readFileData()


async function readFileAData(){
    // 同步写法
    const adata = await getFileContent("a.json")
    return adata
}

readFileAData().then((data)=>{
    console.log("data,",data)
})


