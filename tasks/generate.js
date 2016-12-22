const gulp = require('gulp');
const fs = require('fs');
const _ = require('lodash');
const pluralize = require('pluralize');

// gulp api --name me
gulp.task('api', function(callback) {

  let name =  process.argv[4];

  let options = {
    name,
    path: `server/api/${name}`,
    upperName: _.upperFirst(name),
    plurial: pluralize(name)
  }

  let {path, upperName} = options;

  fs.mkdirSync(path);

  for (let file of ['controller', 'model', 'router', 'schema', 'spec']) {
    let tpl = require(`./tpl/entity.${file}`)(options);
    fs.writeFileSync(`${path}/${name}.${file}.js`, tpl);
  }

});
