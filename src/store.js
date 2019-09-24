import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vehicles: []
  },
  mutations: {
    setVehicles: (state, vehicles) => {
      state.vehicles = vehicles
    }
  },
  getters: {

  }
})