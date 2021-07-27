import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth"
import info from "./info";
import payment from "./payment";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
    // async fetchCurrency() {
    //   const key = process.env.VUE_APP_FIXER
    //   const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,CNY,RUB,EUR`)
    //   return await res.json()
    // },
    async fetchPaymentById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const payment = (await firebase.database().ref(`/users/${uid}/payments`).child(id).once('value')).val() || {}
        console.log(id, 'id index')
        return {...payment, id}
      } catch (e) {

        commit('setError', e)
        throw e
      }
    }
  },
  modules: {auth, info, payment},
});
