export default class Token {

  static get () {
    return Token.key
  }

  static set (key) {
    Token.key = key
  }

  static exist () {
    return Token.get()
  }

  static save (remember) {
    const type = remember ? 'local' : 'session'
    window[`${type}Storage`].setItem('token', Token.get())
  }

  static load () {
    if (typeof (sessionStorage) === 'undefined') {
      return
    }

    let token = sessionStorage.getItem('token')

    if (!token) {
      token = localStorage.getItem('token')
    }

    Token.set(token)
  }

  static add (params) {
    params = params || {}
    if (Token.exist()) {
      params.token = Token.get()
    }
    return params
  }

  static delete () {
    if (typeof (sessionStorage) === 'undefined') {
      return
    }
    Token.set(null)
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
  }

}
