/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){function i(){for(var i=this._X,r=this._C,t=0;t<8;t++)e[t]=r[t];r[0]=r[0]+1295307597+this._b|0,r[1]=r[1]+3545052371+(r[0]>>>0<e[0]>>>0?1:0)|0,r[2]=r[2]+886263092+(r[1]>>>0<e[1]>>>0?1:0)|0,r[3]=r[3]+1295307597+(r[2]>>>0<e[2]>>>0?1:0)|0,r[4]=r[4]+3545052371+(r[3]>>>0<e[3]>>>0?1:0)|0,r[5]=r[5]+886263092+(r[4]>>>0<e[4]>>>0?1:0)|0,r[6]=r[6]+1295307597+(r[5]>>>0<e[5]>>>0?1:0)|0,r[7]=r[7]+3545052371+(r[6]>>>0<e[6]>>>0?1:0)|0,this._b=r[7]>>>0<e[7]>>>0?1:0;for(var t=0;t<8;t++){var a=i[t]+r[t],o=65535&a,s=a>>>16,h=((o*o>>>17)+o*s>>>15)+s*s,v=((4294901760&a)*a|0)+((65535&a)*a|0);c[t]=h^v}i[0]=c[0]+(c[7]<<16|c[7]>>>16)+(c[6]<<16|c[6]>>>16)|0,i[1]=c[1]+(c[0]<<8|c[0]>>>24)+c[7]|0,i[2]=c[2]+(c[1]<<16|c[1]>>>16)+(c[0]<<16|c[0]>>>16)|0,i[3]=c[3]+(c[2]<<8|c[2]>>>24)+c[1]|0,i[4]=c[4]+(c[3]<<16|c[3]>>>16)+(c[2]<<16|c[2]>>>16)|0,i[5]=c[5]+(c[4]<<8|c[4]>>>24)+c[3]|0,i[6]=c[6]+(c[5]<<16|c[5]>>>16)+(c[4]<<16|c[4]>>>16)|0,i[7]=c[7]+(c[6]<<8|c[6]>>>24)+c[5]|0}var r=CryptoJS,t=r.lib,a=t.StreamCipher,o=r.algo,s=[],e=[],c=[],h=o.RabbitLegacy=a.extend({_doReset:function(){var r=this._key.words,t=this.cfg.iv,a=this._X=[r[0],r[3]<<16|r[2]>>>16,r[1],r[0]<<16|r[3]>>>16,r[2],r[1]<<16|r[0]>>>16,r[3],r[2]<<16|r[1]>>>16],o=this._C=[r[2]<<16|r[2]>>>16,4294901760&r[0]|65535&r[1],r[3]<<16|r[3]>>>16,4294901760&r[1]|65535&r[2],r[0]<<16|r[0]>>>16,4294901760&r[2]|65535&r[3],r[1]<<16|r[1]>>>16,4294901760&r[3]|65535&r[0]];this._b=0;for(var s=0;s<4;s++)i.call(this);for(var s=0;s<8;s++)o[s]^=a[s+4&7];if(t){var e=t.words,c=e[0],h=e[1],v=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),f=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8),_=v>>>16|4294901760&f,l=f<<16|65535&v;o[0]^=v,o[1]^=_,o[2]^=f,o[3]^=l,o[4]^=v,o[5]^=_,o[6]^=f,o[7]^=l;for(var s=0;s<4;s++)i.call(this)}},_doProcessBlock:function(r,t){var a=this._X;i.call(this),s[0]=a[0]^a[5]>>>16^a[3]<<16,s[1]=a[2]^a[7]>>>16^a[5]<<16,s[2]=a[4]^a[1]>>>16^a[7]<<16,s[3]=a[6]^a[3]>>>16^a[1]<<16;for(var o=0;o<4;o++)s[o]=16711935&(s[o]<<8|s[o]>>>24)|4278255360&(s[o]<<24|s[o]>>>8),r[t+o]^=s[o]},blockSize:4,ivSize:2});r.RabbitLegacy=a._createHelper(h)}();