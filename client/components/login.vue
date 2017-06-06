<template>
    <div class="container" id="login_form">
        <div class="row">

            <div class="col-md-3 col-md-offset-5">

                <form @submit.prevent="login" class="form-horizontal">
                    <div class="form-group">
                        <input v-model="username" type="text" placeholder="Username" class="form-control">
                    </div>
                    <div class="form-group">
                        <input v-model="password" type="password" placeholder="Password" class="form-control">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-md">התחברות</button>
                    </div>
                    <div v-html="err" class="error"></div>
                    <div v-show="spin" id="spinner" class="text-center">
                        <img src="/assets/images/ripple.gif">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                spin: false,
                username: '',
                password: '',
                err: ''
            }
        },
        methods: {
            ...mapActions(['setauth']),
            login() {
                var vm = this;
                vm.$data.err = ''
                vm.spin = true
                vm.Api.login(vm.$data).then((res) => {
                    if (res.data.success) {
                        vm.setauth({
                            username: vm.$data.username,
                            groups: res.data.groups,
                            admin: (res.data.admin || false)
                        })
                        vm.$router.push({
                            path: '/'
                        })
                    } else
                        vm.$data.err = res.data.error || res.data.err
                }).then(() => {
                    vm.spin = false
                });

            },

            setData(login, pass) {
                this.username = login
                this.password = pass
            }
        }
    }
</script>

<style scoped>
    #login_form #spinner {
        margin-top: 30px
    }
    
    .error {
        color: red;
        font-size: 1.2em
    }
</style>