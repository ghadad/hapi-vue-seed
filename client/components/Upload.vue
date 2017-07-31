<template>
<div id="upload">
  <div class="row-fluid">
    <div class="col-md-6">
      <h2 v-show="1">  קוד אוגדן : {{batch_id}} <button class="btn btn-lg" @click="complete()">פרסם אוגדן</button>
  <button @click="saveBacth()" v-if="description && !descriptionError" class="btn btn-lg btn-primary">שמור</button>
  <button class="btn btn-lg btn-primary">אוגדן חדש</button>
  <button class="btn btn-lg btn-danger" @click="deleteGroupLevel=1" v-show="deleteGroupLevel==0">מחק אוגדן</button>
  <button class="btn btn-lg btn-danger" @click="deleteGroup(1)" v-show="deleteGroupLevel==1">לחצו שוב לאישור</button>
  </h2>
      <div class="form-group">
        <label for="description">שלב א' - תאור קצר</label>
        <input type="text" v-model="description" class="form-control" id="description" placeholder="תאור קצר - לפחות  10 מילים">
        <div class="error">{{descriptionError}} </div>
      </div>
      <div class="form-group">
        <h4>נא תייג את האוגדן עם המאפיינים הבאים</h4>
        <div class="cats well well-sm">קטגוריה 1:<span @click="toggleTag('cat1',$event)" class="label" :class="getClass('cat1',t)" v-for="t in docsProps.cat1" :key="t">{{t}}</span></div>
        <div class="cats well well-sm">קטגוריה 2 :<span @click="toggleTag('cat2',$event)" class="label" :class="getClass('cat2',t)" v-for="t in docsProps.cat2" :key="t">{{t}}</span></div>
        <div class="cats well well-sm">קטגוריה 3:<span @click="toggleTag('cat3',$event)" class="label" :class="getClass('cat3',t)" v-for="t in docsProps.cat3" :key="t">{{t}}</span></div>
      </div>
      <div class="alert alert-info">
        <h3>תאור נרחב <small>כאן תוכלו להוסיף תוכן חופשי , לינקים לסרטונים וכו' ...</small>
        <button v-show="!showEditor"  class="btn btn-sm" @click="showEditor=1">
        <i class="glyphicon glyphicon-pencil"></i>
      </button>
      <button v-show="showEditor"  class="btn btn-sm" @click="showEditor=0">
      <i class="glyphicon glyphicon-resize-small"></i>
    </button>
   </h3>
        <div style="height:300px;overflow:auto;background:white " v-show="!showEditor" v-html="content"></div>
        <vue-editor style="background:white" v-if="showEditor" :editorToolbar="customToolbar" v-model="content"></vue-editor>
      </div>
    </div>
    <div class="col-md-6">
      <div v-show="description && !descriptionError">
        <h4>טעינת קבצים </h4>
        <dropzone id="myVueDropzone" url="/api/docs/upload" :use-custom-dropzone-options="true" :dropzone-options="dropzoneOptions" v-on:vdropzone-error="showSError">
          <input type="hidden" name="batch_id" :value="batch_id">
        </dropzone>
      </div>
      <div class="alert alert-info">
        <h4>הקבצים שהועלו לאוגדן</h4>
        <div v-show="!docs.length" class="well well-sm">עדיין לא העלת קבצים לאוגדן</div>
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
  <pre>{{docProps||json}}</pre>
</div>
</template>
<script>
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{
    'header': 1
  }, {
    'header': 2
  }], // custom button values
  [{
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }],
  [{
    'script': 'sub'
  }, {
    'script': 'super'
  }], // superscript/subscript
  [{
    'indent': '-1'
  }, {
    'indent': '+1'
  }], // outdent/indent
  [{
    'direction': 'ltr'
  }], // text direction

  [{
    'size': ['small', false, 'large', 'huge']
  }], // custom dropdown
  [{
    'header': [1, 2, 3, 4, 5, 6, false]
  }],

  [{
    'color': []
  }, {
    'background': []
  }], // dropdown with defaults from theme
  [{
    'font': []
  }],
  [{
    'align': []
  }],
  ['video'],
  ['clean'] // remove formatting button
];


import Dropzone from 'vue2-dropzone';
import Store from "../store"
import {
  VueEditor
} from 'vue2-editor'

export default {

  name: 'Upload',
  mounted() {
    let vm = this;
    vm.$http.get("/api/docs/props").then(res => {
      console.log(res.data)
      vm.$set(vm, 'docsProps', res.data);
    }).catch(err => {
      vm.err = err;
    });

    vm.$http.get("/api/docs/getbatchid").then(res => {
      vm.batch_id = res.data.batch_id
      vm.$http.get("/api/docs/getbatch/" + vm.batch_id).then(res => {
        vm.description = res.data.docs_group.description
        vm.content = res.data.docs_group.content;
        vm.docs = res.data.docs;

      }).catch(() => {

      })
    }).catch(() => {
      alert("לא מצליח לייצר קוד אוגדן ")
    })


  },
  data() {
    let vm = this;
    return {
      docProps: {
        cat1: {},
        cat2: {},
        cat3: {}
      },
      content: "",
      spin: false,
      docsProps: {},
      deleteGroupLevel: 0,
      showEditor: 0,
      customToolbar: toolbarOptions,
      final: false,
      batch_id: "",
      docs: [],
      description: "",

      dropzoneOptions: {
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
        //addRemoveLinks: true,
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
          //  alert("error" + JSON.stringifydz-complete(result))
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
    Dropzone,
    VueEditor
  },
  methods: {
    toggleTag(g, event) {
      let vm = this;
      let real = event.currentTarget.innerText;
      let prop = real.replace(/\s/g, '');
      let ff = false;
      if (!vm.docProps[g][prop]) {
        vm.$set(vm.docProps[g], prop, {
          status: false,
          real: real
        });
        ff = true;
      }
      vm.$set(vm.docProps[g], prop, {
        status: ff,
        real: real
      });
      console.log(vm.docProps.cat1)
    },
    getClass(g, p) {
      let vm = this;
      p = p.replace(/\s/g, '')
      if (vm.docProps[g][p] && vm.docProps[g][p].status) return "label-primary";
      else
        return "label-default"
    },
    extractProps() {
      let retVal = {
        cat1: [],
        cat2: [],
        cat3: []
      };
      ['cat1', 'cat2', 'cat3'].forEach(c => {
        Object.keys(this.docProps[c]).forEach(p => {
          retVal[c].push(this.docProps[c][p].real)
        })
      })
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
        console.log("delete index error", err)

      })
    },
    saveBacth() {
      let vm = this;
      let props = vm.extractProps();
      console.log("props:", props)
      vm.$http.post("api/docs/batch", {
        description: vm.description,
        content: vm.content,
        batch_id: vm.batch_id,
        props: props
      }).then(res => {}).catch(err => {

      });
    },
    complete() {
      let vm = this;

      vm.$http.get("api/docs/complete", {
        params: {
          batch_id: vm.batch_id
        }
      }).then(res => {}).catch(err => {

      })
    },
    'showSError': function(err) {
      console.log(err)
    }
  },
  computed: {
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
