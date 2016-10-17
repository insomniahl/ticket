/**
 * Created by insomniahl on 16/7/28.
 */
define(['txt!../../Coupon/couponPublish/couponPublish.html',
        '../../Coupon/couponPublish/couponPublishModel',
        '../../Show/showList/showListModel',
        'backbone'],
    function (Template, couponPublishModel, showListModel, backbone) {
        var view = backbone.View.extend({
            initialize: function () {
                this.couponPublishModel = new couponPublishModel();
                this.showListModel = new showListModel();
                this.listenTo(this.couponPublishModel, "getCouponResult", this.getCouponResult);
                this.listenTo(this.couponPublishModel, "saveCouponResult", this.saveCouponResult);
                this.listenTo(this.couponPublishModel, "updateCouponResult", this.updateCouponResult);
                this.listenTo(this.couponPublishModel, "couponNoResult", this.couponNoResult);
                this.listenTo(this.showListModel, "getShowListResult", this.getShowListResult);
            },
            render: function () {
                var _this = this, $el = $(this.el);
                $el.html(Template);
                $el.find(".all_coupon_table").bootstrapTable({
                    columns: [
                        {field: "action_name", title: '演出名称'},
                        {field: "coupon_price", title: '面额'},
                        {field: "volume", title: '总数量'},
                        {field: "use_volume", title: '已使用数量'},
                        {field: "nouse_volume", title: '未使用数量'},
                        {
                            field: "date_joined", title: '创建时间', formatter: function (value) {
                            return value.replace(/T/gi, " ").substring(0, 19);
                        }
                        },
                        {
                            field: 'coupon_no', title: '优惠券编号', formatter: function (value) {
                            return "<a href='javascript:void 0;' class='checkCoupon'>点击查看</a>";
                        }, events: {
                            "click .checkCoupon": function (e, value, row, index) {
                                _this.couponPublishModel.getCouponNo(row["id"]);
                            }
                        }
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 10
                });
                $el.find(".coupon_list").bootstrapTable({
                    columns: [
                        {field: "coupon_no", title: '编号'},
                        {field: "coupon_price", title: '面额'},
                        {
                            field: "state", title: '状态', formatter: function (value) {
                            return value == 0 ? "未使用" : "已使用";
                        }
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 10
                });
                this.couponPublishModel.getCouponAll();
                this.showListModel.getShowList();
                return this;
            },
            getCouponResult: function (result) {
                if (result.errorNo == 0) {
                    $(".all_coupon_table").bootstrapTable("load", result.data);
                } else {
                    alert(result.errorInfo);
                }
            },
            //更新区域状态
            updateCouponResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data;
                    $(".all_coupon_table").bootstrapTable("updateCell", {
                        index: data.index,
                        field: "state",
                        value: data.state
                    });
                } else {
                    alert(result.errorInfo);
                }
            },
            getShowListResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data, opt = "";
                    for (var i = 0; i < data.length; i++) {
                        opt += "<option value='" + data[i]["pk"] + "'>" + data[i]["name"] + "</option>";
                    }
                    $("#newCouponModal .show_name").html(opt);
                } else {
                    alert(result.errorInfo);
                }
            },
            events: {
                "click .coupon_refresh": "couponRefresh",
                "click .save_coupon": "saveCoupon"
            },
            //刷新
            couponRefresh: function () {
                this.couponPublishModel.getCouponAll();
            },
            //保存优惠券
            saveCoupon: function () {
                var data = {
                    action: $("#newCouponModal .show_name :selected").val(),
                    volume: $("#newCouponModal .volume").val(),
                    price: $("#newCouponModal .price").val()
                };
                if (data.action && data.volume && data.price) {
                    this.couponPublishModel.saveCoupon(data);
                } else {
                    alert("请输入所有数据");
                }
            },
            saveCouponResult: function (result) {
                if (result.errorNo == 0) {
                    alert(result.errorInfo);
                    $("#newCouponModal").modal("hide");
                    this.couponRefresh();
                } else {
                    alert(result.errorInfo);
                }
            },
            couponNoResult: function (result) {
                if (result.errorNo == 0) {
                    $(".coupon_list").bootstrapTable("load", result.data);
                    $("#couponNoModal").modal("show");
                }

            }
        });

        return view;
    });