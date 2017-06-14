<template>
<div id="search">

  <h2>חיפוש</h2>
  <form @submit.prevent>
    <input type="search" class="form-control" v-model="term" placeholder="Text input">
    <button @click="search()">חפש</button>
    <table class="table table-bordered">
      <tr v-for="r in result">
        <td style="direction:ltr"><a :href="'/api/docs/getfile/'+r.id"> {{r.filename}} </a></td>
        <td style="direction:ltr">{{$moment(r.creation_date).format('YYYY-MM-DD HH:mm')}}</td>
        <td style="direction:ltr">{{r.md5}}</td>
      </tr>
    </table>
  </form>
</div>
</template>
<script>
import Store from "../store";

export default {
  data() {
    return {
      term: "",
      msg: "Hello . I'm vue",
      result: [],
      err: {}
    }
  },
  methods: {
    search() {
      let vm = this;
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
