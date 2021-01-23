import instance from '@/api/index'
var preUrlPath = "/Bom";

const CreateBom = {
    r: (params) => {
        return instance.post(`${preUrlPath}/CreateBom`, params)
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
    CreateBom,
    GetBoms,
    GetBomDetail
}