<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-row>
          <v-col>
            <h1 class="mb-2">Dashboard</h1>
            <span class="mb-2">Welcome {{this.$store.getters.getLogin}}!</span>
          </v-col>
          <v-col>
            <v-btn
              class="mt-1"
              fab
              style="float:right;"
              color="deep-purple accent-4"
              dark
              v-on:click="navigatePost()"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
                  <v-row v-if="n == 1">
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
                  <v-row v-if="n == 2">
                    <v-col v-for="(data, idx) in mydata" :key="idx" cols="12" md="4">
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
const returnRefresher = require("../returnRefresher");

export default {
  data() {
    return {
      listdata: [],
      mydata: [],
    };
  },
  async mounted() {
    const exploreUrl = "http://localhost:3000/animal/picture/";

    try {
      let exploreData = await axios.post(exploreUrl);
      this.listdata = exploreData.data.data;
    } catch (err) {
      console.log(err);
    }

    const getMyPostData = async (accessToken) => {
      const mypostUrl = `http://localhost:3000/animal/picture/${this.$store.getters.getLogin}`;
      const header = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      return axios.post(mypostUrl, {}, header);
    };

    let myPostData = await returnRefresher(getMyPostData, this);

    if (myPostData.isComplete) this.mydata = myPostData.data.data.data;
  },
  methods: {
    navigatePost() {
      this.$router.push("/Post");
    },
  },
};
</script>
