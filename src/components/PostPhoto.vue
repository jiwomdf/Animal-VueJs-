<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1>Post Photo</h1>
        <v-text-field v-model="title" hint="At least 3 characters" label="Username"></v-text-field>
        <v-btn v-on:click="getPost()">Show</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
const refresher = require("../refresher");

export default {
  name: "Main",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    getPost() {
      const fun = async (accessToken) => {
        return axios.get("http://localhost:3000/blog", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      };

      refresher(fun, this);

      /* let accessToken = this.$cookie.get("accessToken");
      let refreshToken = this.$cookie.get("refreshToken");

      try {
        const retval = await axios.get("http://localhost:3000/blog", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(retval);
      } catch (error) {
        if (error.response.status == 403) {
          const url = "http://localhost:3000/auth/token/";
          const data = {
            userName: this.$store.state.loginUserName,
            refreshToken: refreshToken,
          };
          const headers = {
            "Content-Type": "application/json",
          };

          let retVal = await axios.post(url, data, headers);

          console.log(retVal.data.accessToken);
          this.$cookie.set(retVal.data.accessToken);

          const retval = await axios.get("http://localhost:3000/blog", {
            headers: {
              Authorization: `Bearer ${retVal.data.accessToken}`,
            },
          });

          console.log(retval);
        }
      }*/
    },
  },
};
</script>