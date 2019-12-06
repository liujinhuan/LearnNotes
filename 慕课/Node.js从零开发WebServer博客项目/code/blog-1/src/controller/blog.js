const getList = (author,keyword)=>{
    return [
        {
            id:1,
            content:"博客1"
        },
        {
            id:2,
            content:"博客2"
        },
        {
            id:3,
            content:"博客3"
        }
    ]
}

const getDetail = (id)=>{
    return {
        id:1,
        content:"博客1"
    }
}

module.exports = {
    getList,
    getDetail
}