<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form"></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
const axios = require("axios");

export default {
  name: "Dashboard",
  data() {
    return {};
  },
  methods: {
    async login() {}
  }
};
</script>