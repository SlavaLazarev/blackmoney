import firebase from "firebase/app";
export default {
  state: {
    info: {},
    payments: {}
  },
  mutations:{
    setInfo(state, info) {
      state.info = info
    },
    setPayment(state, payments) {
      state.payments = payments
    },
    cleanInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        await dispatch('getUid')
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        console.log(e);
      }
    },
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid')

        const updateData = {...getters.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info,
    payments: p => p.payments
  }
}