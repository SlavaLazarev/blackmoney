<template>
  <div >
    <Loader v-if="loading"/>
    <table v-else-if="payments.length">
    <thead>
    <tr>
      <th>№</th>
      <th>Title</th>
      <th>Date</th>
      <th>Price</th>
      <th>Status</th>
      <th>Rate</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(payment, i) in items" :key="payment.id" @click="$router.push('/detail/'+ payment.id)">
      <td>{{ i + 1 }}</td>
      <td>{{ payment.title }}</td>
      <td>{{ payment.date }}</td>
      <td>{{ payment.price }} YCN</td>
      <td>
        <span
        class="white-text badge"
        :class="payment.typeClass"
        style="border-radius: 10px; width: 80%"
        >
          {{payment.typeText }}
        </span>
      </td>
      <td>{{ payment.rate }}</td>
    </tr>
    </tbody>
  </table>
    <h5 v-else class="center">There are no records <router-link to="/new">Create</router-link></h5>
      <paginate
        v-if="payments.length >= 10"
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
  </div>
</template>

<script>
import Loader from "./Loader";
import paginationMixin from '../mixins/pagination.mixin'
export default {
  name: "TableElement",
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    payments: []
  }),
  async mounted() {
    const payments = await this.$store.dispatch('fetchPayment')

    this.setupPagination(this.payments = payments.reverse().map(payment => {
        return {
          ...payment,
          typeClass: payment.type === 'income' ? 'green' : 'red',
          typeText: payment.type === 'income' ? 'Income' : 'Outcome',
        }
      }))

    this.loading = false
  },
  components: {
    Loader
  }
}
</script>

<style scoped>

</style>