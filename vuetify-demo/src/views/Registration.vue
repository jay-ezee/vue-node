<template>
  <div class="add">
    <TopBar />
    <Registration />
  </div>
</template>

<script>
// @ is an alias to /src
import Registration from "@/components/Registration.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "add",
  components: {
    Registration,
    TopBar
  }
};
</script>
