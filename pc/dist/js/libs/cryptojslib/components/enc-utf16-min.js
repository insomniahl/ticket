/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){var r=CryptoJS,t=r.lib.WordArray,r=r.enc;r.Utf16=r.Utf16BE={stringify:function(r){var t=r.words;r=r.sigBytes;for(var n=[],o=0;o<r;o+=2)n.push(String.fromCharCode(t[o>>>2]>>>16-8*(o%4)&65535));return n.join("")},parse:function(r){for(var n=r.length,o=[],e=0;e<n;e++)o[e>>>1]|=r.charCodeAt(e)<<16-16*(e%2);return t.create(o,2*n)}},r.Utf16LE={stringify:function(r){var t=r.words;r=r.sigBytes;for(var n=[],o=0;o<r;o+=2)n.push(String.fromCharCode((t[o>>>2]>>>16-8*(o%4)&65535)<<8&4278255360|(t[o>>>2]>>>16-8*(o%4)&65535)>>>8&16711935));return n.join("")},parse:function(r){for(var n=r.length,o=[],e=0;e<n;e++){var a=o,f=e>>>1,i=a[f],s=r.charCodeAt(e)<<16-16*(e%2);a[f]=i|s<<8&4278255360|s>>>8&16711935}return t.create(o,2*n)}}}();