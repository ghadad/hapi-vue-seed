import Vue from 'vue';

Vue.prototype.$bus = new Vue({});

import LocalStorage from "store";
Vue.prototype.$localdb = LocalStorage

import Validator from './Validator.js';

Vue.use(Validator.Validator, Validator.options);

import Axios from 'axios'
Vue.prototype.$http = Axios


import Api from "./services/api"
Vue.prototype.Api = Api

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import store from "./store"

import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'


import _ from 'lodash'
Vue.prototype._ = _


Vue.config.debug = true
import App from './App.vue'

import router from './router'

//import { mapActions ,mapGetters} from 'vuex'

let VueObject = Vue;

new Vue({
    methods: {
 
    },
    created() {

    },
    date: {
        root: true
    },
    computed: {},

    el: '#app',
    store,
    router,
    render:h => h(App) 
});
