// eslint-disable-next-line
import Interceptors from '../core/interceptors'
import Vuelidate from 'vuelidate'
import Vue from 'vue'

import * as filters from '../filters'
import * as directives from '../directives'

// import ElementUI from 'element-ui'
// locale from 'element-ui/lib/locale/lang/en'

// ue.use(ElementUI, {locale})
Vue.use(Vuelidate)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
