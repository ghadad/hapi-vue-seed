<template>
<div id="donate">
  <h2>הודעה למנהלי האתר</h2>
  <p>.....</p>
</div>
</template>
<script>
import Store from "../store";

export default {
  data() {
    return {
      msg: "Hello . I'm vue"
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
</style>
