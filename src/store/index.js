import Vue from 'vue'
import Vuex from 'vuex'
import startup from '../api/startup'
import list from '../api/list'
import put from '../api/put'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: {
      username: null,
      path: null,
      key: null
    },
    entries: null,
    msg: '',
    entryLoaded: false,
    imageLoading: false
  },
  actions: {
    initPage ({ commit }, { username, path, key }) {
      commit('setPage', { username: username, path: path, key: key })
    },
    checkValidity ({ state, commit, dispatch }) {
      startup(state.page.key, function (data) {
        commit('setUserName', data.UserName)
        commit('setPath', data.LeftPath + '/instanemaki')
        commit('setMsg', 'Loading files...')
        dispatch('loadEntries')
      }, function (err) {
        commit('setMsg', 'An error occurred. Please try again.')
        alert(err)
      })
    },
    loadEntries ({ state, commit }) {
      list(state.page.key, state.page.path, function (entries) {
        // console.log(entries)
        commit('setMsg', 'Load completed.')
        commit('setEntries', entries)
        commit('setEntryLoaded', true)
        if (state.entries.length > 0) commit('setImageLoading', true)
      }, function (err) {
        commit('setMsg', 'An error occurred. Please try again.')
        commit('setEntries', null)
        commit('setEntryLoaded', false)
        alert(err)
      })
    },
    submitImages ({ state, dispatch }, fileList) {
      put(state.page.key, state.page.path, fileList, function () {
        // console.log('put succeeded')
        dispatch('loadEntries')
      }, function (err) {
        alert(err)
      })
    }
  },
  mutations: {
    setPage (state, { username, path, key }) {
      state.page.username = username
      state.page.path = path
      state.page.key = key
    },
    setUserName (state, username) {
      state.page.username = username
    },
    setPath (state, path) {
      state.page.path = path
    },
    setKey (state, key) {
      state.page.key = key
    },
    setMsg (state, msg) {
      state.msg = msg
    },
    setEntryLoaded (state, entryLoaded) {
      state.entryLoaded = entryLoaded
    },
    setEntries (state, entries) {
      state.entries = entries
    },
    setImageLoading (state, imageLoading) {
      state.imageLoading = imageLoading
    }
  }
})
