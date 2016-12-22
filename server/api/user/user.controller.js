const Controller = require("../../core/Controller");

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


    permission(req) {
       return {
          '*': function(entity, user) {
             return true;
          }
       }
    }

}

module.exports = UserController;
