/**
 * Created by insomniahl on 16/7/27.
 */
define(['jquery',
        'modules/Stadium/stadiumView',
        'modules/Show/showView',
        'modules/DataManager/dataManagerView',
        'modules/Coupon/couponView',
        'modules/User/userView',
        'underscore',
        'backbone'
    ],
    function ($, stadiumView, showView, dataManagerView, couponView, userView, Underscore, Backbone) {
        var Router = Backbone.Router.extend({
            routes: {
                '': 'Data',
                'data': 'Data',
                'show(/:optional)': 'Show',
                'stadium(/:optional)': 'Stadium',
                'coupon(/:optional)': 'Coupon',
                'user(/:optional)': 'User'
            },
            firstPage: true,

            Show: function (submenu) {
                if (submenu) {
                    this.changePage(new showView({id: submenu}), submenu);
                }
                else {
                    this.changePage(new showView());
                }
            },
            Stadium: function (submenu) {
                if (submenu) {
                    this.changePage(new stadiumView({id: submenu}), submenu);
                }
                else {
                    this.changePage(new stadiumView());
                }
            },
            Data: function (submenu) {
                this.changePage(new dataManagerView(), "data");
            },
            Coupon: function (submenu) {
                if (submenu) {
                    this.changePage(new couponView({id: submenu}), submenu);
                }
                else {
                    this.changePage(new couponView());
                }
            },
            User: function (submenu) {
                if (submenu) {
                    this.changePage(new userView({id: submenu}), submenu);
                }
                else {
                    this.changePage(new userView());
                }
            },
            changePage: function (view, submenu) {
                if(!sessionStorage.getItem("pk")){
                    window.location.href = "login.html";
                }

                $.ajaxSetup({
                    xhrFields: {
                        withCredentials: true
                    },
                    //crossDomain: true,
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.code == '604') {
                            alert('当前用户已登录！');
                            //window.location.href = 'http://121.199.12.252:8082/login/';
                            return;
                        }
                        switch (jqXHR.status) {
                            case(500):
                                alert("服务器系统内部错误");
                                break;
                            case(401):
                                alert("未登录");
                                window.location.href = "login.html";
                                break;
                            case(403):
                                alert("无权限执行此操作");
                                break;
                            case(408):
                                alert("请求超时");
                                break;
                            case(404):
                                var res = $.parseJSON(jqXHR.responseText);
                                if (res.code == '605') {
                                    alert(res.message);
                                    window.location.href = "login.html";
                                    return;
                                }
                            default:
                        }
                    }
                });

                view.render();
                $('.main-box').html($(view.el));

                //修改菜单状态
                $("ul.menu li").removeClass("active");
                $("li." + submenu).addClass("active");
            }
        });
        return Router;
    }
);
