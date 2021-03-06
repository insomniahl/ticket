/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){var e=CryptoJS,i=e.enc.Utf8;e.algo.HMAC=e.lib.Base.extend({init:function(e,t){e=this._hasher=new e.init,"string"==typeof t&&(t=i.parse(t));var s=e.blockSize,n=4*s;t.sigBytes>n&&(t=e.finalize(t)),t.clamp();for(var r=this._oKey=t.clone(),a=this._iKey=t.clone(),h=r.words,o=a.words,c=0;c<s;c++)h[c]^=1549556828,o[c]^=909522486;r.sigBytes=a.sigBytes=n,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var i=this._hasher;return e=i.finalize(e),i.reset(),i.finalize(this._oKey.clone().concat(e))}})}();