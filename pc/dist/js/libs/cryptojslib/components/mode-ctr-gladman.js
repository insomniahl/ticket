/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.mode.CTRGladman=function(){function r(r){if(255===(r>>24&255)){var e=r>>16&255,t=r>>8&255,i=255&r;255===e?(e=0,255===t?(t=0,255===i?i=0:++i):++t):++e,r=0,r+=e<<16,r+=t<<8,r+=i}else r+=1<<24;return r}function e(e){return 0===(e[0]=r(e[0]))&&(e[1]=r(e[1])),e}var t=CryptoJS.lib.BlockCipherMode.extend(),i=t.Encryptor=t.extend({processBlock:function(r,t){var i=this._cipher,o=i.blockSize,n=this._iv,c=this._counter;n&&(c=this._counter=n.slice(0),this._iv=void 0),e(c);var s=c.slice(0);i.encryptBlock(s,0);for(var l=0;l<o;l++)r[t+l]^=s[l]}});return t.Decryptor=i,t}();