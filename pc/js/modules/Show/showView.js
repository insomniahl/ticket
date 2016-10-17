/**
 * Created by insomniahl on 16/7/27.
 */
define(['../Show/showArea/showAreaView',
        '../Show/showList/showListView',
        //'../Show/showScreen/showScreenView',
        'jquery', 'backbone'],
    function (showAreaView, showListView, jquery, Backbone) {
        var subviews = {
            "show-area": showAreaView,
            "show-list": showListView,
            //"show-screen": showScreenView
        };
        var personalView = Backbone.View.extend({
            render: function () {
                if (this.id) {
                    var subview = new subviews[this.id]();
                    subview.render();
                    $(this.el).append(subview.el);
                }
                return this;
            }
        });
        return personalView;
    });
