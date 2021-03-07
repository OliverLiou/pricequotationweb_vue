import instance from '@/api/index'
var preUrlPath = "/Oppo";

var Oppo = '/Oppo';

const GetOppos = {
    r: () => {
        return instance.get(`${Oppo}/GetOppos`)
    }
}

const CreateOppo = {
    r: (query, params) => {
        return instance.post(`${preUrlPath}/CreateOppo/${query}`, params)
    }
}

export {
    GetOppos,
    CreateOppo
}