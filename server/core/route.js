const multer  = require('multer');
const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const passport = require("passport");

module.exports = function(router, entity, nameId, middlewares) {

    var routesMiddleware;

    if (!entity) {
      entity = router.entity;
      nameId = router.nameId;
      middlewares = router.middlewares;
      routesMiddleware = router.routesMiddleware;
      router = router.router;
    }

    middlewares = middlewares || [];
    routesMiddleware = routesMiddleware || [];

    function fieldExist(file, cb) {
        var fields = entity.uploadFields();
        if (!_.find(fields, { name : file.fieldname })) {
            cb(new Error("field not exists"));
            return false;
        }
        return true;
    }

    function initUpload() {

        var storage = multer.diskStorage({
              destination: function (req, file, cb) {

                  if (!fieldExist(file, cb)) return;

                  var dest = path.join(__dirname, '../uploads/' + file.fieldname),
                      ret;

                  if (entity.uploadStorage) {
                      ret = entity.uploadStorage(req, file, cb);
                      if (!ret) {
                          return;
                      }
                      if (ret.dest) {
                          dest = ret.dest;
                      }
                  }

                  fs.exists(dest, function(exists) {
                      if (exists) {
                          cb(null, dest);
                      }
                      else {
                          fs.mkdir(dest, function(err) {
                                if (err) {
                                    cb(err);
                                }
                                else {
                                    cb(null, dest);
                                }

                          });
                      }
                  })

              },
              filename: function (req, file, cb) {
                    if (!fieldExist(file, cb)) return;
                    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
              }
        });

        var options = {
            storage: storage
        };

        if (entity.uploadFilter) {
            options.fileFilter = function(req, file, cb) {

                var ret = entity.uploadFilter(req, file, cb),
                    mimetype = [];

                if (ret) {

                    if (!fieldExist(file, cb)) return;

                    ret = ret[file.fieldname];

                    if (!ret) {
                        cb(null, true);
                        return;
                    }

                    var _default = {

                        "images": ["image/jpeg", "image/gif", "image/jpg", "image/png"],
                        "videos": ["video/mpeg", "video/mp4", "video/webm", "video/ogv", "application/ogg"],
                        "audios": ["audio/mpeg", "audio/mpeg3", "audio/x-mpeg-3", "application/ogg"]

                    }

                    for (var t in _default) {

                        if (!ret[t]) continue;

                        if (_.isString(ret[t])) {
                            ret[t] = [ret[t]];
                        }

                        if (ret[t][0] == "*") {
                            ret[t].splice(0, 1);
                            ret[t] = ret[t].concat(_default[t]);
                        }

                        if (ret[t]) {
                            mimetype = mimetype.concat(ret[t]);
                        }
                    }

                    if (mimetype.length > 0) {
                        if (mimetype.indexOf(file.mimetype) != -1) {
                            cb(null, true);
                        }
                        else {
                            cb(new Error('This file is not allowed'));
                        }
                    }


                }


            }
        }

        if (entity.uploadLimits) {
            options.limits = entity.uploadLimits();
        }

        var upload = multer(options);

        if (entity.uploadFields) {
            upload = upload.fields(entity.uploadFields());
            middlewares.push(function (req, res, next) {
                upload(req, res, function (err) {
                    if (err) {
                      next(err);
                      return
                    }
                    next();
                });
            });
        }
    }

    function call(route, method, action, middlewares) {
        var m = middlewares.concat(entity[action].bind(entity));
        return route[method].apply(route, m);
    }

    function routes(router) {

        var customId = _.isFunction(nameId);

        router.param(nameId, entity.param.bind(entity));

        var route = router.route('/');

        if (customId) {
           route.all(function(req, res, next) {
               entity.param(req, res, next, nameId(req));
           });
        }

        for (let routeMiddleware of routesMiddleware) {
          routeMiddleware(router);
        }

        if (!customId) call(route, "get", "getAll", middlewares);
        call(route, "post", "create", middlewares);

        if (!customId) route = router.route('/:' + nameId);

        call(route, "get", "get", middlewares);
        call(route, "put", "update", middlewares);
        call(route, "delete", "delete", middlewares);

        return route;
    }

    initUpload();

    return routes(router);


}
