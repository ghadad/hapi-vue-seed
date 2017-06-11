<template>
<div id="donate">
  <h2>תרומה</h2>
  <p>תפעול האתר נושא בעולויות כבידות נשמח לתרומתכם</p>
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
