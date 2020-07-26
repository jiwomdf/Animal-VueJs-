import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        loginUserName: localStorage.getItem('userName') || "",
    },
    getters: {
        getLogin: state => {
            return state.loginUserName
        }
    },
    mutations: {
        setLogin: (state, userName) => {

            if (userName == null || userName == undefined || typeof userName != "string")
                userName = ""

            state.loginUserName = userName
            localStorage.setItem('userName', userName)
        },
        delLogin: state => {
            localStorage.removeItem('userName')
            state.loginUserName = ""
        },
    }
})