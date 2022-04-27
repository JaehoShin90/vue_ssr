const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');
const isSSR = Boolean(process.env.SSR);

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // server에서 rendering 시 필요
  outputDir: '../server/public',

  pages: {
    index: {
      // SSR과 CSR은 entry point를 다르게 설정한다.
      entry: `src/main${isSSR ? '-ssr' : '' }.js`,
      template: 'public/index.html',

      // 빌드시는 server에서, 일반 vue 실행시는 client에서
      filename: isProduction ? '../template/index.html' : 'index.html',
    }
  },
  chainWebpack: config => {
    // 빌드하는게 아니라면 추가설정 필요없음
    if(!isProduction) return

    // CSR 관련 설정
    if (!isSSR) {
      return config
          .optimization
          .splitChunks({name: 'mainfest', minChunks: Infinity,})
          .end()
          .plugin('ssr').use(new VueSSRClientPlugin ())
    }

    // SSR 관련 설정
    config
        // webpack이 node.js에 적합한 방식으로 dynamic import를 처리할 수 있으며
        // Vue를 컴파일할 때 `vue-loader`가 서버 지향 코드를 내보내도록 합니다.
        .target('node')

        // 공식문서에는 나와있지 않지만, splitChunks를 제거해야 정상적으로 빌드됩니다.
        // server side에서는 어차피 js를 split하여 사용할 필요가 없기 때문입니다.
        // 이 설정이 제외되면 다음과 같은 오류가 발생합니다.
        // Error: Server-side bundle should have one single entry file.
        .optimization
        .delete('splitChunks')
        .end()
        .output
        .libraryTarget('commonjs2')
        .end()

        // css와 scss에는 번들할 때 포함하지 않도록 합니다.
        // 그리고 공식문서에는 `whitelist`로 나와있는데,
        // `allowlist`로 해야 정상작동 합니다. (depatched됨)
        .externals(nodeExternals({ allowlist: /\.css|\.scss$/ }))

        // 이 플러그인을 통해서 server side에서 사용 가능한 bundle을 만들어줍니다.
        .plugin('ssr').use(new VueSSRServerPlugin());
  },
}