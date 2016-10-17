/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(t){var i=CryptoJS,r=i.lib,n=r.Base,o=r.WordArray,i=i.x64={};i.Word=n.extend({init:function(t,i){this.high=t,this.low=i}}),i.WordArray=n.extend({init:function(i,r){i=this.words=i||[],this.sigBytes=r!=t?r:8*i.length},toX32:function(){for(var t=this.words,i=t.length,r=[],n=0;n<i;n++){var s=t[n];r.push(s.high),r.push(s.low)}return o.create(r,this.sigBytes)},clone:function(){for(var t=n.clone.call(this),i=t.words=this.words.slice(0),r=i.length,o=0;o<r;o++)i[o]=i[o].clone();return t}})}();