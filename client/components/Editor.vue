<template>
<div>
  <div class="summernote"></div>
</div>
</template>

<script>
import Vue from 'vue'
import Summernote from 'summernote';
Vue.use(Summernote);
export default {
  name: "Editor",
  mounted() {
    $('.summernote').summernote({
      height: 300,
      minHeight: null,
      maxHeight: null,
      focus: true
    });
    this.setContent(this.content);
  },
  props: [
    'content'
  ],
  methods: {
    getContent: function() {
      return $('.summernote').summernote('code');
    },
    setContent: function(content) {
      $('.summernote').summernote('code', content);
    }
  }
}
</script>
