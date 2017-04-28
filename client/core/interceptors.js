import Token from '../core/token'
import Http from 'axios'

Token.load()

Http.interceptors.request.use(function (config) {
  if (Token.exist()) {
    config.headers['x-access-token'] = Token.get()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default {}
