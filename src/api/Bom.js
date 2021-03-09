import instance from '@/api/index'
var preUrlPath = "/Bom";

const GetBoms = {
    r: () => {
        return instance.get(`${preUrlPath}/GetBoms`)
    }
}

const GetBomItems = {
    r: (query) => {
        return instance.get(`${preUrlPath}/GetBomItems/${query}`)
    }
}

const CreateBom = {
    r: (query,params) => {
        return instance.post(`${preUrlPath}/CreateBom/${query}`,params)
    }
}

const UpdateBomItem = {
    r: (query,params) => {
        return instance.put(`${preUrlPath}/UpdateBomItem/${query}`,params)
    }
}

export {
    GetBoms,
    GetBomItems,
    CreateBom,
    UpdateBomItem
}