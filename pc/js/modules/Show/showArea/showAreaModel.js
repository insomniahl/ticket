/**
 * Created by insomniahl on 16/9/1.
 */
define(["jquery", "backbone"], function ($, Backbone) {
    var urlRoot = "http://tk.jetcloudtech.com";
    var model = Backbone.Model.extend({
        //获取所有活动
        getAllShow: function () {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/actions.json",
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
                    that.trigger("getShow", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getShow", result);
                }
            })
        },
        //获取活动区域
        getShowArea: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/areas.json/",
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
                    that.trigger("getShowArea", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getShowArea", result);
                }
            })
        },
        //更新区域
        updateArea: function (data) {
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
                    that.trigger("updateAreaResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "更新状态失败,请重试!"
                    };
                    that.trigger("updateAreaResult", result);
                }
            })
        },
        //保存区域
        saveArea: function(data){
            var that = this, result = {};
            $.ajax({
                type: "post",
                url: urlRoot + "/addArea/",
                data: JSON.stringify(data),
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            errorInfo: "保存区域信息成功"
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "保存区域信息失败,请重试!"
                        };
                    }
                    that.trigger("saveAreaResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "保存区域信息失败,请重试!"
                    };
                    that.trigger("saveAreaResult", result);
                }
            })
        },
        //更新编辑后的区域
        updateAreaByEdit: function(data){
            var that = this, result = {};
            $.ajax({
                type: "put",
                url: urlRoot + "/addArea/",
                data: JSON.stringify(data),
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            errorInfo: "保存区域信息成功"
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "保存区域信息失败,请重试!"
                        };
                    }
                    that.trigger("saveAreaResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "保存区域信息失败,请重试!"
                    };
                    that.trigger("saveAreaResult", result);
                }
            })
        }
    });

    return model;
});