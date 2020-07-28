<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>Api Documentation</h1>
        <h4
          style="color:red;"
        >Sorry but this page is still under development and can't be use right now</h4>
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
            <h3>Get Animal by Keyword</h3>
            <p>
              Post request
              <br />
              http://localhost:3000/animal/keyword?={your keyword}
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <h3>Get Baby Animal</h3>
            <p>
              Post request
              <br />http://localhost:3000/animal/baby
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <h3>Get Photo of One Animal</h3>
            <p>
              Post request
              <br />http://localhost:3000/animal/solo
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <h3>Get Carnivore Animal</h3>
            <p>
              Post request
              <br />http://localhost:3000/animal/carnivore
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <h3>Get Herbivore Animal</h3>
            <p>
              Post request
              <br />http://localhost:3000/animal/herbivore
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