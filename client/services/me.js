import Http from 'axios'
import Token from '../core/token'
import store from '../store'

class Me {

  constructor () {
    this.uri = '/api/me'
  }

  _tokenSave (res) {
    const {token} = res.data
    Token.set(token)
    Token.save(token)
  }

  login ({username, password, platform, remember}) {
    if (platform) {
      return this.loginTo(platform)
    }
    return Http.post(`${this.uri}/login`, {username, password})
      .then(this._tokenSave)
  }

  logout () {
    Token.delete()
    store.commit('set', {})
  }

  loginTo (platform) {
    return new Promise((resolve, reject) => {
      let windowPopup
      const listener = event => {
        if (this.uri !== event.origin + '/') reject(new Error('Not same origin'))
        resolve({token: event.data})
        windowPopup.close()
      }
      window.removeEventListener('message', listener, true)
      window.addEventListener('message', listener, false)
      windowPopup = window.open(`${this.uri}/login/${platform}`, platform, 'height=400,width=500')
    }).then(this._tokenSave)
  }

  me () {
    return Http.get(this.uri)
      .then(res => res.data)
      .then(d => {
        store.commit('set', d)
        return d
      })
  }

  forgottenPassword (email) {
    return Http.post(`${this.uri}/forgotten-password`, {email})
      .then(res => res.data)
  }

  resetPassword (password, key) {
    return Http.post(`${this.uri}/reset-password`, {password, key})
      .then(res => res.data)
  }

  update (data) {
    return Http.put(this.uri, data)
      .then(res => res.data)
      .then(d => {
        store.commit('set', d)
        return d
      })
  }

  loggedIn () {
    return store.state.me.data._id
  }

}

export default new Me()
