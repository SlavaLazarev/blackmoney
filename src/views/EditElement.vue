<template>
  <div class="center">
    <Loader v-if="loading"/>
    <div v-else>
    <form class="card auth-card center" @submit.prevent="onHandler" style="width: auto; height: auto">
      <div class="card-content">
        <span class="card-title">Edit payment</span>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="Name">Title</label>
          <small class="helper-text invalid"
                 v-if="($v.title.$dirty && !$v.title.required)"
          >Please enter title</small>
        </div>

        <div class="input-field">
          <input
            id="rate"
            type="text"
            v-model.trim="rate"
            :class="{invalid: ($v.rate.$dirty && !$v.rate.required)}"
          >
          <label for="rate">Rate</label>
          <small class="helper-text invalid"
                 v-if="$v.rate.$dirty && !$v.rate.required"
          >Please enter rate</small>
        </div>

        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
          >
          <label for="description">Description</label>
          <small class="helper-text invalid"
                 v-if="$v.description.$dirty && !$v.description.required"
          >Please enter description</small>
        </div>

        <div class="input-field">
          <input
            type="date"
            id="date"
            v-model.trim="date"
            placeholder="Date"
            :class="{invalid: ($v.date.$dirty && !$v.date.required)}"
          >
          <small class="helper-text invalid"
                 v-if="$v.date.$dirty && !$v.date.required"
          >Please enter date</small>
        </div>

        <div class="input-field">
          <input
            id="price"
            type="number"
            v-model="price"
            :class="{invalid: ($v.price.$dirty && !$v.price.minValue)}"
          >
          <label for="price">Price</label>
          <small class="helper-text invalid"
                 v-if="$v.price.$dirty && !$v.price.minValue"
          >Minimum amount  {{ $v.price.$params.minValue.min }}</small>
        </div>
        <div class="left-align">
          <p>
            <label>
              <input class='with-gap'
                     name="type"
                     type="radio"
                     value="income"
                     v-model="type"
              />
              <span>Income</span>
            </label>
          </p>

          <p>
            <label>
              <input class='with-gap'
                     name="type"
                     type="radio"
                     value="outcome"
                     v-model="type"
              />
              <span>Outcome</span>
            </label>
          </p>
        </div>
      </div>

      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Create
            <i class="material-icons right" style="color: white">create</i>
          </button>
        </div>
      </div>
    </form>
    <router-link
      to="/"
      class="btn-floating btn-large waves-effect waves-light red">
      <i class="material-icons black-text" style="color: white">
        arrow_back
      </i>
    </router-link>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import Loader from "../components/Loader";
import router from "../router";
import {mapGetters} from 'vuex'

export default {
  name: "NewElement",
  data: () => ({
    loading: false,
    current: null,
    title: '',
    description: '',
    rate: '',
    date: null,
    type: 'outcome',
    price: 0
  }),
  validations: {
    title: {required},
    description: {required},
    rate: {required},
    date: {required},
    price: {minValue: minValue(100)}
  },
  watch: {
    current(value) {
      console.log(value);
    }
  },
  methods: {
    async onHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const payment = await this.$store.dispatch('EditPayment', {

          id: this.id,
          // title: this.title,
          // description: this.description,
          // rate: this.rate,
          // price: this.price,
          // date: this.date,
          // type: this.type
        })
        console.log(payment);

        const bill = this.type === 'income'
          ? Number(this.info.bill) + Number(this.price)
          : this.info.bill - this.price

          await this.$store.dispatch('updateInfo', {bill}),

          this.title = ''
          this.description = ''
          this.rate = ''
          this.price = 0
          this.date = ''
          this.$v.$reset()
          this.$message('Payment was edited')
          router.push('/')
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    ...mapGetters(['info']),
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  components: {
    Loader
  }
}
</script>