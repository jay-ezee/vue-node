<template>
  <div class="add">
    <TopBar />
    <LoginDetails />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginDetails from "@/components/LoginDetails.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "add",
  components: {
    LoginDetails,
    TopBar
  }
};
</script>
