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
            <v-toolbar color="primary">
              <v-toolbar-title
                >Employee Login Details ({{
                  $route.params.name
                }})</v-toolbar-title
              >
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="white" light class="mb-2" v-on="on"
                    >Add Time</v-btn
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
                          <v-dialog
                            ref="dialog3"
                            v-model="modal"
                            :return-value.sync="editedItem.date"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.date"
                                label="Picker in dialog"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.date" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="modal = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog3.save(editedItem.date)"
                                >OK</v-btn
                              >
                            </v-date-picker>
                          </v-dialog>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-dialog
                            ref="dialog1"
                            v-model="modal2"
                            :return-value.sync="editedItem.timein"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.timein"
                                label="Select Time-In"
                                prepend-icon="mdi-clock"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="modal2"
                              v-model="editedItem.timein"
                              full-width
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="modal2 = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog1.save(editedItem.timein)"
                                >OK</v-btn
                              >
                            </v-time-picker>
                          </v-dialog>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-dialog
                            ref="dialog"
                            v-model="modal3"
                            :return-value.sync="editedItem.timeout"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.timeout"
                                label="Select Time-Out"
                                prepend-icon="mdi-clock"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="modal3"
                              v-model="editedItem.timeout"
                              full-width
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="modal3 = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(editedItem.timeout)"
                                >OK</v-btn
                              >
                            </v-time-picker>
                          </v-dialog>
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
    id: "",
    timein: null,
    timeout: null,
    menu2: false,
    modal2: false,
    modal3: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    headers: [
      { text: "Sr. No", value: "id", align: "center" },
      { text: "Date", value: "date", align: "center" },
      { text: "Time In", value: "timein", align: "center" },
      { text: "Time out", value: "timeout", align: "center" },
      { text: "Actions", value: "action", sortable: false, align: "center" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      date: "",
      timein: "",
      timeout: ""
    },
    defaultItem: {
      id: "",
      date: "",
      timein: "",
      timeout: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Time" : "Edit Time";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get(
          "http://localhost:3000/getemployeedetails/" + this.$route.params.id
        )
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            this.desserts.push({
              id: response.data[i]["id"],
              date: new Date(response.data[i]["date"])
                .toISOString()
                .substr(0, 10),
              timein: response.data[i]["timein"],
              timeout: response.data[i]["timeout"]
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
        .get("http://localhost:3000/deleteemployeedetails/" + item.id)
        .then(response => {
          alert("Record Deleted Succesfully");
        });

      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") && this.a;
      this.desserts.length = [];
      this.desserts.push(this.editedItem);
      //   this.initialize();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        axios
          .post(
            "http://localhost:3000/updateemployeedetails/" + this.editedItem.id,
            {
              date: this.editedItem.date,
              timein: this.editedItem.timein,
              timeout: this.editedItem.timeout
            }
          )
          .then(response => {
            alert("Record Updated Succesfully");
          });

        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        console.log(this.editedItem);
        axios
          .post("http://localhost:3000/addemployeetime", {
            id: this.$route.params.id,
            date: this.editedItem.date,
            in: this.editedItem.timein,
            out: this.editedItem.timeout
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
