<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1>Post an Animal Photo</h1>
        <br />
        <form enctype="multipart/form-data">
          <!-- <v-file-input v-model="binaryImage" show-size label="Upload Image"></v-file-input> -->

          <input type="file" ref="file" @change="selectFile()" />

          <v-text-field v-model="title" label="Image Title"></v-text-field>

          <v-overflow-btn
            v-model="expression"
            :items="dropdown_expression"
            label="Animal Expression"
            target="#dropdown-example"
          ></v-overflow-btn>

          <v-overflow-btn
            v-model="diet"
            :items="dropdown_diet"
            label="Animal Diet"
            target="#dropdown-example"
          ></v-overflow-btn>

          <v-checkbox v-model="isBaby" :label="`is it a Baby? \n ${isBaby.toString()}`"></v-checkbox>

          <v-checkbox
            v-model="isOneAnimal"
            :label="`is there only one animal on the pic? \n ${isOneAnimal.toString()}`"
          ></v-checkbox>

          <v-combobox v-model="chips" :items="items" chips clearable label="Tags" multiple solo>
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>

          <button v-on:click="postPost()">Post Animal!</button>
        </form>
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
      expression: "",
      diet: "",
      dropdown_expression: ["Happy", "Sad", "Inocent", "Cry"],
      dropdown_diet: ["Herbivore", "Carnivore", "Omnivore"],
      isBaby: false,
      isOneAnimal: false,
      title: "",
      chips: [],
      items: ["Cute", "Solo", "Baby", "Sleeping"],
      binaryImage: "",
    };
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    selectFile() {
      this.binaryImage = this.$refs.file.files[0];
    },
    async postPost() {
      let id = this.makeid(10);

      const postData = async (accessToken) => {
        const url = "http://localhost:3000/animal";
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const data = {
          name: this.title,
          expression: this.expression,
          diet: this.diet,
          isBaby: this.isBaby,
          isOneAnimal: this.isOneAnimal,
          tags: this.chips,
          binaryImage: id,
        };

        return axios.post(url, data, header);
      };

      refresher(postData, this);

      const postImg = async (accessToken) => {
        const formData = new FormData();
        const url = "http://localhost:3000/upload";
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        formData.append("file", this.binaryImage, id);

        return axios.post(url, formData, header);
      };

      refresher(postImg, this);
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>