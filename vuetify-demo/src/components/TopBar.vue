<template>
  <section>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <!-- <v-list-item link @click="newBlog">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add New Employee</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item link @click="detailBlog">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bolg Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item link @click="addemp">
          <v-list-item-action>
            <v-icon>mdi-human-child</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Employee Managemnet</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item link @click="logindetails">
          <v-list-item-action>
            <v-icon>mdi-human-child</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Vue+Node</v-toolbar-title>

      <v-btn
        v-if="$route.name == 'login'"
        color=""
        absolute
        right
        light
        router
        to="/registration"
        >Register</v-btn
      >
      <v-btn
        v-if="$route.name != 'login' && $route.name != 'registration'"
        color="warning"
        absolute
        right
        @click="logout"
        >Logout</v-btn
      >

      <v-btn
        v-if="$route.name == 'registration'"
        color=""
        light
        absolute
        right
        router
        to="/"
        >Login</v-btn
      >
    </v-app-bar>
    <v-footer app>
      <span>&copy; eZee Technosys pvt. Ltd. 2005</span>
    </v-footer>
  </section>
</template>

<script>
export default {
  props: {},
  data: () => ({
    drawer: null,
    disabled: true
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    newBlog: function() {
      this.$router.push("/addemployee");
    },
    // detailBlog: function() {
    //   this.$router.push("/blogdetail");
    // },
    addemp: function() {
      this.$router.push("/empdetails");
    },
    // logindetails: function() {
    //   this.$router.push("/logindetails");
    // }
    logout: function() {
      this.$session.destroy();
      this.$router.push("/");
    }
  }
};
</script>
