/**
 * Created by insomniahl on 16/9/1.
 */
define(["jquery", "backbone"], function ($, Backbone) {
    var urlRoot = "http://tk.jetcloudtech.com";
    var model = Backbone.Model.extend({
        //获取所有活动
        getShowList: function () {
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
                    that.trigger("getShowListResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getShowListResult", result);
                }
            })
        },
        //获取区域价格
        getPriceArea: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/ticketprices/",
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
                    that.trigger("getPriceArea", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getPriceArea", result);
                }
            })
        },
        //保存活动
        saveShow: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "post",
                url: urlRoot + "/addAction/",
                processData: false,
                contentType: false,
                data: data,
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            errorInfo: "添加数据成功"
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "保存数据失败,请重试!"
                        };
                    }
                    that.trigger("saveShowResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "保存数据失败,请重试!"
                    };
                    that.trigger("saveShowResult", result);
                }
            })
        },
        updateInfoShow: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "post",
                url: urlRoot + "/addAction/",
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
        },
        //获取活动场次
        getShowInfo: function (data) {
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
                    that.trigger("getShowInfoResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getShowInfoResult", result);
                }
            })
        },
        //保存活动场次
        savearrange: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "post",
                url: urlRoot + "/addActionNum/",
                data: JSON.stringify(data),
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            errorInfo: "保存成功!"
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "保存失败,请重试!"
                        };
                    }
                    that.trigger("arrangeResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "保存失败,请重试!"
                    };
                    that.trigger("arrangeResult", result);
                }
            })
        },
        //更新活动场次状态
        updateArrange: function (data) {
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
                    that.trigger("updateArrangeResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "更新状态失败,请重试!"
                    };
                    that.trigger("updateArrangeResult", result);
                }
            })
        },
        //更新活动状态
        updateShow: function (data, updateDate) {
            var that = this, result = {};
            $.ajax({
                type: "post",
                url: urlRoot + "/addAction/",
                data: data,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res["status"] == "success") {
                        result = {
                            errorNo: 0,
                            data: updateDate
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "更新状态失败,请重试!"
                        };
                    }
                    that.trigger("updateShowResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "更新状态失败,请重试!"
                    };
                    that.trigger("updateShowResult", result);
                }
            })
        }
    });

    return model;
});