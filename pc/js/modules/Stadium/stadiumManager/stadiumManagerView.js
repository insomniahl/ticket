/**
 * Created by insomniahl on 16/7/28.
 */
define(['txt!../../Stadium/stadiumManager/stadiumManager.html',
        '../../Stadium/stadiumManager/stadiumManagerModel',
        'backbone', 'bootstrapTable'],
    function (Template, stadiumManagerModel, backbone, bootstrapTable) {
        var view = backbone.View.extend({
            initialize: function () {
                this.stadiumManagerModel = new stadiumManagerModel();
                this.listenTo(this.stadiumManagerModel, "getAllResult", this.getResult);
                this.listenTo(this.stadiumManagerModel, "updateStadiumResult", this.updateStadiumResult);
                this.listenTo(this.stadiumManagerModel, "updateResult", this.updateResult);
            },
            render: function () {
                var $el = $(this.el), _this = this;
                $el.html(Template);
                $el.find(".stadium_table").bootstrapTable({
                    columns: [
                        {field: 'name', title: '场馆名称'},
                        {
                            field: 'remark', title: '场馆介绍', formatter: function (value) {
                            return "<a href='javascript:void 0;' class='checkIntroduce'>点击查看</a>";
                        }, events: {
                            "click .checkIntroduce": function (e, value, row, index) {
                                $("#introduceModal .pre_txt").text(value);
                                $("#introduceModal .pre_txt").val(value);
                                $("#introduceModal").modal("show");
                            }
                        }
                        },
                        {field: 'addr', title: '场馆地址'},
                        {
                            field: 'date_joined', title: '添加时间', formatter: function (value) {
                            return value.substring(0, 19).replace("T", " ");
                        }
                        },
                        {
                            field: 'pic_url', title: '图片', formatter: function (value) {
                            return "<a href='javascript:void 0;' class='checkPic'>点击查看</a>";
                        }, events: {
                            "click .checkPic": function (e, value, row, index) {
                                //value = value.replace("/actions/", "/");
                                $("#stadiumModal .preview_pic").css("backgroundImage", "url(" + value + ")");
                                $("#stadiumModal").modal("show");
                            }
                        }
                        },
                        {
                            field: 'option', title: '操作', width: "25%", formatter: function (value) {
                            return [
                                '<button class="stadium_update btn btn-success">',
                                '编辑',
                                '</botton>'
                            ].join('');
                        }, events: {
                            'click .stadium_update': function (e, value, row, index) {
                                $("#infoModal").attr("pk", row["pk"]);
                                $(".stadium_name").val(row["name"]);
                                $(".stadium_addr").val(row["addr"]);
                                $(".preview_pic").css("backgroundImage", "url(" + row["pic_url"] + ")");
                                $(".stadium_introduce").text(row["remark"]);
                                $(".stadium_introduce").val(row["remark"]);
                                $("#infoModal").modal();
                            }
                        }
                        }
                    ],
                    data: [],
                    pagination: true,
                    pageSize: 10,
                    pageList: [5, 10],
                    search: true
                });
                this.stadiumManagerModel.getAll();
                return this;
            },
            events: {
                "click .stadium_refresh": "refresh_table",
                "click .update_stadium": "update_stadium",
                "change .update_pic": "showPic"
            },
            //显示图片
            showPic: function () {
                var preview = $("#infoModal .preview_pic")[0];
                var fileInput = $(".update_pic")[0];
                preview.style.backgroundImage = '';
                var file = fileInput.files[0];
                if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                    alert("不是有效图片");
                    $(".update_pic").val("");
                    return false;
                } else if (file.size > 1024000) {
                    alert("请选择小于1M大小的图片");
                    $(".update_pic").val("");
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
            //更新场馆状态
            //updateStadiumResult: function (result) {
            //    if (result.errorNo == 0) {
            //        var data = result.data;
            //        $(".stadium_table").bootstrapTable("updateCell", {
            //            index: data.index,
            //            field: "state",
            //            value: data.state
            //        });
            //    } else {
            //        alert(result.errorInfo);
            //    }
            //},
            //刷新
            refresh_table: function () {
                this.stadiumManagerModel.getAll();
            },
            getResult: function (result) {
                if (result.errorNo == 0) {
                    $(".stadium_table").bootstrapTable("load", result.data);
                } else {
                    alert(result.errorInfo);
                }
            },
            update_stadium: function () {
                var info = {
                    name: $(".stadium_name").val(),
                    remark: $(".stadium_introduce").val(),
                    addr: $(".stadium_addr").val()
                };
                var data = new FormData();
                data.append("pk", $("#infoModal").attr("pk"));
                if(info.name){
                    data.append("name", info.name);
                }
                if(info.remark){
                    data.append("remark", info.remark);
                }
                if(info.addr) {
                    data.append("addr", info.addr);
                }
                if($(".update_pic")[0]){
                    data.append("pic_url", $(".update_pic")[0].files[0]);
                }
                this.stadiumManagerModel.updateStadium(data);
            },
            updateResult: function (result) {
                if (result.errorNo == 0) {
                    alert(result.errorInfo);
                    this.refresh_table();
                    $("#infoModal").modal("hide");
                } else {
                    alert(result.errorInfo);
                }
            }
        });

        return view;
    })
;