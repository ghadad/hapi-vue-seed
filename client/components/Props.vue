<template>
<div id="props">
  <h2>ניהול מאפיינים/תגיות למסמכים <button @click="save()" class="btn btn-primary btn-lg">שמור בחירה</button></h2>
  <table class="table">
    <thead>
      <th class="form form-inline">קטגוריה 1 : <input type="text" class="input-control form-control" v-model="cat1prop"> <button @click="addProp('cat1',cat1prop)" class="btn ">הוסף חדש</button></th>
      <th class="form form-inline">קטגוריה 2 : <input type="text" class="input-control form-control" v-model="cat2prop"> <button @click="addProp('cat2',cat2prop)" class="btn ">הוסף חדש</button></th>
      <th class="form form-inline">קטגוריה 3 :<input type="text" class="input-control form-control" v-model="cat3prop"> <button @click="addProp('cat3',cat3prop)" class="btn ">הוסף חדש</button></th>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="well well-sm">
            <ul class="list-group">

              <li class="list-group-item" v-for="(p,index) in docsProps.cat1"><i @click="removeProp('cat1',index)" class="glyphicon glyphicon-remove-sign "></i> {{p}}</li>
            </ul>
          </div>
        </td>
        <td>
          <div class="well well-sm">
            <ul class="list-group">
              <li class="list-group-item" v-for="(p,index) in docsProps.cat2"><i @click="removeProp('cat2',index)" class="glyphicon glyphicon-remove-sign "></i> {{p}}</li>
            </ul>
          </div>
        </td>
        </td>
        <td>
          <div class="well well-sm">
            <ul class="list-group">
              <li class="list-group-item" v-for="(p,index) in docsProps.cat3"><i @click="removeProp('cat3',index)" class="glyphicon glyphicon-remove-sign"></i> {{p}}</li>
            </ul>
          </div>
        </td>
        </td>
      </tr>

    </tbody>
  </table>

</div>
</template>
<script>
import Store from "../store";

export default {
  data() {
    return {
      term: "",
      msg: "Hello . I'm vue",
      cat1prop: "",
      cat2prop: "",
      cat3prop: "",
      docsProps: {
        cat1: [],
        cat2: [],
        cat3: []
      },
      err: {}
    }
  },
  mounted() {
    this.get();
  },
  methods: {
    removeProp(category, index) {
      console.log(category, index)
      this.docsProps[category].splice(index, 1)

    },
    addProp(category, p) {
      console.log(this.docsProps)
      this.docsProps[category].push(p)
      this[category + "prop"] = ""
    },
    get() {
      let vm = this;
      vm.result = [];
      vm.$http.get("api/docs/props").then(res => {
        console.log(res.data)
        vm.$set(vm, 'docsProps', res.data);
      }).catch(err => {
        vm.err = err;
      })

    },
    save() {
      let vm = this;
      let prm = {};

      vm.$http.post("api/docs/props", this.docsProps).then(res => {
        console.log(res);
      }).catch(err => {
        vm.err = err;
      })

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
