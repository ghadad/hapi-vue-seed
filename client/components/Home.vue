<template>
<div>
  <div class="intro-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="intro-message">
            <h1>מחסן היצירות של מורות משקיעות</h1>
            <h3>... גם מורים משקיעים</h3>

            <div class="text-center">
              <a v-show="!account.facebook.id" href="/api/facebook/login"><img id="fbloginimg" src="/img/fblogin.png" /></a>
              <a target="_blank" v-show="account.facebook.id" href="https://www.facebook.com/groups/397081443825167/">קבוצתנו בפייסבוק</a>
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
#main-router-view {
  margin-top: 0px !important
}
</style>
