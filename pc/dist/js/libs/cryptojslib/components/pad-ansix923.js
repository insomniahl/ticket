/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.pad.AnsiX923={pad:function(s,i){var t=s.sigBytes,a=4*i,n=a-t%a,d=t+n-1;s.clamp(),s.words[d>>>2]|=n<<24-d%4*8,s.sigBytes+=n},unpad:function(s){var i=255&s.words[s.sigBytes-1>>>2];s.sigBytes-=i}};