<template>
<div id="myfiles">
  {{msg}}
  <h2>Account</h2> {{account}}
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
