export default (fieldList)=>{
    const res={};
    Object.keys(fieldList).forEach((name)=>{
        res[name]=fieldList[name].info
    });
    return res;
};
