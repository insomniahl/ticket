/**
 * Created by insomniahl on 16/7/28.
 */
define(['txt!../../User/userList/userList.html',
        '../../User/userList/userListModel',
        'backbone'],
    function (Template, userListModel, backbone) {
        var view = backbone.View.extend({
            initialize: function () {
                this.userListModel = new userListModel();
                this.listenTo(this.userListModel, "getUserResult", this.getUserResult);
            },
            render: function () {
                var _this = this, $el = $(this.el);
                $el.html(Template);
                $el.find(".user_table").bootstrapTable({
                    columns: [
                        {field: 'openid', title: 'openId'},
                        {field: 'nickname', title: '昵称'},
                        {
                            field: 'sex', title: '性别', formatter: function (value) {
                            var data = {
                                "1": "男",
                                "2": "女",
                                "0": "未知"
                            };
                            return data[value];
                        }
                        },
                        //{field: 'email', title: '邮箱'},
                        {
                            field: 'address', title: '地址', formatter: function (value, row) {
                            var data = [];
                            if (!!row["country"]) {
                                data.push(row["country"]);
                            }
                            if (!!row["province"]) {
                                data.push(row["province"]);
                            }
                            if (!!row["city"]) {
                                data.push(row["city"]);
                            }
                            return data.join("-");
                        }
                        },
                        {field: "da_user_set", title: "收货地址"}
                    ],
                    pagination: true,
                    pageSize: 10,
                    pageNumber:1,
                    search: true,
                    dataType: "json",
                    method: 'get',
                    sidePagination: "server",
                    url: "http://tk.jetcloudtech.com/userprofiles.json/",
                    responseHandler: function (res) {
                        var data = {
                            "total": res["count"],
                            "rows": res["results"]
                        };
                        return data;
                    },
                    queryParamsType: "limit",
                    queryParams: function(params){
                        return {
                            pageSize: params.limit,
                            offset: params.offset,
                            page: params.pageNumber
                        }
                    }
                });
                //this.userListModel.getUser();
                return this;
            },
            getUserResult: function (result) {
                if (result.errorNo == 0) {
                    $(".user_table").bootstrapTable("load", result.data);
                } else {
                    alert(result.errorInfo);
                }
            },
            events: {
                "click .user_refresh": "userRefresh"
            },
            userRefresh: function () {
                $(".user_table").bootstrapTable("refresh");
                //this.userListModel.getUser();
            }
        });

        return view;
    });