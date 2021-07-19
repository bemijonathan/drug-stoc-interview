import { createStore } from 'vuex'
import request from '../utils/request'
export default createStore({
  state: {
    Tasks: []
  },
  mutations: {
    setTasks(state, payload) {
      state.Tasks = payload
    }
  },
  actions: {
    async getTasks({ commit }) {
      try {
        const { data } = await request.get('/api/tasks');
        commit('setTasks', data)
      } catch (error) {
        throw new Error(error.response ? error.response.message : error.message )
      }
    },
    deleteTasks() {

    },
    updateTasks() {

    },
    createTasks() {

    },
    addComment () {
      
    }
  },
  modules: {
  }
})
