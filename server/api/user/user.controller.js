const Controller = require("../../core/Controller");
const jwt    = require('jsonwebtoken');
const Email = require('../../services/email');
const config = require('../../config');
const error = require('../../errors');

class UserController extends Controller {

    select() {
         return "-password";
    }

    queryAll(req, query) {
        return query;
    }

    search(req) {
        return {
            // query : field
            "search": "username"
        }
    }

    filters() {
        return ["enabled"];
    }

    limit() {
        return 30;
    }

    page(req) {
        return req.query.page;
    }

    save(user) {
      let data = {}
      if (config.userActivation == 'email') {
        let key = jwt.sign({ email: user.email, _id: user._id }, config.get('token', 'enable'), { expiresIn: '2h' })
        data.activation = true;
        data.url = `${config.url}/enable?key=${key}`
      }
      else {
        data.url = `${config.url}/login`
      }
      Email.send({
        template: {
          name: 'welcome.pug',
          data
        },
        to: user.email,
        subject: `${config.name} - ${'welcome'.t()}`
      })
    }

    permission(req) {
       return {
          '*': function(entity, user) {
              if (req.method == 'POST') {
                return true;
              }
              return false;
          },
          POST: function(entity, user) {
            return ['enabled', 'registered'];
          }
       }
    }

}

module.exports = UserController;
