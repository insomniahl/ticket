/**
 * Created by insomniahl on 16/7/28.
 */
define(['txt!../../Coupon/couponList/couponList.html',
        '../../Coupon/couponList/couponListModel',
        'backbone'],
    function (Template, couponListModel, backbone) {
        var view = backbone.View.extend({
            initialize: function () {
                this.couponListModel = new couponListModel();
                this.listenTo(this.couponListModel, "getCouponResult", this.getCouponResult);
            },
            render: function () {
                var _this = this, $el = $(this.el);
                $el.html(Template);
                $el.find(".coupon_table").bootstrapTable({
                    columns: [
                        {field: "name", title: '演出名称', sortable: true},
                        {field: "site", title: '场馆'},
                        {field: "time", title: '演出时间', sortable: true},
                        {field: "buy_time", title: '购买时间'},
                        {field: "coupon_price", title: '面额'},
                        {
                            field: "state", title: '状态', formatter: function (value) {
                            return value == 0 ? "未使用" : "已使用";
                        }
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 10,
                    search: true
                });
                this.couponListModel.getCouponAll();
                return this;
            },
            //获取优惠券结果
            getCouponResult: function (result) {
                if (result.errorNo == 0) {
                    result.data.forEach(function (item) {
                        item["name"] = item["action"]["name"];
                        item["site"] = item["action"]["site"];
                        item["time"] = item["actionnum"]["perform_date"].replace(/[tz]/gi, " ");
                        item["buy_time"] = item["date_joined"].replace(/[tz]/gi, " ").substring(0, 19);
                    });
                    $(".coupon_table").bootstrapTable("load", result.data);
                }
            },
            events: {
                "click .coupon_refresh": "couponRefresh"
            },
            //刷新
            couponRefresh: function () {
                this.couponListModel.getCouponAll();
            }
        });

        return view;
    });