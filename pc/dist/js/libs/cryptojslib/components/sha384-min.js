/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

!function(){var i=CryptoJS,n=i.x64,e=n.Word,t=n.WordArray,n=i.algo,r=n.SHA512,n=n.SHA384=r.extend({_doReset:function(){this._hash=new t.init([new e.init(3418070365,3238371032),new e.init(1654270250,914150663),new e.init(2438529370,812702999),new e.init(355462360,4144912697),new e.init(1731405415,4290775857),new e.init(2394180231,1750603025),new e.init(3675008525,1694076839),new e.init(1203062813,3204075428)])},_doFinalize:function(){var i=r._doFinalize.call(this);return i.sigBytes-=16,i}});i.SHA384=r._createHelper(n),i.HmacSHA384=r._createHmacHelper(n)}();