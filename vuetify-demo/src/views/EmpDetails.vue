<template>
  <div class="add">
    <TopBar />
    <EmpDetails />
  </div>
</template>

<script>
// @ is an alias to /src
import EmpDetails from "@/components/EmpDetails.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "add",
  components: {
    EmpDetails,
    TopBar
  }
};
</script>
