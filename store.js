// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false
    },
    mutations: {
        login(state) {
            state.hasLogin = true;
        }
    }
})

export default store
