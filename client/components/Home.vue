<template>
<div>
  <div class="intro-header">
    <div>
      <div class="row">
        <div class="col-lg-12">
          <div class="intro-message text-center">
            <h1>מחסן היצירות של מורות משקיעות</h1>
            <h3>... גם מורים משקיעים</h3>
            <div v-show="display" class="text-center">
              <a v-show="!account.facebook.id" href="/api/facebook/login"><img id="fbloginimg" src="/img/fblogin.png" /></a>
              <a target="_blank" v-show="account.facebook.id" href="https://www.facebook.com/groups/397081443825167/">קבוצתנו בפייסבוק</a>
            </div>
            <div v-show="not_member" class="text-center">
              <h1>האתר פתוח לחברי וחברות קבוצת הפייסבוק המהוללת של מורות משקיעות
              עימכם הסליחה</h1>
           </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <!-- /.container -->
</div>
</div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex';

export default {
  name: "Home",
  data: function() {
    return {
      display:true ,
      not_member:false,
      msg: "Message from hello"
    }
  },
  methods: {
    ...mapGetters(['getUserAccount']),
    ...mapActions(['setauth']),
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
.intro-message {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
  max-width: 500px;
  font-size: 1em;
  position: relative;
  padding-top: 10%;
  padding-bottom: 20%;
}

#fbloginimg {
  max-width: 300px
}

#main-router-view {
  margin-top: 0px !important
}
</style>
