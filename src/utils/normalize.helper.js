import normalize from 'json-api-normalize';
export default (response,{data,key}) => {
    
let dataNormalize = {}
    const getData = normalize(response).get(data);
    return {
        ...dataNormalize,
        meta: response.meta ? response.meta  : null,
        data: key ? getData[key] : getData
    }
}