/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.mode.OFB=function(){var e=CryptoJS.lib.BlockCipherMode.extend(),r=e.Encryptor=e.extend({processBlock:function(e,r){var t=this._cipher,i=t.blockSize,o=this._iv,c=this._keystream;for(o&&(c=this._keystream=o.slice(0),this._iv=void 0),t.encryptBlock(c,0),t=0;t<i;t++)e[r+t]^=c[t]}});return e.Decryptor=r,e}();