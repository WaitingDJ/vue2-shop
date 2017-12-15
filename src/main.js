// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import axios from 'axios'
import Vuex from 'vuex'


Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(VueLazyLoad, {
  loading: 'static/loading-svg/loading-bars.svg',
  attempt: 3
})

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, nickName){
      state.nickName = nickName;
    },
    //更新购物车信息
    updateCartCount(state, cartCount){
      state.cartCount += cartCount;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mounted(){
    this.checkLogin();
    this.getCartCount();
  },
  methods:{
    checkLogin(){
      axios.get("users/checkLogin").then(res=> {
        var res = res.data;
        if (res.status == "0") {
          this.$store.commit("updateUserInfo", res.result);
        }else{
          if(this.$route.path!="/GoodsList"){
            this.$router.push("/GoodsList");
          }
        }
      });
    },
    getCartCount(){
      axios.get("users/getCartCount").then(res=>{
        var res = res.data;
        if(res.status=="0"){
          this.$store.commit("updateCartCount",res.result);
        }
      });
    }
  },
  template: '<App/>',
  components: { App }
})
