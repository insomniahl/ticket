/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.pad.AnsiX923={pad:function(s,i){var t=s.sigBytes,n=4*i,n=n-t%n,t=t+n-1;s.clamp(),s.words[t>>>2]|=n<<24-8*(t%4),s.sigBytes+=n},unpad:function(s){s.sigBytes-=255&s.words[s.sigBytes-1>>>2]}};