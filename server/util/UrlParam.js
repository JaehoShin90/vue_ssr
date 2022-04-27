module.exports = (url) => {
    const paramQuery = url.split('?')
    let param = {};
    if(paramQuery.length > 1){
        const params = paramQuery[1].split('&');
        for(let i = 0 ; i < params.length ; i++){
            const paramString = params[i].split('=');
            param[paramString[0]] = paramString[1];
        }
    }
    return param;
}