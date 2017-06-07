<template>
<div class="container" id="login_form">
  <div class="text-center">
    <a v-show="!profile.id" href="api/facebook/login"><img id="fbloginimg" src="imgs/facebook-login.png" /></a>
    <a class="btn btn-primary" v-show="profile.id" href="api/facebook/logout">יציאה מהאתר</a>
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
