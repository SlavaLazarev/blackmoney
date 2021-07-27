import firebase from "firebase/app";

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(dispatch, commit);
        // eslint-disable-next-line no-empty
      } catch (e) {
        commit('setError', e)
        throw e;
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 0,
          name
        })
        // eslint-disable-next-line no-empty
      } catch (e) {
        commit('setError', e)
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  },
};
