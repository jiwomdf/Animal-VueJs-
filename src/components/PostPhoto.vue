<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1>Post an Animal Photo</h1>
        <br />
        <form enctype="multipart/form-data">
          <!-- <v-file-input v-model="binaryImage" show-size label="Upload Image"></v-file-input> -->

          <input type="file" ref="file" @change="selectFile()" />

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

          <v-combobox
            v-model="form.chips"
            :items="items"
            chips
            clearable
            label="Tags"
            multiple
            solo
          >
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

          <v-textarea
            v-model="form.story"
            label="Tell about this pic!"
            counter
            maxlength="100"
            full-width
          ></v-textarea>

          <button v-on:click="postPost()">Post Animal!</button>
        </form>
      </v-col>
    </v-row>
    <v-alert type="error" dismissible v-if="alert_exist_bool">{{alert_exist}}</v-alert>
  </v-container>
</template>

<script>
const axios = require("axios");
const refresher = require("../refresher");

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
        binaryImage: "",
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
    selectFile() {
      this.form.binaryImage = this.$refs.file.files[0];
      console.log(this.form.binaryImage);
    },
    async postPost() {
      this.alert_exist_bool = false;

      let id = this.makeid(10);

      let isValid = await this.postImg(id);

      if (isValid) {
        await this.postData(id);
        this.$router.push("/Dashboard");
      }
    },
    async postData(id) {
      console.log("ASUP");

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
          userName: this.$store.state.loginUserName,
          story: this.form.story,
        };

        return axios.post(url, data, header);
      };

      let errMsg = await refresher(postData, this);
      if (errMsg != "") {
        this.alert_exist_bool = true;
        this.alert_exist = errMsg;
        return false;
      } else return true;
    },
    async postImg(id) {
      const postImg = async (accessToken) => {
        const formData = new FormData();
        const url = "http://localhost:3000/image";
        const header = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        formData.append("file", this.form.binaryImage, id);

        return axios.post(url, formData, header);
      };

      let errMsg = await refresher(postImg, this);
      if (errMsg != "") {
        this.alert_exist_bool = true;
        this.alert_exist = errMsg;
        return false;
      } else return true;
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

      let dateCreated = new Date().toISOString();
      return dateCreated + result;
    },
  },
};
</script>