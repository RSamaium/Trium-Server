import Http from 'axios'
import store from '../store'

class User {

  constructor () {
    this.uri = '/api/users'
  }

  create (data) {
    return Http.post(this.uri, data)
      .then(res => res.data)
  }

}

export default new User()
