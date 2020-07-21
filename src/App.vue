<template>
  <v-app>
    <v-app-bar app color="white" flat dense>
      <div class="d-flex align-center">Animal Api</div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/jiwomdf" target="_blank" text>
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Login />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./components/Login";

export default {
  name: "App",

  components: {
    Login
  },

  data: () => ({
    //
  })
};
</script>
