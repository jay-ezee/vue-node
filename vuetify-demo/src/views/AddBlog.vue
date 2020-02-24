<template>
  <div class="add">
    <TopBar />
    <AddBlog />
  </div>
</template>

<script>
// @ is an alias to /src
import AddBlog from "@/components/AddBlog.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "add",
  components: {
    AddBlog,
    TopBar
  }
};
</script>
