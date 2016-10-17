/**
 * Created by insomniahl on 16/7/27.
 */
define(["jquery", "backbone"], function ($, Backbone) {
    var urlRoot = "http://tk.jetcloudtech.com";
    var DatalManagerModel = Backbone.Model.extend({
        //查询已购买的订单
        checkOrder: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/BackendOrder/",
                data: $.param(data),
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
                    that.trigger("orderResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("orderResult", result);
                }
            })
        },
        //获取活动场次
        showTime: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/actionnums/",
                data: $.param(data),
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
                    that.trigger("getShowTimeResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getShowTimeResult", result);
                }
            })
        }
    });

    return DatalManagerModel;
});