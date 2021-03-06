/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){var e=CryptoJS,t=e.lib,r=t.Base,i=t.WordArray,n=e.algo,a=n.SHA1,o=n.HMAC,c=n.PBKDF2=r.extend({cfg:r.extend({keySize:4,hasher:a,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var r=this.cfg,n=o.create(r.hasher,e),a=i.create(),c=i.create([1]),s=a.words,f=c.words,d=r.keySize,h=r.iterations;s.length<d;){var u=n.update(t).finalize(c);n.reset();for(var g=u.words,l=g.length,v=u,y=1;y<h;y++){v=n.finalize(v),n.reset();for(var p=v.words,w=0;w<l;w++)g[w]^=p[w]}a.concat(u),f[0]++}return a.sigBytes=4*d,a}});e.PBKDF2=function(e,t,r){return c.create(r).compute(e,t)}}();