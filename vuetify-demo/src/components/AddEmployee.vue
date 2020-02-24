<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid style="width:50%">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="font-weight-bold"
              >Add New Employee</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>
          <v-form>
            <v-row align="center" justify="center" style="padding:10px;">
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="name"
                  label="Enter Your Name"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" style="margin-top:-40px;">
                <v-text-field
                  v-model="email"
                  label="Enter Your E-mail"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" style="margin-top:-40px;">
                <v-text-field
                  v-model="contact"
                  label="Enter Your Contact Number"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" class="text-center">
                <v-btn text large color="primary" @click="sub">Submit</v-btn>
                <v-btn
                  text
                  large
                  color="error"
                  type="Reset"
                  style="margin-left:10px"
                  >Reset</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      contact: ""
    };
  },
  created() {
    var token = localStorage.getItem("token");
    // console.log(token)
    axios
      .get("http://localhost:3000/usertoken", {
        headers: { Authorization: token }
      })
      .then(response => {
        console.log("Welcome Admin");
      });
  },
  mounted() {
    let token = localStorage.getItem("token");
    console.log(token);
  },

  methods: {
    sub: function() {
      axios
        .post("http://localhost:3000/addemployee", {
          name: this.name,
          email: this.email,
          contact: this.contact
        })
        .then(response => {
          console.log(response.data);
          alert("Record add Succesfully");
        });
    }
  }
};
</script>
