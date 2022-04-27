import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore() {
    return new Vuex.Store({
        state: {
            // SSR시 서버에서 조회한 데이터를 전달받기 위한 변수
            ssrRenderData: {}
        },
        getters: {},
        mutations: {
            SET_SSR_RENDER_DATA(state, ssrRenderData) {
                state.ssrRenderData = ssrRenderData;
            }
        },
        actions: {},
        modules: {}
    })
}
