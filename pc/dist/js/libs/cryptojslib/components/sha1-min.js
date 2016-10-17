/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){var e=CryptoJS,t=e.lib,s=t.WordArray,a=t.Hasher,r=[],t=e.algo.SHA1=a.extend({_doReset:function(){this._hash=new s.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var s=this._hash.words,a=s[0],o=s[1],h=s[2],i=s[3],n=s[4],c=0;80>c;c++){if(16>c)r[c]=0|e[t+c];else{var l=r[c-3]^r[c-8]^r[c-14]^r[c-16];r[c]=l<<1|l>>>31}l=(a<<5|a>>>27)+n+r[c],l=20>c?l+((o&h|~o&i)+1518500249):40>c?l+((o^h^i)+1859775393):60>c?l+((o&h|o&i|h&i)-1894007588):l+((o^h^i)-899497514),n=i,i=h,h=o<<30|o>>>2,o=a,a=l}s[0]=s[0]+a|0,s[1]=s[1]+o|0,s[2]=s[2]+h|0,s[3]=s[3]+i|0,s[4]=s[4]+n|0},_doFinalize:function(){var e=this._data,t=e.words,s=8*this._nDataBytes,a=8*e.sigBytes;return t[a>>>5]|=128<<24-a%32,t[(a+64>>>9<<4)+14]=Math.floor(s/4294967296),t[(a+64>>>9<<4)+15]=s,e.sigBytes=4*t.length,this._process(),this._hash},clone:function(){var e=a.clone.call(this);return e._hash=this._hash.clone(),e}});e.SHA1=a._createHelper(t),e.HmacSHA1=a._createHmacHelper(t)}();