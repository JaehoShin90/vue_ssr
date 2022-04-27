import Vue from 'vue';
import App from './App.vue';

Vue.prototype.$axios = axios

// SSR은 다수의 사용자가 존재하기 때문에 각 사용자별로 생성해줘야 한다.
import createRouter from './router';
import createStore from './store';
import axios from "axios";


export default (context) => new Promise(async (resolve, reject) => {

    const router = createRouter();
    const store = createStore();
    const { url, state } = context;
    // state 반영
    store.commit('SET_SSR_RENDER_DATA', state.ssrRenderData);


    // Server URL로 router 이동
    await router.push(url);

    // Router 반영 완료 후 vue 생성하여 전달
    // Server에서는 renderToString으로 페이지를 String으로 변환하여 사용
    router.onReady(() => resolve(
        new Vue({
            router,
            store,
            render: h => h(App)
        }))
    );
})