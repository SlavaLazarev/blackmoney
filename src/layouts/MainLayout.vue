<template>
  <div class="app-main-layout">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import messages from "../utils/messages";

export default {
  name: "MainLayout",
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Something went wrong, time to bash the bits')
    }
  },
  components: { Navbar }
};
</script>

<style scoped>

</style>