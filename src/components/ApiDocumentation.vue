<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>Api Documentation</h1>
      </v-col>
    </v-row>
    <v-card>
      <div class="ml-2">
        <v-row justify="center">
          <v-col>
            <h3>Get All Animal</h3>
            <p>
              Post request
              <br />http://localhost:3000/animal/picture/
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <h3>Get Animal by ID</h3>
            <p>
              Post request
              <br />http://localhost:3000/animal/picture/:id
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <h3>Get All Blog</h3>
            <p>
              Post request
              <br />http://localhost:3000/blog/
            </p>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>