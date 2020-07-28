<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-list-item>
                  <v-avatar color="teal accent-4">
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>

                  <v-list-item-content class="ml-3">
                    <v-list-item-title class="title">{{this.$store.getters.getLogin}}</v-list-item-title>
                    <v-list-item-subtitle>as User</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn class="mb-5" text v-on:click="navigatePublicApi()">See public API List</v-btn>
        <v-btn class="mb-5" text>Feedback to developers</v-btn>
        <v-btn
          class="mb-5"
          style="float:right;"
          color="deep-purple accent-4"
          dark
          v-on:click="navigatePost()"
        >
          Post photo
          <v-icon dark right>mdi-plus</v-icon>
        </v-btn>

        <v-card ref="form">
          <v-card>
            <v-tabs background-color="white" color="deep-purple accent-4" centered>
              <v-tab>Explore</v-tab>
              <v-tab>My Post</v-tab>

              <v-tab-item v-for="n in 2" :key="n">
                <v-container>
                  <v-row v-if="n == 1">
                    <v-col v-for="(data, idx) in listdata" :key="idx" cols="12" md="4">
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
                    <v-col v-for="(data, idx) in mydata" :key="idx" cols="12" md="4">
                      <v-card>
                        <v-img
                          class="white--text align-end"
                          :src="data.imagePath"
                          :lazy-src="data.imagePath"
                          aspect-ratio="1"
                        >
                          <v-btn
                            class="mt-3"
                            text
                            color="rgba(255,255,255,0.3)"
                            style="float:right;"
                            v-on:click="deletePost(data)"
                          >
                            <v-icon color="white">mdi-delete</v-icon>
                          </v-btn>
                          <v-card-title class>{{data.name}}</v-card-title>
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
    <v-row>
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
const returnRefresher = require("../util/returnRefresher");
const postRefresher = require("../util/postRefresher");

export default {
  data() {
    return {
      sheet: false,
      selData: {},
      listdata: [],
      mydata: [],
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    navigatePublicApi() {
      this.$router.push("/ApiDocumentation");
    },
    navigatePost() {
      this.$router.push("/Post");
    },
    openDetailImg(data) {
      this.sheet = !this.sheet;
      this.selData = data;
    },
    openNewTab(url) {
      window.open(url, "_blank");
    },
    async init() {
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
    async deletePost(selData) {
      let confrim = confirm("Are you sure?");

      if (!confrim) return;
      const isComplete = await this.deleteAnimal(selData);

      if (isComplete) {
        await this.deleteImage(selData);

        await this.init();
      }
    },
    async deleteAnimal(selData) {
      const deleteAnimal = async (accessToken) => {
        const url = `http://localhost:3000/animal/${selData.animalID}`;
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        return axios.delete(url, header);
      };

      let myPostData = await postRefresher(deleteAnimal, this);

      if (myPostData.isComplete) return true;
      else return false;
    },
    async deleteImage(selData) {
      const data = {
        animalID: selData.animalID,
        binaryImage: selData.binaryImage,
        destination: selData.destination,
        imagePath: selData.imagePath,
        imgID: selData.imgID,
      };

      const deleteImage = async (accessToken) => {
        const url = `http://localhost:3000/image/${selData.imgID}`;
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        return axios.delete(url, header, data);
      };

      let myPostData = await postRefresher(deleteImage, this);

      if (myPostData.isComplete) return true;
      else return false;
    },
  },
};
</script>
