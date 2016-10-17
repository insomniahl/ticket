/**
 * Created by insomniahl on 16/9/1.
 */
define(['txt!../../Show/showArea/showArea.html',
        '../../Show/showArea/showAreaModel',
        'backbone', 'chosen'],
    function (Template, showAreaModel, backbone, chosen) {
        var view = backbone.View.extend({
            initialize: function () {
                this.showAreaModel = new showAreaModel();
                this.listenTo(this.showAreaModel, "getShow", this.showResult);
                this.listenTo(this.showAreaModel, "getShowArea", this.showAreaResult);
                this.listenTo(this.showAreaModel, "saveAreaResult", this.saveAreaResult);
                this.listenTo(this.showAreaModel, "updateAreaResult", this.updateAreaResult);
            },
            render: function () {
                var _this = this, $el = $(this.el);
                $el.html(Template);
                this.showAreaModel.getAllShow();
                //活动区域表
                $el.find(".show_table").bootstrapTable({
                    columns: [
                        {field: 'name', title: '区域名称'},
                        {field: 'seat_num', title: '总座位数'},
                        {field: 'rows', title: '排数'},
                        {
                            field: 'state', title: '操作', formatter: function (value) {
                            var data = [];
                            if (value == 1) {
                                data.push('<button class="area_inactive btn btn-warning">');
                                data.push('禁用');
                                data.push('</botton>');
                            } else {
                                data.push('<button class="area_active btn btn-success">');
                                data.push('启用');
                                data.push('</botton>');
                            }
                            return data.join('');
                        }, events: {
                            'click .area_active': function (e, value, row, index) {
                                var data = {
                                    pk: row["pk"],
                                    state: 1,
                                    table: "Area",
                                    index: index
                                };
                                _this.showAreaModel.updateArea(data);
                            },
                            'click .area_inactive': function (e, value, row, index) {
                                var data = {
                                    pk: row["pk"],
                                    state: 0,
                                    table: "Area",
                                    index: index
                                };
                                _this.showAreaModel.updateArea(data);
                            }
                        }
                        },
                        {
                            field: 'flag', title: "编辑", formatter: function (value) {
                            var data = [];
                            if (value != 0) {
                                data.push('<button class="area_edit btn btn-warning" disabled>');
                                data.push('编辑');
                                data.push('</botton>');
                            } else {
                                data.push('<button class="area_edit btn btn-success">');
                                data.push('编辑');
                                data.push('</botton>');
                            }
                            return data.join('');
                        }, events: {
                            'click .area_edit': function (e, value, row, index) {
                                $(".area_detail").text(row["name"] + "--");
                                $(".area_table").attr("rowData", JSON.stringify(row));
                                _this.editArea(JSON.parse(row["string"]));
                            }
                        }
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 10
                });
                //详细区域表
                $el.find(".area_table").bootstrapTable({
                    columns: [
                        {
                            field: "index", title: '排号', formatter: function (value) {
                            return value + 1;
                        }
                        },
                        {
                            field: 'seats', title: '座位号', width: "80%",
                            formatter: function (value) {
                                var $select = $('<select class="chosen-select" multiple style="width: 100%;"></select>');
                                for (var i = 1; i <= 50; i++) {
                                    $select.append($('<option></option>')
                                        .val(i)
                                        .html(i));
                                }
                                $select.attr('seats_value', value.join(','));
                                return $select[0].outerHTML;
                            }, events: {
                            'change .chosen-select': function (e, value, row, index) {
                                row.seats = $(e.target).val();
                                $(this).attr('seats_value', row.seats.join(','));
                            }
                        }
                        },
                        //{
                        //    field: 'operation', title: '操作', width: "20%",
                        //    formatter: function () {
                        //        return '<span class="row_delete glyphicon glyphicon-remove"></span>';
                        //    }, events: {
                        //    'click .row_delete': function (e, value, row, index) {
                        //        $(".area_table").bootstrapTable('removeByUniqueId', row["index"]);
                        //        $(".chosen-select").chosen();
                        //        $(".chosen-select").each(function () {
                        //            $(this).val($(this).attr('seats_value').split(',')).trigger("chosen:updated");
                        //        });
                        //    }
                        //}
                        //}
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 10,
                    onPageChange: function () {
                        $(".chosen-select").chosen();
                        $(".chosen-select").each(function () {
                            $(this).val($(this).attr('seats_value').split(',')).trigger("chosen:updated");
                        });
                    }
                });
                return this;
            },
            //活动区域列表
            showResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data, opt = "<option value=''>请选择演出名称</option>";
                    for (var i = 0; i < data.length; i++) {
                        opt += "<option value='" + data[i]["pk"] + "'>" + data[i]["name"] + "</option>";
                    }
                    $("#show_list").html(opt);
                } else {
                    alert(result.errorInfo);
                }
            },
            //更新区域状态
            updateAreaResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data;
                    $(".show_table").bootstrapTable("updateCell", {
                        index: data.index,
                        field: "state",
                        value: data.state
                    });
                } else {
                    alert(result.errorInfo);
                }
            },
            events: {
                "click .area_add": "areaAdd",
                "click .check_area": "checkArea",
                "click .refresh_area": "refreshArea",
                "click .save_area": "saveArea",     //保存活动区域
                "click .row_save": "rowSave",       //保存区域详细信息
                "click .save_row": "saveRow"        //保存单排座位号信息
            },
            //增加区域
            areaAdd: function () {
                if (!$("#show_list :selected").val()) {
                    alert("请先选择演出");
                    return false;
                }
            },
            //刷新
            refreshArea: function () {
                this.showAreaModel.getAllShow();
                $(".show_name").text("");
                $(".show_table").bootstrapTable("load", []);
                $(".area_table").bootstrapTable("load", []);
                $(".detail_info").addClass("hidden");
            },
            //获取演出区域按钮
            checkArea: function () {
                var show_id = $("#show_list :selected").val();
                if (!show_id || show_id == "") {
                    alert("请先选择查询的演出");
                    return;
                }
                $(".area_table").bootstrapTable("load", []);
                $(".detail_info").addClass("hidden");
                var data = {
                    action: show_id
                };
                this.showAreaModel.getShowArea(data);
            },
            //获区域结果
            showAreaResult: function (result) {
                if (result.errorNo == 0) {
                    $(".show_table").bootstrapTable("load", result.data);
                    $(".show_name").text(($("#show_list :selected").text() + "--") || "");
                } else {
                    alert(result.errorInfo);
                }
            },
            //保存新区域
            saveArea: function () {
                var action_id = $("#show_list :selected").val();
                if (!action_id || action_id == "") {
                    alert("请先选择活动");
                    $("#areaModal").modal("hide");
                    return;
                }
                var str = [], str1 = [],
                    name = $(".area_name").val(),
                    row = parseInt($(".area_row").val() || 1),
                    column = parseInt($(".area_cloumn").val() || 1);
                if (!name) {
                    alert("请填写区域名称");
                    return;
                }
                for (var i = 0; i < row; i++) {
                    var col_list = [], state_list = [];
                    for (var j = 1; j <= column; j++) {
                        col_list.push(j);
                        state_list.push("a");
                    }
                    str.push(col_list);
                    str1.push(state_list.join(""));
                }
                var data = {
                    action: action_id,
                    name: name,
                    seat_num: row * column,
                    rows: row,
                    string: JSON.stringify(str),
                    string1: JSON.stringify(str1)
                };
                this.showAreaModel.saveArea(data);
            },
            //保存区域结果
            saveAreaResult: function (result) {
                if (result.errorNo == 0) {
                    alert(result.errorInfo);
                    $("#areaModal").modal("hide");
                    $(".detail_info").addClass("hidden");
                    $("#areaModal input").val("");
                    this.checkArea();
                } else {
                    alert(result.errorInfo);
                }
            },
            //编辑详细信息
            editArea: function (data) {
                $(".detail_info").removeClass("hidden");
                var tableData = [];
                data.forEach(function (value, index) {
                    tableData.push({
                        "index": index,
                        "seats": value
                    });
                });
                $(".area_table").attr("len", tableData.length);
                $(".area_table").bootstrapTable("load", tableData);
                $(".chosen-select").chosen();
                $(".chosen-select").each(function () {
                    $(this).val($(this).attr('seats_value').split(',')).trigger("chosen:updated");
                });
            },
            //保存区域信息
            rowSave: function () {
                var data = $(".area_table").bootstrapTable("getData");
                var rowData = JSON.parse($(".area_table").attr("rowData"));
                var s = [],
                    state = [],
                    str = JSON.parse(rowData["string"]),
                    str_length = str.length,
                    total = 0;
                for (var i = 0; i < str_length; i++) {
                    total += data[i].seats.length;

                    var state_list = [], s_list = [];
                    var index = 0;
                    for (var j = 0; j < str[i].length; j++) {
                        var n = +data[i]["seats"][index],
                            o = str[i][j];
                        var d = n - o;
                        if (d == 0) {
                            state_list.push("a");
                        } else if (d > 0) {
                            for (var k = 0; k < d; k++) {
                                state_list.push("_");
                            }
                            j = n - 1;
                            state_list.push("a");
                        } else if (isNaN(d)) {
                            state_list.push("_");
                        }
                        s_list.push(n);
                        index++;
                    }
                    s.push(s_list);
                    state.push(state_list.join(""));
                }

                rowData.string = s;
                rowData.string1 = JSON.stringify(state);
                rowData.rows = str_length;
                rowData.seat_num = total;
                this.showAreaModel.updateAreaByEdit(rowData);
            },
            //保存单排信息
            saveRow: function () {
                var row = {
                        index: +$(".area_table").attr("len"),
                        seats: []
                    },
                    num = $(".row_num").val();
                for (var i = 1; i <= num; i++) {
                    row.seats.push(i);
                }
                $(".area_table").bootstrapTable("insertRow", {index: row.index, row: row});
                $(".area_table").attr("len", row.index);
                $("#rowModal").modal("hide");
                $(".chosen-select").chosen();
                $(".chosen-select").each(function () {
                    $(this).val($(this).attr('seats_value').split(',')).trigger("chosen:updated");
                });
            }
        });

        return view;
    });