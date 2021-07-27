<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "../utils/messages";

export default {
  name: "EmptyLayout",
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
  }
};
</script>

<style scoped>

</style>