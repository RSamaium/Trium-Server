<template>
  <div class="ui aligned center aligned login grid">
    <div class="column">
    <div class="ui image center">
      <img class="ui small image logo" src="static/assets/images/logo-big.png">
    </div>
    <div class="ui segment">
      <alert :title="error.message" type="error" v-if="error.message"></alert>
      <form class="ui large form" name="LoginForm">
        <v-input :validation="$v.username" v-model.trim="username" :placeholder='"email" | t'></v-input>
        <v-input :validation="$v.password" v-model="password" :placeholder='"password" | t'></v-input>
        <div class="two fields">
          <div class="field">
            <!--<el-checkbox v-model="remember">{{"remember me" | t}}</el-checkbox>-->
          </div>
          <div class="field">
            <router-link :to="{ name: 'forgotten-password'}">{{"password forgotten" | t}}</router-link>
          </div>
        </div>
          <button class="ui fluid primary big margin button animated" :class="{loading: loading, bounceIn: !$v.validationGroup.$invalid}" type="button"
          :disabled="$v.validationGroup.$invalid"  @click="login">{{"connection" | t}}</button>
          <div class="ui horizontal divider">
            Or
          </div>
          <button class="ui facebook button" type="button" @click="login('facebook')">
            <i class="facebook icon"></i>
            Facebook
          </button>
      </form>
    </div>
    <a class="ui basic fluid signup-btn button" type="submit" ui-sref="signup">{{"signup" | t}}</a>
  </div>
</div>
</template>

<script>

import Me from '../../services/me'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  created () {
    Me.logout()
  },
  data () {
    return {
      username: '',
      password: '',
      error: {},
      loading: false,
      remember: true
    }
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    validationGroup: ['username', 'password']
  },
  methods: {
    login (platform) {
      if (!platform) this.loading = true
      Me.login({
        platform,
        username: this.username,
        password: this.password,
        remember: this.remember
      }).then(data => {
        this.$router.push('/')
      }).catch(() => {
        this.loading = false
        this.error = new Error(`Impossible de se connecter.
          Veuillez vérifier votre mot de passe ou nom d'utilisateur`)
      })
    }
  }
}
</script>
