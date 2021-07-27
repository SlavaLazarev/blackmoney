<template>
  <div class="case">
  <form class="card auth-card" @submit.prevent="onsubmit" style="height: auto; width: auto">
    <div class="card-content">
      <span class="card-title">Registration</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="($v.email.$dirty && !$v.email.required)"
        >Поле Email не должно быть пустым</small>
        <small
          class="helper-text invalid"
          v-else-if="($v.email.$dirty && !$v.email.email)"
        >Введите корретный Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="($v.password.$dirty && !$v.password.required)"
        >Введите пароль</small>
        <small
          class="helper-text invalid"
          v-else-if="($v.password.$dirty && !$v.password.minLength)"
        >Пароль должен быть не меньше {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="($v.name.$dirty && !$v.name.required)"
        >Введите Ваше имя</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
  </div>
</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
  },
  methods: {
    async onsubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push("/")
        // eslint-disable-next-line no-undef
      } catch (e) {
        this.$router.push("/")
        throw e;
      }
    },
  },
}
</script>
