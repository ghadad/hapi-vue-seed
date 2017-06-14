<template>
<div id="search">
  <form @submit.prevent class="form form-inline">
    <div class="form-group">
      <label><h2>חיפוש</h2></label>
      <input type="search" class="form-control input-md" v-model="term" placeholder="">
      <button class="btn btn-primary" @click="search()">חיפוש</button>
    </div>
  </form>
  <h3 v-show="doSearch">תוצאות חיפוש - {{result.count}} תוצאות</h3>
  <table class="table table-bordered">
    <tr v-for="r in result.rows">
      <td style="direction:ltr"><a :href="'/api/docs/getfile/'+r.id"> {{r.filename}} </a></td>
      <td style="direction:ltr">{{$moment(r.creation_date).format('YYYY-MM-DD HH:mm')}}</td>
      <td style="direction:ltr">{{r.md5}}</td>
    </tr>
  </table>
</div>
</template>
<script>
import Store from "../store";

export default {
  data() {
    return {
      doSearch: false,
      term: "",
      msg: "Hello . I'm vue",
      result: [],
      err: {}
    }
  },
  methods: {
    search() {

      let vm = this;

      if (!vm.term) return false;
      vm.doSearch = true;
      vm.result = [];
      vm.$http.get("api/docs/search", {
        params: {
          term: vm.term
        }
      }).then(res => {
        vm.result = res.data;
      }).catch(err => {
        vm.err = err;
      })

    }
  },
  computed: {
    account: () => {
      return Store.state
    }
  }
}
</script>
<style>
</style>
