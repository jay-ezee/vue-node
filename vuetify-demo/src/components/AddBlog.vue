<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid style="width:50%">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="font-weight-bold">{{ heading || "Add New Blog" }}</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-form>
            <v-row align="center" justify="center" style="padding:10px;">
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="title" label="Blog Title" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="12" style="margin-top:-40px;">
                <v-textarea v-model="des" outlined name="input-7-4" label="Blog Description"></v-textarea>
              </v-col>
              <v-col cols="12" md="12" style="margin-top:-40px;">
                <v-select
                  :items="items1"
                  v-model="tags"
                  chips
                  label="Select Blog Tag"
                  multiple
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="12" style="margin-top:-40px;">
                <v-select :items="items2" v-model="cat" label="Select Categaries" outlined></v-select>
              </v-col>
              <v-col cols="12" md="6" style="margin-top:-40px;">Publish?</v-col>
              <v-radio-group cols="12" md="12" row style="margin-top:-30px;">
                <v-radio label="Yes" value="radio-1"></v-radio>
                <v-radio label="No" value="radio-2"></v-radio>
              </v-radio-group>
              <v-col cols="12" md="12" class="text-center">
                <v-btn text large color="primary" @click="sub">
                  {{
                  updatebtn || "Submit"
                  }}
                </v-btn>
                <v-btn text large color="error" type="Reset" style="margin-left:10px">Reset</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      heading: "",
      des: "",
      tags: [],
      cat: "",
      items1: ["eZee", "eZeeit", "LaunchPad", "eZeeLaunchPad"],
      value1: ["eZee", "eZeeit", "LaunchPad", "eZeeLaunchPad"],
      items2: ["eZee", "eZeeit", "LaunchPad", "eZeeLaunchPad"],
      value2: ["eZee", "eZeeit", "LaunchPad", "eZeeLaunchPad"]
    };
  },
  created() {
    this.title = this.$route.params.title;
    this.des = this.$route.params.des;
    this.tags = this.$route.params.tags;
    this.cat = this.$route.params.cat;
    this.heading = this.$route.params.heading;
    this.updatebtn = this.$route.params.updatebtn;
  },

  methods: {
    sub: function() {
      var title = this.title;
      var des = this.des;
      var tags = this.tags;
      var cat = this.cat;
      console.log(this.tags);
      this.$router.push({
        name: "blogdetail",
        params: { title, des, tags, cat }
      });
    }
  }
};
</script>
