import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        indexState: 1, //哪个场景
    },
    mutations: {
        ["SET_INDEX"](state, index) {
            state.indexState = index
        }
    },
    actions: {},
    modules: {}
})