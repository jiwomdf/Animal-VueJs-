<template>
  <v-container>
    <!-- Header -->
    <v-row justify="center">
      <v-col>
        <h1 class="mb-2">Welcome to Animal API!</h1>
      </v-col>
      <v-col>
        <v-btn
          class="mt-4 ml-12"
          color="teal accent-4"
          v-on:click="navigatePublicApi()"
          outlined
          rounded
        >
          <b>See public API List</b>
        </v-btn>
        <v-btn
          class="mt-4 ml-12"
          v-on:click="register()"
          color="teal accent-4"
          dark
          rounded
        >Join to contribute!</v-btn>
      </v-col>
    </v-row>
    <!-- SETTING -->
    <v-row justify="center">
      <v-col>
        <v-card>
          <v-container>
            <p style="color:grey;">Filter Images</p>
            <v-row>
              <v-col>
                <v-select
                  v-model="setting.diet"
                  :items="dropdown_diet"
                  label="Diet"
                  color="teal accent-4"
                  @change="rebindData()"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="setting.expression"
                  :items="dropdown_expression"
                  label="Expression"
                  color="teal accent-4"
                  @change="rebindData()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-switch
                  v-model="setting.cbSolo"
                  :label="`Show picture with only one animal`"
                  @change="rebindData()"
                ></v-switch>
              </v-col>
              <v-col>
                <v-switch
                  v-model="setting.cbBaby"
                  :label="`Show only baby animal pictures`"
                  @change="rebindData()"
                ></v-switch>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-container>
        </v-card>
        <br />
        <!-- Images -->
        <v-card ref="form">
          <v-container>
            <v-row>
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
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-bottom-sheet v-model="sheet" class="m-10" inset>
          <v-card>
            <v-sheet min-height="450px">
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
const apiUrl = require("../constant");

export default {
  data() {
    return {
      sheet: false,
      setting: {
        diet: "",
        expression: "",
        cbSolo: false,
        cbBaby: false,
      },
      selData: {},
      listdata: [],
      dropdown_diet: ["Not Selected", "Carnivore", "Herbivore", "Omnivore"],
      dropdown_expression: ["Not Selected", "Happy", "Sad", "Innocent", "Cry"],
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    async init() {
      const exploreUrl = `${apiUrl}/animal/picture/`;

      try {
        let exploreData = await axios.post(exploreUrl);
        this.listdata = exploreData.data.data;
      } catch (err) {
        console.log(err);
      }
    },
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
    async rebindData() {
      const exploreUrl = `${apiUrl}/animal/dynamic/`;

      if (this.setting.diet == "Not Selected") this.setting.diet = "";

      if (this.setting.expression == "Not Selected")
        this.setting.expression = "";

      const data = {
        diet: this.setting.diet,
        expression: this.setting.expression,
        isBaby: this.setting.cbBaby,
        isOneAnimal: this.setting.cbSolo,
      };

      try {
        let exploreData = await axios.post(exploreUrl, data);
        this.listdata = exploreData.data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>