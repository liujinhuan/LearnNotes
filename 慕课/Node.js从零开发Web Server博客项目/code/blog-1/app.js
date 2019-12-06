const serverHandle = (req,res)=>{
    res.setHeader("Content-Type","application/json")
    const resdata = {
        name:'liuqiqi',
        age:'181',
        env: process.env.NODE_ENV,
        aaa: process.env.aaa
    }
    res.end(JSON.stringify(resdata))
}

module.exports = serverHandle