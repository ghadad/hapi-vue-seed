<template>
<div id="container" class="container-fluid" @mousemove="idleReset">

  <nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation">
    <div class="container topnav">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <ul class="nav navbar-nav navbar-right" v-show="account.facebook.id">
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <img id="profile_pic" class="img-responsive img-circle" :src="'https://graph.facebook.com/v2.9/'+account.facebook.id+'/picture'" />
                <strong> {{account.facebook.displayName}} </strong>
            <span class="caret"></span></a>
            <ul class="dropdown-menu">

              <li v-if="account.facebook.admin">
                <router-link :to="{ path: 'admin/props'}">מאפייני מסמכים :מנהלים בלבד</router-link>
              </li>
              <li v-if="account.facebook.admin">
                <router-link :to="{ path: 'news'}">חדשות/נעוצים :מנהלים בלבד</router-link>
              </li>
              <li>
                <router-link :to="{ path: 'message'}"> <i class="glyphicon glyphicon-envelope"></i> שלח הודעה למנהלי האתר </router-link>
              </li>
              <li><a v-show="account.facebook.id" href="/api/facebook/logout"> <i class="glyphicon glyphicon-log-out"></i> יציאה מהאתר </a></li>
            </ul>
          </li>
        </ul>
        <a v-show="account.facebook.id" class="navbar-brand topnav" href="#"> בית</a>
        <a v-show="!account.facebook.id" class="navbar-brand topnav" href="#">מחסן היצירות של מורות משקיעות</a>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul v-if="account.facebook.id" class="nav navbar-nav navbar-right">
          <li>
            <router-link :to="{ path: 'myfiles'}"> המסמכים שלי &nbsp;<i class="glyphicon glyphicon-folder-open"></i></router-link>
          </li>
          <li>
            <router-link :to="{ path: 'upload'}"> שיתוף קבצים <i class="glyphicon glyphicon-cloud-upload"></i></router-link>
          </li>
          <li>
            <router-link :to="{ path: 'search'}"> חיפוש <i class="glyphicon glyphicon-search"></i></router-link>
          </li>
          <li>
            <router-link :to="{ path: 'donate'}"> תרומה <img style="height:18px" src="/img/donate.png"></router-link>
          </li>


        </ul>

      </div>

    </div>

  </nav>
  <div id="main-router-view" class="container-fluid">
    <router-view></router-view>
  </div>
  <!--pre style="text-align:left;direction:ltr">  {{account}} </pre-->
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
#main-router-view {
  margin-top: 90px
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

#profile_pic {
  height: 40px;
  display: inline
}

a.navbar-brand.topnav,
.navbar-nav>li>a {

  line-height: 34px
}
</style>
