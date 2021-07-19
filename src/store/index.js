
import { createStore } from 'vuex'
import request from '../utils/request'
const prices = [
  {
    lowerRange: 0,
    higherRange: 100,
  },
  {
    lowerRange: 100,
    higherRange: 300,
  },
  {
    lowerRange: 301,
    higherRange: 900,
  },
  {
    lowerRange: 900,
    higherRange: Infinity,
  },
]

export default createStore({
  state: {
    Tasks: { data: [] },
    Tags: [],
    Headers: [],
    loading: false,
    currentQuery: '',
    assignees: [],
    cloneTask: { data: [] },
    term: '',
    tags: [],
    prices: []
  },
  mutations: {
    searchTask(state, payload) {
      state.term = payload
      console.log('help')
      if (payload !== '') {
        const reg = new RegExp(payload, 'ig')
        state.Tasks.data = state.cloneTask.data.filter(e => {
          if (reg.test(e.title)) {
            return e
          }
        })
      } else {
        if (state.tags.length) {
          state.Tasks.data = state.cloneTask.data.filter(e => {
            if (state.tags.includes(e.tag.slug)) {
              return e
            }
          })
        }
        if (state.prices.length) {
          // state.Tasks.data =
          const g = state.cloneTask.data.map(e => {
            if (e.price < prices[0].higherRange) {
              return { ...e, region: 0 }
            } else if (e.price < prices[1].higherRange) {
              return { ...e, region: 1 }
            } else if (e.price < prices[2].higherRange) {
              return { ...e, region: 2 }
            } else {
              return { ...e, region: 3 }
            }
          })
          state.Tasks.data = g.filter(e => {
            if (state.prices.includes(e.region)) {
              console.log(e, 'eeeeee', state.prices)
              return e
            }
          })
          console.log(state.Tasks.data)
        }
        if (state.prices.length || state.tags.length) {
          return
        } else {
          state.Tasks = { ...state.cloneTask }
        }
      }
    },
    selectTag(state, payload) {
      state.tags = payload
      if (payload.length > 0) {
        state.Tasks.data = state.Tasks.data.filter(e => {
          console.log(e)
          if (payload.includes(e.tag.slug)) {
            return e
          }
        })
      } else {
        if (state.term.length) {
          const reg = new RegExp(state.term, 'ig')
          state.Tasks.data = state.cloneTask.data.filter(e => {
            if (reg.test(e.title)) {
              return e
            }
          })
        }
        if (state.prices.length) {
          if (state.prices.length !== 0) {
            // state.Tasks.data =
            const g = state.cloneTask.data.map(e => {
              if (e.price < prices[0].higherRange) {
                return { ...e, region: 0 }
              } else if (e.price < prices[1].higherRange) {
                return { ...e, region: 1 }
              } else if (e.price < prices[2].higherRange) {
                return { ...e, region: 2 }
              } else {
                return { ...e, region: 3 }
              }
            })
            state.Tasks.data = g.filter(e => {
              if (state.prices.includes(e.region)) {
                console.log(e, 'eeeeee', state.prices)
                return e
              }
            })
            console.log(state.Tasks.data)
          }
        }
        if (state.term.length || state.prices.length) {
          return

        } else {
          state.Tasks = { ...state.cloneTask }
        }
      }
    },

    selectPrice(state, payload) {
      state.prices = payload

      if (payload.length !== 0) {
        // state.Tasks.data =
        const g = state.cloneTask.data.map(e => {
          if (e.price < prices[0].higherRange) {
            return { ...e, region: 0 }
          } else if (e.price < prices[1].higherRange) {
            return { ...e, region: 1 }
          } else if (e.price < prices[2].higherRange) {
            return { ...e, region: 2 }
          } else {
            return { ...e, region: 3 }
          }
        })
        state.Tasks.data = g.filter(e => {
          if (payload.includes(e.region)) {
            console.log(e, 'eeeeee', payload)
            return e
          }
        })
        console.log(state.Tasks.data)
      } else {
        if (state.term.length) {
          const reg = new RegExp(state.term, 'ig')
          state.Tasks.data = state.cloneTask.data.filter(e => {
            if (reg.test(e.title)) {
              return e
            }
          })
        }
        if (state.tags.length) {
          state.Tasks.data = state.cloneTask.data.filter(e => {
            if (state.tags.includes(e.tag.slug)) {
              return e
            }
          })
        }
        if (state.tags.length || state.term.length) {
          return
        } else {
          state.Tasks = { ...state.cloneTask }
        }
      }
    },
    sortTasks(state, payload) {
      if (payload.title) {
        state.Tasks.data.sort((a, b) => a.title > b.title)
        state.cloneTask.data.sort((a, b) => a.title > b.title)
      }

      if (payload.price) {
        state.Tasks.data.sort((a, b) => b.price - a.price)
        state.cloneTask.data.sort((a, b) => b.price - a.price)

      }


    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setTasks(state, payload) {
      state.cloneTask = JSON.parse(JSON.stringify(payload))
      state.Tasks = payload
    },
    setTags(state, payload) {
      state.Tags = payload
    },
    addHeadersCount(state, payload) {
      console.log('setting')
      state.Headers = [
        { title: "Active Task", payload: "ACTIVE_TASK", count: payload.active, tag: 'waiting_approval in_progress in_review' },
        { title: "Completed", payload: "COMPLETE_TASK", count: payload.completed, tag: 'verify' },
        { title: "Archived", payload: "ARCHIVED_TASK", count: payload.archived, tag: 'archived' },
        { title: "Closed", payload: "CLOSED_TASK", count: payload.closed, tag: 'closed' },
      ]
    },
    setCurrentQuery(state, payload) {
      state.currentQuery = payload
    },
    setAssignees(state, payload) {
      state.assignees = payload
    }
  },
  actions: {
    async getTasks({ commit }) {
      try {
        const { data } = await request.get('/api/tasks?populate=assignee,tag&page=1');
        console.log(data)
        commit('setTasks', data)
      } catch (error) {
        throw new Error(error.response ? error.response.message : error.message)
      }
    },
    async getTags({ commit }) {
      try {
        const { data } = await request.get('/api/tags');
        console.log(data)
        commit('setTags', data.data)
      } catch (error) {
        throw new Error(error.response ? error.response.message : error.message)
      }
    },
    async getAnalytics({ commit }) {
      try {
        const { data } = await request.get('/tasks/analytics');
        console.log(data)
        commit('addHeadersCount', data)
      } catch (error) {
        throw new Error(error.response ? error.response.message : error.message)
      }
    },
    async selectCategory({ state, commit }, payload) {
      commit('setLoading', true)
      const tags = state.Headers.find(e => e.tag.includes(payload))
      console.log(tags.tag);
      let params = '?';
      let data;
      if (tags.tag.split(" ").length > 1) {
        tags.tag.split(" ").forEach(element => {
          params += `where[status]=${element}&`
        });
        data = await (await request.get('/api/tasks??populate=assignee,tag&page=1&status=' + params)).data
        commit("setCurrentQuery", "/api/tasks?populate=assignee,tag&page=1&status=' + params")
      } else {
        data = await (await request.get('/api/tasks?populate=assignee,tag&page=1&where[status]=' + tags.tag)).data
        commit("setCurrentQuery", '/api/tasks?populate=assignee,tag&page=1&where[status]=' + tags.tag)
      }
      console.log(data)
      commit("setTasks", data)
      commit("setLoading", false)
    },
    async paginateTask({ commit }, payload) {
      debugger

      const { page, tag } = payload;

      let data;
      let params = '';

      if (tag.split(" ").length > 1) {
        tag.split(" ").forEach(element => {
          params += `where[status]=${element}&`
        });
        data = await (await request.get(`/api/tasks?populate=assignee,tag&page=${page}&status=${params}`)).data
        commit("setCurrentQuery", `/api/tasks?populate=assignee,tag&page=${page}&status=${params}`)
      } else {
        data = await (await request.get(`/api/tasks?populate=assignee,tag&page=${page}&where[status]=${tag}`)).data
        commit("setCurrentQuery", '/api/tasks?populate=assignee,tag&page=1&where[status]=' + tag)
      }
      console.log(data)
      commit("setTasks", data)
      commit("setLoading", false)
    },
    async getAssignees({ commit }) {
      try {
        const { data } = await request.get('/api/assignees');
        console.log(data)
        commit('setAssignees', data.data)
      } catch (error) {
        throw new Error(error.response ? error.response.message : error.message)
      }
    },
    deleteTasks() {

    },
    updateTasks() {

    },
    createTasks() {

    },
    addComment() {

    }
  },
  getters: {
    getCurrentTask(state) {
      console.log(state)
      return state.Tasks.data.filter(e => e.current_task)
    },
    getOtherTask(state) {
      return state.Tasks.data.filter(e => !e.current_task)
    },
  },
  modules: {

  }
})
