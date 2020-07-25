<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1 class="mb-2">Dashboard</h1>
        <v-btn class="mt-1" right text v-on:click="navigatePost()">Post a Photo!</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card ref="form">
          <v-card>
            <v-tabs background-color="white" color="deep-purple accent-4" centered>
              <v-tab>Explore</v-tab>
              <v-tab>My Post</v-tab>

              <v-tab-item v-for="n in 2" :key="n">
                <v-container>
                  <v-row>
                    <v-col v-for="(data, idx) in listdata" :key="idx" cols="12" md="4">
                      <v-img
                        class="white--text align-end"
                        :src="data.imagePath"
                        :lazy-src="data.imagePath"
                        aspect-ratio="1"
                      >
                        <v-card-title>{{data.name}}</v-card-title>
                      </v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      listdata: [],
    };
  },
  async mounted() {
    const url = "http://localhost:3000/animal/picture/";

    let retval = await axios.post(url);

    this.listdata = retval.data.data;
  },
  methods: {
    navigatePost() {
      this.$router.push("/Post");
    },
  },
};
</script>
