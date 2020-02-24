<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12">
              <v-toolbar color="" dark>
                <v-toolbar-title class="font-weight-bold"
                  >User Registration</v-toolbar-title
                >
                <v-spacer />
                <!-- <v-btn router to="/" absolute light right>Login</v-btn> -->
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="User name"
                    v-model="username"
                    prepend-icon="mdi-account"
                    :counter="30"
                    :rules="nameRules"
                    outlined
                    required
                  />
                  <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-email"
                    type="email"
                    outlined
                    :rules="emailRules"
                    required
                  />

                  <v-text-field
                    v-model="password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="passwordRules"
                    required
                    outlined
                  />

                  <v-text-field
                    v-model="contact"
                    label="Contact no."
                    prepend-icon="mdi-phone"
                    type="tel"
                    :counter="10"
                    :rules="contactRules"
                    required
                    outlined
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn large color="" @click="createUser" light>Register</v-btn>
              </v-card-actions>
              <v-snackbar
                v-model="snackbar"
                :color="color"
                :multi-line="mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="6000"
                :top="y === 'top'"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn dark text @click="snackbar = false">Close</v-btn>
              </v-snackbar>
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
    snackbar: false,
    text: "",
    color: "",
    mode: "",
    x: null,
    y: "top",
    username: "",
    email: "",
    password: "",
    contact: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "password is required",
      v =>
        (v && v.length >= 8) ||
        "Password must be minimum 8 or more than 8 characters"
    ],
    contactRules: [
      v => !!v || "Contact no is required",
      v =>
        (/[0-9]/.test(v) && v.length <= 10) ||
        "Contact-no contains only Digits and not less than 10"
    ]
  }),
  beforeCreate: function() {
    if (this.$session.exists()) {
      this.$router.push("empdetails");
    }
  },
  created() {},
  computed: {},
  methods: {
    createUser: function() {
      axios
        .post("http://localhost:3000/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          contact: this.contact,
          created_at: new Date()
        })
        .then(response => {
          //   token = response.data.user.api_token;
          //   localStorage.setItem("token", token);
          if (response.data != "Something Wrong Occured!!!!!") {
            localStorage.setItem("token", response.data.token);
            this.$session.start();
            this.$session.set("token", response.data.token);
            // Vue.http.headers.common["Authorization"] =
            // "Bearer " + response.data.token;
            this.color = "warning";
            this.text = response.data.msg;

            this.snackbar = true;
            this.$router.push("empdetails");
          } else {
            this.color = "warning";
            this.text = "User Registration Failed";
            this.snackbar = true;
          }
        });
    }
    // cheakLogin: function() {
    //   if (this.email === "" && this.password === "") {
    //     alert("Please Enter Your Credential");
    //   } else if (
    //     this.validEmail(this.email) === false &&
    //     this.password === ""
    //   ) {
    //     alert("Please Enter Valid Email and Password");
    //   } else if (this.validEmail(this.email) === true && this.password === "") {
    //     alert("Your Password is missing!!");
    //   } else if (
    //     this.validEmail(this.email) === true &&
    //     this.password.length < 6
    //   ) {
    //     alert("Check Your Password!!");
    //   } else if (
    //     this.validEmail(this.email) === false &&
    //     this.password.length < 6
    //   ) {
    //     alert("Please Enter Valid Email and Password!!");
    //   } else if (
    //     this.validEmail(this.email) === false &&
    //     this.password.length > 6
    //   ) {
    //     alert("Please Enter Valid Email");
    //   } else {
    //     this.$router.push("addblog");
    //   }
    // },
    // validEmail: function(email) {
    //   return this.reg.test(email);
    // }
  }
};
</script>
