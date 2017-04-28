import Vuex from 'vuex'
import me from './modules/me'

const store = new Vuex.Store({
  modules: {
    me
  }
})

export default store
