/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.pad.ZeroPadding={pad:function(s,a){var i=4*a;s.clamp(),s.sigBytes+=i-(s.sigBytes%i||i)},unpad:function(s){for(var a=s.words,i=s.sigBytes-1;!(a[i>>>2]>>>24-8*(i%4)&255);)i--;s.sigBytes=i+1}};