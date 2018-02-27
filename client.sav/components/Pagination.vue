<template>
<div v-show="$props.totalPages" id="pagination" class="row">
  <div class="col-md-10">
    <nav aria-label="Page navigation">

      <ul class="pagination">
        <li><a><span>{{$props.totalRows}}  תוצאות </span> , <span> דפים  : </span>
        </a></li>
        <li class="page">
          <a @click="setPage(0)" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
        </li>
        <li class="page" v-for="p in range" :class="{'active':p==$props.page}"><a @click="setPage(p)">{{p+1}}</a></li>
        <li class="page">
          <a @click="setPage($props.totalPages)" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
        </li>
      </ul>
    </nav>
  </div>
  <!--p>Page:{{$props.page}}</p>
  <p>displayPages:{{$props.displayPages}}</p>
  <p>Range:{{range}}</p>
  <p>totalPages:{{$props.totalPages}}</p>
  <p>vlow:{{vlow}} vhigh:{{vhigh}}</p-->
</div>
</template>
<script>
export default {
  data() {
    return {
      vlow: 0,
      vhigh: 0,
      msg: "Hello im pagnation component"

    }
  },

  props: ["page", "totalPages", "displayPages", "totalRows"],
  methods: {
    setPage(p) {
      this.$emit("setPage", p)
    }
  },
  computed: {
    range() {
      this.vlow = Math.max(0, this.$props.page - Math.ceil(this.$props.displayPages / 2));
      //alert(parseInt(this.$props.page) + Math.ceil(this.$props.displayPages / 2))
      this.vhigh = Math.min(parseInt(this.$props.page) + Math.ceil(this.$props.displayPages / 2), this.$props.totalPages);
      return _.range(this.vlow, this.vhigh);
    }
  }
}
</script>
<style>
.pagination li.page {
  cursor: pointer;
}

.active {
  color: Blue;
  font-weight: bold;
}
</style>
