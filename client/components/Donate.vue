<template>
<div id="donate">
  <h2>תרומה</h2>
  <p>תפעול האתר נושא בעולויות כבידות נשמח לתרומתכם</p>
  <p>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_donations">
      <input type="hidden" name="business" value="ghadad@gmail.com">
      <input type="hidden" name="lc" value="IL">
      <input type="hidden" name="item_name" value="dsd">
      <input type="hidden" name="item_number" value="dsddd">
      <input type="hidden" name="no_note" value="0">
      <input type="hidden" name="currency_code" value="ILS">
      <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">
      <input type="image" src="https://www.paypalobjects.com/en_US/IL/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
    </form>
  </p>
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
