const config = require('../config');
const mailgun = require('mailgun-js')(config.mailgun);
const fs = require('fs');
const {mjml2html} = require('mjml');
const htmlToText = require('html-to-text');
const pug = require('pug');
const _ = require('lodash');
const moment = require('moment');
const Languages = require('languages-js');

module.exports = {
  mjml2html(template, data, language) {
    return new Promise(function(resolv, reject) {
      const emailPath = `${__dirname}/../templates/email`;
      fs.readFile(`${emailPath}/${template}`, 'utf-8', (err, file) => {
        if (err) {
          reject(err);
          return;
        }
        const fn = pug.compile(file, {
          basedir: emailPath,
          filename: template
        });
        data = _.merge({
          name: config.name,
          author: config.author,
          year: moment().year(),
          url: config.url
        }, data);
        const output = mjml2html(Languages.render(fn(data), {}, language))
        if (output.errors.length > 0) {
          reject(output.errors)
          return;
        }
        resolv(output.html);
      });
    });
  },
  send(params, language) {

      const mailgunPromise = () => {
        if (config.get('email', 'disable') === true) {
          return Promise.resolve();
        }
        return new Promise(function(resolv, reject) {
            if (params.html) {
              params.text = htmlToText.fromString(params.html);
            }
            mailgun.messages().send(params, (error, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolv(body);
            });
        });
      }
      return new Promise((resolv, reject) =>  {

          if (!params.from) params.from = config.mailgun.from;
          if (!params.to) params.to = config.mailgun.to;

          if (params.template) {
            if (!params.template.name) {
              params.template = {
                name: params.template
              }
            }
            let {name, data} = params.template;
            return this.mjml2html(name, data, language).then(html => {
              params.html = html;
              delete params.template;
              resolv();
            }).catch(reject)
          }
          resolv();

      }).then(mailgunPromise)
  }
}
