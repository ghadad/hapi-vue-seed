        import Vue from 'vue'
        import Router from 'vue-router'
        import LocalStorage from "store";
        // fix Promise undefined error on hte fucker IE 11
        var Promise = require('es6-promise');

        Vue.use(Router);
        import Home from '../components/Home.vue'
        import Login from '../components/login.vue'
        import Myfiles from '../components/Myfiles.vue'
        import Notfound from '../components/Notfound.vue'
        import Upload from '../components/Upload.vue'
        import Search from '../components/Search.vue'
        import Donate from '../components/Donate.vue'
        import Message from '../components/Message.vue'
        import Props from '../components/Props.vue'
        import Docspost from '../components/Docspost.vue'
        import Folder from '../components/Folder.vue';
        import Editor from "../components/Editor.vue" ;
        Vue.component('editor', Editor)
        
        let routes = [{
            path: '/home',
            name: 'Home',
            component: Home
          }, {
            path: '/',
            name: 'Home',
            component: Home
          },
          {
            path: '/donate',
            name: 'Donate',
            component: Donate
          }, {
            path: '/docspost',
            name: 'Docspost',
            component: Docspost
          }, {
            path: '/message',
            name: 'Message',
            component: Message
          }, {
            path: '/upload',
            name: 'Upload',
            component: Upload
          }, {
            path: '/search',
            name: 'Search',
            component: Search
          }, , {
            path: '/admin/props',
            name: 'Props',
            component: Props
          },
          {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
              noAuth: true
            }
          }, {
            path: '/myfiles',
            name: 'myfiles',
            component: Myfiles,

          }, {
            path: '/folder',
            name: 'folder',
            component: Folder,

          }, {
            name: 'notfound',
            path: '/notfound',
            component: Notfound,

          }
        ];



        routes.push({
          path: '/*',
          redirect: {
            name: 'notfound'
          }
        });

        let router = new Router({
          routes: routes //,
          //mode: 'history'
        });

        import Store from "../store";
        router.beforeEach((to, from, next) => {
          window.scrollTo(0, 0)
          next()
        })


        /*   router.beforeEach((to, from, next) => {
          if (to.matched.some(record => record.meta.noAuth)) {
            next()
          } else {

            if (LocalStorage.get('isauth')) {
              return next()

            } else {
              next({
                path: '/login',
                query: {
                  redirect: to.fullPath
                }
              })
            }
          }
        })
*/
        export default router;
