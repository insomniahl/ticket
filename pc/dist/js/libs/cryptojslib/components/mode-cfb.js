/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.mode.CFB=function(){function e(e,i,c,r){var o=this._iv;if(o){var t=o.slice(0);this._iv=void 0}else var t=this._prevBlock;r.encryptBlock(t,0);for(var l=0;l<c;l++)e[i+l]^=t[l]}var i=CryptoJS.lib.BlockCipherMode.extend();return i.Encryptor=i.extend({processBlock:function(i,c){var r=this._cipher,o=r.blockSize;e.call(this,i,c,o,r),this._prevBlock=i.slice(c,c+o)}}),i.Decryptor=i.extend({processBlock:function(i,c){var r=this._cipher,o=r.blockSize,t=i.slice(c,c+o);e.call(this,i,c,o,r),this._prevBlock=t}}),i}();