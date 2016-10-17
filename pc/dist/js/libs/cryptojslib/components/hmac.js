/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){var e=CryptoJS,i=e.lib,t=i.Base,s=e.enc,n=s.Utf8,r=e.algo;r.HMAC=t.extend({init:function(e,i){e=this._hasher=new e.init,"string"==typeof i&&(i=n.parse(i));var t=e.blockSize,s=4*t;i.sigBytes>s&&(i=e.finalize(i)),i.clamp();for(var r=this._oKey=i.clone(),a=this._iKey=i.clone(),h=r.words,o=a.words,c=0;c<t;c++)h[c]^=1549556828,o[c]^=909522486;r.sigBytes=a.sigBytes=s,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var i=this._hasher,t=i.finalize(e);i.reset();var s=i.finalize(this._oKey.clone().concat(t));return s}})}();