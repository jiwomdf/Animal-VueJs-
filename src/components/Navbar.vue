<template>
  <v-app-bar app color="white" flat dense>
    <div class="d-flex align-center">Animal Api</div>

    <v-spacer></v-spacer>

    <v-btn text v-if="!isLogin" v-on:click="login()">
      <span class="mr-2">Login</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-btn text v-if="isLogin" v-on:click="logout()">
      <span class="mr-2">Logout</span>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
const axios = require("axios");

export default {
  name: "Navbar",
  data() {
    return {};
  },
  computed: {
    isLogin() {
      console.log(this.$store.state.loginUserName);
      return this.$store.state.loginUserName != "" ? true : false;
    },
  },
  methods: {
    init() {
      let accessToken = this.$cookie.get("accessToken");
      let refreshToken = this.$cookie.get("refreshToken");

      if (accessToken == null || refreshToken == null)
        this.$store.state.loginUserName = "";
    },
    login() {
      this.$router.push("/Login");
    },
    logout() {
      let refreshToken = this.$cookie.get("refreshToken");

      const url = "http://localhost:3000/auth/logout";
      const data = {
        userName: this.$store.state.userName,
        refreshToken: refreshToken,
      };
      const headers = { "Content-Type": "application/json" };

      axios.post(url, data, headers);

      this.$cookie.delete("accessToken");
      this.$cookie.delete("refreshToken");
      this.$store.state.loginUserName = "";
      window.sessionStorage.clear();

      this.$router.push("/");
    },
  },
};
</script>