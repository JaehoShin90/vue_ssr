const getPrdDtlMeta = require('./meta_tag/product_dtl')

module.exports = async (url, data, html) => {
    let result = html
    let CustomMetaTag = ''
    if (url.indexOf('/ProductDtl') == 0) {
        CustomMetaTag = await getPrdDtlMeta(data)
    }
    result = result.replace('<!--##CustomMetaTag-->', CustomMetaTag)
    return result;
}