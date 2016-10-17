/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){var e=CryptoJS,t=e.lib,r=t.Base,i=t.WordArray,t=e.algo,n=t.HMAC,a=t.PBKDF2=r.extend({cfg:r.extend({keySize:4,hasher:t.SHA1,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var r=this.cfg,a=n.create(r.hasher,e),o=i.create(),c=i.create([1]),s=o.words,f=c.words,d=r.keySize,r=r.iterations;s.length<d;){var h=a.update(t).finalize(c);a.reset();for(var u=h.words,g=u.length,l=h,v=1;v<r;v++){l=a.finalize(l),a.reset();for(var y=l.words,p=0;p<g;p++)u[p]^=y[p]}o.concat(h),f[0]++}return o.sigBytes=4*d,o}});e.PBKDF2=function(e,t,r){return a.create(r).compute(e,t)}}();