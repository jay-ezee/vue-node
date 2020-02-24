<template>
  <div class="add">
    <TopBar />
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "add",
  components: {
    Login,
    TopBar
  }
};
</script>
