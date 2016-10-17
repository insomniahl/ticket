/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){var e=CryptoJS,t=e.lib,r=t.Base,i=t.WordArray,t=e.algo,n=t.EvpKDF=r.extend({cfg:r.extend({keySize:4,hasher:t.MD5,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var r=this.cfg,n=r.hasher.create(),a=i.create(),c=a.words,o=r.keySize,r=r.iterations;c.length<o;){s&&n.update(s);var s=n.update(e).finalize(t);n.reset();for(var f=1;f<r;f++)s=n.finalize(s),n.reset();a.concat(s)}return a.sigBytes=4*o,a}});e.EvpKDF=function(e,t,r){return n.create(r).compute(e,t)}}();