<template>
<div id="wrapper">
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container topnav">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <a v-show="account.facebook.id" class="navbar-brand topnav" href="#"> <i class="glyphicon glyphicon-home"></i></a>
        <a v-show="!account.facebook.id" class="navbar-brand topnav" href="#">מחסן היצירות של מורות משקיעות</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right" v-show="account.facebook.id">
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <img id="profile_pic" class="img-responsive img-circle" :src="'https://graph.facebook.com/v2.9/'+account.facebook.id+'/picture'" />
                <strong> {{account.facebook.displayName}} </strong>
        </a>
          </li>
        </ul>
        <ul v-if="account.facebook.id" class="nav navbar-nav navbar-right">
          <li>
            <router-link :to="{ path: 'myfiles'}"> הקבצים שלי &nbsp;<i class="glyphicon glyphicon-folder-open"></i></router-link>
          </li>
          <li>
            <router-link :to="{ path: 'upload'}"> שיתוף קבצים <i class="glyphicon glyphicon-cloud-upload"></i></router-link>
          </li>
          <li>
            <router-link :to="{ path: 'search'}"> חיפוש <i class="glyphicon glyphicon-search"></i></router-link>
          </li>
          <li><a v-show="account.facebook.id" href="/api/facebook/logout"> <i class="glyphicon glyphicon-log-out"></i> יציאה מהאתר </a></li>

          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <strong>ניהול</strong>
            <span class="caret"></span></a>
            <ul class="dropdown-menu">

              <li v-if="account.facebook.admin">
                <router-link :to="{ path: 'admin/props'}">סיווג מסמכים</router-link>
              </li>
            </ul>
          </li>
          <!--li>
            <router-link :to="{ path: 'donate'}"> תרומה <img style="height:18px" src="/img/donate.png"></router-link>
          </li-->


        </ul>

      </div>

    </div>

  </nav>
</div>
</template>
<!-- /#wrapper -->
<script>
export default {
  name: "sidebar",
  data() {
    return {

    }
  },
  mounted() {
    $(document).ready(function() {
      $(document).on('click', 'a', function(e) {
        $(".navbar-collapse").toggleClass("in");
      });
    });
  },
  props: ["account"],
  computed: {

  }
}
</script>
<style scoped>
.nav>li>a {
  position: relative;
  display: block;
  padding-right: 30px;
}

a.navbar-brand.topnav,
.navbar-nav>li>a {
  line-height: 34px
}

#profile_pic {
  height: 40px;
  display: inline
}
</style>
