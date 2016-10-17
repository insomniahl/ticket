/**
 * Created by insomniahl on 16/7/27.
 */
define(['txt!../DataManager/dataManager.html',
        '../DataManager/dataManagerModel',
        '../Show/showArea/showAreaModel',
        'backbone'],
    function (Template, dataManagerModel, showAreaModel, backbone) {
        var view = Backbone.View.extend({
            initialize: function () {
                this.dataManagerModel = new dataManagerModel;
                this.showAreaModel = new showAreaModel;
                this.listenTo(this.showAreaModel, "getShow", this.showResult);
                this.listenTo(this.dataManagerModel, "orderResult", this.orderResult);
                this.listenTo(this.dataManagerModel, "getShowTimeResult", this.showTimeResult);
            },
            render: function () {
                var $el = $(this.el), _this = this;
                $el.html(Template);
                $el.find(".order_table").bootstrapTable({
                    columns: [
                        {field: "order_no", title: '订单号'},
                        {
                            field: "type", title: '类型', formatter: function (value) {
                            return value == 0 ? "优惠券" : "演出票";
                        }
                        },
                        {field: "date_joined", title: '支付时间'},
                        {field: "real_price", title: '支付金额'},
                        {
                            field: "pay_type", title: '支付方式', formatter: function (value) {
                            value = value.replace(/,/g, "");
                            var data = {
                                "0": "微信",
                                "1": "优惠券",
                                "00": "微信",
                                "10": "微信＋优惠券",
                                "01": "微信＋优惠券"
                            };
                            return data[value];
                        }
                        }
                    ],
                    search: true,
                    data: [],
                    pagination: true,
                    pageSize: 10
                });
                this.showAreaModel.getAllShow();
                return this;
            },
            showResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data, opt = "<option value=''>请选择演出名称</option>";
                    for (var i = 0; i < data.length; i++) {
                        opt += "<option value='" + data[i]["pk"] + "'>" + data[i]["name"] + "</option>";
                    }
                    $("#show_order").html(opt);
                } else {
                    alert(result.errorInfo);
                }
            },
            events: {
                "click .refresh_order": "refreshOrder",
                "click .check_order": "checkOrder",
                "change #show_order": "showTime"
            },
            //刷新
            refreshOrder: function () {
                this.showAreaModel.getAllShow();
                $("#show_time").val("");
                $(".order_table").bootstrapTable("load",[]);
            },
            //获取已购买的订单
            checkOrder: function () {
                var time = $("#show_time :selected").val();
                if (time) {
                    var data = {
                        action_num: time
                    };
                    this.dataManagerModel.checkOrder(data);
                } else {
                    alert("请先选择演出和场次");
                }
            },
            orderResult: function (result) {
                if (result.errorNo == 0) {
                    result.data.forEach(function (value) {
                        value["date_joined"] = value["date_joined"].replace(/[TZ]/gi, " ").substring(0, 19);
                    });
                    $(".order_table").bootstrapTable("load", result.data);
                } else {
                    alert(result.errorInfo);
                }
            },
            //获取演出场次
            showTime: function () {
                var action = $("#show_order :selected").val();
                if (!action) {
                    alert("请选择演出");
                    return;
                }
                var data = {
                    action: action,
                    state: 1
                };
                this.dataManagerModel.showTime(data);
            },
            showTimeResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data, opt = "<option value=''>请选择场次</option>";
                    for (var i = 0; i < data.length; i++) {
                        opt += "<option value='" + data[i]["pk"] + "'>" + data[i]["perform_date"].replace(/[tz]/gi, " ") + "</option>";
                    }
                    $("#show_time").html(opt);
                } else {
                    alert(result.errorInfo);
                }
            }
        });
        return view;
    });


