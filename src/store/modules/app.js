const app = {
  state: {
    needRefresh: false
  },

  mutations: {
    UPDATE_NEED_REFRESH: (state, payload) => {
      state.needRefresh = payload
    }
  },

  actions: {
    updateNeedRefesh: ({ commit }, payload) => {
      commit('UPDATE_NEED_REFRESH', payload)
    }
  }
}

export default app
