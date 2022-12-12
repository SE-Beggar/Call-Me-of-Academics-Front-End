import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:false,
    username:'',
    email:'',
    paperid:0,
    searchcontent:'',
    authorID:0,
    advancecontent:[{logic:0, entry:0, input:""}],
    type:0,
    timerange:""
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
