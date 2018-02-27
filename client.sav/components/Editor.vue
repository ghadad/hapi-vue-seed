<template>
<div>
  <div id="editor"></div>
</div>
</template>

<script>
import Summernote from 'summernote';
import Vue from 'vue';
Vue.use(Summernote);

export default {
  name: "Editor",
  props: [
    'content'
  ],
    methods: {
    getContent: function() {
      return $('#editor').summernote('code');
    },
    setContent: function(content) {
      $('#editor').summernote('code', content);
    }
  },
  mounted:function() {
    $('#editor').summernote({
      height: 300,
      minHeight: 300,
      maxHeight: null,
      focus: true
    });
     // this.setContent(this.$props.content);
  }
  

}
</script>
