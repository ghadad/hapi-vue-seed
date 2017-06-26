<template>
<div id="upload">
  <h2 v-show="1">שתף קבצים <button class="hide btn btn-lg" @click="complete()">אשר וסיים</button>
    <button class="btn btn-lg btn-danger" @click="deleteGroupLevel=1" v-show="deleteGroupLevel==0">מחק פוסט</button>
    <button class="btn btn-lg btn-danger" @click="deleteGroup(1)" v-show="deleteGroupLevel==1">לחצו שוב לאישור</button>
      <button class="btn btn-lg btn-primary">פוסט חדש</button>
    batch_id : {{batch_id}}
  </h2>
  <div class="form-group">
    <label for="description">שלב א' - תאור קצר</label>
    <input type="text" v-model="description" class="form-control" id="description" placeholder="תאור קצר - לפחות  10 מילים">
    <div class="error">{{descriptionError}} </div>
  </div>
  <div class="text-center">
    <button @click="saveBacth()" v-if="description && !descriptionError" class="btn btn-lg btn-primary">שמור</button>
  </div>

  <h3>תמיד נשמח לתיאור נרחב <button class="btn btn-sm" @click="showEditor=1">+</button> </h3>
  <vue-editor v-if="showEditor" :editorToolbar="customToolbar" v-model="content"></vue-editor>
  <div v-show="description && !descriptionError">
    <h2>טעינת קבצים </h2>
    <dropzone id="myVueDropzone" url="/api/docs/upload" :use-custom-dropzone-options="true" :dropzone-options="dropzoneOptions" v-on:vdropzone-error="showSError">
      <input type="hidden" name="batch_id" :value="batch_id">
    </dropzone>
  </div>
  facebook
  <div class="row well well-sm " v-for="(f,index) in docs">
    <div class="col-md-2"><img class="thumb" :src="f.thumb" /></div>
    <div class="col-md-10">
      <h3>{{f.filename}}</h3>
      <div class="form-control-group">
        <input v-model="f.description" class="form-control" />
        <button class="btn btn-danger btn-xs" v-show="!f.approveDelete" @click="deleteFile(f,1,index)">{{f.id}}מחק</button>
        <button class="btn btn-danger btn-xs" v-show="f.approveDelete==1" @click="deleteFile(f,2,index)"> נא ליחצו שוב לאישור</button>
        <button class="btn btn-primary btn-xs">{{f.id}}שמור </button>
      </div>
    </div>
  </div>
  {{account}}
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
    vm.$http.get("api/docs/getbatchid").then(res => {
      vm.batch_id = res.data.batch_id
      vm.$http.get("api/docs/getbatch/" + vm.batch_id).then(res => {
        vm.description = res.data.docs_group.description
        vm.content = res.data.docs_group.content;
        vm.docs = res.data.docs;
      }).catch(() => {

      })
    }).catch(() => {
      alert("לא מצליח לקבל קוד אצווה")
    })


  },
  data() {
    let vm = this;
    return {
      deleteGroupLevel: 0,
      showEditor: 0,
      customToolbar: toolbarOptions,
      final: false,
      batch_id: "",
      docs: [],
      description: "",

      dropzoneOptions: {
        previewTemplate: `
                   <div class="dz-preview dz-file-preview">
                       <div class="dz-image" style="width: 200px;height: 200px">
                           <img data-dz-thumbnail />
                      </div>
                       <div class="dz-details">
                         <div class="dz-size"><span data-dz-size></span></div>
                         <div class="dz-filename"><span data-dz-name></span></div>
                       </div>
                       <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                       <div class="dz-error-message"><span data-dz-errormessage></span></div>
                       <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                       <div class="dz-error-mark"><i class="fa fa-close"></i></div>
                   </div>
               `,
        acceptedFiles: "image/*,.doc,.docx,.pdf,.pps,.ppt",
        dictDefaultMessage: "חץ על קליק ימני של העכבר קבצים כאן להעלאה",
        dictInvalidFileType: "לא ניתן להעלות סוג קובץ זה",
        dictFileTooBig: "הקובץ גדול מדי ({{filesize}}MiB). גודל מקסימלי הינו : {{maxFilesize}}MiB.",
        maxFiles: 20,
        //addRemoveLinks: true,
        addCancelLinks: true,
        dictCancelUpload: "בטל שיתוף",
        dictRemoveFile: "מחק קובץ",
        maxFilesize: 256 * 1000,
        addedfile: function(file) {
          console.log("addedfile", file)
          $(".dz-complete")
        },
        removedfile: function(file) {

        },
        error: function(file, result) {
          //  alert("error" + JSON.stringifydz-complete(result))
          //  alert("error" + JSON.stringify(file))
        },
        success: function(file, result) {
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
      vm.$http.post("api/docs/batch", {
        description: vm.description,
        content: vm.content,
        batch_id: vm.batch_id
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
      if (this.description.split(/\s+/).length < 10 && this.description.length > 1) {
        return "נא כתבו תיאור איכותי עם לפחות 10 מילים ";
      }
    },
    account: () => {
      return Store.state.account
    }
  }
}
</script>
<style scoped>
.error {
  color: red
}

img.thumb {
  width: 150px
}
</style>

</style>
