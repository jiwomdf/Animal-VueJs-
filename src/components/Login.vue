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
              :rules="[rules.requiredPassword, rules.minPassword]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
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
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      show1: false,
      rules: {
        requiredUserName: (value) => !!value || "Required.",
        minUserName: (v) => v.length >= 3 || "Min 3 characters",
        requiredPassword: (value) => !!value || "Required.",
        minPassword: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    async login() {
      const url = "http://localhost:3000/auth/login";
      const data = {
        userName: this.form.userName,
        password: this.form.password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const retval = await axios.post(url, data, headers);

      this.$cookie.set("accessToken", retval.data.accessToken, 1);
      this.$cookie.set("refreshToken", retval.data.refreshToken, 1);
      this.$store.state.loginUserName = this.form.userName;

      alert("cookie set");
      this.$router.push("/Dashboard");
    },
    register() {
      this.$router.push("/Register");
    },
  },
};
</script>