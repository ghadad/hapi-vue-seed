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

        let routes = [{
          path: '/',
          name: 'Home',
          component: Home
        }, {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
            noAuth: true
          }
        }, {
          path: '/myfiles',
          name: 'Myfiles',
          component: Myfiles,
          meta: {
            noAuth: true
          }
        }, {
          name: 'notfound',
          path: '/notfound',
          component: Notfound,
          meta: {
            noAuth: true
          }
        }];



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



        router.beforeEach((to, from, next) => {
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

        export default router;
