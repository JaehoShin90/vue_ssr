module.exports = async (data) => {
    let CustomMetaTag = '';
    if (data) {
        CustomMetaTag += '    <title>' + data.prdNm + '</title>\n'
        CustomMetaTag += '    <meta name="keywords" content=' + data.brdNm + '>\n'
        CustomMetaTag += '    <meta property="og:title" content="' + data.prdNo + '|' + data.prdNm + '">\n'
    }
    return CustomMetaTag;
}