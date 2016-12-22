const mongoose = require("mongoose");

module.exports = function(name, sub, app) {

    if (!app) {
        app = sub;
        sub = name;
    }
    const lower = sub.toLowerCase();
    const controller = require(`../api/${lower}/${lower}.controller`);
    let instance = new controller(app.get(`Model.${name}`));

    instance.app = app;
    app[sub] = instance;
    app.set(`Controller.${sub}`, instance);

    return instance;
}
