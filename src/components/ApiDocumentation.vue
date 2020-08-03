<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>Api Documentation</h1>
        <h4 style="color:red;">Sorry but this page is still under development</h4>
      </v-col>
    </v-row>
    <v-card>
      <div class="ml-2">
        <v-row justify="center">
          <v-col>
            <h3>1. Get all animal picture</h3>
            <p>
              <span style="color:darkcyan;">GET</span>
              {{apiUrl}}/animalImg/
            </p>
            <h4>Return value</h4>
            <p>
              "status": "200",
              "messages": "success",
              "data": [
              {
              "tags": [
              "Cute",
              "Solo"
              ],
              "name": "Duck",
              "story": "Cute Duck",
              "expression": "Happy",
              "diet": "Herbivore",
              "isBaby": false,
              "isOneAnimal": true,
              "binaryImage": "1595857785.4Y6SUHwtQfM",
              "destination": "./public/",
              "imagePath": "http://localhost:3000/public/1595857785.4Y6SUHwtQfM.jpg"
              },
            </p>
          </v-col>
        </v-row>
        <hr style="background-color: lightgrey; height: 1px; border: 0;" />
        <v-row justify="center">
          <v-col>
            <h3>2. Get all animal picture by condition</h3>
            <p>
              <span style="color:#F57F17;">POST</span>
              {{apiUrl}}/animalImg/
            </p>
            <h4>Parameter</h4>
            <p>
              <span style="color:#6200EA;">Header</span> Content-Type - application/json
              <br />
              <span style="color:#6200EA;">Body</span>
              {
              "diet": "Herbivore",
              "expression": "Happy",
              "isBaby": false,
              "isOneAnimal": true
              }
              <br />
              <span style="color:#6200EA;">Provisions</span>
              <br />
              <span style="color:red">"diet"</span> must be one of
              <b>"Happy", "Sad", "Innocent", "Cry"</b> or use
              <b>"" (empty string)</b> to select all category
              <br />
              <span style="color:red">"expression"</span> must be one of
              <b>"Carnivore", "Herbivore", "Omnivore"</b> or use
              <b>"" (empty string)</b> to select all category
              <br />
              <span style="color:red">"isBaby"</span>: must be between true or false
              <br />
              <span style="color:red">"isOneAnimal"</span>: must be between true or false
              <br />
            </p>
            <h4>Return value</h4>
            <p>
              "status": "200",
              "messages": "success",
              "data": [
              {
              "tags": [
              "Cute",
              "Solo"
              ],
              "name": "Duck",
              "story": "Cute Duck",
              "expression": "Happy",
              "diet": "Herbivore",
              "isBaby": false,
              "isOneAnimal": true,
              "binaryImage": "1595857785.4Y6SUHwtQfM",
              "destination": "./public/",
              "imagePath": "http://localhost:3000/public/1595857785.4Y6SUHwtQfM.jpg"
              },
            </p>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
const { apiUrl } = require("../constant");

export default {
  data() {
    return {
      apiUrl: apiUrl,
    };
  },
};
</script>