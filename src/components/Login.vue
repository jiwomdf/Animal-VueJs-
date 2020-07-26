<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1 class="mb-2">Login</h1>
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
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn class="mt-4" v-on:click="login()">
              <span class="mr-2">Login</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-btn text class="mt-4" v-on:click="register()">
          <span class="mr-2">dont have any account? click to register</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-alert type="error" dismissible v-if="alert_exist_bool">{{alert_exist}}</v-alert>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  name: "Login",
  data() {
    return {
      alert_exist: "",
      alert_exist_bool: false,
      form: {
        userName: "",
        password: "",
      },
      show1: false,
      rules: {
        requiredUserName: (value) => !!value || "Required.",
        minUserName: (v) => v.length >= 3 || "Min 3 characters",
      },
    };
  },
  methods: {
    async login() {
      this.alert_exist_bool = false;

      const url = "http://localhost:3000/auth/login";
      const data = {
        userName: this.form.userName,
        password: this.form.password,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const retval = await axios.post(url, data, headers);

        this.$cookie.set("accessToken", retval.data.accessToken, 1);
        this.$cookie.set("refreshToken", retval.data.refreshToken, 1);

        this.$store.commit("setLogin", this.form.userName);

        this.$router.push("/Dashboard");
      } catch (err) {
        this.alert_exist_bool = true;
        this.alert_exist = err.response.data.messages;
      }
    },
    register() {
      this.$router.push("/Register");
    },
  },
};
</script>