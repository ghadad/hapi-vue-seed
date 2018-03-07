<template>
<div id="upload">
  <div class="row">

    <div class="col-md-10">
      <h4><span v-show="active" class="badge label-success">פוסט פעיל</span>
        <span v-show="!active" class="badge  label-danger"> ממתין לפרסום </span>
         קוד תיקיה :  {{batch_id}}      </h4>
      <h4><button v-show="canPublish && !active" class="btn btn-md" @click="setStatus(1)">פרסם תיקיה</button>
        <button v-show="posted && canNew>0  && active" class="btn btn-md btn-danger" @click="setStatus(0)">בטל פרסום</button>
        <button @click="saveBatch()" v-if="description && !descriptionError" class="btn btn-md btn-primary">שמור</button>
        <button class="btn btn-md btn-danger" @click="deleteGroupLevel=1" v-show="canDelete && deleteGroupLevel==0">מחק תיקיה</button>
        <router-link v-show="posted" class="btn btn-md btn-default" :to="{path:'folder',query: { batch_id: batch_id }}"><i class="glyphicon glyphicon-search"> </i> תצוגת תיקייה </router-link>
        <button  class="btn btn-md btn-info" v-show="posted && canNew==1" @click="canNew=2">תיקיה חדש</button>
        <button  class="btn btn-md btn-info" v-show="posted && canNew==2" @click="getNew()">נא אשרו</button>
        <span class="flash" v-show="flash" v-html="flash"></span>

    </h4>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label for="description">כותרת</label>
        <input type="text" v-model="description" class="form-control" id="description" placeholder="תאור קצר - ךלפחות 5 מילים">
        <div class="error">{{descriptionError}} </div>
      </div>
      <h4>			מילות מפתח - נא תייג את התיקיה עם המאפיינים הבאים </h4>

      <div class="cats alert alert-info well-sm"><span @click="toggleTag('props1',$event)" class="btn btn-sm" :class="getClass('props1',t)" v-for="t in availableDocsProps.cat1" :key="t">{{t}}</span></div>
      <div class="cats alert alert-info well-sm"><span @click="toggleTag('props2',$event)" class="btn btn-sm" :class="getClass('props2',t)" v-for="t in availableDocsProps.cat2" :key="t">{{t}}</span></div>
      <div class="cats alert alert-info well-sm"><span @click="toggleTag('props3',$event)" class="btn btn-sm" :class="getClass('props3',t)" v-for="t in availableDocsProps.cat3" :key="t">{{t}}</span></div>
      <editor ref="Editor" :content="reactive_content"></editor>
    </div>
    <div class="col-md-6">
      <div class="alert alert-info">
        <h4>קבצים בתיקייה</h4>
        <div v-show="!posted" class="alert alert-info">בצעו שמירה ע"מ שתוכלו להעלות קבצים לתיקייה</div>
        <vue-dropzone v-show="posted" id="myVueDropzone" :options="dropzoneOptions" v-on:vdropzone-sending="sendingEvent">
        </vue-dropzone>
        <div v-show="!docs.length && posted" class="alert alert-default">עדיין לא העלת קבצים לתיקיה</div>
        <table class="table table-borderd">
          <tr class="list-group" v-for="(f,index) in docs">
            <td style="width:110px" class="td_thumb">
              <img class="thumb-item" :src="f.thumb" />
            </td>
            <td style="width:80%"> <strong>{{f.filename}}</strong>
              <input placeholder="תאור קצר" v-model="f.description" class="form-control" />

            </td>
            <td class="td_btns">
              <button class="btn btn-danger btn-xs" v-show="!f.approveDelete" @click="deleteFile(f,1,index)">מחק</button>
              <button class="btn btn-danger btn-xs" v-show="f.approveDelete==1" @click="deleteFile(f,2,index)"> נא ליחצו שוב לאישור</button>
              <br />
              <button class="btn btn-primary btn-xs">שמור </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>



</div>
</div>
</div>
</div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'

import Store from "../store"

export default {

  name: 'Upload',
  mounted() {
    let vm = this;
    vm.canNew = 0;
    vm.$http.get("/api/docs/props").then(res => {
      vm.$set(vm, 'availableDocsProps', res.data);
    }).catch(err => {
      vm.err = err;
    });
    vm.getData();
  },
  data() {

    let vm = this;
    return {
      flash: "",
      propsState: {
        props1: {},
        props2: {},
        props3: {}
      },
      canNew: 0,
      posted: 0,
      docsProps: {
        cat1: {},
        cat2: {},
        cat3: {}
      },
      content: "",
      active: false,
      spin: false,
      availableDocsProps: {},
      deleteGroupLevel: 0,
      final: false,
      batch_id: "",
      docs: [],
      description: "",
      dropzoneOptions: {
        url: "/api/docs/upload", 
        previewTemplate: `
        <div class="dz-preview dz-file-preview" id="template">  <!-- template for images -->
                                <div class="dz-details dztemplate">
                                    <div class="dz-filename" style="display:none;"><span data-dz-name id="filenamer"></span></div>
                                    <input type="hidden" name="filename" id="hiddeninput"/>

                                    <div class="dz-size"  style="display:none;" data-dz-size></div>
                                    <img data-dz-thumbnail /><br/><input type="text" class="dzinput" placeholder="Type Caption" name="caption" style="font-style:italic;" />
                                    <div class="closebutton" data-dz-remove><i class="fa fa-times-circle"></i></div>
                                </div>
                                <div class="dz-progress" style="display:none;"><span class="dz-upload" data-dz-uploadprogress></span></div>
                                <div class="dz-success-mark" style="display:none;"><span>fff</span></div>
                                <div class="dz-error-mark" style="display:none;"><span>ggg</span></div>
                                <div class="dz-error-message" style="display:none;"><span data-dz-errormessage></span></div>

        `,
        acceptedFiles: "image/*,.doc,.docx,.pdf,.pps,.ppt",
        dictDefaultMessage: "<i style='font-size:25px;color:black' class='dzicon glyphicon glyphicon-cloud-upload'></i> <br />לחצו על כפתור העכבר או גררו את הקבצים לתוך חלון זה",
        dictInvalidFileType: "לא ניתן להעלות סוג קובץ זה",
        dictFileTooBig: "הקובץ גדול מדי ({{filesize}}MiB). גודל מקסימלי הינו : {{maxFilesize}}MiB.",
        maxFiles: 20,
        addCancelLinks: true,
        dictCancelUpload: "בטל שיתוף",
        dictRemoveFile: "מחק קובץ",
        maxFilesize: 256 * 1000,
        addedfile: function(file) {
          vm.spin = true;
        },
        removedfile: function(file) {

        },
        error: function(file, result) {
          //  alert("error" + JSON.stringifydz - complete(result))
          //  alert("error" + JSON.stringify(file))
        },
        success: function(file, result) {
          vm.spin = false;
          console.log("file:", file)
          console.log(result)
          vm.docs.push(result)
        },
      }
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  watch: {
    content: function() {
      this.$refs.Editor.setContent(this.content);
    }
  },
  methods: {

   sendingEvent (file, xhr, formData) {
	let vm = this;
        formData.append('batch_id', vm.batch_id);
      },

    getUrl() { let vm = this ;
	return "/api/docs/upload?batch_id=" + vm.batch_id;
   } ,
    getNew() {
      let vm = this;
      vm.$http.get("/api/docs/getnext").then(res => {
        vm.canNew = 0;
        vm.posted = 0;
        vm.content = ""
        vm.description = ""

        vm.$router.push({
          path: 'upload',
          query: {
            batch_id: res.data.batch_id
          }
        })
        vm.getData();
      }).catch(err => {

      })
    },

    setPropsState(d) {
      let vm = this;

      d.props1.forEach(function(p) {
        console.log(":", p);
        vm.$set(vm.propsState.props1, p, true);
      });
      d.props2.forEach(function(p) {
        vm.$set(vm.propsState.props2, p, true);
      });
      d.props3.forEach(function(p) {
        vm.$set(vm.propsState.props3, p, true);
      });
      console.log("vm.propsState", vm.propsState);

    },
    getPropsState(g) {
      let vm = this;

      d.props1.forEach(function(p) {
        vm.$set(vm.propsState.props1[p], true);
      });
      d.props2.forEach(function(p) {
        vm.$set(vm.propsState.props2[p], true);
      });
      d.props3.forEach(function(p) {
        vm.$set(vm.propsState.props3[p], true);
      });
    },

    getData() {
      let vm = this;
      if (!vm.$route.query.batch_id) {
        vm.$http.get("/api/docs/getbatchid").then(res => {
          vm.batch_id = res.data.batch_id
          vm.$http.get("/api/docs/getbatch/" + vm.batch_id).then(res => {
            vm.description = res.data.docs_group.description
            vm.$set(vm, 'content', res.data.docs_group.content);
            vm.posted = true;
            vm.canNew = 1;
            vm.active = res.data.docs_group.active;
            vm.docs = res.data.docs;
            vm.setPropsState(res.data.docs_group);
          }).catch(() => {})
        }).catch(() => {
          alert("לא מצליח לייצר קוד תיקיה ")
        })
      } else {
        vm.batch_id = vm.$route.query.batch_id

        vm.$http.get("/api/docs/getbatch/" + vm.batch_id).then(res => {

          vm.$set(vm, 'docs', res.data.docs);
          vm.description = res.data.docs_group.description || "י שלמלא תוכן";
          vm.$set(vm, 'content', res.data.docs_group.content);
          vm.active = res.data.docs_group.active;
          vm.setPropsState(res.data.docs_group);
          vm.posted = true;
          vm.canNew = 1;
          vm.$forceUpdate();
        }).catch(() => {

        })
      }
    },
    toggleTag(p, event) {
      let vm = this;
      vm.$set(vm.propsState[p], event.currentTarget.innerText, !vm.propsState[p][event.currentTarget.innerText]);
      // console.log(JSON.parse(JSON.stringify(vm.propsState)))
    },
    getClass(g, p) {
      let vm = this;
      if (vm.propsState[g][p]) return "btn-primary";
      return "btn-default";
    },
    extractProps(g) {
      let vm = this;

      let retVal = [];
      let props = Object.keys(vm.propsState[g])
      props.forEach(function(p) {
        console.log(p, props[g]);
        if (vm.propsState[g][p]) retVal.push(p)
      });
      console.log(retVal);
      return retVal;
    },
    deleteGroup(level) {
      let vm = this;
      vm.deleteGroupLevel = level;
      if (level != 1) return false;
      vm.$http.delete("api/docsgroup", {
        params: {
          batch_id: vm.batch_id
        }
      }).then(res => {}).catch(res => {

      })
    },
    deleteFile(f, level, index) {

      this.$set(f, 'approveDelete', level);
      if (level != 2) return false;

      let vm = this;
      vm.$http.get("api/docs/delete", {
        params: {
          id: f.id
        }
      }).then(result => {
        vm.docs.splice(index, 1)
      }).catch(err => {

      })
    },
    saveBatch(redirect) {

      let vm = this;
      let props1 = vm.extractProps('props1');
      let props2 = vm.extractProps('props2');
      let props3 = vm.extractProps('props3');

      vm.content = vm.$refs.Editor.getContent();
      vm.$http.post("api/docs/batch", {
        description: vm.description,
        content: vm.content,
        batch_id: vm.batch_id,
        props1: props1,
        props2: props2,
        props3: props3,
      }).then(res => {
        vm.canNew = 1;
        vm.posted = 1;
        vm.flash = "נשמר " + "<i class='glyphicon glyphicon-ok'></i>";
        setTimeout(() => {
          vm.flash = ""
        }, 2000)
        if (redirect == true)
          vm.$router.push({
            path: 'folder',
            query: {
              batch_id: vm.batch_id
            }
          })
      }).catch(err => {

      });
    },
    setStatus(status) {
      let vm = this;
      vm.$http.get("api/docs/set_status/" + vm.batch_id + "/" + status).then(res => {
        console.log(res)
        vm.saveBatch(status == 1 ? true : false);
        if (status == 0) {
          vm.getData();
        }
      }).catch(err => {
        console.error(err)
      })
    },
    'showSError': function(err) {
      console.log(err)
    }
  },
  computed: {
    theUrl : function () { 
      let vm = this;
	if(vm.batch_id) return  "/api/docs/upload?batch_id=" + vm.batch_id;
	return "" ;
    },
    reactive_content: function() {
      let vm = this;

      if (vm.content) return vm.content;
      return ""
    },

    canPublish: function() {
      let vm = this;
      if (vm.descriptionError) return false;
      return true;
    },
    canDelete: function() {
      return false;
    },
    descriptionError: function() {
      if (this.description.split(/\s+/).length < 5) {
        return "תאור קצר - מינימום 5 מילים";
      }
    },
    account: () => {
      return Store.state.account
    }
  }
}
</script>
<style scoped>
.thumb-item {
  width: 80px;
}

.td_btns button {
  margin-bottom: 2px
}

.table tr td {
  padding: 5px
}

.table tr {
  border-bottom: 1px solid #CCC
}

td.td_thumb {
  width: 100px !important;
}

.td_thumb img {
  width: 80px;
}

.error {
  color: red
}

.dz-default {
  font-size: 18px
}

.vue-dropzone {
  background: #f9f7f7
}

img.thumb {
  width: 150px
}

span.label {
  cursor: pointer;
}

span.label.label-default {
  border: 1px solid black;
  background-color: white;
  color: black;
}

span.label {
  display: inline-block;
  font-size: 13px;
  line-height: 27px;
  margin-right: 3px;
  margin-bottom: 3px;
}

.cats .btn {
  margin-left: 3px;
  margin-top: 3px
}

.cats.alert {
  margin-bottom: 3px
}

.flash {
  color: green
}

.cats.well {
  margin-bottom: 2px
}
</style>
ght: 3px;
  margin-bottom: 3px;
}

.cats.well {
  margin-bottom: 2px
}
#upload {margin-top:80px}
</style>
