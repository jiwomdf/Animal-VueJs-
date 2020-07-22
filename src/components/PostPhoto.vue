<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1>Post Photo</h1>
        <v-text-field v-model="title" hint="At least 3 characters" label="Username"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    let accessToken = this.$cookie.get("accessToken");
    let refreshToken = this.$cookie.get("refreshToken");
    console.log(accessToken, refreshToken);
  },
  methods: {
    async login() {},
  },
};
</script>