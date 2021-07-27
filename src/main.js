import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Loader from "./components/Loader";
import Vuelidate from "vuelidate"
import Paginate from 'vuejs-paginate'
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import messagePlugin from "./utils/message.plugin"
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

Vue.config.productionTip = false;

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyD3_FxBCiU2iQXR3Mp3LDePo0EGwsSaQGY",
  authDomain: "wallet-app-ru.firebaseapp.com",
  projectId: "wallet-app-ru",
  storageBucket: "wallet-app-ru.appspot.com",
  messagingSenderId: "810371486928",
  appId: "1:810371486928:web:c1851c336bd04f0763bad5"
})

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app")
  }
})


