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
      <Register />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./components/Login";
import Register from "./components/Register";

export default {
  name: "App",

  components: {
    Login,
    Register
  },

  data: () => ({
    //
  })
};
</script>
