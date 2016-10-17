/**
 * Created by insomniahl on 16/7/28.
 */
define(['txt!../../User/managerList/managerList.html',
        '../../User/managerList/managerListModel',
        'backbone'],
    function (Template, managerListModel, backbone) {
        var view = backbone.View.extend({
            initialize: function () {
                this.managerListModel = new managerListModel();
                this.listenTo(this.managerListModel, "getManagerResult", this.getManagerResult);
                this.listenTo(this.managerListModel, "updateManagerResult", this.updateManagerResult);
                this.listenTo(this.managerListModel, "saveManagerResult", this.saveManagerResult);
            },
            render: function () {
                var _this = this, $el = $(this.el);
                $el.html(Template);
                $el.find(".manager_table").bootstrapTable({
                    columns: [
                        {field: "账号", title: '账号'},
                        {field: "performer", title: '用户名'},
                        {field: "site", title: '联系电话'},
                        {
                            field: 'state', title: '操作', width: "25%", formatter: function (value) {
                            if (value == 1) {
                                return [
                                    '<button class="manager_inactive btn btn-warning">',
                                    '禁用',
                                    '</botton>'
                                ].join("");
                            } else {
                                return [
                                    '<button class="manager_active btn btn-success">',
                                    '启用',
                                    '</botton>'
                                    //'<button class="manager_delete btn">',
                                    //'删除',
                                    //'</botton>'
                                ].join('');
                            }
                        }, events: {
                            'click .manager_active': function (e, value, row, index) {
                                var data = {
                                    "pk": row["pk"],
                                    "state": 1,
                                    "table": "Site",
                                    "index":index
                                };
                                _this.managerListModel.updateManager(data);
                            },
                            'click .manager_inactive': function (e, value, row, index) {
                                var data = {
                                    "pk": row["pk"],
                                    "state": 0,
                                    "table": "Site",
                                    "index":index
                                };
                                _this.managerListModel.updateManager(data);
                            },
                            //'click .manager_delete': function (e, value, row, index) {
                            //    var data = {
                            //        "account": row["account"],
                            //        "index": index
                            //    };
                            //    _this.managerListModel.deleteMill(data);
                            //}
                        }
                        }

                    ],
                    search: true,
                    data: [],
                    pagination: true,
                    pageSize: 10
                });
                this.managerListModel.getManager();
                return this;
            },
            //获取所有管理人员
            getManagerResult: function (result) {
                if (result.errorNo == 0) {
                    $(".manager_table").bootstrapTable("load", result.data);
                } else {
                    alert(result.errorInfo);
                }
            },
            //更新管理人员状态
            updateManagerResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data;
                    $(".manager_table").bootstrapTable("updateCell", {
                        index: data.index,
                        field: "state",
                        value: data.state
                    });
                } else {
                    alert(result.errorInfo);
                }
            },
            events: {
                "click .manager_refresh": "managerRefresh",
                "click .save_manager": "saveManager"
            },
            managerRefresh: function () {
                this.managerListModel.getManager();
            },
            saveManager: function () {
                var data = {
                };
                this.managerListModel.saveManager(data);
            },
            saveManagerResult: function (result) {
                if(result.errorNo == 0){
                    alert(result.errorInfo);
                    this.managerListModel.getManager();
                    $("#managerModal").modal("hide");
                    $("#managerModal input").val("");
                } else {
                    alert(result.errorInfo);
                }
            }
        });

        return view;
    });