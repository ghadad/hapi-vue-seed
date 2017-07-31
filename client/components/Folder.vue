<template>
<div id="donate">
  <h2>פוסט קבצים מרוכז</h2>{{query}}
  <pre>{{batch}}</pre>
</div>
</template>
<script>
import Store from "../store";

export default {
  data() {
    return {
      batch: {},
      msg: "Hello . I'm vue"
    }
  },
  mounted() {
    let vm = this;
    if (this.$route.query.batch_id) {
      vm.$http.get("api/docs/batch", {
        params: {
          batch_id: this.$route.query.batch_id
        }
      }).then(res => {
        vm.batch = res;
      }).catch(err => {

      })
    }
  },
  computed: {
    query() {
      return this.$route.query;
    },
    account: () => {
      return Store.state
    }
  }
}
</script>
<style>
</style>
