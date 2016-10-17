/**
 * Created by insomniahl on 16/7/27.
 */
require.config({
    paths: {
        'jquery': "libs/jqueryjs/jquery",
        'underscore': 'libs/underscore/underscore-min',
        'backbone': 'libs/backbone/backbone',
        'txt': 'libs/require-text/text',
        'bootstrap': 'libs/bootstrap/js/bootstrap',
        'bootstrapTable': 'libs/bootstrapTable/bootstrap-table',
        'aes': 'libs/cryptojslib/rollups/amdAes',
        'base64': 'libs/base64',
        'md5': 'libs/cryptojslib/rollups/amdMD5',
        'chosen': 'libs/chosen/chosen.jquery'
    },
    shim: {
        'bootstrap': ['jquery'],
        'bootstrapTable': ['bootstrap'],
        'chosen': ['jquery']
    }
});

require(['config', 'jquery', 'underscore', 'backbone', 'router', 'aes', 'base64', 'md5'], function (config, $, Underscore, Backbone, router, aes, base64, md5) {
    $(function () {
        window.token = '';
        window.router = new router();
        Backbone.history.start();
        var that = this;

        //处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
        function banBackSpace(e) {
            var ev = e || window.event;//获取event对象
            var obj = ev.target || ev.srcElement;//获取事件源
            var name = obj.nodeName.toLowerCase();//获取事件源类型
            //获取作为判断条件的事件类型
            var vReadOnly = obj.readOnly;
            var vDisabled = obj.disabled;
            //处理undefined值情况
            vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
            vDisabled = (vDisabled == undefined) ? true : vDisabled;
            //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
            //并且readOnly属性为true或disabled属性为true的，则退格键失效
            var flag1 = ev.keyCode == 8 && ( name == 'input' || name == "textarea") && (vReadOnly == true || vDisabled == true);
            //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
            var flag2 = ev.keyCode == 8 && name != 'input' && name != "textarea";
            //判断
            if (flag2 || flag1)return false;
        }

        //禁止退格键 作用于Firefox、Opera
        document.onkeypress = banBackSpace;
        //禁止退格键 作用于IE、Chrome
        document.onkeydown = banBackSpace;

        //登出
        $('.loginOut').on('click', function () {
            if (confirm('确认登出？')) {
                $.ajax({
                    type: "get",
                    url: "http://tk.jetcloudtech.com/backendLogout/",
                    success: function (res) {
                        if (res) {
                            sessionStorage.clear();
                            window.location.href = "login.html";
                        } else {
                            alert("退出失败,请重试!");
                        }
                    },
                    error: function (err) {
                        alert("退出失败,请重试!");
                    }
                })

            }
        });
    });
});