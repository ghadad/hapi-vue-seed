<template>
<div id="upload">
  <h2>שתף קבצים</h2>
  <dropzone id="myVueDropzone" url="/api/docs/upload" v-on:vdropzone-success="showSuccess">
    <!-- Optional parameters if any! -->
    <input type="hidden" name="token" value="xxx">
  </dropzone>

</div>
</template>

<script>
import Dropzone from 'vue2-dropzone';

export default {
  name: 'Upload',
  components: {
    Dropzone
  },
  methods: {
    'showSuccess': function(file) {
      console.log('A file was successfully uploaded')
    }
  },
  computed: {
    account: () => {
      return Store.state
    }
  }
}
</script>
