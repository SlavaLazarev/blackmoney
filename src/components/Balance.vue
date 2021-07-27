<template>
  <div class="center-align">
<!--    <span><h2>{{info.bill | currency('YCN')}}</h2></span>-->
    <span><h2>{{info.bill}} YCN</h2></span>
<!--    <p-->
<!--      v-for="currency in currencies"-->
<!--      :key="currency">-->
<!--&lt;!&ndash;      <span>{{getCurrency(currency) | currency(currency)}}</span>&ndash;&gt;-->
<!--    </p>-->
    <span><router-link  to="/new" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons black-text">add</i>
</router-link></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ['rates'],
  name: "Balance",
  data: () => ({
    currencies: ['RUB'],
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['CNY'] / this.rates['EUR'])

    },
    ...mapGetters(['info']),
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }

  },
}
</script>

<style scoped>
</style>