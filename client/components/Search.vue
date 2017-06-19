<template>
<div id="search">
  <form @submit.prevent class="form form-inline">
    <div class="form-group">
      <label><h2>חיפוש</h2></label>
      <input type="search" class="form-control input-md" v-model="term" placeholder="">
      <button class="btn btn-primary" @click="search('init')">חיפוש</button>
    </div>
  </form>
  <h3 v-show="doSearch">תוצאות חיפוש - {{result.count}} תוצאות</h3>
  <table class="table table-bordered">
    <tbody>
      <tr v-for="r in result.rows">
        <td style="">
          <h3><a :href="'/api/docs/getfile/'+r.id"> {{r.filename}} </a></h3>
          <div v-if="r.keys">תגיות :
            <router-link v-for="k in r.keys" :to="{ name: 'Search', query: {term:k,tag:true}}">
              <span class="tag label label-default">{{k}}</span>
            </router-link>
          </div>
        </td>
        <td class="td_thumb"><img v-if="r.thumb" :src="r.thumb" :class="'tiny'" /></td>
      </tr>
    </tbody>
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
      err: {},
      tag: false
    }
  },
  mounted() {
    if (this.$route.query.term) {
      this.term = this.$route.query.term
      if (this.$route.query.tag) this.tag = true;
      else this.tag = false;
      this.search();
    }
  },
  watch: {
    '$route.query.term': function(oldv, newv) {

      this.term = this.$route.query.term;
      if (this.$route.query.tag) this.tag = true;
      else {
        this.tag = false;
      }
      this.search();
    }
  },
  methods: {
    search(initQ) {
      let vm = this;
      if (!vm.term) return false;
      if (initQ == 'init') {
        vm.$router.push({
          path: 'search',
          query: {
            term: vm.term
          }
        })
      }
      vm.doSearch = true;
      vm.result = [];
      vm.$http.get("api/docs/search", {
        params: {
          term: vm.term,
          tag: vm.tag
        }
      }).then(res => {
        vm.result = res.data;
      }).catch(err => {
        vm.err = err;
      }).then(() => {
        vm.doSearch = false;
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
.tiny {
  width: 120px
}

td.td_thumb {
  max-width: 130px;
  min-width: 130px;
  width: 130px
}

.tag {
  font-size: 13px;
  margin-left: 3px
}
</style>
