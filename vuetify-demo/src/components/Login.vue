<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <h1>Welcome to eZee Technosys pvt. Ltd.</h1>
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="" dark>
                <v-toolbar-title class="font-weight-bold"
                  >User Login</v-toolbar-title
                >
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="email"
                  />

                  <v-text-field
                    v-model="password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn large color="" light @click="checklogin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  props: {},
  data: () => ({
    email: "",
    password: "",
    reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
  }),
  beforeCreate: function() {
    if (this.$session.exists()) {
      this.$router.push("empdetails");
    }
  },
  created() {},
  computed: {},
  methods: {
    checklogin: function() {
      axios
        .post("http://localhost:3000/checklogin", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          // console.log(response.data);
          if (response.data != "no") {
            localStorage.setItem("token", response.data.token);
            this.$session.start();
            this.$session.set("token", response.data.token);
            this.$router.push("empdetails");
          } else {
            alert("Username/Password are worng !!!!!");
          }
        });
    }
  }
};
</script>
