import instance from '@/api/index'
var preUrlPath = "/Bom";

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
    GetBoms,
    GetBomDetail
}