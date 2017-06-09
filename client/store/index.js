import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../services/api"
Vue.use(Vuex);

import LocalStorage from "store";


// root state object.
// each Vuex instance is just a single state tree.
const state = {
  account: {
    facebook : {},
    admin: false
  },
}


const mutations = {
    setauth(state, account) {

        LocalStorage.set("isauth", true)
        Vue.set(state, 'account', {
          facebook:account.facebook,
          admin: false
        })

},
clearauth(state) {
  LocalStorage.set("isauth", false)
  Vue.set(state, 'account', {
    facebook:{},
    admin: false
  })
}
}
// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
    setauth: ({
    commit
  }, account) => commit('setauth', account),

  clearAuth: ({
    commit
  }) => commit('clearauth')
}

const getters = {
  getUserAccount: state => {
    return state.account
  },
  isAuthenticated: state => {
    return state.account.isauth
  }

}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
let Store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
  //Add watch on state.account
Store.watch((state) => state.account, (account) => {


})

export default Store;
