<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1 class="mb-2">Register</h1>
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              v-model="form.userName"
              :rules="[rules.requiredUserName, rules.minUserName]"
              counter="15"
              hint="At least 3 characters"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.requiredPassword, rules.minPassword]"
              :type="passwordShow ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="passwordShow = !passwordShow"
            ></v-text-field>

            <v-text-field
              v-model="form.name"
              :rules="[rules.requiredUserName, rules.minUserName]"
              counter="15"
              hint="At least 3 characters"
              label="Name"
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              :rules="[rules.requiredUserName, rules.minUserName]"
              counter="15"
              hint="At least 3 characters"
              label="Email"
            ></v-text-field>

            <v-combobox
              v-model="form.chips"
              :items="form.items"
              chips
              clearable
              label="Role"
              multiple
              solo
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(item)"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>

            <v-btn class="mt-4" v-on:click="register()">
              <span class="mr-2">Register</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-alert type="error" dismissible v-if="alert_exist_bool">{{alert_exist}}</v-alert>
    <v-alert type="success" dismissible v-if="alert_sucess_bool">Success</v-alert>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  name: "Register",
  data() {
    return {
      passwordShow: false,
      alert_exist: "",
      alert_exist_bool: false,
      alert_sucess_bool: false,
      form: {
        userName: "",
        password: "",
        name: "",
        email: "",
        chips: [],
        items: ["User"],
      },
      rules: {
        requiredUserName: (value) => !!value || "Required.",
        minUserName: (v) => v.length >= 3 || "Min 3 characters",
        requiredPassword: (value) => !!value || "Required.",
        minPassword: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    remove(item) {
      this.form.chips.splice(this.form.chips.indexOf(item), 1);
      this.form.chips = [...this.form.chips];
    },
    async register() {
      this.alert_exist_bool = false;
      this.alert_sucess_bool = false;

      const url = "http://localhost:3000/user/register";
      const user = {
        userName: this.form.userName,
        password: this.form.password,
        name: this.form.name,
        email: this.form.email,
        role: ["admin"],
      };
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const retval = await axios.post(url, user, headers);

        if (retval.data.status === "200") this.alert_sucess_bool = true;
      } catch (err) {
        this.alert_exist_bool = true;
        this.alert_exist = err.response.data.messages;
      }
    },
  },
};
</script>