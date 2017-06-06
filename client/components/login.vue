<template>
<div class="container" id="login_form">
  <div class="text-center">
    <a href="api/facebook/login"><img id="fbloginimg" src="imgs/facebook-login.png" /></a><br>
    <a @click="fblogin()">AJAX : <img id="fbloginimg" src="imgs/facebook-login.png" /></a>
  </div>
  <pre> profile :{{profile}}</pre>

  <pre>ERROR: {{err}}</pre>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  data() {
    return {
      profile: {},
      result: {},
      spin: false,
      username: '',
      password: '',
      err: ''
    }
  },
  mounted() {
    var vm = this;
    vm.$http.get("/api/facebook/profile").then((res) => {
      vm.profile = res.data
    }).catch(err => {

    });
  },
  methods: {
    ...mapActions(['setauth']),
    fblogin() {
      var vm = this;
      vm.$data.err = ''
      vm.spin = true
      vm.$http.get("/api/facebook/login").then((res) => {
        vm.result = res.data;
      }).catch(err => {
        vm.err = err;
      }).then(() => {
        vm.spin = false
      });

    },

    setData(login, pass) {
      this.username = login
      this.password = pass
    }
  }
}
</script>

<style scoped>
#fbloginimg {
  height: 100px
}

#login_form #spinner {
  margin-top: 30px
}

.error {
  color: red;
  font-size: 1.2em
}
</style>
