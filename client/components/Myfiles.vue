<template>
<div id="myfiles">
  {{msg}}
  <h2>Account</h2> {{account}}
</div>
</template>
<script>
export default {
  data() {
    return {
      msg: "Hello . I'm vue"
    }
  },
  computed: {
    account: () => {

      return this.store
    }
  }
}
</script>
<style>
</style>
