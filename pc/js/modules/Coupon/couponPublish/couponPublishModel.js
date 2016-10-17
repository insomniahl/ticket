/**
 * Created by insomniahl on 16/7/28.
 */
define(["jquery", "backbone"], function ($, Backbone) {
    var urlRoot = "http://tk.jetcloudtech.com";
    var model = Backbone.Model.extend({
        //查询所有优惠券
        getCouponAll: function () {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/publishCouponComposite/",
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
                    that.trigger("getCouponResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "获取数据失败,请重试!"
                    };
                    that.trigger("getCouponResult", result);
                }
            })
        },
        //更新优惠券
        updateCoupon: function (data) {
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
                    that.trigger("updateCouponResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "更新状态失败,请重试!"
                    };
                    that.trigger("updateCouponResult", result);
                }
            })
        },
        //保存优惠券
        saveCoupon: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "post",
                url: urlRoot + "/addCoupon/",
                data: JSON.stringify(data),
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
                    that.trigger("saveCouponResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "保存数据失败,请重试!"
                    };
                    that.trigger("saveCouponResult", result);
                }
            })
        },
        //查询添加的优惠券是否有效
        getCouponNo: function (data) {
            var that = this, result = {};
            $.ajax({
                type: "get",
                url: urlRoot + "/coupons/?flag=0&publish_coupon=" + data,
                success: function (res) {
                    if (res) {
                        result = {
                            errorNo: 0,
                            data:res
                        };
                    } else {
                        result = {
                            errorNo: 1,
                            errorInfo: "查询数据失败,请重试!"
                        };
                    }
                    that.trigger("couponNoResult", result);
                },
                error: function (err) {
                    result = {
                        errorNo: -1,
                        errorInfo: "查询数据失败,请重试!"
                    };
                    that.trigger("couponNoResult", result);
                }
            })
        }
    });

    return model;
});