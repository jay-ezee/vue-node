<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid style="width:50%">
        <v-row dense>
          <v-col cols="12">
            <v-card color="warning" dark>
              <v-card-title class="headline">{{ title }}</v-card-title>
              <v-card-subtitle>{{ des }}</v-card-subtitle>
              <v-card-title class="headline">Tags</v-card-title>
              <!-- <div v-for="tag in tags" :key="tag">
                <v-badge color="green" style="margin-left:15px" right :content="tag"></v-badge>
              </div>-->
              <v-chip
                v-for="tag in tags"
                :key="tag"
                style="margin-left:15px"
                color="green"
                >{{ tag }}</v-chip
              >
              <v-card-title class="headline">Category</v-card-title>
              <v-card-subtitle>{{ cat }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="#121212" @click="editBlog">Edit Blog</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AddBlog from "../components/AddBlog.vue";
export default {
  component: {
    AddBlog
  },
  data() {
    return {
      title: "",
      des: "",
      tags: [],
      cat: ""
    };
  },
  created() {
    this.title = this.$route.params.title;
    this.des = this.$route.params.des;
    this.tags = this.$route.params.tags;
    this.cat = this.$route.params.cat;
  },
  methods: {
    editBlog: function() {
      var title = this.title;
      var des = this.des;
      var tags = this.tags;
      var cat = this.cat;
      var heading = "Update Blog";
      var updatebtn = "Update";
      this.$router.push({
        name: "addblog",
        params: { title, des, tags, cat, heading, updatebtn }
      });
    }
  }
};
</script>
