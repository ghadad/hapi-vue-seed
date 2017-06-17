<template>
<div id="upload">
  <h2>שתף קבצים</h2>
  <div class="form-group">
    <label for="description">שלב א' - תאור קצר</label>
    <input type="text" v-model="description" class="form-control" id="description" placeholder="תאור קצר - לפחות  10 מילים">
    <div class="error">{{descriptionError}} </div>
  </div>
  <h3>תמיד נשמח לתיאור נרחב </h3>
  <textarea></textarea>
  <div v-show="description && !descriptionError">
    <h2>טעינת קבצים </h2>
    <dropzone id="myVueDropzone" :preview-template="previewTemplate" url="/api/docs/upload" :use-custom-dropzone-options="true" :dropzone-options="dropzoneOptions" v-on:vdropzone-error="showSError">
      <input type="hidden" name="batch_id" :value="batch_id">
    </dropzone>
  </div>

</div>
</template>

<script>
import Dropzone from 'vue2-dropzone';
import Store from "../store"
export default {

  name: 'Upload',
  mounted() {
    this.$router.push({

      query: {
        batch_id: this.batch_id
      }
    });
  },
  data() {
    return {
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
        addRemoveLinks: true,
        addCancelLinks: true,
        dictCancelUpload: "בטל שיתוף",
        dictRemoveFile: "מחק קובץ",
        maxFilesize: 256 * 1000,
        removedfile: function(file) {
          //  alert(JSON.stringify(file) + "removed")
        },
        error: function(file, result) {
          //  alert("error" + JSON.stringify(result))
          //  alert("error" + JSON.stringify(file))
        },
        success: function(file, result) {
          //  alert("finnish" + JSON.stringify(result))
          //  alert("finnish" + JSON.stringify(file))
        },
      }
    }
  },
  components: {
    Dropzone
  },
  methods: {

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
    batch_id: function() {
      return this.account.facebook.id + "-" + Math.floor((new Date().getTime() / 1000))
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
