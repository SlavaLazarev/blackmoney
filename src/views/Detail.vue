<template>
  <div>
    <loader v-if="loading"/>
    <div v-else-if="payment">
      <div class="breadcrumb-wrap">
        <router-link to="/" class="breadcrumb">Home</router-link>
        <a @click.prevent class="breadcrumb">
          {{ payment.type === 'income' ? 'Income' : 'Outcome' }}
        </a>
      </div>
      <div class="row" @click="visibility = !visibility">
        <div class="col s12 m6" style="width: 98%">
          <div
            class="card"
            style="width: 100%"
            :class="{'red' : payment.type === 'outcome',
              'green': payment.type === 'income'}"
          >
            <div class="card-content white-text">
              <p>Title: {{ payment.title }}</p>
              <p>Description: {{payment.description}}</p>
              <p>Сумма: {{ payment.price | currency('YCN') }}</p>

              <small>{{payment.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>

      <form class="card auth-card center" @submit.prevent="onHandler" style="width: auto; height: auto" v-show="visibility">
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
              Update
              <i class="material-icons right" style="color: white">create</i>
            </button>
          </div>
        </div>
      </form>

      <div class="center">
      <router-link
        to="/"
        class="btn-floating btn-large waves-effect waves-light red">
        <i class="material-icons black-text" style="color: white">
          arrow_back
        </i>
      </router-link>
<!--        <button-->
<!--          @click="deletePayment"-->
<!--          class="btn-floating btn-large waves-effect waves-light red">-->
<!--          <i class="material-icons black-text" style="color: white">-->
<!--            delete-->
<!--          </i>-->
<!--        </button>-->
    </div>
    </div>

    <p class="center" v-else >Запись c id{{$route.params.id}} не найдена</p>
  </div>
</template>

<script>
import { minValue, required } from "vuelidate/lib/validators";
import router from "../router";
import { mapGetters } from "vuex";
import Loader from "../components/Loader";

export default {
  name: 'Detail',
  data: () => ({
    visibility: false,
    current: null,
    payment: null,
    loading: true,
    edit: false,
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
  async mounted() {
    const id = this.$route.params.id
    const payment = await this.$store.dispatch('fetchPaymentById', id)
    this.payment = {
      ...payment,
      title: payment.title
    }
    this.loading = false
      // eslint-disable-next-line no-undef
      M.updateTextFields()
  },
  methods: {
    async onHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const idx = this.$route.params.id
        const price = this.payment.price
        const paymentData = {
          id: idx,
          title: this.title,
          description: this.description,
          rate: this.rate,
          price: this.price,
          date: this.date,
          type: this.type
        }
        await this.$store.dispatch('EditPayment', paymentData)

        const bill = this.type === 'income'
          ? Number(this.info.bill) - Number(price) +Number(this.price)
          : this.info.bill + Number(price) - this.price

        await this.$store.dispatch('updateInfo', { bill }),
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
    },
    // async deletePayment() {
    //   try {
    //     const idx = this.$route.params.id
    //     const price = this.payment.price
    //     const type = this.payment.type
    //     const paymentData = {
    //       id: idx,
    //       price: price,
    //       type: type
    //     }
    //     await this.$store.dispatch('deletePayment', paymentData)
    //
    //     const bill = type === 'income'
    //       ? Number(this.info.bill) + Number(price)
    //       : this.info.bill - price
    //
    //     await this.$store.dispatch('updateInfo', { bill })
    //     router.push('/')
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  },
  computed: {
    ...mapGetters(['info']),
  },
  components: {
    Loader
  }
}
</script>
