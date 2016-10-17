/**
 * Created by insomniahl on 16/7/28.
 */
define(["jquery", "backbone"], function ($, Backbone) {
    var urlRoot = "http://tk.jetcloudtech.com";
    var model = Backbone.Model.extend({
        //保存场馆
        saveStadium: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "post",
                url: urlRoot + "/addSite/",
                //cache: false,
                processData: false,
                contentType: false,
                data: data,
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            errorInfo: "保存数据成功"
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "保存数据失败,请重试!"
                        };
                    }
                    that.trigger("saveResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "保存数据失败,请重试!"
                    };
                    that.trigger("saveResult", result);
                }
            })
        }
    });

    return model;
});