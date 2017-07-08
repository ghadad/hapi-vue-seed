<template>
<div id="search" class="fixed-content container-fluid">
  <div class="text-center">
    <form @submit.prevent class="form form-inline">
      <div class="form-group">

        <input type="search" class="form-control input-lg" v-model="term" placeholder="">
        <button class="btn btn-primary" @click="search('init')">חיפוש</button>
      </div>
    </form>
  </div>

  <pagination :page="page" :totalPages="totalPages" :totalRows="totalRows" :displayPages="20" @setPage="(val) => { this.setPage(val)}"></pagination>

  <table class="table table-striped">
    <thead>
      <td></td>
    </thead>
    <tbody>
      <tr v-for="(r,index) in result.rows">
        <td class="td_thumb"><a type="button" data-toggle="modal" @click="setPicModal(r)" data-target="#myModal">
           <img :class="{'enlarge':r.enlarge}" v-if="r.thumb" :src="r.thumb" /></a></td>
        <td class="td_profile text-center">
          <div class="text-center">
            <a target="_BLANK" :href="'https://facebook.com/' + r.created_by">
              <div> </div>
              <div><img class="img-circle" :src="getUserPic(r.created_by)"></div>
              <div>{{r.facebook_name}}</div>
            </a>
          </div>
        </td>
        <td class="td_download text-center">
          <a :href="'/api/docs/getfile/'+r.id">  <i class="download_thumb glyphicon glyphicon-download"></i>
          <br />הורדה </a></td>
        <td class="td_file">

          <h4> <span class="badge">{{page*pageSize+index+1}}</span><a :href="'/api/docs/getfile/'+r.id"> {{r.filename}} </a></h4>
          <div class="tags" v-if="r.keys">תגיות :
            <router-link v-for="k in r.keys" :to="{ name: 'Search', query: {term:k,tag:true,init:true}}">
              <span class="tag label label-default">{{k}}</span>
            </router-link>
          </div>
        </td>

      </tr>
    </tbody>
  </table>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">{{modal.title}}</h4>
        </div>
        <div class="modal-body">
          <img :src="modal.picUrl">
        </div>
      </div>
    </div>
  </div>
  <pagination :page="page" :totalPages="totalPages" :totalRows="totalRows" :displayPages="20" @setPage="(val) => { this.setPage(val)}"></pagination>

</div>
</template>
<script>
import Store from "../store";

export default {
  data() {
    return {
      modal: {
        title: "",
        picUrl: ""
      },
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
    if (this.$route.query.term) {
      this.term = this.$route.query.term
      if (this.$route.query.tag) this.tag = true;
      else this.tag = false;
      this.search();
    }
  },
  watch: {
    '$route.query.init': function(oldv, newv) {
      this.search('init');
    },
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
    setPicModal(r) {
      this.modal.picUrl = r.pathurl;
      this.modal.title = r.filename;
    },
    getUserLink(id) {
      if (id == 1) id = 397081443825167;

      //  let fbProfileLink = 'https://facebook.com/' + r.created_by;

      //<a target="_BLANK" :href="'https://facebook.com/' + r.created_by"><img class="img-responsive img-circle" :src="getUserPic(r.created_by)" /> {{r.facebook_name}}</a></div>
      //  if (id == 1) return "/imgs/admin.png";
      return 'http://graph.facebook.com/v2.9/' + id + '/picture'
    },

    getUserPic(id) {
      if (id == 1) return "/imgs/admin.png";
      return 'http://graph.facebook.com/v2.9/' + id + '/picture'
    },
    setPage(p) {

      this.page = p;
      this.search();
    },
    search(initQ) {
      let vm = this;
      if (!vm.term) return false;
      if (initQ == 'init') {
        vm.page = 0;
        vm.$router.push({
          path: 'search',
          query: {
            term: vm.term
          }
        })
      }
      vm.doSearch = 1;
      vm.result = [];
      vm.$http.get("/api/docs/search", {
        params: {
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
.tiny {
  width: 120px
}

.download_thumb {
  font-size: 40px;
  line-height: 60px;
  color: Navy
}

td.td_thumb {
  min-width: 75px;
  width: 75px;
  max-width: 100px;
}

.td_thumb img {
  width: 100%;
}

td.td_profile {
  min-width: 55px;
  width: 55px;
  max-width: 75px;
  padding-right: 15px;
}

.td_profile img {
  width: 100%;
}

.td_file {
  position: relative;
}

.tags {
  position: absolute;
  bottom: 7px;
}

.tag {
  font-size: 13px;
  margin-left: 3px;
  display: inline-block;
}

.td_download {
  min-width: 60px;
  width: 60px;
  max-width: 75px;
}

.enlarge {
  cursor: zoom-in;
}

.modal-body {
  text-align: center;
}

.modal-body img {
  max-width: 100%
}


td.td_file h4 {
  margin-top: 0
}
</style>
