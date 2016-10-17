/**
 * Created by insomniahl on 16/7/28.
 */
define(["jquery", "backbone"], function ($, Backbone) {
    var urlRoot = "http://tk.jetcloudtech.com";
    var model = Backbone.Model.extend({
        getUser: function () {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/userprofiles.json/",
                success: function (res) {
                    if (res) {
                        result = {
                            errorNo: 0,
                            data: res
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "获取数据失败,请重试!"
                        };
                    }
                    that.trigger("getUserResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getUserResult", result);
                }
            })
        }
    });

    return model;
});