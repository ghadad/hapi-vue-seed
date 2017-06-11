<template>
<div>
  <h2>מורות משקיעות</h2>
  <div class="row">
    <div class="col-md-2">
      <div class="panel panel-primary">
        <!-- Default panel contents -->
        <div class="panel-heading">תפריט משתמש <img :src="profilePictureUrl"> profilePictureUrl</div>
        <div class="panel-body">
          <p>...</p>
        </div>

        <!-- List group -->
        <ul class="list-group">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Morbi leo risus</li>
          <li class="list-group-item">Porta ac consectetur ac</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    </div>
    <div class="col-md-10">
      <router-view></router-view>
    </div>
  </div>



  <pre>  {{account}} </pre>

</div>
</template>
<script>
export default {
  name: "Home",
  data: function() {
    return {
      msg: "Message from hello"
    }
  },
  computed: {
    profilePictureUrl: () => {

      return "http://graph.facebook.com/v2.9/" + this.account.facebook.id + "/picture"
    }
  }
}
</script>
