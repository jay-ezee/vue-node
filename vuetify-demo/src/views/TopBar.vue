<template>
  <div class="bar">
    <TopBar />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from "@/components/TopBar.vue";

export default {
  name: "bar",
  components: {
    TopBar
  }
};
</script>
