<template>
<div id="upload">
  <h2 v-show="final">שתף קבצים <button class="btn btn-lg" @click="complete()">אשר וסיים</button>
    <button class="btn btn-lg btn-danger">מחק</button>
    batch_id : {{batch_id}}
  </h2>
  <div class="form-group">
    <label for="description">שלב א' - תאור קצר</label>
    <input type="text" v-model="description" class="form-control" id="description" placeholder="תאור קצר - לפחות  10 מילים">
    <div class="error">{{descriptionError}} </div>
  </div>
  <div class="text-center">
    <button @click="saveBacth()" v-if="description && !descriptionError" class="btn btn-lg btn-primary">הבא</button>
  </div>

  <h3>תמיד נשמח לתיאור נרחב <button class="btn btn-sm" @click="showEditor=1">+</button> </h3>
  <vue-editor v-if="showEditor" v-model="content"></vue-editor>
  <div v-show="description && !descriptionError">
    <h2>טעינת קבצים </h2>
    <dropzone id="myVueDropzone" url="/api/docs/upload" :use-custom-dropzone-options="true" :dropzone-options="dropzoneOptions" v-on:vdropzone-error="showSError">
      <input type="hidden" name="batch_id" :value="batch_id">
    </dropzone>
  </div>
  facebook
  <div class="row" v-for="f in uploaded">
    <div class="col-md-2"><img :src="f.thumb" /></div>
    <div class="col-md-10">
      {{f.filename}}
      <input />
    </div>
  </div>
  {{account}}
</div>
</template>

<script>
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
        vm.description = res.data.description
        vm.content = res.data.content

      }).catch(() => {

      })
    }).catch(() => {
      alert("לא מצליח לקבל קוד אצווה")
    })


  },
  data() {
    let vm = this;
    return {
      showEditor: 0,
      customToolbar: [

      ],
      final: false,
      batch_id: "",
      uploaded: [],
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
        removedfile: function(file) {

        },
        error: function(file, result) {
          //  alert("error" + JSON.stringify(result))
          //  alert("error" + JSON.stringify(file))
        },
        success: function(file, result) {
          console.log(result)
          vm.uploaded.push(result)
        },
      }
    }
  },
  components: {
    Dropzone,
    VueEditor
  },
  methods: {
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
</style>

</style>
