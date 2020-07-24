<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1 class="mb-2">Welcome to Animal API!</h1>
      </v-col>
      <v-col>
        <v-btn class="mt-4 ml-12" text>See public API List</v-btn>
        <v-btn class="mt-4 ml-12" text v-on:click="register()">Join to contribute!</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card ref="form">
          <v-card>
            <v-tabs background-color="white" color="deep-purple accent-4" centered>
              <v-tab>Baby Animal</v-tab>
              <v-tab>Dogs</v-tab>
              <v-tab>Cats</v-tab>

              <v-tab-item v-for="n in 3" :key="n">
                <v-container>
                  <v-row>
                    <v-col v-for="i in 6" :key="i" cols="12" md="4">
                      <v-img
                        :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                        aspect-ratio="1"
                      ></v-img>
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
export default {
  name: "Main",
  data() {
    return {};
  },
  methods: {
    async register() {
      this.$router.push("/Register");
    },
  },
};
</script>