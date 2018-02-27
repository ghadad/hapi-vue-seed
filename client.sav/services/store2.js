import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../services/api"
Vue.use(Vuex);


// root state object.
// each Vuex instance is just a single state tree.
const state = {
    account: {
        username: "",
        isauth: false,
        isAuthenticated: false
    },
    menu: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {

    setMenu(state, items) {
        state.menu = items
    },

    setauth(state, account) {
        if (account.username) {
            state.account.username = account.username
            state.account.isauth = true
            state.account.isAuthenticated = true
        } else {
            state.account = {
                username: "",
                isauth: false,
                isAuthenticated: false
            }
        }
    }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
    checkAuth({
        commit
    }) {
        Api.login().then((res) => {
            commit('setauth', {
                username: res.data.username
            })
        })
    },
    setMenu: ({
        commit
    }, items) => commit('setMenu', items),
    setauth: ({
        commit
    }, account) => commit('setauth', account),
    clearAuth: ({
        commit
    }) => commit('setauth', {
        username: ""
    })
}

const getters = {
    getMenu: state => {
        return state.menu;
    },
    getUserAccount: state => {
        return state.account
    },
    isAuthenticated: state => {
        return state.account.isauth
    }

}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})