<template>
  <div class="add">
    <TopBar />
    <AddEmployee />
  </div>
</template>

<script>
// @ is an alias to /src
import AddEmployee from "@/components/AddEmployee.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "addemp",
  components: {
    AddEmployee,
    TopBar
  }
};
</script>
