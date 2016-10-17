/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.mode.CTR=function(){var e=CryptoJS.lib.BlockCipherMode.extend(),o=e.Encryptor=e.extend({processBlock:function(e,o){var r=this._cipher,t=r.blockSize,i=this._iv,c=this._counter;for(i&&(c=this._counter=i.slice(0),this._iv=void 0),i=c.slice(0),r.encryptBlock(i,0),c[t-1]=c[t-1]+1|0,r=0;r<t;r++)e[o+r]^=i[r]}});return e.Decryptor=o,e}();