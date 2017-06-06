import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../services/api"
Vue.use(Vuex);

import LocalStorage from "store";


// root state object.
// each Vuex instance is just a single state tree.
const state = {
  account: {
    username: "",
    isauth: false,
    isAuthenticated: false,
    groups: [],
    admin: false,
    env: ""
  },
}


const mutations = {

    setauth(state, account) {
      if (account.username) {
        LocalStorage.set("isauth", true)
        Vue.set(state, 'account', {
          username: account.username,
          isauth: true,
          isAuthenticated: true,
          groups: account.groups,
          admin: account.admin,
          env: account.env
        })

      } else {
        LocalStorage.set("isauth", false)
        Vue.set(state, 'account', {
          username: "",
          isauth: false,
          isAuthenticated: false,
          groups: [],
          admin: false,
          env: ""
        })
      }
    }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  checkAuth: ({
    commit
  }) => {
    Api.login().then((res) => {
      commit('setauth', {
        username: res.data.username,
        groups: res.data.groups,
        admin: res.data.admin,
        env: res.data.env
      })
    }).catch(err => {

      window.location.href = "/#/login"
    })
  },
  clearMenu: ({
    commit
  }, account) => commit('setMenu', []),

  setMenu: ({
    commit
  }) => {
    Api.getApps().then((res) => {
      console.log(res.data)
      commit('setMenu', res.data)
    }).catch((err) => {
      console.log(err)
      commit('setMenu', [])
    })
  },
  setauth: ({
    commit
  }, account) => commit('setauth', account),
  clearAuth: ({
    commit
  }) => commit('setauth', {
    username: "",
    groups: []
  })
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

  if (!account.isauth)
    Store.dispatch('clearMenu', [])
  else {
    Vue.nextTick(function() {
      console.log("in watch :", state.account.isauth)
      Store.dispatch('setMenu')
    })
  }
})

export default Store;
