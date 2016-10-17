/**
 * Created by insomniahl on 16/7/27.
 */
define(['../User/userList/userListView',
        '../User/managerList/managerListView',
        'jquery', 'backbone'],
    function (userListView, managerListView, jquery, Backbone) {
        var subviews={
            "user-list": userListView,
            "manager-list": managerListView
        };
        var userView = Backbone.View.extend({
            render: function () {
                if (this.id) {
                    var subview = new subviews[this.id]();
                    subview.render();
                    $(this.el).append(subview.el);
                }
                return this;
            }
        });
        return userView;
    });