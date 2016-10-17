/**
 * Created by insomniahl on 16/9/1.
 */
define(['txt!../../Show/showList/showList.html',
        '../../Show/showList/showListModel',
        '../../Stadium/stadiumManager/stadiumManagerModel',
        '../../Show/showArea/showAreaModel',
        'backbone'],
    function (Template, showListModel, stadiumModel, showAreaModel, backbone) {
        var view = backbone.View.extend({
            initialize: function () {
                this.showListModel = new showListModel();
                this.stadiumModel = new stadiumModel();
                this.showAreaModel = new showAreaModel();
                this.listenTo(this.stadiumModel, "getAllResult", this.stadiumResult);
                this.listenTo(this.showAreaModel, "getShowArea", this.showAreaResult);
                this.listenTo(this.showListModel, "getShowListResult", this.getShowListResult);
                this.listenTo(this.showListModel, "saveShowResult", this.saveShowResult);
                this.listenTo(this.showListModel, "getShowInfoResult", this.getShowInfoResult);
                this.listenTo(this.showListModel, "arrangeResult", this.arrangeResult);
                this.listenTo(this.showListModel, "getPriceArea", this.priceAreaResult);
                this.listenTo(this.showListModel, "updateArrangeResult", this.updateArrangeResult);
                this.listenTo(this.showListModel, "updateShowResult", this.updateShowResult);
                this.listenTo(this.showListModel, "updateResult", this.updateResult);

            },
            render: function () {
                var _this = this, $el = $(this.el);
                $el.html(Template);
                $el.find(".showList_table").bootstrapTable({
                    columns: [
                        {field: "name", title: '演出名称'},
                        {field: "performer", title: '演出人员'},
                        {field: "site", title: '场馆'},
                        {
                            field: "introduce", title: '简介', formatter: function (value) {
                            return "<a href='javascript:void 0;' class='checkIntroduce'>点击查看</a>";
                        }, events: {
                            "click .checkIntroduce": function (e, value, row, index) {
                                $("#introduceModal .pre_txt").text(value);
                                $("#introduceModal").modal("show");
                            }
                        }
                        },
                        {field: "seat_num", title: '座位数量'},
                        {
                            field: 'pic', title: '海报', formatter: function (value) {
                            return "<a href='javascript:void 0;' class='checkPic'>点击查看</a>";
                        }, events: {
                            "click .checkPic": function (e, value, row, index) {
                                value = value.replace("/actions/", "/");
                                var pic1 = row["pic1"].replace("/actions/", "/");
                                $("#posterModal .preview_pic").css("backgroundImage", "url(" + value + ")");
                                $("#posterModal .preview_pic1").css("backgroundImage", "url(" + pic1 + ")");
                                $("#posterModal").modal("show");
                            }
                        }
                        },
                        {
                            field: 'date_joined', title: '演出场次', formatter: function (value) {
                            return '<a href="javascript:void 0;" class="show_time_add">点击查看</a>';
                        }, events: {
                            "click .show_time_add": function (e, value, row, index) {
                                var data = {
                                    action: row["pk"]
                                };
                                _this.showListModel.getShowInfo(data);
                            }
                        }
                        },
                        {
                            field: 'state', title: '操作', width: '15%', formatter: function (value, row) {
                            var data = [
                                '<button class="btn btn-primary add_arrange">增加场次</button>',
                                '<button class="btn btn-primary edit_arrange">编辑</button>',
                            ];
                            if (value == 1) {
                                data.push('<button class="show_inactive btn btn-warning">');
                                data.push('禁用');
                                data.push('</botton>');
                            } else {
                                data.push('<button class="show_active btn btn-success">');
                                data.push('启用');
                                data.push('</botton>');
                            }
                            return data.join('');
                        }, events: {
                            "click .add_arrange": function (e, value, row, index) {
                                var data = {
                                    action: row["pk"]
                                };
                                _this.showAreaModel.getShowArea(data);
                                $("#timeModal").attr("pk", row["pk"]);
                            },
                            'click .show_active': function (e, value, row, index) {
                                e.stopPropagation();
                                var data = new FormData();
                                data.append("pk", row["pk"]);
                                data.append("state", 1);
                                data.append("index", index);
                                var updateDate = {
                                    pk: row["pk"],
                                    state: 1,
                                    index: index
                                };
                                _this.showListModel.updateShow(data, updateDate);
                            },
                            'click .show_inactive': function (e, value, row, index) {
                                e.stopPropagation();
                                var data = new FormData();
                                data.append("pk", row["pk"]);
                                data.append("state", 0);
                                data.append("index", index);
                                var updateDate = {
                                    pk: row["pk"],
                                    state: 0,
                                    index: index
                                };
                                _this.showListModel.updateShow(data, updateDate);
                            },
                            'click .edit_arrange': function (e, value, row, index) {
                                e.stopPropagation();
                                $("#updateModal").attr("pk", row["pk"]);
                                $(".show_name").val(row["name"]);
                                $(".show_performer").val(row["performer"]);
                                $(".show_stadium").val(row["site"]);
                                $(".show_introduce").text(row["introduce"]);
                                $(".show_introduce").val(row["introduce"]);
                                $(".update_pic").css("backgroundImage", "url(" + row["pic"].replace("/actions/", "/") + ")");
                                $(".update_pic1").css("backgroundImage", "url(" + row["pic1"].replace("/actions/", "/") + ")");
                                $("#updateModal").modal();
                            }
                        }
                        }
                    ],
                    search: true,
                    data: [],
                    pagination: true,
                    pageSize: 10
                });
                $el.find(".arrange_table").bootstrapTable({
                    columns: [
                        {
                            field: 'perform_date', title: '演出场次', formatter: function (value) {
                            return value.replace(/[tz]/gi, " ");
                        }
                        },
                        {
                            field: 'state', title: '操作', width: "25%", formatter: function (value) {
                            var data = [];
                            if (value == 1) {
                                data.push('<button class="arrange_inactive btn btn-warning">');
                                data.push('禁用');
                                data.push('</botton>');
                            } else {
                                data.push('<button class="arrange_active btn btn-success">');
                                data.push('启用');
                                data.push('</botton>');
                            }
                            return data.join('');
                        }, events: {
                            'click .arrange_active': function (e, value, row, index) {
                                e.stopPropagation();
                                var data = {
                                    pk: row["pk"],
                                    state: 1,
                                    table: "ActionNum",
                                    index: index
                                };
                                _this.showListModel.updateArrange(data);
                            },
                            'click .arrange_inactive': function (e, value, row, index) {
                                e.stopPropagation();
                                var data = {
                                    pk: row["pk"],
                                    state: 0,
                                    table: "ActionNum",
                                    index: index
                                };
                                _this.showListModel.updateArrange(data);
                            }
                        }
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 5,
                    onClickRow: function (row, $element, field) {
                        var data = {
                            action_num: row["pk"]
                        };
                        _this.showListModel.getPriceArea(data);
                    }
                });
                $el.find(".price_table").bootstrapTable({
                    columns: [
                        {field: 'name', title: '区域名称'},
                        {
                            field: 'price', title: '价格', formatter: function (value) {
                            var $input = $("<input type='number' class='form-control input_price' >");
                            return $input[0].outerHTML
                        }, events: {
                            "change .input_price": function (e, value, row, index) {
                                row.price = $(e.target).val();
                            }
                        }
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 5
                });
                $el.find(".all_price_table").bootstrapTable({
                    columns: [
                        {field: 'area', title: '区域名称'},
                        {field: 'price', title: '价格'}
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 5
                });
                this.stadiumModel.getAll();
                this.showListModel.getShowList();
                return this;
            },
            //获取场馆结果
            stadiumResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data, opt = "";
                    for (var i = 0; i < data.length; i++) {
                        opt += "<option value='" + data[i]["pk"] + "'>" + data[i]["name"] + "</option>";
                    }
                    $("#newShowModal .show_stadium").html(opt);
                } else {
                    alert(result.errorInfo);
                }
            },
            //获取演出列表
            getShowListResult: function (result) {
                if (result.errorNo == 0) {
                    $(".showList_table").bootstrapTable("load", result.data);
                } else {
                    alert(result.errorInfo);
                }
            },
            //增加场次按钮结果
            showAreaResult: function (result) {
                if (result.errorNo == 0) {
                    $("#timeModal").modal("show");
                    $(".price_table").bootstrapTable("load", result.data);
                } else {
                    alert(result.errorInfo);
                }
            },
            //已安排场次区域价格
            priceAreaResult: function (result) {
                if (result.errorNo == 0) {
                    $(".all_price_table").closest(".row").removeClass("hid");
                    $(".all_price_table").bootstrapTable("load", result.data);
                } else {
                    alert(result.errorInfo);
                }
            },
            //更新活动状态
            updateShowResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data;
                    $(".showList_table").bootstrapTable("updateCell", {
                        index: data.index,
                        field: "state",
                        value: data.state
                    });
                } else {
                    alert(result.errorInfo);
                }
            },
            //更新区域状态
            updateArrangeResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data;
                    $(".arrange_table").bootstrapTable("updateCell", {
                        index: data.index,
                        field: "state",
                        value: data.state
                    });
                } else {
                    alert(result.errorInfo);
                }
            },
            events: {
                "change .pic": "showPic",
                "change .pic1": "showPic1",
                "change .upic": "updatePic",
                "change .upic1": "updatePic1",
                "click .save_show": "saveShow",
                "click .save_time": "saveTime",
                "click .showList_refresh": "showListRefresh",
                "click .update_show": "updateShow",
            },
            //刷新
            showListRefresh: function () {
                this.showListModel.getShowList();
            },
            //显示图片
            showPic: function () {
                var preview = $(".preview_pic")[0];
                var fileInput = $("#newShowModal .pic")[0];
                preview.style.backgroundImage = '';
                var file = fileInput.files[0];
                if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                    alert("不是有效图片");
                    $(".pic").val("");
                    return false;
                } else if (file.size > 1024000) {
                    alert("请选择小于1M大小的图片");
                    $(".pic").val("");
                    return;
                }
                // 读取文件
                var reader = new FileReader();
                // 文件读取完成时，执行该回调函数
                reader.onload = function (e) {
                    var data = e.target.result;
                    preview.style.backgroundImage = "url('" + data + "')";
                };
                reader.readAsDataURL(file);
            },
            //显示图片
            showPic1: function () {
                var preview = $(".preview_pic1")[0];
                var fileInput = $("#newShowModal .pic1")[0];
                preview.style.backgroundImage = '';
                var file = fileInput.files[0];
                if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                    alert("不是有效图片");
                    $(".pic1").val("");
                    return false;
                } else if (file.size > 1024000) {
                    alert("请选择小于1M大小的图片");
                    $(".pic1").val("");
                    return;
                }
                // 读取文件
                var reader = new FileReader();
                // 文件读取完成时，执行该回调函数
                reader.onload = function (e) {
                    var data = e.target.result;
                    preview.style.backgroundImage = "url('" + data + "')";
                };
                reader.readAsDataURL(file);
            },
            updatePic: function () {
                var preview = $(".update_pic")[0];
                var fileInput = $("#updateModal .upic")[0];
                preview.style.backgroundImage = '';
                var file = fileInput.files[0];
                if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                    alert("不是有效图片");
                    $(".pic").val("");
                    return false;
                } else if (file.size > 1024000) {
                    alert("请选择小于1M大小的图片");
                    $(".pic").val("");
                    return;
                }
                // 读取文件
                var reader = new FileReader();
                // 文件读取完成时，执行该回调函数
                reader.onload = function (e) {
                    var data = e.target.result;
                    preview.style.backgroundImage = "url('" + data + "')";
                };
                reader.readAsDataURL(file);
            },
            updatePic1: function () {
                var preview = $(".update_pic1")[0];
                var fileInput = $("#updateModal .upic1")[0];
                preview.style.backgroundImage = '';
                var file = fileInput.files[0];
                if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                    alert("不是有效图片");
                    $(".pic1").val("");
                    return false;
                } else if (file.size > 1024000) {
                    alert("请选择小于1M大小的图片");
                    $(".pic1").val("");
                    return;
                }
                // 读取文件
                var reader = new FileReader();
                // 文件读取完成时，执行该回调函数
                reader.onload = function (e) {
                    var data = e.target.result;
                    preview.style.backgroundImage = "url('" + data + "')";
                };
                reader.readAsDataURL(file);
            },
            //保存演出信息
            saveShow: function () {
                $(".save_show").prop("disabled", true);
                var info = {
                    name: $("#newShowModal .show_name").val(),
                    site: $("#newShowModal .show_stadium").val(),
                    introduce: $("#newShowModal .show_introduce").val(),
                    //seat_num: $("#newShowModal .show_seats").val().trim(),
                    performer: $("#newShowModal .show_performer").val(),
                    pic: $("#newShowModal .pic")[0].files[0],
                    pic1: $("#newShowModal .pic1")[0].files[0]
                };
                if (info.name && info.site && info.introduce && info.performer && info.pic && info.pic1) {
                    var data = new FormData();
                    data.append("name", info.name);
                    data.append("site", info.site);
                    data.append("introduce", info.introduce);
                    //data.append("seat_num", info.seat_num);
                    data.append("performer", info.performer);
                    data.append("actionpic", info.pic);
                    data.append("actionpic1", info.pic1);

                    this.showListModel.saveShow(data);
                } else {
                    alert("请填写所有数据");
                    $(".save_show").prop("disabled", false);
                }
            },
            //保存活动结果
            saveShowResult: function (result) {
                if (result.errorNo == 0) {
                    this.showListModel.getShowList();
                    $("#newShowModal input").val("");
                    $("textarea").val("");
                    $(".preview_pic").css("backgroundImage", "");
                    $("#newShowModal").modal("hide");
                    alert(result.errorInfo);
                } else {
                    alert(result.errorInfo);
                }
                $(".save_show").prop("disabled", false);
            },
            //获取演出场次
            getShowInfoResult: function (result) {
                if (result.errorNo == 0) {
                    $(".all_price_table").closest(".row").addClass("hid");
                    $(".arrange_table").bootstrapTable('load', result.data);
                    $("#timeTableModal").modal("show");
                } else {
                    alert(result.errorInfo);
                }
            },
            //保存演出场次
            saveTime: function () {
                var price_list = {},
                    area_list = $(".price_table").bootstrapTable("getData"),
                    price_state = true;
                area_list.forEach(function (value) {
                    if (value["price"] == undefined || value["price"] <= 0) {
                        price_state = false;
                    }
                    price_list[value["pk"]] = value["price"];
                });
                var time = $(".arrange_time").val();
                if (!time) {
                    alert("请输入完整的日期时间");
                    return;
                } else if (!price_state) {
                    alert("请给每个区域设置大于0的价格");
                    return;
                } else if (area_list.length == 0) {
                    alert("无区域,请先添加区域!");
                    return;
                }
                var data = {
                    actionnum: {
                        action: $("#timeModal").attr("pk"),
                        perform_date: time.replace("T", " ") + ":00"
                    },
                    prices: price_list
                };
                this.showListModel.savearrange(data);
            },
            //获取活动场次结果
            arrangeResult: function (result) {
                if (result.errorNo == 0) {
                    $("#timeModal").modal("hide");
                    $("#timeModal input").val("");
                    $(".price_table").bootstrapTable("load", "");
                    alert(result.errorInfo);
                } else {
                    alert(result.errorInfo);
                }
            },
            updateShow: function () {
                var info = {
                    name: $("#updateModal .show_name").val(),
                    introduce: $("#updateModal .show_introduce").val(),
                    performer: $("#updateModal .show_performer").val()
                };
                var data = new FormData();
                data.append("pk", $("#updateModal").attr("pk"));
                if (info.name) {
                    data.append("name", info.name);
                }
                if (info.introduce) {
                    data.append("introduce", info.introduce);
                }
                if (info.performer) {
                    data.append("performer", info.performer);
                }
                if ($("#updateModal .upic")[0]) {
                    data.append("actionpic", $("#updateModal .upic")[0].files[0]);
                }
                if ($("#updateModal .upic1")[0]) {
                    data.append("actionpic1", $("#updateModal .upic1")[0].files[0]);
                }
                this.showListModel.updateInfoShow(data);
            },
            updateResult: function (result) {
                if (result.errorNo == 0) {
                    alert(result.errorInfo);
                    this.showListRefresh();
                    this.reset();
                    $("#updateModal").modal("hide");
                } else {
                    alert(result.errorInfo);
                }
            },
            reset: function () {
                $("input").val("");
                $("textarea")[0].value = "";
            }
        });

        return view;
    });