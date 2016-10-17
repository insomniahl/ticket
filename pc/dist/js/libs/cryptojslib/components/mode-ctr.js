/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.mode.CTR=function(){var r=CryptoJS.lib.BlockCipherMode.extend(),e=r.Encryptor=r.extend({processBlock:function(r,e){var o=this._cipher,t=o.blockSize,i=this._iv,c=this._counter;i&&(c=this._counter=i.slice(0),this._iv=void 0);var n=c.slice(0);o.encryptBlock(n,0),c[t-1]=c[t-1]+1|0;for(var s=0;s<t;s++)r[e+s]^=n[s]}});return r.Decryptor=e,r}();