/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(t){var i=CryptoJS,r=i.lib,s=r.Base,n=r.WordArray,o=i.x64={};o.Word=s.extend({init:function(t,i){this.high=t,this.low=i}}),o.WordArray=s.extend({init:function(i,r){i=this.words=i||[],r!=t?this.sigBytes=r:this.sigBytes=8*i.length},toX32:function(){for(var t=this.words,i=t.length,r=[],s=0;s<i;s++){var o=t[s];r.push(o.high),r.push(o.low)}return n.create(r,this.sigBytes)},clone:function(){for(var t=s.clone.call(this),i=t.words=this.words.slice(0),r=i.length,n=0;n<r;n++)i[n]=i[n].clone();return t}})}();