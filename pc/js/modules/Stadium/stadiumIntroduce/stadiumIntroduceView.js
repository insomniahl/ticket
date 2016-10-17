/**
 * Created by insomniahl on 16/7/28.
 */
define(['txt!../../Stadium/stadiumIntroduce/stadiumIntroduce.html',
        '../../Stadium/stadiumIntroduce/stadiumIntroduceModel',
        'backbone'],
    function (Template, stadiumIntroduceModel, backbone) {
        var view = backbone.View.extend({
            initialize: function () {
                this.stadiumIntroduceModel = new stadiumIntroduceModel();
                this.listenTo(this.stadiumIntroduceModel, "saveResult", this.saveResult);
            },
            render: function () {
                var $el = $(this.el);
                $el.html(Template);
                return this;
            },
            events: {
                "change .pic": "showPic",
                "click .stadium_save": "stadiumSave"
            },
            //显示图片
            showPic: function () {
                var preview = $(".preview_pic")[0];
                var fileInput = $(".pic")[0];
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
            //保存场馆
            stadiumSave: function () {
                var info = {
                    name: $(".stadium_name").val(),
                    remark: $(".stadium_introduce").val(),
                    addr: $(".stadium_addr").val(),
                    pic: $(".pic")[0].files[0],
                    pic_name: $(".pic").attr("filename")
                };
                if(info.name && info.remark && info.pic && info.addr) {
                    var data = new FormData();
                    data.append("name", info.name);
                    data.append("remark", info.remark);
                    data.append("addr", info.addr);
                    data.append("pic_url", info.pic, info.pic_name);
                    this.stadiumIntroduceModel.saveStadium(data);
                } else {
                    alert("请填写所有的数据");
                }
            },
            saveResult: function (result) {
                if (result.errorNo == 0) {
                    alert(result.errorInfo);
                    $(".stadium_name").val("");
                    $(".stadium_introduce").val("");
                    $(".stadium_addr").val("");
                    $(".pic").val("");
                    $(".preview_pic").css("background-image", "");
                } else {
                    alert(result.errorInfo);
                }
            }
        });

        return view;
    });