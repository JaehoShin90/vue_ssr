const express = require('express');
const router = express.Router();
const ssrService = require("../src/ssr.service");
const csrService = require("../src/csr.service");
const store = require('../src/store');
const ssrUrlList = require('./ssr_url_list');
const convertMetaTag = require('../util/ConvertMetaTag');
const SsrPageDataUtil = require('../util/SsrPageDataUtil')


// 특정 URL만 SSR 적용
router.get(ssrUrlList, async ({url}, res) => {
    console.log('/server/router/main.js')
    // 서버에서 조회한 데이터를 store를 활용하여 Vue로 전달
    // 여기서는 상품정보 호출 후 전달
    const data = await SsrPageDataUtil(url);
    store.setState({ssrRenderData: data})
    const {state} = store;
    res.send(await convertMetaTag(url, data, await ssrService.getHtml({url, state})));
});

// 나머지 URL은 CSR 적용
router.get("/*", async ({url}, res) => {
    console.log('CSR')
    res.send(await csrService.getHtml({url}));
});

module.exports = router