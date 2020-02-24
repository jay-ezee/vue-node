<template>
  <v-app>
    <v-content>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar color="">
              <v-toolbar-title>Employee Details</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="white" light class="mb-2" v-on="on"
                    >Add Employee</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Employee Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.email_id"
                            label="Email ID"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.contact_no"
                            label="Contact No"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="addtime(item)"
              >mdi-calendar</v-icon
            >
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Employee Id",
        align: "center",
        sortable: false,
        value: "id"
      },
      {
        text: "Name",
        align: "center",
        sortable: false,
        value: "name"
      },
      { text: "Email Address", value: "email_id", align: "center" },
      { text: "Contact Number", value: "contact_no", align: "center" },
      { text: "Actions", value: "action", sortable: false, align: "center" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      email_id: "",
      contact_no: ""
    },
    defaultItem: {
      id: "",
      name: "",
      email_id: "",
      contact_no: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Employee" : "Edit Employee";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  },

  created() {
    console.log(this.$session.get("token"));
    var token = this.$session.get("token");
    // console.log(token)
    axios
      .get("http://localhost:3000/usertoken", {
        headers: { Authorization: token }
      })
      .then(response => {
        console.log("Welcome Admin");
      });
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("http://192.168.10.67:3000/getemployee").then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.desserts.push({
            id: response.data[i]["id"],
            name: response.data[i]["name"],
            email_id: response.data[i]["Email"],
            contact_no: response.data[i]["Conatct"]
          });
        }
      });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log(item.id);
      var a = axios
        .delete("http://localhost:3000/deleteemployee/" + item.id)
        .then(response => {
          alert("Record Deleted Succesfully");
        });

      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") && this.a;
      this.desserts.length = [];
      this.desserts.push(this.editedItem);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    addtime(item) {
      // console.log(item.name);
      this.$router.push({
        name: "logindetails",
        params: { id: item.id, name: item.name }
      });
    },

    save() {
      if (this.editedIndex > -1) {
        // console.log(this.editedItem.id);
        axios
          .post(
            "http://192.168.10.67:3000/updateemployee/" + this.editedItem.id,
            {
              name: this.editedItem.name,
              email: this.editedItem.email_id,
              contact: this.editedItem.contact_no
            }
          )
          .then(response => {
            alert("Record Updated Succesfully");
          });

        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        axios
          .post("http://192.168.10.67:3000/addemployee", {
            name: this.editedItem.name,
            email: this.editedItem.email_id,
            contact: this.editedItem.contact_no
          })
          .then(response => {
            this.desserts.push(this.editedItem);
            // this.initialize();
            // alert("Record add Succesfully");
          });
      }
      this.close();
    }
  }
};
</script>
