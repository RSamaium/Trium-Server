const validator = require('validator');
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const error = require('../errors');

class Controller {

    constructor(entity) {
        this.entity = entity;
        this.permissionFilter = {};
        this.name = this.entity.modelName.toLowerCase();
    }

    param(req, res, next, id) {
        var self = this;

        this.getById(req, id)
            .then(next)
            .catch(function(err) {
                next(err);
            });
    }


    getById(req, id) {
        var self = this;
        return new Promise(function(resolv, reject) {

                var query;

                if (!validator.isMongoId(id)) {
                   if (self.slug) {
                     const obj = {
                         [self.slug()]: id
                     }
                     query = self.entity.findOne(obj);
                   }
                   else {
                      reject(new error.BadRequestError("ID is invalid"));
                   }
                }
                else {
                  query = self.entity.findById(id);
                }

                query = self.getEntityParent(req, query);

                if (self.query) {
                    query = self.query(req, query);
                }

                if (self.select) {
                    query = query.select(self.select(req));
                }

                query = self._populate(req, query);

                query.exec(function(err, entity) {
                    if (!entity) {
                      reject(new error.NotFoundError("Resource not found"));
                      return;
                    }
                    if (err) {
                       reject(new Error(err));
                       return;
                    }
                    resolv(entity);
                });

         }) .then(function(entity) {

                req.entity = entity;

                if (!req.parents) req.parents = {};
                req.parents[self.name] = entity;

                req.parent = {
                    name: self.name,
                    id: entity._id
                };
            })
            .then(function() {
                return self._permission(req);
            });

    }


    _permission(req, all) {
        var permission, method, fnPermission, self = this;

        function callPermission(name) {

            return new Promise(function(resolv, reject) {

                function cb(message) {
                    var isArray = _.isArray(message);
                    if (message !== true && !isArray) {
                        reject(new error.NoPermissionError(message));
                    }
                    else {
                        if (isArray) {
                            self.permissionFilter[name] = message;
                        }
                        resolv();
                    }
                }

                if (permission[name]) {
                    fnPermission = permission[name](req.entity, req.user, cb);
                    if (!_.isUndefined(fnPermission)) {
                        cb(fnPermission);
                    }
                }
                else {
                    resolv();
                }

            });

        }

        var p = Promise.resolve();

        if (self.permission) {
            permission = self.permission(req);
            method = all ? "QUERY" : req.method;

            return p.then(function() {
                return  callPermission("*");
            }).then(function() {
                return  callPermission(method);
            });

        }
        else {
            return p;
        }
    }

    _populate(req, query) {
        if (this.populate) {
            let populate = this.populate(req);
            if (!populate.select) {
                populate.select = "-" + this.name;
            }
            query = query.populate(populate);
        }
        return query;
    }

    getEntity() {
        return this.entity;
    }

    getEntityParent(req, query) {
        if (req.parent) {
            query = query.where(req.parent.name).equals(req.parent.id);
        }
        return query;
    }

    response(req, res, next) {

    }

    get(req, res, next) {
      return this._response(req, req.entity, 'Get').then((obj) => {
        if (this.virtual) {
          let virtual = this.virtual(req);
          obj = _.merge(obj, virtual);
        }
        res.json(obj);
      }).catch(next);
    }

    _response(req, data, type) {
      return new Promise((resolv, reject) => {
        if (this['response' + type]) {
            let result = this['response' + type](req, data, resolv, reject);
            if (result) {
              resolv(result);
            }
        }
        else {
           resolv(data);
        }
      });
    }

    _queryAll(req, query) {

        if (this.queryAll) {
            query = this.queryAll(req, query);
        }
        if (this.filters) {
            let filters = this.filters(req);
            for (let f of filters) {
              if (req.query[f]) {
                  query = query.where(f).equals(req.query[f]);
              }
            }

        }
        if (this.search) {
            let searchs = this.search(req);
            for (let q in searchs) {
                let valSearch = req.query[q];
                if (valSearch) query = query
                    .where(searchs[q])
                    .regex(RegExp(validator.blacklist(valSearch, '\\[\\]'), "g"));
            }
        }
        return query;
    }

    getAll(req, res, next) {

        this._dataPage = {}

        var self = this, _data = {};

        var p = new Promise(function(resolv, reject) {

            if (self.count && self.count(req)) {
                self.entity.count(function(err, nb) {
                    if (err) reject(err);
                    else {
                        resolv(nb);
                    }
                });
                return;
            }

            var query = self.entity.find();

            query = self.getEntityParent(req, query);

            query = self._queryAll(req, query);

            query = self._populate(req, query);

            var _query = ["select", "sort", "limit", "skip"],
                q;

            if (self.page && self.limit) {
                let currentPage = self.page(req);
                if (currentPage !== undefined) {
                    let limit = self.limit(req);
                    let page = (currentPage-1) * limit;
                    query = query.skip(page);
                    self._dataPage = {
                        currentPage: +currentPage,
                        perPage: limit
                    };
                }
            }

            for (var i=0 ; i < _query.length ; i++) {
                q = _query[i];
                if (self[q]) {
                    query = query[q](self[q](req));
                }
            }

            query.exec(function(err, data) {
                _data = data;
                if (err) reject(err);
                else resolv(data);
            });

        });

          p  .then(function(data) {
               return self._permission(req, true);
            })
            .then(function() {
               return self._response(req, _data, 'Query');
            })
            .then(function(d) {
                _data = d;
                if (!self._dataPage.currentPage) {
                    res.json(_data);
                }
                return _data;
            })
            .then(function() {
                return self.infoPage(req, _data);
            })
            .then(function() {
                if (self._dataPage.currentPage) res.json(_data);
            })
            .catch(function(err) {
                next(err);
            });

    }

    infoPage(req, data) {
        var self = this;
        this._dataPage.data = data;
        return new Promise(function(resolv, reject) {

            var query = self.entity;

            query = self._queryAll(req, query);

            query.count(function(err, nb) {
                if (err) reject(err);
                else {
                    self._dataPage.totalData = nb;
                    self._dataPage.totalPage = Math.ceil(nb /  self._dataPage.perPage)
                    resolv(self._dataPage);
                }
            });
        })
    }

    create(req, res, next) {
        req.entity = new this.entity();

        req.action = "create";
        if (req.parent) {
            req.entity[req.parent.name] = req.parent.id;
        }

        this._permission(req).then(() => {
          this.update(req, res, next);
        }).catch(next);

    }

    update(req, res, next) {

        var self  = this;

        var p = new Promise(function(resolv, reject) {

            if (!req.action) req.action = "update";

            var schema = req.entity._schema(),
                fileInfo,
                modePermission;

            function attrIsFile(key) {
              /*if (_.isArray(schema[key]) && schema[key][0].type && schema[key][0].size) {
                  return true;
              } */
              if ( schema[key].type && schema[key].size) {
                  return true;
              }
              return false;
            }

            function getFileInfo(fileInfo, key) {
                if (req.action == "update" && self.uploadFields) {
                    self.deleteFile(req, key);
                }
                return {
                    name: fileInfo.filename,
                    type: fileInfo.mimetype,
                    original: fileInfo.originalname,
                    size: fileInfo.size
                }
            }

            for (var key in schema) {

                let val =  self.parameter
                    ? self.parameter(req, key, req.body[key], req.action)
                    : req.body[key];

                if (req.files && req.files[key]) {
                    fileInfo = req.files[key];
                    if (schema[key] instanceof Array) {
                        for (let data of req.files[key]) {
                            val = _.concat(req.entity[key], getFileInfo(data, key));
                        }
                    }
                    else {
                        val = getFileInfo(fileInfo[0], key);
                    }
                }
                else if (attrIsFile(key)) {
                    continue;
                }

                modePermission =  req.action == "update" ? "PUT" : "POST";

                if (self.permissionFilter[modePermission] && _.indexOf(self.permissionFilter[modePermission], key) != -1) {
                    continue;
                }

                if (val !== undefined) {
                    if (!schema[key].type && _.isString(val)) {
                        val = JSON.parse(val);
                    }
                    req.entity[key] = val;
                }
                else {
                    delete req.entity[key];
                }

            }

            req.entity.save(function(err) {
                if (err) reject(err);
                resolv(req.entity);
            });

         });

        p.then(function() {
            let ret = {}
            if (self.save) {
                ret = self.save(req.entity, req, res, next);
            }
            if (ret && ret.then) {
                ret.then((ret) => {
                    if (ret) {
                        res.json(ret)
                    }
                    else {
                        res.json(req.entity)
                    }
                })
            }
            else {
                res.json(req.entity)
            }
        })
        .catch(function(err) {
            next(err);
        });
    }

    delete(req, res, next) {
        var self = this;
        req.entity.remove(function(err) {
            if (err) next(err);
            else {
                if (self.uploadFields) {
                    self.deleteFile(req, self.uploadFields());
                }
                res.status(204).end();
            }
        });

    }

    deleteFile(req, fields) {

        if (!_.isArray(fields)) {
            fields = [{
                name: fields
            }];
        }

        function remove(path) {
            return new Promise(function(resolv, reject) {

                fs.exists(path, function(exists) {

                    if (exists) {
                        fs.unlink(path, function(err) {
                            if (err) reject(err);
                            else resolv();
                        });
                    }
                    else {
                        resolv();
                    }

                });

            });
        }

        for (let field of fields) {
            if (req.entity[field.name]) {
                let file = path.join(__dirname, "../uploads/" + field.name + "/" + req.entity[field.name].name);
                remove(file);
            }

        }

    }

    stat(req, res) {

    }


}

module.exports = Controller;
