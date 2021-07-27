import firebase from "firebase/app";
// bill: 0
// create payment: + 500
// bill = 500
// edit payment: + 200
// bill? (200)  (500 - 300)
export default {
  actions: {
    async CreatePayment({commit, dispatch}, {title, description, rate, price, date, type}) {
      try {
        const uid = await dispatch('getUid')
        const payment = await firebase.database().ref(`/users/${uid}/payments`).push({title, description, rate, price, date, type})
       // updateBill(type)
        return {title, description, rate, price, date, type,  id: payment.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    // correctBillAfterEditPayment(diff = 300) {
    //  const updatedBill = currentBill (500) - diff (200) = 300
    //  запрос на firebase который перезапишет (toUpdate) (изменит 500 на 300)
    // }
    async EditPayment({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updatePayment = {...getters.payments, ...toUpdate}
        // updateBill(type)
        //  bill: 500
        // был payment = 500, изменен на 200
        // const diff = oldPaymentValue - newPaymentValue = 300
        // correctBillAfterEditPayment(diff)
        
        // await firebase.database().ref(`/users/${uid}/payments`).child(toUpdate.id).remove()
        await firebase.database().ref(`/users/${uid}/payments`).child(toUpdate.id).update(toUpdate)
        // console.log(idx, 'idx');
        commit('setPayment', updatePayment)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deletePayment({dispatch, commit}, toUpdate, idx) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/payments`).child(toUpdate.id).remove()
        console.log(idx, 'idx');
        commit('setPayment' )
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // async EditPayment({dispatch, commit, getters}, toUpdate) {
    //   try {
    //     const uid = await dispatch('getUid')
    //     const updateData = {...getters.payments, ...toUpdate}
    //     // const updatePayment = {...getters.payments, ...toUpdate}
    //     await firebase.database().ref(`/users/${uid}/payments/${toUpdate.idx}`).update(toUpdate)
    //
    //     // console.log(idx, 'idx');
    //     // console.log(idPay, 'idPay');
    //     commit('setInfo', updateData)
    //   } catch (e) {
    //     commit('setError', e)
    //     throw e
    //   }
    // },

    // async EditPayment({dispatch, commit, getters}, toUpdate, {id, title, date, rate, type, description, price}) {
    //   try {
    //     const uid = await dispatch('getUid')
    //     const updateData = {...getters.paymentData, ...toUpdate}
    //     // const updatePayment = {...getters.payments, ...toUpdate}
    //     await firebase.database().ref(`/users/${uid}/payments`).child(id).update(id, title, date, rate, type, description, price)
    //
    //     // console.log(idx, 'idx');
    //     // console.log(idPay, 'idPay');
    //     commit('setInfo', updateData)
    //   } catch (e) {
    //     commit('setError', e)
    //     throw e
    //   }
    // },
    async fetchPayment({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const payments = (await firebase.database().ref(`/users/${uid}/payments`).once('value')).val() || {}
        return Object.keys(payments).map(key => ({...payments[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}