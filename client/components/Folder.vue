<template>
<div id="folder_docs">
  <div class="well well-sm">{{folder.docs}}</div>
  <div v-if="folder.docs.length && account.facebook.id==folder.docs[0].created_by">
    <router-link :to="{path:'upload',query: { batch_id: folder.batch_id }}">עדכן אוגדן</router-link>
  </div>

  <h1>פוסט קבצים מרוכז</h1>
  <div v-if="folder.docs_group && account.facebook.id==folder.docs_group.created_by">
    <router-link :to="{path:'upload',query: { batch_id: folder.batch_id }}">עדכן אוגדן</router-link>
  </div>

  <div v-if="folder.docs_group_exists">

    <h2>{{folder.docs_group.description}}</h2>
    <div class="well well-sm content" v-html="folder.docs_group.content"></div>
    <div v-if="folder.docs.length">
      {{folder.docs}}
    </div>
    <div v-if="!folder.docs.length">
      <h2>לא קיימים קבצים באוגדן זה</h2>
    </div>
    <pre class="english code">{{folder}}</pre>
    <pre class="english code">{{account}}</pre>
  </div>


</div>
</template>
<script>
import Store from "../store";

export default {
  data() {
    return {
      folder: {},
      msg: "Hello . I'm vue"
    }
  },
  mounted() {
    let vm = this;
    if (this.query.batch_id) {
      vm.$http.get("api/docs/getbatch/" + this.$route.query.batch_id).then(res => {
        vm.folder = res.data;
      }).catch(err => {

      })
    }
  },
  computed: {
    query() {
      return this.$route.query;
    },
    account: () => {
      return Store.state.account
    }
  }
}
</script>
<style>
.code {
  direction: ltr;
  text-align: left
}
</style>
