<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else class="row">
    <Balance
    />
    <TableElement :payments="payments"/>
    </div>
  </div>
</template>

<script>
import TableElement from "../components/TableElement";
import Balance from "../components/Balance";

export default {
  name: "Home",
  data: () => ({
    loading: false,
    currency: null,
    payments: []
  }),
  // async mounted() {
  //   this.currency = await this.$store.dispatch('fetchCurrency')
  //   this.loading = false
  // },
  components: { Balance, TableElement },
};
</script>
