<template>
  <div class="detail">
    <TopBar />
    <BlogDetail />
  </div>
</template>

<script>
// @ is an alias to /src
import BlogDetail from "@/components/BlogDetail.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "detail",
  components: {
    BlogDetail,
    TopBar
  }
};
</script>
