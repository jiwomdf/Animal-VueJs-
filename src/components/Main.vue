<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1 class="mb-2">Welcome to Animal API!</h1>
      </v-col>
      <v-col>
        <v-btn class="mt-4 ml-12" v-on:click="navigatePublicApi()" text>See public API List</v-btn>
        <v-btn class="mt-4 ml-12" text v-on:click="register()">Join to contribute!</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card ref="form">
          <v-card>
            <v-tabs background-color="white" color="deep-purple accent-4" centered>
              <v-tab>Explore</v-tab>
              <v-tab>Baby Animal</v-tab>
              <v-tab>One Animal</v-tab>
              <v-tab>Many Animal</v-tab>

              <v-tab-item v-for="n in 4" :key="n">
                <v-container>
                  <v-row v-if="n == 1">
                    <v-col v-for="(data, idx) in listdata" :key="idx" cols="12" md="2">
                      <v-card>
                        <v-img
                          class="white--text align-end"
                          :src="data.imagePath"
                          :lazy-src="data.imagePath"
                          aspect-ratio="1"
                          v-on:click="openDetailImg(data)"
                        >
                          <v-card-title>{{data.name}}</v-card-title>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row v-if="n == 2">
                    <v-col v-for="(data, idx) in listdataBaby" :key="idx" cols="12" md="2">
                      <v-card>
                        <v-img
                          class="white--text align-end"
                          :src="data.imagePath"
                          :lazy-src="data.imagePath"
                          aspect-ratio="1"
                          v-on:click="openDetailImg(data)"
                        >
                          <v-card-title>{{data.name}}</v-card-title>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row v-if="n == 3">
                    <v-col v-for="(data, idx) in listdataSolo" :key="idx" cols="12" md="2">
                      <v-card>
                        <v-img
                          class="white--text align-end"
                          :src="data.imagePath"
                          :lazy-src="data.imagePath"
                          aspect-ratio="1"
                          v-on:click="openDetailImg(data)"
                        >
                          <v-card-title>{{data.name}}</v-card-title>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row v-if="n == 4">
                    <v-col v-for="(data, idx) in listdataMany" :key="idx" cols="12" md="2">
                      <v-card>
                        <v-img
                          class="white--text align-end"
                          :src="data.imagePath"
                          :lazy-src="data.imagePath"
                          aspect-ratio="1"
                          v-on:click="openDetailImg(data)"
                        >
                          <v-card-title>{{data.name}}</v-card-title>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-bottom-sheet v-model="sheet" class="m-10" inset>
          <v-sheet min-height="800px">
            <br />
            <center>
              <v-card max-width="350" max-height="350">
                <v-img
                  max-width="350"
                  max-height="350"
                  class="white--text"
                  :src="selData.imagePath"
                  :lazy-src="selData.imagePath"
                  aspect-ratio="1"
                ></v-img>
              </v-card>
            </center>
            <br />
            <h5
              style="color:indigo; text-align: center; cursor:pointer"
              v-on:click="openNewTab(selData.imagePath)"
              class="ml-4"
            >Open Image</h5>
            <br />

            <hr />
            <br />

            <h3 class="ml-4">{{selData.name}}</h3>
            <p class="ml-4">{{selData.story ? selData.story : "No story for this picture.."}}</p>
          </v-sheet>
        </v-bottom-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
const axios = require("axios");
export default {
  data() {
    return {
      sheet: false,
      selData: {},
      listdata: [],
      listdataBaby: [],
      listdataSolo: [],
      listdataMany: [],
    };
  },
  async mounted() {
    const exploreUrl = "http://localhost:3000/animal/picture/";

    try {
      let exploreData = await axios.post(exploreUrl);
      this.listdata = exploreData.data.data;
      this.listdataBaby = exploreData.data.data.filter((x) => x.isBaby == true);
      this.listdataSolo = exploreData.data.data.filter(
        (x) => x.isOneAnimal == true
      );
      this.listdataMany = exploreData.data.data.filter(
        (x) => x.isOneAnimal == false
      );
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigatePublicApi() {
      this.$router.push("/ApiDocumentation");
    },
    async register() {
      this.$router.push("/Register");
    },
    openDetailImg(data) {
      this.sheet = !this.sheet;
      this.selData = data;
    },
    openNewTab(url) {
      window.open(url, "_blank");
    },
  },
};
</script>