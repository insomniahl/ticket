/**
 * Created by insomniahl on 16/10/10.
 */
({
    //配置文件目录
    mainConfigFile: './js/main.js',
    //项目目录，相对于参数文件的位置
    appDir: './',
    //js文件位置
    baseUrl: './js',
    //输出目录
    dir: './dist',
    //一个包含对象的数组，每个对象就是一个要被优化的模块
    modules: [
        {
            name: "main",
            exclude: ['jquery', 'modules/Coupon/couponView', 'modules/DataManager/dataManagerView', 'modules/Show/showView', 'modules/Stadium/stadiumView', 'modules/User/userView']
        },
        {
            name: 'almond'
        },
        {name: 'modules/Coupon/couponView', exclude: ['jquery']},
        {name: 'modules/DataManager/dataManagerView', exclude: ['jquery']},
        {name: 'modules/Show/showView', exclude: ['jquery']},
        {name: 'modules/Stadium/stadiumView', exclude: ['jquery']},
        {name: 'modules/User/userView', exclude: ['jquery']}
    ],
    //合并后的原文件将不保留在输出目录中
    removeCombined: true,
    //寻找require()里面的require或define调用的依赖
    findNestedDependencies: true,
    //凡是匹配这个正则表达式的文件名，都不会被拷贝到输出目录
    fileExclusionRegExp: /^(r|buildjs|server)\.js|\.gitignore|\.git|\.idea$/,
    //自动压缩CSS文件，值“none”,“standard”,“standard.keepLines”,“standard.keepComments”,“standard.keepComments.keepLines”
    optimizeCss: 'standard',
    paths: {
        'jquery': "libs/jqueryjs/jquery",
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone-min',
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
})