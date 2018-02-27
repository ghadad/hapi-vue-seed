import Vue from 'vue';

Vue.prototype.$bus = new Vue({});

import Moment from 'moment' ;

 
const simpleDate = function(value) {
   return moment(value).format('DD/MM/YYYY');
}
Vue.filter('simpleDate', simpleDate);

import Editor from "./components/Editor.vue" ;
Vue.component('editor', Editor)

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

import moment from 'moment';
Vue.prototype.$moment = moment;


import store from "./store"

import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'


import _ from 'lodash'
Vue.prototype._ = _

import Pagination from "./components/Pagination.vue"
Vue.component('pagination', Pagination)

Vue.config.debug = true
Vue.config.devtools = true

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
  render: h => h(App)
});
