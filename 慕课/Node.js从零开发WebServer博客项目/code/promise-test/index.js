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

getFileContent("a.json").then((adata)=>{
    console.log(adata)
    return getFileContent(adata.next)
}).then((bdata)=>{
    console.log(bdata)
    return getFileContent(bdata.next)
}).then((cdata)=>{
    console.log(cdata)
})

// async/await
// koa2