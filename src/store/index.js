import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        score: 0,
        scoreSpeed: 1,
        timer: 120,
        init: true,
        over: false,
    },
    mutations: {
        ["SET_SCORE"](state, score) {
            state.score = score
        },
        ["SET_TIMER"](state, timer) {
            state.timer = timer
        },
        ["SET_START"](state, bool) {
            state.init = bool
        },
        ["SET_OVER"](state, bool) {
            state.over = bool
        }
    },
    actions: {
        addScore(context) {
            context.commit("SET_SCORE", context.state.score + context.state.scoreSpeed)
        },
        intervalTimer(context) {
            if(this.time && context.state.timer === 0) {
                clearTimeout(this.time)
                return
            }
            this.time = setTimeout(() => {
                context.commit("SET_TIMER", context.state.timer - 1)
                context.dispatch("intervalTimer")
            }, 1000)
        }
    },
    modules: {}
})