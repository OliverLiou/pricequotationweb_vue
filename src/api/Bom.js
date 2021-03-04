import instance from '@/api/index'
var preUrlPath = "/Bom";

const CreateBoms = {
    r: (query,params) => {
        return instance.post(`${preUrlPath}/CreateBoms/${query}`, params)
    }
}

const GetBoms = {
    r: () => {
        return instance.get(`${preUrlPath}/GetBoms`)
    }
}

const GetBomDetail = {
    r: (query) => {
        return instance.get(`${preUrlPath}/GetBomDetail/${query}`)
    }
}

export {
    CreateBoms,
    GetBoms,
    GetBomDetail
}