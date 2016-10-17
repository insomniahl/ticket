$(function () {
    //请求地址
    var urlRoot = "http://tk.jetcloudtech.com";

    //设置全局请求头,将cookie带入请求
    jq.ajaxSetup({
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });

    //监听页面加载完毕
    $(document).on("pageInit", function (e, pageId, $page) {
        //首页
        if (pageId == "index") {
            main.init();
            main.bindEvents();
        }
        //场馆信息
        if (pageId == "stadium_detail") {
            stadium.getDetail();
        }
        //活动信息
        if (pageId == "action_detail") {
            action.getDetail();
            action.bindEvents();
        }
        //选座信息
        if (pageId == "choose_seat") {
            action.couponList = [];
            action.reset();
            action.getTime();
            action.bindEvents();
        }
        //购买券卡
        if (pageId == "choose_coupon") {
            action.initWxPay();
            action.reset();
            action.getTime();
            action.bindEvents();
        }
        //支付
        if (pageId == "pay") {
            action.initPay();
            action.initWxPay();
            action.bindEvents();
        }
        //支付成功
        if (pageId == "order_success") {
            action.orderSuccess();
        }
        //优惠码
        if (pageId == "couponCode") {
            action.showCoupon();
            action.bindEvents();
        }
        //收货地址
        if (pageId == "address") {
            $(".address_list").addClass("hide");
            address.getAllAddress();
            address.bindEvents();
        }
        //添加收货地址
        if (pageId == "addAddress") {
            address.initCity();
            address.bindEvents();
        }
        //我的订单
        if (pageId == "order") {
            $.showPreloader();
            order.getAllOrder();
            order.bindEvents();
        }
        //我的座位票
        if (pageId == "ticketList") {
            order.getAllTicket();
            order.bindEvents();
        }
        //我的优惠码
        if (pageId == "couponList") {
            order.getAllCoupon();
            order.bindEvents();
        }
    });

    //主页模块
    var main = {
        //页面初始化
        init: function () {
            this.getStadiums();
            this.getActions();
        },
        //获取场馆信息
        getStadiums: function () {
            jq.ajax({
                type: "get",
                url: urlRoot + "/sites.json/",
                success: function (res) {
                    if (res) {
                        main.stadiumSuccess(res);
                    } else {
                        main.stadiumError();
                    }
                },
                error: function (err) {
                    main.stadiumError();
                }
            })
        },
        stadiumSuccess: function (res) {
            res.map(function (value) {
                value["pic_url"] = value["pic_url"].replace("/sites.json/", "/");
            });
            var hStadium = [
                '{{#each stadium}}',
                '<div>',
                '<img src="{{pic_url}}" class="bantu marb stadiumsDetail" url="{{url}}" />',
                '</div>',
                '{{/each}}'
            ].join("");
            var HStadium = Handlebars.compile(hStadium);
            var data = {stadium: res};
            var html = HStadium(data);
            $(".stadiums_list").html(html);
            main.bindEvents();
        },
        stadiumError: function () {
            var html = [
                '<button class="button button-warning stadium_error widthAll mart1">',
                '页面加载失败,请点击重新加载页面',
                '</button>'
            ].join("");
            $(".stadiums_list").html(html);
            main.bindEvents();
        },
        //获取活动信息
        getActions: function () {
            jq.ajax({
                type: "get",
                url: urlRoot + "/actions.json/?state=1",
                success: function (res) {
                    if (res) {
                        main.actionSuccess(res);
                    } else {
                        main.actionError();
                    }
                },
                error: function (err) {
                    main.actionError();
                }
            })
        },
        actionSuccess: function (res) {
            if (res.length == 0) {
                return;
            }
            res.sort(function (pre, next) {
                return next["pk"] - pre["pk"]
            });
            res.map(function (value, index) {
                value["pic"] = value["pic"].replace("/actions.json/", "/");
                value["pic1"] = value["pic1"].replace("/actions.json/", "/");
                value["index"] = index;
            });
            action.info = res;
            var hStadium = [
                '{{#each actions}}',
                '<div>',
                '<img src="{{pic}}" class="bantu marb actionsDetail" index="{{index}}" pk="{{pk}}" />',
                '</div>',
                '{{/each}}'
            ].join("");
            var HStadium = Handlebars.compile(hStadium);
            var data = {actions: res};
            var html = HStadium(data);
            //本期推荐
            $(".last_action")
                .attr("src", res[0]["pic"])
                .attr("index", res[0]["index"])
                .attr("pk", res[0]["pk"]);
            //往期推荐
            var pre_list = "";
            for (var i = 1; i < res.length; i++) {
                var pre_info = [
                    '<img class="bantu marb check_action" src="',
                    res[i]["pic"] + '"',
                    'index="',
                    res[i]["index"] + '"',
                    'pk="',
                    res[i]["pk"] + '">'
                ].join('');
                pre_list += pre_info;
            }
            $(".pre_list").html(pre_list);
            $(".actions_list").html(html);
            main.bindEvents();
        },
        actionError: function () {
            var html = [
                '<button class="button button-warning action_error widthAll mart1">',
                '页面加载失败,请点击重新加载页面',
                '</button>'
            ].join("");
            $(".actions_list").html(html);
            main.bindEvents();
        },
        //绑定主页事件
        bindEvents: function () {
            $(".actionsDetail").off("click").on("click", function (e) {
                action.index = $(e.target).attr("index");
                action.pk = $(e.target).attr("pk");
                $.router.load("modules/action/actionDetail");
            });
            $(".stadiumsDetail").off("click").on("click", function (e) {
                sessionStorage.setItem("stadiumInfo", $(e.target).attr("url"));
                $.router.load("modules/stadium/stadiumDetail");
            });
            $(".stadium_error").off("click").on("click", function (e) {
                main.getStadiums();
            });
            $(".action_error").off("click").on("click", function (e) {
                main.getActions();
            });
            $(".last_action").off("click").on("click", function (e) {
                action.index = $(e.target).attr("index");
                action.pk = $(e.target).attr("pk");
                $.router.load("modules/action/actionDetail");
            });
            $(".check_action").off("click").on("click", function (e) {
                action.index = $(e.target).attr("index");
                action.pk = $(e.target).attr("pk");
                $.router.load("modules/action/actionDetail");
            });
        }
    };

    //场馆列表
    var stadium = {
        //获取场馆基本信息
        getDetail: function () {
            jq.ajax({
                type: "get",
                url: sessionStorage.getItem("stadiumInfo"),
                success: function (res) {
                    if (res) {
                        stadium.detailSuccess(res);
                    } else {
                        stadium.detailError();
                    }
                },
                error: function (err) {
                    stadium.detailError();
                }
            })
        },
        detailSuccess: function (res) {
            res["pic_url"] = res["pic_url"].replace("/sites/", "/");
            $("#stadium_detail .pic").attr("src", res["pic_url"]);
            $("#stadium_detail .name").text(res["name"]);
            $("#stadium_detail .introduce").text(res["remark"]);
            $("#stadium_detail .address").text(res["addr"]);
            sessionStorage.removeItem("stadiumInfo");
        },
        detailError: function () {
            $("#stadium_detail .done").addClass("hide");
            $("#stadium_detail .err").removeClass("hide");
        },
        //绑定事件
        bindEvents: function () {
            $("#stadium_detail .detail_error").off("click").on("click", function () {
                stadium.getDetail();
            })
        }
    };

    //活动
    var action = {
        index: 0,
        pk: 0,
        info: [],
        time: [],
        order: {},
        couponList: [],
        //初始化微信支付
        initWxPay: function () {
            //页面加载的时候配置微信config
            var url = window.location.href;
            jq.ajax({
                url: urlRoot + '/wechat/get_jsapi_ticket/?url=' + url,
                type: "get",
                success: function (response) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: response.appid, // 必填，公众号的唯一标识
                        timestamp: response.timestamp, // 必填，生成签名的时间戳
                        nonceStr: response.noncestr, // 必填，生成签名的随机串
                        signature: response.key,// 必填，签名，见附录1
                        jsApiList: ["chooseWXPay", 'getLocation', 'openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                },
                error: function () {
                    alert("js签名请求错误");
                }
            });
        },
        //微信支付
        wxPay: function (data, type) {
            jq.ajax({
                type: "get",
                url: urlRoot + data,
                success: function (response) {
                    wx.checkJsApi({
                        jsApiList: ['chooseWXPay'],
                        success: function (res) {
                            if (res.checkResult.chooseWXPay) {
                                wx.chooseWXPay({
                                    appId: response.appId,
                                    timestamp: response.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                    nonceStr: response.nonceStr, // 支付签名随机串，不长于 32 位
                                    package: response.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                    signType: response.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                    paySign: response.sgin, // 支付签名
                                    success: function (res) {
                                        $.hidePreloader();
                                        //支付成功, 跳转到我的订单页面
                                        if (type == "ticket") {
                                            $.router.load("../../order/ticket");
                                        } else if (type == "coupon") {
                                            $.router.load("../../order/coupon");
                                        }
                                    }
                                });
                            } else {
                                $.hidePreloader();
                                console.log("微信版本不支持支付接口或没有开启！");
                            }
                        },
                        error: function () {
                            $.hidePreloader();
                            console.log("调用 checkJsApi 接口时发生错误!");
                        }
                    });
                },
                error: function () {
                    $.hidePreloader();
                    alert("调用支付失败");
                }
            });
            setTimeout(function () {
                $.hidePreloader();
            }, 2000);
        },
        //初始化座位信息
        initSeat: function (data) {
            var $cart = jq('#selected-seats'),
                $counter = jq('#counter'),
                $total = jq('#total');

            function recalculateTotal(sc) {
                var total = 0;
                sc.find('selected').each(function () {
                    total += data.price;
                });

                return total.toFixed(2);
            }

            var sc = jq('#seat-map').seatCharts({
                map: JSON.parse(data.map),
                seats: {
                    a: {
                        price: data.price
                    },
                    b: {
                        classes: 'unavailable'
                    }
                },
                legend: {
                    node: jq('#legend'),
                    items: [
                        ['a', 'available', '可选'],
                        ['a', 'unavailable', '已售']
                    ]
                },
                naming: {
                    data: JSON.parse(data.map)
                },
                click: function () {
                    if (this.status() == 'available') {
                        jq('<li>' + (this.settings.row + 1) + '排' + this.settings.label + '座</li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .attr('position', this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);
                        $counter.text(sc.find('selected').length + 1);
                        $total.text((+recalculateTotal(sc) + data.price).toFixed(2));
                        return 'selected';
                    } else if (this.status() == 'selected') {
                        $counter.text(sc.find('selected').length - 1);
                        $total.text((+recalculateTotal(sc) - data.price).toFixed(2));
                        jq('#cart-item-' + this.settings.id).remove();
                        return 'available';
                    } else if (this.status() == 'unavailable') {
                        return 'unavailable';
                    } else {
                        return this.style();
                    }
                },
                focus: function () {
                    if (this.status() == 'available') {
                        return 'focused';
                    } else {
                        return this.style();
                    }
                },
                blur: function () {
                    return this.status();
                }
            });

            var list = jq("#seat-map").find(".unavailable"),
                seat_no = [];
            for (var i = 0; i < list.length; i++) {
                seat_no.push($(list[i]).attr("id"));
            }

            sc.get(seat_no).status('unavailable');
        },
        //初始化订单页面
        initPay: function () {
            var data = action.order;
            $(".cost_total").text(data["cost_total"]);
            $(".total").text(data["total"]);
            $(".posi03").css("backgroundImage", "url(" + data["showInfo"]["pic"] + ")");
            $(".pic").attr("src", data["showInfo"]["pic1"]);
            $(".name").text(data["showInfo"]["name"]);
            $(".time").text(data["time_name"]);
            $(".site").text(data["showInfo"]["site"]);
            $(".addr").text(data["showInfo"]["siteAddr"]);
            $(".num").text(data["num"]);
            var seat_list = [];
            data["list"].forEach(function (value) {
                seat_list.push('<p class="ubb padr text-center">');
                seat_list.push('<span class="pull-left">' + data["area_name"] + '</span>');
                seat_list.push(value);
                seat_list.push('<span class="pull-right">' + data["price"] + '元</span>');
                seat_list.push('</p>');
            });
            data["cost_total"] = data["total"];
            //是否有添加优惠券
            if (action.couponList.length != 0) {
                $(".coupon_num").text(action.couponList.length);
                action.couponList.forEach(function (value) {
                    data["cost_total"] -= +value["coupon_price"];
                });
                if (+data["cost_total"] <= 0) {
                    data["cost_total"] = 0;
                }
            } else {
                $(".coupon_num").text("0");
            }
            $(".cost_total").text(data["cost_total"].toFixed(2));
            $(".seat_list").html(seat_list.join(''));

        },
        //查看活动信息
        getDetail: function () {
            action.time = [];
            jq.ajax({
                type: "get",
                url: urlRoot + "/ActionNumGtCurTime/?state=1&action=" + action.pk,
                success: function (res) {
                    if (res.length == 0) {
                        $.toast("暂无该活动演出场次");
                        $.router.back();
                    } else if (res.length > 0) {
                        action.detailSuccess(res);
                    } else {
                        action.detailError();
                    }
                },
                error: function (err) {
                    action.detailError();
                }
            })
        },
        detailSuccess: function (res) {
            var data = action.info[action.index];
            $("#action_detail .pic").attr("src", data["pic1"]);
            $("#action_detail .posi01").css("background", "url(" + data["pic"] + ") no-repeat");
            $("#action_detail .name").text(data["name"]);
            $("#action_detail .addr").text(data["site"]);
            $("#action_detail .introduce").text(data["introduce"]);
            var show_time = [];
            res.forEach(function (value) {
                value["perform_date"] = value["perform_date"].replace(/[tz]/gi, " ").substring(0, 16);
                action.time.push(value);
                show_time.push(value["perform_date"]);
            });
            $("#action_detail .showtime").html(show_time.join("<br>"));
        },
        detailError: function () {
            $.toast("获取演出时间失败,请刷新重试!");
        },
        //获取演出场次
        getTime: function () {
            var time_list = "<option value='' selected>请选择场次</option>";
            action.time.forEach(function (value) {
                time_list += "<option value='" + value["pk"] +
                    "'>" + value["perform_date"] +
                    "</option>";
            });
            $("#choose_time").html(time_list);
        },
        //获取区域信息
        getArea: function (data) {
            $("#choose_area").html("");
            jq.ajax({
                type: "get",
                url: urlRoot + "/areaAndPrice/?pk=" + data,
                success: function (res) {
                    if (res.length != 0) {
                        action.areaSuccess(res);
                    } else {
                        action.areaError();
                    }
                },
                error: function (err) {
                    action.areaError();
                }
            })
        },
        areaSuccess: function (res) {
            var area_list = "<option value='' selected>请选择区域</option>";
            res.forEach(function (value) {
                area_list += "<option value='" + value["string2"] +
                    "' price='" + value["price"] +
                    "' pk='" + value["pk"] +
                    "'>" + value["name"] +
                    "&emsp;" + value["price"] +
                    "元</option>";
            });
            $("#choose_area").html(area_list);
        },
        areaError: function () {
            $.toast("获取区域失败,请刷新重试!");
        },
        //结算 座位票
        settleTicket: function (data) {
            jq.ajax({
                type: "post",
                url: urlRoot + "/buyTicket/",
                data: JSON.stringify(data),
                success: function (res) {
                    if (res["status"] == "10000") {
                        if (data["cost_total"] == 0) {
                            $.hidePreloader();
                            $.router.load("../../order/ticket");
                        } else {
                            action.time =
                                action.ticketSuccess(res);
                        }
                    } else if (res["status"] == "10001") {
                        var seat = res["seat_num"].split("_");
                        $.hidePreloader();
                        $.toast(seat[0] + "排" + seat[1] + "号 座位已经被预定...");
                        $.router.load("../../action/chooseSeat");
                    } else {
                        $.hidePreloader();
                        $.toast("提交订单失败");
                    }
                },
                error: function (err) {
                    $.hidePreloader();
                    $.toast("提交订单失败");
                }
            })
        },
        ticketSuccess: function (res) {
            var data = '/wechat/unifiedorder/?orderNo='
                + res["order_no"] + "&body=买票款项&detail=汝来支付&attach=汝来票券&payprice=" + res["total_price"];
            action.wxPay(data, "ticket");
        },
        //支付成功
        orderSuccess: function () {
            var data = action.order;
            $(".order_id").text(data["order_id"]);
            $(".name").text(data["showInfo"]["name"]);
            $(".site").text(data["showInfo"]["site"]);
            $(".addr").text(data["showInfo"]["siteAddr"]);
            $(".time").text(data["time_name"]);
            $(".area").text(data["area_name"].substring(0, 3));
            $(".position").text(data["list"].join("&emsp;"));
            $(".total").text(data["total"]);
            $(".num").text(data["num"]);
            $(".pic_code").attr("src", data["pic_code"]);
            //action.order = {};
        },
        //结算 优惠券
        settleCoupon: function (data) {
            jq.ajax({
                type: "post",
                url: urlRoot + "/buyCoupon/",
                data: JSON.stringify(data),
                success: function (res) {
                    if (res["order_no"]) {
                        action.couponSuccess(res);
                    } else {
                        $.hidePreloader();
                        $.toast("购买失败.请重试");
                    }
                },
                error: function (err) {
                    $.hidePreloader();
                    $.toast("购买失败.请重试");
                }
            })
        },
        couponSuccess: function (res) {
            var data = '/wechat/unifiedorder/?orderNo='
                + res["order_no"] + "&body=优惠券款项&detail=汝来支付&attach=汝来优惠券&payprice=" + res["total_price"];
            action.wxPay(data, "coupon");
        },
        //显示优惠券信息
        showCoupon: function () {
            action.couponList = [];
            $(".coupon_list").html('');
            var actionnum = action.order["time"];
            if (actionnum) {
                jq.ajax({
                    type: "get",
                    url: urlRoot + "/coupons/?state=0&actionnum=" + actionnum,
                    success: function (res) {
                        action.showCouponSuccess(res);
                    },
                    error: function () {
                        $.toast("获取优惠券码失败,请重新进入");
                        $.router.back();
                    }
                });
            } else {
                $.toast("获取优惠券码失败,请重新进入");
                $.router.back();
            }
        },
        showCouponSuccess: function (res) {
            if (res.length != 0) {
                var coupon = [];
                res.forEach(function (value) {
                    var card = [
                        '<li class="item-content">',
                        '<label class="item-inner">',
                        '<input type="checkbox" name="coupon">',
                        '<div class="item-title">',
                        '<span class="pk">' + value["pk"] + '</span>:&ensp;',
                        '编号:<span class="coupon_no">' + value["coupon_no"] + '</span>&ensp;',
                        '面额:<span class="coupon_money">' + value["coupon_price"] + '</span>',
                        '</div>',
                        '</label>',
                        '</li>'
                    ].join("");
                    coupon.push(card);
                });
                console.log(coupon.join(""));
                $(".coupon_list").html(coupon.join(""));
                //绑定选择事件
                $("label.item-inner").off("change").on("change", function (e) {
                    var pk = jq(e.target).next().find(".pk").text();
                    if (jq(e.target).prop("checked")) {
                        var money = jq(e.target).next().find(".coupon_money").text();
                        var no = jq(e.target).next().find(".coupon_no").text();
                        action.couponList.push({
                            "pk": pk,
                            "coupon_no": no,
                            "coupon_price": money
                        });
                    } else {
                        action.couponList = action.couponList.filter(function (value) {
                            if (value["pk"] != pk) {
                                return value;
                            }
                        })
                    }
                });
            } else {
                $.toast('你还没有任何优惠券哟！');
                $(".coupon_list").html("");
            }
        },
        //添加/使用优惠券
        useCoupon: function (data) {
            $.showPreloader('正在验证优惠券...');
            var coupon = {
                "coupon_no": data,
                "actionnum_id": action["order"]["time"]
            };
            jq.ajax({
                type: "post",
                url: urlRoot + "/checkCoupon/",
                data: JSON.stringify(coupon),
                success: function (res) {
                    if (res["status"] == 0) {
                        $.toast("添加优惠券码成功");
                        var card = [
                            '<li class="item-content">',
                            '<label class="item-inner">',
                            '<input type="checkbox" checked>',
                            '<div class="item-title">',
                            '编号:<span class="coupon_no">' + res["coupon_no"] + '</span>&ensp;',
                            '面额:<span class="coupon_money">' + res["coupon_price"] + '</span>',
                            '</div>',
                            '</label>',
                            '</li>'
                        ].join("");
                        $(".tip").addClass("hide");
                        $(".coupon_list").append(card);
                        action.couponList.push(res);
                    } else if (res["status"] == 1) {
                        $.toast("优惠券码场次不匹配,请重新输入");
                    } else if (res["status"] == 2) {
                        $.toast("优惠券码已使用,请重新输入");
                    } else {
                        $.toast("优惠券码无效,请重新输入");
                    }
                    $.hidePreloader();
                },
                error: function () {
                    $.toast("优惠券码无效,请重新输入");
                    $.hidePreloader();
                }
            })
        },
        //绑定事件
        bindEvents: function () {
            $("#choose_time").off("change").on("change", function () {
                var $select = $("#choose_time").val();
                $("#seat-map").addClass("hide").html("");
                $('#selected-seats').html("");
                $('#counter').text("0");
                $('#total').text("0");
                if (!!$select) {
                    action.getArea($select);
                } else {
                    $.toast("请选择场次");
                    $("#choose_area").html("");
                    $("#seat-map").html("");
                    $("#legend").html("");
                    $('#selected-seats').html("");
                    $('#counter').text("");
                    $('#total').text("0");
                    $("#selected-coupon").html("");
                    $("#counter_total").text("0");
                    $("#coupon_num").val("");
                    $("#coupon_total").text("0");
                }
            });
            $("#choose_area").off("change").on('change', function () {
                var time = $("#choose_time").val();
                if (!time) {
                    $.toast("请先选择场次");
                    $("#choose_time").selectedIndex = 0;
                    return;
                }
                var $select = jq("#choose_area :selected").val();
                $("#seat-map").addClass("hide").html("");
                $('#selected-seats').html("");
                $('#counter').text("0");
                $('#total').text("0");
                $("#coupon_num").val("");
                if (!!$select) {
                    var data = {
                        map: $select,
                        price: +jq("#choose_area :selected").attr("price")
                    };
                    $("#seat-map").removeClass("hide");
                    action.initSeat(data);
                } else {
                    $.toast("请选择区域");
                }
            });
            $(".buy_coupon").off("click").on("click", function () {
                var time_name = jq("#choose_time option:selected").html(),
                    time = jq("#choose_time :selected").val(),
                    area_name = jq("#choose_area option:selected").html(),
                    area = jq("#choose_area :selected").attr("pk"),
                    price = jq("#choose_area :selected").attr("price"),
                    num = jq("#coupon_num").val(),
                    total = +jq("#counter_total").text() || 0,
                    coupon = +jq("#coupon_total").text() || 0;
                if (!time) {
                    $.toast("请选择场次");
                } else if (!area) {
                    $.toast("请选择区域");
                } else if (!num || num <= 0) {
                    $.toast("请输入大于0的整字");
                } else {
                    var $cart = $("#selected-coupon");
                    $('<li><a class="create-actions">场次:' + time_name + '&emsp;区域:' + area_name + '&emsp;张数:' + num + '</a></li>')
                        .attr('time', time)
                        .attr('area', area)
                        .attr('num', num)
                        .attr('price', price)
                        .appendTo($cart);
                    total += +num;
                    coupon += +price * +num;
                    jq("#counter_total").text(total);
                    jq("#coupon_total").text(coupon.toFixed(2));
                    //添加删除事件
                    $(".create-actions").off("click").on('click', function (e) {
                        var buttons1 = [
                            {
                                text: '删除',
                                bold: true,
                                color: 'danger',
                                onClick: function () {
                                    var node = $(e.target).parent(),
                                        money = node.attr("price"),
                                        coupon_num = node.attr("num");
                                    total -= +coupon_num;
                                    coupon -= +money * +coupon_num;
                                    jq("#counter_total").text(total);
                                    jq("#coupon_total").text(coupon.toFixed(2));
                                    node.remove();
                                }
                            }
                        ];
                        var buttons2 = [
                            {
                                text: '取消',
                                bg: 'danger'
                            }
                        ];
                        var groups = [buttons1, buttons2];
                        $.actions(groups);
                    });
                }
            });
            $(".settle_coupon").off("click").on("click", function () {
                var lis = $("#selected-coupon li");
                if (lis.length == 0) {
                    $.toast("购买券卡不能为空");
                    return;
                }
                var list = [];
                lis.forEach(function (value) {
                    var num = $(value).attr("num").toString();
                    for (var i = 0; i < +num; i++) {
                        list.push({
                            "action_num_id": $(value).attr("time").toString(),
                            "area_id": $(value).attr("area").toString()
                        });
                    }
                });
                $.showPreloader('正在请求支付,请稍等...');
                action.settleCoupon(list);
            });
            $(".settle_ticket").off("click").on("click", function () {
                var time_name = jq("#choose_time option:selected").html(),
                    time = jq("#choose_time :selected").val(),
                    area_name = jq("#choose_area option:selected").html(),
                    area = jq("#choose_area :selected").attr("pk"),
                    price = jq("#choose_area :selected").attr("price"),
                    num = jq("#counter").text(),
                    total = +jq("#total").text();
                var lis = $("#selected-seats li");
                var list = [], list_position = [];
                lis.forEach(function (value) {
                    list.push($(value).html());
                    list_position.push($(value).attr("position").toString());
                });
                if (list.length == 0) {
                    $.toast("请先选择座位");
                } else {
                    action.order = {
                        showInfo: action.info[action.index],
                        time_name: time_name,
                        time: time,
                        area_name: area_name,
                        area: area,
                        price: price,
                        num: num,
                        total: total,
                        cost_total: total,
                        list: list,
                        list_position: list_position
                    };
                    $.router.load("../action/indent/");
                }
            });
            $(".prompt-ok").off("click").on("click", function () {
                $.prompt('请输入优惠码:', function (value) {
                    action.useCoupon(value.trim());
                });
            });
            $(".pay_order").off("click").on("click", function () {
                var data = {
                    "coupon": [],
                    "selgift": [],
                    "ticket": [],
                    "cost_total": 0
                };
                var list_position = action.order.list_position,
                    time = action.order["time"],
                    area = action.order["area"],
                    cost = action.order["cost_total"],
                    ticket = [];
                list_position.forEach(function (value) {
                    ticket.push({
                        "action_num_id": time,
                        "area_id": area,
                        "seat_num": value
                    });
                });
                data.ticket = ticket;
                if (action.couponList.length != 0) {
                    var coupon = [];
                    action.couponList.forEach(function (value) {
                        coupon.push({"pk": value["pk"]});
                    });
                    data.coupon = coupon;
                }
                data.cost_total = cost;
                $.showPreloader('正在请求支付,请稍等...');
                action.settleTicket(data);
            });
        },
        //重置信息
        reset: function () {
            $("#seat-map").addClass("hide").html("");
            $("#choose_area").html("");
            $("#choose_time").html("");
            $("#legend").html("");
            $('#selected-seats').html("");
            $('#counter').text("");
            $('#total').text("0");
            $("#selected-coupon").html("");
            $("#counter_total").text("0");
            $("#coupon_num").val("");
            $("#coupon_total").text("0");
        }
    };

    //收货地址
    var address = {
        //获取收货地址
        getAllAddress: function () {
            jq.ajax({
                type: "get",
                url: urlRoot + "/deliveraddrs/",
                success: function (res) {
                    if (res) {
                        address.getAddressSuccess(res);
                    } else {
                        address.getAddressError();
                    }
                },
                error: function (err) {
                    address.getAddressError();
                }
            })
        },
        getAddressSuccess: function (res) {
            if (res) {
                $(".name").text(res[0]["relationpeople"]);
                $(".phone").text(res[0]["iphone"]);
                $(".addr").text(res[0]["deliver_addr"]);
                $(".address_list").removeClass("hide");
            }
        },
        getAddressError: function () {
            var html = [
                '<button class="button button-warning get_address_error widthAll mart1">',
                '页面加载失败,请点击重新加载页面',
                '</button>'
            ].join("");
            $(".address_list").removeClass("hide").html(html);
            this.bindEvents();
        },
        //初始化地址组件
        initCity: function () {
            $(".city-picker").cityPicker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">选择收货地址</h1>\
                </header>'
            });
        },
        //添加地址
        addAddress: function (data) {
            jq.ajax({
                type: "post",
                url: urlRoot + "/addDeliverAddr/",
                data: JSON.stringify(data),
                success: function (res) {
                    if (res["status"] == "success") {
                        $.toast('添加地址成功');
                        $.router.back();
                    } else if (res["status"] == "relogin") {
                        $.toast('请退出重新登录');
                    }
                    else {
                        $.toast('添加地址失败,请重试');
                    }
                },
                error: function (err) {
                    $.toast('添加地址失败,请重试');
                }
            })
        },
        //删除地址
        deleteAddress: function (data) {
            jq.ajax({
                type: "get",
                url: urlRoot + "/deleteDeliverAddr/",
                data: data,
                success: function (res) {
                    if (res["status"] == "success") {
                        $.toast('删除地址成功');
                        address.getAllAddress();
                    } else if (res["status"] == "relogin") {
                        $.toast('请退出重新登录');
                        $.router.load("index");
                    }
                    else {
                        $.toast('删除地址失败,请重试');
                    }
                },
                error: function (err) {
                    $.toast('删除地址失败,请重试');
                }
            })
        },
        //绑定事件
        bindEvents: function () {
            $(".get_address_error").off("click").on("click", function () {
                address.getAllAddress();
            });
            $(".save_address").off("click").on("click", function () {
                var data = {
                    relationpeople: $("#addAddress .name").val(),
                    iphone: $("#addAddress .phone").val(),
                    deliver_addr: $("#addAddress .city-picker").val() + $("#addAddress .addrDetail").val()
                };
                if (data.iphone.length != 11) {
                    $.toast("请填写11位手机号码");
                } else if (data.relationpeople && data.iphone && data.deliver_addr) {
                    address.addAddress(data);
                } else {
                    $.toast("请填写所有数据");
                }
            });
            $(".delete_address").off("click").on("click", function (e) {
                $.confirm("确认该收货地址?", function () {
                    address.deleteAddress();
                });
            })
        }
    };

    //我的订单
    var order = {
        //获取所有订单
        getAllOrder: function () {
            jq.ajax({
                type: "get",
                url: urlRoot + "/WxOrderByUser/",
                success: function (res) {
                    if (res) {
                        order.orderSuccess(res);
                    } else {
                        order.orderError();
                    }
                },
                error: function (err) {
                    order.orderError();
                }
            });
            setTimeout(function () {
                $.hidePreloader();
            }, 5000);
        },
        orderSuccess: function (res) {
            var ul_list = $("#order .order_list"), list = [];
            ul_list.html("");
            if (res.length == 0) {
                var data = [
                    '<li class="card">',
                    '<div class="card-content">',
                    '<div class="card-content-inner">',
                    '<p class="l_height" style="text-align: center">您还未完成订单</p>',
                    '</div>',
                    '</div>',
                    '</li>'
                ].join((""));
                list.push(data);
            } else {
                res.sort(function (pre, next) {
                    return next["pk"] - pre["pk"]
                });

                res.forEach(function (value) {
                    value["state"] = value["state"] == "1" ? "交易成功" : "交易未完成";
                    value["type"] = value["type"] == "1" ? "座位票" : "优惠券";
                    value["time"] = value["detail"][0]["actionnumjson"]["perform_date"].replace(/[T]/gi, " ");

                    var data = [
                        '<li class="card">',
                        '<div class="card-header">',
                        '<span class="hong">' + value["state"] + '</span>',
                        '</div>',
                        '<div class="card-content">',
                        '<div class="card-content-inner">',
                        '<p class="l_height">演出:' + value["detail"][0]["actionjson"]["name"] + '</p>',
                        '<p class="l_height">场馆:' + value["detail"][0]["actionjson"]["site"] + '</p>',
                        '<p class="l_height">区域:' + value["detail"][0]["areajson"]["name"] + '</p>',
                        '<p class="l_height">时间:' + value["time"] + '</p>',
                        '<p class="l_height">总价:' + value["real_price"] + '元</p>',
                        '<p class="l_height">类型:' + value["type"] + '</p>',
                        '<p class="l_height">票数:' + value["detail"].length + '张</p>',
                        '</div>',
                        '</div>',
                        '</li>'
                    ].join((""));
                    list.push(data);
                });
            }
            ul_list.html(list.join(""));
            $.hidePreloader();
        },
        orderError: function () {
            var html = [
                '<button class="button button-warning order_error widthAll mart1">',
                '页面加载失败,请点击重新加载页面',
                '</button>'
            ].join("");
            $(".order_list").html(html);
            $.hidePreloader();
            order.bindEvents();
        },
        //获取所有已购买的票务
        getAllTicket: function () {
            $.showPreloader();
            jq(".ticketList").html("");
            jq.ajax({
                type: "get",
                url: urlRoot + "/usertickets/",
                success: function (res) {
                    if (res) {
                        order.ticketSuccess(res);
                    } else {
                        order.ticketError();
                    }
                },
                error: function (err) {
                    order.ticketError();
                }
            });
            setTimeout(function () {
                $.hidePreloader();
            }, 5000);
        },
        ticketSuccess: function (res) {
            var ul_list = jq(".ticketList"), list = [];
            if (res.length == 0) {
                var data = [
                    '<li class="card">',
                    '<div class="card-content">',
                    '<div class="card-content-inner">',
                    '<p class="l_height" style="text-align: center">您还未购买座位</p>',
                    '</div>',
                    '</div>',
                    '</li>'
                ].join((""));
                list.push(data);
            } else {
                res.sort(function (pre, next) {
                    return next["pk"] - pre["pk"]
                });
                res.forEach(function (value) {
                    value["actionnumjson"]["perform_date"] = value["actionnumjson"]["perform_date"].replace(/[tz]/gi, " ");
                    value["state"] = value["state"] == "0" ? "未使用" : "已使用";
                    value["seat_num"] = value["seat_num"].split("_")[0] + "排" + value["seat_num"].split("_")[1] + "号";
                    var data = [
                        '<li class="card demo-card-header-pic">',
                        '<div valign="bottom" class="card-header color-white no-border no-padding">',
                        '<img class="card-cover" src="' + urlRoot + "/" + value["twodimension_pic"] + '">',
                        '</div>',
                        '<div class="card-content">',
                        '<div class="card-content-inner">',
                        '<p class="l_height">演出名:' + value["actionjson"]["name"] + '</p>',
                        '<p class="l_height">场馆:' + value["actionjson"]["site"] + '</p>',
                        '<p class="l_height">演出时间:' + value["actionnumjson"]["perform_date"] + '</p>',
                        '<p class="l_height">区域:' + value["areajson"]["name"] + '</p>',
                        '<p class="l_height">座位号:' + value["seat_num"] + '</p>',
                        '<p class="l_height">使用状态:<span class="hong">' + value["state"] + '</span></p>',
                        '</div>',
                        '</div>',
                        '</li>'
                    ].join((""));
                    list.push(data);
                });
            }
            ul_list.html(list.join(""));
            $.hidePreloader();
        },
        ticketError: function () {
            var html = [
                '<button class="button button-warning ticket_error widthAll mart1">',
                '页面加载失败,请点击重新加载页面',
                '</button>'
            ].join("");
            jq(".ticket_list").html(html);
            $.hidePreloader();
            order.bindEvents();
        },
        //获取所有已购买的优惠券
        getAllCoupon: function () {
            $.showPreloader();
            jq(".couponList").html("");
            jq.ajax({
                type: "get",
                url: urlRoot + "/coupons/",
                success: function (res) {
                    if (res) {
                        order.couponSuccess(res);
                    } else {
                        order.couponError();
                    }
                },
                error: function (err) {
                    order.couponError();
                }
            });
            setTimeout(function () {
                $.hidePreloader();
            }, 5000);
        },
        couponSuccess: function (res) {
            var ul_list = jq(".couponList"), list = [];
            if (res.length == 0) {
                var data = [
                    '<li class="card">',
                    '<div class="card-content">',
                    '<div class="card-content-inner">',
                    '<p class="l_height" style="text-align: center">您还未购买优惠券</p>',
                    '</div>',
                    '</div>',
                    '</li>'
                ].join((""));
                list.push(data);
            } else {
                res.sort(function (pre, next) {
                    return next["pk"] - pre["pk"]
                });
                res.forEach(function (value) {
                    value["actionnum"]["perform_date"] = value["actionnum"]["perform_date"].replace(/[tz]/gi, " ");
                    value["state"] = value["state"] == "0" ? "未使用" : "已使用";
                    var data = [
                        '<li class="card">',
                        '<div class="card-content">',
                        '<div class="card-content-inner">',
                        '<p class="l_height">演出名:' + value["action"]["name"] + '</p>',
                        '<p class="l_height">场馆:' + value["action"]["site"] + '</p>',
                        '<p class="l_height">演出时间:' + value["actionnum"]["perform_date"] + '</p>',
                        '<p class="l_height">优惠码:' + value["coupon_no"] + '</p>',
                        '<p class="l_height">面额:' + value["coupon_price"] + '元</p>',
                        '<p class="l_height">使用状态:<span class="hong">' + value["state"] + '</span></p>',
                        '</div>',
                        '</div>',
                        '</li>'
                    ].join((""));
                    list.push(data);
                });
            }
            ul_list.html(list.join(""));
            $.hidePreloader();
        },
        couponError: function () {
            var html = [
                '<button class="button button-warning coupon_error widthAll mart1">',
                '页面加载失败,请点击重新加载页面',
                '</button>'
            ].join("");
            jq(".coupon_list").html(html);
            $.hidePreloader();
            order.bindEvents();
        },
        //绑定事件
        bindEvents: function () {
            $(".order_error").off("click").on("click", function () {
                order.getAllOrder();
            });
            $(".ticket_error").off("click").on("click", function () {
                order.getAllTicket();
            });
            $(".coupon_error").off("click").on("click", function () {
                order.getAllCoupon();
            });
        }
    };

    $.init();
});