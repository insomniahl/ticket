/**
 * Created by insomniahl on 16/9/1.
 */
define(['txt!../../Show/showScreen/showScreen.html',
        '../../Show/showScreen/showScreenModel',
        '../../Show/showList/showListModel',
        'backbone'],
    function (Template, showScreenModel, showListModel, backbone) {
        var view = backbone.View.extend({
            initialize: function () {
                this.showScreenModel = new showScreenModel();
                this.showListModel = new showListModel();
                this.listenTo(this.showListModel, "getShowListResult", this.getShowListResult);
                this.listenTo(this.showScreenModel, "getShowInfoResult", this.getShowInfoResult);
                this.listenTo(this.showScreenModel, "arrangeResult", this.arrangeResult);
            },
            render: function () {
                var _this = this, $el = $(this.el);
                $el.html(Template);
                $el.find(".range_table").bootstrapTable({
                    columns: [
                        {field: 'perform_date', title: '演出时间', formatter: function (value) {
                            return value.replace(/[tz]/gi, " ");
                        }}
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 10
                });
                this.showListModel.getShowList();
                return this;
            },
            getShowListResult: function (result) {
                if (result.errorNo == 0) {
                    var data = result.data, opt = "";
                    for (var i = 0; i < data.length; i++) {
                        opt += "<option value='" + data[i]["pk"] + "'>" + data[i]["name"] + "</option>";
                    }
                    $(".show_list").html(opt);
                } else {
                    alert(result.errorInfo);
                }
            },
            events: {
                "click .check_show": "checkShow",
                "click .refresh_list": "refreshList",
                "click .save_time": "rangeTime"
            },
            refreshList: function () {
                this.showListModel.getShowList();
            },
            checkShow: function () {
                var data = {
                    action: $(".show_list :selected").val()
                };
                this.showScreenModel.getShowInfo(data);
            },
            getShowInfoResult: function (result) {
                if (result.errorNo == 0) {
                    $(".range_table").bootstrapTable('load', result.data);
                    $("#timeModal").modal("hide");
                    $("#timeModal input").val("");
                } else {
                    alert(result.errorInfo);
                }
            },
            rangeTime: function () {
                var data = {
                    action:$(".show_list :selected").val(),
                    perform_date:$(".range_time").val().replace("T", " ")+":00"
                };
                this.showScreenModel.savearrange(data);
            },
            arrangeResult: function (result) {
                if (result.errorNo == 0) {
                    this.checkShow();
                } else {
                    alert(result.errorInfo);
                }
            }
        });

        return view;
    });