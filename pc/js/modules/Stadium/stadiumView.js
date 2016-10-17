/**
 * Created by insomniahl on 16/7/27.
 */
define(['../Stadium/stadiumManager/stadiumManagerView',
        '../Stadium/stadiumIntroduce/stadiumIntroduceView',
        'jquery', 'backbone'],
    function (stadiumManagerView, stadiumIntroduceView, jquery, Backbone) {
        var subviews = {
            "stadium-manager": stadiumManagerView,
            "stadium-introduce": stadiumIntroduceView
        };
        var stadiumView = Backbone.View.extend({
            render: function () {
                if (this.id) {
                    var subview = new subviews[this.id]();
                    subview.render();
                    $(this.el).append(subview.el);
                }
                return this;
            }
        });
        return stadiumView;
    });