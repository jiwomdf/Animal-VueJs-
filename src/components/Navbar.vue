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
export default {
  name: "Navbar",
  data() {
    return {};
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    init() {
      let accessToken = this.$cookie.get("accessToken");
      let refreshToken = this.$cookie.get("refreshToken");

      console.log(this.isLogin);

      if (accessToken != null && refreshToken != null) this.isLogin = true;
      else this.isLogin = false;
    },
    login() {
      this.$router.push("/Login");
    },
    logout() {
      this.$cookie.delete("accessToken");
      this.$cookie.delete("refreshToken");

      this.$router.push("/Main");
    }
  }
};
</script>