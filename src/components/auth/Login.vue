<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1 class="mb-2">Login</h1>
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              v-model="form.userName"
              :rules="[rules.requiredUserName, rules.minUserName]"
              counter="15"
              hint="At least 3 characters"
              label="Username"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <!-- Local -->
            <!-- <vue-recaptcha
              ref="recaptcha"
              @verify="setCaptchaValue"
              sitekey="6LcLNLcZAAAAALFT7ZNxJY9BvCBiYCxAPdz7Je5R"
            ></vue-recaptcha>-->

            <!-- Real -->
            <vue-recaptcha
              ref="recaptcha"
              @verify="setCaptchaValue"
              sitekey="6LeVDrgZAAAAAB2EQmZU_yLPoGVVT_NOrOxdjpcE"
            ></vue-recaptcha>

            <v-btn class="mt-4" color="teal" dark v-on:click="login()">
              <span class="mr-2">Login</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-btn text class="mt-4" v-on:click="register()">
          <span class="mr-2">dont have any account? click to register</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-alert type="error" dismissible v-if="alert_exist_bool">{{alert_exist}}</v-alert>
  </v-container>
</template>

<script>
const axios = require("axios");
const { apiUrl } = require("../../constant");
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "Login",
  components: {
    "vue-recaptcha": VueRecaptcha,
  },
  mounted() {
    // this.$refs.recaptcha.execute();
  },
  data() {
    return {
      alert_exist: "",
      alert_exist_bool: false,
      form: {
        userName: "",
        password: "",
      },
      show1: false,
      captchaVal: "",
      rules: {
        requiredUserName: (value) => !!value || "Required.",
        minUserName: (v) => v.length >= 3 || "Min 3 characters",
      },
    };
  },
  methods: {
    setCaptchaValue(captchaVal) {
      this.captchaVal = captchaVal;
    },
    async login() {
      this.alert_exist_bool = false;

      const captcha = this.captchaVal;

      const url = `${apiUrl}/auth/login`;
      const data = {
        userName: this.form.userName,
        password: this.form.password,
        captcha: captcha,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const retval = await axios.post(url, data, headers);

        this.$cookie.set("accessToken", retval.data.accessToken, 1);
        this.$cookie.set("refreshToken", retval.data.refreshToken, 1);

        this.$store.commit("setLogin", this.form.userName);

        this.$router.push("/Dashboard");
      } catch (err) {
        this.alert_exist_bool = true;
        this.alert_exist = err.response.data.messages;

        this.$refs.recaptcha.reset();
      }
    },
    register() {
      this.$router.push("/Register");
    },
  },
};
</script>