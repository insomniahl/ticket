/**
 * Created by insomniahl on 16/7/28.
 */
define(["jquery", "backbone"], function ($, Backbone) {
    var urlRoot = "http://tk.jetcloudtech.com";
    var model = Backbone.Model.extend({
        getManager: function () {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/actions/",
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
                    that.trigger("getManagerResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getManagerResult", result);
                }
            })
        },
        updateManager: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "put",
                url: urlRoot + "/updateState/",
                data: JSON.stringify(data),
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            data: data
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "更新状态失败,请重试!"
                        };
                    }
                    that.trigger("updateManagerResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "更新数据失败,请重试!"
                    };
                    that.trigger("updateManagerResult", result);
                }
            })
        },
        saveManager: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "put",
                url: urlRoot + "/updateState/",
                data: JSON.stringify(data),
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            errorInfo: "保存数据成功,请重试!"
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "保存数据失败,请重试!"
                        };
                    }
                    that.trigger("saveManagerResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "保存数据失败,请重试!"
                    };
                    that.trigger("saveManagerResult", result);
                }
            })
        }
    });

    return model;
});