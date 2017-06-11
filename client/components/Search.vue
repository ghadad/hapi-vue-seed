<template>
<div id="search">

  <h2>חיפוש</h2>
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
