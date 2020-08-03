<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-list-item>
                  <v-avatar color="blue accent-4">
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>

                  <v-list-item-content class="ml-3">
                    <v-list-item-title class="title">{{this.$store.getters.getLogin}}</v-list-item-title>
                    <v-list-item-subtitle>as Contributor</v-list-item-subtitle>
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
        <v-btn
          class="mb-5"
          outlined
          rounded
          color="teal"
          text
          v-on:click="navigatePublicApi()"
        >See public API List</v-btn>
        <v-btn class="mb-5" style="float:right;" color="teal" dark v-on:click="navigatePost()">
          Post photo
          <v-icon dark right>mdi-plus</v-icon>
        </v-btn>

        <v-card ref="form">
          <v-card>
            <v-tabs background-color="white" color="teal" centered>
              <v-tab>Explore</v-tab>
              <v-tab>My Post</v-tab>

              <v-tab-item v-for="n in 2" :key="n">
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
                    <v-col v-for="(data, idx) in mydata" :key="idx" cols="12" md="2">
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
                        <v-btn
                          small
                          text
                          class="mt-3"
                          style="float:right;"
                          v-on:click="deletePost(data)"
                        >
                          <v-icon color="red darken-1">mdi-delete</v-icon>
                        </v-btn>
                        <v-btn
                          small
                          text
                          class="mt-3"
                          style="float:left;"
                          v-on:click="editPicture()"
                        >
                          <v-icon color="teal darken-1">mdi-pencil</v-icon>
                        </v-btn>
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
          <v-card>
            <v-sheet min-height="420px">
              <v-row>
                <v-col lg="4">
                  <v-card max-width="350" max-height="350" class="ml-3">
                    <v-img
                      max-width="350"
                      max-height="350"
                      class="white--text"
                      :src="selData.imagePath"
                      :lazy-src="selData.imagePath"
                      aspect-ratio="1"
                    ></v-img>
                  </v-card>
                  <h4
                    style="color:teal; text-align: center; cursor:pointer"
                    v-on:click="openNewTab(selData.imagePath)"
                    class="ml-4 mt-2"
                  >Open Image</h4>
                </v-col>
                <v-col>
                  <h2>{{selData.name}}</h2>
                  <p>{{selData.story ? selData.story : "No story for this picture.."}}</p>
                </v-col>
              </v-row>
              <br />
            </v-sheet>
          </v-card>
        </v-bottom-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
const returnRefresher = require("../util/returnRefresher");
const postRefresher = require("../util/postRefresher");
const { apiUrl } = require("../constant");

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
      const exploreUrl = `${apiUrl}/animalImg/`;

      try {
        let exploreData = await axios.get(exploreUrl);
        this.listdata = exploreData.data.data;
      } catch (err) {
        console.log(err);
      }

      const getMyPostData = async (accessToken) => {
        const mypostUrl = `${apiUrl}/animalImg/withId/${this.$store.getters.getLogin}`;
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
        const url = `${apiUrl}/animal/${selData.animalID}`;
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
      const deleteImage = async (accessToken) => {
        const url = `${apiUrl}/image/${selData.imgID}`;

        return axios.delete(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          data: {
            animalID: selData.animalID,
            binaryImage: selData.binaryImage,
            destination: selData.destination,
            imagePath: selData.imagePath,
            imgID: selData.imgID,
          },
        });
      };

      let myPostData = await postRefresher(deleteImage, this);

      if (myPostData.isComplete) return true;
      else return false;
    },
    editPicture() {
      alert(`this feature is currently not available`);
    },
  },
};
</script>
