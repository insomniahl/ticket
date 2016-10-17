/**
 * Created by insomniahl on 16/7/27.
 */
define(['../Coupon/couponPublish/couponPublishView',
        '../Coupon/couponList/couponListView',
        'jquery', 'backbone'],
    function (couponPublishView, couponListView, jquery, Backbone) {
        var subviews={
            "coupon-publish": couponPublishView,
            "coupon-list": couponListView
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