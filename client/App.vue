<template>
<div id="container" class="container-fluid" @mousemove="idleReset">
  <h2><router-link :to="{ path: '/', params: {} }">מורות משקיעות</router-link></h2>
  <div class="row">
    <div class="col-md-2">
      <div v-if="!account.facebook.id" class="panel panel-default">
        <div class="panel-body">
          <a href="api/facebook/login"><img id="fbloginimg" src="imgs/facebook-login.png" /></a>
        </div>
      </div>
      <div v-if="account.facebook.admin" class="panel panel-danger">
        <!-- Default panel contents -->
        <div class="panel-heading">
          <div class="row">
            <div class="col-md-8">
              <strong>איזור מנהלים</strong>
            </div>
          </div>
        </div>

        <!-- List group -->
        <ul class="list-group">
          <li class="list-group-item">
            <router-link :to="{ path: 'admin/props'}">מאפייני מסמכים</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="{ path: 'news'}">חדשות/נעוצים</router-link>
          </li>
        </ul>
      </div>
      <div v-if="account.facebook.id" class="panel panel-primary">
        <!-- Default panel contents -->
        <div class="panel-heading">
          <div class="row">
            <div class="col-md-4"> <img :src="userPic"></div>
            <div class="col-md-8">
              <div> משתמש מחובר </div>
              <div><strong>{{account.facebook.displayName}} </strong></div>
            </div>
          </div>
        </div>

        <!-- List group -->
        <ul class="list-group">
          <li class="list-group-item">
            <router-link :to="{ path: 'upload'}">העלאת מסמכים</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="{ path: 'myfiles'}">המסמכים שלי</router-link>
          </li>

          <li class="list-group-item">
            <router-link :to="{ path: 'search'}">חיפוש</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="{ path: 'donate'}">תרומה</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="{ path: 'message'}">שלח הודעה למנהלי האתר</router-link>
          </li>
          <li class="list-group-item"> <a v-show="account.facebook.id" href="api/facebook/logout">יציאה מהאתר</a></li>
        </ul>
      </div>
    </div>
    <div class="col-md-10">
      <router-view></router-view>
    </div>
  </div>

  <pre style="text-align:left;direction:ltr">  {{account}} </pre>

</div>
</template>

<script>
let config = {
  idleTime: 3600, // 1 hour
  idleIntervalCheck: 10 // 10 seconds
}
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'container',
  created() {

  },
  data() {
    return {
      idleCountdown: config.idleTime
    }
  },
  watch: {
    idleCountdown: function(newVal) {
      let vm = this;
      if (newVal <= 0) {
        vm.$http.get("api/user/logout").then(
          window.location = "/"
        ).catch(
          window.location = "/"
        )


      }
    },
    account: function(newVal) {
      if (newVal.isauth)
        $("body").removeClass('full')
      else
        $("body").addClass('full')
    }
  },
  methods: {

    ...mapGetters(['getUserAccount']),
    ...mapActions(['setauth']),
    showCookie: function() {
      console.log(document.cookie)
    },
    idleReset() {
      this.idleCountdown = config.idleTime
    }
  },
  mounted() {
    var vm = this;
    vm.$http.get("/api/facebook/profile").then((res) => {
      vm.profile = res.data
      vm.setauth({
        facebook: vm.profile
      });
    }).catch(err => {

    });

    this.setIdleTimer = setInterval(() => {
      this.idleCountdown = this.idleCountdown - config.idleIntervalCheck
    }, config.idleIntervalCheck * 1000);
  },
  computed: {
    account() {
      return this.getUserAccount()
    },
    userPic() {

      return "http://graph.facebook.com/v2.9/" + this.account.facebook.id + "/picture"
    }


  }
}
</script>

<style scoped>
#dis-container {
  margin-top: 70px;
}

#fbloginimg {
  width: 100%
}

pre {
  font-size: 90%;
  line-height: 1.2em;
  font-family: "Courier 10 Pitch", Courier, monospace;
  white-space: pre;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  height: 1%;
  width: auto;
  display: block;
  clear: both;
  color: #555555;
  padding: 1em 1em;
  margin: auto 40px auto 40px;
  background: #f4f4f4;
  border: solid 1px #e1e1e1
}

code {
  font-size: 90%;
  line-height: 1.2em;
  font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
  display: inline;
  color: #555555;
  padding: 1em 1em;
  background: #f4f4f4;
}

.english {
  text-align: left;
  direction: ltr
}

.debug {
  display: none;
  text-align: left;
  direction: ltr
}

.hebrew {
  text-align: right;
  direction: rtl
}

body.full {
  background: url(/assets/images/bg1.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
