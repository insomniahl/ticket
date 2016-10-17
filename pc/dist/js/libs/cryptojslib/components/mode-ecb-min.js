/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

CryptoJS.mode.ECB=function(){var e=CryptoJS.lib.BlockCipherMode.extend();return e.Encryptor=e.extend({processBlock:function(e,c){this._cipher.encryptBlock(e,c)}}),e.Decryptor=e.extend({processBlock:function(e,c){this._cipher.decryptBlock(e,c)}}),e}();