<template>
  <v-app-bar app color="white" flat dense>
    <div class="d-flex align-center">Animal Api</div>

    <v-spacer></v-spacer>

    <v-btn text v-on:click="login()">
      <span class="mr-2">Login</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/Login");
    }
  }
};
</script>