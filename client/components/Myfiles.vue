<template>
<div id="myfiles">
  <form @submit.prevent class="form form-inline">
    <div class="form-group">
      <label><h2>הקבצים שלי</h2></label>
      <input type="search" class="form-control input-md" v-model="term" placeholder="">
      <button class="btn btn-primary" @click="search('init')">חיפוש</button>
    </div>
  </form>

  <pagination :page="page" :totalPages="totalPages" :totalRows="totalRows" :displayPages="20" @setPage="(val) => { this.setPage(val)}"></pagination>
  <nav v-show="doSearch==2" aria-label="...">
    תוצאות חיפוש - {{result.count}} תוצאות

  </nav>
  <table class="table table-bordered">
    <tbody>
      <tr v-for="(r,index) in result.rows">
        <td class="td_thumb"><img v-if="r.thumb" :src="r.thumb" :class="'tiny'" /></td>
        <td style="">
          <div class="row">
            <div class="col-md-1 text-center">
              <a class="text-center" target="_BLANK" :href="'https://facebook.com/' + r.created_by">
                {{r.facebook_name}}<br />
                                <img class="fb_thumb img-responsive img-circle" :src="getUserPic(r.created_by)" /> </a></div>
            <div class="col-md-11">
              <strong> <span class="badge">{{index+1}}</span><a :href="'/api/docs/getfile/'+r.id"> {{r.filename}} </a></strong>
              <div v-if="r.keys">תגיות :
                <router-link v-for="k in r.keys" :to="{ name: 'Search', query: {term:k,tag:true,init:true}}">
                  <span class="tag label label-default">{{k}}</span>
                </router-link>
              </div>
            </div>
          </div>
        </td>

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
      totalRows: 0,
      doSearch: 0,
      term: "",
      msg: "Hello . I'm vue",
      result: [],
      err: {},
      tag: false,
      page: 0,
      pageSize: 100,
      pageRange: [],
      totalPages: 0
    }
  },
  mounted() {

    this.search();

  },
  watch: {
    '$route.query.term': function(oldv, newv) {

      this.term = this.$route.query.term;
      if (this.$route.query.tag) this.tag = true;
      else {
        this.tag = false;
      }
      if (this.$route.query.page) this.page = this.$route.query.page;
      this.search();
    }
  },
  methods: {
    getUserPic(id) {
      return 'http://graph.facebook.com/v2.9/' + id + '/picture'
    },
    setPage(p) {

      this.page = p;
      this.search();
    },
    search(initQ) {
      let vm = this;

      if (initQ == 'init') {
        vm.page = 0;
        vm.$router.push({
          path: 'search',
          query: {
            myfiles: true,
            term: vm.term
          }
        })
      }
      vm.doSearch = 1;
      vm.result = [];
      vm.$http.get("/api/docs/search", {
        params: {
          myfiles: true,
          term: vm.term,
          tag: vm.tag,
          page: vm.page,
          pageSize: vm.pageSize
        }
      }).then(res => {
        vm.result = res.data;
        vm.page = res.data.currentPage;
        if (vm.page == 0) {
          vm.totalPages = res.data.totalPages
          vm.totalRows = res.data.count

        }

      }).catch(err => {
        vm.err = err;
      }).then(() => {
        vm.doSearch = 2;
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
.fb_thumb {
  height: 40px
}

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
