const axios = require("axios");
const UrlParam = require('../util/UrlParam')

module.exports = async (url) => {
    let result = {};
    let param = UrlParam(url);
    if (url.indexOf('/ProductDtl') == 0) {
        if (param.prdNo) {
            await axios.get('http://localhost:8095/prd/product', {params: param})
                .then(response => {
                    if (response && response.data.length == 1) {
                        result = response.data[0]
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return result;
}