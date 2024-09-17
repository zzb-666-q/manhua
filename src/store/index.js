import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classID: '',
  },
  getters: {
    classID: state => state.classID ,
  },
  mutations: {
    setClassID(state, classID) {
      state.classID = classID
    }
  },
  actions: {
    setClassID({ commit }, classID) {
      commit('setClassID', classID)
    }
  },
  modules: {
  }
})
