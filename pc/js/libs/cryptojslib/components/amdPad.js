/**
 * Created by xzx on 2016/5/4.
 */
define(function () {
    window.CryptoJS.pad.ZeroPadding = {
        pad: function (a, c) {
            var b = 4 * c;
            a.clamp();
            a.sigBytes += b - (a.sigBytes % b || b)
        }, unpad: function (a) {
            for (var c = a.words, b = a.sigBytes - 1; !(c[b >>> 2] >>> 24 - 8 * (b % 4) & 255);)b--;
            a.sigBytes = b + 1
        }
    };
})

