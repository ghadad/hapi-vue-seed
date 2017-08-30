<template>
<div id="folder_docs">
  <div v-if="account.facebook.id==folder.docs_group.created_by">
    <router-link :to="{path:'upload',query: { batch_id: folder.batch_id }}">עדכן אוגדן</router-link>
   </div>

  <h2>אוגדן : {{folder.docs_group.description}}</h2>
  <div v-if="folder.docs_group_exists">
  <div class="row">
    <div class="col-md-8">
    <div class="content" v-html="folder.docs_group.content"></div>
    </div>
    <div class="col-md-4">
    <div class="tags" v-if="folder.docs_group.props">תגיות :
      <span v-for="k in Object.keys(folder.docs_group.props)">

      <router-link v-for="p in folder.docs_group.props[k]" :to="{ name: 'Search', query: {term:p,tag:true,init:true}}">
        <span class="tag label label-default">{{p}}</span>
      </router-link>
      </span>
    </div>

    </div>
    </div>
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
