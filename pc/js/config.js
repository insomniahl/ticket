/**
 * Created by insomniahl on 16/7/27.
 */
define(['backbone'], function (Backbone) {
    var proxiedSync = Backbone.sync;
    Backbone.sync = function (method, model, options) {
        options || (options = {});
        var newMethod = method;
        if (!options.crossDomain) {
            options.crossDomain = true;
        }

        if (!options.xhrFields) {
            options.xhrFields = {withCredentials: false};
        }
        if (options.method === "update") {
            newMethod = "update";
        }
        return proxiedSync(newMethod, model, options);
    }
});
