<template>
    <div>
        <h2>ניהול חנויות מכר </h2>
        <router-view></router-view>

    </div>
</template>
<script>
    export default {
        name: "Home",
        data: function () {
            return {
                msg: "Message from hello"
            }
        }
    }
</script>
