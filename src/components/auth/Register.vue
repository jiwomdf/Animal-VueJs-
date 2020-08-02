<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h1 class="mb-2">Register</h1>
        <h4
          class="mb-2"
        >Register an account so you can contribute in this project, it easy and fast!</h4>
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
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.requiredPassword, rules.minPassword]"
              :type="passwordShow ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="passwordShow = !passwordShow"
            ></v-text-field>

            <v-text-field
              v-model="form.name"
              :rules="[rules.requiredUserName, rules.minUserName]"
              counter="15"
              hint="At least 3 characters"
              label="Name"
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              :rules="[rules.requiredUserName, rules.minUserName]"
              hint="At least 3 characters"
              label="Email"
            ></v-text-field>

            <!-- <v-combobox
              v-model="form.chips"
              :items="form.items"
              chips
              clearable
              label="Role"
              multiple
              solo
              v-on:keydown="noTypeAble()"
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
            </v-combobox>-->

            <!-- <vue-recaptcha
              ref="recaptcha"
              @verify="setCaptchaValue"
              sitekey="6LcLNLcZAAAAALFT7ZNxJY9BvCBiYCxAPdz7Je5R"
            ></vue-recaptcha>-->

            <vue-recaptcha
              ref="recaptcha"
              @verify="setCaptchaValue"
              sitekey="6LeVDrgZAAAAAB2EQmZU_yLPoGVVT_NOrOxdjpcE"
            ></vue-recaptcha>

            <v-btn class="mt-4" color="teal" dark v-on:click="register()">
              <span class="mr-2">Register</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-alert type="error" dismissible v-if="alert_exist_bool">{{alert_exist}}</v-alert>
    <v-alert type="success" dismissible v-if="alert_sucess_bool">
      Account created successfuly, now you can login by click this button!
      <v-btn class="ml-4" v-on:click="login()">
        <span>Go to login page</span>
      </v-btn>
    </v-alert>
  </v-container>
</template>

<script>
const axios = require("axios");
const { apiUrl } = require("../../constant");
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "Register",
  components: {
    "vue-recaptcha": VueRecaptcha,
  },
  data() {
    return {
      passwordShow: false,
      alert_exist: "",
      alert_exist_bool: false,
      alert_sucess_bool: false,
      captchaVal: "",
      form: {
        userName: "",
        password: "",
        name: "",
        email: "",
        chips: [],
        items: ["User"],
      },
      rules: {
        requiredUserName: (value) => !!value || "Required.",
        minUserName: (v) => v.length >= 3 || "Min 3 characters",
        requiredPassword: (value) => !!value || "Required.",
        minPassword: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    login() {
      this.$router.push("/Login");
    },
    setCaptchaValue(captchaVal) {
      this.captchaVal = captchaVal;
    },
    remove(item) {
      this.form.chips.splice(this.form.chips.indexOf(item), 1);
      this.form.chips = [...this.form.chips];
    },
    async register() {
      this.alert_exist_bool = false;
      this.alert_sucess_bool = false;

      const captcha = this.captchaVal;
      const url = `${apiUrl}/user/register`;
      const user = {
        userName: this.form.userName,
        password: this.form.password,
        name: this.form.name,
        email: this.form.email,
        role: ["contributor"], //--> still hard coded
        captcha: captcha,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const retval = await axios.post(url, user, headers);

        if (retval.data.status === "200") {
          this.alert_sucess_bool = true;
        } else {
          this.alert_exist_bool = true;
          this.alert_exist = `error ${retval.data.status}`;
        }
      } catch (err) {
        this.alert_exist_bool = true;
        this.alert_exist = err.response.data.messages;
        this.$refs.recaptcha.reset();
      }
    },
  },
};
</script>