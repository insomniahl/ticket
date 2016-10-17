/**
 * Created by insomniahl on 16/7/28.
 */
define(["jquery", "backbone"], function ($, Backbone) {
    var urlRoot = "http://tk.jetcloudtech.com";
    var model = Backbone.Model.extend({
        //获取所有场馆
        getAll: function () {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/sites.json",
                success: function (res) {
                    if (res) {
                        result = {
                            errorNo: 0,
                            data: res
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            data: "获取数据失败,请重试!"
                        };
                    }
                    that.trigger("getAllResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getAllResult", result);
                }
            })
        },
        updateStadium: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "post",
                url: urlRoot + "/addSite/",
                processData: false,
                contentType: false,
                data: data,
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            errorInfo: "更新数据成功"
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "更新数据失败,请重试!"
                        };
                    }
                    that.trigger("updateResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "更新数据失败,请重试!"
                    };
                    that.trigger("updateResult", result);
                }
            })
        }
        //更新场馆状态
        //updateStadium: function (data) {
        //    var that = this, result = {};
        //    $.ajax({
        //        type: "put",
        //        url: urlRoot + "/updateState/",
        //        data: JSON.stringify(data),
        //        success: function (res) {
        //            if (res["status"] == "success") {
        //                result = {
        //                    errorNo: 0,
        //                    data: data
        //                };
        //            } else {
        //                result = {
        //                    errorNo: 1,
        //                    errorInfo: "更新状态失败,请重试!"
        //                };
        //            }
        //            that.trigger("updateStadiumResult", result);
        //        },
        //        error: function (err) {
        //            result = {
        //                errorNo: -1,
        //                errorInfo: "更新数据失败,请重试!"
        //            };
        //            that.trigger("updateStadiumResult", result);
        //        }
        //    })
        //}
    });

    return model;
});