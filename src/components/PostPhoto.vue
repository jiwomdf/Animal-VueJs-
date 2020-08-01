<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1>Post an Animal Photo</h1>
        <br />
        <!-- <form enctype="multipart/form-data"> -->
        <v-file-input v-model="form.binaryImage" show-size label="Upload Image"></v-file-input>

        <!-- <input type="file" ref="file" @change="selectFile()" /> -->

        <v-text-field v-model="form.title" label="Image Title"></v-text-field>

        <v-overflow-btn
          v-model="form.expression"
          :items="dropdown_expression"
          label="Animal Expression"
          target="#dropdown-example"
        ></v-overflow-btn>

        <v-overflow-btn
          v-model="form.diet"
          :items="dropdown_diet"
          label="Animal Diet"
          target="#dropdown-example"
        ></v-overflow-btn>

        <v-checkbox v-model="form.isBaby" :label="`is it a Baby? \n ${form.isBaby.toString()}`"></v-checkbox>

        <v-checkbox
          v-model="form.isOneAnimal"
          :label="`is there only one animal on the pic? \n ${form.isOneAnimal.toString()}`"
        ></v-checkbox>

        <v-combobox v-model="form.chips" :items="items" chips clearable label="Tags" multiple solo>
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

        <v-textarea v-model="form.story" label="Tell about this pic!" counter maxlength="200"></v-textarea>

        <v-btn v-on:click="postPost()" dark color="teal">Post Animal!</v-btn>
        <!-- </form> -->
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-dialog v-model="alert_exist_bool" max-width="290">
          <v-card color="red" dark>
            <v-card-title class="headline">Something wrong!</v-card-title>

            <v-card-text>{{alert_exist}}</v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
const postRefresher = require("../util/postRefresher");
const returnRefresher = require("../util/returnRefresher");

export default {
  name: "Main",
  data() {
    return {
      alert_exist: "",
      alert_exist_bool: false,
      dropdown_expression: ["Happy", "Sad", "Inocent", "Cry"],
      dropdown_diet: ["Herbivore", "Carnivore", "Omnivore"],
      items: ["Cute", "Solo", "Baby", "Sleeping"],

      form: {
        expression: "",
        diet: "",
        isBaby: false,
        isOneAnimal: false,
        title: "",
        chips: [],
        binaryImage: [],
        userName: "",
        story: "",
      },
    };
  },
  methods: {
    remove(item) {
      this.form.chips.splice(this.form.chips.indexOf(item), 1);
      this.form.chips = [...this.form.chips];
    },
    /*selectFile() {
      this.form.binaryImage = this.$refs.file.files[0];
    },*/
    async postPost() {
      this.alert_exist_bool = false;

      if (this.form.binaryImage == [])
        this.validateRetVal({ isComplete: false, msg: "empty photo" });

      let id = this.makeid(10);
      let retPostData = await this.postData(id);

      if (retPostData) {
        let retPostImg = await this.postImg(id);

        if (retPostImg.isComplete) this.$router.push("/Dashboard");
        else {
          let photoID = retPostData.data.data.data._id;

          await this.deleteAnimal(photoID);
          this.alert_exist_bool = true;
          this.alert_exist = retPostImg.msg;
        }
      }
    },
    async postData(id) {
      const postData = async (accessToken) => {
        const url = "http://localhost:3000/animal";
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const data = {
          name: this.form.title,
          expression: this.form.expression,
          diet: this.form.diet,
          isBaby: this.form.isBaby,
          isOneAnimal: this.form.isOneAnimal,
          tags: this.form.chips,
          binaryImage: id,
          userName: this.$store.getters.getLogin,
          story: this.form.story,
        };

        return axios.post(url, data, header);
      };

      let retVal = await returnRefresher(postData, this);

      if (!retVal.isComplete) {
        this.alert_exist_bool = true;
        this.alert_exist = retVal.msg;
        return { isValid: false, data: null };
      } else return { isValid: true, data: retVal.data };
    },
    async postImg(id) {
      const postImg = async (accessToken) => {
        const formData = new FormData();
        const url = "http://localhost:3000/image";
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        };

        formData.append("file", this.form.binaryImage, id);

        return axios.post(url, formData, header);
      };

      return await postRefresher(postImg, this);
    },
    makeid(length) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      let unix_seconds = new Date().getTime() / 1000;

      return unix_seconds + result;
    },
    async deleteAnimal(animalID) {
      const deleteAnimal = async (accessToken) => {
        const url = `http://localhost:3000/animal/${animalID}`;
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
  },
};
</script>