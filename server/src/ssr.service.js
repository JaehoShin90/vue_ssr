const { createBundleRenderer } = require("vue-server-renderer");
const { csrService } = require('./csr.service')
const fs = require('fs');
const { join } = require('path');
// const {JSDOM} = require('jsdom')

// SSR용 템플릿 파일
const ssrTemplatePath = join(process.cwd(), 'template/ssr_index.html');
const template = fs.readFileSync(ssrTemplatePath, 'utf-8');

// Renderer 설정(CSR은 manifest.json 사용, SSR은 bundle.json 사용)
const bundle = require("../public/vue-ssr-server-bundle.json");
const clientManifest = require("../public/vue-ssr-client-manifest.json");
// clientManifest를 전달함으로써 Hydration 적용한다. 그러면 SSR도 SPA 방식으로 동작 가능
const renderer = createBundleRenderer(bundle, { clientManifest, template });

module.exports = {
    async getHtml (context) {

        // SSR 렌더링 실패 시 CSR 사용
        try {
            // JSDOM 사용하면 beforeCreate, created에서 window 및 document 사용가능....?
            // global.document = new JSDOM('<!DOCTYPE html><html><body></body></html>', {url:'http://localhost:3000/'})
            // if (typeof window === 'undefined') {
            //     global.window = document.window;
            //     global.location = window.location;
            //     global.navigator = window.navigator;
            // }
            const result = await renderer.renderToString(context);
            console.log('/server/src/ssr.service.js ----------- after renderToString')
            return result
        } catch (e) {
            console.log(e)
            return await csrService.getHtml(context)
        }

    }
}