import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    get_user (context, user) {
      context.commit('SET_USER', user)
    }
  },
  modules: {
  }
})
