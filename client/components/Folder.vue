<template>
<div id="folder_docs">
  <div class="text-right">
    <div class="media">
      <a class="pull-right" target="_BLANK" :href="'https://facebook.com/' + folder.docs_group.created_by">
      <img class="img-circle" :src="getUserPic(folder.docs_group.created_by)">
      </a>
      <div class="media-body">
        <h4>{{folder.docs_group.name}}</h4>
        <p class="by-author">עלה בתאריך : {{folder.docs_group.creation_date | simpleDate}}</p>
      </div>
    </div>

  </div>

  <div v-if="folder.docs_group_exists">
    <div class="row">
      <div class="col-md-7">
        <h3>
          <span v-if="account.facebook.admin || account.facebook.id==folder.docs_group.created_by">
          <router-link  class="label label-primary" :to="{path:'upload',query: { batch_id: folder.batch_id }}"><i class="glyphicon glyphicon-pencil"></i></router-link>
        </span>
        {{folder.docs_group.description}}</h3>

        <div class="content " v-html="folder.docs_group.content "></div>
      </div>
      <div class="col-md-5 ">
        <div class="row ">

          <div class="tags col-md-12 ">
            <div class="alert alert-info">
              <h4> תגיות :</h4>
              <div>
                <router-link v-for="p in folder.docs_group.props1" :key="p" :to="{ name: 'Search', query: {term:p,tag:true,init:true}} ">
                  <span class="tag label label-primary ">{{p}}</span>
                </router-link>
              </div>
              <div>
                <router-link v-for="p in folder.docs_group.props2" :key="p" :to="{ name: 'Search', query: {term:p,tag:true,init:true}} ">
                  <span class="tag label label-info ">{{p}}</span>
                </router-link>
              </div>
              <div>
                <router-link v-for="p in folder.docs_group.props3" :key="p" :to="{ name: 'Search', query: {term:p,tag:true,init:true}} ">
                  <span class="tag label label-default ">{{p}}</span>
                </router-link>
              </div>
            </div>
            <h3>            קבצים בתיקיה :
            <a v-show="folder.docs.length " class="btn btn-sm btn-primary " :href=" 'api/docs/getzip/'+folder.batch_id ">הורידו את כל הקבצים <i class="glyphicon glyphicon-download-alt "></i> </a>
          </h3>
            <table class="table table-striped ">
              <thead>
                <td></td>
              </thead>
              <tbody>
                <tr v-for="(r,index) in folder.docs">
                  <td> <span class="badge">{{index+1}}</span></td>
                  <td class="td_thumb"><a type="button" data-toggle="modal" @click="setPicModal(r)" data-target="#myModal">
               <img :class="{ 'enlarge':r.enlarge} " v-if="r.thumb " :src="r.thumb " /></a></td>
                  <td class="td_download text-center ">
                    <a :href=" '/api/docs/getfile/'+r.id ">  <i class="download_thumb glyphicon glyphicon-download"></i>
                      <br />הורדה </a></td>
                  <td class="td_file">

                    <h4>{{r.filename}} </h4>

                  </td>

                </tr>
              </tbody>
            </table>
            <div v-if="!folder.docs.length ">
              <h4>לא קיימים קבצים בתיקיה זה</h4>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!--pre class="english code ">{{folder}}</pre>
    <pre class="english code ">{{account}}</pre-->
  </div>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button " class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">{{modal.title}}</h4>
        </div>
        <div class="modal-body">
          <img class="modal-pic" :src="modal.picUrl">
        </div>
      </div>
    </div>
  </div>
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
      folder: {
        docs_group: {}
      },
      msg: "Hello . I'm vue"
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

img.modal-pic {max-height:500px !important;cursor:zoom-in !important;}

.enlarge {
  cursor: zoom-in;
}

i.download_thumb {
  height: 25px;
  line-height: 35px
}

.tags .tag {
  margin-bottom: 4px
}
</style>
