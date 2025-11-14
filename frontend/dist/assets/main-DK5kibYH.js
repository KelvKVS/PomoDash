(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();function wy(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Yu={exports:{}},gl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wg;function Ny(){if(wg)return gl;wg=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(l,r,c){var u=null;if(c!==void 0&&(u=""+c),r.key!==void 0&&(u=""+r.key),"key"in r){c={};for(var h in r)h!=="key"&&(c[h]=r[h])}else c=r;return r=c.ref,{$$typeof:s,type:l,key:u,ref:r!==void 0?r:null,props:c}}return gl.Fragment=e,gl.jsx=n,gl.jsxs=n,gl}var Ng;function Ey(){return Ng||(Ng=1,Yu.exports=Ny()),Yu.exports}var d=Ey(),Vu={exports:{}},kt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eg;function Ty(){if(Eg)return kt;Eg=1;var s=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),y=Symbol.iterator;function v(A){return A===null||typeof A!="object"?null:(A=y&&A[y]||A["@@iterator"],typeof A=="function"?A:null)}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,E={};function T(A,$,G){this.props=A,this.context=$,this.refs=E,this.updater=G||_}T.prototype.isReactComponent={},T.prototype.setState=function(A,$){if(typeof A!="object"&&typeof A!="function"&&A!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,A,$,"setState")},T.prototype.forceUpdate=function(A){this.updater.enqueueForceUpdate(this,A,"forceUpdate")};function M(){}M.prototype=T.prototype;function O(A,$,G){this.props=A,this.context=$,this.refs=E,this.updater=G||_}var V=O.prototype=new M;V.constructor=O,w(V,T.prototype),V.isPureReactComponent=!0;var K=Array.isArray,Y={H:null,A:null,T:null,S:null,V:null},st=Object.prototype.hasOwnProperty;function tt(A,$,G,J,I,_t){return G=_t.ref,{$$typeof:s,type:A,key:$,ref:G!==void 0?G:null,props:_t}}function at(A,$){return tt(A.type,$,void 0,void 0,void 0,A.props)}function it(A){return typeof A=="object"&&A!==null&&A.$$typeof===s}function ft(A){var $={"=":"=0",":":"=2"};return"$"+A.replace(/[=:]/g,function(G){return $[G]})}var nt=/\/+/g;function rt(A,$){return typeof A=="object"&&A!==null&&A.key!=null?ft(""+A.key):$.toString(36)}function vt(){}function xt(A){switch(A.status){case"fulfilled":return A.value;case"rejected":throw A.reason;default:switch(typeof A.status=="string"?A.then(vt,vt):(A.status="pending",A.then(function($){A.status==="pending"&&(A.status="fulfilled",A.value=$)},function($){A.status==="pending"&&(A.status="rejected",A.reason=$)})),A.status){case"fulfilled":return A.value;case"rejected":throw A.reason}}throw A}function dt(A,$,G,J,I){var _t=typeof A;(_t==="undefined"||_t==="boolean")&&(A=null);var ht=!1;if(A===null)ht=!0;else switch(_t){case"bigint":case"string":case"number":ht=!0;break;case"object":switch(A.$$typeof){case s:case e:ht=!0;break;case x:return ht=A._init,dt(ht(A._payload),$,G,J,I)}}if(ht)return I=I(A),ht=J===""?"."+rt(A,0):J,K(I)?(G="",ht!=null&&(G=ht.replace(nt,"$&/")+"/"),dt(I,$,G,"",function(jt){return jt})):I!=null&&(it(I)&&(I=at(I,G+(I.key==null||A&&A.key===I.key?"":(""+I.key).replace(nt,"$&/")+"/")+ht)),$.push(I)),1;ht=0;var ae=J===""?".":J+":";if(K(A))for(var bt=0;bt<A.length;bt++)J=A[bt],_t=ae+rt(J,bt),ht+=dt(J,$,G,_t,I);else if(bt=v(A),typeof bt=="function")for(A=bt.call(A),bt=0;!(J=A.next()).done;)J=J.value,_t=ae+rt(J,bt++),ht+=dt(J,$,G,_t,I);else if(_t==="object"){if(typeof A.then=="function")return dt(xt(A),$,G,J,I);throw $=String(A),Error("Objects are not valid as a React child (found: "+($==="[object Object]"?"object with keys {"+Object.keys(A).join(", ")+"}":$)+"). If you meant to render a collection of children, use an array instead.")}return ht}function B(A,$,G){if(A==null)return A;var J=[],I=0;return dt(A,J,"","",function(_t){return $.call(G,_t,I++)}),J}function W(A){if(A._status===-1){var $=A._result;$=$(),$.then(function(G){(A._status===0||A._status===-1)&&(A._status=1,A._result=G)},function(G){(A._status===0||A._status===-1)&&(A._status=2,A._result=G)}),A._status===-1&&(A._status=0,A._result=$)}if(A._status===1)return A._result.default;throw A._result}var lt=typeof reportError=="function"?reportError:function(A){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var $=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof A=="object"&&A!==null&&typeof A.message=="string"?String(A.message):String(A),error:A});if(!window.dispatchEvent($))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",A);return}console.error(A)};function St(){}return kt.Children={map:B,forEach:function(A,$,G){B(A,function(){$.apply(this,arguments)},G)},count:function(A){var $=0;return B(A,function(){$++}),$},toArray:function(A){return B(A,function($){return $})||[]},only:function(A){if(!it(A))throw Error("React.Children.only expected to receive a single React element child.");return A}},kt.Component=T,kt.Fragment=n,kt.Profiler=r,kt.PureComponent=O,kt.StrictMode=l,kt.Suspense=m,kt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Y,kt.__COMPILER_RUNTIME={__proto__:null,c:function(A){return Y.H.useMemoCache(A)}},kt.cache=function(A){return function(){return A.apply(null,arguments)}},kt.cloneElement=function(A,$,G){if(A==null)throw Error("The argument must be a React element, but you passed "+A+".");var J=w({},A.props),I=A.key,_t=void 0;if($!=null)for(ht in $.ref!==void 0&&(_t=void 0),$.key!==void 0&&(I=""+$.key),$)!st.call($,ht)||ht==="key"||ht==="__self"||ht==="__source"||ht==="ref"&&$.ref===void 0||(J[ht]=$[ht]);var ht=arguments.length-2;if(ht===1)J.children=G;else if(1<ht){for(var ae=Array(ht),bt=0;bt<ht;bt++)ae[bt]=arguments[bt+2];J.children=ae}return tt(A.type,I,void 0,void 0,_t,J)},kt.createContext=function(A){return A={$$typeof:u,_currentValue:A,_currentValue2:A,_threadCount:0,Provider:null,Consumer:null},A.Provider=A,A.Consumer={$$typeof:c,_context:A},A},kt.createElement=function(A,$,G){var J,I={},_t=null;if($!=null)for(J in $.key!==void 0&&(_t=""+$.key),$)st.call($,J)&&J!=="key"&&J!=="__self"&&J!=="__source"&&(I[J]=$[J]);var ht=arguments.length-2;if(ht===1)I.children=G;else if(1<ht){for(var ae=Array(ht),bt=0;bt<ht;bt++)ae[bt]=arguments[bt+2];I.children=ae}if(A&&A.defaultProps)for(J in ht=A.defaultProps,ht)I[J]===void 0&&(I[J]=ht[J]);return tt(A,_t,void 0,void 0,null,I)},kt.createRef=function(){return{current:null}},kt.forwardRef=function(A){return{$$typeof:h,render:A}},kt.isValidElement=it,kt.lazy=function(A){return{$$typeof:x,_payload:{_status:-1,_result:A},_init:W}},kt.memo=function(A,$){return{$$typeof:p,type:A,compare:$===void 0?null:$}},kt.startTransition=function(A){var $=Y.T,G={};Y.T=G;try{var J=A(),I=Y.S;I!==null&&I(G,J),typeof J=="object"&&J!==null&&typeof J.then=="function"&&J.then(St,lt)}catch(_t){lt(_t)}finally{Y.T=$}},kt.unstable_useCacheRefresh=function(){return Y.H.useCacheRefresh()},kt.use=function(A){return Y.H.use(A)},kt.useActionState=function(A,$,G){return Y.H.useActionState(A,$,G)},kt.useCallback=function(A,$){return Y.H.useCallback(A,$)},kt.useContext=function(A){return Y.H.useContext(A)},kt.useDebugValue=function(){},kt.useDeferredValue=function(A,$){return Y.H.useDeferredValue(A,$)},kt.useEffect=function(A,$,G){var J=Y.H;if(typeof G=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return J.useEffect(A,$)},kt.useId=function(){return Y.H.useId()},kt.useImperativeHandle=function(A,$,G){return Y.H.useImperativeHandle(A,$,G)},kt.useInsertionEffect=function(A,$){return Y.H.useInsertionEffect(A,$)},kt.useLayoutEffect=function(A,$){return Y.H.useLayoutEffect(A,$)},kt.useMemo=function(A,$){return Y.H.useMemo(A,$)},kt.useOptimistic=function(A,$){return Y.H.useOptimistic(A,$)},kt.useReducer=function(A,$,G){return Y.H.useReducer(A,$,G)},kt.useRef=function(A){return Y.H.useRef(A)},kt.useState=function(A){return Y.H.useState(A)},kt.useSyncExternalStore=function(A,$,G){return Y.H.useSyncExternalStore(A,$,G)},kt.useTransition=function(){return Y.H.useTransition()},kt.version="19.1.1",kt}var Tg;function xd(){return Tg||(Tg=1,Vu.exports=Ty()),Vu.exports}var j=xd();const tx=wy(j);var Fu={exports:{}},pl={},Xu={exports:{}},Gu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kg;function ky(){return kg||(kg=1,(function(s){function e(B,W){var lt=B.length;B.push(W);t:for(;0<lt;){var St=lt-1>>>1,A=B[St];if(0<r(A,W))B[St]=W,B[lt]=A,lt=St;else break t}}function n(B){return B.length===0?null:B[0]}function l(B){if(B.length===0)return null;var W=B[0],lt=B.pop();if(lt!==W){B[0]=lt;t:for(var St=0,A=B.length,$=A>>>1;St<$;){var G=2*(St+1)-1,J=B[G],I=G+1,_t=B[I];if(0>r(J,lt))I<A&&0>r(_t,J)?(B[St]=_t,B[I]=lt,St=I):(B[St]=J,B[G]=lt,St=G);else if(I<A&&0>r(_t,lt))B[St]=_t,B[I]=lt,St=I;else break t}}return W}function r(B,W){var lt=B.sortIndex-W.sortIndex;return lt!==0?lt:B.id-W.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var u=Date,h=u.now();s.unstable_now=function(){return u.now()-h}}var m=[],p=[],x=1,y=null,v=3,_=!1,w=!1,E=!1,T=!1,M=typeof setTimeout=="function"?setTimeout:null,O=typeof clearTimeout=="function"?clearTimeout:null,V=typeof setImmediate<"u"?setImmediate:null;function K(B){for(var W=n(p);W!==null;){if(W.callback===null)l(p);else if(W.startTime<=B)l(p),W.sortIndex=W.expirationTime,e(m,W);else break;W=n(p)}}function Y(B){if(E=!1,K(B),!w)if(n(m)!==null)w=!0,st||(st=!0,rt());else{var W=n(p);W!==null&&dt(Y,W.startTime-B)}}var st=!1,tt=-1,at=5,it=-1;function ft(){return T?!0:!(s.unstable_now()-it<at)}function nt(){if(T=!1,st){var B=s.unstable_now();it=B;var W=!0;try{t:{w=!1,E&&(E=!1,O(tt),tt=-1),_=!0;var lt=v;try{e:{for(K(B),y=n(m);y!==null&&!(y.expirationTime>B&&ft());){var St=y.callback;if(typeof St=="function"){y.callback=null,v=y.priorityLevel;var A=St(y.expirationTime<=B);if(B=s.unstable_now(),typeof A=="function"){y.callback=A,K(B),W=!0;break e}y===n(m)&&l(m),K(B)}else l(m);y=n(m)}if(y!==null)W=!0;else{var $=n(p);$!==null&&dt(Y,$.startTime-B),W=!1}}break t}finally{y=null,v=lt,_=!1}W=void 0}}finally{W?rt():st=!1}}}var rt;if(typeof V=="function")rt=function(){V(nt)};else if(typeof MessageChannel<"u"){var vt=new MessageChannel,xt=vt.port2;vt.port1.onmessage=nt,rt=function(){xt.postMessage(null)}}else rt=function(){M(nt,0)};function dt(B,W){tt=M(function(){B(s.unstable_now())},W)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(B){B.callback=null},s.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):at=0<B?Math.floor(1e3/B):5},s.unstable_getCurrentPriorityLevel=function(){return v},s.unstable_next=function(B){switch(v){case 1:case 2:case 3:var W=3;break;default:W=v}var lt=v;v=W;try{return B()}finally{v=lt}},s.unstable_requestPaint=function(){T=!0},s.unstable_runWithPriority=function(B,W){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var lt=v;v=B;try{return W()}finally{v=lt}},s.unstable_scheduleCallback=function(B,W,lt){var St=s.unstable_now();switch(typeof lt=="object"&&lt!==null?(lt=lt.delay,lt=typeof lt=="number"&&0<lt?St+lt:St):lt=St,B){case 1:var A=-1;break;case 2:A=250;break;case 5:A=1073741823;break;case 4:A=1e4;break;default:A=5e3}return A=lt+A,B={id:x++,callback:W,priorityLevel:B,startTime:lt,expirationTime:A,sortIndex:-1},lt>St?(B.sortIndex=lt,e(p,B),n(m)===null&&B===n(p)&&(E?(O(tt),tt=-1):E=!0,dt(Y,lt-St))):(B.sortIndex=A,e(m,B),w||_||(w=!0,st||(st=!0,rt()))),B},s.unstable_shouldYield=ft,s.unstable_wrapCallback=function(B){var W=v;return function(){var lt=v;v=W;try{return B.apply(this,arguments)}finally{v=lt}}}})(Gu)),Gu}var Ag;function Ay(){return Ag||(Ag=1,Xu.exports=ky()),Xu.exports}var $u={exports:{}},ze={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cg;function Cy(){if(Cg)return ze;Cg=1;var s=xd();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)p+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var l={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},r=Symbol.for("react.portal");function c(m,p,x){var y=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:r,key:y==null?null:""+y,children:m,containerInfo:p,implementation:x}}var u=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return ze.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,ze.createPortal=function(m,p){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,x)},ze.flushSync=function(m){var p=u.T,x=l.p;try{if(u.T=null,l.p=2,m)return m()}finally{u.T=p,l.p=x,l.d.f()}},ze.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,l.d.C(m,p))},ze.prefetchDNS=function(m){typeof m=="string"&&l.d.D(m)},ze.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var x=p.as,y=h(x,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,_=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;x==="style"?l.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:y,integrity:v,fetchPriority:_}):x==="script"&&l.d.X(m,{crossOrigin:y,integrity:v,fetchPriority:_,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},ze.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var x=h(p.as,p.crossOrigin);l.d.M(m,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&l.d.M(m)},ze.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var x=p.as,y=h(x,p.crossOrigin);l.d.L(m,x,{crossOrigin:y,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},ze.preloadModule=function(m,p){if(typeof m=="string")if(p){var x=h(p.as,p.crossOrigin);l.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else l.d.m(m)},ze.requestFormReset=function(m){l.d.r(m)},ze.unstable_batchedUpdates=function(m,p){return m(p)},ze.useFormState=function(m,p,x){return u.H.useFormState(m,p,x)},ze.useFormStatus=function(){return u.H.useHostTransitionStatus()},ze.version="19.1.1",ze}var Mg;function My(){if(Mg)return $u.exports;Mg=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),$u.exports=Cy(),$u.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dg;function Dy(){if(Dg)return pl;Dg=1;var s=Ay(),e=xd(),n=My();function l(t){var a="https://react.dev/errors/"+t;if(1<arguments.length){a+="?args[]="+encodeURIComponent(arguments[1]);for(var i=2;i<arguments.length;i++)a+="&args[]="+encodeURIComponent(arguments[i])}return"Minified React error #"+t+"; visit "+a+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function r(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var a=t,i=t;if(t.alternate)for(;a.return;)a=a.return;else{t=a;do a=t,(a.flags&4098)!==0&&(i=a.return),t=a.return;while(t)}return a.tag===3?i:null}function u(t){if(t.tag===13){var a=t.memoizedState;if(a===null&&(t=t.alternate,t!==null&&(a=t.memoizedState)),a!==null)return a.dehydrated}return null}function h(t){if(c(t)!==t)throw Error(l(188))}function m(t){var a=t.alternate;if(!a){if(a=c(t),a===null)throw Error(l(188));return a!==t?null:t}for(var i=t,o=a;;){var f=i.return;if(f===null)break;var g=f.alternate;if(g===null){if(o=f.return,o!==null){i=o;continue}break}if(f.child===g.child){for(g=f.child;g;){if(g===i)return h(f),t;if(g===o)return h(f),a;g=g.sibling}throw Error(l(188))}if(i.return!==o.return)i=f,o=g;else{for(var b=!1,S=f.child;S;){if(S===i){b=!0,i=f,o=g;break}if(S===o){b=!0,o=f,i=g;break}S=S.sibling}if(!b){for(S=g.child;S;){if(S===i){b=!0,i=g,o=f;break}if(S===o){b=!0,o=g,i=f;break}S=S.sibling}if(!b)throw Error(l(189))}}if(i.alternate!==o)throw Error(l(190))}if(i.tag!==3)throw Error(l(188));return i.stateNode.current===i?t:a}function p(t){var a=t.tag;if(a===5||a===26||a===27||a===6)return t;for(t=t.child;t!==null;){if(a=p(t),a!==null)return a;t=t.sibling}return null}var x=Object.assign,y=Symbol.for("react.element"),v=Symbol.for("react.transitional.element"),_=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),T=Symbol.for("react.profiler"),M=Symbol.for("react.provider"),O=Symbol.for("react.consumer"),V=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),Y=Symbol.for("react.suspense"),st=Symbol.for("react.suspense_list"),tt=Symbol.for("react.memo"),at=Symbol.for("react.lazy"),it=Symbol.for("react.activity"),ft=Symbol.for("react.memo_cache_sentinel"),nt=Symbol.iterator;function rt(t){return t===null||typeof t!="object"?null:(t=nt&&t[nt]||t["@@iterator"],typeof t=="function"?t:null)}var vt=Symbol.for("react.client.reference");function xt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===vt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case w:return"Fragment";case T:return"Profiler";case E:return"StrictMode";case Y:return"Suspense";case st:return"SuspenseList";case it:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case _:return"Portal";case V:return(t.displayName||"Context")+".Provider";case O:return(t._context.displayName||"Context")+".Consumer";case K:var a=t.render;return t=t.displayName,t||(t=a.displayName||a.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case tt:return a=t.displayName||null,a!==null?a:xt(t.type)||"Memo";case at:a=t._payload,t=t._init;try{return xt(t(a))}catch{}}return null}var dt=Array.isArray,B=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,lt={pending:!1,data:null,method:null,action:null},St=[],A=-1;function $(t){return{current:t}}function G(t){0>A||(t.current=St[A],St[A]=null,A--)}function J(t,a){A++,St[A]=t.current,t.current=a}var I=$(null),_t=$(null),ht=$(null),ae=$(null);function bt(t,a){switch(J(ht,a),J(_t,t),J(I,null),a.nodeType){case 9:case 11:t=(t=a.documentElement)&&(t=t.namespaceURI)?Jm(t):0;break;default:if(t=a.tagName,a=a.namespaceURI)a=Jm(a),t=Im(a,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}G(I),J(I,t)}function jt(){G(I),G(_t),G(ht)}function Ve(t){t.memoizedState!==null&&J(ae,t);var a=I.current,i=Im(a,t.type);a!==i&&(J(_t,t),J(I,i))}function ke(t){_t.current===t&&(G(I),G(_t)),ae.current===t&&(G(ae),ul._currentValue=lt)}var Fe=Object.prototype.hasOwnProperty,aa=s.unstable_scheduleCallback,Ue=s.unstable_cancelCallback,Ft=s.unstable_shouldYield,Ta=s.unstable_requestPaint,ye=s.unstable_now,Ba=s.unstable_getCurrentPriorityLevel,Ua=s.unstable_ImmediatePriority,Nt=s.unstable_UserBlockingPriority,De=s.unstable_NormalPriority,he=s.unstable_LowPriority,ka=s.unstable_IdlePriority,Xe=s.log,Re=s.unstable_setDisableYieldValue,Ge=null,It=null;function me(t){if(typeof Xe=="function"&&Re(t),It&&typeof It.setStrictMode=="function")try{It.setStrictMode(Ge,t)}catch{}}var ce=Math.clz32?Math.clz32:z,Ha=Math.log,ha=Math.LN2;function z(t){return t>>>=0,t===0?32:31-(Ha(t)/ha|0)|0}var ot=256,Ut=4194304;function Pt(t){var a=t&42;if(a!==0)return a;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function sa(t,a,i){var o=t.pendingLanes;if(o===0)return 0;var f=0,g=t.suspendedLanes,b=t.pingedLanes;t=t.warmLanes;var S=o&134217727;return S!==0?(o=S&~g,o!==0?f=Pt(o):(b&=S,b!==0?f=Pt(b):i||(i=S&~t,i!==0&&(f=Pt(i))))):(S=o&~g,S!==0?f=Pt(S):b!==0?f=Pt(b):i||(i=o&~t,i!==0&&(f=Pt(i)))),f===0?0:a!==0&&a!==f&&(a&g)===0&&(g=f&-f,i=a&-a,g>=i||g===32&&(i&4194048)!==0)?a:f}function Aa(t,a){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&a)===0}function Ca(t,a){switch(t){case 1:case 2:case 4:case 8:case 64:return a+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Pa(){var t=ot;return ot<<=1,(ot&4194048)===0&&(ot=256),t}function ks(){var t=Ut;return Ut<<=1,(Ut&62914560)===0&&(Ut=4194304),t}function ss(t){for(var a=[],i=0;31>i;i++)a.push(t);return a}function na(t,a){t.pendingLanes|=a,a!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function rn(t,a,i,o,f,g){var b=t.pendingLanes;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=i,t.entangledLanes&=i,t.errorRecoveryDisabledLanes&=i,t.shellSuspendCounter=0;var S=t.entanglements,N=t.expirationTimes,H=t.hiddenUpdates;for(i=b&~i;0<i;){var X=31-ce(i),Z=1<<X;S[X]=0,N[X]=-1;var P=H[X];if(P!==null)for(H[X]=null,X=0;X<P.length;X++){var q=P[X];q!==null&&(q.lane&=-536870913)}i&=~Z}o!==0&&qa(t,o,0),g!==0&&f===0&&t.tag!==0&&(t.suspendedLanes|=g&~(b&~a))}function qa(t,a,i){t.pendingLanes|=a,t.suspendedLanes&=~a;var o=31-ce(a);t.entangledLanes|=a,t.entanglements[o]=t.entanglements[o]|1073741824|i&4194090}function As(t,a){var i=t.entangledLanes|=a;for(t=t.entanglements;i;){var o=31-ce(i),f=1<<o;f&a|t[o]&a&&(t[o]|=a),i&=~f}}function Ya(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function He(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Va(){var t=W.p;return t!==0?t:(t=window.event,t===void 0?32:bg(t.type))}function Ma(t,a){var i=W.p;try{return W.p=t,a()}finally{W.p=i}}var Pe=Math.random().toString(36).slice(2),Kt="__reactFiber$"+Pe,ge="__reactProps$"+Pe,we="__reactContainer$"+Pe,R="__reactEvents$"+Pe,ct="__reactListeners$"+Pe,C="__reactHandles$"+Pe,et="__reactResources$"+Pe,ut="__reactMarker$"+Pe;function k(t){delete t[Kt],delete t[ge],delete t[R],delete t[ct],delete t[C]}function F(t){var a=t[Kt];if(a)return a;for(var i=t.parentNode;i;){if(a=i[we]||i[Kt]){if(i=a.alternate,a.child!==null||i!==null&&i.child!==null)for(t=sg(t);t!==null;){if(i=t[Kt])return i;t=sg(t)}return a}t=i,i=t.parentNode}return null}function mt(t){if(t=t[Kt]||t[we]){var a=t.tag;if(a===5||a===6||a===13||a===26||a===27||a===3)return t}return null}function Rt(t){var a=t.tag;if(a===5||a===26||a===27||a===6)return t.stateNode;throw Error(l(33))}function ue(t){var a=t[et];return a||(a=t[et]={hoistableStyles:new Map,hoistableScripts:new Map}),a}function Xt(t){t[ut]=!0}var qe=new Set,Hl={};function ns(t,a){Fa(t,a),Fa(t+"Capture",a)}function Fa(t,a){for(Hl[t]=a,t=0;t<a.length;t++)qe.add(a[t])}var Dn=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Yd={},Vd={};function xb(t){return Fe.call(Vd,t)?!0:Fe.call(Yd,t)?!1:Dn.test(t)?Vd[t]=!0:(Yd[t]=!0,!1)}function Pl(t,a,i){if(xb(a))if(i===null)t.removeAttribute(a);else{switch(typeof i){case"undefined":case"function":case"symbol":t.removeAttribute(a);return;case"boolean":var o=a.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(a);return}}t.setAttribute(a,""+i)}}function ql(t,a,i){if(i===null)t.removeAttribute(a);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttribute(a,""+i)}}function is(t,a,i,o){if(o===null)t.removeAttribute(i);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(i);return}t.setAttributeNS(a,i,""+o)}}var Lo,Fd;function Rn(t){if(Lo===void 0)try{throw Error()}catch(i){var a=i.stack.trim().match(/\n( *(at )?)/);Lo=a&&a[1]||"",Fd=-1<i.stack.indexOf(`
    at`)?" (<anonymous>)":-1<i.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Lo+t+Fd}var Bo=!1;function Uo(t,a){if(!t||Bo)return"";Bo=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(a){var Z=function(){throw Error()};if(Object.defineProperty(Z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Z,[])}catch(q){var P=q}Reflect.construct(t,[],Z)}else{try{Z.call()}catch(q){P=q}t.call(Z.prototype)}}else{try{throw Error()}catch(q){P=q}(Z=t())&&typeof Z.catch=="function"&&Z.catch(function(){})}}catch(q){if(q&&P&&typeof q.stack=="string")return[q.stack,P.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var g=o.DetermineComponentFrameRoot(),b=g[0],S=g[1];if(b&&S){var N=b.split(`
`),H=S.split(`
`);for(f=o=0;o<N.length&&!N[o].includes("DetermineComponentFrameRoot");)o++;for(;f<H.length&&!H[f].includes("DetermineComponentFrameRoot");)f++;if(o===N.length||f===H.length)for(o=N.length-1,f=H.length-1;1<=o&&0<=f&&N[o]!==H[f];)f--;for(;1<=o&&0<=f;o--,f--)if(N[o]!==H[f]){if(o!==1||f!==1)do if(o--,f--,0>f||N[o]!==H[f]){var X=`
`+N[o].replace(" at new "," at ");return t.displayName&&X.includes("<anonymous>")&&(X=X.replace("<anonymous>",t.displayName)),X}while(1<=o&&0<=f);break}}}finally{Bo=!1,Error.prepareStackTrace=i}return(i=t?t.displayName||t.name:"")?Rn(i):""}function bb(t){switch(t.tag){case 26:case 27:case 5:return Rn(t.type);case 16:return Rn("Lazy");case 13:return Rn("Suspense");case 19:return Rn("SuspenseList");case 0:case 15:return Uo(t.type,!1);case 11:return Uo(t.type.render,!1);case 1:return Uo(t.type,!0);case 31:return Rn("Activity");default:return""}}function Xd(t){try{var a="";do a+=bb(t),t=t.return;while(t);return a}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}function ma(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Gd(t){var a=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(a==="checkbox"||a==="radio")}function yb(t){var a=Gd(t)?"checked":"value",i=Object.getOwnPropertyDescriptor(t.constructor.prototype,a),o=""+t[a];if(!t.hasOwnProperty(a)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var f=i.get,g=i.set;return Object.defineProperty(t,a,{configurable:!0,get:function(){return f.call(this)},set:function(b){o=""+b,g.call(this,b)}}),Object.defineProperty(t,a,{enumerable:i.enumerable}),{getValue:function(){return o},setValue:function(b){o=""+b},stopTracking:function(){t._valueTracker=null,delete t[a]}}}}function Yl(t){t._valueTracker||(t._valueTracker=yb(t))}function $d(t){if(!t)return!1;var a=t._valueTracker;if(!a)return!0;var i=a.getValue(),o="";return t&&(o=Gd(t)?t.checked?"true":"false":t.value),t=o,t!==i?(a.setValue(t),!0):!1}function Vl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var vb=/[\n"\\]/g;function ga(t){return t.replace(vb,function(a){return"\\"+a.charCodeAt(0).toString(16)+" "})}function Ho(t,a,i,o,f,g,b,S){t.name="",b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?t.type=b:t.removeAttribute("type"),a!=null?b==="number"?(a===0&&t.value===""||t.value!=a)&&(t.value=""+ma(a)):t.value!==""+ma(a)&&(t.value=""+ma(a)):b!=="submit"&&b!=="reset"||t.removeAttribute("value"),a!=null?Po(t,b,ma(a)):i!=null?Po(t,b,ma(i)):o!=null&&t.removeAttribute("value"),f==null&&g!=null&&(t.defaultChecked=!!g),f!=null&&(t.checked=f&&typeof f!="function"&&typeof f!="symbol"),S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?t.name=""+ma(S):t.removeAttribute("name")}function Qd(t,a,i,o,f,g,b,S){if(g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(t.type=g),a!=null||i!=null){if(!(g!=="submit"&&g!=="reset"||a!=null))return;i=i!=null?""+ma(i):"",a=a!=null?""+ma(a):i,S||a===t.value||(t.value=a),t.defaultValue=a}o=o??f,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=S?t.checked:!!o,t.defaultChecked=!!o,b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"&&(t.name=b)}function Po(t,a,i){a==="number"&&Vl(t.ownerDocument)===t||t.defaultValue===""+i||(t.defaultValue=""+i)}function On(t,a,i,o){if(t=t.options,a){a={};for(var f=0;f<i.length;f++)a["$"+i[f]]=!0;for(i=0;i<t.length;i++)f=a.hasOwnProperty("$"+t[i].value),t[i].selected!==f&&(t[i].selected=f),f&&o&&(t[i].defaultSelected=!0)}else{for(i=""+ma(i),a=null,f=0;f<t.length;f++){if(t[f].value===i){t[f].selected=!0,o&&(t[f].defaultSelected=!0);return}a!==null||t[f].disabled||(a=t[f])}a!==null&&(a.selected=!0)}}function Zd(t,a,i){if(a!=null&&(a=""+ma(a),a!==t.value&&(t.value=a),i==null)){t.defaultValue!==a&&(t.defaultValue=a);return}t.defaultValue=i!=null?""+ma(i):""}function Kd(t,a,i,o){if(a==null){if(o!=null){if(i!=null)throw Error(l(92));if(dt(o)){if(1<o.length)throw Error(l(93));o=o[0]}i=o}i==null&&(i=""),a=i}i=ma(a),t.defaultValue=i,o=t.textContent,o===i&&o!==""&&o!==null&&(t.value=o)}function zn(t,a){if(a){var i=t.firstChild;if(i&&i===t.lastChild&&i.nodeType===3){i.nodeValue=a;return}}t.textContent=a}var Sb=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Wd(t,a,i){var o=a.indexOf("--")===0;i==null||typeof i=="boolean"||i===""?o?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="":o?t.setProperty(a,i):typeof i!="number"||i===0||Sb.has(a)?a==="float"?t.cssFloat=i:t[a]=(""+i).trim():t[a]=i+"px"}function Jd(t,a,i){if(a!=null&&typeof a!="object")throw Error(l(62));if(t=t.style,i!=null){for(var o in i)!i.hasOwnProperty(o)||a!=null&&a.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var f in a)o=a[f],a.hasOwnProperty(f)&&i[f]!==o&&Wd(t,f,o)}else for(var g in a)a.hasOwnProperty(g)&&Wd(t,g,a[g])}function qo(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _b=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),jb=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Fl(t){return jb.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}var Yo=null;function Vo(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ln=null,Bn=null;function Id(t){var a=mt(t);if(a&&(t=a.stateNode)){var i=t[ge]||null;t:switch(t=a.stateNode,a.type){case"input":if(Ho(t,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name),a=i.name,i.type==="radio"&&a!=null){for(i=t;i.parentNode;)i=i.parentNode;for(i=i.querySelectorAll('input[name="'+ga(""+a)+'"][type="radio"]'),a=0;a<i.length;a++){var o=i[a];if(o!==t&&o.form===t.form){var f=o[ge]||null;if(!f)throw Error(l(90));Ho(o,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(a=0;a<i.length;a++)o=i[a],o.form===t.form&&$d(o)}break t;case"textarea":Zd(t,i.value,i.defaultValue);break t;case"select":a=i.value,a!=null&&On(t,!!i.multiple,a,!1)}}}var Fo=!1;function tf(t,a,i){if(Fo)return t(a,i);Fo=!0;try{var o=t(a);return o}finally{if(Fo=!1,(Ln!==null||Bn!==null)&&(Ar(),Ln&&(a=Ln,t=Bn,Bn=Ln=null,Id(a),t)))for(a=0;a<t.length;a++)Id(t[a])}}function ji(t,a){var i=t.stateNode;if(i===null)return null;var o=i[ge]||null;if(o===null)return null;i=o[a];t:switch(a){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break t;default:t=!1}if(t)return null;if(i&&typeof i!="function")throw Error(l(231,a,typeof i));return i}var ls=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xo=!1;if(ls)try{var wi={};Object.defineProperty(wi,"passive",{get:function(){Xo=!0}}),window.addEventListener("test",wi,wi),window.removeEventListener("test",wi,wi)}catch{Xo=!1}var Cs=null,Go=null,Xl=null;function ef(){if(Xl)return Xl;var t,a=Go,i=a.length,o,f="value"in Cs?Cs.value:Cs.textContent,g=f.length;for(t=0;t<i&&a[t]===f[t];t++);var b=i-t;for(o=1;o<=b&&a[i-o]===f[g-o];o++);return Xl=f.slice(t,1<o?1-o:void 0)}function Gl(t){var a=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&a===13&&(t=13)):t=a,t===10&&(t=13),32<=t||t===13?t:0}function $l(){return!0}function af(){return!1}function $e(t){function a(i,o,f,g,b){this._reactName=i,this._targetInst=f,this.type=o,this.nativeEvent=g,this.target=b,this.currentTarget=null;for(var S in t)t.hasOwnProperty(S)&&(i=t[S],this[S]=i?i(g):g[S]);return this.isDefaultPrevented=(g.defaultPrevented!=null?g.defaultPrevented:g.returnValue===!1)?$l:af,this.isPropagationStopped=af,this}return x(a.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=$l)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=$l)},persist:function(){},isPersistent:$l}),a}var on={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ql=$e(on),Ni=x({},on,{view:0,detail:0}),wb=$e(Ni),$o,Qo,Ei,Zl=x({},Ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ko,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ei&&(Ei&&t.type==="mousemove"?($o=t.screenX-Ei.screenX,Qo=t.screenY-Ei.screenY):Qo=$o=0,Ei=t),$o)},movementY:function(t){return"movementY"in t?t.movementY:Qo}}),sf=$e(Zl),Nb=x({},Zl,{dataTransfer:0}),Eb=$e(Nb),Tb=x({},Ni,{relatedTarget:0}),Zo=$e(Tb),kb=x({},on,{animationName:0,elapsedTime:0,pseudoElement:0}),Ab=$e(kb),Cb=x({},on,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Mb=$e(Cb),Db=x({},on,{data:0}),nf=$e(Db),Rb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ob={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},zb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Lb(t){var a=this.nativeEvent;return a.getModifierState?a.getModifierState(t):(t=zb[t])?!!a[t]:!1}function Ko(){return Lb}var Bb=x({},Ni,{key:function(t){if(t.key){var a=Rb[t.key]||t.key;if(a!=="Unidentified")return a}return t.type==="keypress"?(t=Gl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ob[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ko,charCode:function(t){return t.type==="keypress"?Gl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Gl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Ub=$e(Bb),Hb=x({},Zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lf=$e(Hb),Pb=x({},Ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ko}),qb=$e(Pb),Yb=x({},on,{propertyName:0,elapsedTime:0,pseudoElement:0}),Vb=$e(Yb),Fb=x({},Zl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Xb=$e(Fb),Gb=x({},on,{newState:0,oldState:0}),$b=$e(Gb),Qb=[9,13,27,32],Wo=ls&&"CompositionEvent"in window,Ti=null;ls&&"documentMode"in document&&(Ti=document.documentMode);var Zb=ls&&"TextEvent"in window&&!Ti,rf=ls&&(!Wo||Ti&&8<Ti&&11>=Ti),of=" ",cf=!1;function uf(t,a){switch(t){case"keyup":return Qb.indexOf(a.keyCode)!==-1;case"keydown":return a.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function df(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Un=!1;function Kb(t,a){switch(t){case"compositionend":return df(a);case"keypress":return a.which!==32?null:(cf=!0,of);case"textInput":return t=a.data,t===of&&cf?null:t;default:return null}}function Wb(t,a){if(Un)return t==="compositionend"||!Wo&&uf(t,a)?(t=ef(),Xl=Go=Cs=null,Un=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(a.ctrlKey||a.altKey||a.metaKey)||a.ctrlKey&&a.altKey){if(a.char&&1<a.char.length)return a.char;if(a.which)return String.fromCharCode(a.which)}return null;case"compositionend":return rf&&a.locale!=="ko"?null:a.data;default:return null}}var Jb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ff(t){var a=t&&t.nodeName&&t.nodeName.toLowerCase();return a==="input"?!!Jb[t.type]:a==="textarea"}function hf(t,a,i,o){Ln?Bn?Bn.push(o):Bn=[o]:Ln=o,a=zr(a,"onChange"),0<a.length&&(i=new Ql("onChange","change",null,i,o),t.push({event:i,listeners:a}))}var ki=null,Ai=null;function Ib(t){$m(t,0)}function Kl(t){var a=Rt(t);if($d(a))return t}function mf(t,a){if(t==="change")return a}var gf=!1;if(ls){var Jo;if(ls){var Io="oninput"in document;if(!Io){var pf=document.createElement("div");pf.setAttribute("oninput","return;"),Io=typeof pf.oninput=="function"}Jo=Io}else Jo=!1;gf=Jo&&(!document.documentMode||9<document.documentMode)}function xf(){ki&&(ki.detachEvent("onpropertychange",bf),Ai=ki=null)}function bf(t){if(t.propertyName==="value"&&Kl(Ai)){var a=[];hf(a,Ai,t,Vo(t)),tf(Ib,a)}}function t0(t,a,i){t==="focusin"?(xf(),ki=a,Ai=i,ki.attachEvent("onpropertychange",bf)):t==="focusout"&&xf()}function e0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Kl(Ai)}function a0(t,a){if(t==="click")return Kl(a)}function s0(t,a){if(t==="input"||t==="change")return Kl(a)}function n0(t,a){return t===a&&(t!==0||1/t===1/a)||t!==t&&a!==a}var ia=typeof Object.is=="function"?Object.is:n0;function Ci(t,a){if(ia(t,a))return!0;if(typeof t!="object"||t===null||typeof a!="object"||a===null)return!1;var i=Object.keys(t),o=Object.keys(a);if(i.length!==o.length)return!1;for(o=0;o<i.length;o++){var f=i[o];if(!Fe.call(a,f)||!ia(t[f],a[f]))return!1}return!0}function yf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function vf(t,a){var i=yf(t);t=0;for(var o;i;){if(i.nodeType===3){if(o=t+i.textContent.length,t<=a&&o>=a)return{node:i,offset:a-t};t=o}t:{for(;i;){if(i.nextSibling){i=i.nextSibling;break t}i=i.parentNode}i=void 0}i=yf(i)}}function Sf(t,a){return t&&a?t===a?!0:t&&t.nodeType===3?!1:a&&a.nodeType===3?Sf(t,a.parentNode):"contains"in t?t.contains(a):t.compareDocumentPosition?!!(t.compareDocumentPosition(a)&16):!1:!1}function _f(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var a=Vl(t.document);a instanceof t.HTMLIFrameElement;){try{var i=typeof a.contentWindow.location.href=="string"}catch{i=!1}if(i)t=a.contentWindow;else break;a=Vl(t.document)}return a}function tc(t){var a=t&&t.nodeName&&t.nodeName.toLowerCase();return a&&(a==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||a==="textarea"||t.contentEditable==="true")}var i0=ls&&"documentMode"in document&&11>=document.documentMode,Hn=null,ec=null,Mi=null,ac=!1;function jf(t,a,i){var o=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;ac||Hn==null||Hn!==Vl(o)||(o=Hn,"selectionStart"in o&&tc(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Mi&&Ci(Mi,o)||(Mi=o,o=zr(ec,"onSelect"),0<o.length&&(a=new Ql("onSelect","select",null,a,i),t.push({event:a,listeners:o}),a.target=Hn)))}function cn(t,a){var i={};return i[t.toLowerCase()]=a.toLowerCase(),i["Webkit"+t]="webkit"+a,i["Moz"+t]="moz"+a,i}var Pn={animationend:cn("Animation","AnimationEnd"),animationiteration:cn("Animation","AnimationIteration"),animationstart:cn("Animation","AnimationStart"),transitionrun:cn("Transition","TransitionRun"),transitionstart:cn("Transition","TransitionStart"),transitioncancel:cn("Transition","TransitionCancel"),transitionend:cn("Transition","TransitionEnd")},sc={},wf={};ls&&(wf=document.createElement("div").style,"AnimationEvent"in window||(delete Pn.animationend.animation,delete Pn.animationiteration.animation,delete Pn.animationstart.animation),"TransitionEvent"in window||delete Pn.transitionend.transition);function un(t){if(sc[t])return sc[t];if(!Pn[t])return t;var a=Pn[t],i;for(i in a)if(a.hasOwnProperty(i)&&i in wf)return sc[t]=a[i];return t}var Nf=un("animationend"),Ef=un("animationiteration"),Tf=un("animationstart"),l0=un("transitionrun"),r0=un("transitionstart"),o0=un("transitioncancel"),kf=un("transitionend"),Af=new Map,nc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");nc.push("scrollEnd");function Da(t,a){Af.set(t,a),ns(a,[t])}var Cf=new WeakMap;function pa(t,a){if(typeof t=="object"&&t!==null){var i=Cf.get(t);return i!==void 0?i:(a={value:t,source:a,stack:Xd(a)},Cf.set(t,a),a)}return{value:t,source:a,stack:Xd(a)}}var xa=[],qn=0,ic=0;function Wl(){for(var t=qn,a=ic=qn=0;a<t;){var i=xa[a];xa[a++]=null;var o=xa[a];xa[a++]=null;var f=xa[a];xa[a++]=null;var g=xa[a];if(xa[a++]=null,o!==null&&f!==null){var b=o.pending;b===null?f.next=f:(f.next=b.next,b.next=f),o.pending=f}g!==0&&Mf(i,f,g)}}function Jl(t,a,i,o){xa[qn++]=t,xa[qn++]=a,xa[qn++]=i,xa[qn++]=o,ic|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function lc(t,a,i,o){return Jl(t,a,i,o),Il(t)}function Yn(t,a){return Jl(t,null,null,a),Il(t)}function Mf(t,a,i){t.lanes|=i;var o=t.alternate;o!==null&&(o.lanes|=i);for(var f=!1,g=t.return;g!==null;)g.childLanes|=i,o=g.alternate,o!==null&&(o.childLanes|=i),g.tag===22&&(t=g.stateNode,t===null||t._visibility&1||(f=!0)),t=g,g=g.return;return t.tag===3?(g=t.stateNode,f&&a!==null&&(f=31-ce(i),t=g.hiddenUpdates,o=t[f],o===null?t[f]=[a]:o.push(a),a.lane=i|536870912),g):null}function Il(t){if(50<al)throw al=0,fu=null,Error(l(185));for(var a=t.return;a!==null;)t=a,a=t.return;return t.tag===3?t.stateNode:null}var Vn={};function c0(t,a,i,o){this.tag=t,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=a,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function la(t,a,i,o){return new c0(t,a,i,o)}function rc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function rs(t,a){var i=t.alternate;return i===null?(i=la(t.tag,a,t.key,t.mode),i.elementType=t.elementType,i.type=t.type,i.stateNode=t.stateNode,i.alternate=t,t.alternate=i):(i.pendingProps=a,i.type=t.type,i.flags=0,i.subtreeFlags=0,i.deletions=null),i.flags=t.flags&65011712,i.childLanes=t.childLanes,i.lanes=t.lanes,i.child=t.child,i.memoizedProps=t.memoizedProps,i.memoizedState=t.memoizedState,i.updateQueue=t.updateQueue,a=t.dependencies,i.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext},i.sibling=t.sibling,i.index=t.index,i.ref=t.ref,i.refCleanup=t.refCleanup,i}function Df(t,a){t.flags&=65011714;var i=t.alternate;return i===null?(t.childLanes=0,t.lanes=a,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=i.childLanes,t.lanes=i.lanes,t.child=i.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=i.memoizedProps,t.memoizedState=i.memoizedState,t.updateQueue=i.updateQueue,t.type=i.type,a=i.dependencies,t.dependencies=a===null?null:{lanes:a.lanes,firstContext:a.firstContext}),t}function tr(t,a,i,o,f,g){var b=0;if(o=t,typeof t=="function")rc(t)&&(b=1);else if(typeof t=="string")b=dy(t,i,I.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case it:return t=la(31,i,a,f),t.elementType=it,t.lanes=g,t;case w:return dn(i.children,f,g,a);case E:b=8,f|=24;break;case T:return t=la(12,i,a,f|2),t.elementType=T,t.lanes=g,t;case Y:return t=la(13,i,a,f),t.elementType=Y,t.lanes=g,t;case st:return t=la(19,i,a,f),t.elementType=st,t.lanes=g,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case M:case V:b=10;break t;case O:b=9;break t;case K:b=11;break t;case tt:b=14;break t;case at:b=16,o=null;break t}b=29,i=Error(l(130,t===null?"null":typeof t,"")),o=null}return a=la(b,i,a,f),a.elementType=t,a.type=o,a.lanes=g,a}function dn(t,a,i,o){return t=la(7,t,o,a),t.lanes=i,t}function oc(t,a,i){return t=la(6,t,null,a),t.lanes=i,t}function cc(t,a,i){return a=la(4,t.children!==null?t.children:[],t.key,a),a.lanes=i,a.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},a}var Fn=[],Xn=0,er=null,ar=0,ba=[],ya=0,fn=null,os=1,cs="";function hn(t,a){Fn[Xn++]=ar,Fn[Xn++]=er,er=t,ar=a}function Rf(t,a,i){ba[ya++]=os,ba[ya++]=cs,ba[ya++]=fn,fn=t;var o=os;t=cs;var f=32-ce(o)-1;o&=~(1<<f),i+=1;var g=32-ce(a)+f;if(30<g){var b=f-f%5;g=(o&(1<<b)-1).toString(32),o>>=b,f-=b,os=1<<32-ce(a)+f|i<<f|o,cs=g+t}else os=1<<g|i<<f|o,cs=t}function uc(t){t.return!==null&&(hn(t,1),Rf(t,1,0))}function dc(t){for(;t===er;)er=Fn[--Xn],Fn[Xn]=null,ar=Fn[--Xn],Fn[Xn]=null;for(;t===fn;)fn=ba[--ya],ba[ya]=null,cs=ba[--ya],ba[ya]=null,os=ba[--ya],ba[ya]=null}var Ye=null,re=null,Ht=!1,mn=null,Xa=!1,fc=Error(l(519));function gn(t){var a=Error(l(418,""));throw Oi(pa(a,t)),fc}function Of(t){var a=t.stateNode,i=t.type,o=t.memoizedProps;switch(a[Kt]=t,a[ge]=o,i){case"dialog":Dt("cancel",a),Dt("close",a);break;case"iframe":case"object":case"embed":Dt("load",a);break;case"video":case"audio":for(i=0;i<nl.length;i++)Dt(nl[i],a);break;case"source":Dt("error",a);break;case"img":case"image":case"link":Dt("error",a),Dt("load",a);break;case"details":Dt("toggle",a);break;case"input":Dt("invalid",a),Qd(a,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0),Yl(a);break;case"select":Dt("invalid",a);break;case"textarea":Dt("invalid",a),Kd(a,o.value,o.defaultValue,o.children),Yl(a)}i=o.children,typeof i!="string"&&typeof i!="number"&&typeof i!="bigint"||a.textContent===""+i||o.suppressHydrationWarning===!0||Wm(a.textContent,i)?(o.popover!=null&&(Dt("beforetoggle",a),Dt("toggle",a)),o.onScroll!=null&&Dt("scroll",a),o.onScrollEnd!=null&&Dt("scrollend",a),o.onClick!=null&&(a.onclick=Lr),a=!0):a=!1,a||gn(t)}function zf(t){for(Ye=t.return;Ye;)switch(Ye.tag){case 5:case 13:Xa=!1;return;case 27:case 3:Xa=!0;return;default:Ye=Ye.return}}function Di(t){if(t!==Ye)return!1;if(!Ht)return zf(t),Ht=!0,!1;var a=t.tag,i;if((i=a!==3&&a!==27)&&((i=a===5)&&(i=t.type,i=!(i!=="form"&&i!=="button")||ku(t.type,t.memoizedProps)),i=!i),i&&re&&gn(t),zf(t),a===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(l(317));t:{for(t=t.nextSibling,a=0;t;){if(t.nodeType===8)if(i=t.data,i==="/$"){if(a===0){re=Oa(t.nextSibling);break t}a--}else i!=="$"&&i!=="$!"&&i!=="$?"||a++;t=t.nextSibling}re=null}}else a===27?(a=re,Gs(t.type)?(t=Du,Du=null,re=t):re=a):re=Ye?Oa(t.stateNode.nextSibling):null;return!0}function Ri(){re=Ye=null,Ht=!1}function Lf(){var t=mn;return t!==null&&(Ke===null?Ke=t:Ke.push.apply(Ke,t),mn=null),t}function Oi(t){mn===null?mn=[t]:mn.push(t)}var hc=$(null),pn=null,us=null;function Ms(t,a,i){J(hc,a._currentValue),a._currentValue=i}function ds(t){t._currentValue=hc.current,G(hc)}function mc(t,a,i){for(;t!==null;){var o=t.alternate;if((t.childLanes&a)!==a?(t.childLanes|=a,o!==null&&(o.childLanes|=a)):o!==null&&(o.childLanes&a)!==a&&(o.childLanes|=a),t===i)break;t=t.return}}function gc(t,a,i,o){var f=t.child;for(f!==null&&(f.return=t);f!==null;){var g=f.dependencies;if(g!==null){var b=f.child;g=g.firstContext;t:for(;g!==null;){var S=g;g=f;for(var N=0;N<a.length;N++)if(S.context===a[N]){g.lanes|=i,S=g.alternate,S!==null&&(S.lanes|=i),mc(g.return,i,t),o||(b=null);break t}g=S.next}}else if(f.tag===18){if(b=f.return,b===null)throw Error(l(341));b.lanes|=i,g=b.alternate,g!==null&&(g.lanes|=i),mc(b,i,t),b=null}else b=f.child;if(b!==null)b.return=f;else for(b=f;b!==null;){if(b===t){b=null;break}if(f=b.sibling,f!==null){f.return=b.return,b=f;break}b=b.return}f=b}}function zi(t,a,i,o){t=null;for(var f=a,g=!1;f!==null;){if(!g){if((f.flags&524288)!==0)g=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var b=f.alternate;if(b===null)throw Error(l(387));if(b=b.memoizedProps,b!==null){var S=f.type;ia(f.pendingProps.value,b.value)||(t!==null?t.push(S):t=[S])}}else if(f===ae.current){if(b=f.alternate,b===null)throw Error(l(387));b.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(t!==null?t.push(ul):t=[ul])}f=f.return}t!==null&&gc(a,t,i,o),a.flags|=262144}function sr(t){for(t=t.firstContext;t!==null;){if(!ia(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function xn(t){pn=t,us=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Oe(t){return Bf(pn,t)}function nr(t,a){return pn===null&&xn(t),Bf(t,a)}function Bf(t,a){var i=a._currentValue;if(a={context:a,memoizedValue:i,next:null},us===null){if(t===null)throw Error(l(308));us=a,t.dependencies={lanes:0,firstContext:a},t.flags|=524288}else us=us.next=a;return i}var u0=typeof AbortController<"u"?AbortController:function(){var t=[],a=this.signal={aborted:!1,addEventListener:function(i,o){t.push(o)}};this.abort=function(){a.aborted=!0,t.forEach(function(i){return i()})}},d0=s.unstable_scheduleCallback,f0=s.unstable_NormalPriority,ve={$$typeof:V,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function pc(){return{controller:new u0,data:new Map,refCount:0}}function Li(t){t.refCount--,t.refCount===0&&d0(f0,function(){t.controller.abort()})}var Bi=null,xc=0,Gn=0,$n=null;function h0(t,a){if(Bi===null){var i=Bi=[];xc=0,Gn=yu(),$n={status:"pending",value:void 0,then:function(o){i.push(o)}}}return xc++,a.then(Uf,Uf),a}function Uf(){if(--xc===0&&Bi!==null){$n!==null&&($n.status="fulfilled");var t=Bi;Bi=null,Gn=0,$n=null;for(var a=0;a<t.length;a++)(0,t[a])()}}function m0(t,a){var i=[],o={status:"pending",value:null,reason:null,then:function(f){i.push(f)}};return t.then(function(){o.status="fulfilled",o.value=a;for(var f=0;f<i.length;f++)(0,i[f])(a)},function(f){for(o.status="rejected",o.reason=f,f=0;f<i.length;f++)(0,i[f])(void 0)}),o}var Hf=B.S;B.S=function(t,a){typeof a=="object"&&a!==null&&typeof a.then=="function"&&h0(t,a),Hf!==null&&Hf(t,a)};var bn=$(null);function bc(){var t=bn.current;return t!==null?t:te.pooledCache}function ir(t,a){a===null?J(bn,bn.current):J(bn,a.pool)}function Pf(){var t=bc();return t===null?null:{parent:ve._currentValue,pool:t}}var Ui=Error(l(460)),qf=Error(l(474)),lr=Error(l(542)),yc={then:function(){}};function Yf(t){return t=t.status,t==="fulfilled"||t==="rejected"}function rr(){}function Vf(t,a,i){switch(i=t[i],i===void 0?t.push(a):i!==a&&(a.then(rr,rr),a=i),a.status){case"fulfilled":return a.value;case"rejected":throw t=a.reason,Xf(t),t;default:if(typeof a.status=="string")a.then(rr,rr);else{if(t=te,t!==null&&100<t.shellSuspendCounter)throw Error(l(482));t=a,t.status="pending",t.then(function(o){if(a.status==="pending"){var f=a;f.status="fulfilled",f.value=o}},function(o){if(a.status==="pending"){var f=a;f.status="rejected",f.reason=o}})}switch(a.status){case"fulfilled":return a.value;case"rejected":throw t=a.reason,Xf(t),t}throw Hi=a,Ui}}var Hi=null;function Ff(){if(Hi===null)throw Error(l(459));var t=Hi;return Hi=null,t}function Xf(t){if(t===Ui||t===lr)throw Error(l(483))}var Ds=!1;function vc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Sc(t,a){t=t.updateQueue,a.updateQueue===t&&(a.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Rs(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Os(t,a,i){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(qt&2)!==0){var f=o.pending;return f===null?a.next=a:(a.next=f.next,f.next=a),o.pending=a,a=Il(t),Mf(t,null,i),a}return Jl(t,o,a,i),Il(t)}function Pi(t,a,i){if(a=a.updateQueue,a!==null&&(a=a.shared,(i&4194048)!==0)){var o=a.lanes;o&=t.pendingLanes,i|=o,a.lanes=i,As(t,i)}}function _c(t,a){var i=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,i===o)){var f=null,g=null;if(i=i.firstBaseUpdate,i!==null){do{var b={lane:i.lane,tag:i.tag,payload:i.payload,callback:null,next:null};g===null?f=g=b:g=g.next=b,i=i.next}while(i!==null);g===null?f=g=a:g=g.next=a}else f=g=a;i={baseState:o.baseState,firstBaseUpdate:f,lastBaseUpdate:g,shared:o.shared,callbacks:o.callbacks},t.updateQueue=i;return}t=i.lastBaseUpdate,t===null?i.firstBaseUpdate=a:t.next=a,i.lastBaseUpdate=a}var jc=!1;function qi(){if(jc){var t=$n;if(t!==null)throw t}}function Yi(t,a,i,o){jc=!1;var f=t.updateQueue;Ds=!1;var g=f.firstBaseUpdate,b=f.lastBaseUpdate,S=f.shared.pending;if(S!==null){f.shared.pending=null;var N=S,H=N.next;N.next=null,b===null?g=H:b.next=H,b=N;var X=t.alternate;X!==null&&(X=X.updateQueue,S=X.lastBaseUpdate,S!==b&&(S===null?X.firstBaseUpdate=H:S.next=H,X.lastBaseUpdate=N))}if(g!==null){var Z=f.baseState;b=0,X=H=N=null,S=g;do{var P=S.lane&-536870913,q=P!==S.lane;if(q?(Ot&P)===P:(o&P)===P){P!==0&&P===Gn&&(jc=!0),X!==null&&(X=X.next={lane:0,tag:S.tag,payload:S.payload,callback:null,next:null});t:{var Tt=t,wt=S;P=a;var Qt=i;switch(wt.tag){case 1:if(Tt=wt.payload,typeof Tt=="function"){Z=Tt.call(Qt,Z,P);break t}Z=Tt;break t;case 3:Tt.flags=Tt.flags&-65537|128;case 0:if(Tt=wt.payload,P=typeof Tt=="function"?Tt.call(Qt,Z,P):Tt,P==null)break t;Z=x({},Z,P);break t;case 2:Ds=!0}}P=S.callback,P!==null&&(t.flags|=64,q&&(t.flags|=8192),q=f.callbacks,q===null?f.callbacks=[P]:q.push(P))}else q={lane:P,tag:S.tag,payload:S.payload,callback:S.callback,next:null},X===null?(H=X=q,N=Z):X=X.next=q,b|=P;if(S=S.next,S===null){if(S=f.shared.pending,S===null)break;q=S,S=q.next,q.next=null,f.lastBaseUpdate=q,f.shared.pending=null}}while(!0);X===null&&(N=Z),f.baseState=N,f.firstBaseUpdate=H,f.lastBaseUpdate=X,g===null&&(f.shared.lanes=0),Ys|=b,t.lanes=b,t.memoizedState=Z}}function Gf(t,a){if(typeof t!="function")throw Error(l(191,t));t.call(a)}function $f(t,a){var i=t.callbacks;if(i!==null)for(t.callbacks=null,t=0;t<i.length;t++)Gf(i[t],a)}var Qn=$(null),or=$(0);function Qf(t,a){t=bs,J(or,t),J(Qn,a),bs=t|a.baseLanes}function wc(){J(or,bs),J(Qn,Qn.current)}function Nc(){bs=or.current,G(Qn),G(or)}var zs=0,At=null,Gt=null,pe=null,cr=!1,Zn=!1,yn=!1,ur=0,Vi=0,Kn=null,g0=0;function de(){throw Error(l(321))}function Ec(t,a){if(a===null)return!1;for(var i=0;i<a.length&&i<t.length;i++)if(!ia(t[i],a[i]))return!1;return!0}function Tc(t,a,i,o,f,g){return zs=g,At=a,a.memoizedState=null,a.updateQueue=null,a.lanes=0,B.H=t===null||t.memoizedState===null?Mh:Dh,yn=!1,g=i(o,f),yn=!1,Zn&&(g=Kf(a,i,o,f)),Zf(t),g}function Zf(t){B.H=pr;var a=Gt!==null&&Gt.next!==null;if(zs=0,pe=Gt=At=null,cr=!1,Vi=0,Kn=null,a)throw Error(l(300));t===null||Ne||(t=t.dependencies,t!==null&&sr(t)&&(Ne=!0))}function Kf(t,a,i,o){At=t;var f=0;do{if(Zn&&(Kn=null),Vi=0,Zn=!1,25<=f)throw Error(l(301));if(f+=1,pe=Gt=null,t.updateQueue!=null){var g=t.updateQueue;g.lastEffect=null,g.events=null,g.stores=null,g.memoCache!=null&&(g.memoCache.index=0)}B.H=_0,g=a(i,o)}while(Zn);return g}function p0(){var t=B.H,a=t.useState()[0];return a=typeof a.then=="function"?Fi(a):a,t=t.useState()[0],(Gt!==null?Gt.memoizedState:null)!==t&&(At.flags|=1024),a}function kc(){var t=ur!==0;return ur=0,t}function Ac(t,a,i){a.updateQueue=t.updateQueue,a.flags&=-2053,t.lanes&=~i}function Cc(t){if(cr){for(t=t.memoizedState;t!==null;){var a=t.queue;a!==null&&(a.pending=null),t=t.next}cr=!1}zs=0,pe=Gt=At=null,Zn=!1,Vi=ur=0,Kn=null}function Qe(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pe===null?At.memoizedState=pe=t:pe=pe.next=t,pe}function xe(){if(Gt===null){var t=At.alternate;t=t!==null?t.memoizedState:null}else t=Gt.next;var a=pe===null?At.memoizedState:pe.next;if(a!==null)pe=a,Gt=t;else{if(t===null)throw At.alternate===null?Error(l(467)):Error(l(310));Gt=t,t={memoizedState:Gt.memoizedState,baseState:Gt.baseState,baseQueue:Gt.baseQueue,queue:Gt.queue,next:null},pe===null?At.memoizedState=pe=t:pe=pe.next=t}return pe}function Mc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Fi(t){var a=Vi;return Vi+=1,Kn===null&&(Kn=[]),t=Vf(Kn,t,a),a=At,(pe===null?a.memoizedState:pe.next)===null&&(a=a.alternate,B.H=a===null||a.memoizedState===null?Mh:Dh),t}function dr(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Fi(t);if(t.$$typeof===V)return Oe(t)}throw Error(l(438,String(t)))}function Dc(t){var a=null,i=At.updateQueue;if(i!==null&&(a=i.memoCache),a==null){var o=At.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(a={data:o.data.map(function(f){return f.slice()}),index:0})))}if(a==null&&(a={data:[],index:0}),i===null&&(i=Mc(),At.updateQueue=i),i.memoCache=a,i=a.data[a.index],i===void 0)for(i=a.data[a.index]=Array(t),o=0;o<t;o++)i[o]=ft;return a.index++,i}function fs(t,a){return typeof a=="function"?a(t):a}function fr(t){var a=xe();return Rc(a,Gt,t)}function Rc(t,a,i){var o=t.queue;if(o===null)throw Error(l(311));o.lastRenderedReducer=i;var f=t.baseQueue,g=o.pending;if(g!==null){if(f!==null){var b=f.next;f.next=g.next,g.next=b}a.baseQueue=f=g,o.pending=null}if(g=t.baseState,f===null)t.memoizedState=g;else{a=f.next;var S=b=null,N=null,H=a,X=!1;do{var Z=H.lane&-536870913;if(Z!==H.lane?(Ot&Z)===Z:(zs&Z)===Z){var P=H.revertLane;if(P===0)N!==null&&(N=N.next={lane:0,revertLane:0,action:H.action,hasEagerState:H.hasEagerState,eagerState:H.eagerState,next:null}),Z===Gn&&(X=!0);else if((zs&P)===P){H=H.next,P===Gn&&(X=!0);continue}else Z={lane:0,revertLane:H.revertLane,action:H.action,hasEagerState:H.hasEagerState,eagerState:H.eagerState,next:null},N===null?(S=N=Z,b=g):N=N.next=Z,At.lanes|=P,Ys|=P;Z=H.action,yn&&i(g,Z),g=H.hasEagerState?H.eagerState:i(g,Z)}else P={lane:Z,revertLane:H.revertLane,action:H.action,hasEagerState:H.hasEagerState,eagerState:H.eagerState,next:null},N===null?(S=N=P,b=g):N=N.next=P,At.lanes|=Z,Ys|=Z;H=H.next}while(H!==null&&H!==a);if(N===null?b=g:N.next=S,!ia(g,t.memoizedState)&&(Ne=!0,X&&(i=$n,i!==null)))throw i;t.memoizedState=g,t.baseState=b,t.baseQueue=N,o.lastRenderedState=g}return f===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function Oc(t){var a=xe(),i=a.queue;if(i===null)throw Error(l(311));i.lastRenderedReducer=t;var o=i.dispatch,f=i.pending,g=a.memoizedState;if(f!==null){i.pending=null;var b=f=f.next;do g=t(g,b.action),b=b.next;while(b!==f);ia(g,a.memoizedState)||(Ne=!0),a.memoizedState=g,a.baseQueue===null&&(a.baseState=g),i.lastRenderedState=g}return[g,o]}function Wf(t,a,i){var o=At,f=xe(),g=Ht;if(g){if(i===void 0)throw Error(l(407));i=i()}else i=a();var b=!ia((Gt||f).memoizedState,i);b&&(f.memoizedState=i,Ne=!0),f=f.queue;var S=th.bind(null,o,f,t);if(Xi(2048,8,S,[t]),f.getSnapshot!==a||b||pe!==null&&pe.memoizedState.tag&1){if(o.flags|=2048,Wn(9,hr(),If.bind(null,o,f,i,a),null),te===null)throw Error(l(349));g||(zs&124)!==0||Jf(o,a,i)}return i}function Jf(t,a,i){t.flags|=16384,t={getSnapshot:a,value:i},a=At.updateQueue,a===null?(a=Mc(),At.updateQueue=a,a.stores=[t]):(i=a.stores,i===null?a.stores=[t]:i.push(t))}function If(t,a,i,o){a.value=i,a.getSnapshot=o,eh(a)&&ah(t)}function th(t,a,i){return i(function(){eh(a)&&ah(t)})}function eh(t){var a=t.getSnapshot;t=t.value;try{var i=a();return!ia(t,i)}catch{return!0}}function ah(t){var a=Yn(t,2);a!==null&&da(a,t,2)}function zc(t){var a=Qe();if(typeof t=="function"){var i=t;if(t=i(),yn){me(!0);try{i()}finally{me(!1)}}}return a.memoizedState=a.baseState=t,a.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:t},a}function sh(t,a,i,o){return t.baseState=i,Rc(t,Gt,typeof o=="function"?o:fs)}function x0(t,a,i,o,f){if(gr(t))throw Error(l(485));if(t=a.action,t!==null){var g={payload:f,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(b){g.listeners.push(b)}};B.T!==null?i(!0):g.isTransition=!1,o(g),i=a.pending,i===null?(g.next=a.pending=g,nh(a,g)):(g.next=i.next,a.pending=i.next=g)}}function nh(t,a){var i=a.action,o=a.payload,f=t.state;if(a.isTransition){var g=B.T,b={};B.T=b;try{var S=i(f,o),N=B.S;N!==null&&N(b,S),ih(t,a,S)}catch(H){Lc(t,a,H)}finally{B.T=g}}else try{g=i(f,o),ih(t,a,g)}catch(H){Lc(t,a,H)}}function ih(t,a,i){i!==null&&typeof i=="object"&&typeof i.then=="function"?i.then(function(o){lh(t,a,o)},function(o){return Lc(t,a,o)}):lh(t,a,i)}function lh(t,a,i){a.status="fulfilled",a.value=i,rh(a),t.state=i,a=t.pending,a!==null&&(i=a.next,i===a?t.pending=null:(i=i.next,a.next=i,nh(t,i)))}function Lc(t,a,i){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do a.status="rejected",a.reason=i,rh(a),a=a.next;while(a!==o)}t.action=null}function rh(t){t=t.listeners;for(var a=0;a<t.length;a++)(0,t[a])()}function oh(t,a){return a}function ch(t,a){if(Ht){var i=te.formState;if(i!==null){t:{var o=At;if(Ht){if(re){e:{for(var f=re,g=Xa;f.nodeType!==8;){if(!g){f=null;break e}if(f=Oa(f.nextSibling),f===null){f=null;break e}}g=f.data,f=g==="F!"||g==="F"?f:null}if(f){re=Oa(f.nextSibling),o=f.data==="F!";break t}}gn(o)}o=!1}o&&(a=i[0])}}return i=Qe(),i.memoizedState=i.baseState=a,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oh,lastRenderedState:a},i.queue=o,i=kh.bind(null,At,o),o.dispatch=i,o=zc(!1),g=qc.bind(null,At,!1,o.queue),o=Qe(),f={state:a,dispatch:null,action:t,pending:null},o.queue=f,i=x0.bind(null,At,f,g,i),f.dispatch=i,o.memoizedState=t,[a,i,!1]}function uh(t){var a=xe();return dh(a,Gt,t)}function dh(t,a,i){if(a=Rc(t,a,oh)[0],t=fr(fs)[0],typeof a=="object"&&a!==null&&typeof a.then=="function")try{var o=Fi(a)}catch(b){throw b===Ui?lr:b}else o=a;a=xe();var f=a.queue,g=f.dispatch;return i!==a.memoizedState&&(At.flags|=2048,Wn(9,hr(),b0.bind(null,f,i),null)),[o,g,t]}function b0(t,a){t.action=a}function fh(t){var a=xe(),i=Gt;if(i!==null)return dh(a,i,t);xe(),a=a.memoizedState,i=xe();var o=i.queue.dispatch;return i.memoizedState=t,[a,o,!1]}function Wn(t,a,i,o){return t={tag:t,create:i,deps:o,inst:a,next:null},a=At.updateQueue,a===null&&(a=Mc(),At.updateQueue=a),i=a.lastEffect,i===null?a.lastEffect=t.next=t:(o=i.next,i.next=t,t.next=o,a.lastEffect=t),t}function hr(){return{destroy:void 0,resource:void 0}}function hh(){return xe().memoizedState}function mr(t,a,i,o){var f=Qe();o=o===void 0?null:o,At.flags|=t,f.memoizedState=Wn(1|a,hr(),i,o)}function Xi(t,a,i,o){var f=xe();o=o===void 0?null:o;var g=f.memoizedState.inst;Gt!==null&&o!==null&&Ec(o,Gt.memoizedState.deps)?f.memoizedState=Wn(a,g,i,o):(At.flags|=t,f.memoizedState=Wn(1|a,g,i,o))}function mh(t,a){mr(8390656,8,t,a)}function gh(t,a){Xi(2048,8,t,a)}function ph(t,a){return Xi(4,2,t,a)}function xh(t,a){return Xi(4,4,t,a)}function bh(t,a){if(typeof a=="function"){t=t();var i=a(t);return function(){typeof i=="function"?i():a(null)}}if(a!=null)return t=t(),a.current=t,function(){a.current=null}}function yh(t,a,i){i=i!=null?i.concat([t]):null,Xi(4,4,bh.bind(null,a,t),i)}function Bc(){}function vh(t,a){var i=xe();a=a===void 0?null:a;var o=i.memoizedState;return a!==null&&Ec(a,o[1])?o[0]:(i.memoizedState=[t,a],t)}function Sh(t,a){var i=xe();a=a===void 0?null:a;var o=i.memoizedState;if(a!==null&&Ec(a,o[1]))return o[0];if(o=t(),yn){me(!0);try{t()}finally{me(!1)}}return i.memoizedState=[o,a],o}function Uc(t,a,i){return i===void 0||(zs&1073741824)!==0?t.memoizedState=a:(t.memoizedState=i,t=wm(),At.lanes|=t,Ys|=t,i)}function _h(t,a,i,o){return ia(i,a)?i:Qn.current!==null?(t=Uc(t,i,o),ia(t,a)||(Ne=!0),t):(zs&42)===0?(Ne=!0,t.memoizedState=i):(t=wm(),At.lanes|=t,Ys|=t,a)}function jh(t,a,i,o,f){var g=W.p;W.p=g!==0&&8>g?g:8;var b=B.T,S={};B.T=S,qc(t,!1,a,i);try{var N=f(),H=B.S;if(H!==null&&H(S,N),N!==null&&typeof N=="object"&&typeof N.then=="function"){var X=m0(N,o);Gi(t,a,X,ua(t))}else Gi(t,a,o,ua(t))}catch(Z){Gi(t,a,{then:function(){},status:"rejected",reason:Z},ua())}finally{W.p=g,B.T=b}}function y0(){}function Hc(t,a,i,o){if(t.tag!==5)throw Error(l(476));var f=wh(t).queue;jh(t,f,a,lt,i===null?y0:function(){return Nh(t),i(o)})}function wh(t){var a=t.memoizedState;if(a!==null)return a;a={memoizedState:lt,baseState:lt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:lt},next:null};var i={};return a.next={memoizedState:i,baseState:i,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:i},next:null},t.memoizedState=a,t=t.alternate,t!==null&&(t.memoizedState=a),a}function Nh(t){var a=wh(t).next.queue;Gi(t,a,{},ua())}function Pc(){return Oe(ul)}function Eh(){return xe().memoizedState}function Th(){return xe().memoizedState}function v0(t){for(var a=t.return;a!==null;){switch(a.tag){case 24:case 3:var i=ua();t=Rs(i);var o=Os(a,t,i);o!==null&&(da(o,a,i),Pi(o,a,i)),a={cache:pc()},t.payload=a;return}a=a.return}}function S0(t,a,i){var o=ua();i={lane:o,revertLane:0,action:i,hasEagerState:!1,eagerState:null,next:null},gr(t)?Ah(a,i):(i=lc(t,a,i,o),i!==null&&(da(i,t,o),Ch(i,a,o)))}function kh(t,a,i){var o=ua();Gi(t,a,i,o)}function Gi(t,a,i,o){var f={lane:o,revertLane:0,action:i,hasEagerState:!1,eagerState:null,next:null};if(gr(t))Ah(a,f);else{var g=t.alternate;if(t.lanes===0&&(g===null||g.lanes===0)&&(g=a.lastRenderedReducer,g!==null))try{var b=a.lastRenderedState,S=g(b,i);if(f.hasEagerState=!0,f.eagerState=S,ia(S,b))return Jl(t,a,f,0),te===null&&Wl(),!1}catch{}finally{}if(i=lc(t,a,f,o),i!==null)return da(i,t,o),Ch(i,a,o),!0}return!1}function qc(t,a,i,o){if(o={lane:2,revertLane:yu(),action:o,hasEagerState:!1,eagerState:null,next:null},gr(t)){if(a)throw Error(l(479))}else a=lc(t,i,o,2),a!==null&&da(a,t,2)}function gr(t){var a=t.alternate;return t===At||a!==null&&a===At}function Ah(t,a){Zn=cr=!0;var i=t.pending;i===null?a.next=a:(a.next=i.next,i.next=a),t.pending=a}function Ch(t,a,i){if((i&4194048)!==0){var o=a.lanes;o&=t.pendingLanes,i|=o,a.lanes=i,As(t,i)}}var pr={readContext:Oe,use:dr,useCallback:de,useContext:de,useEffect:de,useImperativeHandle:de,useLayoutEffect:de,useInsertionEffect:de,useMemo:de,useReducer:de,useRef:de,useState:de,useDebugValue:de,useDeferredValue:de,useTransition:de,useSyncExternalStore:de,useId:de,useHostTransitionStatus:de,useFormState:de,useActionState:de,useOptimistic:de,useMemoCache:de,useCacheRefresh:de},Mh={readContext:Oe,use:dr,useCallback:function(t,a){return Qe().memoizedState=[t,a===void 0?null:a],t},useContext:Oe,useEffect:mh,useImperativeHandle:function(t,a,i){i=i!=null?i.concat([t]):null,mr(4194308,4,bh.bind(null,a,t),i)},useLayoutEffect:function(t,a){return mr(4194308,4,t,a)},useInsertionEffect:function(t,a){mr(4,2,t,a)},useMemo:function(t,a){var i=Qe();a=a===void 0?null:a;var o=t();if(yn){me(!0);try{t()}finally{me(!1)}}return i.memoizedState=[o,a],o},useReducer:function(t,a,i){var o=Qe();if(i!==void 0){var f=i(a);if(yn){me(!0);try{i(a)}finally{me(!1)}}}else f=a;return o.memoizedState=o.baseState=f,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:f},o.queue=t,t=t.dispatch=S0.bind(null,At,t),[o.memoizedState,t]},useRef:function(t){var a=Qe();return t={current:t},a.memoizedState=t},useState:function(t){t=zc(t);var a=t.queue,i=kh.bind(null,At,a);return a.dispatch=i,[t.memoizedState,i]},useDebugValue:Bc,useDeferredValue:function(t,a){var i=Qe();return Uc(i,t,a)},useTransition:function(){var t=zc(!1);return t=jh.bind(null,At,t.queue,!0,!1),Qe().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,a,i){var o=At,f=Qe();if(Ht){if(i===void 0)throw Error(l(407));i=i()}else{if(i=a(),te===null)throw Error(l(349));(Ot&124)!==0||Jf(o,a,i)}f.memoizedState=i;var g={value:i,getSnapshot:a};return f.queue=g,mh(th.bind(null,o,g,t),[t]),o.flags|=2048,Wn(9,hr(),If.bind(null,o,g,i,a),null),i},useId:function(){var t=Qe(),a=te.identifierPrefix;if(Ht){var i=cs,o=os;i=(o&~(1<<32-ce(o)-1)).toString(32)+i,a="«"+a+"R"+i,i=ur++,0<i&&(a+="H"+i.toString(32)),a+="»"}else i=g0++,a="«"+a+"r"+i.toString(32)+"»";return t.memoizedState=a},useHostTransitionStatus:Pc,useFormState:ch,useActionState:ch,useOptimistic:function(t){var a=Qe();a.memoizedState=a.baseState=t;var i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return a.queue=i,a=qc.bind(null,At,!0,i),i.dispatch=a,[t,a]},useMemoCache:Dc,useCacheRefresh:function(){return Qe().memoizedState=v0.bind(null,At)}},Dh={readContext:Oe,use:dr,useCallback:vh,useContext:Oe,useEffect:gh,useImperativeHandle:yh,useInsertionEffect:ph,useLayoutEffect:xh,useMemo:Sh,useReducer:fr,useRef:hh,useState:function(){return fr(fs)},useDebugValue:Bc,useDeferredValue:function(t,a){var i=xe();return _h(i,Gt.memoizedState,t,a)},useTransition:function(){var t=fr(fs)[0],a=xe().memoizedState;return[typeof t=="boolean"?t:Fi(t),a]},useSyncExternalStore:Wf,useId:Eh,useHostTransitionStatus:Pc,useFormState:uh,useActionState:uh,useOptimistic:function(t,a){var i=xe();return sh(i,Gt,t,a)},useMemoCache:Dc,useCacheRefresh:Th},_0={readContext:Oe,use:dr,useCallback:vh,useContext:Oe,useEffect:gh,useImperativeHandle:yh,useInsertionEffect:ph,useLayoutEffect:xh,useMemo:Sh,useReducer:Oc,useRef:hh,useState:function(){return Oc(fs)},useDebugValue:Bc,useDeferredValue:function(t,a){var i=xe();return Gt===null?Uc(i,t,a):_h(i,Gt.memoizedState,t,a)},useTransition:function(){var t=Oc(fs)[0],a=xe().memoizedState;return[typeof t=="boolean"?t:Fi(t),a]},useSyncExternalStore:Wf,useId:Eh,useHostTransitionStatus:Pc,useFormState:fh,useActionState:fh,useOptimistic:function(t,a){var i=xe();return Gt!==null?sh(i,Gt,t,a):(i.baseState=t,[t,i.queue.dispatch])},useMemoCache:Dc,useCacheRefresh:Th},Jn=null,$i=0;function xr(t){var a=$i;return $i+=1,Jn===null&&(Jn=[]),Vf(Jn,t,a)}function Qi(t,a){a=a.props.ref,t.ref=a!==void 0?a:null}function br(t,a){throw a.$$typeof===y?Error(l(525)):(t=Object.prototype.toString.call(a),Error(l(31,t==="[object Object]"?"object with keys {"+Object.keys(a).join(", ")+"}":t)))}function Rh(t){var a=t._init;return a(t._payload)}function Oh(t){function a(L,D){if(t){var U=L.deletions;U===null?(L.deletions=[D],L.flags|=16):U.push(D)}}function i(L,D){if(!t)return null;for(;D!==null;)a(L,D),D=D.sibling;return null}function o(L){for(var D=new Map;L!==null;)L.key!==null?D.set(L.key,L):D.set(L.index,L),L=L.sibling;return D}function f(L,D){return L=rs(L,D),L.index=0,L.sibling=null,L}function g(L,D,U){return L.index=U,t?(U=L.alternate,U!==null?(U=U.index,U<D?(L.flags|=67108866,D):U):(L.flags|=67108866,D)):(L.flags|=1048576,D)}function b(L){return t&&L.alternate===null&&(L.flags|=67108866),L}function S(L,D,U,Q){return D===null||D.tag!==6?(D=oc(U,L.mode,Q),D.return=L,D):(D=f(D,U),D.return=L,D)}function N(L,D,U,Q){var gt=U.type;return gt===w?X(L,D,U.props.children,Q,U.key):D!==null&&(D.elementType===gt||typeof gt=="object"&&gt!==null&&gt.$$typeof===at&&Rh(gt)===D.type)?(D=f(D,U.props),Qi(D,U),D.return=L,D):(D=tr(U.type,U.key,U.props,null,L.mode,Q),Qi(D,U),D.return=L,D)}function H(L,D,U,Q){return D===null||D.tag!==4||D.stateNode.containerInfo!==U.containerInfo||D.stateNode.implementation!==U.implementation?(D=cc(U,L.mode,Q),D.return=L,D):(D=f(D,U.children||[]),D.return=L,D)}function X(L,D,U,Q,gt){return D===null||D.tag!==7?(D=dn(U,L.mode,Q,gt),D.return=L,D):(D=f(D,U),D.return=L,D)}function Z(L,D,U){if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return D=oc(""+D,L.mode,U),D.return=L,D;if(typeof D=="object"&&D!==null){switch(D.$$typeof){case v:return U=tr(D.type,D.key,D.props,null,L.mode,U),Qi(U,D),U.return=L,U;case _:return D=cc(D,L.mode,U),D.return=L,D;case at:var Q=D._init;return D=Q(D._payload),Z(L,D,U)}if(dt(D)||rt(D))return D=dn(D,L.mode,U,null),D.return=L,D;if(typeof D.then=="function")return Z(L,xr(D),U);if(D.$$typeof===V)return Z(L,nr(L,D),U);br(L,D)}return null}function P(L,D,U,Q){var gt=D!==null?D.key:null;if(typeof U=="string"&&U!==""||typeof U=="number"||typeof U=="bigint")return gt!==null?null:S(L,D,""+U,Q);if(typeof U=="object"&&U!==null){switch(U.$$typeof){case v:return U.key===gt?N(L,D,U,Q):null;case _:return U.key===gt?H(L,D,U,Q):null;case at:return gt=U._init,U=gt(U._payload),P(L,D,U,Q)}if(dt(U)||rt(U))return gt!==null?null:X(L,D,U,Q,null);if(typeof U.then=="function")return P(L,D,xr(U),Q);if(U.$$typeof===V)return P(L,D,nr(L,U),Q);br(L,U)}return null}function q(L,D,U,Q,gt){if(typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint")return L=L.get(U)||null,S(D,L,""+Q,gt);if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case v:return L=L.get(Q.key===null?U:Q.key)||null,N(D,L,Q,gt);case _:return L=L.get(Q.key===null?U:Q.key)||null,H(D,L,Q,gt);case at:var Ct=Q._init;return Q=Ct(Q._payload),q(L,D,U,Q,gt)}if(dt(Q)||rt(Q))return L=L.get(U)||null,X(D,L,Q,gt,null);if(typeof Q.then=="function")return q(L,D,U,xr(Q),gt);if(Q.$$typeof===V)return q(L,D,U,nr(D,Q),gt);br(D,Q)}return null}function Tt(L,D,U,Q){for(var gt=null,Ct=null,yt=D,Et=D=0,Te=null;yt!==null&&Et<U.length;Et++){yt.index>Et?(Te=yt,yt=null):Te=yt.sibling;var Bt=P(L,yt,U[Et],Q);if(Bt===null){yt===null&&(yt=Te);break}t&&yt&&Bt.alternate===null&&a(L,yt),D=g(Bt,D,Et),Ct===null?gt=Bt:Ct.sibling=Bt,Ct=Bt,yt=Te}if(Et===U.length)return i(L,yt),Ht&&hn(L,Et),gt;if(yt===null){for(;Et<U.length;Et++)yt=Z(L,U[Et],Q),yt!==null&&(D=g(yt,D,Et),Ct===null?gt=yt:Ct.sibling=yt,Ct=yt);return Ht&&hn(L,Et),gt}for(yt=o(yt);Et<U.length;Et++)Te=q(yt,L,Et,U[Et],Q),Te!==null&&(t&&Te.alternate!==null&&yt.delete(Te.key===null?Et:Te.key),D=g(Te,D,Et),Ct===null?gt=Te:Ct.sibling=Te,Ct=Te);return t&&yt.forEach(function(Ws){return a(L,Ws)}),Ht&&hn(L,Et),gt}function wt(L,D,U,Q){if(U==null)throw Error(l(151));for(var gt=null,Ct=null,yt=D,Et=D=0,Te=null,Bt=U.next();yt!==null&&!Bt.done;Et++,Bt=U.next()){yt.index>Et?(Te=yt,yt=null):Te=yt.sibling;var Ws=P(L,yt,Bt.value,Q);if(Ws===null){yt===null&&(yt=Te);break}t&&yt&&Ws.alternate===null&&a(L,yt),D=g(Ws,D,Et),Ct===null?gt=Ws:Ct.sibling=Ws,Ct=Ws,yt=Te}if(Bt.done)return i(L,yt),Ht&&hn(L,Et),gt;if(yt===null){for(;!Bt.done;Et++,Bt=U.next())Bt=Z(L,Bt.value,Q),Bt!==null&&(D=g(Bt,D,Et),Ct===null?gt=Bt:Ct.sibling=Bt,Ct=Bt);return Ht&&hn(L,Et),gt}for(yt=o(yt);!Bt.done;Et++,Bt=U.next())Bt=q(yt,L,Et,Bt.value,Q),Bt!==null&&(t&&Bt.alternate!==null&&yt.delete(Bt.key===null?Et:Bt.key),D=g(Bt,D,Et),Ct===null?gt=Bt:Ct.sibling=Bt,Ct=Bt);return t&&yt.forEach(function(jy){return a(L,jy)}),Ht&&hn(L,Et),gt}function Qt(L,D,U,Q){if(typeof U=="object"&&U!==null&&U.type===w&&U.key===null&&(U=U.props.children),typeof U=="object"&&U!==null){switch(U.$$typeof){case v:t:{for(var gt=U.key;D!==null;){if(D.key===gt){if(gt=U.type,gt===w){if(D.tag===7){i(L,D.sibling),Q=f(D,U.props.children),Q.return=L,L=Q;break t}}else if(D.elementType===gt||typeof gt=="object"&&gt!==null&&gt.$$typeof===at&&Rh(gt)===D.type){i(L,D.sibling),Q=f(D,U.props),Qi(Q,U),Q.return=L,L=Q;break t}i(L,D);break}else a(L,D);D=D.sibling}U.type===w?(Q=dn(U.props.children,L.mode,Q,U.key),Q.return=L,L=Q):(Q=tr(U.type,U.key,U.props,null,L.mode,Q),Qi(Q,U),Q.return=L,L=Q)}return b(L);case _:t:{for(gt=U.key;D!==null;){if(D.key===gt)if(D.tag===4&&D.stateNode.containerInfo===U.containerInfo&&D.stateNode.implementation===U.implementation){i(L,D.sibling),Q=f(D,U.children||[]),Q.return=L,L=Q;break t}else{i(L,D);break}else a(L,D);D=D.sibling}Q=cc(U,L.mode,Q),Q.return=L,L=Q}return b(L);case at:return gt=U._init,U=gt(U._payload),Qt(L,D,U,Q)}if(dt(U))return Tt(L,D,U,Q);if(rt(U)){if(gt=rt(U),typeof gt!="function")throw Error(l(150));return U=gt.call(U),wt(L,D,U,Q)}if(typeof U.then=="function")return Qt(L,D,xr(U),Q);if(U.$$typeof===V)return Qt(L,D,nr(L,U),Q);br(L,U)}return typeof U=="string"&&U!==""||typeof U=="number"||typeof U=="bigint"?(U=""+U,D!==null&&D.tag===6?(i(L,D.sibling),Q=f(D,U),Q.return=L,L=Q):(i(L,D),Q=oc(U,L.mode,Q),Q.return=L,L=Q),b(L)):i(L,D)}return function(L,D,U,Q){try{$i=0;var gt=Qt(L,D,U,Q);return Jn=null,gt}catch(yt){if(yt===Ui||yt===lr)throw yt;var Ct=la(29,yt,null,L.mode);return Ct.lanes=Q,Ct.return=L,Ct}finally{}}}var In=Oh(!0),zh=Oh(!1),va=$(null),Ga=null;function Ls(t){var a=t.alternate;J(Se,Se.current&1),J(va,t),Ga===null&&(a===null||Qn.current!==null||a.memoizedState!==null)&&(Ga=t)}function Lh(t){if(t.tag===22){if(J(Se,Se.current),J(va,t),Ga===null){var a=t.alternate;a!==null&&a.memoizedState!==null&&(Ga=t)}}else Bs()}function Bs(){J(Se,Se.current),J(va,va.current)}function hs(t){G(va),Ga===t&&(Ga=null),G(Se)}var Se=$(0);function yr(t){for(var a=t;a!==null;){if(a.tag===13){var i=a.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||i.data==="$?"||Mu(i)))return a}else if(a.tag===19&&a.memoizedProps.revealOrder!==void 0){if((a.flags&128)!==0)return a}else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===t)break;for(;a.sibling===null;){if(a.return===null||a.return===t)return null;a=a.return}a.sibling.return=a.return,a=a.sibling}return null}function Yc(t,a,i,o){a=t.memoizedState,i=i(o,a),i=i==null?a:x({},a,i),t.memoizedState=i,t.lanes===0&&(t.updateQueue.baseState=i)}var Vc={enqueueSetState:function(t,a,i){t=t._reactInternals;var o=ua(),f=Rs(o);f.payload=a,i!=null&&(f.callback=i),a=Os(t,f,o),a!==null&&(da(a,t,o),Pi(a,t,o))},enqueueReplaceState:function(t,a,i){t=t._reactInternals;var o=ua(),f=Rs(o);f.tag=1,f.payload=a,i!=null&&(f.callback=i),a=Os(t,f,o),a!==null&&(da(a,t,o),Pi(a,t,o))},enqueueForceUpdate:function(t,a){t=t._reactInternals;var i=ua(),o=Rs(i);o.tag=2,a!=null&&(o.callback=a),a=Os(t,o,i),a!==null&&(da(a,t,i),Pi(a,t,i))}};function Bh(t,a,i,o,f,g,b){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,g,b):a.prototype&&a.prototype.isPureReactComponent?!Ci(i,o)||!Ci(f,g):!0}function Uh(t,a,i,o){t=a.state,typeof a.componentWillReceiveProps=="function"&&a.componentWillReceiveProps(i,o),typeof a.UNSAFE_componentWillReceiveProps=="function"&&a.UNSAFE_componentWillReceiveProps(i,o),a.state!==t&&Vc.enqueueReplaceState(a,a.state,null)}function vn(t,a){var i=a;if("ref"in a){i={};for(var o in a)o!=="ref"&&(i[o]=a[o])}if(t=t.defaultProps){i===a&&(i=x({},i));for(var f in t)i[f]===void 0&&(i[f]=t[f])}return i}var vr=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var a=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(a))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function Hh(t){vr(t)}function Ph(t){console.error(t)}function qh(t){vr(t)}function Sr(t,a){try{var i=t.onUncaughtError;i(a.value,{componentStack:a.stack})}catch(o){setTimeout(function(){throw o})}}function Yh(t,a,i){try{var o=t.onCaughtError;o(i.value,{componentStack:i.stack,errorBoundary:a.tag===1?a.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Fc(t,a,i){return i=Rs(i),i.tag=3,i.payload={element:null},i.callback=function(){Sr(t,a)},i}function Vh(t){return t=Rs(t),t.tag=3,t}function Fh(t,a,i,o){var f=i.type.getDerivedStateFromError;if(typeof f=="function"){var g=o.value;t.payload=function(){return f(g)},t.callback=function(){Yh(a,i,o)}}var b=i.stateNode;b!==null&&typeof b.componentDidCatch=="function"&&(t.callback=function(){Yh(a,i,o),typeof f!="function"&&(Vs===null?Vs=new Set([this]):Vs.add(this));var S=o.stack;this.componentDidCatch(o.value,{componentStack:S!==null?S:""})})}function j0(t,a,i,o,f){if(i.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(a=i.alternate,a!==null&&zi(a,i,f,!0),i=va.current,i!==null){switch(i.tag){case 13:return Ga===null?mu():i.alternate===null&&oe===0&&(oe=3),i.flags&=-257,i.flags|=65536,i.lanes=f,o===yc?i.flags|=16384:(a=i.updateQueue,a===null?i.updateQueue=new Set([o]):a.add(o),pu(t,o,f)),!1;case 22:return i.flags|=65536,o===yc?i.flags|=16384:(a=i.updateQueue,a===null?(a={transitions:null,markerInstances:null,retryQueue:new Set([o])},i.updateQueue=a):(i=a.retryQueue,i===null?a.retryQueue=new Set([o]):i.add(o)),pu(t,o,f)),!1}throw Error(l(435,i.tag))}return pu(t,o,f),mu(),!1}if(Ht)return a=va.current,a!==null?((a.flags&65536)===0&&(a.flags|=256),a.flags|=65536,a.lanes=f,o!==fc&&(t=Error(l(422),{cause:o}),Oi(pa(t,i)))):(o!==fc&&(a=Error(l(423),{cause:o}),Oi(pa(a,i))),t=t.current.alternate,t.flags|=65536,f&=-f,t.lanes|=f,o=pa(o,i),f=Fc(t.stateNode,o,f),_c(t,f),oe!==4&&(oe=2)),!1;var g=Error(l(520),{cause:o});if(g=pa(g,i),el===null?el=[g]:el.push(g),oe!==4&&(oe=2),a===null)return!0;o=pa(o,i),i=a;do{switch(i.tag){case 3:return i.flags|=65536,t=f&-f,i.lanes|=t,t=Fc(i.stateNode,o,t),_c(i,t),!1;case 1:if(a=i.type,g=i.stateNode,(i.flags&128)===0&&(typeof a.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Vs===null||!Vs.has(g))))return i.flags|=65536,f&=-f,i.lanes|=f,f=Vh(f),Fh(f,t,i,o),_c(i,f),!1}i=i.return}while(i!==null);return!1}var Xh=Error(l(461)),Ne=!1;function Ae(t,a,i,o){a.child=t===null?zh(a,null,i,o):In(a,t.child,i,o)}function Gh(t,a,i,o,f){i=i.render;var g=a.ref;if("ref"in o){var b={};for(var S in o)S!=="ref"&&(b[S]=o[S])}else b=o;return xn(a),o=Tc(t,a,i,b,g,f),S=kc(),t!==null&&!Ne?(Ac(t,a,f),ms(t,a,f)):(Ht&&S&&uc(a),a.flags|=1,Ae(t,a,o,f),a.child)}function $h(t,a,i,o,f){if(t===null){var g=i.type;return typeof g=="function"&&!rc(g)&&g.defaultProps===void 0&&i.compare===null?(a.tag=15,a.type=g,Qh(t,a,g,o,f)):(t=tr(i.type,null,o,a,a.mode,f),t.ref=a.ref,t.return=a,a.child=t)}if(g=t.child,!Jc(t,f)){var b=g.memoizedProps;if(i=i.compare,i=i!==null?i:Ci,i(b,o)&&t.ref===a.ref)return ms(t,a,f)}return a.flags|=1,t=rs(g,o),t.ref=a.ref,t.return=a,a.child=t}function Qh(t,a,i,o,f){if(t!==null){var g=t.memoizedProps;if(Ci(g,o)&&t.ref===a.ref)if(Ne=!1,a.pendingProps=o=g,Jc(t,f))(t.flags&131072)!==0&&(Ne=!0);else return a.lanes=t.lanes,ms(t,a,f)}return Xc(t,a,i,o,f)}function Zh(t,a,i){var o=a.pendingProps,f=o.children,g=t!==null?t.memoizedState:null;if(o.mode==="hidden"){if((a.flags&128)!==0){if(o=g!==null?g.baseLanes|i:i,t!==null){for(f=a.child=t.child,g=0;f!==null;)g=g|f.lanes|f.childLanes,f=f.sibling;a.childLanes=g&~o}else a.childLanes=0,a.child=null;return Kh(t,a,o,i)}if((i&536870912)!==0)a.memoizedState={baseLanes:0,cachePool:null},t!==null&&ir(a,g!==null?g.cachePool:null),g!==null?Qf(a,g):wc(),Lh(a);else return a.lanes=a.childLanes=536870912,Kh(t,a,g!==null?g.baseLanes|i:i,i)}else g!==null?(ir(a,g.cachePool),Qf(a,g),Bs(),a.memoizedState=null):(t!==null&&ir(a,null),wc(),Bs());return Ae(t,a,f,i),a.child}function Kh(t,a,i,o){var f=bc();return f=f===null?null:{parent:ve._currentValue,pool:f},a.memoizedState={baseLanes:i,cachePool:f},t!==null&&ir(a,null),wc(),Lh(a),t!==null&&zi(t,a,o,!0),null}function _r(t,a){var i=a.ref;if(i===null)t!==null&&t.ref!==null&&(a.flags|=4194816);else{if(typeof i!="function"&&typeof i!="object")throw Error(l(284));(t===null||t.ref!==i)&&(a.flags|=4194816)}}function Xc(t,a,i,o,f){return xn(a),i=Tc(t,a,i,o,void 0,f),o=kc(),t!==null&&!Ne?(Ac(t,a,f),ms(t,a,f)):(Ht&&o&&uc(a),a.flags|=1,Ae(t,a,i,f),a.child)}function Wh(t,a,i,o,f,g){return xn(a),a.updateQueue=null,i=Kf(a,o,i,f),Zf(t),o=kc(),t!==null&&!Ne?(Ac(t,a,g),ms(t,a,g)):(Ht&&o&&uc(a),a.flags|=1,Ae(t,a,i,g),a.child)}function Jh(t,a,i,o,f){if(xn(a),a.stateNode===null){var g=Vn,b=i.contextType;typeof b=="object"&&b!==null&&(g=Oe(b)),g=new i(o,g),a.memoizedState=g.state!==null&&g.state!==void 0?g.state:null,g.updater=Vc,a.stateNode=g,g._reactInternals=a,g=a.stateNode,g.props=o,g.state=a.memoizedState,g.refs={},vc(a),b=i.contextType,g.context=typeof b=="object"&&b!==null?Oe(b):Vn,g.state=a.memoizedState,b=i.getDerivedStateFromProps,typeof b=="function"&&(Yc(a,i,b,o),g.state=a.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof g.getSnapshotBeforeUpdate=="function"||typeof g.UNSAFE_componentWillMount!="function"&&typeof g.componentWillMount!="function"||(b=g.state,typeof g.componentWillMount=="function"&&g.componentWillMount(),typeof g.UNSAFE_componentWillMount=="function"&&g.UNSAFE_componentWillMount(),b!==g.state&&Vc.enqueueReplaceState(g,g.state,null),Yi(a,o,g,f),qi(),g.state=a.memoizedState),typeof g.componentDidMount=="function"&&(a.flags|=4194308),o=!0}else if(t===null){g=a.stateNode;var S=a.memoizedProps,N=vn(i,S);g.props=N;var H=g.context,X=i.contextType;b=Vn,typeof X=="object"&&X!==null&&(b=Oe(X));var Z=i.getDerivedStateFromProps;X=typeof Z=="function"||typeof g.getSnapshotBeforeUpdate=="function",S=a.pendingProps!==S,X||typeof g.UNSAFE_componentWillReceiveProps!="function"&&typeof g.componentWillReceiveProps!="function"||(S||H!==b)&&Uh(a,g,o,b),Ds=!1;var P=a.memoizedState;g.state=P,Yi(a,o,g,f),qi(),H=a.memoizedState,S||P!==H||Ds?(typeof Z=="function"&&(Yc(a,i,Z,o),H=a.memoizedState),(N=Ds||Bh(a,i,N,o,P,H,b))?(X||typeof g.UNSAFE_componentWillMount!="function"&&typeof g.componentWillMount!="function"||(typeof g.componentWillMount=="function"&&g.componentWillMount(),typeof g.UNSAFE_componentWillMount=="function"&&g.UNSAFE_componentWillMount()),typeof g.componentDidMount=="function"&&(a.flags|=4194308)):(typeof g.componentDidMount=="function"&&(a.flags|=4194308),a.memoizedProps=o,a.memoizedState=H),g.props=o,g.state=H,g.context=b,o=N):(typeof g.componentDidMount=="function"&&(a.flags|=4194308),o=!1)}else{g=a.stateNode,Sc(t,a),b=a.memoizedProps,X=vn(i,b),g.props=X,Z=a.pendingProps,P=g.context,H=i.contextType,N=Vn,typeof H=="object"&&H!==null&&(N=Oe(H)),S=i.getDerivedStateFromProps,(H=typeof S=="function"||typeof g.getSnapshotBeforeUpdate=="function")||typeof g.UNSAFE_componentWillReceiveProps!="function"&&typeof g.componentWillReceiveProps!="function"||(b!==Z||P!==N)&&Uh(a,g,o,N),Ds=!1,P=a.memoizedState,g.state=P,Yi(a,o,g,f),qi();var q=a.memoizedState;b!==Z||P!==q||Ds||t!==null&&t.dependencies!==null&&sr(t.dependencies)?(typeof S=="function"&&(Yc(a,i,S,o),q=a.memoizedState),(X=Ds||Bh(a,i,X,o,P,q,N)||t!==null&&t.dependencies!==null&&sr(t.dependencies))?(H||typeof g.UNSAFE_componentWillUpdate!="function"&&typeof g.componentWillUpdate!="function"||(typeof g.componentWillUpdate=="function"&&g.componentWillUpdate(o,q,N),typeof g.UNSAFE_componentWillUpdate=="function"&&g.UNSAFE_componentWillUpdate(o,q,N)),typeof g.componentDidUpdate=="function"&&(a.flags|=4),typeof g.getSnapshotBeforeUpdate=="function"&&(a.flags|=1024)):(typeof g.componentDidUpdate!="function"||b===t.memoizedProps&&P===t.memoizedState||(a.flags|=4),typeof g.getSnapshotBeforeUpdate!="function"||b===t.memoizedProps&&P===t.memoizedState||(a.flags|=1024),a.memoizedProps=o,a.memoizedState=q),g.props=o,g.state=q,g.context=N,o=X):(typeof g.componentDidUpdate!="function"||b===t.memoizedProps&&P===t.memoizedState||(a.flags|=4),typeof g.getSnapshotBeforeUpdate!="function"||b===t.memoizedProps&&P===t.memoizedState||(a.flags|=1024),o=!1)}return g=o,_r(t,a),o=(a.flags&128)!==0,g||o?(g=a.stateNode,i=o&&typeof i.getDerivedStateFromError!="function"?null:g.render(),a.flags|=1,t!==null&&o?(a.child=In(a,t.child,null,f),a.child=In(a,null,i,f)):Ae(t,a,i,f),a.memoizedState=g.state,t=a.child):t=ms(t,a,f),t}function Ih(t,a,i,o){return Ri(),a.flags|=256,Ae(t,a,i,o),a.child}var Gc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $c(t){return{baseLanes:t,cachePool:Pf()}}function Qc(t,a,i){return t=t!==null?t.childLanes&~i:0,a&&(t|=Sa),t}function tm(t,a,i){var o=a.pendingProps,f=!1,g=(a.flags&128)!==0,b;if((b=g)||(b=t!==null&&t.memoizedState===null?!1:(Se.current&2)!==0),b&&(f=!0,a.flags&=-129),b=(a.flags&32)!==0,a.flags&=-33,t===null){if(Ht){if(f?Ls(a):Bs(),Ht){var S=re,N;if(N=S){t:{for(N=S,S=Xa;N.nodeType!==8;){if(!S){S=null;break t}if(N=Oa(N.nextSibling),N===null){S=null;break t}}S=N}S!==null?(a.memoizedState={dehydrated:S,treeContext:fn!==null?{id:os,overflow:cs}:null,retryLane:536870912,hydrationErrors:null},N=la(18,null,null,0),N.stateNode=S,N.return=a,a.child=N,Ye=a,re=null,N=!0):N=!1}N||gn(a)}if(S=a.memoizedState,S!==null&&(S=S.dehydrated,S!==null))return Mu(S)?a.lanes=32:a.lanes=536870912,null;hs(a)}return S=o.children,o=o.fallback,f?(Bs(),f=a.mode,S=jr({mode:"hidden",children:S},f),o=dn(o,f,i,null),S.return=a,o.return=a,S.sibling=o,a.child=S,f=a.child,f.memoizedState=$c(i),f.childLanes=Qc(t,b,i),a.memoizedState=Gc,o):(Ls(a),Zc(a,S))}if(N=t.memoizedState,N!==null&&(S=N.dehydrated,S!==null)){if(g)a.flags&256?(Ls(a),a.flags&=-257,a=Kc(t,a,i)):a.memoizedState!==null?(Bs(),a.child=t.child,a.flags|=128,a=null):(Bs(),f=o.fallback,S=a.mode,o=jr({mode:"visible",children:o.children},S),f=dn(f,S,i,null),f.flags|=2,o.return=a,f.return=a,o.sibling=f,a.child=o,In(a,t.child,null,i),o=a.child,o.memoizedState=$c(i),o.childLanes=Qc(t,b,i),a.memoizedState=Gc,a=f);else if(Ls(a),Mu(S)){if(b=S.nextSibling&&S.nextSibling.dataset,b)var H=b.dgst;b=H,o=Error(l(419)),o.stack="",o.digest=b,Oi({value:o,source:null,stack:null}),a=Kc(t,a,i)}else if(Ne||zi(t,a,i,!1),b=(i&t.childLanes)!==0,Ne||b){if(b=te,b!==null&&(o=i&-i,o=(o&42)!==0?1:Ya(o),o=(o&(b.suspendedLanes|i))!==0?0:o,o!==0&&o!==N.retryLane))throw N.retryLane=o,Yn(t,o),da(b,t,o),Xh;S.data==="$?"||mu(),a=Kc(t,a,i)}else S.data==="$?"?(a.flags|=192,a.child=t.child,a=null):(t=N.treeContext,re=Oa(S.nextSibling),Ye=a,Ht=!0,mn=null,Xa=!1,t!==null&&(ba[ya++]=os,ba[ya++]=cs,ba[ya++]=fn,os=t.id,cs=t.overflow,fn=a),a=Zc(a,o.children),a.flags|=4096);return a}return f?(Bs(),f=o.fallback,S=a.mode,N=t.child,H=N.sibling,o=rs(N,{mode:"hidden",children:o.children}),o.subtreeFlags=N.subtreeFlags&65011712,H!==null?f=rs(H,f):(f=dn(f,S,i,null),f.flags|=2),f.return=a,o.return=a,o.sibling=f,a.child=o,o=f,f=a.child,S=t.child.memoizedState,S===null?S=$c(i):(N=S.cachePool,N!==null?(H=ve._currentValue,N=N.parent!==H?{parent:H,pool:H}:N):N=Pf(),S={baseLanes:S.baseLanes|i,cachePool:N}),f.memoizedState=S,f.childLanes=Qc(t,b,i),a.memoizedState=Gc,o):(Ls(a),i=t.child,t=i.sibling,i=rs(i,{mode:"visible",children:o.children}),i.return=a,i.sibling=null,t!==null&&(b=a.deletions,b===null?(a.deletions=[t],a.flags|=16):b.push(t)),a.child=i,a.memoizedState=null,i)}function Zc(t,a){return a=jr({mode:"visible",children:a},t.mode),a.return=t,t.child=a}function jr(t,a){return t=la(22,t,null,a),t.lanes=0,t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},t}function Kc(t,a,i){return In(a,t.child,null,i),t=Zc(a,a.pendingProps.children),t.flags|=2,a.memoizedState=null,t}function em(t,a,i){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a),mc(t.return,a,i)}function Wc(t,a,i,o,f){var g=t.memoizedState;g===null?t.memoizedState={isBackwards:a,rendering:null,renderingStartTime:0,last:o,tail:i,tailMode:f}:(g.isBackwards=a,g.rendering=null,g.renderingStartTime=0,g.last=o,g.tail=i,g.tailMode=f)}function am(t,a,i){var o=a.pendingProps,f=o.revealOrder,g=o.tail;if(Ae(t,a,o.children,i),o=Se.current,(o&2)!==0)o=o&1|2,a.flags|=128;else{if(t!==null&&(t.flags&128)!==0)t:for(t=a.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&em(t,i,a);else if(t.tag===19)em(t,i,a);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===a)break t;for(;t.sibling===null;){if(t.return===null||t.return===a)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}o&=1}switch(J(Se,o),f){case"forwards":for(i=a.child,f=null;i!==null;)t=i.alternate,t!==null&&yr(t)===null&&(f=i),i=i.sibling;i=f,i===null?(f=a.child,a.child=null):(f=i.sibling,i.sibling=null),Wc(a,!1,f,i,g);break;case"backwards":for(i=null,f=a.child,a.child=null;f!==null;){if(t=f.alternate,t!==null&&yr(t)===null){a.child=f;break}t=f.sibling,f.sibling=i,i=f,f=t}Wc(a,!0,i,null,g);break;case"together":Wc(a,!1,null,null,void 0);break;default:a.memoizedState=null}return a.child}function ms(t,a,i){if(t!==null&&(a.dependencies=t.dependencies),Ys|=a.lanes,(i&a.childLanes)===0)if(t!==null){if(zi(t,a,i,!1),(i&a.childLanes)===0)return null}else return null;if(t!==null&&a.child!==t.child)throw Error(l(153));if(a.child!==null){for(t=a.child,i=rs(t,t.pendingProps),a.child=i,i.return=a;t.sibling!==null;)t=t.sibling,i=i.sibling=rs(t,t.pendingProps),i.return=a;i.sibling=null}return a.child}function Jc(t,a){return(t.lanes&a)!==0?!0:(t=t.dependencies,!!(t!==null&&sr(t)))}function w0(t,a,i){switch(a.tag){case 3:bt(a,a.stateNode.containerInfo),Ms(a,ve,t.memoizedState.cache),Ri();break;case 27:case 5:Ve(a);break;case 4:bt(a,a.stateNode.containerInfo);break;case 10:Ms(a,a.type,a.memoizedProps.value);break;case 13:var o=a.memoizedState;if(o!==null)return o.dehydrated!==null?(Ls(a),a.flags|=128,null):(i&a.child.childLanes)!==0?tm(t,a,i):(Ls(a),t=ms(t,a,i),t!==null?t.sibling:null);Ls(a);break;case 19:var f=(t.flags&128)!==0;if(o=(i&a.childLanes)!==0,o||(zi(t,a,i,!1),o=(i&a.childLanes)!==0),f){if(o)return am(t,a,i);a.flags|=128}if(f=a.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),J(Se,Se.current),o)break;return null;case 22:case 23:return a.lanes=0,Zh(t,a,i);case 24:Ms(a,ve,t.memoizedState.cache)}return ms(t,a,i)}function sm(t,a,i){if(t!==null)if(t.memoizedProps!==a.pendingProps)Ne=!0;else{if(!Jc(t,i)&&(a.flags&128)===0)return Ne=!1,w0(t,a,i);Ne=(t.flags&131072)!==0}else Ne=!1,Ht&&(a.flags&1048576)!==0&&Rf(a,ar,a.index);switch(a.lanes=0,a.tag){case 16:t:{t=a.pendingProps;var o=a.elementType,f=o._init;if(o=f(o._payload),a.type=o,typeof o=="function")rc(o)?(t=vn(o,t),a.tag=1,a=Jh(null,a,o,t,i)):(a.tag=0,a=Xc(null,a,o,t,i));else{if(o!=null){if(f=o.$$typeof,f===K){a.tag=11,a=Gh(null,a,o,t,i);break t}else if(f===tt){a.tag=14,a=$h(null,a,o,t,i);break t}}throw a=xt(o)||o,Error(l(306,a,""))}}return a;case 0:return Xc(t,a,a.type,a.pendingProps,i);case 1:return o=a.type,f=vn(o,a.pendingProps),Jh(t,a,o,f,i);case 3:t:{if(bt(a,a.stateNode.containerInfo),t===null)throw Error(l(387));o=a.pendingProps;var g=a.memoizedState;f=g.element,Sc(t,a),Yi(a,o,null,i);var b=a.memoizedState;if(o=b.cache,Ms(a,ve,o),o!==g.cache&&gc(a,[ve],i,!0),qi(),o=b.element,g.isDehydrated)if(g={element:o,isDehydrated:!1,cache:b.cache},a.updateQueue.baseState=g,a.memoizedState=g,a.flags&256){a=Ih(t,a,o,i);break t}else if(o!==f){f=pa(Error(l(424)),a),Oi(f),a=Ih(t,a,o,i);break t}else{switch(t=a.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(re=Oa(t.firstChild),Ye=a,Ht=!0,mn=null,Xa=!0,i=zh(a,null,o,i),a.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling}else{if(Ri(),o===f){a=ms(t,a,i);break t}Ae(t,a,o,i)}a=a.child}return a;case 26:return _r(t,a),t===null?(i=rg(a.type,null,a.pendingProps,null))?a.memoizedState=i:Ht||(i=a.type,t=a.pendingProps,o=Br(ht.current).createElement(i),o[Kt]=a,o[ge]=t,Me(o,i,t),Xt(o),a.stateNode=o):a.memoizedState=rg(a.type,t.memoizedProps,a.pendingProps,t.memoizedState),null;case 27:return Ve(a),t===null&&Ht&&(o=a.stateNode=ng(a.type,a.pendingProps,ht.current),Ye=a,Xa=!0,f=re,Gs(a.type)?(Du=f,re=Oa(o.firstChild)):re=f),Ae(t,a,a.pendingProps.children,i),_r(t,a),t===null&&(a.flags|=4194304),a.child;case 5:return t===null&&Ht&&((f=o=re)&&(o=J0(o,a.type,a.pendingProps,Xa),o!==null?(a.stateNode=o,Ye=a,re=Oa(o.firstChild),Xa=!1,f=!0):f=!1),f||gn(a)),Ve(a),f=a.type,g=a.pendingProps,b=t!==null?t.memoizedProps:null,o=g.children,ku(f,g)?o=null:b!==null&&ku(f,b)&&(a.flags|=32),a.memoizedState!==null&&(f=Tc(t,a,p0,null,null,i),ul._currentValue=f),_r(t,a),Ae(t,a,o,i),a.child;case 6:return t===null&&Ht&&((t=i=re)&&(i=I0(i,a.pendingProps,Xa),i!==null?(a.stateNode=i,Ye=a,re=null,t=!0):t=!1),t||gn(a)),null;case 13:return tm(t,a,i);case 4:return bt(a,a.stateNode.containerInfo),o=a.pendingProps,t===null?a.child=In(a,null,o,i):Ae(t,a,o,i),a.child;case 11:return Gh(t,a,a.type,a.pendingProps,i);case 7:return Ae(t,a,a.pendingProps,i),a.child;case 8:return Ae(t,a,a.pendingProps.children,i),a.child;case 12:return Ae(t,a,a.pendingProps.children,i),a.child;case 10:return o=a.pendingProps,Ms(a,a.type,o.value),Ae(t,a,o.children,i),a.child;case 9:return f=a.type._context,o=a.pendingProps.children,xn(a),f=Oe(f),o=o(f),a.flags|=1,Ae(t,a,o,i),a.child;case 14:return $h(t,a,a.type,a.pendingProps,i);case 15:return Qh(t,a,a.type,a.pendingProps,i);case 19:return am(t,a,i);case 31:return o=a.pendingProps,i=a.mode,o={mode:o.mode,children:o.children},t===null?(i=jr(o,i),i.ref=a.ref,a.child=i,i.return=a,a=i):(i=rs(t.child,o),i.ref=a.ref,a.child=i,i.return=a,a=i),a;case 22:return Zh(t,a,i);case 24:return xn(a),o=Oe(ve),t===null?(f=bc(),f===null&&(f=te,g=pc(),f.pooledCache=g,g.refCount++,g!==null&&(f.pooledCacheLanes|=i),f=g),a.memoizedState={parent:o,cache:f},vc(a),Ms(a,ve,f)):((t.lanes&i)!==0&&(Sc(t,a),Yi(a,null,null,i),qi()),f=t.memoizedState,g=a.memoizedState,f.parent!==o?(f={parent:o,cache:o},a.memoizedState=f,a.lanes===0&&(a.memoizedState=a.updateQueue.baseState=f),Ms(a,ve,o)):(o=g.cache,Ms(a,ve,o),o!==f.cache&&gc(a,[ve],i,!0))),Ae(t,a,a.pendingProps.children,i),a.child;case 29:throw a.pendingProps}throw Error(l(156,a.tag))}function gs(t){t.flags|=4}function nm(t,a){if(a.type!=="stylesheet"||(a.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!fg(a)){if(a=va.current,a!==null&&((Ot&4194048)===Ot?Ga!==null:(Ot&62914560)!==Ot&&(Ot&536870912)===0||a!==Ga))throw Hi=yc,qf;t.flags|=8192}}function wr(t,a){a!==null&&(t.flags|=4),t.flags&16384&&(a=t.tag!==22?ks():536870912,t.lanes|=a,si|=a)}function Zi(t,a){if(!Ht)switch(t.tailMode){case"hidden":a=t.tail;for(var i=null;a!==null;)a.alternate!==null&&(i=a),a=a.sibling;i===null?t.tail=null:i.sibling=null;break;case"collapsed":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?a||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function ie(t){var a=t.alternate!==null&&t.alternate.child===t.child,i=0,o=0;if(a)for(var f=t.child;f!==null;)i|=f.lanes|f.childLanes,o|=f.subtreeFlags&65011712,o|=f.flags&65011712,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)i|=f.lanes|f.childLanes,o|=f.subtreeFlags,o|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=o,t.childLanes=i,a}function N0(t,a,i){var o=a.pendingProps;switch(dc(a),a.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ie(a),null;case 1:return ie(a),null;case 3:return i=a.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),a.memoizedState.cache!==o&&(a.flags|=2048),ds(ve),jt(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Di(a)?gs(a):t===null||t.memoizedState.isDehydrated&&(a.flags&256)===0||(a.flags|=1024,Lf())),ie(a),null;case 26:return i=a.memoizedState,t===null?(gs(a),i!==null?(ie(a),nm(a,i)):(ie(a),a.flags&=-16777217)):i?i!==t.memoizedState?(gs(a),ie(a),nm(a,i)):(ie(a),a.flags&=-16777217):(t.memoizedProps!==o&&gs(a),ie(a),a.flags&=-16777217),null;case 27:ke(a),i=ht.current;var f=a.type;if(t!==null&&a.stateNode!=null)t.memoizedProps!==o&&gs(a);else{if(!o){if(a.stateNode===null)throw Error(l(166));return ie(a),null}t=I.current,Di(a)?Of(a):(t=ng(f,o,i),a.stateNode=t,gs(a))}return ie(a),null;case 5:if(ke(a),i=a.type,t!==null&&a.stateNode!=null)t.memoizedProps!==o&&gs(a);else{if(!o){if(a.stateNode===null)throw Error(l(166));return ie(a),null}if(t=I.current,Di(a))Of(a);else{switch(f=Br(ht.current),t){case 1:t=f.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:t=f.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":t=f.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":t=f.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":t=f.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild);break;case"select":t=typeof o.is=="string"?f.createElement("select",{is:o.is}):f.createElement("select"),o.multiple?t.multiple=!0:o.size&&(t.size=o.size);break;default:t=typeof o.is=="string"?f.createElement(i,{is:o.is}):f.createElement(i)}}t[Kt]=a,t[ge]=o;t:for(f=a.child;f!==null;){if(f.tag===5||f.tag===6)t.appendChild(f.stateNode);else if(f.tag!==4&&f.tag!==27&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===a)break t;for(;f.sibling===null;){if(f.return===null||f.return===a)break t;f=f.return}f.sibling.return=f.return,f=f.sibling}a.stateNode=t;t:switch(Me(t,i,o),i){case"button":case"input":case"select":case"textarea":t=!!o.autoFocus;break t;case"img":t=!0;break t;default:t=!1}t&&gs(a)}}return ie(a),a.flags&=-16777217,null;case 6:if(t&&a.stateNode!=null)t.memoizedProps!==o&&gs(a);else{if(typeof o!="string"&&a.stateNode===null)throw Error(l(166));if(t=ht.current,Di(a)){if(t=a.stateNode,i=a.memoizedProps,o=null,f=Ye,f!==null)switch(f.tag){case 27:case 5:o=f.memoizedProps}t[Kt]=a,t=!!(t.nodeValue===i||o!==null&&o.suppressHydrationWarning===!0||Wm(t.nodeValue,i)),t||gn(a)}else t=Br(t).createTextNode(o),t[Kt]=a,a.stateNode=t}return ie(a),null;case 13:if(o=a.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(f=Di(a),o!==null&&o.dehydrated!==null){if(t===null){if(!f)throw Error(l(318));if(f=a.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(l(317));f[Kt]=a}else Ri(),(a.flags&128)===0&&(a.memoizedState=null),a.flags|=4;ie(a),f=!1}else f=Lf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=f),f=!0;if(!f)return a.flags&256?(hs(a),a):(hs(a),null)}if(hs(a),(a.flags&128)!==0)return a.lanes=i,a;if(i=o!==null,t=t!==null&&t.memoizedState!==null,i){o=a.child,f=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(f=o.alternate.memoizedState.cachePool.pool);var g=null;o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(g=o.memoizedState.cachePool.pool),g!==f&&(o.flags|=2048)}return i!==t&&i&&(a.child.flags|=8192),wr(a,a.updateQueue),ie(a),null;case 4:return jt(),t===null&&ju(a.stateNode.containerInfo),ie(a),null;case 10:return ds(a.type),ie(a),null;case 19:if(G(Se),f=a.memoizedState,f===null)return ie(a),null;if(o=(a.flags&128)!==0,g=f.rendering,g===null)if(o)Zi(f,!1);else{if(oe!==0||t!==null&&(t.flags&128)!==0)for(t=a.child;t!==null;){if(g=yr(t),g!==null){for(a.flags|=128,Zi(f,!1),t=g.updateQueue,a.updateQueue=t,wr(a,t),a.subtreeFlags=0,t=i,i=a.child;i!==null;)Df(i,t),i=i.sibling;return J(Se,Se.current&1|2),a.child}t=t.sibling}f.tail!==null&&ye()>Tr&&(a.flags|=128,o=!0,Zi(f,!1),a.lanes=4194304)}else{if(!o)if(t=yr(g),t!==null){if(a.flags|=128,o=!0,t=t.updateQueue,a.updateQueue=t,wr(a,t),Zi(f,!0),f.tail===null&&f.tailMode==="hidden"&&!g.alternate&&!Ht)return ie(a),null}else 2*ye()-f.renderingStartTime>Tr&&i!==536870912&&(a.flags|=128,o=!0,Zi(f,!1),a.lanes=4194304);f.isBackwards?(g.sibling=a.child,a.child=g):(t=f.last,t!==null?t.sibling=g:a.child=g,f.last=g)}return f.tail!==null?(a=f.tail,f.rendering=a,f.tail=a.sibling,f.renderingStartTime=ye(),a.sibling=null,t=Se.current,J(Se,o?t&1|2:t&1),a):(ie(a),null);case 22:case 23:return hs(a),Nc(),o=a.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(a.flags|=8192):o&&(a.flags|=8192),o?(i&536870912)!==0&&(a.flags&128)===0&&(ie(a),a.subtreeFlags&6&&(a.flags|=8192)):ie(a),i=a.updateQueue,i!==null&&wr(a,i.retryQueue),i=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),o=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(o=a.memoizedState.cachePool.pool),o!==i&&(a.flags|=2048),t!==null&&G(bn),null;case 24:return i=null,t!==null&&(i=t.memoizedState.cache),a.memoizedState.cache!==i&&(a.flags|=2048),ds(ve),ie(a),null;case 25:return null;case 30:return null}throw Error(l(156,a.tag))}function E0(t,a){switch(dc(a),a.tag){case 1:return t=a.flags,t&65536?(a.flags=t&-65537|128,a):null;case 3:return ds(ve),jt(),t=a.flags,(t&65536)!==0&&(t&128)===0?(a.flags=t&-65537|128,a):null;case 26:case 27:case 5:return ke(a),null;case 13:if(hs(a),t=a.memoizedState,t!==null&&t.dehydrated!==null){if(a.alternate===null)throw Error(l(340));Ri()}return t=a.flags,t&65536?(a.flags=t&-65537|128,a):null;case 19:return G(Se),null;case 4:return jt(),null;case 10:return ds(a.type),null;case 22:case 23:return hs(a),Nc(),t!==null&&G(bn),t=a.flags,t&65536?(a.flags=t&-65537|128,a):null;case 24:return ds(ve),null;case 25:return null;default:return null}}function im(t,a){switch(dc(a),a.tag){case 3:ds(ve),jt();break;case 26:case 27:case 5:ke(a);break;case 4:jt();break;case 13:hs(a);break;case 19:G(Se);break;case 10:ds(a.type);break;case 22:case 23:hs(a),Nc(),t!==null&&G(bn);break;case 24:ds(ve)}}function Ki(t,a){try{var i=a.updateQueue,o=i!==null?i.lastEffect:null;if(o!==null){var f=o.next;i=f;do{if((i.tag&t)===t){o=void 0;var g=i.create,b=i.inst;o=g(),b.destroy=o}i=i.next}while(i!==f)}}catch(S){Wt(a,a.return,S)}}function Us(t,a,i){try{var o=a.updateQueue,f=o!==null?o.lastEffect:null;if(f!==null){var g=f.next;o=g;do{if((o.tag&t)===t){var b=o.inst,S=b.destroy;if(S!==void 0){b.destroy=void 0,f=a;var N=i,H=S;try{H()}catch(X){Wt(f,N,X)}}}o=o.next}while(o!==g)}}catch(X){Wt(a,a.return,X)}}function lm(t){var a=t.updateQueue;if(a!==null){var i=t.stateNode;try{$f(a,i)}catch(o){Wt(t,t.return,o)}}}function rm(t,a,i){i.props=vn(t.type,t.memoizedProps),i.state=t.memoizedState;try{i.componentWillUnmount()}catch(o){Wt(t,a,o)}}function Wi(t,a){try{var i=t.ref;if(i!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof i=="function"?t.refCleanup=i(o):i.current=o}}catch(f){Wt(t,a,f)}}function $a(t,a){var i=t.ref,o=t.refCleanup;if(i!==null)if(typeof o=="function")try{o()}catch(f){Wt(t,a,f)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof i=="function")try{i(null)}catch(f){Wt(t,a,f)}else i.current=null}function om(t){var a=t.type,i=t.memoizedProps,o=t.stateNode;try{t:switch(a){case"button":case"input":case"select":case"textarea":i.autoFocus&&o.focus();break t;case"img":i.src?o.src=i.src:i.srcSet&&(o.srcset=i.srcSet)}}catch(f){Wt(t,t.return,f)}}function Ic(t,a,i){try{var o=t.stateNode;$0(o,t.type,i,a),o[ge]=a}catch(f){Wt(t,t.return,f)}}function cm(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Gs(t.type)||t.tag===4}function tu(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||cm(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Gs(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function eu(t,a,i){var o=t.tag;if(o===5||o===6)t=t.stateNode,a?(i.nodeType===9?i.body:i.nodeName==="HTML"?i.ownerDocument.body:i).insertBefore(t,a):(a=i.nodeType===9?i.body:i.nodeName==="HTML"?i.ownerDocument.body:i,a.appendChild(t),i=i._reactRootContainer,i!=null||a.onclick!==null||(a.onclick=Lr));else if(o!==4&&(o===27&&Gs(t.type)&&(i=t.stateNode,a=null),t=t.child,t!==null))for(eu(t,a,i),t=t.sibling;t!==null;)eu(t,a,i),t=t.sibling}function Nr(t,a,i){var o=t.tag;if(o===5||o===6)t=t.stateNode,a?i.insertBefore(t,a):i.appendChild(t);else if(o!==4&&(o===27&&Gs(t.type)&&(i=t.stateNode),t=t.child,t!==null))for(Nr(t,a,i),t=t.sibling;t!==null;)Nr(t,a,i),t=t.sibling}function um(t){var a=t.stateNode,i=t.memoizedProps;try{for(var o=t.type,f=a.attributes;f.length;)a.removeAttributeNode(f[0]);Me(a,o,i),a[Kt]=t,a[ge]=i}catch(g){Wt(t,t.return,g)}}var ps=!1,fe=!1,au=!1,dm=typeof WeakSet=="function"?WeakSet:Set,Ee=null;function T0(t,a){if(t=t.containerInfo,Eu=Vr,t=_f(t),tc(t)){if("selectionStart"in t)var i={start:t.selectionStart,end:t.selectionEnd};else t:{i=(i=t.ownerDocument)&&i.defaultView||window;var o=i.getSelection&&i.getSelection();if(o&&o.rangeCount!==0){i=o.anchorNode;var f=o.anchorOffset,g=o.focusNode;o=o.focusOffset;try{i.nodeType,g.nodeType}catch{i=null;break t}var b=0,S=-1,N=-1,H=0,X=0,Z=t,P=null;e:for(;;){for(var q;Z!==i||f!==0&&Z.nodeType!==3||(S=b+f),Z!==g||o!==0&&Z.nodeType!==3||(N=b+o),Z.nodeType===3&&(b+=Z.nodeValue.length),(q=Z.firstChild)!==null;)P=Z,Z=q;for(;;){if(Z===t)break e;if(P===i&&++H===f&&(S=b),P===g&&++X===o&&(N=b),(q=Z.nextSibling)!==null)break;Z=P,P=Z.parentNode}Z=q}i=S===-1||N===-1?null:{start:S,end:N}}else i=null}i=i||{start:0,end:0}}else i=null;for(Tu={focusedElem:t,selectionRange:i},Vr=!1,Ee=a;Ee!==null;)if(a=Ee,t=a.child,(a.subtreeFlags&1024)!==0&&t!==null)t.return=a,Ee=t;else for(;Ee!==null;){switch(a=Ee,g=a.alternate,t=a.flags,a.tag){case 0:break;case 11:case 15:break;case 1:if((t&1024)!==0&&g!==null){t=void 0,i=a,f=g.memoizedProps,g=g.memoizedState,o=i.stateNode;try{var Tt=vn(i.type,f,i.elementType===i.type);t=o.getSnapshotBeforeUpdate(Tt,g),o.__reactInternalSnapshotBeforeUpdate=t}catch(wt){Wt(i,i.return,wt)}}break;case 3:if((t&1024)!==0){if(t=a.stateNode.containerInfo,i=t.nodeType,i===9)Cu(t);else if(i===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Cu(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(l(163))}if(t=a.sibling,t!==null){t.return=a.return,Ee=t;break}Ee=a.return}}function fm(t,a,i){var o=i.flags;switch(i.tag){case 0:case 11:case 15:Hs(t,i),o&4&&Ki(5,i);break;case 1:if(Hs(t,i),o&4)if(t=i.stateNode,a===null)try{t.componentDidMount()}catch(b){Wt(i,i.return,b)}else{var f=vn(i.type,a.memoizedProps);a=a.memoizedState;try{t.componentDidUpdate(f,a,t.__reactInternalSnapshotBeforeUpdate)}catch(b){Wt(i,i.return,b)}}o&64&&lm(i),o&512&&Wi(i,i.return);break;case 3:if(Hs(t,i),o&64&&(t=i.updateQueue,t!==null)){if(a=null,i.child!==null)switch(i.child.tag){case 27:case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}try{$f(t,a)}catch(b){Wt(i,i.return,b)}}break;case 27:a===null&&o&4&&um(i);case 26:case 5:Hs(t,i),a===null&&o&4&&om(i),o&512&&Wi(i,i.return);break;case 12:Hs(t,i);break;case 13:Hs(t,i),o&4&&gm(t,i),o&64&&(t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(i=L0.bind(null,i),ty(t,i))));break;case 22:if(o=i.memoizedState!==null||ps,!o){a=a!==null&&a.memoizedState!==null||fe,f=ps;var g=fe;ps=o,(fe=a)&&!g?Ps(t,i,(i.subtreeFlags&8772)!==0):Hs(t,i),ps=f,fe=g}break;case 30:break;default:Hs(t,i)}}function hm(t){var a=t.alternate;a!==null&&(t.alternate=null,hm(a)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(a=t.stateNode,a!==null&&k(a)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var se=null,Ze=!1;function xs(t,a,i){for(i=i.child;i!==null;)mm(t,a,i),i=i.sibling}function mm(t,a,i){if(It&&typeof It.onCommitFiberUnmount=="function")try{It.onCommitFiberUnmount(Ge,i)}catch{}switch(i.tag){case 26:fe||$a(i,a),xs(t,a,i),i.memoizedState?i.memoizedState.count--:i.stateNode&&(i=i.stateNode,i.parentNode.removeChild(i));break;case 27:fe||$a(i,a);var o=se,f=Ze;Gs(i.type)&&(se=i.stateNode,Ze=!1),xs(t,a,i),ll(i.stateNode),se=o,Ze=f;break;case 5:fe||$a(i,a);case 6:if(o=se,f=Ze,se=null,xs(t,a,i),se=o,Ze=f,se!==null)if(Ze)try{(se.nodeType===9?se.body:se.nodeName==="HTML"?se.ownerDocument.body:se).removeChild(i.stateNode)}catch(g){Wt(i,a,g)}else try{se.removeChild(i.stateNode)}catch(g){Wt(i,a,g)}break;case 18:se!==null&&(Ze?(t=se,ag(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,i.stateNode),ml(t)):ag(se,i.stateNode));break;case 4:o=se,f=Ze,se=i.stateNode.containerInfo,Ze=!0,xs(t,a,i),se=o,Ze=f;break;case 0:case 11:case 14:case 15:fe||Us(2,i,a),fe||Us(4,i,a),xs(t,a,i);break;case 1:fe||($a(i,a),o=i.stateNode,typeof o.componentWillUnmount=="function"&&rm(i,a,o)),xs(t,a,i);break;case 21:xs(t,a,i);break;case 22:fe=(o=fe)||i.memoizedState!==null,xs(t,a,i),fe=o;break;default:xs(t,a,i)}}function gm(t,a){if(a.memoizedState===null&&(t=a.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ml(t)}catch(i){Wt(a,a.return,i)}}function k0(t){switch(t.tag){case 13:case 19:var a=t.stateNode;return a===null&&(a=t.stateNode=new dm),a;case 22:return t=t.stateNode,a=t._retryCache,a===null&&(a=t._retryCache=new dm),a;default:throw Error(l(435,t.tag))}}function su(t,a){var i=k0(t);a.forEach(function(o){var f=B0.bind(null,t,o);i.has(o)||(i.add(o),o.then(f,f))})}function ra(t,a){var i=a.deletions;if(i!==null)for(var o=0;o<i.length;o++){var f=i[o],g=t,b=a,S=b;t:for(;S!==null;){switch(S.tag){case 27:if(Gs(S.type)){se=S.stateNode,Ze=!1;break t}break;case 5:se=S.stateNode,Ze=!1;break t;case 3:case 4:se=S.stateNode.containerInfo,Ze=!0;break t}S=S.return}if(se===null)throw Error(l(160));mm(g,b,f),se=null,Ze=!1,g=f.alternate,g!==null&&(g.return=null),f.return=null}if(a.subtreeFlags&13878)for(a=a.child;a!==null;)pm(a,t),a=a.sibling}var Ra=null;function pm(t,a){var i=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:ra(a,t),oa(t),o&4&&(Us(3,t,t.return),Ki(3,t),Us(5,t,t.return));break;case 1:ra(a,t),oa(t),o&512&&(fe||i===null||$a(i,i.return)),o&64&&ps&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(i=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=i===null?o:i.concat(o))));break;case 26:var f=Ra;if(ra(a,t),oa(t),o&512&&(fe||i===null||$a(i,i.return)),o&4){var g=i!==null?i.memoizedState:null;if(o=t.memoizedState,i===null)if(o===null)if(t.stateNode===null){t:{o=t.type,i=t.memoizedProps,f=f.ownerDocument||f;e:switch(o){case"title":g=f.getElementsByTagName("title")[0],(!g||g[ut]||g[Kt]||g.namespaceURI==="http://www.w3.org/2000/svg"||g.hasAttribute("itemprop"))&&(g=f.createElement(o),f.head.insertBefore(g,f.querySelector("head > title"))),Me(g,o,i),g[Kt]=t,Xt(g),o=g;break t;case"link":var b=ug("link","href",f).get(o+(i.href||""));if(b){for(var S=0;S<b.length;S++)if(g=b[S],g.getAttribute("href")===(i.href==null||i.href===""?null:i.href)&&g.getAttribute("rel")===(i.rel==null?null:i.rel)&&g.getAttribute("title")===(i.title==null?null:i.title)&&g.getAttribute("crossorigin")===(i.crossOrigin==null?null:i.crossOrigin)){b.splice(S,1);break e}}g=f.createElement(o),Me(g,o,i),f.head.appendChild(g);break;case"meta":if(b=ug("meta","content",f).get(o+(i.content||""))){for(S=0;S<b.length;S++)if(g=b[S],g.getAttribute("content")===(i.content==null?null:""+i.content)&&g.getAttribute("name")===(i.name==null?null:i.name)&&g.getAttribute("property")===(i.property==null?null:i.property)&&g.getAttribute("http-equiv")===(i.httpEquiv==null?null:i.httpEquiv)&&g.getAttribute("charset")===(i.charSet==null?null:i.charSet)){b.splice(S,1);break e}}g=f.createElement(o),Me(g,o,i),f.head.appendChild(g);break;default:throw Error(l(468,o))}g[Kt]=t,Xt(g),o=g}t.stateNode=o}else dg(f,t.type,t.stateNode);else t.stateNode=cg(f,o,t.memoizedProps);else g!==o?(g===null?i.stateNode!==null&&(i=i.stateNode,i.parentNode.removeChild(i)):g.count--,o===null?dg(f,t.type,t.stateNode):cg(f,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Ic(t,t.memoizedProps,i.memoizedProps)}break;case 27:ra(a,t),oa(t),o&512&&(fe||i===null||$a(i,i.return)),i!==null&&o&4&&Ic(t,t.memoizedProps,i.memoizedProps);break;case 5:if(ra(a,t),oa(t),o&512&&(fe||i===null||$a(i,i.return)),t.flags&32){f=t.stateNode;try{zn(f,"")}catch(q){Wt(t,t.return,q)}}o&4&&t.stateNode!=null&&(f=t.memoizedProps,Ic(t,f,i!==null?i.memoizedProps:f)),o&1024&&(au=!0);break;case 6:if(ra(a,t),oa(t),o&4){if(t.stateNode===null)throw Error(l(162));o=t.memoizedProps,i=t.stateNode;try{i.nodeValue=o}catch(q){Wt(t,t.return,q)}}break;case 3:if(Pr=null,f=Ra,Ra=Ur(a.containerInfo),ra(a,t),Ra=f,oa(t),o&4&&i!==null&&i.memoizedState.isDehydrated)try{ml(a.containerInfo)}catch(q){Wt(t,t.return,q)}au&&(au=!1,xm(t));break;case 4:o=Ra,Ra=Ur(t.stateNode.containerInfo),ra(a,t),oa(t),Ra=o;break;case 12:ra(a,t),oa(t);break;case 13:ra(a,t),oa(t),t.child.flags&8192&&t.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(cu=ye()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,su(t,o)));break;case 22:f=t.memoizedState!==null;var N=i!==null&&i.memoizedState!==null,H=ps,X=fe;if(ps=H||f,fe=X||N,ra(a,t),fe=X,ps=H,oa(t),o&8192)t:for(a=t.stateNode,a._visibility=f?a._visibility&-2:a._visibility|1,f&&(i===null||N||ps||fe||Sn(t)),i=null,a=t;;){if(a.tag===5||a.tag===26){if(i===null){N=i=a;try{if(g=N.stateNode,f)b=g.style,typeof b.setProperty=="function"?b.setProperty("display","none","important"):b.display="none";else{S=N.stateNode;var Z=N.memoizedProps.style,P=Z!=null&&Z.hasOwnProperty("display")?Z.display:null;S.style.display=P==null||typeof P=="boolean"?"":(""+P).trim()}}catch(q){Wt(N,N.return,q)}}}else if(a.tag===6){if(i===null){N=a;try{N.stateNode.nodeValue=f?"":N.memoizedProps}catch(q){Wt(N,N.return,q)}}}else if((a.tag!==22&&a.tag!==23||a.memoizedState===null||a===t)&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===t)break t;for(;a.sibling===null;){if(a.return===null||a.return===t)break t;i===a&&(i=null),a=a.return}i===a&&(i=null),a.sibling.return=a.return,a=a.sibling}o&4&&(o=t.updateQueue,o!==null&&(i=o.retryQueue,i!==null&&(o.retryQueue=null,su(t,i))));break;case 19:ra(a,t),oa(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,su(t,o)));break;case 30:break;case 21:break;default:ra(a,t),oa(t)}}function oa(t){var a=t.flags;if(a&2){try{for(var i,o=t.return;o!==null;){if(cm(o)){i=o;break}o=o.return}if(i==null)throw Error(l(160));switch(i.tag){case 27:var f=i.stateNode,g=tu(t);Nr(t,g,f);break;case 5:var b=i.stateNode;i.flags&32&&(zn(b,""),i.flags&=-33);var S=tu(t);Nr(t,S,b);break;case 3:case 4:var N=i.stateNode.containerInfo,H=tu(t);eu(t,H,N);break;default:throw Error(l(161))}}catch(X){Wt(t,t.return,X)}t.flags&=-3}a&4096&&(t.flags&=-4097)}function xm(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var a=t;xm(a),a.tag===5&&a.flags&1024&&a.stateNode.reset(),t=t.sibling}}function Hs(t,a){if(a.subtreeFlags&8772)for(a=a.child;a!==null;)fm(t,a.alternate,a),a=a.sibling}function Sn(t){for(t=t.child;t!==null;){var a=t;switch(a.tag){case 0:case 11:case 14:case 15:Us(4,a,a.return),Sn(a);break;case 1:$a(a,a.return);var i=a.stateNode;typeof i.componentWillUnmount=="function"&&rm(a,a.return,i),Sn(a);break;case 27:ll(a.stateNode);case 26:case 5:$a(a,a.return),Sn(a);break;case 22:a.memoizedState===null&&Sn(a);break;case 30:Sn(a);break;default:Sn(a)}t=t.sibling}}function Ps(t,a,i){for(i=i&&(a.subtreeFlags&8772)!==0,a=a.child;a!==null;){var o=a.alternate,f=t,g=a,b=g.flags;switch(g.tag){case 0:case 11:case 15:Ps(f,g,i),Ki(4,g);break;case 1:if(Ps(f,g,i),o=g,f=o.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(H){Wt(o,o.return,H)}if(o=g,f=o.updateQueue,f!==null){var S=o.stateNode;try{var N=f.shared.hiddenCallbacks;if(N!==null)for(f.shared.hiddenCallbacks=null,f=0;f<N.length;f++)Gf(N[f],S)}catch(H){Wt(o,o.return,H)}}i&&b&64&&lm(g),Wi(g,g.return);break;case 27:um(g);case 26:case 5:Ps(f,g,i),i&&o===null&&b&4&&om(g),Wi(g,g.return);break;case 12:Ps(f,g,i);break;case 13:Ps(f,g,i),i&&b&4&&gm(f,g);break;case 22:g.memoizedState===null&&Ps(f,g,i),Wi(g,g.return);break;case 30:break;default:Ps(f,g,i)}a=a.sibling}}function nu(t,a){var i=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),t=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(t=a.memoizedState.cachePool.pool),t!==i&&(t!=null&&t.refCount++,i!=null&&Li(i))}function iu(t,a){t=null,a.alternate!==null&&(t=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==t&&(a.refCount++,t!=null&&Li(t))}function Qa(t,a,i,o){if(a.subtreeFlags&10256)for(a=a.child;a!==null;)bm(t,a,i,o),a=a.sibling}function bm(t,a,i,o){var f=a.flags;switch(a.tag){case 0:case 11:case 15:Qa(t,a,i,o),f&2048&&Ki(9,a);break;case 1:Qa(t,a,i,o);break;case 3:Qa(t,a,i,o),f&2048&&(t=null,a.alternate!==null&&(t=a.alternate.memoizedState.cache),a=a.memoizedState.cache,a!==t&&(a.refCount++,t!=null&&Li(t)));break;case 12:if(f&2048){Qa(t,a,i,o),t=a.stateNode;try{var g=a.memoizedProps,b=g.id,S=g.onPostCommit;typeof S=="function"&&S(b,a.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(N){Wt(a,a.return,N)}}else Qa(t,a,i,o);break;case 13:Qa(t,a,i,o);break;case 23:break;case 22:g=a.stateNode,b=a.alternate,a.memoizedState!==null?g._visibility&2?Qa(t,a,i,o):Ji(t,a):g._visibility&2?Qa(t,a,i,o):(g._visibility|=2,ti(t,a,i,o,(a.subtreeFlags&10256)!==0)),f&2048&&nu(b,a);break;case 24:Qa(t,a,i,o),f&2048&&iu(a.alternate,a);break;default:Qa(t,a,i,o)}}function ti(t,a,i,o,f){for(f=f&&(a.subtreeFlags&10256)!==0,a=a.child;a!==null;){var g=t,b=a,S=i,N=o,H=b.flags;switch(b.tag){case 0:case 11:case 15:ti(g,b,S,N,f),Ki(8,b);break;case 23:break;case 22:var X=b.stateNode;b.memoizedState!==null?X._visibility&2?ti(g,b,S,N,f):Ji(g,b):(X._visibility|=2,ti(g,b,S,N,f)),f&&H&2048&&nu(b.alternate,b);break;case 24:ti(g,b,S,N,f),f&&H&2048&&iu(b.alternate,b);break;default:ti(g,b,S,N,f)}a=a.sibling}}function Ji(t,a){if(a.subtreeFlags&10256)for(a=a.child;a!==null;){var i=t,o=a,f=o.flags;switch(o.tag){case 22:Ji(i,o),f&2048&&nu(o.alternate,o);break;case 24:Ji(i,o),f&2048&&iu(o.alternate,o);break;default:Ji(i,o)}a=a.sibling}}var Ii=8192;function ei(t){if(t.subtreeFlags&Ii)for(t=t.child;t!==null;)ym(t),t=t.sibling}function ym(t){switch(t.tag){case 26:ei(t),t.flags&Ii&&t.memoizedState!==null&&hy(Ra,t.memoizedState,t.memoizedProps);break;case 5:ei(t);break;case 3:case 4:var a=Ra;Ra=Ur(t.stateNode.containerInfo),ei(t),Ra=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=Ii,Ii=16777216,ei(t),Ii=a):ei(t));break;default:ei(t)}}function vm(t){var a=t.alternate;if(a!==null&&(t=a.child,t!==null)){a.child=null;do a=t.sibling,t.sibling=null,t=a;while(t!==null)}}function tl(t){var a=t.deletions;if((t.flags&16)!==0){if(a!==null)for(var i=0;i<a.length;i++){var o=a[i];Ee=o,_m(o,t)}vm(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Sm(t),t=t.sibling}function Sm(t){switch(t.tag){case 0:case 11:case 15:tl(t),t.flags&2048&&Us(9,t,t.return);break;case 3:tl(t);break;case 12:tl(t);break;case 22:var a=t.stateNode;t.memoizedState!==null&&a._visibility&2&&(t.return===null||t.return.tag!==13)?(a._visibility&=-3,Er(t)):tl(t);break;default:tl(t)}}function Er(t){var a=t.deletions;if((t.flags&16)!==0){if(a!==null)for(var i=0;i<a.length;i++){var o=a[i];Ee=o,_m(o,t)}vm(t)}for(t=t.child;t!==null;){switch(a=t,a.tag){case 0:case 11:case 15:Us(8,a,a.return),Er(a);break;case 22:i=a.stateNode,i._visibility&2&&(i._visibility&=-3,Er(a));break;default:Er(a)}t=t.sibling}}function _m(t,a){for(;Ee!==null;){var i=Ee;switch(i.tag){case 0:case 11:case 15:Us(8,i,a);break;case 23:case 22:if(i.memoizedState!==null&&i.memoizedState.cachePool!==null){var o=i.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Li(i.memoizedState.cache)}if(o=i.child,o!==null)o.return=i,Ee=o;else t:for(i=t;Ee!==null;){o=Ee;var f=o.sibling,g=o.return;if(hm(o),o===i){Ee=null;break t}if(f!==null){f.return=g,Ee=f;break t}Ee=g}}}var A0={getCacheForType:function(t){var a=Oe(ve),i=a.data.get(t);return i===void 0&&(i=t(),a.data.set(t,i)),i}},C0=typeof WeakMap=="function"?WeakMap:Map,qt=0,te=null,Mt=null,Ot=0,Yt=0,ca=null,qs=!1,ai=!1,lu=!1,bs=0,oe=0,Ys=0,_n=0,ru=0,Sa=0,si=0,el=null,Ke=null,ou=!1,cu=0,Tr=1/0,kr=null,Vs=null,Ce=0,Fs=null,ni=null,ii=0,uu=0,du=null,jm=null,al=0,fu=null;function ua(){if((qt&2)!==0&&Ot!==0)return Ot&-Ot;if(B.T!==null){var t=Gn;return t!==0?t:yu()}return Va()}function wm(){Sa===0&&(Sa=(Ot&536870912)===0||Ht?Pa():536870912);var t=va.current;return t!==null&&(t.flags|=32),Sa}function da(t,a,i){(t===te&&(Yt===2||Yt===9)||t.cancelPendingCommit!==null)&&(li(t,0),Xs(t,Ot,Sa,!1)),na(t,i),((qt&2)===0||t!==te)&&(t===te&&((qt&2)===0&&(_n|=i),oe===4&&Xs(t,Ot,Sa,!1)),Za(t))}function Nm(t,a,i){if((qt&6)!==0)throw Error(l(327));var o=!i&&(a&124)===0&&(a&t.expiredLanes)===0||Aa(t,a),f=o?R0(t,a):gu(t,a,!0),g=o;do{if(f===0){ai&&!o&&Xs(t,a,0,!1);break}else{if(i=t.current.alternate,g&&!M0(i)){f=gu(t,a,!1),g=!1;continue}if(f===2){if(g=a,t.errorRecoveryDisabledLanes&g)var b=0;else b=t.pendingLanes&-536870913,b=b!==0?b:b&536870912?536870912:0;if(b!==0){a=b;t:{var S=t;f=el;var N=S.current.memoizedState.isDehydrated;if(N&&(li(S,b).flags|=256),b=gu(S,b,!1),b!==2){if(lu&&!N){S.errorRecoveryDisabledLanes|=g,_n|=g,f=4;break t}g=Ke,Ke=f,g!==null&&(Ke===null?Ke=g:Ke.push.apply(Ke,g))}f=b}if(g=!1,f!==2)continue}}if(f===1){li(t,0),Xs(t,a,0,!0);break}t:{switch(o=t,g=f,g){case 0:case 1:throw Error(l(345));case 4:if((a&4194048)!==a)break;case 6:Xs(o,a,Sa,!qs);break t;case 2:Ke=null;break;case 3:case 5:break;default:throw Error(l(329))}if((a&62914560)===a&&(f=cu+300-ye(),10<f)){if(Xs(o,a,Sa,!qs),sa(o,0,!0)!==0)break t;o.timeoutHandle=tg(Em.bind(null,o,i,Ke,kr,ou,a,Sa,_n,si,qs,g,2,-0,0),f);break t}Em(o,i,Ke,kr,ou,a,Sa,_n,si,qs,g,0,-0,0)}}break}while(!0);Za(t)}function Em(t,a,i,o,f,g,b,S,N,H,X,Z,P,q){if(t.timeoutHandle=-1,Z=a.subtreeFlags,(Z&8192||(Z&16785408)===16785408)&&(cl={stylesheets:null,count:0,unsuspend:fy},ym(a),Z=my(),Z!==null)){t.cancelPendingCommit=Z(Rm.bind(null,t,a,g,i,o,f,b,S,N,X,1,P,q)),Xs(t,g,b,!H);return}Rm(t,a,g,i,o,f,b,S,N)}function M0(t){for(var a=t;;){var i=a.tag;if((i===0||i===11||i===15)&&a.flags&16384&&(i=a.updateQueue,i!==null&&(i=i.stores,i!==null)))for(var o=0;o<i.length;o++){var f=i[o],g=f.getSnapshot;f=f.value;try{if(!ia(g(),f))return!1}catch{return!1}}if(i=a.child,a.subtreeFlags&16384&&i!==null)i.return=a,a=i;else{if(a===t)break;for(;a.sibling===null;){if(a.return===null||a.return===t)return!0;a=a.return}a.sibling.return=a.return,a=a.sibling}}return!0}function Xs(t,a,i,o){a&=~ru,a&=~_n,t.suspendedLanes|=a,t.pingedLanes&=~a,o&&(t.warmLanes|=a),o=t.expirationTimes;for(var f=a;0<f;){var g=31-ce(f),b=1<<g;o[g]=-1,f&=~b}i!==0&&qa(t,i,a)}function Ar(){return(qt&6)===0?(sl(0),!1):!0}function hu(){if(Mt!==null){if(Yt===0)var t=Mt.return;else t=Mt,us=pn=null,Cc(t),Jn=null,$i=0,t=Mt;for(;t!==null;)im(t.alternate,t),t=t.return;Mt=null}}function li(t,a){var i=t.timeoutHandle;i!==-1&&(t.timeoutHandle=-1,Z0(i)),i=t.cancelPendingCommit,i!==null&&(t.cancelPendingCommit=null,i()),hu(),te=t,Mt=i=rs(t.current,null),Ot=a,Yt=0,ca=null,qs=!1,ai=Aa(t,a),lu=!1,si=Sa=ru=_n=Ys=oe=0,Ke=el=null,ou=!1,(a&8)!==0&&(a|=a&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=a;0<o;){var f=31-ce(o),g=1<<f;a|=t[f],o&=~g}return bs=a,Wl(),i}function Tm(t,a){At=null,B.H=pr,a===Ui||a===lr?(a=Ff(),Yt=3):a===qf?(a=Ff(),Yt=4):Yt=a===Xh?8:a!==null&&typeof a=="object"&&typeof a.then=="function"?6:1,ca=a,Mt===null&&(oe=1,Sr(t,pa(a,t.current)))}function km(){var t=B.H;return B.H=pr,t===null?pr:t}function Am(){var t=B.A;return B.A=A0,t}function mu(){oe=4,qs||(Ot&4194048)!==Ot&&va.current!==null||(ai=!0),(Ys&134217727)===0&&(_n&134217727)===0||te===null||Xs(te,Ot,Sa,!1)}function gu(t,a,i){var o=qt;qt|=2;var f=km(),g=Am();(te!==t||Ot!==a)&&(kr=null,li(t,a)),a=!1;var b=oe;t:do try{if(Yt!==0&&Mt!==null){var S=Mt,N=ca;switch(Yt){case 8:hu(),b=6;break t;case 3:case 2:case 9:case 6:va.current===null&&(a=!0);var H=Yt;if(Yt=0,ca=null,ri(t,S,N,H),i&&ai){b=0;break t}break;default:H=Yt,Yt=0,ca=null,ri(t,S,N,H)}}D0(),b=oe;break}catch(X){Tm(t,X)}while(!0);return a&&t.shellSuspendCounter++,us=pn=null,qt=o,B.H=f,B.A=g,Mt===null&&(te=null,Ot=0,Wl()),b}function D0(){for(;Mt!==null;)Cm(Mt)}function R0(t,a){var i=qt;qt|=2;var o=km(),f=Am();te!==t||Ot!==a?(kr=null,Tr=ye()+500,li(t,a)):ai=Aa(t,a);t:do try{if(Yt!==0&&Mt!==null){a=Mt;var g=ca;e:switch(Yt){case 1:Yt=0,ca=null,ri(t,a,g,1);break;case 2:case 9:if(Yf(g)){Yt=0,ca=null,Mm(a);break}a=function(){Yt!==2&&Yt!==9||te!==t||(Yt=7),Za(t)},g.then(a,a);break t;case 3:Yt=7;break t;case 4:Yt=5;break t;case 7:Yf(g)?(Yt=0,ca=null,Mm(a)):(Yt=0,ca=null,ri(t,a,g,7));break;case 5:var b=null;switch(Mt.tag){case 26:b=Mt.memoizedState;case 5:case 27:var S=Mt;if(!b||fg(b)){Yt=0,ca=null;var N=S.sibling;if(N!==null)Mt=N;else{var H=S.return;H!==null?(Mt=H,Cr(H)):Mt=null}break e}}Yt=0,ca=null,ri(t,a,g,5);break;case 6:Yt=0,ca=null,ri(t,a,g,6);break;case 8:hu(),oe=6;break t;default:throw Error(l(462))}}O0();break}catch(X){Tm(t,X)}while(!0);return us=pn=null,B.H=o,B.A=f,qt=i,Mt!==null?0:(te=null,Ot=0,Wl(),oe)}function O0(){for(;Mt!==null&&!Ft();)Cm(Mt)}function Cm(t){var a=sm(t.alternate,t,bs);t.memoizedProps=t.pendingProps,a===null?Cr(t):Mt=a}function Mm(t){var a=t,i=a.alternate;switch(a.tag){case 15:case 0:a=Wh(i,a,a.pendingProps,a.type,void 0,Ot);break;case 11:a=Wh(i,a,a.pendingProps,a.type.render,a.ref,Ot);break;case 5:Cc(a);default:im(i,a),a=Mt=Df(a,bs),a=sm(i,a,bs)}t.memoizedProps=t.pendingProps,a===null?Cr(t):Mt=a}function ri(t,a,i,o){us=pn=null,Cc(a),Jn=null,$i=0;var f=a.return;try{if(j0(t,f,a,i,Ot)){oe=1,Sr(t,pa(i,t.current)),Mt=null;return}}catch(g){if(f!==null)throw Mt=f,g;oe=1,Sr(t,pa(i,t.current)),Mt=null;return}a.flags&32768?(Ht||o===1?t=!0:ai||(Ot&536870912)!==0?t=!1:(qs=t=!0,(o===2||o===9||o===3||o===6)&&(o=va.current,o!==null&&o.tag===13&&(o.flags|=16384))),Dm(a,t)):Cr(a)}function Cr(t){var a=t;do{if((a.flags&32768)!==0){Dm(a,qs);return}t=a.return;var i=N0(a.alternate,a,bs);if(i!==null){Mt=i;return}if(a=a.sibling,a!==null){Mt=a;return}Mt=a=t}while(a!==null);oe===0&&(oe=5)}function Dm(t,a){do{var i=E0(t.alternate,t);if(i!==null){i.flags&=32767,Mt=i;return}if(i=t.return,i!==null&&(i.flags|=32768,i.subtreeFlags=0,i.deletions=null),!a&&(t=t.sibling,t!==null)){Mt=t;return}Mt=t=i}while(t!==null);oe=6,Mt=null}function Rm(t,a,i,o,f,g,b,S,N){t.cancelPendingCommit=null;do Mr();while(Ce!==0);if((qt&6)!==0)throw Error(l(327));if(a!==null){if(a===t.current)throw Error(l(177));if(g=a.lanes|a.childLanes,g|=ic,rn(t,i,g,b,S,N),t===te&&(Mt=te=null,Ot=0),ni=a,Fs=t,ii=i,uu=g,du=f,jm=o,(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,U0(De,function(){return Um(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(a.flags&13878)!==0,(a.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,f=W.p,W.p=2,b=qt,qt|=4;try{T0(t,a,i)}finally{qt=b,W.p=f,B.T=o}}Ce=1,Om(),zm(),Lm()}}function Om(){if(Ce===1){Ce=0;var t=Fs,a=ni,i=(a.flags&13878)!==0;if((a.subtreeFlags&13878)!==0||i){i=B.T,B.T=null;var o=W.p;W.p=2;var f=qt;qt|=4;try{pm(a,t);var g=Tu,b=_f(t.containerInfo),S=g.focusedElem,N=g.selectionRange;if(b!==S&&S&&S.ownerDocument&&Sf(S.ownerDocument.documentElement,S)){if(N!==null&&tc(S)){var H=N.start,X=N.end;if(X===void 0&&(X=H),"selectionStart"in S)S.selectionStart=H,S.selectionEnd=Math.min(X,S.value.length);else{var Z=S.ownerDocument||document,P=Z&&Z.defaultView||window;if(P.getSelection){var q=P.getSelection(),Tt=S.textContent.length,wt=Math.min(N.start,Tt),Qt=N.end===void 0?wt:Math.min(N.end,Tt);!q.extend&&wt>Qt&&(b=Qt,Qt=wt,wt=b);var L=vf(S,wt),D=vf(S,Qt);if(L&&D&&(q.rangeCount!==1||q.anchorNode!==L.node||q.anchorOffset!==L.offset||q.focusNode!==D.node||q.focusOffset!==D.offset)){var U=Z.createRange();U.setStart(L.node,L.offset),q.removeAllRanges(),wt>Qt?(q.addRange(U),q.extend(D.node,D.offset)):(U.setEnd(D.node,D.offset),q.addRange(U))}}}}for(Z=[],q=S;q=q.parentNode;)q.nodeType===1&&Z.push({element:q,left:q.scrollLeft,top:q.scrollTop});for(typeof S.focus=="function"&&S.focus(),S=0;S<Z.length;S++){var Q=Z[S];Q.element.scrollLeft=Q.left,Q.element.scrollTop=Q.top}}Vr=!!Eu,Tu=Eu=null}finally{qt=f,W.p=o,B.T=i}}t.current=a,Ce=2}}function zm(){if(Ce===2){Ce=0;var t=Fs,a=ni,i=(a.flags&8772)!==0;if((a.subtreeFlags&8772)!==0||i){i=B.T,B.T=null;var o=W.p;W.p=2;var f=qt;qt|=4;try{fm(t,a.alternate,a)}finally{qt=f,W.p=o,B.T=i}}Ce=3}}function Lm(){if(Ce===4||Ce===3){Ce=0,Ta();var t=Fs,a=ni,i=ii,o=jm;(a.subtreeFlags&10256)!==0||(a.flags&10256)!==0?Ce=5:(Ce=0,ni=Fs=null,Bm(t,t.pendingLanes));var f=t.pendingLanes;if(f===0&&(Vs=null),He(i),a=a.stateNode,It&&typeof It.onCommitFiberRoot=="function")try{It.onCommitFiberRoot(Ge,a,void 0,(a.current.flags&128)===128)}catch{}if(o!==null){a=B.T,f=W.p,W.p=2,B.T=null;try{for(var g=t.onRecoverableError,b=0;b<o.length;b++){var S=o[b];g(S.value,{componentStack:S.stack})}}finally{B.T=a,W.p=f}}(ii&3)!==0&&Mr(),Za(t),f=t.pendingLanes,(i&4194090)!==0&&(f&42)!==0?t===fu?al++:(al=0,fu=t):al=0,sl(0)}}function Bm(t,a){(t.pooledCacheLanes&=a)===0&&(a=t.pooledCache,a!=null&&(t.pooledCache=null,Li(a)))}function Mr(t){return Om(),zm(),Lm(),Um()}function Um(){if(Ce!==5)return!1;var t=Fs,a=uu;uu=0;var i=He(ii),o=B.T,f=W.p;try{W.p=32>i?32:i,B.T=null,i=du,du=null;var g=Fs,b=ii;if(Ce=0,ni=Fs=null,ii=0,(qt&6)!==0)throw Error(l(331));var S=qt;if(qt|=4,Sm(g.current),bm(g,g.current,b,i),qt=S,sl(0,!1),It&&typeof It.onPostCommitFiberRoot=="function")try{It.onPostCommitFiberRoot(Ge,g)}catch{}return!0}finally{W.p=f,B.T=o,Bm(t,a)}}function Hm(t,a,i){a=pa(i,a),a=Fc(t.stateNode,a,2),t=Os(t,a,2),t!==null&&(na(t,2),Za(t))}function Wt(t,a,i){if(t.tag===3)Hm(t,t,i);else for(;a!==null;){if(a.tag===3){Hm(a,t,i);break}else if(a.tag===1){var o=a.stateNode;if(typeof a.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Vs===null||!Vs.has(o))){t=pa(i,t),i=Vh(2),o=Os(a,i,2),o!==null&&(Fh(i,o,a,t),na(o,2),Za(o));break}}a=a.return}}function pu(t,a,i){var o=t.pingCache;if(o===null){o=t.pingCache=new C0;var f=new Set;o.set(a,f)}else f=o.get(a),f===void 0&&(f=new Set,o.set(a,f));f.has(i)||(lu=!0,f.add(i),t=z0.bind(null,t,a,i),a.then(t,t))}function z0(t,a,i){var o=t.pingCache;o!==null&&o.delete(a),t.pingedLanes|=t.suspendedLanes&i,t.warmLanes&=~i,te===t&&(Ot&i)===i&&(oe===4||oe===3&&(Ot&62914560)===Ot&&300>ye()-cu?(qt&2)===0&&li(t,0):ru|=i,si===Ot&&(si=0)),Za(t)}function Pm(t,a){a===0&&(a=ks()),t=Yn(t,a),t!==null&&(na(t,a),Za(t))}function L0(t){var a=t.memoizedState,i=0;a!==null&&(i=a.retryLane),Pm(t,i)}function B0(t,a){var i=0;switch(t.tag){case 13:var o=t.stateNode,f=t.memoizedState;f!==null&&(i=f.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(l(314))}o!==null&&o.delete(a),Pm(t,i)}function U0(t,a){return aa(t,a)}var Dr=null,oi=null,xu=!1,Rr=!1,bu=!1,jn=0;function Za(t){t!==oi&&t.next===null&&(oi===null?Dr=oi=t:oi=oi.next=t),Rr=!0,xu||(xu=!0,P0())}function sl(t,a){if(!bu&&Rr){bu=!0;do for(var i=!1,o=Dr;o!==null;){if(t!==0){var f=o.pendingLanes;if(f===0)var g=0;else{var b=o.suspendedLanes,S=o.pingedLanes;g=(1<<31-ce(42|t)+1)-1,g&=f&~(b&~S),g=g&201326741?g&201326741|1:g?g|2:0}g!==0&&(i=!0,Fm(o,g))}else g=Ot,g=sa(o,o===te?g:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(g&3)===0||Aa(o,g)||(i=!0,Fm(o,g));o=o.next}while(i);bu=!1}}function H0(){qm()}function qm(){Rr=xu=!1;var t=0;jn!==0&&(Q0()&&(t=jn),jn=0);for(var a=ye(),i=null,o=Dr;o!==null;){var f=o.next,g=Ym(o,a);g===0?(o.next=null,i===null?Dr=f:i.next=f,f===null&&(oi=i)):(i=o,(t!==0||(g&3)!==0)&&(Rr=!0)),o=f}sl(t)}function Ym(t,a){for(var i=t.suspendedLanes,o=t.pingedLanes,f=t.expirationTimes,g=t.pendingLanes&-62914561;0<g;){var b=31-ce(g),S=1<<b,N=f[b];N===-1?((S&i)===0||(S&o)!==0)&&(f[b]=Ca(S,a)):N<=a&&(t.expiredLanes|=S),g&=~S}if(a=te,i=Ot,i=sa(t,t===a?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,i===0||t===a&&(Yt===2||Yt===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Ue(o),t.callbackNode=null,t.callbackPriority=0;if((i&3)===0||Aa(t,i)){if(a=i&-i,a===t.callbackPriority)return a;switch(o!==null&&Ue(o),He(i)){case 2:case 8:i=Nt;break;case 32:i=De;break;case 268435456:i=ka;break;default:i=De}return o=Vm.bind(null,t),i=aa(i,o),t.callbackPriority=a,t.callbackNode=i,a}return o!==null&&o!==null&&Ue(o),t.callbackPriority=2,t.callbackNode=null,2}function Vm(t,a){if(Ce!==0&&Ce!==5)return t.callbackNode=null,t.callbackPriority=0,null;var i=t.callbackNode;if(Mr()&&t.callbackNode!==i)return null;var o=Ot;return o=sa(t,t===te?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(Nm(t,o,a),Ym(t,ye()),t.callbackNode!=null&&t.callbackNode===i?Vm.bind(null,t):null)}function Fm(t,a){if(Mr())return null;Nm(t,a,!0)}function P0(){K0(function(){(qt&6)!==0?aa(Ua,H0):qm()})}function yu(){return jn===0&&(jn=Pa()),jn}function Xm(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Fl(""+t)}function Gm(t,a){var i=a.ownerDocument.createElement("input");return i.name=a.name,i.value=a.value,t.id&&i.setAttribute("form",t.id),a.parentNode.insertBefore(i,a),t=new FormData(t),i.parentNode.removeChild(i),t}function q0(t,a,i,o,f){if(a==="submit"&&i&&i.stateNode===f){var g=Xm((f[ge]||null).action),b=o.submitter;b&&(a=(a=b[ge]||null)?Xm(a.formAction):b.getAttribute("formAction"),a!==null&&(g=a,b=null));var S=new Ql("action","action",null,o,f);t.push({event:S,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(jn!==0){var N=b?Gm(f,b):new FormData(f);Hc(i,{pending:!0,data:N,method:f.method,action:g},null,N)}}else typeof g=="function"&&(S.preventDefault(),N=b?Gm(f,b):new FormData(f),Hc(i,{pending:!0,data:N,method:f.method,action:g},g,N))},currentTarget:f}]})}}for(var vu=0;vu<nc.length;vu++){var Su=nc[vu],Y0=Su.toLowerCase(),V0=Su[0].toUpperCase()+Su.slice(1);Da(Y0,"on"+V0)}Da(Nf,"onAnimationEnd"),Da(Ef,"onAnimationIteration"),Da(Tf,"onAnimationStart"),Da("dblclick","onDoubleClick"),Da("focusin","onFocus"),Da("focusout","onBlur"),Da(l0,"onTransitionRun"),Da(r0,"onTransitionStart"),Da(o0,"onTransitionCancel"),Da(kf,"onTransitionEnd"),Fa("onMouseEnter",["mouseout","mouseover"]),Fa("onMouseLeave",["mouseout","mouseover"]),Fa("onPointerEnter",["pointerout","pointerover"]),Fa("onPointerLeave",["pointerout","pointerover"]),ns("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ns("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ns("onBeforeInput",["compositionend","keypress","textInput","paste"]),ns("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ns("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ns("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var nl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),F0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(nl));function $m(t,a){a=(a&4)!==0;for(var i=0;i<t.length;i++){var o=t[i],f=o.event;o=o.listeners;t:{var g=void 0;if(a)for(var b=o.length-1;0<=b;b--){var S=o[b],N=S.instance,H=S.currentTarget;if(S=S.listener,N!==g&&f.isPropagationStopped())break t;g=S,f.currentTarget=H;try{g(f)}catch(X){vr(X)}f.currentTarget=null,g=N}else for(b=0;b<o.length;b++){if(S=o[b],N=S.instance,H=S.currentTarget,S=S.listener,N!==g&&f.isPropagationStopped())break t;g=S,f.currentTarget=H;try{g(f)}catch(X){vr(X)}f.currentTarget=null,g=N}}}}function Dt(t,a){var i=a[R];i===void 0&&(i=a[R]=new Set);var o=t+"__bubble";i.has(o)||(Qm(a,t,2,!1),i.add(o))}function _u(t,a,i){var o=0;a&&(o|=4),Qm(i,t,o,a)}var Or="_reactListening"+Math.random().toString(36).slice(2);function ju(t){if(!t[Or]){t[Or]=!0,qe.forEach(function(i){i!=="selectionchange"&&(F0.has(i)||_u(i,!1,t),_u(i,!0,t))});var a=t.nodeType===9?t:t.ownerDocument;a===null||a[Or]||(a[Or]=!0,_u("selectionchange",!1,a))}}function Qm(t,a,i,o){switch(bg(a)){case 2:var f=xy;break;case 8:f=by;break;default:f=Bu}i=f.bind(null,a,i,t),f=void 0,!Xo||a!=="touchstart"&&a!=="touchmove"&&a!=="wheel"||(f=!0),o?f!==void 0?t.addEventListener(a,i,{capture:!0,passive:f}):t.addEventListener(a,i,!0):f!==void 0?t.addEventListener(a,i,{passive:f}):t.addEventListener(a,i,!1)}function wu(t,a,i,o,f){var g=o;if((a&1)===0&&(a&2)===0&&o!==null)t:for(;;){if(o===null)return;var b=o.tag;if(b===3||b===4){var S=o.stateNode.containerInfo;if(S===f)break;if(b===4)for(b=o.return;b!==null;){var N=b.tag;if((N===3||N===4)&&b.stateNode.containerInfo===f)return;b=b.return}for(;S!==null;){if(b=F(S),b===null)return;if(N=b.tag,N===5||N===6||N===26||N===27){o=g=b;continue t}S=S.parentNode}}o=o.return}tf(function(){var H=g,X=Vo(i),Z=[];t:{var P=Af.get(t);if(P!==void 0){var q=Ql,Tt=t;switch(t){case"keypress":if(Gl(i)===0)break t;case"keydown":case"keyup":q=Ub;break;case"focusin":Tt="focus",q=Zo;break;case"focusout":Tt="blur",q=Zo;break;case"beforeblur":case"afterblur":q=Zo;break;case"click":if(i.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":q=sf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":q=Eb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":q=qb;break;case Nf:case Ef:case Tf:q=Ab;break;case kf:q=Vb;break;case"scroll":case"scrollend":q=wb;break;case"wheel":q=Xb;break;case"copy":case"cut":case"paste":q=Mb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":q=lf;break;case"toggle":case"beforetoggle":q=$b}var wt=(a&4)!==0,Qt=!wt&&(t==="scroll"||t==="scrollend"),L=wt?P!==null?P+"Capture":null:P;wt=[];for(var D=H,U;D!==null;){var Q=D;if(U=Q.stateNode,Q=Q.tag,Q!==5&&Q!==26&&Q!==27||U===null||L===null||(Q=ji(D,L),Q!=null&&wt.push(il(D,Q,U))),Qt)break;D=D.return}0<wt.length&&(P=new q(P,Tt,null,i,X),Z.push({event:P,listeners:wt}))}}if((a&7)===0){t:{if(P=t==="mouseover"||t==="pointerover",q=t==="mouseout"||t==="pointerout",P&&i!==Yo&&(Tt=i.relatedTarget||i.fromElement)&&(F(Tt)||Tt[we]))break t;if((q||P)&&(P=X.window===X?X:(P=X.ownerDocument)?P.defaultView||P.parentWindow:window,q?(Tt=i.relatedTarget||i.toElement,q=H,Tt=Tt?F(Tt):null,Tt!==null&&(Qt=c(Tt),wt=Tt.tag,Tt!==Qt||wt!==5&&wt!==27&&wt!==6)&&(Tt=null)):(q=null,Tt=H),q!==Tt)){if(wt=sf,Q="onMouseLeave",L="onMouseEnter",D="mouse",(t==="pointerout"||t==="pointerover")&&(wt=lf,Q="onPointerLeave",L="onPointerEnter",D="pointer"),Qt=q==null?P:Rt(q),U=Tt==null?P:Rt(Tt),P=new wt(Q,D+"leave",q,i,X),P.target=Qt,P.relatedTarget=U,Q=null,F(X)===H&&(wt=new wt(L,D+"enter",Tt,i,X),wt.target=U,wt.relatedTarget=Qt,Q=wt),Qt=Q,q&&Tt)e:{for(wt=q,L=Tt,D=0,U=wt;U;U=ci(U))D++;for(U=0,Q=L;Q;Q=ci(Q))U++;for(;0<D-U;)wt=ci(wt),D--;for(;0<U-D;)L=ci(L),U--;for(;D--;){if(wt===L||L!==null&&wt===L.alternate)break e;wt=ci(wt),L=ci(L)}wt=null}else wt=null;q!==null&&Zm(Z,P,q,wt,!1),Tt!==null&&Qt!==null&&Zm(Z,Qt,Tt,wt,!0)}}t:{if(P=H?Rt(H):window,q=P.nodeName&&P.nodeName.toLowerCase(),q==="select"||q==="input"&&P.type==="file")var gt=mf;else if(ff(P))if(gf)gt=s0;else{gt=e0;var Ct=t0}else q=P.nodeName,!q||q.toLowerCase()!=="input"||P.type!=="checkbox"&&P.type!=="radio"?H&&qo(H.elementType)&&(gt=mf):gt=a0;if(gt&&(gt=gt(t,H))){hf(Z,gt,i,X);break t}Ct&&Ct(t,P,H),t==="focusout"&&H&&P.type==="number"&&H.memoizedProps.value!=null&&Po(P,"number",P.value)}switch(Ct=H?Rt(H):window,t){case"focusin":(ff(Ct)||Ct.contentEditable==="true")&&(Hn=Ct,ec=H,Mi=null);break;case"focusout":Mi=ec=Hn=null;break;case"mousedown":ac=!0;break;case"contextmenu":case"mouseup":case"dragend":ac=!1,jf(Z,i,X);break;case"selectionchange":if(i0)break;case"keydown":case"keyup":jf(Z,i,X)}var yt;if(Wo)t:{switch(t){case"compositionstart":var Et="onCompositionStart";break t;case"compositionend":Et="onCompositionEnd";break t;case"compositionupdate":Et="onCompositionUpdate";break t}Et=void 0}else Un?uf(t,i)&&(Et="onCompositionEnd"):t==="keydown"&&i.keyCode===229&&(Et="onCompositionStart");Et&&(rf&&i.locale!=="ko"&&(Un||Et!=="onCompositionStart"?Et==="onCompositionEnd"&&Un&&(yt=ef()):(Cs=X,Go="value"in Cs?Cs.value:Cs.textContent,Un=!0)),Ct=zr(H,Et),0<Ct.length&&(Et=new nf(Et,t,null,i,X),Z.push({event:Et,listeners:Ct}),yt?Et.data=yt:(yt=df(i),yt!==null&&(Et.data=yt)))),(yt=Zb?Kb(t,i):Wb(t,i))&&(Et=zr(H,"onBeforeInput"),0<Et.length&&(Ct=new nf("onBeforeInput","beforeinput",null,i,X),Z.push({event:Ct,listeners:Et}),Ct.data=yt)),q0(Z,t,H,i,X)}$m(Z,a)})}function il(t,a,i){return{instance:t,listener:a,currentTarget:i}}function zr(t,a){for(var i=a+"Capture",o=[];t!==null;){var f=t,g=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||g===null||(f=ji(t,i),f!=null&&o.unshift(il(t,f,g)),f=ji(t,a),f!=null&&o.push(il(t,f,g))),t.tag===3)return o;t=t.return}return[]}function ci(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Zm(t,a,i,o,f){for(var g=a._reactName,b=[];i!==null&&i!==o;){var S=i,N=S.alternate,H=S.stateNode;if(S=S.tag,N!==null&&N===o)break;S!==5&&S!==26&&S!==27||H===null||(N=H,f?(H=ji(i,g),H!=null&&b.unshift(il(i,H,N))):f||(H=ji(i,g),H!=null&&b.push(il(i,H,N)))),i=i.return}b.length!==0&&t.push({event:a,listeners:b})}var X0=/\r\n?/g,G0=/\u0000|\uFFFD/g;function Km(t){return(typeof t=="string"?t:""+t).replace(X0,`
`).replace(G0,"")}function Wm(t,a){return a=Km(a),Km(t)===a}function Lr(){}function $t(t,a,i,o,f,g){switch(i){case"children":typeof o=="string"?a==="body"||a==="textarea"&&o===""||zn(t,o):(typeof o=="number"||typeof o=="bigint")&&a!=="body"&&zn(t,""+o);break;case"className":ql(t,"class",o);break;case"tabIndex":ql(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":ql(t,i,o);break;case"style":Jd(t,o,g);break;case"data":if(a!=="object"){ql(t,"data",o);break}case"src":case"href":if(o===""&&(a!=="a"||i!=="href")){t.removeAttribute(i);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(i);break}o=Fl(""+o),t.setAttribute(i,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(i,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof g=="function"&&(i==="formAction"?(a!=="input"&&$t(t,a,"name",f.name,f,null),$t(t,a,"formEncType",f.formEncType,f,null),$t(t,a,"formMethod",f.formMethod,f,null),$t(t,a,"formTarget",f.formTarget,f,null)):($t(t,a,"encType",f.encType,f,null),$t(t,a,"method",f.method,f,null),$t(t,a,"target",f.target,f,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(i);break}o=Fl(""+o),t.setAttribute(i,o);break;case"onClick":o!=null&&(t.onclick=Lr);break;case"onScroll":o!=null&&Dt("scroll",t);break;case"onScrollEnd":o!=null&&Dt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(l(61));if(i=o.__html,i!=null){if(f.children!=null)throw Error(l(60));t.innerHTML=i}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}i=Fl(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",i);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(i,""+o):t.removeAttribute(i);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(i,""):t.removeAttribute(i);break;case"capture":case"download":o===!0?t.setAttribute(i,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(i,o):t.removeAttribute(i);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(i,o):t.removeAttribute(i);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(i):t.setAttribute(i,o);break;case"popover":Dt("beforetoggle",t),Dt("toggle",t),Pl(t,"popover",o);break;case"xlinkActuate":is(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":is(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":is(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":is(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":is(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":is(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":is(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":is(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":is(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Pl(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(i=_b.get(i)||i,Pl(t,i,o))}}function Nu(t,a,i,o,f,g){switch(i){case"style":Jd(t,o,g);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(l(61));if(i=o.__html,i!=null){if(f.children!=null)throw Error(l(60));t.innerHTML=i}}break;case"children":typeof o=="string"?zn(t,o):(typeof o=="number"||typeof o=="bigint")&&zn(t,""+o);break;case"onScroll":o!=null&&Dt("scroll",t);break;case"onScrollEnd":o!=null&&Dt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=Lr);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Hl.hasOwnProperty(i))t:{if(i[0]==="o"&&i[1]==="n"&&(f=i.endsWith("Capture"),a=i.slice(2,f?i.length-7:void 0),g=t[ge]||null,g=g!=null?g[i]:null,typeof g=="function"&&t.removeEventListener(a,g,f),typeof o=="function")){typeof g!="function"&&g!==null&&(i in t?t[i]=null:t.hasAttribute(i)&&t.removeAttribute(i)),t.addEventListener(a,o,f);break t}i in t?t[i]=o:o===!0?t.setAttribute(i,""):Pl(t,i,o)}}}function Me(t,a,i){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Dt("error",t),Dt("load",t);var o=!1,f=!1,g;for(g in i)if(i.hasOwnProperty(g)){var b=i[g];if(b!=null)switch(g){case"src":o=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,a));default:$t(t,a,g,b,i,null)}}f&&$t(t,a,"srcSet",i.srcSet,i,null),o&&$t(t,a,"src",i.src,i,null);return;case"input":Dt("invalid",t);var S=g=b=f=null,N=null,H=null;for(o in i)if(i.hasOwnProperty(o)){var X=i[o];if(X!=null)switch(o){case"name":f=X;break;case"type":b=X;break;case"checked":N=X;break;case"defaultChecked":H=X;break;case"value":g=X;break;case"defaultValue":S=X;break;case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(l(137,a));break;default:$t(t,a,o,X,i,null)}}Qd(t,g,S,N,H,b,f,!1),Yl(t);return;case"select":Dt("invalid",t),o=b=g=null;for(f in i)if(i.hasOwnProperty(f)&&(S=i[f],S!=null))switch(f){case"value":g=S;break;case"defaultValue":b=S;break;case"multiple":o=S;default:$t(t,a,f,S,i,null)}a=g,i=b,t.multiple=!!o,a!=null?On(t,!!o,a,!1):i!=null&&On(t,!!o,i,!0);return;case"textarea":Dt("invalid",t),g=f=o=null;for(b in i)if(i.hasOwnProperty(b)&&(S=i[b],S!=null))switch(b){case"value":o=S;break;case"defaultValue":f=S;break;case"children":g=S;break;case"dangerouslySetInnerHTML":if(S!=null)throw Error(l(91));break;default:$t(t,a,b,S,i,null)}Kd(t,o,f,g),Yl(t);return;case"option":for(N in i)if(i.hasOwnProperty(N)&&(o=i[N],o!=null))switch(N){case"selected":t.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:$t(t,a,N,o,i,null)}return;case"dialog":Dt("beforetoggle",t),Dt("toggle",t),Dt("cancel",t),Dt("close",t);break;case"iframe":case"object":Dt("load",t);break;case"video":case"audio":for(o=0;o<nl.length;o++)Dt(nl[o],t);break;case"image":Dt("error",t),Dt("load",t);break;case"details":Dt("toggle",t);break;case"embed":case"source":case"link":Dt("error",t),Dt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(H in i)if(i.hasOwnProperty(H)&&(o=i[H],o!=null))switch(H){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,a));default:$t(t,a,H,o,i,null)}return;default:if(qo(a)){for(X in i)i.hasOwnProperty(X)&&(o=i[X],o!==void 0&&Nu(t,a,X,o,i,void 0));return}}for(S in i)i.hasOwnProperty(S)&&(o=i[S],o!=null&&$t(t,a,S,o,i,null))}function $0(t,a,i,o){switch(a){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,g=null,b=null,S=null,N=null,H=null,X=null;for(q in i){var Z=i[q];if(i.hasOwnProperty(q)&&Z!=null)switch(q){case"checked":break;case"value":break;case"defaultValue":N=Z;default:o.hasOwnProperty(q)||$t(t,a,q,null,o,Z)}}for(var P in o){var q=o[P];if(Z=i[P],o.hasOwnProperty(P)&&(q!=null||Z!=null))switch(P){case"type":g=q;break;case"name":f=q;break;case"checked":H=q;break;case"defaultChecked":X=q;break;case"value":b=q;break;case"defaultValue":S=q;break;case"children":case"dangerouslySetInnerHTML":if(q!=null)throw Error(l(137,a));break;default:q!==Z&&$t(t,a,P,q,o,Z)}}Ho(t,b,S,N,H,X,g,f);return;case"select":q=b=S=P=null;for(g in i)if(N=i[g],i.hasOwnProperty(g)&&N!=null)switch(g){case"value":break;case"multiple":q=N;default:o.hasOwnProperty(g)||$t(t,a,g,null,o,N)}for(f in o)if(g=o[f],N=i[f],o.hasOwnProperty(f)&&(g!=null||N!=null))switch(f){case"value":P=g;break;case"defaultValue":S=g;break;case"multiple":b=g;default:g!==N&&$t(t,a,f,g,o,N)}a=S,i=b,o=q,P!=null?On(t,!!i,P,!1):!!o!=!!i&&(a!=null?On(t,!!i,a,!0):On(t,!!i,i?[]:"",!1));return;case"textarea":q=P=null;for(S in i)if(f=i[S],i.hasOwnProperty(S)&&f!=null&&!o.hasOwnProperty(S))switch(S){case"value":break;case"children":break;default:$t(t,a,S,null,o,f)}for(b in o)if(f=o[b],g=i[b],o.hasOwnProperty(b)&&(f!=null||g!=null))switch(b){case"value":P=f;break;case"defaultValue":q=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(l(91));break;default:f!==g&&$t(t,a,b,f,o,g)}Zd(t,P,q);return;case"option":for(var Tt in i)if(P=i[Tt],i.hasOwnProperty(Tt)&&P!=null&&!o.hasOwnProperty(Tt))switch(Tt){case"selected":t.selected=!1;break;default:$t(t,a,Tt,null,o,P)}for(N in o)if(P=o[N],q=i[N],o.hasOwnProperty(N)&&P!==q&&(P!=null||q!=null))switch(N){case"selected":t.selected=P&&typeof P!="function"&&typeof P!="symbol";break;default:$t(t,a,N,P,o,q)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var wt in i)P=i[wt],i.hasOwnProperty(wt)&&P!=null&&!o.hasOwnProperty(wt)&&$t(t,a,wt,null,o,P);for(H in o)if(P=o[H],q=i[H],o.hasOwnProperty(H)&&P!==q&&(P!=null||q!=null))switch(H){case"children":case"dangerouslySetInnerHTML":if(P!=null)throw Error(l(137,a));break;default:$t(t,a,H,P,o,q)}return;default:if(qo(a)){for(var Qt in i)P=i[Qt],i.hasOwnProperty(Qt)&&P!==void 0&&!o.hasOwnProperty(Qt)&&Nu(t,a,Qt,void 0,o,P);for(X in o)P=o[X],q=i[X],!o.hasOwnProperty(X)||P===q||P===void 0&&q===void 0||Nu(t,a,X,P,o,q);return}}for(var L in i)P=i[L],i.hasOwnProperty(L)&&P!=null&&!o.hasOwnProperty(L)&&$t(t,a,L,null,o,P);for(Z in o)P=o[Z],q=i[Z],!o.hasOwnProperty(Z)||P===q||P==null&&q==null||$t(t,a,Z,P,o,q)}var Eu=null,Tu=null;function Br(t){return t.nodeType===9?t:t.ownerDocument}function Jm(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Im(t,a){if(t===0)switch(a){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&a==="foreignObject"?0:t}function ku(t,a){return t==="textarea"||t==="noscript"||typeof a.children=="string"||typeof a.children=="number"||typeof a.children=="bigint"||typeof a.dangerouslySetInnerHTML=="object"&&a.dangerouslySetInnerHTML!==null&&a.dangerouslySetInnerHTML.__html!=null}var Au=null;function Q0(){var t=window.event;return t&&t.type==="popstate"?t===Au?!1:(Au=t,!0):(Au=null,!1)}var tg=typeof setTimeout=="function"?setTimeout:void 0,Z0=typeof clearTimeout=="function"?clearTimeout:void 0,eg=typeof Promise=="function"?Promise:void 0,K0=typeof queueMicrotask=="function"?queueMicrotask:typeof eg<"u"?function(t){return eg.resolve(null).then(t).catch(W0)}:tg;function W0(t){setTimeout(function(){throw t})}function Gs(t){return t==="head"}function ag(t,a){var i=a,o=0,f=0;do{var g=i.nextSibling;if(t.removeChild(i),g&&g.nodeType===8)if(i=g.data,i==="/$"){if(0<o&&8>o){i=o;var b=t.ownerDocument;if(i&1&&ll(b.documentElement),i&2&&ll(b.body),i&4)for(i=b.head,ll(i),b=i.firstChild;b;){var S=b.nextSibling,N=b.nodeName;b[ut]||N==="SCRIPT"||N==="STYLE"||N==="LINK"&&b.rel.toLowerCase()==="stylesheet"||i.removeChild(b),b=S}}if(f===0){t.removeChild(g),ml(a);return}f--}else i==="$"||i==="$?"||i==="$!"?f++:o=i.charCodeAt(0)-48;else o=0;i=g}while(i);ml(a)}function Cu(t){var a=t.firstChild;for(a&&a.nodeType===10&&(a=a.nextSibling);a;){var i=a;switch(a=a.nextSibling,i.nodeName){case"HTML":case"HEAD":case"BODY":Cu(i),k(i);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(i.rel.toLowerCase()==="stylesheet")continue}t.removeChild(i)}}function J0(t,a,i,o){for(;t.nodeType===1;){var f=i;if(t.nodeName.toLowerCase()!==a.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[ut])switch(a){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(g=t.getAttribute("rel"),g==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(g!==f.rel||t.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||t.getAttribute("title")!==(f.title==null?null:f.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(g=t.getAttribute("src"),(g!==(f.src==null?null:f.src)||t.getAttribute("type")!==(f.type==null?null:f.type)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&g&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(a==="input"&&t.type==="hidden"){var g=f.name==null?null:""+f.name;if(f.type==="hidden"&&t.getAttribute("name")===g)return t}else return t;if(t=Oa(t.nextSibling),t===null)break}return null}function I0(t,a,i){if(a==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!i||(t=Oa(t.nextSibling),t===null))return null;return t}function Mu(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState==="complete"}function ty(t,a){var i=t.ownerDocument;if(t.data!=="$?"||i.readyState==="complete")a();else{var o=function(){a(),i.removeEventListener("DOMContentLoaded",o)};i.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Oa(t){for(;t!=null;t=t.nextSibling){var a=t.nodeType;if(a===1||a===3)break;if(a===8){if(a=t.data,a==="$"||a==="$!"||a==="$?"||a==="F!"||a==="F")break;if(a==="/$")return null}}return t}var Du=null;function sg(t){t=t.previousSibling;for(var a=0;t;){if(t.nodeType===8){var i=t.data;if(i==="$"||i==="$!"||i==="$?"){if(a===0)return t;a--}else i==="/$"&&a++}t=t.previousSibling}return null}function ng(t,a,i){switch(a=Br(i),t){case"html":if(t=a.documentElement,!t)throw Error(l(452));return t;case"head":if(t=a.head,!t)throw Error(l(453));return t;case"body":if(t=a.body,!t)throw Error(l(454));return t;default:throw Error(l(451))}}function ll(t){for(var a=t.attributes;a.length;)t.removeAttributeNode(a[0]);k(t)}var _a=new Map,ig=new Set;function Ur(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var ys=W.d;W.d={f:ey,r:ay,D:sy,C:ny,L:iy,m:ly,X:oy,S:ry,M:cy};function ey(){var t=ys.f(),a=Ar();return t||a}function ay(t){var a=mt(t);a!==null&&a.tag===5&&a.type==="form"?Nh(a):ys.r(t)}var ui=typeof document>"u"?null:document;function lg(t,a,i){var o=ui;if(o&&typeof a=="string"&&a){var f=ga(a);f='link[rel="'+t+'"][href="'+f+'"]',typeof i=="string"&&(f+='[crossorigin="'+i+'"]'),ig.has(f)||(ig.add(f),t={rel:t,crossOrigin:i,href:a},o.querySelector(f)===null&&(a=o.createElement("link"),Me(a,"link",t),Xt(a),o.head.appendChild(a)))}}function sy(t){ys.D(t),lg("dns-prefetch",t,null)}function ny(t,a){ys.C(t,a),lg("preconnect",t,a)}function iy(t,a,i){ys.L(t,a,i);var o=ui;if(o&&t&&a){var f='link[rel="preload"][as="'+ga(a)+'"]';a==="image"&&i&&i.imageSrcSet?(f+='[imagesrcset="'+ga(i.imageSrcSet)+'"]',typeof i.imageSizes=="string"&&(f+='[imagesizes="'+ga(i.imageSizes)+'"]')):f+='[href="'+ga(t)+'"]';var g=f;switch(a){case"style":g=di(t);break;case"script":g=fi(t)}_a.has(g)||(t=x({rel:"preload",href:a==="image"&&i&&i.imageSrcSet?void 0:t,as:a},i),_a.set(g,t),o.querySelector(f)!==null||a==="style"&&o.querySelector(rl(g))||a==="script"&&o.querySelector(ol(g))||(a=o.createElement("link"),Me(a,"link",t),Xt(a),o.head.appendChild(a)))}}function ly(t,a){ys.m(t,a);var i=ui;if(i&&t){var o=a&&typeof a.as=="string"?a.as:"script",f='link[rel="modulepreload"][as="'+ga(o)+'"][href="'+ga(t)+'"]',g=f;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":g=fi(t)}if(!_a.has(g)&&(t=x({rel:"modulepreload",href:t},a),_a.set(g,t),i.querySelector(f)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(i.querySelector(ol(g)))return}o=i.createElement("link"),Me(o,"link",t),Xt(o),i.head.appendChild(o)}}}function ry(t,a,i){ys.S(t,a,i);var o=ui;if(o&&t){var f=ue(o).hoistableStyles,g=di(t);a=a||"default";var b=f.get(g);if(!b){var S={loading:0,preload:null};if(b=o.querySelector(rl(g)))S.loading=5;else{t=x({rel:"stylesheet",href:t,"data-precedence":a},i),(i=_a.get(g))&&Ru(t,i);var N=b=o.createElement("link");Xt(N),Me(N,"link",t),N._p=new Promise(function(H,X){N.onload=H,N.onerror=X}),N.addEventListener("load",function(){S.loading|=1}),N.addEventListener("error",function(){S.loading|=2}),S.loading|=4,Hr(b,a,o)}b={type:"stylesheet",instance:b,count:1,state:S},f.set(g,b)}}}function oy(t,a){ys.X(t,a);var i=ui;if(i&&t){var o=ue(i).hoistableScripts,f=fi(t),g=o.get(f);g||(g=i.querySelector(ol(f)),g||(t=x({src:t,async:!0},a),(a=_a.get(f))&&Ou(t,a),g=i.createElement("script"),Xt(g),Me(g,"link",t),i.head.appendChild(g)),g={type:"script",instance:g,count:1,state:null},o.set(f,g))}}function cy(t,a){ys.M(t,a);var i=ui;if(i&&t){var o=ue(i).hoistableScripts,f=fi(t),g=o.get(f);g||(g=i.querySelector(ol(f)),g||(t=x({src:t,async:!0,type:"module"},a),(a=_a.get(f))&&Ou(t,a),g=i.createElement("script"),Xt(g),Me(g,"link",t),i.head.appendChild(g)),g={type:"script",instance:g,count:1,state:null},o.set(f,g))}}function rg(t,a,i,o){var f=(f=ht.current)?Ur(f):null;if(!f)throw Error(l(446));switch(t){case"meta":case"title":return null;case"style":return typeof i.precedence=="string"&&typeof i.href=="string"?(a=di(i.href),i=ue(f).hoistableStyles,o=i.get(a),o||(o={type:"style",instance:null,count:0,state:null},i.set(a,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(i.rel==="stylesheet"&&typeof i.href=="string"&&typeof i.precedence=="string"){t=di(i.href);var g=ue(f).hoistableStyles,b=g.get(t);if(b||(f=f.ownerDocument||f,b={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},g.set(t,b),(g=f.querySelector(rl(t)))&&!g._p&&(b.instance=g,b.state.loading=5),_a.has(t)||(i={rel:"preload",as:"style",href:i.href,crossOrigin:i.crossOrigin,integrity:i.integrity,media:i.media,hrefLang:i.hrefLang,referrerPolicy:i.referrerPolicy},_a.set(t,i),g||uy(f,t,i,b.state))),a&&o===null)throw Error(l(528,""));return b}if(a&&o!==null)throw Error(l(529,""));return null;case"script":return a=i.async,i=i.src,typeof i=="string"&&a&&typeof a!="function"&&typeof a!="symbol"?(a=fi(i),i=ue(f).hoistableScripts,o=i.get(a),o||(o={type:"script",instance:null,count:0,state:null},i.set(a,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,t))}}function di(t){return'href="'+ga(t)+'"'}function rl(t){return'link[rel="stylesheet"]['+t+"]"}function og(t){return x({},t,{"data-precedence":t.precedence,precedence:null})}function uy(t,a,i,o){t.querySelector('link[rel="preload"][as="style"]['+a+"]")?o.loading=1:(a=t.createElement("link"),o.preload=a,a.addEventListener("load",function(){return o.loading|=1}),a.addEventListener("error",function(){return o.loading|=2}),Me(a,"link",i),Xt(a),t.head.appendChild(a))}function fi(t){return'[src="'+ga(t)+'"]'}function ol(t){return"script[async]"+t}function cg(t,a,i){if(a.count++,a.instance===null)switch(a.type){case"style":var o=t.querySelector('style[data-href~="'+ga(i.href)+'"]');if(o)return a.instance=o,Xt(o),o;var f=x({},i,{"data-href":i.href,"data-precedence":i.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),Xt(o),Me(o,"style",f),Hr(o,i.precedence,t),a.instance=o;case"stylesheet":f=di(i.href);var g=t.querySelector(rl(f));if(g)return a.state.loading|=4,a.instance=g,Xt(g),g;o=og(i),(f=_a.get(f))&&Ru(o,f),g=(t.ownerDocument||t).createElement("link"),Xt(g);var b=g;return b._p=new Promise(function(S,N){b.onload=S,b.onerror=N}),Me(g,"link",o),a.state.loading|=4,Hr(g,i.precedence,t),a.instance=g;case"script":return g=fi(i.src),(f=t.querySelector(ol(g)))?(a.instance=f,Xt(f),f):(o=i,(f=_a.get(g))&&(o=x({},i),Ou(o,f)),t=t.ownerDocument||t,f=t.createElement("script"),Xt(f),Me(f,"link",o),t.head.appendChild(f),a.instance=f);case"void":return null;default:throw Error(l(443,a.type))}else a.type==="stylesheet"&&(a.state.loading&4)===0&&(o=a.instance,a.state.loading|=4,Hr(o,i.precedence,t));return a.instance}function Hr(t,a,i){for(var o=i.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=o.length?o[o.length-1]:null,g=f,b=0;b<o.length;b++){var S=o[b];if(S.dataset.precedence===a)g=S;else if(g!==f)break}g?g.parentNode.insertBefore(t,g.nextSibling):(a=i.nodeType===9?i.head:i,a.insertBefore(t,a.firstChild))}function Ru(t,a){t.crossOrigin==null&&(t.crossOrigin=a.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=a.referrerPolicy),t.title==null&&(t.title=a.title)}function Ou(t,a){t.crossOrigin==null&&(t.crossOrigin=a.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=a.referrerPolicy),t.integrity==null&&(t.integrity=a.integrity)}var Pr=null;function ug(t,a,i){if(Pr===null){var o=new Map,f=Pr=new Map;f.set(i,o)}else f=Pr,o=f.get(i),o||(o=new Map,f.set(i,o));if(o.has(t))return o;for(o.set(t,null),i=i.getElementsByTagName(t),f=0;f<i.length;f++){var g=i[f];if(!(g[ut]||g[Kt]||t==="link"&&g.getAttribute("rel")==="stylesheet")&&g.namespaceURI!=="http://www.w3.org/2000/svg"){var b=g.getAttribute(a)||"";b=t+b;var S=o.get(b);S?S.push(g):o.set(b,[g])}}return o}function dg(t,a,i){t=t.ownerDocument||t,t.head.insertBefore(i,a==="title"?t.querySelector("head > title"):null)}function dy(t,a,i){if(i===1||a.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof a.precedence!="string"||typeof a.href!="string"||a.href==="")break;return!0;case"link":if(typeof a.rel!="string"||typeof a.href!="string"||a.href===""||a.onLoad||a.onError)break;switch(a.rel){case"stylesheet":return t=a.disabled,typeof a.precedence=="string"&&t==null;default:return!0}case"script":if(a.async&&typeof a.async!="function"&&typeof a.async!="symbol"&&!a.onLoad&&!a.onError&&a.src&&typeof a.src=="string")return!0}return!1}function fg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}var cl=null;function fy(){}function hy(t,a,i){if(cl===null)throw Error(l(475));var o=cl;if(a.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var f=di(i.href),g=t.querySelector(rl(f));if(g){t=g._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(o.count++,o=qr.bind(o),t.then(o,o)),a.state.loading|=4,a.instance=g,Xt(g);return}g=t.ownerDocument||t,i=og(i),(f=_a.get(f))&&Ru(i,f),g=g.createElement("link"),Xt(g);var b=g;b._p=new Promise(function(S,N){b.onload=S,b.onerror=N}),Me(g,"link",i),a.instance=g}o.stylesheets===null&&(o.stylesheets=new Map),o.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(o.count++,a=qr.bind(o),t.addEventListener("load",a),t.addEventListener("error",a))}}function my(){if(cl===null)throw Error(l(475));var t=cl;return t.stylesheets&&t.count===0&&zu(t,t.stylesheets),0<t.count?function(a){var i=setTimeout(function(){if(t.stylesheets&&zu(t,t.stylesheets),t.unsuspend){var o=t.unsuspend;t.unsuspend=null,o()}},6e4);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(i)}}:null}function qr(){if(this.count--,this.count===0){if(this.stylesheets)zu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Yr=null;function zu(t,a){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Yr=new Map,a.forEach(gy,t),Yr=null,qr.call(t))}function gy(t,a){if(!(a.state.loading&4)){var i=Yr.get(t);if(i)var o=i.get(null);else{i=new Map,Yr.set(t,i);for(var f=t.querySelectorAll("link[data-precedence],style[data-precedence]"),g=0;g<f.length;g++){var b=f[g];(b.nodeName==="LINK"||b.getAttribute("media")!=="not all")&&(i.set(b.dataset.precedence,b),o=b)}o&&i.set(null,o)}f=a.instance,b=f.getAttribute("data-precedence"),g=i.get(b)||o,g===o&&i.set(null,f),i.set(b,f),this.count++,o=qr.bind(this),f.addEventListener("load",o),f.addEventListener("error",o),g?g.parentNode.insertBefore(f,g.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(f,t.firstChild)),a.state.loading|=4}}var ul={$$typeof:V,Provider:null,Consumer:null,_currentValue:lt,_currentValue2:lt,_threadCount:0};function py(t,a,i,o,f,g,b,S){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ss(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ss(0),this.hiddenUpdates=ss(null),this.identifierPrefix=o,this.onUncaughtError=f,this.onCaughtError=g,this.onRecoverableError=b,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=S,this.incompleteTransitions=new Map}function hg(t,a,i,o,f,g,b,S,N,H,X,Z){return t=new py(t,a,i,b,S,N,H,Z),a=1,g===!0&&(a|=24),g=la(3,null,null,a),t.current=g,g.stateNode=t,a=pc(),a.refCount++,t.pooledCache=a,a.refCount++,g.memoizedState={element:o,isDehydrated:i,cache:a},vc(g),t}function mg(t){return t?(t=Vn,t):Vn}function gg(t,a,i,o,f,g){f=mg(f),o.context===null?o.context=f:o.pendingContext=f,o=Rs(a),o.payload={element:i},g=g===void 0?null:g,g!==null&&(o.callback=g),i=Os(t,o,a),i!==null&&(da(i,t,a),Pi(i,t,a))}function pg(t,a){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var i=t.retryLane;t.retryLane=i!==0&&i<a?i:a}}function Lu(t,a){pg(t,a),(t=t.alternate)&&pg(t,a)}function xg(t){if(t.tag===13){var a=Yn(t,67108864);a!==null&&da(a,t,67108864),Lu(t,67108864)}}var Vr=!0;function xy(t,a,i,o){var f=B.T;B.T=null;var g=W.p;try{W.p=2,Bu(t,a,i,o)}finally{W.p=g,B.T=f}}function by(t,a,i,o){var f=B.T;B.T=null;var g=W.p;try{W.p=8,Bu(t,a,i,o)}finally{W.p=g,B.T=f}}function Bu(t,a,i,o){if(Vr){var f=Uu(o);if(f===null)wu(t,a,o,Fr,i),yg(t,o);else if(vy(f,t,a,i,o))o.stopPropagation();else if(yg(t,o),a&4&&-1<yy.indexOf(t)){for(;f!==null;){var g=mt(f);if(g!==null)switch(g.tag){case 3:if(g=g.stateNode,g.current.memoizedState.isDehydrated){var b=Pt(g.pendingLanes);if(b!==0){var S=g;for(S.pendingLanes|=2,S.entangledLanes|=2;b;){var N=1<<31-ce(b);S.entanglements[1]|=N,b&=~N}Za(g),(qt&6)===0&&(Tr=ye()+500,sl(0))}}break;case 13:S=Yn(g,2),S!==null&&da(S,g,2),Ar(),Lu(g,2)}if(g=Uu(o),g===null&&wu(t,a,o,Fr,i),g===f)break;f=g}f!==null&&o.stopPropagation()}else wu(t,a,o,null,i)}}function Uu(t){return t=Vo(t),Hu(t)}var Fr=null;function Hu(t){if(Fr=null,t=F(t),t!==null){var a=c(t);if(a===null)t=null;else{var i=a.tag;if(i===13){if(t=u(a),t!==null)return t;t=null}else if(i===3){if(a.stateNode.current.memoizedState.isDehydrated)return a.tag===3?a.stateNode.containerInfo:null;t=null}else a!==t&&(t=null)}}return Fr=t,null}function bg(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ba()){case Ua:return 2;case Nt:return 8;case De:case he:return 32;case ka:return 268435456;default:return 32}default:return 32}}var Pu=!1,$s=null,Qs=null,Zs=null,dl=new Map,fl=new Map,Ks=[],yy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function yg(t,a){switch(t){case"focusin":case"focusout":$s=null;break;case"dragenter":case"dragleave":Qs=null;break;case"mouseover":case"mouseout":Zs=null;break;case"pointerover":case"pointerout":dl.delete(a.pointerId);break;case"gotpointercapture":case"lostpointercapture":fl.delete(a.pointerId)}}function hl(t,a,i,o,f,g){return t===null||t.nativeEvent!==g?(t={blockedOn:a,domEventName:i,eventSystemFlags:o,nativeEvent:g,targetContainers:[f]},a!==null&&(a=mt(a),a!==null&&xg(a)),t):(t.eventSystemFlags|=o,a=t.targetContainers,f!==null&&a.indexOf(f)===-1&&a.push(f),t)}function vy(t,a,i,o,f){switch(a){case"focusin":return $s=hl($s,t,a,i,o,f),!0;case"dragenter":return Qs=hl(Qs,t,a,i,o,f),!0;case"mouseover":return Zs=hl(Zs,t,a,i,o,f),!0;case"pointerover":var g=f.pointerId;return dl.set(g,hl(dl.get(g)||null,t,a,i,o,f)),!0;case"gotpointercapture":return g=f.pointerId,fl.set(g,hl(fl.get(g)||null,t,a,i,o,f)),!0}return!1}function vg(t){var a=F(t.target);if(a!==null){var i=c(a);if(i!==null){if(a=i.tag,a===13){if(a=u(i),a!==null){t.blockedOn=a,Ma(t.priority,function(){if(i.tag===13){var o=ua();o=Ya(o);var f=Yn(i,o);f!==null&&da(f,i,o),Lu(i,o)}});return}}else if(a===3&&i.stateNode.current.memoizedState.isDehydrated){t.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Xr(t){if(t.blockedOn!==null)return!1;for(var a=t.targetContainers;0<a.length;){var i=Uu(t.nativeEvent);if(i===null){i=t.nativeEvent;var o=new i.constructor(i.type,i);Yo=o,i.target.dispatchEvent(o),Yo=null}else return a=mt(i),a!==null&&xg(a),t.blockedOn=i,!1;a.shift()}return!0}function Sg(t,a,i){Xr(t)&&i.delete(a)}function Sy(){Pu=!1,$s!==null&&Xr($s)&&($s=null),Qs!==null&&Xr(Qs)&&(Qs=null),Zs!==null&&Xr(Zs)&&(Zs=null),dl.forEach(Sg),fl.forEach(Sg)}function Gr(t,a){t.blockedOn===a&&(t.blockedOn=null,Pu||(Pu=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,Sy)))}var $r=null;function _g(t){$r!==t&&($r=t,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){$r===t&&($r=null);for(var a=0;a<t.length;a+=3){var i=t[a],o=t[a+1],f=t[a+2];if(typeof o!="function"){if(Hu(o||i)===null)continue;break}var g=mt(i);g!==null&&(t.splice(a,3),a-=3,Hc(g,{pending:!0,data:f,method:i.method,action:o},o,f))}}))}function ml(t){function a(N){return Gr(N,t)}$s!==null&&Gr($s,t),Qs!==null&&Gr(Qs,t),Zs!==null&&Gr(Zs,t),dl.forEach(a),fl.forEach(a);for(var i=0;i<Ks.length;i++){var o=Ks[i];o.blockedOn===t&&(o.blockedOn=null)}for(;0<Ks.length&&(i=Ks[0],i.blockedOn===null);)vg(i),i.blockedOn===null&&Ks.shift();if(i=(t.ownerDocument||t).$$reactFormReplay,i!=null)for(o=0;o<i.length;o+=3){var f=i[o],g=i[o+1],b=f[ge]||null;if(typeof g=="function")b||_g(i);else if(b){var S=null;if(g&&g.hasAttribute("formAction")){if(f=g,b=g[ge]||null)S=b.formAction;else if(Hu(f)!==null)continue}else S=b.action;typeof S=="function"?i[o+1]=S:(i.splice(o,3),o-=3),_g(i)}}}function qu(t){this._internalRoot=t}Qr.prototype.render=qu.prototype.render=function(t){var a=this._internalRoot;if(a===null)throw Error(l(409));var i=a.current,o=ua();gg(i,o,t,a,null,null)},Qr.prototype.unmount=qu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var a=t.containerInfo;gg(t.current,2,null,t,null,null),Ar(),a[we]=null}};function Qr(t){this._internalRoot=t}Qr.prototype.unstable_scheduleHydration=function(t){if(t){var a=Va();t={blockedOn:null,target:t,priority:a};for(var i=0;i<Ks.length&&a!==0&&a<Ks[i].priority;i++);Ks.splice(i,0,t),i===0&&vg(t)}};var jg=e.version;if(jg!=="19.1.1")throw Error(l(527,jg,"19.1.1"));W.findDOMNode=function(t){var a=t._reactInternals;if(a===void 0)throw typeof t.render=="function"?Error(l(188)):(t=Object.keys(t).join(","),Error(l(268,t)));return t=m(a),t=t!==null?p(t):null,t=t===null?null:t.stateNode,t};var _y={bundleType:0,version:"19.1.1",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.1.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Zr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Zr.isDisabled&&Zr.supportsFiber)try{Ge=Zr.inject(_y),It=Zr}catch{}}return pl.createRoot=function(t,a){if(!r(t))throw Error(l(299));var i=!1,o="",f=Hh,g=Ph,b=qh,S=null;return a!=null&&(a.unstable_strictMode===!0&&(i=!0),a.identifierPrefix!==void 0&&(o=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(S=a.unstable_transitionCallbacks)),a=hg(t,1,!1,null,null,i,o,f,g,b,S,null),t[we]=a.current,ju(t),new qu(a)},pl.hydrateRoot=function(t,a,i){if(!r(t))throw Error(l(299));var o=!1,f="",g=Hh,b=Ph,S=qh,N=null,H=null;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(f=i.identifierPrefix),i.onUncaughtError!==void 0&&(g=i.onUncaughtError),i.onCaughtError!==void 0&&(b=i.onCaughtError),i.onRecoverableError!==void 0&&(S=i.onRecoverableError),i.unstable_transitionCallbacks!==void 0&&(N=i.unstable_transitionCallbacks),i.formState!==void 0&&(H=i.formState)),a=hg(t,1,!0,a,i??null,o,f,g,b,S,N,H),a.context=mg(null),i=a.current,o=ua(),o=Ya(o),f=Rs(o),f.callback=null,Os(i,f,o),i=o,a.current.lanes=i,na(a,i),Za(a),t[we]=a.current,ju(t),new Qr(a)},pl.version="19.1.1",pl}var Rg;function Ry(){if(Rg)return Fu.exports;Rg=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Fu.exports=Dy(),Fu.exports}var Oy=Ry();/**
 * react-router v7.9.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Og="popstate";function zy(s={}){function e(l,r){let{pathname:c,search:u,hash:h}=l.location;return cd("",{pathname:c,search:u,hash:h},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(l,r){return typeof r=="string"?r:Cl(r)}return By(e,n,null,s)}function ne(s,e){if(s===!1||s===null||typeof s>"u")throw new Error(e)}function za(s,e){if(!s){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Ly(){return Math.random().toString(36).substring(2,10)}function zg(s,e){return{usr:s.state,key:s.key,idx:e}}function cd(s,e,n=null,l){return{pathname:typeof s=="string"?s:s.pathname,search:"",hash:"",...typeof e=="string"?bi(e):e,state:n,key:e&&e.key||l||Ly()}}function Cl({pathname:s="/",search:e="",hash:n=""}){return e&&e!=="?"&&(s+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(s+=n.charAt(0)==="#"?n:"#"+n),s}function bi(s){let e={};if(s){let n=s.indexOf("#");n>=0&&(e.hash=s.substring(n),s=s.substring(0,n));let l=s.indexOf("?");l>=0&&(e.search=s.substring(l),s=s.substring(0,l)),s&&(e.pathname=s)}return e}function By(s,e,n,l={}){let{window:r=document.defaultView,v5Compat:c=!1}=l,u=r.history,h="POP",m=null,p=x();p==null&&(p=0,u.replaceState({...u.state,idx:p},""));function x(){return(u.state||{idx:null}).idx}function y(){h="POP";let T=x(),M=T==null?null:T-p;p=T,m&&m({action:h,location:E.location,delta:M})}function v(T,M){h="PUSH";let O=cd(E.location,T,M);p=x()+1;let V=zg(O,p),K=E.createHref(O);try{u.pushState(V,"",K)}catch(Y){if(Y instanceof DOMException&&Y.name==="DataCloneError")throw Y;r.location.assign(K)}c&&m&&m({action:h,location:E.location,delta:1})}function _(T,M){h="REPLACE";let O=cd(E.location,T,M);p=x();let V=zg(O,p),K=E.createHref(O);u.replaceState(V,"",K),c&&m&&m({action:h,location:E.location,delta:0})}function w(T){return Uy(T)}let E={get action(){return h},get location(){return s(r,u)},listen(T){if(m)throw new Error("A history only accepts one active listener");return r.addEventListener(Og,y),m=T,()=>{r.removeEventListener(Og,y),m=null}},createHref(T){return e(r,T)},createURL:w,encodeLocation(T){let M=w(T);return{pathname:M.pathname,search:M.search,hash:M.hash}},push:v,replace:_,go(T){return u.go(T)}};return E}function Uy(s,e=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),ne(n,"No window.location.(origin|href) available to create URL");let l=typeof s=="string"?s:Cl(s);return l=l.replace(/ $/,"%20"),!e&&l.startsWith("//")&&(l=n+l),new URL(l,n)}function ex(s,e,n="/"){return Hy(s,e,n,!1)}function Hy(s,e,n,l){let r=typeof e=="string"?bi(e):e,c=Es(r.pathname||"/",n);if(c==null)return null;let u=ax(s);Py(u);let h=null;for(let m=0;h==null&&m<u.length;++m){let p=Wy(c);h=Zy(u[m],p,l)}return h}function ax(s,e=[],n=[],l="",r=!1){let c=(u,h,m=r,p)=>{let x={relativePath:p===void 0?u.path||"":p,caseSensitive:u.caseSensitive===!0,childrenIndex:h,route:u};if(x.relativePath.startsWith("/")){if(!x.relativePath.startsWith(l)&&m)return;ne(x.relativePath.startsWith(l),`Absolute route path "${x.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),x.relativePath=x.relativePath.slice(l.length)}let y=Ns([l,x.relativePath]),v=n.concat(x);u.children&&u.children.length>0&&(ne(u.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${y}".`),ax(u.children,e,v,y,m)),!(u.path==null&&!u.index)&&e.push({path:y,score:$y(y,u.index),routesMeta:v})};return s.forEach((u,h)=>{if(u.path===""||!u.path?.includes("?"))c(u,h);else for(let m of sx(u.path))c(u,h,!0,m)}),e}function sx(s){let e=s.split("/");if(e.length===0)return[];let[n,...l]=e,r=n.endsWith("?"),c=n.replace(/\?$/,"");if(l.length===0)return r?[c,""]:[c];let u=sx(l.join("/")),h=[];return h.push(...u.map(m=>m===""?c:[c,m].join("/"))),r&&h.push(...u),h.map(m=>s.startsWith("/")&&m===""?"/":m)}function Py(s){s.sort((e,n)=>e.score!==n.score?n.score-e.score:Qy(e.routesMeta.map(l=>l.childrenIndex),n.routesMeta.map(l=>l.childrenIndex)))}var qy=/^:[\w-]+$/,Yy=3,Vy=2,Fy=1,Xy=10,Gy=-2,Lg=s=>s==="*";function $y(s,e){let n=s.split("/"),l=n.length;return n.some(Lg)&&(l+=Gy),e&&(l+=Vy),n.filter(r=>!Lg(r)).reduce((r,c)=>r+(qy.test(c)?Yy:c===""?Fy:Xy),l)}function Qy(s,e){return s.length===e.length&&s.slice(0,-1).every((l,r)=>l===e[r])?s[s.length-1]-e[e.length-1]:0}function Zy(s,e,n=!1){let{routesMeta:l}=s,r={},c="/",u=[];for(let h=0;h<l.length;++h){let m=l[h],p=h===l.length-1,x=c==="/"?e:e.slice(c.length)||"/",y=po({path:m.relativePath,caseSensitive:m.caseSensitive,end:p},x),v=m.route;if(!y&&p&&n&&!l[l.length-1].route.index&&(y=po({path:m.relativePath,caseSensitive:m.caseSensitive,end:!1},x)),!y)return null;Object.assign(r,y.params),u.push({params:r,pathname:Ns([c,y.pathname]),pathnameBase:ev(Ns([c,y.pathnameBase])),route:v}),y.pathnameBase!=="/"&&(c=Ns([c,y.pathnameBase]))}return u}function po(s,e){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[n,l]=Ky(s.path,s.caseSensitive,s.end),r=e.match(n);if(!r)return null;let c=r[0],u=c.replace(/(.)\/+$/,"$1"),h=r.slice(1);return{params:l.reduce((p,{paramName:x,isOptional:y},v)=>{if(x==="*"){let w=h[v]||"";u=c.slice(0,c.length-w.length).replace(/(.)\/+$/,"$1")}const _=h[v];return y&&!_?p[x]=void 0:p[x]=(_||"").replace(/%2F/g,"/"),p},{}),pathname:c,pathnameBase:u,pattern:s}}function Ky(s,e=!1,n=!0){za(s==="*"||!s.endsWith("*")||s.endsWith("/*"),`Route path "${s}" will be treated as if it were "${s.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(/\*$/,"/*")}".`);let l=[],r="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,h,m)=>(l.push({paramName:h,isOptional:m!=null}),m?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return s.endsWith("*")?(l.push({paramName:"*"}),r+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":s!==""&&s!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),l]}function Wy(s){try{return s.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return za(!1,`The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),s}}function Es(s,e){if(e==="/")return s;if(!s.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,l=s.charAt(n);return l&&l!=="/"?null:s.slice(n)||"/"}function Jy(s,e="/"){let{pathname:n,search:l="",hash:r=""}=typeof s=="string"?bi(s):s;return{pathname:n?n.startsWith("/")?n:Iy(n,e):e,search:av(l),hash:sv(r)}}function Iy(s,e){let n=e.replace(/\/+$/,"").split("/");return s.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Qu(s,e,n,l){return`Cannot include a '${s}' character in a manually specified \`to.${e}\` field [${JSON.stringify(l)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function tv(s){return s.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function bd(s){let e=tv(s);return e.map((n,l)=>l===e.length-1?n.pathname:n.pathnameBase)}function yd(s,e,n,l=!1){let r;typeof s=="string"?r=bi(s):(r={...s},ne(!r.pathname||!r.pathname.includes("?"),Qu("?","pathname","search",r)),ne(!r.pathname||!r.pathname.includes("#"),Qu("#","pathname","hash",r)),ne(!r.search||!r.search.includes("#"),Qu("#","search","hash",r)));let c=s===""||r.pathname==="",u=c?"/":r.pathname,h;if(u==null)h=n;else{let y=e.length-1;if(!l&&u.startsWith("..")){let v=u.split("/");for(;v[0]==="..";)v.shift(),y-=1;r.pathname=v.join("/")}h=y>=0?e[y]:"/"}let m=Jy(r,h),p=u&&u!=="/"&&u.endsWith("/"),x=(c||u===".")&&n.endsWith("/");return!m.pathname.endsWith("/")&&(p||x)&&(m.pathname+="/"),m}var Ns=s=>s.join("/").replace(/\/\/+/g,"/"),ev=s=>s.replace(/\/+$/,"").replace(/^\/*/,"/"),av=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,sv=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s;function nv(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}var nx=["POST","PUT","PATCH","DELETE"];new Set(nx);var iv=["GET",...nx];new Set(iv);var yi=j.createContext(null);yi.displayName="DataRouter";var Eo=j.createContext(null);Eo.displayName="DataRouterState";j.createContext(!1);var ix=j.createContext({isTransitioning:!1});ix.displayName="ViewTransition";var lv=j.createContext(new Map);lv.displayName="Fetchers";var rv=j.createContext(null);rv.displayName="Await";var La=j.createContext(null);La.displayName="Navigation";var Ll=j.createContext(null);Ll.displayName="Location";var as=j.createContext({outlet:null,matches:[],isDataRoute:!1});as.displayName="Route";var vd=j.createContext(null);vd.displayName="RouteError";function ov(s,{relative:e}={}){ne(vi(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:l}=j.useContext(La),{hash:r,pathname:c,search:u}=Bl(s,{relative:e}),h=c;return n!=="/"&&(h=c==="/"?n:Ns([n,c])),l.createHref({pathname:h,search:u,hash:r})}function vi(){return j.useContext(Ll)!=null}function ln(){return ne(vi(),"useLocation() may be used only in the context of a <Router> component."),j.useContext(Ll).location}var lx="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function rx(s){j.useContext(La).static||j.useLayoutEffect(s)}function To(){let{isDataRoute:s}=j.useContext(as);return s?Sv():cv()}function cv(){ne(vi(),"useNavigate() may be used only in the context of a <Router> component.");let s=j.useContext(yi),{basename:e,navigator:n}=j.useContext(La),{matches:l}=j.useContext(as),{pathname:r}=ln(),c=JSON.stringify(bd(l)),u=j.useRef(!1);return rx(()=>{u.current=!0}),j.useCallback((m,p={})=>{if(za(u.current,lx),!u.current)return;if(typeof m=="number"){n.go(m);return}let x=yd(m,JSON.parse(c),r,p.relative==="path");s==null&&e!=="/"&&(x.pathname=x.pathname==="/"?e:Ns([e,x.pathname])),(p.replace?n.replace:n.push)(x,p.state,p)},[e,n,c,r,s])}j.createContext(null);function Bl(s,{relative:e}={}){let{matches:n}=j.useContext(as),{pathname:l}=ln(),r=JSON.stringify(bd(n));return j.useMemo(()=>yd(s,JSON.parse(r),l,e==="path"),[s,r,l,e])}function uv(s,e){return ox(s,e)}function ox(s,e,n,l,r){ne(vi(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:c}=j.useContext(La),{matches:u}=j.useContext(as),h=u[u.length-1],m=h?h.params:{},p=h?h.pathname:"/",x=h?h.pathnameBase:"/",y=h&&h.route;{let O=y&&y.path||"";cx(p,!y||O.endsWith("*")||O.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${O}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${O}"> to <Route path="${O==="/"?"*":`${O}/*`}">.`)}let v=ln(),_;if(e){let O=typeof e=="string"?bi(e):e;ne(x==="/"||O.pathname?.startsWith(x),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${x}" but pathname "${O.pathname}" was given in the \`location\` prop.`),_=O}else _=v;let w=_.pathname||"/",E=w;if(x!=="/"){let O=x.replace(/^\//,"").split("/");E="/"+w.replace(/^\//,"").split("/").slice(O.length).join("/")}let T=ex(s,{pathname:E});za(y||T!=null,`No routes matched location "${_.pathname}${_.search}${_.hash}" `),za(T==null||T[T.length-1].route.element!==void 0||T[T.length-1].route.Component!==void 0||T[T.length-1].route.lazy!==void 0,`Matched leaf route at location "${_.pathname}${_.search}${_.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let M=gv(T&&T.map(O=>Object.assign({},O,{params:Object.assign({},m,O.params),pathname:Ns([x,c.encodeLocation?c.encodeLocation(O.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:O.pathname]),pathnameBase:O.pathnameBase==="/"?x:Ns([x,c.encodeLocation?c.encodeLocation(O.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:O.pathnameBase])})),u,n,l,r);return e&&M?j.createElement(Ll.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",..._},navigationType:"POP"}},M):M}function dv(){let s=vv(),e=nv(s)?`${s.status} ${s.statusText}`:s instanceof Error?s.message:JSON.stringify(s),n=s instanceof Error?s.stack:null,l="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:l},c={padding:"2px 4px",backgroundColor:l},u=null;return console.error("Error handled by React Router default ErrorBoundary:",s),u=j.createElement(j.Fragment,null,j.createElement("p",null,"💿 Hey developer 👋"),j.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",j.createElement("code",{style:c},"ErrorBoundary")," or"," ",j.createElement("code",{style:c},"errorElement")," prop on your route.")),j.createElement(j.Fragment,null,j.createElement("h2",null,"Unexpected Application Error!"),j.createElement("h3",{style:{fontStyle:"italic"}},e),n?j.createElement("pre",{style:r},n):null,u)}var fv=j.createElement(dv,null),hv=class extends j.Component{constructor(s){super(s),this.state={location:s.location,revalidation:s.revalidation,error:s.error}}static getDerivedStateFromError(s){return{error:s}}static getDerivedStateFromProps(s,e){return e.location!==s.location||e.revalidation!=="idle"&&s.revalidation==="idle"?{error:s.error,location:s.location,revalidation:s.revalidation}:{error:s.error!==void 0?s.error:e.error,location:e.location,revalidation:s.revalidation||e.revalidation}}componentDidCatch(s,e){this.props.unstable_onError?this.props.unstable_onError(s,e):console.error("React Router caught the following error during render",s)}render(){return this.state.error!==void 0?j.createElement(as.Provider,{value:this.props.routeContext},j.createElement(vd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function mv({routeContext:s,match:e,children:n}){let l=j.useContext(yi);return l&&l.static&&l.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=e.route.id),j.createElement(as.Provider,{value:s},n)}function gv(s,e=[],n=null,l=null,r=null){if(s==null){if(!n)return null;if(n.errors)s=n.matches;else if(e.length===0&&!n.initialized&&n.matches.length>0)s=n.matches;else return null}let c=s,u=n?.errors;if(u!=null){let p=c.findIndex(x=>x.route.id&&u?.[x.route.id]!==void 0);ne(p>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),c=c.slice(0,Math.min(c.length,p+1))}let h=!1,m=-1;if(n)for(let p=0;p<c.length;p++){let x=c[p];if((x.route.HydrateFallback||x.route.hydrateFallbackElement)&&(m=p),x.route.id){let{loaderData:y,errors:v}=n,_=x.route.loader&&!y.hasOwnProperty(x.route.id)&&(!v||v[x.route.id]===void 0);if(x.route.lazy||_){h=!0,m>=0?c=c.slice(0,m+1):c=[c[0]];break}}}return c.reduceRight((p,x,y)=>{let v,_=!1,w=null,E=null;n&&(v=u&&x.route.id?u[x.route.id]:void 0,w=x.route.errorElement||fv,h&&(m<0&&y===0?(cx("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),_=!0,E=null):m===y&&(_=!0,E=x.route.hydrateFallbackElement||null)));let T=e.concat(c.slice(0,y+1)),M=()=>{let O;return v?O=w:_?O=E:x.route.Component?O=j.createElement(x.route.Component,null):x.route.element?O=x.route.element:O=p,j.createElement(mv,{match:x,routeContext:{outlet:p,matches:T,isDataRoute:n!=null},children:O})};return n&&(x.route.ErrorBoundary||x.route.errorElement||y===0)?j.createElement(hv,{location:n.location,revalidation:n.revalidation,component:w,error:v,children:M(),routeContext:{outlet:null,matches:T,isDataRoute:!0},unstable_onError:l}):M()},null)}function Sd(s){return`${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function pv(s){let e=j.useContext(yi);return ne(e,Sd(s)),e}function xv(s){let e=j.useContext(Eo);return ne(e,Sd(s)),e}function bv(s){let e=j.useContext(as);return ne(e,Sd(s)),e}function _d(s){let e=bv(s),n=e.matches[e.matches.length-1];return ne(n.route.id,`${s} can only be used on routes that contain a unique "id"`),n.route.id}function yv(){return _d("useRouteId")}function vv(){let s=j.useContext(vd),e=xv("useRouteError"),n=_d("useRouteError");return s!==void 0?s:e.errors?.[n]}function Sv(){let{router:s}=pv("useNavigate"),e=_d("useNavigate"),n=j.useRef(!1);return rx(()=>{n.current=!0}),j.useCallback(async(r,c={})=>{za(n.current,lx),n.current&&(typeof r=="number"?s.navigate(r):await s.navigate(r,{fromRouteId:e,...c}))},[s,e])}var Bg={};function cx(s,e,n){!e&&!Bg[s]&&(Bg[s]=!0,za(!1,n))}j.memo(_v);function _v({routes:s,future:e,state:n,unstable_onError:l}){return ox(s,void 0,n,l,e)}function Ts({to:s,replace:e,state:n,relative:l}){ne(vi(),"<Navigate> may be used only in the context of a <Router> component.");let{static:r}=j.useContext(La);za(!r,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:c}=j.useContext(as),{pathname:u}=ln(),h=To(),m=yd(s,bd(c),u,l==="path"),p=JSON.stringify(m);return j.useEffect(()=>{h(JSON.parse(p),{replace:e,state:n,relative:l})},[h,p,l,e,n]),null}function Ss(s){ne(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function jv({basename:s="/",children:e=null,location:n,navigationType:l="POP",navigator:r,static:c=!1}){ne(!vi(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let u=s.replace(/^\/*/,"/"),h=j.useMemo(()=>({basename:u,navigator:r,static:c,future:{}}),[u,r,c]);typeof n=="string"&&(n=bi(n));let{pathname:m="/",search:p="",hash:x="",state:y=null,key:v="default"}=n,_=j.useMemo(()=>{let w=Es(m,u);return w==null?null:{location:{pathname:w,search:p,hash:x,state:y,key:v},navigationType:l}},[u,m,p,x,y,v,l]);return za(_!=null,`<Router basename="${u}"> is not able to match the URL "${m}${p}${x}" because it does not start with the basename, so the <Router> won't render anything.`),_==null?null:j.createElement(La.Provider,{value:h},j.createElement(Ll.Provider,{children:e,value:_}))}function wv({children:s,location:e}){return uv(ud(s),e)}function ud(s,e=[]){let n=[];return j.Children.forEach(s,(l,r)=>{if(!j.isValidElement(l))return;let c=[...e,r];if(l.type===j.Fragment){n.push.apply(n,ud(l.props.children,c));return}ne(l.type===Ss,`[${typeof l.type=="string"?l.type:l.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),ne(!l.props.index||!l.props.children,"An index route cannot have child routes.");let u={id:l.props.id||c.join("-"),caseSensitive:l.props.caseSensitive,element:l.props.element,Component:l.props.Component,index:l.props.index,path:l.props.path,middleware:l.props.middleware,loader:l.props.loader,action:l.props.action,hydrateFallbackElement:l.props.hydrateFallbackElement,HydrateFallback:l.props.HydrateFallback,errorElement:l.props.errorElement,ErrorBoundary:l.props.ErrorBoundary,hasErrorBoundary:l.props.hasErrorBoundary===!0||l.props.ErrorBoundary!=null||l.props.errorElement!=null,shouldRevalidate:l.props.shouldRevalidate,handle:l.props.handle,lazy:l.props.lazy};l.props.children&&(u.children=ud(l.props.children,c)),n.push(u)}),n}var uo="get",fo="application/x-www-form-urlencoded";function ko(s){return s!=null&&typeof s.tagName=="string"}function Nv(s){return ko(s)&&s.tagName.toLowerCase()==="button"}function Ev(s){return ko(s)&&s.tagName.toLowerCase()==="form"}function Tv(s){return ko(s)&&s.tagName.toLowerCase()==="input"}function kv(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function Av(s,e){return s.button===0&&(!e||e==="_self")&&!kv(s)}var Kr=null;function Cv(){if(Kr===null)try{new FormData(document.createElement("form"),0),Kr=!1}catch{Kr=!0}return Kr}var Mv=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Zu(s){return s!=null&&!Mv.has(s)?(za(!1,`"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${fo}"`),null):s}function Dv(s,e){let n,l,r,c,u;if(Ev(s)){let h=s.getAttribute("action");l=h?Es(h,e):null,n=s.getAttribute("method")||uo,r=Zu(s.getAttribute("enctype"))||fo,c=new FormData(s)}else if(Nv(s)||Tv(s)&&(s.type==="submit"||s.type==="image")){let h=s.form;if(h==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let m=s.getAttribute("formaction")||h.getAttribute("action");if(l=m?Es(m,e):null,n=s.getAttribute("formmethod")||h.getAttribute("method")||uo,r=Zu(s.getAttribute("formenctype"))||Zu(h.getAttribute("enctype"))||fo,c=new FormData(h,s),!Cv()){let{name:p,type:x,value:y}=s;if(x==="image"){let v=p?`${p}.`:"";c.append(`${v}x`,"0"),c.append(`${v}y`,"0")}else p&&c.append(p,y)}}else{if(ko(s))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=uo,l=null,r=fo,u=s}return c&&r==="text/plain"&&(u=c,c=void 0),{action:l,method:n.toLowerCase(),encType:r,formData:c,body:u}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function jd(s,e){if(s===!1||s===null||typeof s>"u")throw new Error(e)}function Rv(s,e,n){let l=typeof s=="string"?new URL(s,typeof window>"u"?"server://singlefetch/":window.location.origin):s;return l.pathname==="/"?l.pathname=`_root.${n}`:e&&Es(l.pathname,e)==="/"?l.pathname=`${e.replace(/\/$/,"")}/_root.${n}`:l.pathname=`${l.pathname.replace(/\/$/,"")}.${n}`,l}async function Ov(s,e){if(s.id in e)return e[s.id];try{let n=await import(s.module);return e[s.id]=n,n}catch(n){return console.error(`Error loading route module \`${s.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function zv(s){return s==null?!1:s.href==null?s.rel==="preload"&&typeof s.imageSrcSet=="string"&&typeof s.imageSizes=="string":typeof s.rel=="string"&&typeof s.href=="string"}async function Lv(s,e,n){let l=await Promise.all(s.map(async r=>{let c=e.routes[r.route.id];if(c){let u=await Ov(c,n);return u.links?u.links():[]}return[]}));return Pv(l.flat(1).filter(zv).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function Ug(s,e,n,l,r,c){let u=(m,p)=>n[p]?m.route.id!==n[p].route.id:!0,h=(m,p)=>n[p].pathname!==m.pathname||n[p].route.path?.endsWith("*")&&n[p].params["*"]!==m.params["*"];return c==="assets"?e.filter((m,p)=>u(m,p)||h(m,p)):c==="data"?e.filter((m,p)=>{let x=l.routes[m.route.id];if(!x||!x.hasLoader)return!1;if(u(m,p)||h(m,p))return!0;if(m.route.shouldRevalidate){let y=m.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(s,window.origin),nextParams:m.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function Bv(s,e,{includeHydrateFallback:n}={}){return Uv(s.map(l=>{let r=e.routes[l.route.id];if(!r)return[];let c=[r.module];return r.clientActionModule&&(c=c.concat(r.clientActionModule)),r.clientLoaderModule&&(c=c.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(c=c.concat(r.hydrateFallbackModule)),r.imports&&(c=c.concat(r.imports)),c}).flat(1))}function Uv(s){return[...new Set(s)]}function Hv(s){let e={},n=Object.keys(s).sort();for(let l of n)e[l]=s[l];return e}function Pv(s,e){let n=new Set;return new Set(e),s.reduce((l,r)=>{let c=JSON.stringify(Hv(r));return n.has(c)||(n.add(c),l.push({key:c,link:r})),l},[])}function ux(){let s=j.useContext(yi);return jd(s,"You must render this element inside a <DataRouterContext.Provider> element"),s}function qv(){let s=j.useContext(Eo);return jd(s,"You must render this element inside a <DataRouterStateContext.Provider> element"),s}var wd=j.createContext(void 0);wd.displayName="FrameworkContext";function dx(){let s=j.useContext(wd);return jd(s,"You must render this element inside a <HydratedRouter> element"),s}function Yv(s,e){let n=j.useContext(wd),[l,r]=j.useState(!1),[c,u]=j.useState(!1),{onFocus:h,onBlur:m,onMouseEnter:p,onMouseLeave:x,onTouchStart:y}=e,v=j.useRef(null);j.useEffect(()=>{if(s==="render"&&u(!0),s==="viewport"){let E=M=>{M.forEach(O=>{u(O.isIntersecting)})},T=new IntersectionObserver(E,{threshold:.5});return v.current&&T.observe(v.current),()=>{T.disconnect()}}},[s]),j.useEffect(()=>{if(l){let E=setTimeout(()=>{u(!0)},100);return()=>{clearTimeout(E)}}},[l]);let _=()=>{r(!0)},w=()=>{r(!1),u(!1)};return n?s!=="intent"?[c,v,{}]:[c,v,{onFocus:xl(h,_),onBlur:xl(m,w),onMouseEnter:xl(p,_),onMouseLeave:xl(x,w),onTouchStart:xl(y,_)}]:[!1,v,{}]}function xl(s,e){return n=>{s&&s(n),n.defaultPrevented||e(n)}}function Vv({page:s,...e}){let{router:n}=ux(),l=j.useMemo(()=>ex(n.routes,s,n.basename),[n.routes,s,n.basename]);return l?j.createElement(Xv,{page:s,matches:l,...e}):null}function Fv(s){let{manifest:e,routeModules:n}=dx(),[l,r]=j.useState([]);return j.useEffect(()=>{let c=!1;return Lv(s,e,n).then(u=>{c||r(u)}),()=>{c=!0}},[s,e,n]),l}function Xv({page:s,matches:e,...n}){let l=ln(),{manifest:r,routeModules:c}=dx(),{basename:u}=ux(),{loaderData:h,matches:m}=qv(),p=j.useMemo(()=>Ug(s,e,m,r,l,"data"),[s,e,m,r,l]),x=j.useMemo(()=>Ug(s,e,m,r,l,"assets"),[s,e,m,r,l]),y=j.useMemo(()=>{if(s===l.pathname+l.search+l.hash)return[];let w=new Set,E=!1;if(e.forEach(M=>{let O=r.routes[M.route.id];!O||!O.hasLoader||(!p.some(V=>V.route.id===M.route.id)&&M.route.id in h&&c[M.route.id]?.shouldRevalidate||O.hasClientLoader?E=!0:w.add(M.route.id))}),w.size===0)return[];let T=Rv(s,u,"data");return E&&w.size>0&&T.searchParams.set("_routes",e.filter(M=>w.has(M.route.id)).map(M=>M.route.id).join(",")),[T.pathname+T.search]},[u,h,l,r,p,e,s,c]),v=j.useMemo(()=>Bv(x,r),[x,r]),_=Fv(x);return j.createElement(j.Fragment,null,y.map(w=>j.createElement("link",{key:w,rel:"prefetch",as:"fetch",href:w,...n})),v.map(w=>j.createElement("link",{key:w,rel:"modulepreload",href:w,...n})),_.map(({key:w,link:E})=>j.createElement("link",{key:w,nonce:n.nonce,...E})))}function Gv(...s){return e=>{s.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var fx=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{fx&&(window.__reactRouterVersion="7.9.4")}catch{}function $v({basename:s,children:e,window:n}){let l=j.useRef();l.current==null&&(l.current=zy({window:n,v5Compat:!0}));let r=l.current,[c,u]=j.useState({action:r.action,location:r.location}),h=j.useCallback(m=>{j.startTransition(()=>u(m))},[u]);return j.useLayoutEffect(()=>r.listen(h),[r,h]),j.createElement(jv,{basename:s,children:e,location:c.location,navigationType:c.action,navigator:r})}var hx=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,mx=j.forwardRef(function({onClick:e,discover:n="render",prefetch:l="none",relative:r,reloadDocument:c,replace:u,state:h,target:m,to:p,preventScrollReset:x,viewTransition:y,...v},_){let{basename:w}=j.useContext(La),E=typeof p=="string"&&hx.test(p),T,M=!1;if(typeof p=="string"&&E&&(T=p,fx))try{let it=new URL(window.location.href),ft=p.startsWith("//")?new URL(it.protocol+p):new URL(p),nt=Es(ft.pathname,w);ft.origin===it.origin&&nt!=null?p=nt+ft.search+ft.hash:M=!0}catch{za(!1,`<Link to="${p}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let O=ov(p,{relative:r}),[V,K,Y]=Yv(l,v),st=Wv(p,{replace:u,state:h,target:m,preventScrollReset:x,relative:r,viewTransition:y});function tt(it){e&&e(it),it.defaultPrevented||st(it)}let at=j.createElement("a",{...v,...Y,href:T||O,onClick:M||c?e:tt,ref:Gv(_,K),target:m,"data-discover":!E&&n==="render"?"true":void 0});return V&&!E?j.createElement(j.Fragment,null,at,j.createElement(Vv,{page:O})):at});mx.displayName="Link";var Qv=j.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:l="",end:r=!1,style:c,to:u,viewTransition:h,children:m,...p},x){let y=Bl(u,{relative:p.relative}),v=ln(),_=j.useContext(Eo),{navigator:w,basename:E}=j.useContext(La),T=_!=null&&a1(y)&&h===!0,M=w.encodeLocation?w.encodeLocation(y).pathname:y.pathname,O=v.pathname,V=_&&_.navigation&&_.navigation.location?_.navigation.location.pathname:null;n||(O=O.toLowerCase(),V=V?V.toLowerCase():null,M=M.toLowerCase()),V&&E&&(V=Es(V,E)||V);const K=M!=="/"&&M.endsWith("/")?M.length-1:M.length;let Y=O===M||!r&&O.startsWith(M)&&O.charAt(K)==="/",st=V!=null&&(V===M||!r&&V.startsWith(M)&&V.charAt(M.length)==="/"),tt={isActive:Y,isPending:st,isTransitioning:T},at=Y?e:void 0,it;typeof l=="function"?it=l(tt):it=[l,Y?"active":null,st?"pending":null,T?"transitioning":null].filter(Boolean).join(" ");let ft=typeof c=="function"?c(tt):c;return j.createElement(mx,{...p,"aria-current":at,className:it,ref:x,style:ft,to:u,viewTransition:h},typeof m=="function"?m(tt):m)});Qv.displayName="NavLink";var Zv=j.forwardRef(({discover:s="render",fetcherKey:e,navigate:n,reloadDocument:l,replace:r,state:c,method:u=uo,action:h,onSubmit:m,relative:p,preventScrollReset:x,viewTransition:y,...v},_)=>{let w=t1(),E=e1(h,{relative:p}),T=u.toLowerCase()==="get"?"get":"post",M=typeof h=="string"&&hx.test(h),O=V=>{if(m&&m(V),V.defaultPrevented)return;V.preventDefault();let K=V.nativeEvent.submitter,Y=K?.getAttribute("formmethod")||u;w(K||V.currentTarget,{fetcherKey:e,method:Y,navigate:n,replace:r,state:c,relative:p,preventScrollReset:x,viewTransition:y})};return j.createElement("form",{ref:_,method:T,action:E,onSubmit:l?m:O,...v,"data-discover":!M&&s==="render"?"true":void 0})});Zv.displayName="Form";function Kv(s){return`${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function gx(s){let e=j.useContext(yi);return ne(e,Kv(s)),e}function Wv(s,{target:e,replace:n,state:l,preventScrollReset:r,relative:c,viewTransition:u}={}){let h=To(),m=ln(),p=Bl(s,{relative:c});return j.useCallback(x=>{if(Av(x,e)){x.preventDefault();let y=n!==void 0?n:Cl(m)===Cl(p);h(s,{replace:y,state:l,preventScrollReset:r,relative:c,viewTransition:u})}},[m,h,p,n,l,e,s,r,c,u])}var Jv=0,Iv=()=>`__${String(++Jv)}__`;function t1(){let{router:s}=gx("useSubmit"),{basename:e}=j.useContext(La),n=yv();return j.useCallback(async(l,r={})=>{let{action:c,method:u,encType:h,formData:m,body:p}=Dv(l,e);if(r.navigate===!1){let x=r.fetcherKey||Iv();await s.fetch(x,n,r.action||c,{preventScrollReset:r.preventScrollReset,formData:m,body:p,formMethod:r.method||u,formEncType:r.encType||h,flushSync:r.flushSync})}else await s.navigate(r.action||c,{preventScrollReset:r.preventScrollReset,formData:m,body:p,formMethod:r.method||u,formEncType:r.encType||h,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[s,e,n])}function e1(s,{relative:e}={}){let{basename:n}=j.useContext(La),l=j.useContext(as);ne(l,"useFormAction must be used inside a RouteContext");let[r]=l.matches.slice(-1),c={...Bl(s||".",{relative:e})},u=ln();if(s==null){c.search=u.search;let h=new URLSearchParams(c.search),m=h.getAll("index");if(m.some(x=>x==="")){h.delete("index"),m.filter(y=>y).forEach(y=>h.append("index",y));let x=h.toString();c.search=x?`?${x}`:""}}return(!s||s===".")&&r.route.index&&(c.search=c.search?c.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(c.pathname=c.pathname==="/"?n:Ns([n,c.pathname])),Cl(c)}function a1(s,{relative:e}={}){let n=j.useContext(ix);ne(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:l}=gx("useViewTransitionState"),r=Bl(s,{relative:e});if(!n.isTransitioning)return!1;let c=Es(n.currentLocation.pathname,l)||n.currentLocation.pathname,u=Es(n.nextLocation.pathname,l)||n.nextLocation.pathname;return po(r.pathname,u)!=null||po(r.pathname,c)!=null}const px="http://localhost:3001/api",pt=async(s,e={})=>{const n=`${px}${s}`,l={headers:{"Content-Type":"application/json",...e.headers},...e},r=localStorage.getItem("token");r&&!l.headers.Authorization&&(l.headers.Authorization=`Bearer ${r}`);try{const c=await fetch(n,l),u=await c.json();if(!c.ok)throw new Error(u.message||`Erro ${c.status}: ${c.statusText}`);return u}catch(c){throw console.error("Erro na requisição:",c.message),c}},fa={getSchools:async(s="active",e=1,n=100)=>pt(`/schools?status=${s}&page=${e}&limit=${n}`,{method:"GET"}),login:async(s,e)=>pt("/auth/login",{method:"POST",body:JSON.stringify({email:s,password:e})}),register:async s=>pt("/auth/register",{method:"POST",body:JSON.stringify(s)}),getUserInfo:async()=>pt("/auth/me"),getAccessInfo:async()=>pt("/auth/access-info"),updateProfile:async s=>{if(s instanceof FormData){const e={method:"PUT",body:s},n=localStorage.getItem("token");n&&(e.headers={Authorization:`Bearer ${n}`});try{const l=`${px}/auth/profile`,r=await fetch(l,e),c=await r.json();if(!r.ok)throw new Error(c.message||`Erro ${r.status}: ${r.statusText}`);return c}catch(l){throw console.error("Erro na requisição:",l.message),l}}else return pt("/auth/profile",{method:"PUT",body:JSON.stringify(s)})},logout:async()=>{const s=localStorage.getItem("refreshToken");if(s)try{await pt("/auth/logout",{method:"POST",body:JSON.stringify({refresh_token:s})})}catch(e){console.error("Erro ao fazer logout:",e)}localStorage.removeItem("token"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user")},forgotPassword:async s=>pt("/auth/forgot-password",{method:"POST",body:JSON.stringify({email:s})}),resetPassword:async(s,e)=>pt("/auth/reset-password",{method:"POST",body:JSON.stringify({token:s,password:e})}),changePassword:async(s,e)=>pt("/auth/change-password",{method:"PUT",body:JSON.stringify({currentPassword:s,newPassword:e})}),refreshToken:async()=>{const s=localStorage.getItem("refreshToken");if(!s)throw new Error("Nenhum refresh token disponível");const e=await pt("/auth/refresh",{method:"POST",body:JSON.stringify({refresh_token:s})});return localStorage.setItem("token",e.data.access_token),e.data.access_token}},Hg={getReports:async(s={})=>{const e=new URLSearchParams(s);return pt(`/reports?${e}`,{method:"GET"})},getReportById:async s=>pt(`/reports/${s}`,{method:"GET"}),generateStudentReport:async(s,e)=>pt(`/reports/generate/student/${s}`,{method:"POST",body:JSON.stringify(e)}),getStudentReports:async s=>pt(`/reports/student/${s}`,{method:"GET"})},bl={createUser:async s=>pt("/users",{method:"POST",body:JSON.stringify(s)}),getUsers:async(s={})=>{const e=new URLSearchParams(s);return pt(`/users?${e}`,{method:"GET"})},getUserById:async s=>pt(`/users/${s}`,{method:"GET"}),updateUser:async(s,e)=>pt(`/users/${s}`,{method:"PUT",body:JSON.stringify(e)}),deleteUser:async s=>pt(`/users/${s}`,{method:"DELETE"})},Je={startSession:async s=>pt("/pomodoro/sessions",{method:"POST",body:JSON.stringify(s)}),getSessions:async(s={})=>{const e=new URLSearchParams(s);return pt(`/pomodoro/sessions?${e}`,{method:"GET"})},getActiveSession:async()=>pt("/pomodoro/sessions/active",{method:"GET"}),getSessionById:async s=>pt(`/pomodoro/sessions/${s}`,{method:"GET"}),pauseSession:async s=>pt(`/pomodoro/sessions/${s}/pause`,{method:"PUT"}),resumeSession:async s=>pt(`/pomodoro/sessions/${s}/resume`,{method:"PUT"}),completeSession:async(s,e={})=>pt(`/pomodoro/sessions/${s}/complete`,{method:"PUT",body:JSON.stringify({feedback:e})}),abandonSession:async s=>pt(`/pomodoro/sessions/${s}/abandon`,{method:"PUT"}),getStats:async()=>pt("/pomodoro/stats",{method:"GET"})},Ie={getTasks:async(s={})=>{const e=new URLSearchParams(s);return pt(`/tasks?${e}`,{method:"GET"})},getTasksByClass:async s=>pt(`/tasks/class/${s}`,{method:"GET"}),getTasksByTeacher:async s=>pt(`/tasks/teacher/${s}`,{method:"GET"}),createTask:async s=>pt("/tasks",{method:"POST",body:JSON.stringify(s)}),getTaskById:async s=>pt(`/tasks/${s}`,{method:"GET"}),updateTask:async(s,e)=>pt(`/tasks/${s}`,{method:"PUT",body:JSON.stringify(e)}),updateTaskStatus:async(s,e)=>pt(`/tasks/${s}/status`,{method:"PUT",body:JSON.stringify({status:e})}),archiveTask:async s=>pt(`/tasks/${s}`,{method:"DELETE"})},ts={getFlashcards:async()=>pt("/flashcards",{method:"GET"}),getFlashcardStatsByUser:async s=>pt(`/flashcards/stats/user/${s}`,{method:"GET"}),getFlashcardStatsByClass:async s=>pt(`/flashcards/stats/class/${s}`,{method:"GET"}),getAggregateFlashcardStats:async(s={})=>{const e=new URLSearchParams(s);return pt(`/flashcards/stats/aggregate?${e}`,{method:"GET"})},createFlashcard:async s=>pt("/flashcards",{method:"POST",body:JSON.stringify(s)}),getFlashcardById:async s=>pt(`/flashcards/${s}`,{method:"GET"}),updateFlashcard:async(s,e)=>pt(`/flashcards/${s}`,{method:"PUT",body:JSON.stringify(e)}),deleteFlashcard:async s=>pt(`/flashcards/${s}`,{method:"DELETE"}),getFlashcardsByTeacher:async s=>pt(`/flashcards/teacher/${s}`,{method:"GET"}),getFlashcardsByClass:async s=>pt(`/flashcards/class/${s}`,{method:"GET"})},Ku={getClasses:async(s={})=>{const e=new URLSearchParams(s);return pt(`/classes?${e}`,{method:"GET"})},getClassesByTeacher:async s=>pt(`/classes/teacher/${s}`,{method:"GET"}),getClassById:async s=>pt(`/classes/${s}`,{method:"GET"}),createClass:async s=>pt("/classes",{method:"POST",body:JSON.stringify(s)}),updateClass:async(s,e)=>pt(`/classes/${s}`,{method:"PUT",body:JSON.stringify(e)}),archiveClass:async s=>pt(`/classes/${s}`,{method:"DELETE"}),addStudentToClass:async(s,e)=>pt(`/classes/${s}/students`,{method:"POST",body:JSON.stringify(e)}),removeStudentFromClass:async(s,e)=>pt(`/classes/${s}/students/${e}`,{method:"DELETE"}),getClassStudents:async s=>pt(`/classes/${s}/students`,{method:"GET"})},s1={getSchools:async(s={})=>{const e=new URLSearchParams(s);return pt(`/schools?${e}`,{method:"GET"})},getSchoolById:async s=>pt(`/schools/${s}`,{method:"GET"}),getSchoolStats:async s=>pt(`/schools/${s}/stats`,{method:"GET"}),createSchool:async s=>pt("/schools",{method:"POST",body:JSON.stringify(s)}),updateSchool:async(s,e)=>pt(`/schools/${s}`,{method:"PUT",body:JSON.stringify(e)}),deleteSchool:async(s,e=!1)=>{const n=e?`/schools/${s}?permanent=true`:`/schools/${s}`;return pt(n,{method:"DELETE"})}},n1=()=>{const s=window.fetch;window.fetch=async(...e)=>{let[n,l]=e;try{let r=await s(n,l);if(r.status===401)try{await fa.refreshToken(),l&&l.headers?l.headers.Authorization=`Bearer ${localStorage.getItem("token")}`:l={...l,headers:{...l?.headers,Authorization:`Bearer ${localStorage.getItem("token")}`}},r=await s(n,l)}catch{fa.logout(),window.location.href="/login"}return r}catch(r){throw console.error("Erro na requisição interceptada:",r),r}}},i1=()=>{n1();const s=localStorage.getItem("user");if(s)try{const e=JSON.parse(s);console.log("Usuário encontrado no localStorage:",e)}catch(e){console.error("Erro ao parsear usuário do localStorage:",e),localStorage.removeItem("token"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user")}};function l1({onLogin:s,onRegister:e}){const[n,l]=j.useState(""),[r,c]=j.useState(""),[u,h]=j.useState(!1),[m,p]=j.useState(""),x=async y=>{y.preventDefault(),h(!0),p("");try{const v=await fa.login(n,r);localStorage.setItem("token",v.data.tokens.access_token),localStorage.setItem("refreshToken",v.data.tokens.refresh_token),localStorage.setItem("user",JSON.stringify(v.data.user)),s(v.data.user,v.data.access)}catch(v){v.message.includes("Credenciais inválidas")||v.message.includes("Conta inativa")?p("Email ou senha incorretos. Verifique suas credenciais."):p(v.message||"Erro ao fazer login. Verifique suas credenciais.")}finally{h(!1)}};return d.jsx("div",{className:"login-container",children:d.jsxs("form",{className:"login-form",onSubmit:x,children:[d.jsx("h2",{className:"login-title",children:"Bem-vindo ao PomoDash"}),d.jsx("p",{className:"login-subtitle",children:"Faça login para continuar no PomoDash da instituição AESA"}),m&&d.jsx("div",{className:"error-message",children:m}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"email",children:"Email"}),d.jsx("input",{type:"email",id:"email",name:"email",placeholder:"seu@email.com",required:!0,value:n,onChange:y=>l(y.target.value),disabled:u})]}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"password",children:"Senha"}),d.jsx("input",{type:"password",id:"password",name:"password",placeholder:"Sua senha",required:!0,value:r,onChange:y=>c(y.target.value),disabled:u})]}),d.jsx("button",{type:"submit",className:"login-button",disabled:u,children:u?"Entrando...":"Entrar"}),d.jsx("div",{className:"login-footer",children:d.jsxs("span",{children:["Não tem uma conta na AESA? ",d.jsx("button",{type:"button",onClick:e,className:"register-link",children:"Registre-se"})]})})]})})}function r1({onRegister:s,onLogin:e}){const[n,l]=j.useState({name:"",email:"",password:"",confirmPassword:"",role:"student"}),[r,c]=j.useState(!1),[u,h]=j.useState(""),[m,p]=j.useState(""),x=v=>{l({...n,[v.target.name]:v.target.value})},y=async v=>{if(v.preventDefault(),h(""),p(""),n.password!==n.confirmPassword){h("As senhas não coincidem");return}if(n.password.length<6){h("A senha deve ter pelo menos 6 caracteres");return}if(!n.name||!n.email||!n.password){h("Por favor, preencha todos os campos obrigatórios");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.email)){h("Por favor, insira um email válido");return}c(!0);try{const w={name:n.name,email:n.email,password:n.password,role:n.role};await fa.register(w),p("Registro realizado com sucesso na instituição AESA! Você pode fazer login agora."),l({name:"",email:"",password:"",confirmPassword:"",role:"student"}),s&&setTimeout(()=>{s()},1500)}catch(w){w.message.includes("Email já cadastrado")?h("Este email já está cadastrado. Tente outro email."):h(w.message||"Erro ao registrar. Por favor, tente novamente.")}finally{c(!1)}};return d.jsx("div",{className:"register-container",children:d.jsxs("form",{className:"register-form",onSubmit:y,children:[d.jsx("h2",{className:"register-title",children:"Crie sua conta"}),d.jsx("p",{className:"register-subtitle",children:"Preencha os dados abaixo para se registrar"}),u&&d.jsx("div",{className:"error-message",children:u}),m&&d.jsx("div",{className:"success-message",children:m}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"name",children:"Nome Completo"}),d.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Seu nome completo",value:n.name,onChange:x,disabled:r,required:!0})]}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"email",children:"Email"}),d.jsx("input",{type:"email",id:"email",name:"email",placeholder:"seu@email.com",value:n.email,onChange:x,disabled:r,required:!0})]}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"password",children:"Senha"}),d.jsx("input",{type:"password",id:"password",name:"password",placeholder:"Sua senha (mínimo 6 caracteres)",value:n.password,onChange:x,disabled:r,required:!0,minLength:"6"})]}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"confirmPassword",children:"Confirmar Senha"}),d.jsx("input",{type:"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Confirme sua senha",value:n.confirmPassword,onChange:x,disabled:r,required:!0}),n.password&&n.confirmPassword&&n.password!==n.confirmPassword&&d.jsx("div",{className:"password-mismatch-error",children:"As senhas não coincidem"})]}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"role",children:"Tipo de Usuário"}),d.jsxs("select",{id:"role",name:"role",value:n.role,onChange:x,disabled:r,children:[d.jsx("option",{value:"student",children:"Aluno"}),d.jsx("option",{value:"teacher",children:"Professor"}),d.jsx("option",{value:"school_admin",children:"Administrador da Escola"})]})]}),d.jsx("button",{type:"submit",className:"register-button",disabled:r,children:r?"Registrando...":"Registrar"}),d.jsx("div",{className:"register-footer",children:d.jsxs("span",{children:["Já tem uma conta? ",d.jsx("button",{type:"button",onClick:e,className:"login-link",children:"Faça login"})]})})]})})}function o1({onRegister:s,onLogin:e}){return d.jsx("div",{className:"register-wrapper",children:d.jsx(r1,{onRegister:s,onLogin:e})})}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Ul(s){return s+.5|0}const Js=(s,e,n)=>Math.max(Math.min(s,n),e);function wl(s){return Js(Ul(s*2.55),0,255)}function en(s){return Js(Ul(s*255),0,255)}function ws(s){return Js(Ul(s/2.55)/100,0,1)}function Pg(s){return Js(Ul(s*100),0,100)}const ja={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},dd=[..."0123456789ABCDEF"],c1=s=>dd[s&15],u1=s=>dd[(s&240)>>4]+dd[s&15],Wr=s=>(s&240)>>4===(s&15),d1=s=>Wr(s.r)&&Wr(s.g)&&Wr(s.b)&&Wr(s.a);function f1(s){var e=s.length,n;return s[0]==="#"&&(e===4||e===5?n={r:255&ja[s[1]]*17,g:255&ja[s[2]]*17,b:255&ja[s[3]]*17,a:e===5?ja[s[4]]*17:255}:(e===7||e===9)&&(n={r:ja[s[1]]<<4|ja[s[2]],g:ja[s[3]]<<4|ja[s[4]],b:ja[s[5]]<<4|ja[s[6]],a:e===9?ja[s[7]]<<4|ja[s[8]]:255})),n}const h1=(s,e)=>s<255?e(s):"";function m1(s){var e=d1(s)?c1:u1;return s?"#"+e(s.r)+e(s.g)+e(s.b)+h1(s.a,e):void 0}const g1=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function xx(s,e,n){const l=e*Math.min(n,1-n),r=(c,u=(c+s/30)%12)=>n-l*Math.max(Math.min(u-3,9-u,1),-1);return[r(0),r(8),r(4)]}function p1(s,e,n){const l=(r,c=(r+s/60)%6)=>n-n*e*Math.max(Math.min(c,4-c,1),0);return[l(5),l(3),l(1)]}function x1(s,e,n){const l=xx(s,1,.5);let r;for(e+n>1&&(r=1/(e+n),e*=r,n*=r),r=0;r<3;r++)l[r]*=1-e-n,l[r]+=e;return l}function b1(s,e,n,l,r){return s===r?(e-n)/l+(e<n?6:0):e===r?(n-s)/l+2:(s-e)/l+4}function Nd(s){const n=s.r/255,l=s.g/255,r=s.b/255,c=Math.max(n,l,r),u=Math.min(n,l,r),h=(c+u)/2;let m,p,x;return c!==u&&(x=c-u,p=h>.5?x/(2-c-u):x/(c+u),m=b1(n,l,r,x,c),m=m*60+.5),[m|0,p||0,h]}function Ed(s,e,n,l){return(Array.isArray(e)?s(e[0],e[1],e[2]):s(e,n,l)).map(en)}function Td(s,e,n){return Ed(xx,s,e,n)}function y1(s,e,n){return Ed(x1,s,e,n)}function v1(s,e,n){return Ed(p1,s,e,n)}function bx(s){return(s%360+360)%360}function S1(s){const e=g1.exec(s);let n=255,l;if(!e)return;e[5]!==l&&(n=e[6]?wl(+e[5]):en(+e[5]));const r=bx(+e[2]),c=+e[3]/100,u=+e[4]/100;return e[1]==="hwb"?l=y1(r,c,u):e[1]==="hsv"?l=v1(r,c,u):l=Td(r,c,u),{r:l[0],g:l[1],b:l[2],a:n}}function _1(s,e){var n=Nd(s);n[0]=bx(n[0]+e),n=Td(n),s.r=n[0],s.g=n[1],s.b=n[2]}function j1(s){if(!s)return;const e=Nd(s),n=e[0],l=Pg(e[1]),r=Pg(e[2]);return s.a<255?`hsla(${n}, ${l}%, ${r}%, ${ws(s.a)})`:`hsl(${n}, ${l}%, ${r}%)`}const qg={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Yg={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function w1(){const s={},e=Object.keys(Yg),n=Object.keys(qg);let l,r,c,u,h;for(l=0;l<e.length;l++){for(u=h=e[l],r=0;r<n.length;r++)c=n[r],h=h.replace(c,qg[c]);c=parseInt(Yg[u],16),s[h]=[c>>16&255,c>>8&255,c&255]}return s}let Jr;function N1(s){Jr||(Jr=w1(),Jr.transparent=[0,0,0,0]);const e=Jr[s.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:e.length===4?e[3]:255}}const E1=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function T1(s){const e=E1.exec(s);let n=255,l,r,c;if(e){if(e[7]!==l){const u=+e[7];n=e[8]?wl(u):Js(u*255,0,255)}return l=+e[1],r=+e[3],c=+e[5],l=255&(e[2]?wl(l):Js(l,0,255)),r=255&(e[4]?wl(r):Js(r,0,255)),c=255&(e[6]?wl(c):Js(c,0,255)),{r:l,g:r,b:c,a:n}}}function k1(s){return s&&(s.a<255?`rgba(${s.r}, ${s.g}, ${s.b}, ${ws(s.a)})`:`rgb(${s.r}, ${s.g}, ${s.b})`)}const Wu=s=>s<=.0031308?s*12.92:Math.pow(s,1/2.4)*1.055-.055,hi=s=>s<=.04045?s/12.92:Math.pow((s+.055)/1.055,2.4);function A1(s,e,n){const l=hi(ws(s.r)),r=hi(ws(s.g)),c=hi(ws(s.b));return{r:en(Wu(l+n*(hi(ws(e.r))-l))),g:en(Wu(r+n*(hi(ws(e.g))-r))),b:en(Wu(c+n*(hi(ws(e.b))-c))),a:s.a+n*(e.a-s.a)}}function Ir(s,e,n){if(s){let l=Nd(s);l[e]=Math.max(0,Math.min(l[e]+l[e]*n,e===0?360:1)),l=Td(l),s.r=l[0],s.g=l[1],s.b=l[2]}}function yx(s,e){return s&&Object.assign(e||{},s)}function Vg(s){var e={r:0,g:0,b:0,a:255};return Array.isArray(s)?s.length>=3&&(e={r:s[0],g:s[1],b:s[2],a:255},s.length>3&&(e.a=en(s[3]))):(e=yx(s,{r:0,g:0,b:0,a:1}),e.a=en(e.a)),e}function C1(s){return s.charAt(0)==="r"?T1(s):S1(s)}class Ml{constructor(e){if(e instanceof Ml)return e;const n=typeof e;let l;n==="object"?l=Vg(e):n==="string"&&(l=f1(e)||N1(e)||C1(e)),this._rgb=l,this._valid=!!l}get valid(){return this._valid}get rgb(){var e=yx(this._rgb);return e&&(e.a=ws(e.a)),e}set rgb(e){this._rgb=Vg(e)}rgbString(){return this._valid?k1(this._rgb):void 0}hexString(){return this._valid?m1(this._rgb):void 0}hslString(){return this._valid?j1(this._rgb):void 0}mix(e,n){if(e){const l=this.rgb,r=e.rgb;let c;const u=n===c?.5:n,h=2*u-1,m=l.a-r.a,p=((h*m===-1?h:(h+m)/(1+h*m))+1)/2;c=1-p,l.r=255&p*l.r+c*r.r+.5,l.g=255&p*l.g+c*r.g+.5,l.b=255&p*l.b+c*r.b+.5,l.a=u*l.a+(1-u)*r.a,this.rgb=l}return this}interpolate(e,n){return e&&(this._rgb=A1(this._rgb,e._rgb,n)),this}clone(){return new Ml(this.rgb)}alpha(e){return this._rgb.a=en(e),this}clearer(e){const n=this._rgb;return n.a*=1-e,this}greyscale(){const e=this._rgb,n=Ul(e.r*.3+e.g*.59+e.b*.11);return e.r=e.g=e.b=n,this}opaquer(e){const n=this._rgb;return n.a*=1+e,this}negate(){const e=this._rgb;return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,this}lighten(e){return Ir(this._rgb,2,e),this}darken(e){return Ir(this._rgb,2,-e),this}saturate(e){return Ir(this._rgb,1,e),this}desaturate(e){return Ir(this._rgb,1,-e),this}rotate(e){return _1(this._rgb,e),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function vs(){}const M1=(()=>{let s=0;return()=>s++})();function Jt(s){return s==null}function _e(s){if(Array.isArray&&Array.isArray(s))return!0;const e=Object.prototype.toString.call(s);return e.slice(0,7)==="[object"&&e.slice(-6)==="Array]"}function Lt(s){return s!==null&&Object.prototype.toString.call(s)==="[object Object]"}function Na(s){return(typeof s=="number"||s instanceof Number)&&isFinite(+s)}function Ka(s,e){return Na(s)?s:e}function zt(s,e){return typeof s>"u"?e:s}const D1=(s,e)=>typeof s=="string"&&s.endsWith("%")?parseFloat(s)/100:+s/e,vx=(s,e)=>typeof s=="string"&&s.endsWith("%")?parseFloat(s)/100*e:+s;function ee(s,e,n){if(s&&typeof s.call=="function")return s.apply(n,e)}function Vt(s,e,n,l){let r,c,u;if(_e(s))for(c=s.length,r=0;r<c;r++)e.call(n,s[r],r);else if(Lt(s))for(u=Object.keys(s),c=u.length,r=0;r<c;r++)e.call(n,s[u[r]],u[r])}function xo(s,e){let n,l,r,c;if(!s||!e||s.length!==e.length)return!1;for(n=0,l=s.length;n<l;++n)if(r=s[n],c=e[n],r.datasetIndex!==c.datasetIndex||r.index!==c.index)return!1;return!0}function bo(s){if(_e(s))return s.map(bo);if(Lt(s)){const e=Object.create(null),n=Object.keys(s),l=n.length;let r=0;for(;r<l;++r)e[n[r]]=bo(s[n[r]]);return e}return s}function Sx(s){return["__proto__","prototype","constructor"].indexOf(s)===-1}function R1(s,e,n,l){if(!Sx(s))return;const r=e[s],c=n[s];Lt(r)&&Lt(c)?Dl(r,c,l):e[s]=bo(c)}function Dl(s,e,n){const l=_e(e)?e:[e],r=l.length;if(!Lt(s))return s;n=n||{};const c=n.merger||R1;let u;for(let h=0;h<r;++h){if(u=l[h],!Lt(u))continue;const m=Object.keys(u);for(let p=0,x=m.length;p<x;++p)c(m[p],s,u,n)}return s}function Tl(s,e){return Dl(s,e,{merger:O1})}function O1(s,e,n){if(!Sx(s))return;const l=e[s],r=n[s];Lt(l)&&Lt(r)?Tl(l,r):Object.prototype.hasOwnProperty.call(e,s)||(e[s]=bo(r))}const Fg={"":s=>s,x:s=>s.x,y:s=>s.y};function z1(s){const e=s.split("."),n=[];let l="";for(const r of e)l+=r,l.endsWith("\\")?l=l.slice(0,-1)+".":(n.push(l),l="");return n}function L1(s){const e=z1(s);return n=>{for(const l of e){if(l==="")break;n=n&&n[l]}return n}}function sn(s,e){return(Fg[e]||(Fg[e]=L1(e)))(s)}function kd(s){return s.charAt(0).toUpperCase()+s.slice(1)}const Rl=s=>typeof s<"u",nn=s=>typeof s=="function",Xg=(s,e)=>{if(s.size!==e.size)return!1;for(const n of s)if(!e.has(n))return!1;return!0};function B1(s){return s.type==="mouseup"||s.type==="click"||s.type==="contextmenu"}const Zt=Math.PI,be=2*Zt,yo=Number.POSITIVE_INFINITY,U1=Zt/180,je=Zt/2,wn=Zt/4,Gg=Zt*2/3,_x=Math.log10,an=Math.sign;function ho(s,e,n){return Math.abs(s-e)<n}function $g(s){const e=Math.round(s);s=ho(s,e,s/1e3)?e:s;const n=Math.pow(10,Math.floor(_x(s))),l=s/n;return(l<=1?1:l<=2?2:l<=5?5:10)*n}function H1(s){const e=[],n=Math.sqrt(s);let l;for(l=1;l<n;l++)s%l===0&&(e.push(l),e.push(s/l));return n===(n|0)&&e.push(n),e.sort((r,c)=>r-c).pop(),e}function P1(s){return typeof s=="symbol"||typeof s=="object"&&s!==null&&!(Symbol.toPrimitive in s||"toString"in s||"valueOf"in s)}function vo(s){return!P1(s)&&!isNaN(parseFloat(s))&&isFinite(s)}function q1(s,e){const n=Math.round(s);return n-e<=s&&n+e>=s}function Y1(s,e,n){let l,r,c;for(l=0,r=s.length;l<r;l++)c=s[l][n],isNaN(c)||(e.min=Math.min(e.min,c),e.max=Math.max(e.max,c))}function es(s){return s*(Zt/180)}function V1(s){return s*(180/Zt)}function Qg(s){if(!Na(s))return;let e=1,n=0;for(;Math.round(s*e)/e!==s;)e*=10,n++;return n}function jx(s,e){const n=e.x-s.x,l=e.y-s.y,r=Math.sqrt(n*n+l*l);let c=Math.atan2(l,n);return c<-.5*Zt&&(c+=be),{angle:c,distance:r}}function F1(s,e){return Math.sqrt(Math.pow(e.x-s.x,2)+Math.pow(e.y-s.y,2))}function Ia(s){return(s%be+be)%be}function So(s,e,n,l){const r=Ia(s),c=Ia(e),u=Ia(n),h=Ia(c-r),m=Ia(u-r),p=Ia(r-c),x=Ia(r-u);return r===c||r===u||l&&c===u||h>m&&p<x}function ea(s,e,n){return Math.max(e,Math.min(n,s))}function X1(s){return ea(s,-32768,32767)}function kn(s,e,n,l=1e-6){return s>=Math.min(e,n)-l&&s<=Math.max(e,n)+l}function Ad(s,e,n){n=n||(u=>s[u]<e);let l=s.length-1,r=0,c;for(;l-r>1;)c=r+l>>1,n(c)?r=c:l=c;return{lo:r,hi:l}}const fd=(s,e,n,l)=>Ad(s,n,l?r=>{const c=s[r][e];return c<n||c===n&&s[r+1][e]===n}:r=>s[r][e]<n),G1=(s,e,n)=>Ad(s,n,l=>s[l][e]>=n);function $1(s,e,n){let l=0,r=s.length;for(;l<r&&s[l]<e;)l++;for(;r>l&&s[r-1]>n;)r--;return l>0||r<s.length?s.slice(l,r):s}const wx=["push","pop","shift","splice","unshift"];function Q1(s,e){if(s._chartjs){s._chartjs.listeners.push(e);return}Object.defineProperty(s,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),wx.forEach(n=>{const l="_onData"+kd(n),r=s[n];Object.defineProperty(s,n,{configurable:!0,enumerable:!1,value(...c){const u=r.apply(this,c);return s._chartjs.listeners.forEach(h=>{typeof h[l]=="function"&&h[l](...c)}),u}})})}function Zg(s,e){const n=s._chartjs;if(!n)return;const l=n.listeners,r=l.indexOf(e);r!==-1&&l.splice(r,1),!(l.length>0)&&(wx.forEach(c=>{delete s[c]}),delete s._chartjs)}function Nx(s){const e=new Set(s);return e.size===s.length?s:Array.from(e)}const Ex=(function(){return typeof window>"u"?function(s){return s()}:window.requestAnimationFrame})();function Tx(s,e){let n=[],l=!1;return function(...r){n=r,l||(l=!0,Ex.call(window,()=>{l=!1,s.apply(e,n)}))}}function Z1(s,e){let n;return function(...l){return e?(clearTimeout(n),n=setTimeout(s,e,l)):s.apply(this,l),e}}const Cd=s=>s==="start"?"left":s==="end"?"right":"center",Le=(s,e,n)=>s==="start"?e:s==="end"?n:(e+n)/2,K1=(s,e,n,l)=>s===(l?"left":"right")?n:s==="center"?(e+n)/2:e,to=s=>s===0||s===1,Kg=(s,e,n)=>-(Math.pow(2,10*(s-=1))*Math.sin((s-e)*be/n)),Wg=(s,e,n)=>Math.pow(2,-10*s)*Math.sin((s-e)*be/n)+1,kl={linear:s=>s,easeInQuad:s=>s*s,easeOutQuad:s=>-s*(s-2),easeInOutQuad:s=>(s/=.5)<1?.5*s*s:-.5*(--s*(s-2)-1),easeInCubic:s=>s*s*s,easeOutCubic:s=>(s-=1)*s*s+1,easeInOutCubic:s=>(s/=.5)<1?.5*s*s*s:.5*((s-=2)*s*s+2),easeInQuart:s=>s*s*s*s,easeOutQuart:s=>-((s-=1)*s*s*s-1),easeInOutQuart:s=>(s/=.5)<1?.5*s*s*s*s:-.5*((s-=2)*s*s*s-2),easeInQuint:s=>s*s*s*s*s,easeOutQuint:s=>(s-=1)*s*s*s*s+1,easeInOutQuint:s=>(s/=.5)<1?.5*s*s*s*s*s:.5*((s-=2)*s*s*s*s+2),easeInSine:s=>-Math.cos(s*je)+1,easeOutSine:s=>Math.sin(s*je),easeInOutSine:s=>-.5*(Math.cos(Zt*s)-1),easeInExpo:s=>s===0?0:Math.pow(2,10*(s-1)),easeOutExpo:s=>s===1?1:-Math.pow(2,-10*s)+1,easeInOutExpo:s=>to(s)?s:s<.5?.5*Math.pow(2,10*(s*2-1)):.5*(-Math.pow(2,-10*(s*2-1))+2),easeInCirc:s=>s>=1?s:-(Math.sqrt(1-s*s)-1),easeOutCirc:s=>Math.sqrt(1-(s-=1)*s),easeInOutCirc:s=>(s/=.5)<1?-.5*(Math.sqrt(1-s*s)-1):.5*(Math.sqrt(1-(s-=2)*s)+1),easeInElastic:s=>to(s)?s:Kg(s,.075,.3),easeOutElastic:s=>to(s)?s:Wg(s,.075,.3),easeInOutElastic(s){return to(s)?s:s<.5?.5*Kg(s*2,.1125,.45):.5+.5*Wg(s*2-1,.1125,.45)},easeInBack(s){return s*s*((1.70158+1)*s-1.70158)},easeOutBack(s){return(s-=1)*s*((1.70158+1)*s+1.70158)+1},easeInOutBack(s){let e=1.70158;return(s/=.5)<1?.5*(s*s*(((e*=1.525)+1)*s-e)):.5*((s-=2)*s*(((e*=1.525)+1)*s+e)+2)},easeInBounce:s=>1-kl.easeOutBounce(1-s),easeOutBounce(s){return s<1/2.75?7.5625*s*s:s<2/2.75?7.5625*(s-=1.5/2.75)*s+.75:s<2.5/2.75?7.5625*(s-=2.25/2.75)*s+.9375:7.5625*(s-=2.625/2.75)*s+.984375},easeInOutBounce:s=>s<.5?kl.easeInBounce(s*2)*.5:kl.easeOutBounce(s*2-1)*.5+.5};function kx(s){if(s&&typeof s=="object"){const e=s.toString();return e==="[object CanvasPattern]"||e==="[object CanvasGradient]"}return!1}function Jg(s){return kx(s)?s:new Ml(s)}function Ju(s){return kx(s)?s:new Ml(s).saturate(.5).darken(.1).hexString()}const W1=["x","y","borderWidth","radius","tension"],J1=["color","borderColor","backgroundColor"];function I1(s){s.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),s.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:e=>e!=="onProgress"&&e!=="onComplete"&&e!=="fn"}),s.set("animations",{colors:{type:"color",properties:J1},numbers:{type:"number",properties:W1}}),s.describe("animations",{_fallback:"animation"}),s.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:e=>e|0}}}})}function tS(s){s.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Ig=new Map;function eS(s,e){e=e||{};const n=s+JSON.stringify(e);let l=Ig.get(n);return l||(l=new Intl.NumberFormat(s,e),Ig.set(n,l)),l}function Ao(s,e,n){return eS(e,n).format(s)}const aS={values(s){return _e(s)?s:""+s},numeric(s,e,n){if(s===0)return"0";const l=this.chart.options.locale;let r,c=s;if(n.length>1){const p=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(p<1e-4||p>1e15)&&(r="scientific"),c=sS(s,n)}const u=_x(Math.abs(c)),h=isNaN(u)?1:Math.max(Math.min(-1*Math.floor(u),20),0),m={notation:r,minimumFractionDigits:h,maximumFractionDigits:h};return Object.assign(m,this.options.ticks.format),Ao(s,l,m)}};function sS(s,e){let n=e.length>3?e[2].value-e[1].value:e[1].value-e[0].value;return Math.abs(n)>=1&&s!==Math.floor(s)&&(n=s-Math.floor(s)),n}var Ax={formatters:aS};function nS(s){s.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(e,n)=>n.lineWidth,tickColor:(e,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Ax.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),s.route("scale.ticks","color","","color"),s.route("scale.grid","color","","borderColor"),s.route("scale.border","color","","borderColor"),s.route("scale.title","color","","color"),s.describe("scale",{_fallback:!1,_scriptable:e=>!e.startsWith("before")&&!e.startsWith("after")&&e!=="callback"&&e!=="parser",_indexable:e=>e!=="borderDash"&&e!=="tickBorderDash"&&e!=="dash"}),s.describe("scales",{_fallback:"scale"}),s.describe("scale.ticks",{_scriptable:e=>e!=="backdropPadding"&&e!=="callback",_indexable:e=>e!=="backdropPadding"})}const Cn=Object.create(null),hd=Object.create(null);function Al(s,e){if(!e)return s;const n=e.split(".");for(let l=0,r=n.length;l<r;++l){const c=n[l];s=s[c]||(s[c]=Object.create(null))}return s}function Iu(s,e,n){return typeof e=="string"?Dl(Al(s,e),n):Dl(Al(s,""),e)}class iS{constructor(e,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=l=>l.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(l,r)=>Ju(r.backgroundColor),this.hoverBorderColor=(l,r)=>Ju(r.borderColor),this.hoverColor=(l,r)=>Ju(r.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(e),this.apply(n)}set(e,n){return Iu(this,e,n)}get(e){return Al(this,e)}describe(e,n){return Iu(hd,e,n)}override(e,n){return Iu(Cn,e,n)}route(e,n,l,r){const c=Al(this,e),u=Al(this,l),h="_"+n;Object.defineProperties(c,{[h]:{value:c[n],writable:!0},[n]:{enumerable:!0,get(){const m=this[h],p=u[r];return Lt(m)?Object.assign({},p,m):zt(m,p)},set(m){this[h]=m}}})}apply(e){e.forEach(n=>n(this))}}var le=new iS({_scriptable:s=>!s.startsWith("on"),_indexable:s=>s!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[I1,tS,nS]);function lS(s){return!s||Jt(s.size)||Jt(s.family)?null:(s.style?s.style+" ":"")+(s.weight?s.weight+" ":"")+s.size+"px "+s.family}function tp(s,e,n,l,r){let c=e[r];return c||(c=e[r]=s.measureText(r).width,n.push(r)),c>l&&(l=c),l}function Nn(s,e,n){const l=s.currentDevicePixelRatio,r=n!==0?Math.max(n/2,.5):0;return Math.round((e-r)*l)/l+r}function ep(s,e){!e&&!s||(e=e||s.getContext("2d"),e.save(),e.resetTransform(),e.clearRect(0,0,s.width,s.height),e.restore())}function ap(s,e,n,l){Cx(s,e,n,l,null)}function Cx(s,e,n,l,r){let c,u,h,m,p,x,y,v;const _=e.pointStyle,w=e.rotation,E=e.radius;let T=(w||0)*U1;if(_&&typeof _=="object"&&(c=_.toString(),c==="[object HTMLImageElement]"||c==="[object HTMLCanvasElement]")){s.save(),s.translate(n,l),s.rotate(T),s.drawImage(_,-_.width/2,-_.height/2,_.width,_.height),s.restore();return}if(!(isNaN(E)||E<=0)){switch(s.beginPath(),_){default:r?s.ellipse(n,l,r/2,E,0,0,be):s.arc(n,l,E,0,be),s.closePath();break;case"triangle":x=r?r/2:E,s.moveTo(n+Math.sin(T)*x,l-Math.cos(T)*E),T+=Gg,s.lineTo(n+Math.sin(T)*x,l-Math.cos(T)*E),T+=Gg,s.lineTo(n+Math.sin(T)*x,l-Math.cos(T)*E),s.closePath();break;case"rectRounded":p=E*.516,m=E-p,u=Math.cos(T+wn)*m,y=Math.cos(T+wn)*(r?r/2-p:m),h=Math.sin(T+wn)*m,v=Math.sin(T+wn)*(r?r/2-p:m),s.arc(n-y,l-h,p,T-Zt,T-je),s.arc(n+v,l-u,p,T-je,T),s.arc(n+y,l+h,p,T,T+je),s.arc(n-v,l+u,p,T+je,T+Zt),s.closePath();break;case"rect":if(!w){m=Math.SQRT1_2*E,x=r?r/2:m,s.rect(n-x,l-m,2*x,2*m);break}T+=wn;case"rectRot":y=Math.cos(T)*(r?r/2:E),u=Math.cos(T)*E,h=Math.sin(T)*E,v=Math.sin(T)*(r?r/2:E),s.moveTo(n-y,l-h),s.lineTo(n+v,l-u),s.lineTo(n+y,l+h),s.lineTo(n-v,l+u),s.closePath();break;case"crossRot":T+=wn;case"cross":y=Math.cos(T)*(r?r/2:E),u=Math.cos(T)*E,h=Math.sin(T)*E,v=Math.sin(T)*(r?r/2:E),s.moveTo(n-y,l-h),s.lineTo(n+y,l+h),s.moveTo(n+v,l-u),s.lineTo(n-v,l+u);break;case"star":y=Math.cos(T)*(r?r/2:E),u=Math.cos(T)*E,h=Math.sin(T)*E,v=Math.sin(T)*(r?r/2:E),s.moveTo(n-y,l-h),s.lineTo(n+y,l+h),s.moveTo(n+v,l-u),s.lineTo(n-v,l+u),T+=wn,y=Math.cos(T)*(r?r/2:E),u=Math.cos(T)*E,h=Math.sin(T)*E,v=Math.sin(T)*(r?r/2:E),s.moveTo(n-y,l-h),s.lineTo(n+y,l+h),s.moveTo(n+v,l-u),s.lineTo(n-v,l+u);break;case"line":u=r?r/2:Math.cos(T)*E,h=Math.sin(T)*E,s.moveTo(n-u,l-h),s.lineTo(n+u,l+h);break;case"dash":s.moveTo(n,l),s.lineTo(n+Math.cos(T)*(r?r/2:E),l+Math.sin(T)*E);break;case!1:s.closePath();break}s.fill(),e.borderWidth>0&&s.stroke()}}function Mx(s,e,n){return n=n||.5,!e||s&&s.x>e.left-n&&s.x<e.right+n&&s.y>e.top-n&&s.y<e.bottom+n}function Md(s,e){s.save(),s.beginPath(),s.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),s.clip()}function Dd(s){s.restore()}function rS(s,e){e.translation&&s.translate(e.translation[0],e.translation[1]),Jt(e.rotation)||s.rotate(e.rotation),e.color&&(s.fillStyle=e.color),e.textAlign&&(s.textAlign=e.textAlign),e.textBaseline&&(s.textBaseline=e.textBaseline)}function oS(s,e,n,l,r){if(r.strikethrough||r.underline){const c=s.measureText(l),u=e-c.actualBoundingBoxLeft,h=e+c.actualBoundingBoxRight,m=n-c.actualBoundingBoxAscent,p=n+c.actualBoundingBoxDescent,x=r.strikethrough?(m+p)/2:p;s.strokeStyle=s.fillStyle,s.beginPath(),s.lineWidth=r.decorationWidth||2,s.moveTo(u,x),s.lineTo(h,x),s.stroke()}}function cS(s,e){const n=s.fillStyle;s.fillStyle=e.color,s.fillRect(e.left,e.top,e.width,e.height),s.fillStyle=n}function Ol(s,e,n,l,r,c={}){const u=_e(e)?e:[e],h=c.strokeWidth>0&&c.strokeColor!=="";let m,p;for(s.save(),s.font=r.string,rS(s,c),m=0;m<u.length;++m)p=u[m],c.backdrop&&cS(s,c.backdrop),h&&(c.strokeColor&&(s.strokeStyle=c.strokeColor),Jt(c.strokeWidth)||(s.lineWidth=c.strokeWidth),s.strokeText(p,n,l,c.maxWidth)),s.fillText(p,n,l,c.maxWidth),oS(s,n,l,p,c),l+=Number(r.lineHeight);s.restore()}function _o(s,e){const{x:n,y:l,w:r,h:c,radius:u}=e;s.arc(n+u.topLeft,l+u.topLeft,u.topLeft,1.5*Zt,Zt,!0),s.lineTo(n,l+c-u.bottomLeft),s.arc(n+u.bottomLeft,l+c-u.bottomLeft,u.bottomLeft,Zt,je,!0),s.lineTo(n+r-u.bottomRight,l+c),s.arc(n+r-u.bottomRight,l+c-u.bottomRight,u.bottomRight,je,0,!0),s.lineTo(n+r,l+u.topRight),s.arc(n+r-u.topRight,l+u.topRight,u.topRight,0,-je,!0),s.lineTo(n+u.topLeft,l)}const uS=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,dS=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function fS(s,e){const n=(""+s).match(uS);if(!n||n[1]==="normal")return e*1.2;switch(s=+n[2],n[3]){case"px":return s;case"%":s/=100;break}return e*s}const hS=s=>+s||0;function Rd(s,e){const n={},l=Lt(e),r=l?Object.keys(e):e,c=Lt(s)?l?u=>zt(s[u],s[e[u]]):u=>s[u]:()=>s;for(const u of r)n[u]=hS(c(u));return n}function Dx(s){return Rd(s,{top:"y",right:"x",bottom:"y",left:"x"})}function gi(s){return Rd(s,["topLeft","topRight","bottomLeft","bottomRight"])}function Ea(s){const e=Dx(s);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function Be(s,e){s=s||{},e=e||le.font;let n=zt(s.size,e.size);typeof n=="string"&&(n=parseInt(n,10));let l=zt(s.style,e.style);l&&!(""+l).match(dS)&&(console.warn('Invalid font style specified: "'+l+'"'),l=void 0);const r={family:zt(s.family,e.family),lineHeight:fS(zt(s.lineHeight,e.lineHeight),n),size:n,style:l,weight:zt(s.weight,e.weight),string:""};return r.string=lS(r),r}function eo(s,e,n,l){let r,c,u;for(r=0,c=s.length;r<c;++r)if(u=s[r],u!==void 0&&u!==void 0)return u}function mS(s,e,n){const{min:l,max:r}=s,c=vx(e,(r-l)/2),u=(h,m)=>n&&h===0?0:h+m;return{min:u(l,-Math.abs(c)),max:u(r,c)}}function Si(s,e){return Object.assign(Object.create(s),e)}function Od(s,e=[""],n,l,r=()=>s[0]){const c=n||s;typeof l>"u"&&(l=Lx("_fallback",s));const u={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:s,_rootScopes:c,_fallback:l,_getTarget:r,override:h=>Od([h,...s],e,c,l)};return new Proxy(u,{deleteProperty(h,m){return delete h[m],delete h._keys,delete s[0][m],!0},get(h,m){return Ox(h,m,()=>_S(m,e,s,h))},getOwnPropertyDescriptor(h,m){return Reflect.getOwnPropertyDescriptor(h._scopes[0],m)},getPrototypeOf(){return Reflect.getPrototypeOf(s[0])},has(h,m){return np(h).includes(m)},ownKeys(h){return np(h)},set(h,m,p){const x=h._storage||(h._storage=r());return h[m]=x[m]=p,delete h._keys,!0}})}function xi(s,e,n,l){const r={_cacheable:!1,_proxy:s,_context:e,_subProxy:n,_stack:new Set,_descriptors:Rx(s,l),setContext:c=>xi(s,c,n,l),override:c=>xi(s.override(c),e,n,l)};return new Proxy(r,{deleteProperty(c,u){return delete c[u],delete s[u],!0},get(c,u,h){return Ox(c,u,()=>pS(c,u,h))},getOwnPropertyDescriptor(c,u){return c._descriptors.allKeys?Reflect.has(s,u)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(s,u)},getPrototypeOf(){return Reflect.getPrototypeOf(s)},has(c,u){return Reflect.has(s,u)},ownKeys(){return Reflect.ownKeys(s)},set(c,u,h){return s[u]=h,delete c[u],!0}})}function Rx(s,e={scriptable:!0,indexable:!0}){const{_scriptable:n=e.scriptable,_indexable:l=e.indexable,_allKeys:r=e.allKeys}=s;return{allKeys:r,scriptable:n,indexable:l,isScriptable:nn(n)?n:()=>n,isIndexable:nn(l)?l:()=>l}}const gS=(s,e)=>s?s+kd(e):e,zd=(s,e)=>Lt(e)&&s!=="adapters"&&(Object.getPrototypeOf(e)===null||e.constructor===Object);function Ox(s,e,n){if(Object.prototype.hasOwnProperty.call(s,e)||e==="constructor")return s[e];const l=n();return s[e]=l,l}function pS(s,e,n){const{_proxy:l,_context:r,_subProxy:c,_descriptors:u}=s;let h=l[e];return nn(h)&&u.isScriptable(e)&&(h=xS(e,h,s,n)),_e(h)&&h.length&&(h=bS(e,h,s,u.isIndexable)),zd(e,h)&&(h=xi(h,r,c&&c[e],u)),h}function xS(s,e,n,l){const{_proxy:r,_context:c,_subProxy:u,_stack:h}=n;if(h.has(s))throw new Error("Recursion detected: "+Array.from(h).join("->")+"->"+s);h.add(s);let m=e(c,u||l);return h.delete(s),zd(s,m)&&(m=Ld(r._scopes,r,s,m)),m}function bS(s,e,n,l){const{_proxy:r,_context:c,_subProxy:u,_descriptors:h}=n;if(typeof c.index<"u"&&l(s))return e[c.index%e.length];if(Lt(e[0])){const m=e,p=r._scopes.filter(x=>x!==m);e=[];for(const x of m){const y=Ld(p,r,s,x);e.push(xi(y,c,u&&u[s],h))}}return e}function zx(s,e,n){return nn(s)?s(e,n):s}const yS=(s,e)=>s===!0?e:typeof s=="string"?sn(e,s):void 0;function vS(s,e,n,l,r){for(const c of e){const u=yS(n,c);if(u){s.add(u);const h=zx(u._fallback,n,r);if(typeof h<"u"&&h!==n&&h!==l)return h}else if(u===!1&&typeof l<"u"&&n!==l)return null}return!1}function Ld(s,e,n,l){const r=e._rootScopes,c=zx(e._fallback,n,l),u=[...s,...r],h=new Set;h.add(l);let m=sp(h,u,n,c||n,l);return m===null||typeof c<"u"&&c!==n&&(m=sp(h,u,c,m,l),m===null)?!1:Od(Array.from(h),[""],r,c,()=>SS(e,n,l))}function sp(s,e,n,l,r){for(;n;)n=vS(s,e,n,l,r);return n}function SS(s,e,n){const l=s._getTarget();e in l||(l[e]={});const r=l[e];return _e(r)&&Lt(n)?n:r||{}}function _S(s,e,n,l){let r;for(const c of e)if(r=Lx(gS(c,s),n),typeof r<"u")return zd(s,r)?Ld(n,l,s,r):r}function Lx(s,e){for(const n of e){if(!n)continue;const l=n[s];if(typeof l<"u")return l}}function np(s){let e=s._keys;return e||(e=s._keys=jS(s._scopes)),e}function jS(s){const e=new Set;for(const n of s)for(const l of Object.keys(n).filter(r=>!r.startsWith("_")))e.add(l);return Array.from(e)}function wS(s,e,n,l){const{iScale:r}=s,{key:c="r"}=this._parsing,u=new Array(l);let h,m,p,x;for(h=0,m=l;h<m;++h)p=h+n,x=e[p],u[h]={r:r.parse(sn(x,c),p)};return u}function Bd(){return typeof window<"u"&&typeof document<"u"}function Ud(s){let e=s.parentNode;return e&&e.toString()==="[object ShadowRoot]"&&(e=e.host),e}function jo(s,e,n){let l;return typeof s=="string"?(l=parseInt(s,10),s.indexOf("%")!==-1&&(l=l/100*e.parentNode[n])):l=s,l}const Co=s=>s.ownerDocument.defaultView.getComputedStyle(s,null);function NS(s,e){return Co(s).getPropertyValue(e)}const ES=["top","right","bottom","left"];function An(s,e,n){const l={};n=n?"-"+n:"";for(let r=0;r<4;r++){const c=ES[r];l[c]=parseFloat(s[e+"-"+c+n])||0}return l.width=l.left+l.right,l.height=l.top+l.bottom,l}const TS=(s,e,n)=>(s>0||e>0)&&(!n||!n.shadowRoot);function kS(s,e){const n=s.touches,l=n&&n.length?n[0]:s,{offsetX:r,offsetY:c}=l;let u=!1,h,m;if(TS(r,c,s.target))h=r,m=c;else{const p=e.getBoundingClientRect();h=l.clientX-p.left,m=l.clientY-p.top,u=!0}return{x:h,y:m,box:u}}function Tn(s,e){if("native"in s)return s;const{canvas:n,currentDevicePixelRatio:l}=e,r=Co(n),c=r.boxSizing==="border-box",u=An(r,"padding"),h=An(r,"border","width"),{x:m,y:p,box:x}=kS(s,n),y=u.left+(x&&h.left),v=u.top+(x&&h.top);let{width:_,height:w}=e;return c&&(_-=u.width+h.width,w-=u.height+h.height),{x:Math.round((m-y)/_*n.width/l),y:Math.round((p-v)/w*n.height/l)}}function AS(s,e,n){let l,r;if(e===void 0||n===void 0){const c=s&&Ud(s);if(!c)e=s.clientWidth,n=s.clientHeight;else{const u=c.getBoundingClientRect(),h=Co(c),m=An(h,"border","width"),p=An(h,"padding");e=u.width-p.width-m.width,n=u.height-p.height-m.height,l=jo(h.maxWidth,c,"clientWidth"),r=jo(h.maxHeight,c,"clientHeight")}}return{width:e,height:n,maxWidth:l||yo,maxHeight:r||yo}}const Is=s=>Math.round(s*10)/10;function CS(s,e,n,l){const r=Co(s),c=An(r,"margin"),u=jo(r.maxWidth,s,"clientWidth")||yo,h=jo(r.maxHeight,s,"clientHeight")||yo,m=AS(s,e,n);let{width:p,height:x}=m;if(r.boxSizing==="content-box"){const v=An(r,"border","width"),_=An(r,"padding");p-=_.width+v.width,x-=_.height+v.height}return p=Math.max(0,p-c.width),x=Math.max(0,l?p/l:x-c.height),p=Is(Math.min(p,u,m.maxWidth)),x=Is(Math.min(x,h,m.maxHeight)),p&&!x&&(x=Is(p/2)),(e!==void 0||n!==void 0)&&l&&m.height&&x>m.height&&(x=m.height,p=Is(Math.floor(x*l))),{width:p,height:x}}function ip(s,e,n){const l=e||1,r=Is(s.height*l),c=Is(s.width*l);s.height=Is(s.height),s.width=Is(s.width);const u=s.canvas;return u.style&&(n||!u.style.height&&!u.style.width)&&(u.style.height=`${s.height}px`,u.style.width=`${s.width}px`),s.currentDevicePixelRatio!==l||u.height!==r||u.width!==c?(s.currentDevicePixelRatio=l,u.height=r,u.width=c,s.ctx.setTransform(l,0,0,l,0,0),!0):!1}const MS=(function(){let s=!1;try{const e={get passive(){return s=!0,!1}};Bd()&&(window.addEventListener("test",null,e),window.removeEventListener("test",null,e))}catch{}return s})();function lp(s,e){const n=NS(s,e),l=n&&n.match(/^(\d+)(\.\d+)?px$/);return l?+l[1]:void 0}const DS=function(s,e){return{x(n){return s+s+e-n},setWidth(n){e=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,l){return n-l},leftForLtr(n,l){return n-l}}},RS=function(){return{x(s){return s},setWidth(s){},textAlign(s){return s},xPlus(s,e){return s+e},leftForLtr(s,e){return s}}};function pi(s,e,n){return s?DS(e,n):RS()}function Bx(s,e){let n,l;(e==="ltr"||e==="rtl")&&(n=s.canvas.style,l=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",e,"important"),s.prevTextDirection=l)}function Ux(s,e){e!==void 0&&(delete s.prevTextDirection,s.canvas.style.setProperty("direction",e[0],e[1]))}function ao(s,e,n){return s.options.clip?s[n]:e[n]}function OS(s,e){const{xScale:n,yScale:l}=s;return n&&l?{left:ao(n,e,"left"),right:ao(n,e,"right"),top:ao(l,e,"top"),bottom:ao(l,e,"bottom")}:e}function zS(s,e){const n=e._clip;if(n.disabled)return!1;const l=OS(e,s.chartArea);return{left:n.left===!1?0:l.left-(n.left===!0?0:n.left),right:n.right===!1?s.width:l.right+(n.right===!0?0:n.right),top:n.top===!1?0:l.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?s.height:l.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class LS{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(e,n,l,r){const c=n.listeners[r],u=n.duration;c.forEach(h=>h({chart:e,initial:n.initial,numSteps:u,currentStep:Math.min(l-n.start,u)}))}_refresh(){this._request||(this._running=!0,this._request=Ex.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(e=Date.now()){let n=0;this._charts.forEach((l,r)=>{if(!l.running||!l.items.length)return;const c=l.items;let u=c.length-1,h=!1,m;for(;u>=0;--u)m=c[u],m._active?(m._total>l.duration&&(l.duration=m._total),m.tick(e),h=!0):(c[u]=c[c.length-1],c.pop());h&&(r.draw(),this._notify(r,l,e,"progress")),c.length||(l.running=!1,this._notify(r,l,e,"complete"),l.initial=!1),n+=c.length}),this._lastDate=e,n===0&&(this._running=!1)}_getAnims(e){const n=this._charts;let l=n.get(e);return l||(l={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(e,l)),l}listen(e,n,l){this._getAnims(e).listeners[n].push(l)}add(e,n){!n||!n.length||this._getAnims(e).items.push(...n)}has(e){return this._getAnims(e).items.length>0}start(e){const n=this._charts.get(e);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((l,r)=>Math.max(l,r._duration),0),this._refresh())}running(e){if(!this._running)return!1;const n=this._charts.get(e);return!(!n||!n.running||!n.items.length)}stop(e){const n=this._charts.get(e);if(!n||!n.items.length)return;const l=n.items;let r=l.length-1;for(;r>=0;--r)l[r].cancel();n.items=[],this._notify(e,n,Date.now(),"complete")}remove(e){return this._charts.delete(e)}}var _s=new LS;const rp="transparent",BS={boolean(s,e,n){return n>.5?e:s},color(s,e,n){const l=Jg(s||rp),r=l.valid&&Jg(e||rp);return r&&r.valid?r.mix(l,n).hexString():e},number(s,e,n){return s+(e-s)*n}};class US{constructor(e,n,l,r){const c=n[l];r=eo([e.to,r,c,e.from]);const u=eo([e.from,c,r]);this._active=!0,this._fn=e.fn||BS[e.type||typeof u],this._easing=kl[e.easing]||kl.linear,this._start=Math.floor(Date.now()+(e.delay||0)),this._duration=this._total=Math.floor(e.duration),this._loop=!!e.loop,this._target=n,this._prop=l,this._from=u,this._to=r,this._promises=void 0}active(){return this._active}update(e,n,l){if(this._active){this._notify(!1);const r=this._target[this._prop],c=l-this._start,u=this._duration-c;this._start=l,this._duration=Math.floor(Math.max(u,e.duration)),this._total+=c,this._loop=!!e.loop,this._to=eo([e.to,n,r,e.from]),this._from=eo([e.from,r,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(e){const n=e-this._start,l=this._duration,r=this._prop,c=this._from,u=this._loop,h=this._to;let m;if(this._active=c!==h&&(u||n<l),!this._active){this._target[r]=h,this._notify(!0);return}if(n<0){this._target[r]=c;return}m=n/l%2,m=u&&m>1?2-m:m,m=this._easing(Math.min(1,Math.max(0,m))),this._target[r]=this._fn(c,h,m)}wait(){const e=this._promises||(this._promises=[]);return new Promise((n,l)=>{e.push({res:n,rej:l})})}_notify(e){const n=e?"res":"rej",l=this._promises||[];for(let r=0;r<l.length;r++)l[r][n]()}}class Hx{constructor(e,n){this._chart=e,this._properties=new Map,this.configure(n)}configure(e){if(!Lt(e))return;const n=Object.keys(le.animation),l=this._properties;Object.getOwnPropertyNames(e).forEach(r=>{const c=e[r];if(!Lt(c))return;const u={};for(const h of n)u[h]=c[h];(_e(c.properties)&&c.properties||[r]).forEach(h=>{(h===r||!l.has(h))&&l.set(h,u)})})}_animateOptions(e,n){const l=n.options,r=PS(e,l);if(!r)return[];const c=this._createAnimations(r,l);return l.$shared&&HS(e.options.$animations,l).then(()=>{e.options=l},()=>{}),c}_createAnimations(e,n){const l=this._properties,r=[],c=e.$animations||(e.$animations={}),u=Object.keys(n),h=Date.now();let m;for(m=u.length-1;m>=0;--m){const p=u[m];if(p.charAt(0)==="$")continue;if(p==="options"){r.push(...this._animateOptions(e,n));continue}const x=n[p];let y=c[p];const v=l.get(p);if(y)if(v&&y.active()){y.update(v,x,h);continue}else y.cancel();if(!v||!v.duration){e[p]=x;continue}c[p]=y=new US(v,e,p,x),r.push(y)}return r}update(e,n){if(this._properties.size===0){Object.assign(e,n);return}const l=this._createAnimations(e,n);if(l.length)return _s.add(this._chart,l),!0}}function HS(s,e){const n=[],l=Object.keys(e);for(let r=0;r<l.length;r++){const c=s[l[r]];c&&c.active()&&n.push(c.wait())}return Promise.all(n)}function PS(s,e){if(!e)return;let n=s.options;if(!n){s.options=e;return}return n.$shared&&(s.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function op(s,e){const n=s&&s.options||{},l=n.reverse,r=n.min===void 0?e:0,c=n.max===void 0?e:0;return{start:l?c:r,end:l?r:c}}function qS(s,e,n){if(n===!1)return!1;const l=op(s,n),r=op(e,n);return{top:r.end,right:l.end,bottom:r.start,left:l.start}}function YS(s){let e,n,l,r;return Lt(s)?(e=s.top,n=s.right,l=s.bottom,r=s.left):e=n=l=r=s,{top:e,right:n,bottom:l,left:r,disabled:s===!1}}function Px(s,e){const n=[],l=s._getSortedDatasetMetas(e);let r,c;for(r=0,c=l.length;r<c;++r)n.push(l[r].index);return n}function cp(s,e,n,l={}){const r=s.keys,c=l.mode==="single";let u,h,m,p;if(e===null)return;let x=!1;for(u=0,h=r.length;u<h;++u){if(m=+r[u],m===n){if(x=!0,l.all)continue;break}p=s.values[m],Na(p)&&(c||e===0||an(e)===an(p))&&(e+=p)}return!x&&!l.all?0:e}function VS(s,e){const{iScale:n,vScale:l}=e,r=n.axis==="x"?"x":"y",c=l.axis==="x"?"x":"y",u=Object.keys(s),h=new Array(u.length);let m,p,x;for(m=0,p=u.length;m<p;++m)x=u[m],h[m]={[r]:x,[c]:s[x]};return h}function td(s,e){const n=s&&s.options.stacked;return n||n===void 0&&e.stack!==void 0}function FS(s,e,n){return`${s.id}.${e.id}.${n.stack||n.type}`}function XS(s){const{min:e,max:n,minDefined:l,maxDefined:r}=s.getUserBounds();return{min:l?e:Number.NEGATIVE_INFINITY,max:r?n:Number.POSITIVE_INFINITY}}function GS(s,e,n){const l=s[e]||(s[e]={});return l[n]||(l[n]={})}function up(s,e,n,l){for(const r of e.getMatchingVisibleMetas(l).reverse()){const c=s[r.index];if(n&&c>0||!n&&c<0)return r.index}return null}function dp(s,e){const{chart:n,_cachedMeta:l}=s,r=n._stacks||(n._stacks={}),{iScale:c,vScale:u,index:h}=l,m=c.axis,p=u.axis,x=FS(c,u,l),y=e.length;let v;for(let _=0;_<y;++_){const w=e[_],{[m]:E,[p]:T}=w,M=w._stacks||(w._stacks={});v=M[p]=GS(r,x,E),v[h]=T,v._top=up(v,u,!0,l.type),v._bottom=up(v,u,!1,l.type);const O=v._visualValues||(v._visualValues={});O[h]=T}}function ed(s,e){const n=s.scales;return Object.keys(n).filter(l=>n[l].axis===e).shift()}function $S(s,e){return Si(s,{active:!1,dataset:void 0,datasetIndex:e,index:e,mode:"default",type:"dataset"})}function QS(s,e,n){return Si(s,{active:!1,dataIndex:e,parsed:void 0,raw:void 0,element:n,index:e,mode:"default",type:"data"})}function yl(s,e){const n=s.controller.index,l=s.vScale&&s.vScale.axis;if(l){e=e||s._parsed;for(const r of e){const c=r._stacks;if(!c||c[l]===void 0||c[l][n]===void 0)return;delete c[l][n],c[l]._visualValues!==void 0&&c[l]._visualValues[n]!==void 0&&delete c[l]._visualValues[n]}}}const ad=s=>s==="reset"||s==="none",fp=(s,e)=>e?s:Object.assign({},s),ZS=(s,e,n)=>s&&!e.hidden&&e._stacked&&{keys:Px(n,!0),values:null};class Mo{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(e,n){this.chart=e,this._ctx=e.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const e=this._cachedMeta;this.configure(),this.linkScales(),e._stacked=td(e.vScale,e),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(e){this.index!==e&&yl(this._cachedMeta),this.index=e}linkScales(){const e=this.chart,n=this._cachedMeta,l=this.getDataset(),r=(y,v,_,w)=>y==="x"?v:y==="r"?w:_,c=n.xAxisID=zt(l.xAxisID,ed(e,"x")),u=n.yAxisID=zt(l.yAxisID,ed(e,"y")),h=n.rAxisID=zt(l.rAxisID,ed(e,"r")),m=n.indexAxis,p=n.iAxisID=r(m,c,u,h),x=n.vAxisID=r(m,u,c,h);n.xScale=this.getScaleForId(c),n.yScale=this.getScaleForId(u),n.rScale=this.getScaleForId(h),n.iScale=this.getScaleForId(p),n.vScale=this.getScaleForId(x)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(e){return this.chart.scales[e]}_getOtherScale(e){const n=this._cachedMeta;return e===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const e=this._cachedMeta;this._data&&Zg(this._data,this),e._stacked&&yl(e)}_dataCheck(){const e=this.getDataset(),n=e.data||(e.data=[]),l=this._data;if(Lt(n)){const r=this._cachedMeta;this._data=VS(n,r)}else if(l!==n){if(l){Zg(l,this);const r=this._cachedMeta;yl(r),r._parsed=[]}n&&Object.isExtensible(n)&&Q1(n,this),this._syncList=[],this._data=n}}addElements(){const e=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(e.dataset=new this.datasetElementType)}buildOrUpdateElements(e){const n=this._cachedMeta,l=this.getDataset();let r=!1;this._dataCheck();const c=n._stacked;n._stacked=td(n.vScale,n),n.stack!==l.stack&&(r=!0,yl(n),n.stack=l.stack),this._resyncElements(e),(r||c!==n._stacked)&&(dp(this,n._parsed),n._stacked=td(n.vScale,n))}configure(){const e=this.chart.config,n=e.datasetScopeKeys(this._type),l=e.getOptionScopes(this.getDataset(),n,!0);this.options=e.createResolver(l,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(e,n){const{_cachedMeta:l,_data:r}=this,{iScale:c,_stacked:u}=l,h=c.axis;let m=e===0&&n===r.length?!0:l._sorted,p=e>0&&l._parsed[e-1],x,y,v;if(this._parsing===!1)l._parsed=r,l._sorted=!0,v=r;else{_e(r[e])?v=this.parseArrayData(l,r,e,n):Lt(r[e])?v=this.parseObjectData(l,r,e,n):v=this.parsePrimitiveData(l,r,e,n);const _=()=>y[h]===null||p&&y[h]<p[h];for(x=0;x<n;++x)l._parsed[x+e]=y=v[x],m&&(_()&&(m=!1),p=y);l._sorted=m}u&&dp(this,v)}parsePrimitiveData(e,n,l,r){const{iScale:c,vScale:u}=e,h=c.axis,m=u.axis,p=c.getLabels(),x=c===u,y=new Array(r);let v,_,w;for(v=0,_=r;v<_;++v)w=v+l,y[v]={[h]:x||c.parse(p[w],w),[m]:u.parse(n[w],w)};return y}parseArrayData(e,n,l,r){const{xScale:c,yScale:u}=e,h=new Array(r);let m,p,x,y;for(m=0,p=r;m<p;++m)x=m+l,y=n[x],h[m]={x:c.parse(y[0],x),y:u.parse(y[1],x)};return h}parseObjectData(e,n,l,r){const{xScale:c,yScale:u}=e,{xAxisKey:h="x",yAxisKey:m="y"}=this._parsing,p=new Array(r);let x,y,v,_;for(x=0,y=r;x<y;++x)v=x+l,_=n[v],p[x]={x:c.parse(sn(_,h),v),y:u.parse(sn(_,m),v)};return p}getParsed(e){return this._cachedMeta._parsed[e]}getDataElement(e){return this._cachedMeta.data[e]}applyStack(e,n,l){const r=this.chart,c=this._cachedMeta,u=n[e.axis],h={keys:Px(r,!0),values:n._stacks[e.axis]._visualValues};return cp(h,u,c.index,{mode:l})}updateRangeFromParsed(e,n,l,r){const c=l[n.axis];let u=c===null?NaN:c;const h=r&&l._stacks[n.axis];r&&h&&(r.values=h,u=cp(r,c,this._cachedMeta.index)),e.min=Math.min(e.min,u),e.max=Math.max(e.max,u)}getMinMax(e,n){const l=this._cachedMeta,r=l._parsed,c=l._sorted&&e===l.iScale,u=r.length,h=this._getOtherScale(e),m=ZS(n,l,this.chart),p={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:x,max:y}=XS(h);let v,_;function w(){_=r[v];const E=_[h.axis];return!Na(_[e.axis])||x>E||y<E}for(v=0;v<u&&!(!w()&&(this.updateRangeFromParsed(p,e,_,m),c));++v);if(c){for(v=u-1;v>=0;--v)if(!w()){this.updateRangeFromParsed(p,e,_,m);break}}return p}getAllParsedValues(e){const n=this._cachedMeta._parsed,l=[];let r,c,u;for(r=0,c=n.length;r<c;++r)u=n[r][e.axis],Na(u)&&l.push(u);return l}getMaxOverflow(){return!1}getLabelAndValue(e){const n=this._cachedMeta,l=n.iScale,r=n.vScale,c=this.getParsed(e);return{label:l?""+l.getLabelForValue(c[l.axis]):"",value:r?""+r.getLabelForValue(c[r.axis]):""}}_update(e){const n=this._cachedMeta;this.update(e||"default"),n._clip=YS(zt(this.options.clip,qS(n.xScale,n.yScale,this.getMaxOverflow())))}update(e){}draw(){const e=this._ctx,n=this.chart,l=this._cachedMeta,r=l.data||[],c=n.chartArea,u=[],h=this._drawStart||0,m=this._drawCount||r.length-h,p=this.options.drawActiveElementsOnTop;let x;for(l.dataset&&l.dataset.draw(e,c,h,m),x=h;x<h+m;++x){const y=r[x];y.hidden||(y.active&&p?u.push(y):y.draw(e,c))}for(x=0;x<u.length;++x)u[x].draw(e,c)}getStyle(e,n){const l=n?"active":"default";return e===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(l):this.resolveDataElementOptions(e||0,l)}getContext(e,n,l){const r=this.getDataset();let c;if(e>=0&&e<this._cachedMeta.data.length){const u=this._cachedMeta.data[e];c=u.$context||(u.$context=QS(this.getContext(),e,u)),c.parsed=this.getParsed(e),c.raw=r.data[e],c.index=c.dataIndex=e}else c=this.$context||(this.$context=$S(this.chart.getContext(),this.index)),c.dataset=r,c.index=c.datasetIndex=this.index;return c.active=!!n,c.mode=l,c}resolveDatasetElementOptions(e){return this._resolveElementOptions(this.datasetElementType.id,e)}resolveDataElementOptions(e,n){return this._resolveElementOptions(this.dataElementType.id,n,e)}_resolveElementOptions(e,n="default",l){const r=n==="active",c=this._cachedDataOpts,u=e+"-"+n,h=c[u],m=this.enableOptionSharing&&Rl(l);if(h)return fp(h,m);const p=this.chart.config,x=p.datasetElementScopeKeys(this._type,e),y=r?[`${e}Hover`,"hover",e,""]:[e,""],v=p.getOptionScopes(this.getDataset(),x),_=Object.keys(le.elements[e]),w=()=>this.getContext(l,r,n),E=p.resolveNamedOptions(v,_,w,y);return E.$shared&&(E.$shared=m,c[u]=Object.freeze(fp(E,m))),E}_resolveAnimations(e,n,l){const r=this.chart,c=this._cachedDataOpts,u=`animation-${n}`,h=c[u];if(h)return h;let m;if(r.options.animation!==!1){const x=this.chart.config,y=x.datasetAnimationScopeKeys(this._type,n),v=x.getOptionScopes(this.getDataset(),y);m=x.createResolver(v,this.getContext(e,l,n))}const p=new Hx(r,m&&m.animations);return m&&m._cacheable&&(c[u]=Object.freeze(p)),p}getSharedOptions(e){if(e.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},e))}includeOptions(e,n){return!n||ad(e)||this.chart._animationsDisabled}_getSharedOptions(e,n){const l=this.resolveDataElementOptions(e,n),r=this._sharedOptions,c=this.getSharedOptions(l),u=this.includeOptions(n,c)||c!==r;return this.updateSharedOptions(c,n,l),{sharedOptions:c,includeOptions:u}}updateElement(e,n,l,r){ad(r)?Object.assign(e,l):this._resolveAnimations(n,r).update(e,l)}updateSharedOptions(e,n,l){e&&!ad(n)&&this._resolveAnimations(void 0,n).update(e,l)}_setStyle(e,n,l,r){e.active=r;const c=this.getStyle(n,r);this._resolveAnimations(n,l,r).update(e,{options:!r&&this.getSharedOptions(c)||c})}removeHoverStyle(e,n,l){this._setStyle(e,l,"active",!1)}setHoverStyle(e,n,l){this._setStyle(e,l,"active",!0)}_removeDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!1)}_setDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!0)}_resyncElements(e){const n=this._data,l=this._cachedMeta.data;for(const[h,m,p]of this._syncList)this[h](m,p);this._syncList=[];const r=l.length,c=n.length,u=Math.min(c,r);u&&this.parse(0,u),c>r?this._insertElements(r,c-r,e):c<r&&this._removeElements(c,r-c)}_insertElements(e,n,l=!0){const r=this._cachedMeta,c=r.data,u=e+n;let h;const m=p=>{for(p.length+=n,h=p.length-1;h>=u;h--)p[h]=p[h-n]};for(m(c),h=e;h<u;++h)c[h]=new this.dataElementType;this._parsing&&m(r._parsed),this.parse(e,n),l&&this.updateElements(c,e,n,"reset")}updateElements(e,n,l,r){}_removeElements(e,n){const l=this._cachedMeta;if(this._parsing){const r=l._parsed.splice(e,n);l._stacked&&yl(l,r)}l.data.splice(e,n)}_sync(e){if(this._parsing)this._syncList.push(e);else{const[n,l,r]=e;this[n](l,r)}this.chart._dataChanges.push([this.index,...e])}_onDataPush(){const e=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-e,e])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(e,n){n&&this._sync(["_removeElements",e,n]);const l=arguments.length-2;l&&this._sync(["_insertElements",e,l])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function KS(s,e){if(!s._cache.$bar){const n=s.getMatchingVisibleMetas(e);let l=[];for(let r=0,c=n.length;r<c;r++)l=l.concat(n[r].controller.getAllParsedValues(s));s._cache.$bar=Nx(l.sort((r,c)=>r-c))}return s._cache.$bar}function WS(s){const e=s.iScale,n=KS(e,s.type);let l=e._length,r,c,u,h;const m=()=>{u===32767||u===-32768||(Rl(h)&&(l=Math.min(l,Math.abs(u-h)||l)),h=u)};for(r=0,c=n.length;r<c;++r)u=e.getPixelForValue(n[r]),m();for(h=void 0,r=0,c=e.ticks.length;r<c;++r)u=e.getPixelForTick(r),m();return l}function JS(s,e,n,l){const r=n.barThickness;let c,u;return Jt(r)?(c=e.min*n.categoryPercentage,u=n.barPercentage):(c=r*l,u=1),{chunk:c/l,ratio:u,start:e.pixels[s]-c/2}}function IS(s,e,n,l){const r=e.pixels,c=r[s];let u=s>0?r[s-1]:null,h=s<r.length-1?r[s+1]:null;const m=n.categoryPercentage;u===null&&(u=c-(h===null?e.end-e.start:h-c)),h===null&&(h=c+c-u);const p=c-(c-Math.min(u,h))/2*m;return{chunk:Math.abs(h-u)/2*m/l,ratio:n.barPercentage,start:p}}function t_(s,e,n,l){const r=n.parse(s[0],l),c=n.parse(s[1],l),u=Math.min(r,c),h=Math.max(r,c);let m=u,p=h;Math.abs(u)>Math.abs(h)&&(m=h,p=u),e[n.axis]=p,e._custom={barStart:m,barEnd:p,start:r,end:c,min:u,max:h}}function qx(s,e,n,l){return _e(s)?t_(s,e,n,l):e[n.axis]=n.parse(s,l),e}function hp(s,e,n,l){const r=s.iScale,c=s.vScale,u=r.getLabels(),h=r===c,m=[];let p,x,y,v;for(p=n,x=n+l;p<x;++p)v=e[p],y={},y[r.axis]=h||r.parse(u[p],p),m.push(qx(v,y,c,p));return m}function sd(s){return s&&s.barStart!==void 0&&s.barEnd!==void 0}function e_(s,e,n){return s!==0?an(s):(e.isHorizontal()?1:-1)*(e.min>=n?1:-1)}function a_(s){let e,n,l,r,c;return s.horizontal?(e=s.base>s.x,n="left",l="right"):(e=s.base<s.y,n="bottom",l="top"),e?(r="end",c="start"):(r="start",c="end"),{start:n,end:l,reverse:e,top:r,bottom:c}}function s_(s,e,n,l){let r=e.borderSkipped;const c={};if(!r){s.borderSkipped=c;return}if(r===!0){s.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:u,end:h,reverse:m,top:p,bottom:x}=a_(s);r==="middle"&&n&&(s.enableBorderRadius=!0,(n._top||0)===l?r=p:(n._bottom||0)===l?r=x:(c[mp(x,u,h,m)]=!0,r=p)),c[mp(r,u,h,m)]=!0,s.borderSkipped=c}function mp(s,e,n,l){return l?(s=n_(s,e,n),s=gp(s,n,e)):s=gp(s,e,n),s}function n_(s,e,n){return s===e?n:s===n?e:s}function gp(s,e,n){return s==="start"?e:s==="end"?n:s}function i_(s,{inflateAmount:e},n){s.inflateAmount=e==="auto"?n===1?.33:0:e}class l_ extends Mo{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(e,n,l,r){return hp(e,n,l,r)}parseArrayData(e,n,l,r){return hp(e,n,l,r)}parseObjectData(e,n,l,r){const{iScale:c,vScale:u}=e,{xAxisKey:h="x",yAxisKey:m="y"}=this._parsing,p=c.axis==="x"?h:m,x=u.axis==="x"?h:m,y=[];let v,_,w,E;for(v=l,_=l+r;v<_;++v)E=n[v],w={},w[c.axis]=c.parse(sn(E,p),v),y.push(qx(sn(E,x),w,u,v));return y}updateRangeFromParsed(e,n,l,r){super.updateRangeFromParsed(e,n,l,r);const c=l._custom;c&&n===this._cachedMeta.vScale&&(e.min=Math.min(e.min,c.min),e.max=Math.max(e.max,c.max))}getMaxOverflow(){return 0}getLabelAndValue(e){const n=this._cachedMeta,{iScale:l,vScale:r}=n,c=this.getParsed(e),u=c._custom,h=sd(u)?"["+u.start+", "+u.end+"]":""+r.getLabelForValue(c[r.axis]);return{label:""+l.getLabelForValue(c[l.axis]),value:h}}initialize(){this.enableOptionSharing=!0,super.initialize();const e=this._cachedMeta;e.stack=this.getDataset().stack}update(e){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,e)}updateElements(e,n,l,r){const c=r==="reset",{index:u,_cachedMeta:{vScale:h}}=this,m=h.getBasePixel(),p=h.isHorizontal(),x=this._getRuler(),{sharedOptions:y,includeOptions:v}=this._getSharedOptions(n,r);for(let _=n;_<n+l;_++){const w=this.getParsed(_),E=c||Jt(w[h.axis])?{base:m,head:m}:this._calculateBarValuePixels(_),T=this._calculateBarIndexPixels(_,x),M=(w._stacks||{})[h.axis],O={horizontal:p,base:E.base,enableBorderRadius:!M||sd(w._custom)||u===M._top||u===M._bottom,x:p?E.head:T.center,y:p?T.center:E.head,height:p?T.size:Math.abs(E.size),width:p?Math.abs(E.size):T.size};v&&(O.options=y||this.resolveDataElementOptions(_,e[_].active?"active":r));const V=O.options||e[_].options;s_(O,V,M,u),i_(O,V,x.ratio),this.updateElement(e[_],_,O,r)}}_getStacks(e,n){const{iScale:l}=this._cachedMeta,r=l.getMatchingVisibleMetas(this._type).filter(x=>x.controller.options.grouped),c=l.options.stacked,u=[],h=this._cachedMeta.controller.getParsed(n),m=h&&h[l.axis],p=x=>{const y=x._parsed.find(_=>_[l.axis]===m),v=y&&y[x.vScale.axis];if(Jt(v)||isNaN(v))return!0};for(const x of r)if(!(n!==void 0&&p(x))&&((c===!1||u.indexOf(x.stack)===-1||c===void 0&&x.stack===void 0)&&u.push(x.stack),x.index===e))break;return u.length||u.push(void 0),u}_getStackCount(e){return this._getStacks(void 0,e).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const e=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(e).filter(l=>e[l].axis===n).shift()}_getAxis(){const e={},n=this.getFirstScaleIdForIndexAxis();for(const l of this.chart.data.datasets)e[zt(this.chart.options.indexAxis==="x"?l.xAxisID:l.yAxisID,n)]=!0;return Object.keys(e)}_getStackIndex(e,n,l){const r=this._getStacks(e,l),c=n!==void 0?r.indexOf(n):-1;return c===-1?r.length-1:c}_getRuler(){const e=this.options,n=this._cachedMeta,l=n.iScale,r=[];let c,u;for(c=0,u=n.data.length;c<u;++c)r.push(l.getPixelForValue(this.getParsed(c)[l.axis],c));const h=e.barThickness;return{min:h||WS(n),pixels:r,start:l._startPixel,end:l._endPixel,stackCount:this._getStackCount(),scale:l,grouped:e.grouped,ratio:h?1:e.categoryPercentage*e.barPercentage}}_calculateBarValuePixels(e){const{_cachedMeta:{vScale:n,_stacked:l,index:r},options:{base:c,minBarLength:u}}=this,h=c||0,m=this.getParsed(e),p=m._custom,x=sd(p);let y=m[n.axis],v=0,_=l?this.applyStack(n,m,l):y,w,E;_!==y&&(v=_-y,_=y),x&&(y=p.barStart,_=p.barEnd-p.barStart,y!==0&&an(y)!==an(p.barEnd)&&(v=0),v+=y);const T=!Jt(c)&&!x?c:v;let M=n.getPixelForValue(T);if(this.chart.getDataVisibility(e)?w=n.getPixelForValue(v+_):w=M,E=w-M,Math.abs(E)<u){E=e_(E,n,h)*u,y===h&&(M-=E/2);const O=n.getPixelForDecimal(0),V=n.getPixelForDecimal(1),K=Math.min(O,V),Y=Math.max(O,V);M=Math.max(Math.min(M,Y),K),w=M+E,l&&!x&&(m._stacks[n.axis]._visualValues[r]=n.getValueForPixel(w)-n.getValueForPixel(M))}if(M===n.getPixelForValue(h)){const O=an(E)*n.getLineWidthForValue(h)/2;M+=O,E-=O}return{size:E,base:M,head:w,center:w+E/2}}_calculateBarIndexPixels(e,n){const l=n.scale,r=this.options,c=r.skipNull,u=zt(r.maxBarThickness,1/0);let h,m;const p=this._getAxisCount();if(n.grouped){const x=c?this._getStackCount(e):n.stackCount,y=r.barThickness==="flex"?IS(e,n,r,x*p):JS(e,n,r,x*p),v=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,_=this._getAxis().indexOf(zt(v,this.getFirstScaleIdForIndexAxis())),w=this._getStackIndex(this.index,this._cachedMeta.stack,c?e:void 0)+_;h=y.start+y.chunk*w+y.chunk/2,m=Math.min(u,y.chunk*y.ratio)}else h=l.getPixelForValue(this.getParsed(e)[l.axis],e),m=Math.min(u,n.min*n.ratio);return{base:h-m/2,head:h+m/2,center:h,size:m}}draw(){const e=this._cachedMeta,n=e.vScale,l=e.data,r=l.length;let c=0;for(;c<r;++c)this.getParsed(c)[n.axis]!==null&&!l[c].hidden&&l[c].draw(this._ctx)}}function r_(s,e,n){let l=1,r=1,c=0,u=0;if(e<be){const h=s,m=h+e,p=Math.cos(h),x=Math.sin(h),y=Math.cos(m),v=Math.sin(m),_=(V,K,Y)=>So(V,h,m,!0)?1:Math.max(K,K*n,Y,Y*n),w=(V,K,Y)=>So(V,h,m,!0)?-1:Math.min(K,K*n,Y,Y*n),E=_(0,p,y),T=_(je,x,v),M=w(Zt,p,y),O=w(Zt+je,x,v);l=(E-M)/2,r=(T-O)/2,c=-(E+M)/2,u=-(T+O)/2}return{ratioX:l,ratioY:r,offsetX:c,offsetY:u}}class Yx extends Mo{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:e=>e!=="spacing",_indexable:e=>e!=="spacing"&&!e.startsWith("borderDash")&&!e.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){const n=e.data,{labels:{pointStyle:l,textAlign:r,color:c,useBorderRadius:u,borderRadius:h}}=e.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((m,p)=>{const y=e.getDatasetMeta(0).controller.getStyle(p);return{text:m,fillStyle:y.backgroundColor,fontColor:c,hidden:!e.getDataVisibility(p),lineDash:y.borderDash,lineDashOffset:y.borderDashOffset,lineJoin:y.borderJoinStyle,lineWidth:y.borderWidth,strokeStyle:y.borderColor,textAlign:r,pointStyle:l,borderRadius:u&&(h||y.borderRadius),index:p}}):[]}},onClick(e,n,l){l.chart.toggleDataVisibility(n.index),l.chart.update()}}}};constructor(e,n){super(e,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(e,n){const l=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=l;else{let c=m=>+l[m];if(Lt(l[e])){const{key:m="value"}=this._parsing;c=p=>+sn(l[p],m)}let u,h;for(u=e,h=e+n;u<h;++u)r._parsed[u]=c(u)}}_getRotation(){return es(this.options.rotation-90)}_getCircumference(){return es(this.options.circumference)}_getRotationExtents(){let e=be,n=-be;for(let l=0;l<this.chart.data.datasets.length;++l)if(this.chart.isDatasetVisible(l)&&this.chart.getDatasetMeta(l).type===this._type){const r=this.chart.getDatasetMeta(l).controller,c=r._getRotation(),u=r._getCircumference();e=Math.min(e,c),n=Math.max(n,c+u)}return{rotation:e,circumference:n-e}}update(e){const n=this.chart,{chartArea:l}=n,r=this._cachedMeta,c=r.data,u=this.getMaxBorderWidth()+this.getMaxOffset(c)+this.options.spacing,h=Math.max((Math.min(l.width,l.height)-u)/2,0),m=Math.min(D1(this.options.cutout,h),1),p=this._getRingWeight(this.index),{circumference:x,rotation:y}=this._getRotationExtents(),{ratioX:v,ratioY:_,offsetX:w,offsetY:E}=r_(y,x,m),T=(l.width-u)/v,M=(l.height-u)/_,O=Math.max(Math.min(T,M)/2,0),V=vx(this.options.radius,O),K=Math.max(V*m,0),Y=(V-K)/this._getVisibleDatasetWeightTotal();this.offsetX=w*V,this.offsetY=E*V,r.total=this.calculateTotal(),this.outerRadius=V-Y*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-Y*p,0),this.updateElements(c,0,c.length,e)}_circumference(e,n){const l=this.options,r=this._cachedMeta,c=this._getCircumference();return n&&l.animation.animateRotate||!this.chart.getDataVisibility(e)||r._parsed[e]===null||r.data[e].hidden?0:this.calculateCircumference(r._parsed[e]*c/be)}updateElements(e,n,l,r){const c=r==="reset",u=this.chart,h=u.chartArea,p=u.options.animation,x=(h.left+h.right)/2,y=(h.top+h.bottom)/2,v=c&&p.animateScale,_=v?0:this.innerRadius,w=v?0:this.outerRadius,{sharedOptions:E,includeOptions:T}=this._getSharedOptions(n,r);let M=this._getRotation(),O;for(O=0;O<n;++O)M+=this._circumference(O,c);for(O=n;O<n+l;++O){const V=this._circumference(O,c),K=e[O],Y={x:x+this.offsetX,y:y+this.offsetY,startAngle:M,endAngle:M+V,circumference:V,outerRadius:w,innerRadius:_};T&&(Y.options=E||this.resolveDataElementOptions(O,K.active?"active":r)),M+=V,this.updateElement(K,O,Y,r)}}calculateTotal(){const e=this._cachedMeta,n=e.data;let l=0,r;for(r=0;r<n.length;r++){const c=e._parsed[r];c!==null&&!isNaN(c)&&this.chart.getDataVisibility(r)&&!n[r].hidden&&(l+=Math.abs(c))}return l}calculateCircumference(e){const n=this._cachedMeta.total;return n>0&&!isNaN(e)?be*(Math.abs(e)/n):0}getLabelAndValue(e){const n=this._cachedMeta,l=this.chart,r=l.data.labels||[],c=Ao(n._parsed[e],l.options.locale);return{label:r[e]||"",value:c}}getMaxBorderWidth(e){let n=0;const l=this.chart;let r,c,u,h,m;if(!e){for(r=0,c=l.data.datasets.length;r<c;++r)if(l.isDatasetVisible(r)){u=l.getDatasetMeta(r),e=u.data,h=u.controller;break}}if(!e)return 0;for(r=0,c=e.length;r<c;++r)m=h.resolveDataElementOptions(r),m.borderAlign!=="inner"&&(n=Math.max(n,m.borderWidth||0,m.hoverBorderWidth||0));return n}getMaxOffset(e){let n=0;for(let l=0,r=e.length;l<r;++l){const c=this.resolveDataElementOptions(l);n=Math.max(n,c.offset||0,c.hoverOffset||0)}return n}_getRingWeightOffset(e){let n=0;for(let l=0;l<e;++l)this.chart.isDatasetVisible(l)&&(n+=this._getRingWeight(l));return n}_getRingWeight(e){return Math.max(zt(this.chart.data.datasets[e].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class o_ extends Mo{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){const n=e.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:l,color:r}}=e.legend.options;return n.labels.map((c,u)=>{const m=e.getDatasetMeta(0).controller.getStyle(u);return{text:c,fillStyle:m.backgroundColor,strokeStyle:m.borderColor,fontColor:r,lineWidth:m.borderWidth,pointStyle:l,hidden:!e.getDataVisibility(u),index:u}})}return[]}},onClick(e,n,l){l.chart.toggleDataVisibility(n.index),l.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(e,n){super(e,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(e){const n=this._cachedMeta,l=this.chart,r=l.data.labels||[],c=Ao(n._parsed[e].r,l.options.locale);return{label:r[e]||"",value:c}}parseObjectData(e,n,l,r){return wS.bind(this)(e,n,l,r)}update(e){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,e)}getMinMax(){const e=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return e.data.forEach((l,r)=>{const c=this.getParsed(r).r;!isNaN(c)&&this.chart.getDataVisibility(r)&&(c<n.min&&(n.min=c),c>n.max&&(n.max=c))}),n}_updateRadius(){const e=this.chart,n=e.chartArea,l=e.options,r=Math.min(n.right-n.left,n.bottom-n.top),c=Math.max(r/2,0),u=Math.max(l.cutoutPercentage?c/100*l.cutoutPercentage:1,0),h=(c-u)/e.getVisibleDatasetCount();this.outerRadius=c-h*this.index,this.innerRadius=this.outerRadius-h}updateElements(e,n,l,r){const c=r==="reset",u=this.chart,m=u.options.animation,p=this._cachedMeta.rScale,x=p.xCenter,y=p.yCenter,v=p.getIndexAngle(0)-.5*Zt;let _=v,w;const E=360/this.countVisibleElements();for(w=0;w<n;++w)_+=this._computeAngle(w,r,E);for(w=n;w<n+l;w++){const T=e[w];let M=_,O=_+this._computeAngle(w,r,E),V=u.getDataVisibility(w)?p.getDistanceFromCenterForValue(this.getParsed(w).r):0;_=O,c&&(m.animateScale&&(V=0),m.animateRotate&&(M=O=v));const K={x,y,innerRadius:0,outerRadius:V,startAngle:M,endAngle:O,options:this.resolveDataElementOptions(w,T.active?"active":r)};this.updateElement(T,w,K,r)}}countVisibleElements(){const e=this._cachedMeta;let n=0;return e.data.forEach((l,r)=>{!isNaN(this.getParsed(r).r)&&this.chart.getDataVisibility(r)&&n++}),n}_computeAngle(e,n,l){return this.chart.getDataVisibility(e)?es(this.resolveDataElementOptions(e,n).angle||l):0}}class c_ extends Yx{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}}function En(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Hd{static override(e){Object.assign(Hd.prototype,e)}options;constructor(e){this.options=e||{}}init(){}formats(){return En()}parse(){return En()}format(){return En()}add(){return En()}diff(){return En()}startOf(){return En()}endOf(){return En()}}var u_={_date:Hd};function d_(s,e,n,l){const{controller:r,data:c,_sorted:u}=s,h=r._cachedMeta.iScale,m=s.dataset&&s.dataset.options?s.dataset.options.spanGaps:null;if(h&&e===h.axis&&e!=="r"&&u&&c.length){const p=h._reversePixels?G1:fd;if(l){if(r._sharedOptions){const x=c[0],y=typeof x.getRange=="function"&&x.getRange(e);if(y){const v=p(c,e,n-y),_=p(c,e,n+y);return{lo:v.lo,hi:_.hi}}}}else{const x=p(c,e,n);if(m){const{vScale:y}=r._cachedMeta,{_parsed:v}=s,_=v.slice(0,x.lo+1).reverse().findIndex(E=>!Jt(E[y.axis]));x.lo-=Math.max(0,_);const w=v.slice(x.hi).findIndex(E=>!Jt(E[y.axis]));x.hi+=Math.max(0,w)}return x}}return{lo:0,hi:c.length-1}}function Do(s,e,n,l,r){const c=s.getSortedVisibleDatasetMetas(),u=n[e];for(let h=0,m=c.length;h<m;++h){const{index:p,data:x}=c[h],{lo:y,hi:v}=d_(c[h],e,u,r);for(let _=y;_<=v;++_){const w=x[_];w.skip||l(w,p,_)}}}function f_(s){const e=s.indexOf("x")!==-1,n=s.indexOf("y")!==-1;return function(l,r){const c=e?Math.abs(l.x-r.x):0,u=n?Math.abs(l.y-r.y):0;return Math.sqrt(Math.pow(c,2)+Math.pow(u,2))}}function nd(s,e,n,l,r){const c=[];return!r&&!s.isPointInArea(e)||Do(s,n,e,function(h,m,p){!r&&!Mx(h,s.chartArea,0)||h.inRange(e.x,e.y,l)&&c.push({element:h,datasetIndex:m,index:p})},!0),c}function h_(s,e,n,l){let r=[];function c(u,h,m){const{startAngle:p,endAngle:x}=u.getProps(["startAngle","endAngle"],l),{angle:y}=jx(u,{x:e.x,y:e.y});So(y,p,x)&&r.push({element:u,datasetIndex:h,index:m})}return Do(s,n,e,c),r}function m_(s,e,n,l,r,c){let u=[];const h=f_(n);let m=Number.POSITIVE_INFINITY;function p(x,y,v){const _=x.inRange(e.x,e.y,r);if(l&&!_)return;const w=x.getCenterPoint(r);if(!(!!c||s.isPointInArea(w))&&!_)return;const T=h(e,w);T<m?(u=[{element:x,datasetIndex:y,index:v}],m=T):T===m&&u.push({element:x,datasetIndex:y,index:v})}return Do(s,n,e,p),u}function id(s,e,n,l,r,c){return!c&&!s.isPointInArea(e)?[]:n==="r"&&!l?h_(s,e,n,r):m_(s,e,n,l,r,c)}function pp(s,e,n,l,r){const c=[],u=n==="x"?"inXRange":"inYRange";let h=!1;return Do(s,n,e,(m,p,x)=>{m[u]&&m[u](e[n],r)&&(c.push({element:m,datasetIndex:p,index:x}),h=h||m.inRange(e.x,e.y,r))}),l&&!h?[]:c}var g_={modes:{index(s,e,n,l){const r=Tn(e,s),c=n.axis||"x",u=n.includeInvisible||!1,h=n.intersect?nd(s,r,c,l,u):id(s,r,c,!1,l,u),m=[];return h.length?(s.getSortedVisibleDatasetMetas().forEach(p=>{const x=h[0].index,y=p.data[x];y&&!y.skip&&m.push({element:y,datasetIndex:p.index,index:x})}),m):[]},dataset(s,e,n,l){const r=Tn(e,s),c=n.axis||"xy",u=n.includeInvisible||!1;let h=n.intersect?nd(s,r,c,l,u):id(s,r,c,!1,l,u);if(h.length>0){const m=h[0].datasetIndex,p=s.getDatasetMeta(m).data;h=[];for(let x=0;x<p.length;++x)h.push({element:p[x],datasetIndex:m,index:x})}return h},point(s,e,n,l){const r=Tn(e,s),c=n.axis||"xy",u=n.includeInvisible||!1;return nd(s,r,c,l,u)},nearest(s,e,n,l){const r=Tn(e,s),c=n.axis||"xy",u=n.includeInvisible||!1;return id(s,r,c,n.intersect,l,u)},x(s,e,n,l){const r=Tn(e,s);return pp(s,r,"x",n.intersect,l)},y(s,e,n,l){const r=Tn(e,s);return pp(s,r,"y",n.intersect,l)}}};const Vx=["left","top","right","bottom"];function vl(s,e){return s.filter(n=>n.pos===e)}function xp(s,e){return s.filter(n=>Vx.indexOf(n.pos)===-1&&n.box.axis===e)}function Sl(s,e){return s.sort((n,l)=>{const r=e?l:n,c=e?n:l;return r.weight===c.weight?r.index-c.index:r.weight-c.weight})}function p_(s){const e=[];let n,l,r,c,u,h;for(n=0,l=(s||[]).length;n<l;++n)r=s[n],{position:c,options:{stack:u,stackWeight:h=1}}=r,e.push({index:n,box:r,pos:c,horizontal:r.isHorizontal(),weight:r.weight,stack:u&&c+u,stackWeight:h});return e}function x_(s){const e={};for(const n of s){const{stack:l,pos:r,stackWeight:c}=n;if(!l||!Vx.includes(r))continue;const u=e[l]||(e[l]={count:0,placed:0,weight:0,size:0});u.count++,u.weight+=c}return e}function b_(s,e){const n=x_(s),{vBoxMaxWidth:l,hBoxMaxHeight:r}=e;let c,u,h;for(c=0,u=s.length;c<u;++c){h=s[c];const{fullSize:m}=h.box,p=n[h.stack],x=p&&h.stackWeight/p.weight;h.horizontal?(h.width=x?x*l:m&&e.availableWidth,h.height=r):(h.width=l,h.height=x?x*r:m&&e.availableHeight)}return n}function y_(s){const e=p_(s),n=Sl(e.filter(p=>p.box.fullSize),!0),l=Sl(vl(e,"left"),!0),r=Sl(vl(e,"right")),c=Sl(vl(e,"top"),!0),u=Sl(vl(e,"bottom")),h=xp(e,"x"),m=xp(e,"y");return{fullSize:n,leftAndTop:l.concat(c),rightAndBottom:r.concat(m).concat(u).concat(h),chartArea:vl(e,"chartArea"),vertical:l.concat(r).concat(m),horizontal:c.concat(u).concat(h)}}function bp(s,e,n,l){return Math.max(s[n],e[n])+Math.max(s[l],e[l])}function Fx(s,e){s.top=Math.max(s.top,e.top),s.left=Math.max(s.left,e.left),s.bottom=Math.max(s.bottom,e.bottom),s.right=Math.max(s.right,e.right)}function v_(s,e,n,l){const{pos:r,box:c}=n,u=s.maxPadding;if(!Lt(r)){n.size&&(s[r]-=n.size);const y=l[n.stack]||{size:0,count:1};y.size=Math.max(y.size,n.horizontal?c.height:c.width),n.size=y.size/y.count,s[r]+=n.size}c.getPadding&&Fx(u,c.getPadding());const h=Math.max(0,e.outerWidth-bp(u,s,"left","right")),m=Math.max(0,e.outerHeight-bp(u,s,"top","bottom")),p=h!==s.w,x=m!==s.h;return s.w=h,s.h=m,n.horizontal?{same:p,other:x}:{same:x,other:p}}function S_(s){const e=s.maxPadding;function n(l){const r=Math.max(e[l]-s[l],0);return s[l]+=r,r}s.y+=n("top"),s.x+=n("left"),n("right"),n("bottom")}function __(s,e){const n=e.maxPadding;function l(r){const c={left:0,top:0,right:0,bottom:0};return r.forEach(u=>{c[u]=Math.max(e[u],n[u])}),c}return l(s?["left","right"]:["top","bottom"])}function Nl(s,e,n,l){const r=[];let c,u,h,m,p,x;for(c=0,u=s.length,p=0;c<u;++c){h=s[c],m=h.box,m.update(h.width||e.w,h.height||e.h,__(h.horizontal,e));const{same:y,other:v}=v_(e,n,h,l);p|=y&&r.length,x=x||v,m.fullSize||r.push(h)}return p&&Nl(r,e,n,l)||x}function so(s,e,n,l,r){s.top=n,s.left=e,s.right=e+l,s.bottom=n+r,s.width=l,s.height=r}function yp(s,e,n,l){const r=n.padding;let{x:c,y:u}=e;for(const h of s){const m=h.box,p=l[h.stack]||{placed:0,weight:1},x=h.stackWeight/p.weight||1;if(h.horizontal){const y=e.w*x,v=p.size||m.height;Rl(p.start)&&(u=p.start),m.fullSize?so(m,r.left,u,n.outerWidth-r.right-r.left,v):so(m,e.left+p.placed,u,y,v),p.start=u,p.placed+=y,u=m.bottom}else{const y=e.h*x,v=p.size||m.width;Rl(p.start)&&(c=p.start),m.fullSize?so(m,c,r.top,v,n.outerHeight-r.bottom-r.top):so(m,c,e.top+p.placed,v,y),p.start=c,p.placed+=y,c=m.right}}e.x=c,e.y=u}var wa={addBox(s,e){s.boxes||(s.boxes=[]),e.fullSize=e.fullSize||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw(n){e.draw(n)}}]},s.boxes.push(e)},removeBox(s,e){const n=s.boxes?s.boxes.indexOf(e):-1;n!==-1&&s.boxes.splice(n,1)},configure(s,e,n){e.fullSize=n.fullSize,e.position=n.position,e.weight=n.weight},update(s,e,n,l){if(!s)return;const r=Ea(s.options.layout.padding),c=Math.max(e-r.width,0),u=Math.max(n-r.height,0),h=y_(s.boxes),m=h.vertical,p=h.horizontal;Vt(s.boxes,E=>{typeof E.beforeLayout=="function"&&E.beforeLayout()});const x=m.reduce((E,T)=>T.box.options&&T.box.options.display===!1?E:E+1,0)||1,y=Object.freeze({outerWidth:e,outerHeight:n,padding:r,availableWidth:c,availableHeight:u,vBoxMaxWidth:c/2/x,hBoxMaxHeight:u/2}),v=Object.assign({},r);Fx(v,Ea(l));const _=Object.assign({maxPadding:v,w:c,h:u,x:r.left,y:r.top},r),w=b_(m.concat(p),y);Nl(h.fullSize,_,y,w),Nl(m,_,y,w),Nl(p,_,y,w)&&Nl(m,_,y,w),S_(_),yp(h.leftAndTop,_,y,w),_.x+=_.w,_.y+=_.h,yp(h.rightAndBottom,_,y,w),s.chartArea={left:_.left,top:_.top,right:_.left+_.w,bottom:_.top+_.h,height:_.h,width:_.w},Vt(h.chartArea,E=>{const T=E.box;Object.assign(T,s.chartArea),T.update(_.w,_.h,{left:0,top:0,right:0,bottom:0})})}};class Xx{acquireContext(e,n){}releaseContext(e){return!1}addEventListener(e,n,l){}removeEventListener(e,n,l){}getDevicePixelRatio(){return 1}getMaximumSize(e,n,l,r){return n=Math.max(0,n||e.width),l=l||e.height,{width:n,height:Math.max(0,r?Math.floor(n/r):l)}}isAttached(e){return!0}updateConfig(e){}}class j_ extends Xx{acquireContext(e){return e&&e.getContext&&e.getContext("2d")||null}updateConfig(e){e.options.animation=!1}}const mo="$chartjs",w_={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},vp=s=>s===null||s==="";function N_(s,e){const n=s.style,l=s.getAttribute("height"),r=s.getAttribute("width");if(s[mo]={initial:{height:l,width:r,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",vp(r)){const c=lp(s,"width");c!==void 0&&(s.width=c)}if(vp(l))if(s.style.height==="")s.height=s.width/(e||2);else{const c=lp(s,"height");c!==void 0&&(s.height=c)}return s}const Gx=MS?{passive:!0}:!1;function E_(s,e,n){s&&s.addEventListener(e,n,Gx)}function T_(s,e,n){s&&s.canvas&&s.canvas.removeEventListener(e,n,Gx)}function k_(s,e){const n=w_[s.type]||s.type,{x:l,y:r}=Tn(s,e);return{type:n,chart:e,native:s,x:l!==void 0?l:null,y:r!==void 0?r:null}}function wo(s,e){for(const n of s)if(n===e||n.contains(e))return!0}function A_(s,e,n){const l=s.canvas,r=new MutationObserver(c=>{let u=!1;for(const h of c)u=u||wo(h.addedNodes,l),u=u&&!wo(h.removedNodes,l);u&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}function C_(s,e,n){const l=s.canvas,r=new MutationObserver(c=>{let u=!1;for(const h of c)u=u||wo(h.removedNodes,l),u=u&&!wo(h.addedNodes,l);u&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}const zl=new Map;let Sp=0;function $x(){const s=window.devicePixelRatio;s!==Sp&&(Sp=s,zl.forEach((e,n)=>{n.currentDevicePixelRatio!==s&&e()}))}function M_(s,e){zl.size||window.addEventListener("resize",$x),zl.set(s,e)}function D_(s){zl.delete(s),zl.size||window.removeEventListener("resize",$x)}function R_(s,e,n){const l=s.canvas,r=l&&Ud(l);if(!r)return;const c=Tx((h,m)=>{const p=r.clientWidth;n(h,m),p<r.clientWidth&&n()},window),u=new ResizeObserver(h=>{const m=h[0],p=m.contentRect.width,x=m.contentRect.height;p===0&&x===0||c(p,x)});return u.observe(r),M_(s,c),u}function ld(s,e,n){n&&n.disconnect(),e==="resize"&&D_(s)}function O_(s,e,n){const l=s.canvas,r=Tx(c=>{s.ctx!==null&&n(k_(c,s))},s);return E_(l,e,r),r}class z_ extends Xx{acquireContext(e,n){const l=e&&e.getContext&&e.getContext("2d");return l&&l.canvas===e?(N_(e,n),l):null}releaseContext(e){const n=e.canvas;if(!n[mo])return!1;const l=n[mo].initial;["height","width"].forEach(c=>{const u=l[c];Jt(u)?n.removeAttribute(c):n.setAttribute(c,u)});const r=l.style||{};return Object.keys(r).forEach(c=>{n.style[c]=r[c]}),n.width=n.width,delete n[mo],!0}addEventListener(e,n,l){this.removeEventListener(e,n);const r=e.$proxies||(e.$proxies={}),u={attach:A_,detach:C_,resize:R_}[n]||O_;r[n]=u(e,n,l)}removeEventListener(e,n){const l=e.$proxies||(e.$proxies={}),r=l[n];if(!r)return;({attach:ld,detach:ld,resize:ld}[n]||T_)(e,n,r),l[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(e,n,l,r){return CS(e,n,l,r)}isAttached(e){const n=e&&Ud(e);return!!(n&&n.isConnected)}}function L_(s){return!Bd()||typeof OffscreenCanvas<"u"&&s instanceof OffscreenCanvas?j_:z_}class Mn{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(e){const{x:n,y:l}=this.getProps(["x","y"],e);return{x:n,y:l}}hasValue(){return vo(this.x)&&vo(this.y)}getProps(e,n){const l=this.$animations;if(!n||!l)return this;const r={};return e.forEach(c=>{r[c]=l[c]&&l[c].active()?l[c]._to:this[c]}),r}}function B_(s,e){const n=s.options.ticks,l=U_(s),r=Math.min(n.maxTicksLimit||l,l),c=n.major.enabled?P_(e):[],u=c.length,h=c[0],m=c[u-1],p=[];if(u>r)return q_(e,p,c,u/r),p;const x=H_(c,e,r);if(u>0){let y,v;const _=u>1?Math.round((m-h)/(u-1)):null;for(no(e,p,x,Jt(_)?0:h-_,h),y=0,v=u-1;y<v;y++)no(e,p,x,c[y],c[y+1]);return no(e,p,x,m,Jt(_)?e.length:m+_),p}return no(e,p,x),p}function U_(s){const e=s.options.offset,n=s._tickSize(),l=s._length/n+(e?0:1),r=s._maxLength/n;return Math.floor(Math.min(l,r))}function H_(s,e,n){const l=Y_(s),r=e.length/n;if(!l)return Math.max(r,1);const c=H1(l);for(let u=0,h=c.length-1;u<h;u++){const m=c[u];if(m>r)return m}return Math.max(r,1)}function P_(s){const e=[];let n,l;for(n=0,l=s.length;n<l;n++)s[n].major&&e.push(n);return e}function q_(s,e,n,l){let r=0,c=n[0],u;for(l=Math.ceil(l),u=0;u<s.length;u++)u===c&&(e.push(s[u]),r++,c=n[r*l])}function no(s,e,n,l,r){const c=zt(l,0),u=Math.min(zt(r,s.length),s.length);let h=0,m,p,x;for(n=Math.ceil(n),r&&(m=r-l,n=m/Math.floor(m/n)),x=c;x<0;)h++,x=Math.round(c+h*n);for(p=Math.max(c,0);p<u;p++)p===x&&(e.push(s[p]),h++,x=Math.round(c+h*n))}function Y_(s){const e=s.length;let n,l;if(e<2)return!1;for(l=s[0],n=1;n<e;++n)if(s[n]-s[n-1]!==l)return!1;return l}const V_=s=>s==="left"?"right":s==="right"?"left":s,_p=(s,e,n)=>e==="top"||e==="left"?s[e]+n:s[e]-n,jp=(s,e)=>Math.min(e||s,s);function wp(s,e){const n=[],l=s.length/e,r=s.length;let c=0;for(;c<r;c+=l)n.push(s[Math.floor(c)]);return n}function F_(s,e,n){const l=s.ticks.length,r=Math.min(e,l-1),c=s._startPixel,u=s._endPixel,h=1e-6;let m=s.getPixelForTick(r),p;if(!(n&&(l===1?p=Math.max(m-c,u-m):e===0?p=(s.getPixelForTick(1)-m)/2:p=(m-s.getPixelForTick(r-1))/2,m+=r<e?p:-p,m<c-h||m>u+h)))return m}function X_(s,e){Vt(s,n=>{const l=n.gc,r=l.length/2;let c;if(r>e){for(c=0;c<r;++c)delete n.data[l[c]];l.splice(0,r)}})}function _l(s){return s.drawTicks?s.tickLength:0}function Np(s,e){if(!s.display)return 0;const n=Be(s.font,e),l=Ea(s.padding);return(_e(s.text)?s.text.length:1)*n.lineHeight+l.height}function G_(s,e){return Si(s,{scale:e,type:"scale"})}function $_(s,e,n){return Si(s,{tick:n,index:e,type:"tick"})}function Q_(s,e,n){let l=Cd(s);return(n&&e!=="right"||!n&&e==="right")&&(l=V_(l)),l}function Z_(s,e,n,l){const{top:r,left:c,bottom:u,right:h,chart:m}=s,{chartArea:p,scales:x}=m;let y=0,v,_,w;const E=u-r,T=h-c;if(s.isHorizontal()){if(_=Le(l,c,h),Lt(n)){const M=Object.keys(n)[0],O=n[M];w=x[M].getPixelForValue(O)+E-e}else n==="center"?w=(p.bottom+p.top)/2+E-e:w=_p(s,n,e);v=h-c}else{if(Lt(n)){const M=Object.keys(n)[0],O=n[M];_=x[M].getPixelForValue(O)-T+e}else n==="center"?_=(p.left+p.right)/2-T+e:_=_p(s,n,e);w=Le(l,u,r),y=n==="left"?-je:je}return{titleX:_,titleY:w,maxWidth:v,rotation:y}}class _i extends Mn{constructor(e){super(),this.id=e.id,this.type=e.type,this.options=void 0,this.ctx=e.ctx,this.chart=e.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(e){this.options=e.setContext(this.getContext()),this.axis=e.axis,this._userMin=this.parse(e.min),this._userMax=this.parse(e.max),this._suggestedMin=this.parse(e.suggestedMin),this._suggestedMax=this.parse(e.suggestedMax)}parse(e,n){return e}getUserBounds(){let{_userMin:e,_userMax:n,_suggestedMin:l,_suggestedMax:r}=this;return e=Ka(e,Number.POSITIVE_INFINITY),n=Ka(n,Number.NEGATIVE_INFINITY),l=Ka(l,Number.POSITIVE_INFINITY),r=Ka(r,Number.NEGATIVE_INFINITY),{min:Ka(e,l),max:Ka(n,r),minDefined:Na(e),maxDefined:Na(n)}}getMinMax(e){let{min:n,max:l,minDefined:r,maxDefined:c}=this.getUserBounds(),u;if(r&&c)return{min:n,max:l};const h=this.getMatchingVisibleMetas();for(let m=0,p=h.length;m<p;++m)u=h[m].controller.getMinMax(this,e),r||(n=Math.min(n,u.min)),c||(l=Math.max(l,u.max));return n=c&&n>l?l:n,l=r&&n>l?n:l,{min:Ka(n,Ka(l,n)),max:Ka(l,Ka(n,l))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const e=this.chart.data;return this.options.labels||(this.isHorizontal()?e.xLabels:e.yLabels)||e.labels||[]}getLabelItems(e=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(e))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ee(this.options.beforeUpdate,[this])}update(e,n,l){const{beginAtZero:r,grace:c,ticks:u}=this.options,h=u.sampleSize;this.beforeUpdate(),this.maxWidth=e,this.maxHeight=n,this._margins=l=Object.assign({left:0,right:0,top:0,bottom:0},l),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+l.left+l.right:this.height+l.top+l.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=mS(this,c,r),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const m=h<this.ticks.length;this._convertTicksToLabels(m?wp(this.ticks,h):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),u.display&&(u.autoSkip||u.source==="auto")&&(this.ticks=B_(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),m&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let e=this.options.reverse,n,l;this.isHorizontal()?(n=this.left,l=this.right):(n=this.top,l=this.bottom,e=!e),this._startPixel=n,this._endPixel=l,this._reversePixels=e,this._length=l-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ee(this.options.afterUpdate,[this])}beforeSetDimensions(){ee(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ee(this.options.afterSetDimensions,[this])}_callHooks(e){this.chart.notifyPlugins(e,this.getContext()),ee(this.options[e],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ee(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(e){const n=this.options.ticks;let l,r,c;for(l=0,r=e.length;l<r;l++)c=e[l],c.label=ee(n.callback,[c.value,l,e],this)}afterTickToLabelConversion(){ee(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ee(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const e=this.options,n=e.ticks,l=jp(this.ticks.length,e.ticks.maxTicksLimit),r=n.minRotation||0,c=n.maxRotation;let u=r,h,m,p;if(!this._isVisible()||!n.display||r>=c||l<=1||!this.isHorizontal()){this.labelRotation=r;return}const x=this._getLabelSizes(),y=x.widest.width,v=x.highest.height,_=ea(this.chart.width-y,0,this.maxWidth);h=e.offset?this.maxWidth/l:_/(l-1),y+6>h&&(h=_/(l-(e.offset?.5:1)),m=this.maxHeight-_l(e.grid)-n.padding-Np(e.title,this.chart.options.font),p=Math.sqrt(y*y+v*v),u=V1(Math.min(Math.asin(ea((x.highest.height+6)/h,-1,1)),Math.asin(ea(m/p,-1,1))-Math.asin(ea(v/p,-1,1)))),u=Math.max(r,Math.min(c,u))),this.labelRotation=u}afterCalculateLabelRotation(){ee(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ee(this.options.beforeFit,[this])}fit(){const e={width:0,height:0},{chart:n,options:{ticks:l,title:r,grid:c}}=this,u=this._isVisible(),h=this.isHorizontal();if(u){const m=Np(r,n.options.font);if(h?(e.width=this.maxWidth,e.height=_l(c)+m):(e.height=this.maxHeight,e.width=_l(c)+m),l.display&&this.ticks.length){const{first:p,last:x,widest:y,highest:v}=this._getLabelSizes(),_=l.padding*2,w=es(this.labelRotation),E=Math.cos(w),T=Math.sin(w);if(h){const M=l.mirror?0:T*y.width+E*v.height;e.height=Math.min(this.maxHeight,e.height+M+_)}else{const M=l.mirror?0:E*y.width+T*v.height;e.width=Math.min(this.maxWidth,e.width+M+_)}this._calculatePadding(p,x,T,E)}}this._handleMargins(),h?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=e.height):(this.width=e.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(e,n,l,r){const{ticks:{align:c,padding:u},position:h}=this.options,m=this.labelRotation!==0,p=h!=="top"&&this.axis==="x";if(this.isHorizontal()){const x=this.getPixelForTick(0)-this.left,y=this.right-this.getPixelForTick(this.ticks.length-1);let v=0,_=0;m?p?(v=r*e.width,_=l*n.height):(v=l*e.height,_=r*n.width):c==="start"?_=n.width:c==="end"?v=e.width:c!=="inner"&&(v=e.width/2,_=n.width/2),this.paddingLeft=Math.max((v-x+u)*this.width/(this.width-x),0),this.paddingRight=Math.max((_-y+u)*this.width/(this.width-y),0)}else{let x=n.height/2,y=e.height/2;c==="start"?(x=0,y=e.height):c==="end"&&(x=n.height,y=0),this.paddingTop=x+u,this.paddingBottom=y+u}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ee(this.options.afterFit,[this])}isHorizontal(){const{axis:e,position:n}=this.options;return n==="top"||n==="bottom"||e==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(e){this.beforeTickToLabelConversion(),this.generateTickLabels(e);let n,l;for(n=0,l=e.length;n<l;n++)Jt(e[n].label)&&(e.splice(n,1),l--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let e=this._labelSizes;if(!e){const n=this.options.ticks.sampleSize;let l=this.ticks;n<l.length&&(l=wp(l,n)),this._labelSizes=e=this._computeLabelSizes(l,l.length,this.options.ticks.maxTicksLimit)}return e}_computeLabelSizes(e,n,l){const{ctx:r,_longestTextCache:c}=this,u=[],h=[],m=Math.floor(n/jp(n,l));let p=0,x=0,y,v,_,w,E,T,M,O,V,K,Y;for(y=0;y<n;y+=m){if(w=e[y].label,E=this._resolveTickFontOptions(y),r.font=T=E.string,M=c[T]=c[T]||{data:{},gc:[]},O=E.lineHeight,V=K=0,!Jt(w)&&!_e(w))V=tp(r,M.data,M.gc,V,w),K=O;else if(_e(w))for(v=0,_=w.length;v<_;++v)Y=w[v],!Jt(Y)&&!_e(Y)&&(V=tp(r,M.data,M.gc,V,Y),K+=O);u.push(V),h.push(K),p=Math.max(V,p),x=Math.max(K,x)}X_(c,n);const st=u.indexOf(p),tt=h.indexOf(x),at=it=>({width:u[it]||0,height:h[it]||0});return{first:at(0),last:at(n-1),widest:at(st),highest:at(tt),widths:u,heights:h}}getLabelForValue(e){return e}getPixelForValue(e,n){return NaN}getValueForPixel(e){}getPixelForTick(e){const n=this.ticks;return e<0||e>n.length-1?null:this.getPixelForValue(n[e].value)}getPixelForDecimal(e){this._reversePixels&&(e=1-e);const n=this._startPixel+e*this._length;return X1(this._alignToPixels?Nn(this.chart,n,0):n)}getDecimalForPixel(e){const n=(e-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:e,max:n}=this;return e<0&&n<0?n:e>0&&n>0?e:0}getContext(e){const n=this.ticks||[];if(e>=0&&e<n.length){const l=n[e];return l.$context||(l.$context=$_(this.getContext(),e,l))}return this.$context||(this.$context=G_(this.chart.getContext(),this))}_tickSize(){const e=this.options.ticks,n=es(this.labelRotation),l=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),c=this._getLabelSizes(),u=e.autoSkipPadding||0,h=c?c.widest.width+u:0,m=c?c.highest.height+u:0;return this.isHorizontal()?m*l>h*r?h/l:m/r:m*r<h*l?m/l:h/r}_isVisible(){const e=this.options.display;return e!=="auto"?!!e:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(e){const n=this.axis,l=this.chart,r=this.options,{grid:c,position:u,border:h}=r,m=c.offset,p=this.isHorizontal(),y=this.ticks.length+(m?1:0),v=_l(c),_=[],w=h.setContext(this.getContext()),E=w.display?w.width:0,T=E/2,M=function(B){return Nn(l,B,E)};let O,V,K,Y,st,tt,at,it,ft,nt,rt,vt;if(u==="top")O=M(this.bottom),tt=this.bottom-v,it=O-T,nt=M(e.top)+T,vt=e.bottom;else if(u==="bottom")O=M(this.top),nt=e.top,vt=M(e.bottom)-T,tt=O+T,it=this.top+v;else if(u==="left")O=M(this.right),st=this.right-v,at=O-T,ft=M(e.left)+T,rt=e.right;else if(u==="right")O=M(this.left),ft=e.left,rt=M(e.right)-T,st=O+T,at=this.left+v;else if(n==="x"){if(u==="center")O=M((e.top+e.bottom)/2+.5);else if(Lt(u)){const B=Object.keys(u)[0],W=u[B];O=M(this.chart.scales[B].getPixelForValue(W))}nt=e.top,vt=e.bottom,tt=O+T,it=tt+v}else if(n==="y"){if(u==="center")O=M((e.left+e.right)/2);else if(Lt(u)){const B=Object.keys(u)[0],W=u[B];O=M(this.chart.scales[B].getPixelForValue(W))}st=O-T,at=st-v,ft=e.left,rt=e.right}const xt=zt(r.ticks.maxTicksLimit,y),dt=Math.max(1,Math.ceil(y/xt));for(V=0;V<y;V+=dt){const B=this.getContext(V),W=c.setContext(B),lt=h.setContext(B),St=W.lineWidth,A=W.color,$=lt.dash||[],G=lt.dashOffset,J=W.tickWidth,I=W.tickColor,_t=W.tickBorderDash||[],ht=W.tickBorderDashOffset;K=F_(this,V,m),K!==void 0&&(Y=Nn(l,K,St),p?st=at=ft=rt=Y:tt=it=nt=vt=Y,_.push({tx1:st,ty1:tt,tx2:at,ty2:it,x1:ft,y1:nt,x2:rt,y2:vt,width:St,color:A,borderDash:$,borderDashOffset:G,tickWidth:J,tickColor:I,tickBorderDash:_t,tickBorderDashOffset:ht}))}return this._ticksLength=y,this._borderValue=O,_}_computeLabelItems(e){const n=this.axis,l=this.options,{position:r,ticks:c}=l,u=this.isHorizontal(),h=this.ticks,{align:m,crossAlign:p,padding:x,mirror:y}=c,v=_l(l.grid),_=v+x,w=y?-x:_,E=-es(this.labelRotation),T=[];let M,O,V,K,Y,st,tt,at,it,ft,nt,rt,vt="middle";if(r==="top")st=this.bottom-w,tt=this._getXAxisLabelAlignment();else if(r==="bottom")st=this.top+w,tt=this._getXAxisLabelAlignment();else if(r==="left"){const dt=this._getYAxisLabelAlignment(v);tt=dt.textAlign,Y=dt.x}else if(r==="right"){const dt=this._getYAxisLabelAlignment(v);tt=dt.textAlign,Y=dt.x}else if(n==="x"){if(r==="center")st=(e.top+e.bottom)/2+_;else if(Lt(r)){const dt=Object.keys(r)[0],B=r[dt];st=this.chart.scales[dt].getPixelForValue(B)+_}tt=this._getXAxisLabelAlignment()}else if(n==="y"){if(r==="center")Y=(e.left+e.right)/2-_;else if(Lt(r)){const dt=Object.keys(r)[0],B=r[dt];Y=this.chart.scales[dt].getPixelForValue(B)}tt=this._getYAxisLabelAlignment(v).textAlign}n==="y"&&(m==="start"?vt="top":m==="end"&&(vt="bottom"));const xt=this._getLabelSizes();for(M=0,O=h.length;M<O;++M){V=h[M],K=V.label;const dt=c.setContext(this.getContext(M));at=this.getPixelForTick(M)+c.labelOffset,it=this._resolveTickFontOptions(M),ft=it.lineHeight,nt=_e(K)?K.length:1;const B=nt/2,W=dt.color,lt=dt.textStrokeColor,St=dt.textStrokeWidth;let A=tt;u?(Y=at,tt==="inner"&&(M===O-1?A=this.options.reverse?"left":"right":M===0?A=this.options.reverse?"right":"left":A="center"),r==="top"?p==="near"||E!==0?rt=-nt*ft+ft/2:p==="center"?rt=-xt.highest.height/2-B*ft+ft:rt=-xt.highest.height+ft/2:p==="near"||E!==0?rt=ft/2:p==="center"?rt=xt.highest.height/2-B*ft:rt=xt.highest.height-nt*ft,y&&(rt*=-1),E!==0&&!dt.showLabelBackdrop&&(Y+=ft/2*Math.sin(E))):(st=at,rt=(1-nt)*ft/2);let $;if(dt.showLabelBackdrop){const G=Ea(dt.backdropPadding),J=xt.heights[M],I=xt.widths[M];let _t=rt-G.top,ht=0-G.left;switch(vt){case"middle":_t-=J/2;break;case"bottom":_t-=J;break}switch(tt){case"center":ht-=I/2;break;case"right":ht-=I;break;case"inner":M===O-1?ht-=I:M>0&&(ht-=I/2);break}$={left:ht,top:_t,width:I+G.width,height:J+G.height,color:dt.backdropColor}}T.push({label:K,font:it,textOffset:rt,options:{rotation:E,color:W,strokeColor:lt,strokeWidth:St,textAlign:A,textBaseline:vt,translation:[Y,st],backdrop:$}})}return T}_getXAxisLabelAlignment(){const{position:e,ticks:n}=this.options;if(-es(this.labelRotation))return e==="top"?"left":"right";let r="center";return n.align==="start"?r="left":n.align==="end"?r="right":n.align==="inner"&&(r="inner"),r}_getYAxisLabelAlignment(e){const{position:n,ticks:{crossAlign:l,mirror:r,padding:c}}=this.options,u=this._getLabelSizes(),h=e+c,m=u.widest.width;let p,x;return n==="left"?r?(x=this.right+c,l==="near"?p="left":l==="center"?(p="center",x+=m/2):(p="right",x+=m)):(x=this.right-h,l==="near"?p="right":l==="center"?(p="center",x-=m/2):(p="left",x=this.left)):n==="right"?r?(x=this.left+c,l==="near"?p="right":l==="center"?(p="center",x-=m/2):(p="left",x-=m)):(x=this.left+h,l==="near"?p="left":l==="center"?(p="center",x+=m/2):(p="right",x=this.right)):p="right",{textAlign:p,x}}_computeLabelArea(){if(this.options.ticks.mirror)return;const e=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:e.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:e.width}}drawBackground(){const{ctx:e,options:{backgroundColor:n},left:l,top:r,width:c,height:u}=this;n&&(e.save(),e.fillStyle=n,e.fillRect(l,r,c,u),e.restore())}getLineWidthForValue(e){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const r=this.ticks.findIndex(c=>c.value===e);return r>=0?n.setContext(this.getContext(r)).lineWidth:0}drawGrid(e){const n=this.options.grid,l=this.ctx,r=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(e));let c,u;const h=(m,p,x)=>{!x.width||!x.color||(l.save(),l.lineWidth=x.width,l.strokeStyle=x.color,l.setLineDash(x.borderDash||[]),l.lineDashOffset=x.borderDashOffset,l.beginPath(),l.moveTo(m.x,m.y),l.lineTo(p.x,p.y),l.stroke(),l.restore())};if(n.display)for(c=0,u=r.length;c<u;++c){const m=r[c];n.drawOnChartArea&&h({x:m.x1,y:m.y1},{x:m.x2,y:m.y2},m),n.drawTicks&&h({x:m.tx1,y:m.ty1},{x:m.tx2,y:m.ty2},{color:m.tickColor,width:m.tickWidth,borderDash:m.tickBorderDash,borderDashOffset:m.tickBorderDashOffset})}}drawBorder(){const{chart:e,ctx:n,options:{border:l,grid:r}}=this,c=l.setContext(this.getContext()),u=l.display?c.width:0;if(!u)return;const h=r.setContext(this.getContext(0)).lineWidth,m=this._borderValue;let p,x,y,v;this.isHorizontal()?(p=Nn(e,this.left,u)-u/2,x=Nn(e,this.right,h)+h/2,y=v=m):(y=Nn(e,this.top,u)-u/2,v=Nn(e,this.bottom,h)+h/2,p=x=m),n.save(),n.lineWidth=c.width,n.strokeStyle=c.color,n.beginPath(),n.moveTo(p,y),n.lineTo(x,v),n.stroke(),n.restore()}drawLabels(e){if(!this.options.ticks.display)return;const l=this.ctx,r=this._computeLabelArea();r&&Md(l,r);const c=this.getLabelItems(e);for(const u of c){const h=u.options,m=u.font,p=u.label,x=u.textOffset;Ol(l,p,0,x,m,h)}r&&Dd(l)}drawTitle(){const{ctx:e,options:{position:n,title:l,reverse:r}}=this;if(!l.display)return;const c=Be(l.font),u=Ea(l.padding),h=l.align;let m=c.lineHeight/2;n==="bottom"||n==="center"||Lt(n)?(m+=u.bottom,_e(l.text)&&(m+=c.lineHeight*(l.text.length-1))):m+=u.top;const{titleX:p,titleY:x,maxWidth:y,rotation:v}=Z_(this,m,n,h);Ol(e,l.text,0,0,c,{color:l.color,maxWidth:y,rotation:v,textAlign:Q_(h,n,r),textBaseline:"middle",translation:[p,x]})}draw(e){this._isVisible()&&(this.drawBackground(),this.drawGrid(e),this.drawBorder(),this.drawTitle(),this.drawLabels(e))}_layers(){const e=this.options,n=e.ticks&&e.ticks.z||0,l=zt(e.grid&&e.grid.z,-1),r=zt(e.border&&e.border.z,0);return!this._isVisible()||this.draw!==_i.prototype.draw?[{z:n,draw:c=>{this.draw(c)}}]:[{z:l,draw:c=>{this.drawBackground(),this.drawGrid(c),this.drawTitle()}},{z:r,draw:()=>{this.drawBorder()}},{z:n,draw:c=>{this.drawLabels(c)}}]}getMatchingVisibleMetas(e){const n=this.chart.getSortedVisibleDatasetMetas(),l=this.axis+"AxisID",r=[];let c,u;for(c=0,u=n.length;c<u;++c){const h=n[c];h[l]===this.id&&(!e||h.type===e)&&r.push(h)}return r}_resolveTickFontOptions(e){const n=this.options.ticks.setContext(this.getContext(e));return Be(n.font)}_maxDigits(){const e=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/e}}class io{constructor(e,n,l){this.type=e,this.scope=n,this.override=l,this.items=Object.create(null)}isForType(e){return Object.prototype.isPrototypeOf.call(this.type.prototype,e.prototype)}register(e){const n=Object.getPrototypeOf(e);let l;J_(n)&&(l=this.register(n));const r=this.items,c=e.id,u=this.scope+"."+c;if(!c)throw new Error("class does not have id: "+e);return c in r||(r[c]=e,K_(e,u,l),this.override&&le.override(e.id,e.overrides)),u}get(e){return this.items[e]}unregister(e){const n=this.items,l=e.id,r=this.scope;l in n&&delete n[l],r&&l in le[r]&&(delete le[r][l],this.override&&delete Cn[l])}}function K_(s,e,n){const l=Dl(Object.create(null),[n?le.get(n):{},le.get(e),s.defaults]);le.set(e,l),s.defaultRoutes&&W_(e,s.defaultRoutes),s.descriptors&&le.describe(e,s.descriptors)}function W_(s,e){Object.keys(e).forEach(n=>{const l=n.split("."),r=l.pop(),c=[s].concat(l).join("."),u=e[n].split("."),h=u.pop(),m=u.join(".");le.route(c,r,m,h)})}function J_(s){return"id"in s&&"defaults"in s}class I_{constructor(){this.controllers=new io(Mo,"datasets",!0),this.elements=new io(Mn,"elements"),this.plugins=new io(Object,"plugins"),this.scales=new io(_i,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...e){this._each("register",e)}remove(...e){this._each("unregister",e)}addControllers(...e){this._each("register",e,this.controllers)}addElements(...e){this._each("register",e,this.elements)}addPlugins(...e){this._each("register",e,this.plugins)}addScales(...e){this._each("register",e,this.scales)}getController(e){return this._get(e,this.controllers,"controller")}getElement(e){return this._get(e,this.elements,"element")}getPlugin(e){return this._get(e,this.plugins,"plugin")}getScale(e){return this._get(e,this.scales,"scale")}removeControllers(...e){this._each("unregister",e,this.controllers)}removeElements(...e){this._each("unregister",e,this.elements)}removePlugins(...e){this._each("unregister",e,this.plugins)}removeScales(...e){this._each("unregister",e,this.scales)}_each(e,n,l){[...n].forEach(r=>{const c=l||this._getRegistryForType(r);l||c.isForType(r)||c===this.plugins&&r.id?this._exec(e,c,r):Vt(r,u=>{const h=l||this._getRegistryForType(u);this._exec(e,h,u)})})}_exec(e,n,l){const r=kd(e);ee(l["before"+r],[],l),n[e](l),ee(l["after"+r],[],l)}_getRegistryForType(e){for(let n=0;n<this._typedRegistries.length;n++){const l=this._typedRegistries[n];if(l.isForType(e))return l}return this.plugins}_get(e,n,l){const r=n.get(e);if(r===void 0)throw new Error('"'+e+'" is not a registered '+l+".");return r}}var Ja=new I_;class tj{constructor(){this._init=void 0}notify(e,n,l,r){if(n==="beforeInit"&&(this._init=this._createDescriptors(e,!0),this._notify(this._init,e,"install")),this._init===void 0)return;const c=r?this._descriptors(e).filter(r):this._descriptors(e),u=this._notify(c,e,n,l);return n==="afterDestroy"&&(this._notify(c,e,"stop"),this._notify(this._init,e,"uninstall"),this._init=void 0),u}_notify(e,n,l,r){r=r||{};for(const c of e){const u=c.plugin,h=u[l],m=[n,r,c.options];if(ee(h,m,u)===!1&&r.cancelable)return!1}return!0}invalidate(){Jt(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(e){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(e);return this._notifyStateChanges(e),n}_createDescriptors(e,n){const l=e&&e.config,r=zt(l.options&&l.options.plugins,{}),c=ej(l);return r===!1&&!n?[]:sj(e,c,r,n)}_notifyStateChanges(e){const n=this._oldCache||[],l=this._cache,r=(c,u)=>c.filter(h=>!u.some(m=>h.plugin.id===m.plugin.id));this._notify(r(n,l),e,"stop"),this._notify(r(l,n),e,"start")}}function ej(s){const e={},n=[],l=Object.keys(Ja.plugins.items);for(let c=0;c<l.length;c++)n.push(Ja.getPlugin(l[c]));const r=s.plugins||[];for(let c=0;c<r.length;c++){const u=r[c];n.indexOf(u)===-1&&(n.push(u),e[u.id]=!0)}return{plugins:n,localIds:e}}function aj(s,e){return!e&&s===!1?null:s===!0?{}:s}function sj(s,{plugins:e,localIds:n},l,r){const c=[],u=s.getContext();for(const h of e){const m=h.id,p=aj(l[m],r);p!==null&&c.push({plugin:h,options:nj(s.config,{plugin:h,local:n[m]},p,u)})}return c}function nj(s,{plugin:e,local:n},l,r){const c=s.pluginScopeKeys(e),u=s.getOptionScopes(l,c);return n&&e.defaults&&u.push(e.defaults),s.createResolver(u,r,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function md(s,e){const n=le.datasets[s]||{};return((e.datasets||{})[s]||{}).indexAxis||e.indexAxis||n.indexAxis||"x"}function ij(s,e){let n=s;return s==="_index_"?n=e:s==="_value_"&&(n=e==="x"?"y":"x"),n}function lj(s,e){return s===e?"_index_":"_value_"}function Ep(s){if(s==="x"||s==="y"||s==="r")return s}function rj(s){if(s==="top"||s==="bottom")return"x";if(s==="left"||s==="right")return"y"}function gd(s,...e){if(Ep(s))return s;for(const n of e){const l=n.axis||rj(n.position)||s.length>1&&Ep(s[0].toLowerCase());if(l)return l}throw new Error(`Cannot determine type of '${s}' axis. Please provide 'axis' or 'position' option.`)}function Tp(s,e,n){if(n[e+"AxisID"]===s)return{axis:e}}function oj(s,e){if(e.data&&e.data.datasets){const n=e.data.datasets.filter(l=>l.xAxisID===s||l.yAxisID===s);if(n.length)return Tp(s,"x",n[0])||Tp(s,"y",n[0])}return{}}function cj(s,e){const n=Cn[s.type]||{scales:{}},l=e.scales||{},r=md(s.type,e),c=Object.create(null);return Object.keys(l).forEach(u=>{const h=l[u];if(!Lt(h))return console.error(`Invalid scale configuration for scale: ${u}`);if(h._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${u}`);const m=gd(u,h,oj(u,s),le.scales[h.type]),p=lj(m,r),x=n.scales||{};c[u]=Tl(Object.create(null),[{axis:m},h,x[m],x[p]])}),s.data.datasets.forEach(u=>{const h=u.type||s.type,m=u.indexAxis||md(h,e),x=(Cn[h]||{}).scales||{};Object.keys(x).forEach(y=>{const v=ij(y,m),_=u[v+"AxisID"]||v;c[_]=c[_]||Object.create(null),Tl(c[_],[{axis:v},l[_],x[y]])})}),Object.keys(c).forEach(u=>{const h=c[u];Tl(h,[le.scales[h.type],le.scale])}),c}function Qx(s){const e=s.options||(s.options={});e.plugins=zt(e.plugins,{}),e.scales=cj(s,e)}function Zx(s){return s=s||{},s.datasets=s.datasets||[],s.labels=s.labels||[],s}function uj(s){return s=s||{},s.data=Zx(s.data),Qx(s),s}const kp=new Map,Kx=new Set;function lo(s,e){let n=kp.get(s);return n||(n=e(),kp.set(s,n),Kx.add(n)),n}const jl=(s,e,n)=>{const l=sn(e,n);l!==void 0&&s.add(l)};class dj{constructor(e){this._config=uj(e),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(e){this._config.type=e}get data(){return this._config.data}set data(e){this._config.data=Zx(e)}get options(){return this._config.options}set options(e){this._config.options=e}get plugins(){return this._config.plugins}update(){const e=this._config;this.clearCache(),Qx(e)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(e){return lo(e,()=>[[`datasets.${e}`,""]])}datasetAnimationScopeKeys(e,n){return lo(`${e}.transition.${n}`,()=>[[`datasets.${e}.transitions.${n}`,`transitions.${n}`],[`datasets.${e}`,""]])}datasetElementScopeKeys(e,n){return lo(`${e}-${n}`,()=>[[`datasets.${e}.elements.${n}`,`datasets.${e}`,`elements.${n}`,""]])}pluginScopeKeys(e){const n=e.id,l=this.type;return lo(`${l}-plugin-${n}`,()=>[[`plugins.${n}`,...e.additionalOptionScopes||[]]])}_cachedScopes(e,n){const l=this._scopeCache;let r=l.get(e);return(!r||n)&&(r=new Map,l.set(e,r)),r}getOptionScopes(e,n,l){const{options:r,type:c}=this,u=this._cachedScopes(e,l),h=u.get(n);if(h)return h;const m=new Set;n.forEach(x=>{e&&(m.add(e),x.forEach(y=>jl(m,e,y))),x.forEach(y=>jl(m,r,y)),x.forEach(y=>jl(m,Cn[c]||{},y)),x.forEach(y=>jl(m,le,y)),x.forEach(y=>jl(m,hd,y))});const p=Array.from(m);return p.length===0&&p.push(Object.create(null)),Kx.has(n)&&u.set(n,p),p}chartOptionScopes(){const{options:e,type:n}=this;return[e,Cn[n]||{},le.datasets[n]||{},{type:n},le,hd]}resolveNamedOptions(e,n,l,r=[""]){const c={$shared:!0},{resolver:u,subPrefixes:h}=Ap(this._resolverCache,e,r);let m=u;if(hj(u,n)){c.$shared=!1,l=nn(l)?l():l;const p=this.createResolver(e,l,h);m=xi(u,l,p)}for(const p of n)c[p]=m[p];return c}createResolver(e,n,l=[""],r){const{resolver:c}=Ap(this._resolverCache,e,l);return Lt(n)?xi(c,n,void 0,r):c}}function Ap(s,e,n){let l=s.get(e);l||(l=new Map,s.set(e,l));const r=n.join();let c=l.get(r);return c||(c={resolver:Od(e,n),subPrefixes:n.filter(h=>!h.toLowerCase().includes("hover"))},l.set(r,c)),c}const fj=s=>Lt(s)&&Object.getOwnPropertyNames(s).some(e=>nn(s[e]));function hj(s,e){const{isScriptable:n,isIndexable:l}=Rx(s);for(const r of e){const c=n(r),u=l(r),h=(u||c)&&s[r];if(c&&(nn(h)||fj(h))||u&&_e(h))return!0}return!1}var mj="4.5.1";const gj=["top","bottom","left","right","chartArea"];function Cp(s,e){return s==="top"||s==="bottom"||gj.indexOf(s)===-1&&e==="x"}function Mp(s,e){return function(n,l){return n[s]===l[s]?n[e]-l[e]:n[s]-l[s]}}function Dp(s){const e=s.chart,n=e.options.animation;e.notifyPlugins("afterRender"),ee(n&&n.onComplete,[s],e)}function pj(s){const e=s.chart,n=e.options.animation;ee(n&&n.onProgress,[s],e)}function Wx(s){return Bd()&&typeof s=="string"?s=document.getElementById(s):s&&s.length&&(s=s[0]),s&&s.canvas&&(s=s.canvas),s}const go={},Rp=s=>{const e=Wx(s);return Object.values(go).filter(n=>n.canvas===e).pop()};function xj(s,e,n){const l=Object.keys(s);for(const r of l){const c=+r;if(c>=e){const u=s[r];delete s[r],(n>0||c>e)&&(s[c+n]=u)}}}function bj(s,e,n,l){return!n||s.type==="mouseout"?null:l?e:s}let Ro=class{static defaults=le;static instances=go;static overrides=Cn;static registry=Ja;static version=mj;static getChart=Rp;static register(...e){Ja.add(...e),Op()}static unregister(...e){Ja.remove(...e),Op()}constructor(e,n){const l=this.config=new dj(n),r=Wx(e),c=Rp(r);if(c)throw new Error("Canvas is already in use. Chart with ID '"+c.id+"' must be destroyed before the canvas with ID '"+c.canvas.id+"' can be reused.");const u=l.createResolver(l.chartOptionScopes(),this.getContext());this.platform=new(l.platform||L_(r)),this.platform.updateConfig(l);const h=this.platform.acquireContext(r,u.aspectRatio),m=h&&h.canvas,p=m&&m.height,x=m&&m.width;if(this.id=M1(),this.ctx=h,this.canvas=m,this.width=x,this.height=p,this._options=u,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new tj,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=Z1(y=>this.update(y),u.resizeDelay||0),this._dataChanges=[],go[this.id]=this,!h||!m){console.error("Failed to create chart: can't acquire context from the given item");return}_s.listen(this,"complete",Dp),_s.listen(this,"progress",pj),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:e,maintainAspectRatio:n},width:l,height:r,_aspectRatio:c}=this;return Jt(e)?n&&c?c:r?l/r:null:e}get data(){return this.config.data}set data(e){this.config.data=e}get options(){return this._options}set options(e){this.config.options=e}get registry(){return Ja}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():ip(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return ep(this.canvas,this.ctx),this}stop(){return _s.stop(this),this}resize(e,n){_s.running(this)?this._resizeBeforeDraw={width:e,height:n}:this._resize(e,n)}_resize(e,n){const l=this.options,r=this.canvas,c=l.maintainAspectRatio&&this.aspectRatio,u=this.platform.getMaximumSize(r,e,n,c),h=l.devicePixelRatio||this.platform.getDevicePixelRatio(),m=this.width?"resize":"attach";this.width=u.width,this.height=u.height,this._aspectRatio=this.aspectRatio,ip(this,h,!0)&&(this.notifyPlugins("resize",{size:u}),ee(l.onResize,[this,u],this),this.attached&&this._doResize(m)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};Vt(n,(l,r)=>{l.id=r})}buildOrUpdateScales(){const e=this.options,n=e.scales,l=this.scales,r=Object.keys(l).reduce((u,h)=>(u[h]=!1,u),{});let c=[];n&&(c=c.concat(Object.keys(n).map(u=>{const h=n[u],m=gd(u,h),p=m==="r",x=m==="x";return{options:h,dposition:p?"chartArea":x?"bottom":"left",dtype:p?"radialLinear":x?"category":"linear"}}))),Vt(c,u=>{const h=u.options,m=h.id,p=gd(m,h),x=zt(h.type,u.dtype);(h.position===void 0||Cp(h.position,p)!==Cp(u.dposition))&&(h.position=u.dposition),r[m]=!0;let y=null;if(m in l&&l[m].type===x)y=l[m];else{const v=Ja.getScale(x);y=new v({id:m,type:x,ctx:this.ctx,chart:this}),l[y.id]=y}y.init(h,e)}),Vt(r,(u,h)=>{u||delete l[h]}),Vt(l,u=>{wa.configure(this,u,u.options),wa.addBox(this,u)})}_updateMetasets(){const e=this._metasets,n=this.data.datasets.length,l=e.length;if(e.sort((r,c)=>r.index-c.index),l>n){for(let r=n;r<l;++r)this._destroyDatasetMeta(r);e.splice(n,l-n)}this._sortedMetasets=e.slice(0).sort(Mp("order","index"))}_removeUnreferencedMetasets(){const{_metasets:e,data:{datasets:n}}=this;e.length>n.length&&delete this._stacks,e.forEach((l,r)=>{n.filter(c=>c===l._dataset).length===0&&this._destroyDatasetMeta(r)})}buildOrUpdateControllers(){const e=[],n=this.data.datasets;let l,r;for(this._removeUnreferencedMetasets(),l=0,r=n.length;l<r;l++){const c=n[l];let u=this.getDatasetMeta(l);const h=c.type||this.config.type;if(u.type&&u.type!==h&&(this._destroyDatasetMeta(l),u=this.getDatasetMeta(l)),u.type=h,u.indexAxis=c.indexAxis||md(h,this.options),u.order=c.order||0,u.index=l,u.label=""+c.label,u.visible=this.isDatasetVisible(l),u.controller)u.controller.updateIndex(l),u.controller.linkScales();else{const m=Ja.getController(h),{datasetElementType:p,dataElementType:x}=le.datasets[h];Object.assign(m,{dataElementType:Ja.getElement(x),datasetElementType:p&&Ja.getElement(p)}),u.controller=new m(this,l),e.push(u.controller)}}return this._updateMetasets(),e}_resetElements(){Vt(this.data.datasets,(e,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(e){const n=this.config;n.update();const l=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!l.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:e,cancelable:!0})===!1)return;const c=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let u=0;for(let p=0,x=this.data.datasets.length;p<x;p++){const{controller:y}=this.getDatasetMeta(p),v=!r&&c.indexOf(y)===-1;y.buildOrUpdateElements(v),u=Math.max(+y.getMaxOverflow(),u)}u=this._minPadding=l.layout.autoPadding?u:0,this._updateLayout(u),r||Vt(c,p=>{p.reset()}),this._updateDatasets(e),this.notifyPlugins("afterUpdate",{mode:e}),this._layers.sort(Mp("z","_idx"));const{_active:h,_lastEvent:m}=this;m?this._eventHandler(m,!0):h.length&&this._updateHoverStyles(h,h,!0),this.render()}_updateScales(){Vt(this.scales,e=>{wa.removeBox(this,e)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const e=this.options,n=new Set(Object.keys(this._listeners)),l=new Set(e.events);(!Xg(n,l)||!!this._responsiveListeners!==e.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:e}=this,n=this._getUniformDataChanges()||[];for(const{method:l,start:r,count:c}of n){const u=l==="_removeElements"?-c:c;xj(e,r,u)}}_getUniformDataChanges(){const e=this._dataChanges;if(!e||!e.length)return;this._dataChanges=[];const n=this.data.datasets.length,l=c=>new Set(e.filter(u=>u[0]===c).map((u,h)=>h+","+u.splice(1).join(","))),r=l(0);for(let c=1;c<n;c++)if(!Xg(r,l(c)))return;return Array.from(r).map(c=>c.split(",")).map(c=>({method:c[1],start:+c[2],count:+c[3]}))}_updateLayout(e){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;wa.update(this,this.width,this.height,e);const n=this.chartArea,l=n.width<=0||n.height<=0;this._layers=[],Vt(this.boxes,r=>{l&&r.position==="chartArea"||(r.configure&&r.configure(),this._layers.push(...r._layers()))},this),this._layers.forEach((r,c)=>{r._idx=c}),this.notifyPlugins("afterLayout")}_updateDatasets(e){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:e,cancelable:!0})!==!1){for(let n=0,l=this.data.datasets.length;n<l;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,l=this.data.datasets.length;n<l;++n)this._updateDataset(n,nn(e)?e({datasetIndex:n}):e);this.notifyPlugins("afterDatasetsUpdate",{mode:e})}}_updateDataset(e,n){const l=this.getDatasetMeta(e),r={meta:l,index:e,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",r)!==!1&&(l.controller._update(n),r.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",r))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(_s.has(this)?this.attached&&!_s.running(this)&&_s.start(this):(this.draw(),Dp({chart:this})))}draw(){let e;if(this._resizeBeforeDraw){const{width:l,height:r}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(l,r)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(e=0;e<n.length&&n[e].z<=0;++e)n[e].draw(this.chartArea);for(this._drawDatasets();e<n.length;++e)n[e].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(e){const n=this._sortedMetasets,l=[];let r,c;for(r=0,c=n.length;r<c;++r){const u=n[r];(!e||u.visible)&&l.push(u)}return l}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const e=this.getSortedVisibleDatasetMetas();for(let n=e.length-1;n>=0;--n)this._drawDataset(e[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(e){const n=this.ctx,l={meta:e,index:e.index,cancelable:!0},r=zS(this,e);this.notifyPlugins("beforeDatasetDraw",l)!==!1&&(r&&Md(n,r),e.controller.draw(),r&&Dd(n),l.cancelable=!1,this.notifyPlugins("afterDatasetDraw",l))}isPointInArea(e){return Mx(e,this.chartArea,this._minPadding)}getElementsAtEventForMode(e,n,l,r){const c=g_.modes[n];return typeof c=="function"?c(this,e,l,r):[]}getDatasetMeta(e){const n=this.data.datasets[e],l=this._metasets;let r=l.filter(c=>c&&c._dataset===n).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:e,_dataset:n,_parsed:[],_sorted:!1},l.push(r)),r}getContext(){return this.$context||(this.$context=Si(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(e){const n=this.data.datasets[e];if(!n)return!1;const l=this.getDatasetMeta(e);return typeof l.hidden=="boolean"?!l.hidden:!n.hidden}setDatasetVisibility(e,n){const l=this.getDatasetMeta(e);l.hidden=!n}toggleDataVisibility(e){this._hiddenIndices[e]=!this._hiddenIndices[e]}getDataVisibility(e){return!this._hiddenIndices[e]}_updateVisibility(e,n,l){const r=l?"show":"hide",c=this.getDatasetMeta(e),u=c.controller._resolveAnimations(void 0,r);Rl(n)?(c.data[n].hidden=!l,this.update()):(this.setDatasetVisibility(e,l),u.update(c,{visible:l}),this.update(h=>h.datasetIndex===e?r:void 0))}hide(e,n){this._updateVisibility(e,n,!1)}show(e,n){this._updateVisibility(e,n,!0)}_destroyDatasetMeta(e){const n=this._metasets[e];n&&n.controller&&n.controller._destroy(),delete this._metasets[e]}_stop(){let e,n;for(this.stop(),_s.remove(this),e=0,n=this.data.datasets.length;e<n;++e)this._destroyDatasetMeta(e)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:e,ctx:n}=this;this._stop(),this.config.clearCache(),e&&(this.unbindEvents(),ep(e,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete go[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...e){return this.canvas.toDataURL(...e)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const e=this._listeners,n=this.platform,l=(c,u)=>{n.addEventListener(this,c,u),e[c]=u},r=(c,u,h)=>{c.offsetX=u,c.offsetY=h,this._eventHandler(c)};Vt(this.options.events,c=>l(c,r))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const e=this._responsiveListeners,n=this.platform,l=(m,p)=>{n.addEventListener(this,m,p),e[m]=p},r=(m,p)=>{e[m]&&(n.removeEventListener(this,m,p),delete e[m])},c=(m,p)=>{this.canvas&&this.resize(m,p)};let u;const h=()=>{r("attach",h),this.attached=!0,this.resize(),l("resize",c),l("detach",u)};u=()=>{this.attached=!1,r("resize",c),this._stop(),this._resize(0,0),l("attach",h)},n.isAttached(this.canvas)?h():u()}unbindEvents(){Vt(this._listeners,(e,n)=>{this.platform.removeEventListener(this,n,e)}),this._listeners={},Vt(this._responsiveListeners,(e,n)=>{this.platform.removeEventListener(this,n,e)}),this._responsiveListeners=void 0}updateHoverStyle(e,n,l){const r=l?"set":"remove";let c,u,h,m;for(n==="dataset"&&(c=this.getDatasetMeta(e[0].datasetIndex),c.controller["_"+r+"DatasetHoverStyle"]()),h=0,m=e.length;h<m;++h){u=e[h];const p=u&&this.getDatasetMeta(u.datasetIndex).controller;p&&p[r+"HoverStyle"](u.element,u.datasetIndex,u.index)}}getActiveElements(){return this._active||[]}setActiveElements(e){const n=this._active||[],l=e.map(({datasetIndex:c,index:u})=>{const h=this.getDatasetMeta(c);if(!h)throw new Error("No dataset found at index "+c);return{datasetIndex:c,element:h.data[u],index:u}});!xo(l,n)&&(this._active=l,this._lastEvent=null,this._updateHoverStyles(l,n))}notifyPlugins(e,n,l){return this._plugins.notify(this,e,n,l)}isPluginEnabled(e){return this._plugins._cache.filter(n=>n.plugin.id===e).length===1}_updateHoverStyles(e,n,l){const r=this.options.hover,c=(m,p)=>m.filter(x=>!p.some(y=>x.datasetIndex===y.datasetIndex&&x.index===y.index)),u=c(n,e),h=l?e:c(e,n);u.length&&this.updateHoverStyle(u,r.mode,!1),h.length&&r.mode&&this.updateHoverStyle(h,r.mode,!0)}_eventHandler(e,n){const l={event:e,replay:n,cancelable:!0,inChartArea:this.isPointInArea(e)},r=u=>(u.options.events||this.options.events).includes(e.native.type);if(this.notifyPlugins("beforeEvent",l,r)===!1)return;const c=this._handleEvent(e,n,l.inChartArea);return l.cancelable=!1,this.notifyPlugins("afterEvent",l,r),(c||l.changed)&&this.render(),this}_handleEvent(e,n,l){const{_active:r=[],options:c}=this,u=n,h=this._getActiveElements(e,r,l,u),m=B1(e),p=bj(e,this._lastEvent,l,m);l&&(this._lastEvent=null,ee(c.onHover,[e,h,this],this),m&&ee(c.onClick,[e,h,this],this));const x=!xo(h,r);return(x||n)&&(this._active=h,this._updateHoverStyles(h,r,n)),this._lastEvent=p,x}_getActiveElements(e,n,l,r){if(e.type==="mouseout")return[];if(!l)return n;const c=this.options.hover;return this.getElementsAtEventForMode(e,c.mode,c,r)}};function Op(){return Vt(Ro.instances,s=>s._plugins.invalidate())}function yj(s,e,n){const{startAngle:l,x:r,y:c,outerRadius:u,innerRadius:h,options:m}=e,{borderWidth:p,borderJoinStyle:x}=m,y=Math.min(p/u,Ia(l-n));if(s.beginPath(),s.arc(r,c,u-p/2,l+y/2,n-y/2),h>0){const v=Math.min(p/h,Ia(l-n));s.arc(r,c,h+p/2,n-v/2,l+v/2,!0)}else{const v=Math.min(p/2,u*Ia(l-n));if(x==="round")s.arc(r,c,v,n-Zt/2,l+Zt/2,!0);else if(x==="bevel"){const _=2*v*v,w=-_*Math.cos(n+Zt/2)+r,E=-_*Math.sin(n+Zt/2)+c,T=_*Math.cos(l+Zt/2)+r,M=_*Math.sin(l+Zt/2)+c;s.lineTo(w,E),s.lineTo(T,M)}}s.closePath(),s.moveTo(0,0),s.rect(0,0,s.canvas.width,s.canvas.height),s.clip("evenodd")}function vj(s,e,n){const{startAngle:l,pixelMargin:r,x:c,y:u,outerRadius:h,innerRadius:m}=e;let p=r/h;s.beginPath(),s.arc(c,u,h,l-p,n+p),m>r?(p=r/m,s.arc(c,u,m,n+p,l-p,!0)):s.arc(c,u,r,n+je,l-je),s.closePath(),s.clip()}function Sj(s){return Rd(s,["outerStart","outerEnd","innerStart","innerEnd"])}function _j(s,e,n,l){const r=Sj(s.options.borderRadius),c=(n-e)/2,u=Math.min(c,l*e/2),h=m=>{const p=(n-Math.min(c,m))*l/2;return ea(m,0,Math.min(c,p))};return{outerStart:h(r.outerStart),outerEnd:h(r.outerEnd),innerStart:ea(r.innerStart,0,u),innerEnd:ea(r.innerEnd,0,u)}}function mi(s,e,n,l){return{x:n+s*Math.cos(e),y:l+s*Math.sin(e)}}function No(s,e,n,l,r,c){const{x:u,y:h,startAngle:m,pixelMargin:p,innerRadius:x}=e,y=Math.max(e.outerRadius+l+n-p,0),v=x>0?x+l+n+p:0;let _=0;const w=r-m;if(l){const dt=x>0?x-l:0,B=y>0?y-l:0,W=(dt+B)/2,lt=W!==0?w*W/(W+l):w;_=(w-lt)/2}const E=Math.max(.001,w*y-n/Zt)/y,T=(w-E)/2,M=m+T+_,O=r-T-_,{outerStart:V,outerEnd:K,innerStart:Y,innerEnd:st}=_j(e,v,y,O-M),tt=y-V,at=y-K,it=M+V/tt,ft=O-K/at,nt=v+Y,rt=v+st,vt=M+Y/nt,xt=O-st/rt;if(s.beginPath(),c){const dt=(it+ft)/2;if(s.arc(u,h,y,it,dt),s.arc(u,h,y,dt,ft),K>0){const St=mi(at,ft,u,h);s.arc(St.x,St.y,K,ft,O+je)}const B=mi(rt,O,u,h);if(s.lineTo(B.x,B.y),st>0){const St=mi(rt,xt,u,h);s.arc(St.x,St.y,st,O+je,xt+Math.PI)}const W=(O-st/v+(M+Y/v))/2;if(s.arc(u,h,v,O-st/v,W,!0),s.arc(u,h,v,W,M+Y/v,!0),Y>0){const St=mi(nt,vt,u,h);s.arc(St.x,St.y,Y,vt+Math.PI,M-je)}const lt=mi(tt,M,u,h);if(s.lineTo(lt.x,lt.y),V>0){const St=mi(tt,it,u,h);s.arc(St.x,St.y,V,M-je,it)}}else{s.moveTo(u,h);const dt=Math.cos(it)*y+u,B=Math.sin(it)*y+h;s.lineTo(dt,B);const W=Math.cos(ft)*y+u,lt=Math.sin(ft)*y+h;s.lineTo(W,lt)}s.closePath()}function jj(s,e,n,l,r){const{fullCircles:c,startAngle:u,circumference:h}=e;let m=e.endAngle;if(c){No(s,e,n,l,m,r);for(let p=0;p<c;++p)s.fill();isNaN(h)||(m=u+(h%be||be))}return No(s,e,n,l,m,r),s.fill(),m}function wj(s,e,n,l,r){const{fullCircles:c,startAngle:u,circumference:h,options:m}=e,{borderWidth:p,borderJoinStyle:x,borderDash:y,borderDashOffset:v,borderRadius:_}=m,w=m.borderAlign==="inner";if(!p)return;s.setLineDash(y||[]),s.lineDashOffset=v,w?(s.lineWidth=p*2,s.lineJoin=x||"round"):(s.lineWidth=p,s.lineJoin=x||"bevel");let E=e.endAngle;if(c){No(s,e,n,l,E,r);for(let T=0;T<c;++T)s.stroke();isNaN(h)||(E=u+(h%be||be))}w&&vj(s,e,E),m.selfJoin&&E-u>=Zt&&_===0&&x!=="miter"&&yj(s,e,E),c||(No(s,e,n,l,E,r),s.stroke())}class Nj extends Mn{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:e=>e!=="borderDash"};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(e){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,n,l){const r=this.getProps(["x","y"],l),{angle:c,distance:u}=jx(r,{x:e,y:n}),{startAngle:h,endAngle:m,innerRadius:p,outerRadius:x,circumference:y}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],l),v=(this.options.spacing+this.options.borderWidth)/2,_=zt(y,m-h),w=So(c,h,m)&&h!==m,E=_>=be||w,T=kn(u,p+v,x+v);return E&&T}getCenterPoint(e){const{x:n,y:l,startAngle:r,endAngle:c,innerRadius:u,outerRadius:h}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:m,spacing:p}=this.options,x=(r+c)/2,y=(u+h+p+m)/2;return{x:n+Math.cos(x)*y,y:l+Math.sin(x)*y}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:n,circumference:l}=this,r=(n.offset||0)/4,c=(n.spacing||0)/2,u=n.circular;if(this.pixelMargin=n.borderAlign==="inner"?.33:0,this.fullCircles=l>be?Math.floor(l/be):0,l===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const h=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(h)*r,Math.sin(h)*r);const m=1-Math.sin(Math.min(Zt,l||0)),p=r*m;e.fillStyle=n.backgroundColor,e.strokeStyle=n.borderColor,jj(e,this,p,c,u),wj(e,this,p,c,u),e.restore()}}function Jx(s,e){const{x:n,y:l,base:r,width:c,height:u}=s.getProps(["x","y","base","width","height"],e);let h,m,p,x,y;return s.horizontal?(y=u/2,h=Math.min(n,r),m=Math.max(n,r),p=l-y,x=l+y):(y=c/2,h=n-y,m=n+y,p=Math.min(l,r),x=Math.max(l,r)),{left:h,top:p,right:m,bottom:x}}function tn(s,e,n,l){return s?0:ea(e,n,l)}function Ej(s,e,n){const l=s.options.borderWidth,r=s.borderSkipped,c=Dx(l);return{t:tn(r.top,c.top,0,n),r:tn(r.right,c.right,0,e),b:tn(r.bottom,c.bottom,0,n),l:tn(r.left,c.left,0,e)}}function Tj(s,e,n){const{enableBorderRadius:l}=s.getProps(["enableBorderRadius"]),r=s.options.borderRadius,c=gi(r),u=Math.min(e,n),h=s.borderSkipped,m=l||Lt(r);return{topLeft:tn(!m||h.top||h.left,c.topLeft,0,u),topRight:tn(!m||h.top||h.right,c.topRight,0,u),bottomLeft:tn(!m||h.bottom||h.left,c.bottomLeft,0,u),bottomRight:tn(!m||h.bottom||h.right,c.bottomRight,0,u)}}function kj(s){const e=Jx(s),n=e.right-e.left,l=e.bottom-e.top,r=Ej(s,n/2,l/2),c=Tj(s,n/2,l/2);return{outer:{x:e.left,y:e.top,w:n,h:l,radius:c},inner:{x:e.left+r.l,y:e.top+r.t,w:n-r.l-r.r,h:l-r.t-r.b,radius:{topLeft:Math.max(0,c.topLeft-Math.max(r.t,r.l)),topRight:Math.max(0,c.topRight-Math.max(r.t,r.r)),bottomLeft:Math.max(0,c.bottomLeft-Math.max(r.b,r.l)),bottomRight:Math.max(0,c.bottomRight-Math.max(r.b,r.r))}}}}function rd(s,e,n,l){const r=e===null,c=n===null,h=s&&!(r&&c)&&Jx(s,l);return h&&(r||kn(e,h.left,h.right))&&(c||kn(n,h.top,h.bottom))}function Aj(s){return s.topLeft||s.topRight||s.bottomLeft||s.bottomRight}function Cj(s,e){s.rect(e.x,e.y,e.w,e.h)}function od(s,e,n={}){const l=s.x!==n.x?-e:0,r=s.y!==n.y?-e:0,c=(s.x+s.w!==n.x+n.w?e:0)-l,u=(s.y+s.h!==n.y+n.h?e:0)-r;return{x:s.x+l,y:s.y+r,w:s.w+c,h:s.h+u,radius:s.radius}}class Mj extends Mn{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(e){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,e&&Object.assign(this,e)}draw(e){const{inflateAmount:n,options:{borderColor:l,backgroundColor:r}}=this,{inner:c,outer:u}=kj(this),h=Aj(u.radius)?_o:Cj;e.save(),(u.w!==c.w||u.h!==c.h)&&(e.beginPath(),h(e,od(u,n,c)),e.clip(),h(e,od(c,-n,u)),e.fillStyle=l,e.fill("evenodd")),e.beginPath(),h(e,od(c,n)),e.fillStyle=r,e.fill(),e.restore()}inRange(e,n,l){return rd(this,e,n,l)}inXRange(e,n){return rd(this,e,null,n)}inYRange(e,n){return rd(this,null,e,n)}getCenterPoint(e){const{x:n,y:l,base:r,horizontal:c}=this.getProps(["x","y","base","horizontal"],e);return{x:c?(n+r)/2:n,y:c?l:(l+r)/2}}getRange(e){return e==="x"?this.width/2:this.height/2}}const pd=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],zp=pd.map(s=>s.replace("rgb(","rgba(").replace(")",", 0.5)"));function Ix(s){return pd[s%pd.length]}function tb(s){return zp[s%zp.length]}function Dj(s,e){return s.borderColor=Ix(e),s.backgroundColor=tb(e),++e}function Rj(s,e){return s.backgroundColor=s.data.map(()=>Ix(e++)),e}function Oj(s,e){return s.backgroundColor=s.data.map(()=>tb(e++)),e}function zj(s){let e=0;return(n,l)=>{const r=s.getDatasetMeta(l).controller;r instanceof Yx?e=Rj(n,e):r instanceof o_?e=Oj(n,e):r&&(e=Dj(n,e))}}function Lp(s){let e;for(e in s)if(s[e].borderColor||s[e].backgroundColor)return!0;return!1}function Lj(s){return s&&(s.borderColor||s.backgroundColor)}function Bj(){return le.borderColor!=="rgba(0,0,0,0.1)"||le.backgroundColor!=="rgba(0,0,0,0.1)"}var Uj={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(s,e,n){if(!n.enabled)return;const{data:{datasets:l},options:r}=s.config,{elements:c}=r,u=Lp(l)||Lj(r)||c&&Lp(c)||Bj();if(!n.forceOverride&&u)return;const h=zj(s);l.forEach(h)}};const Bp=(s,e)=>{let{boxHeight:n=e,boxWidth:l=e}=s;return s.usePointStyle&&(n=Math.min(n,e),l=s.pointStyleWidth||Math.min(l,e)),{boxWidth:l,boxHeight:n,itemHeight:Math.max(e,n)}},Hj=(s,e)=>s!==null&&e!==null&&s.datasetIndex===e.datasetIndex&&s.index===e.index;class Up extends Mn{constructor(e){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,n,l){this.maxWidth=e,this.maxHeight=n,this._margins=l,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const e=this.options.labels||{};let n=ee(e.generateLabels,[this.chart],this)||[];e.filter&&(n=n.filter(l=>e.filter(l,this.chart.data))),e.sort&&(n=n.sort((l,r)=>e.sort(l,r,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:e,ctx:n}=this;if(!e.display){this.width=this.height=0;return}const l=e.labels,r=Be(l.font),c=r.size,u=this._computeTitleHeight(),{boxWidth:h,itemHeight:m}=Bp(l,c);let p,x;n.font=r.string,this.isHorizontal()?(p=this.maxWidth,x=this._fitRows(u,c,h,m)+10):(x=this.maxHeight,p=this._fitCols(u,r,h,m)+10),this.width=Math.min(p,e.maxWidth||this.maxWidth),this.height=Math.min(x,e.maxHeight||this.maxHeight)}_fitRows(e,n,l,r){const{ctx:c,maxWidth:u,options:{labels:{padding:h}}}=this,m=this.legendHitBoxes=[],p=this.lineWidths=[0],x=r+h;let y=e;c.textAlign="left",c.textBaseline="middle";let v=-1,_=-x;return this.legendItems.forEach((w,E)=>{const T=l+n/2+c.measureText(w.text).width;(E===0||p[p.length-1]+T+2*h>u)&&(y+=x,p[p.length-(E>0?0:1)]=0,_+=x,v++),m[E]={left:0,top:_,row:v,width:T,height:r},p[p.length-1]+=T+h}),y}_fitCols(e,n,l,r){const{ctx:c,maxHeight:u,options:{labels:{padding:h}}}=this,m=this.legendHitBoxes=[],p=this.columnSizes=[],x=u-e;let y=h,v=0,_=0,w=0,E=0;return this.legendItems.forEach((T,M)=>{const{itemWidth:O,itemHeight:V}=Pj(l,n,c,T,r);M>0&&_+V+2*h>x&&(y+=v+h,p.push({width:v,height:_}),w+=v+h,E++,v=_=0),m[M]={left:w,top:_,col:E,width:O,height:V},v=Math.max(v,O),_+=V+h}),y+=v,p.push({width:v,height:_}),y}adjustHitBoxes(){if(!this.options.display)return;const e=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:l,labels:{padding:r},rtl:c}}=this,u=pi(c,this.left,this.width);if(this.isHorizontal()){let h=0,m=Le(l,this.left+r,this.right-this.lineWidths[h]);for(const p of n)h!==p.row&&(h=p.row,m=Le(l,this.left+r,this.right-this.lineWidths[h])),p.top+=this.top+e+r,p.left=u.leftForLtr(u.x(m),p.width),m+=p.width+r}else{let h=0,m=Le(l,this.top+e+r,this.bottom-this.columnSizes[h].height);for(const p of n)p.col!==h&&(h=p.col,m=Le(l,this.top+e+r,this.bottom-this.columnSizes[h].height)),p.top=m,p.left+=this.left+r,p.left=u.leftForLtr(u.x(p.left),p.width),m+=p.height+r}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const e=this.ctx;Md(e,this),this._draw(),Dd(e)}}_draw(){const{options:e,columnSizes:n,lineWidths:l,ctx:r}=this,{align:c,labels:u}=e,h=le.color,m=pi(e.rtl,this.left,this.width),p=Be(u.font),{padding:x}=u,y=p.size,v=y/2;let _;this.drawTitle(),r.textAlign=m.textAlign("left"),r.textBaseline="middle",r.lineWidth=.5,r.font=p.string;const{boxWidth:w,boxHeight:E,itemHeight:T}=Bp(u,y),M=function(st,tt,at){if(isNaN(w)||w<=0||isNaN(E)||E<0)return;r.save();const it=zt(at.lineWidth,1);if(r.fillStyle=zt(at.fillStyle,h),r.lineCap=zt(at.lineCap,"butt"),r.lineDashOffset=zt(at.lineDashOffset,0),r.lineJoin=zt(at.lineJoin,"miter"),r.lineWidth=it,r.strokeStyle=zt(at.strokeStyle,h),r.setLineDash(zt(at.lineDash,[])),u.usePointStyle){const ft={radius:E*Math.SQRT2/2,pointStyle:at.pointStyle,rotation:at.rotation,borderWidth:it},nt=m.xPlus(st,w/2),rt=tt+v;Cx(r,ft,nt,rt,u.pointStyleWidth&&w)}else{const ft=tt+Math.max((y-E)/2,0),nt=m.leftForLtr(st,w),rt=gi(at.borderRadius);r.beginPath(),Object.values(rt).some(vt=>vt!==0)?_o(r,{x:nt,y:ft,w,h:E,radius:rt}):r.rect(nt,ft,w,E),r.fill(),it!==0&&r.stroke()}r.restore()},O=function(st,tt,at){Ol(r,at.text,st,tt+T/2,p,{strikethrough:at.hidden,textAlign:m.textAlign(at.textAlign)})},V=this.isHorizontal(),K=this._computeTitleHeight();V?_={x:Le(c,this.left+x,this.right-l[0]),y:this.top+x+K,line:0}:_={x:this.left+x,y:Le(c,this.top+K+x,this.bottom-n[0].height),line:0},Bx(this.ctx,e.textDirection);const Y=T+x;this.legendItems.forEach((st,tt)=>{r.strokeStyle=st.fontColor,r.fillStyle=st.fontColor;const at=r.measureText(st.text).width,it=m.textAlign(st.textAlign||(st.textAlign=u.textAlign)),ft=w+v+at;let nt=_.x,rt=_.y;m.setWidth(this.width),V?tt>0&&nt+ft+x>this.right&&(rt=_.y+=Y,_.line++,nt=_.x=Le(c,this.left+x,this.right-l[_.line])):tt>0&&rt+Y>this.bottom&&(nt=_.x=nt+n[_.line].width+x,_.line++,rt=_.y=Le(c,this.top+K+x,this.bottom-n[_.line].height));const vt=m.x(nt);if(M(vt,rt,st),nt=K1(it,nt+w+v,V?nt+ft:this.right,e.rtl),O(m.x(nt),rt,st),V)_.x+=ft+x;else if(typeof st.text!="string"){const xt=p.lineHeight;_.y+=eb(st,xt)+x}else _.y+=Y}),Ux(this.ctx,e.textDirection)}drawTitle(){const e=this.options,n=e.title,l=Be(n.font),r=Ea(n.padding);if(!n.display)return;const c=pi(e.rtl,this.left,this.width),u=this.ctx,h=n.position,m=l.size/2,p=r.top+m;let x,y=this.left,v=this.width;if(this.isHorizontal())v=Math.max(...this.lineWidths),x=this.top+p,y=Le(e.align,y,this.right-v);else{const w=this.columnSizes.reduce((E,T)=>Math.max(E,T.height),0);x=p+Le(e.align,this.top,this.bottom-w-e.labels.padding-this._computeTitleHeight())}const _=Le(h,y,y+v);u.textAlign=c.textAlign(Cd(h)),u.textBaseline="middle",u.strokeStyle=n.color,u.fillStyle=n.color,u.font=l.string,Ol(u,n.text,_,x,l)}_computeTitleHeight(){const e=this.options.title,n=Be(e.font),l=Ea(e.padding);return e.display?n.lineHeight+l.height:0}_getLegendItemAt(e,n){let l,r,c;if(kn(e,this.left,this.right)&&kn(n,this.top,this.bottom)){for(c=this.legendHitBoxes,l=0;l<c.length;++l)if(r=c[l],kn(e,r.left,r.left+r.width)&&kn(n,r.top,r.top+r.height))return this.legendItems[l]}return null}handleEvent(e){const n=this.options;if(!Vj(e.type,n))return;const l=this._getLegendItemAt(e.x,e.y);if(e.type==="mousemove"||e.type==="mouseout"){const r=this._hoveredItem,c=Hj(r,l);r&&!c&&ee(n.onLeave,[e,r,this],this),this._hoveredItem=l,l&&!c&&ee(n.onHover,[e,l,this],this)}else l&&ee(n.onClick,[e,l,this],this)}}function Pj(s,e,n,l,r){const c=qj(l,s,e,n),u=Yj(r,l,e.lineHeight);return{itemWidth:c,itemHeight:u}}function qj(s,e,n,l){let r=s.text;return r&&typeof r!="string"&&(r=r.reduce((c,u)=>c.length>u.length?c:u)),e+n.size/2+l.measureText(r).width}function Yj(s,e,n){let l=s;return typeof e.text!="string"&&(l=eb(e,n)),l}function eb(s,e){const n=s.text?s.text.length:0;return e*n}function Vj(s,e){return!!((s==="mousemove"||s==="mouseout")&&(e.onHover||e.onLeave)||e.onClick&&(s==="click"||s==="mouseup"))}var Fj={id:"legend",_element:Up,start(s,e,n){const l=s.legend=new Up({ctx:s.ctx,options:n,chart:s});wa.configure(s,l,n),wa.addBox(s,l)},stop(s){wa.removeBox(s,s.legend),delete s.legend},beforeUpdate(s,e,n){const l=s.legend;wa.configure(s,l,n),l.options=n},afterUpdate(s){const e=s.legend;e.buildLabels(),e.adjustHitBoxes()},afterEvent(s,e){e.replay||s.legend.handleEvent(e.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(s,e,n){const l=e.datasetIndex,r=n.chart;r.isDatasetVisible(l)?(r.hide(l),e.hidden=!0):(r.show(l),e.hidden=!1)},onHover:null,onLeave:null,labels:{color:s=>s.chart.options.color,boxWidth:40,padding:10,generateLabels(s){const e=s.data.datasets,{labels:{usePointStyle:n,pointStyle:l,textAlign:r,color:c,useBorderRadius:u,borderRadius:h}}=s.legend.options;return s._getSortedDatasetMetas().map(m=>{const p=m.controller.getStyle(n?0:void 0),x=Ea(p.borderWidth);return{text:e[m.index].label,fillStyle:p.backgroundColor,fontColor:c,hidden:!m.visible,lineCap:p.borderCapStyle,lineDash:p.borderDash,lineDashOffset:p.borderDashOffset,lineJoin:p.borderJoinStyle,lineWidth:(x.width+x.height)/4,strokeStyle:p.borderColor,pointStyle:l||p.pointStyle,rotation:p.rotation,textAlign:r||p.textAlign,borderRadius:u&&(h||p.borderRadius),datasetIndex:m.index}},this)}},title:{color:s=>s.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:s=>!s.startsWith("on"),labels:{_scriptable:s=>!["generateLabels","filter","sort"].includes(s)}}};class ab extends Mn{constructor(e){super(),this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,n){const l=this.options;if(this.left=0,this.top=0,!l.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=e,this.height=this.bottom=n;const r=_e(l.text)?l.text.length:1;this._padding=Ea(l.padding);const c=r*Be(l.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=c:this.width=c}isHorizontal(){const e=this.options.position;return e==="top"||e==="bottom"}_drawArgs(e){const{top:n,left:l,bottom:r,right:c,options:u}=this,h=u.align;let m=0,p,x,y;return this.isHorizontal()?(x=Le(h,l,c),y=n+e,p=c-l):(u.position==="left"?(x=l+e,y=Le(h,r,n),m=Zt*-.5):(x=c-e,y=Le(h,n,r),m=Zt*.5),p=r-n),{titleX:x,titleY:y,maxWidth:p,rotation:m}}draw(){const e=this.ctx,n=this.options;if(!n.display)return;const l=Be(n.font),c=l.lineHeight/2+this._padding.top,{titleX:u,titleY:h,maxWidth:m,rotation:p}=this._drawArgs(c);Ol(e,n.text,0,0,l,{color:n.color,maxWidth:m,rotation:p,textAlign:Cd(n.align),textBaseline:"middle",translation:[u,h]})}}function Xj(s,e){const n=new ab({ctx:s.ctx,options:e,chart:s});wa.configure(s,n,e),wa.addBox(s,n),s.titleBlock=n}var Gj={id:"title",_element:ab,start(s,e,n){Xj(s,n)},stop(s){const e=s.titleBlock;wa.removeBox(s,e),delete s.titleBlock},beforeUpdate(s,e,n){const l=s.titleBlock;wa.configure(s,l,n),l.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const El={average(s){if(!s.length)return!1;let e,n,l=new Set,r=0,c=0;for(e=0,n=s.length;e<n;++e){const h=s[e].element;if(h&&h.hasValue()){const m=h.tooltipPosition();l.add(m.x),r+=m.y,++c}}return c===0||l.size===0?!1:{x:[...l].reduce((h,m)=>h+m)/l.size,y:r/c}},nearest(s,e){if(!s.length)return!1;let n=e.x,l=e.y,r=Number.POSITIVE_INFINITY,c,u,h;for(c=0,u=s.length;c<u;++c){const m=s[c].element;if(m&&m.hasValue()){const p=m.getCenterPoint(),x=F1(e,p);x<r&&(r=x,h=m)}}if(h){const m=h.tooltipPosition();n=m.x,l=m.y}return{x:n,y:l}}};function Wa(s,e){return e&&(_e(e)?Array.prototype.push.apply(s,e):s.push(e)),s}function js(s){return(typeof s=="string"||s instanceof String)&&s.indexOf(`
`)>-1?s.split(`
`):s}function $j(s,e){const{element:n,datasetIndex:l,index:r}=e,c=s.getDatasetMeta(l).controller,{label:u,value:h}=c.getLabelAndValue(r);return{chart:s,label:u,parsed:c.getParsed(r),raw:s.data.datasets[l].data[r],formattedValue:h,dataset:c.getDataset(),dataIndex:r,datasetIndex:l,element:n}}function Hp(s,e){const n=s.chart.ctx,{body:l,footer:r,title:c}=s,{boxWidth:u,boxHeight:h}=e,m=Be(e.bodyFont),p=Be(e.titleFont),x=Be(e.footerFont),y=c.length,v=r.length,_=l.length,w=Ea(e.padding);let E=w.height,T=0,M=l.reduce((K,Y)=>K+Y.before.length+Y.lines.length+Y.after.length,0);if(M+=s.beforeBody.length+s.afterBody.length,y&&(E+=y*p.lineHeight+(y-1)*e.titleSpacing+e.titleMarginBottom),M){const K=e.displayColors?Math.max(h,m.lineHeight):m.lineHeight;E+=_*K+(M-_)*m.lineHeight+(M-1)*e.bodySpacing}v&&(E+=e.footerMarginTop+v*x.lineHeight+(v-1)*e.footerSpacing);let O=0;const V=function(K){T=Math.max(T,n.measureText(K).width+O)};return n.save(),n.font=p.string,Vt(s.title,V),n.font=m.string,Vt(s.beforeBody.concat(s.afterBody),V),O=e.displayColors?u+2+e.boxPadding:0,Vt(l,K=>{Vt(K.before,V),Vt(K.lines,V),Vt(K.after,V)}),O=0,n.font=x.string,Vt(s.footer,V),n.restore(),T+=w.width,{width:T,height:E}}function Qj(s,e){const{y:n,height:l}=e;return n<l/2?"top":n>s.height-l/2?"bottom":"center"}function Zj(s,e,n,l){const{x:r,width:c}=l,u=n.caretSize+n.caretPadding;if(s==="left"&&r+c+u>e.width||s==="right"&&r-c-u<0)return!0}function Kj(s,e,n,l){const{x:r,width:c}=n,{width:u,chartArea:{left:h,right:m}}=s;let p="center";return l==="center"?p=r<=(h+m)/2?"left":"right":r<=c/2?p="left":r>=u-c/2&&(p="right"),Zj(p,s,e,n)&&(p="center"),p}function Pp(s,e,n){const l=n.yAlign||e.yAlign||Qj(s,n);return{xAlign:n.xAlign||e.xAlign||Kj(s,e,n,l),yAlign:l}}function Wj(s,e){let{x:n,width:l}=s;return e==="right"?n-=l:e==="center"&&(n-=l/2),n}function Jj(s,e,n){let{y:l,height:r}=s;return e==="top"?l+=n:e==="bottom"?l-=r+n:l-=r/2,l}function qp(s,e,n,l){const{caretSize:r,caretPadding:c,cornerRadius:u}=s,{xAlign:h,yAlign:m}=n,p=r+c,{topLeft:x,topRight:y,bottomLeft:v,bottomRight:_}=gi(u);let w=Wj(e,h);const E=Jj(e,m,p);return m==="center"?h==="left"?w+=p:h==="right"&&(w-=p):h==="left"?w-=Math.max(x,v)+r:h==="right"&&(w+=Math.max(y,_)+r),{x:ea(w,0,l.width-e.width),y:ea(E,0,l.height-e.height)}}function ro(s,e,n){const l=Ea(n.padding);return e==="center"?s.x+s.width/2:e==="right"?s.x+s.width-l.right:s.x+l.left}function Yp(s){return Wa([],js(s))}function Ij(s,e,n){return Si(s,{tooltip:e,tooltipItems:n,type:"tooltip"})}function Vp(s,e){const n=e&&e.dataset&&e.dataset.tooltip&&e.dataset.tooltip.callbacks;return n?s.override(n):s}const sb={beforeTitle:vs,title(s){if(s.length>0){const e=s[0],n=e.chart.data.labels,l=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return e.dataset.label||"";if(e.label)return e.label;if(l>0&&e.dataIndex<l)return n[e.dataIndex]}return""},afterTitle:vs,beforeBody:vs,beforeLabel:vs,label(s){if(this&&this.options&&this.options.mode==="dataset")return s.label+": "+s.formattedValue||s.formattedValue;let e=s.dataset.label||"";e&&(e+=": ");const n=s.formattedValue;return Jt(n)||(e+=n),e},labelColor(s){const n=s.chart.getDatasetMeta(s.datasetIndex).controller.getStyle(s.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(s){const n=s.chart.getDatasetMeta(s.datasetIndex).controller.getStyle(s.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:vs,afterBody:vs,beforeFooter:vs,footer:vs,afterFooter:vs};function We(s,e,n,l){const r=s[e].call(n,l);return typeof r>"u"?sb[e].call(n,l):r}class Fp extends Mn{static positioners=El;constructor(e){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=e.chart,this.options=e.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(e){this.options=e,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const e=this._cachedAnimations;if(e)return e;const n=this.chart,l=this.options.setContext(this.getContext()),r=l.enabled&&n.options.animation&&l.animations,c=new Hx(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(c)),c}getContext(){return this.$context||(this.$context=Ij(this.chart.getContext(),this,this._tooltipItems))}getTitle(e,n){const{callbacks:l}=n,r=We(l,"beforeTitle",this,e),c=We(l,"title",this,e),u=We(l,"afterTitle",this,e);let h=[];return h=Wa(h,js(r)),h=Wa(h,js(c)),h=Wa(h,js(u)),h}getBeforeBody(e,n){return Yp(We(n.callbacks,"beforeBody",this,e))}getBody(e,n){const{callbacks:l}=n,r=[];return Vt(e,c=>{const u={before:[],lines:[],after:[]},h=Vp(l,c);Wa(u.before,js(We(h,"beforeLabel",this,c))),Wa(u.lines,We(h,"label",this,c)),Wa(u.after,js(We(h,"afterLabel",this,c))),r.push(u)}),r}getAfterBody(e,n){return Yp(We(n.callbacks,"afterBody",this,e))}getFooter(e,n){const{callbacks:l}=n,r=We(l,"beforeFooter",this,e),c=We(l,"footer",this,e),u=We(l,"afterFooter",this,e);let h=[];return h=Wa(h,js(r)),h=Wa(h,js(c)),h=Wa(h,js(u)),h}_createItems(e){const n=this._active,l=this.chart.data,r=[],c=[],u=[];let h=[],m,p;for(m=0,p=n.length;m<p;++m)h.push($j(this.chart,n[m]));return e.filter&&(h=h.filter((x,y,v)=>e.filter(x,y,v,l))),e.itemSort&&(h=h.sort((x,y)=>e.itemSort(x,y,l))),Vt(h,x=>{const y=Vp(e.callbacks,x);r.push(We(y,"labelColor",this,x)),c.push(We(y,"labelPointStyle",this,x)),u.push(We(y,"labelTextColor",this,x))}),this.labelColors=r,this.labelPointStyles=c,this.labelTextColors=u,this.dataPoints=h,h}update(e,n){const l=this.options.setContext(this.getContext()),r=this._active;let c,u=[];if(!r.length)this.opacity!==0&&(c={opacity:0});else{const h=El[l.position].call(this,r,this._eventPosition);u=this._createItems(l),this.title=this.getTitle(u,l),this.beforeBody=this.getBeforeBody(u,l),this.body=this.getBody(u,l),this.afterBody=this.getAfterBody(u,l),this.footer=this.getFooter(u,l);const m=this._size=Hp(this,l),p=Object.assign({},h,m),x=Pp(this.chart,l,p),y=qp(l,p,x,this.chart);this.xAlign=x.xAlign,this.yAlign=x.yAlign,c={opacity:1,x:y.x,y:y.y,width:m.width,height:m.height,caretX:h.x,caretY:h.y}}this._tooltipItems=u,this.$context=void 0,c&&this._resolveAnimations().update(this,c),e&&l.external&&l.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(e,n,l,r){const c=this.getCaretPosition(e,l,r);n.lineTo(c.x1,c.y1),n.lineTo(c.x2,c.y2),n.lineTo(c.x3,c.y3)}getCaretPosition(e,n,l){const{xAlign:r,yAlign:c}=this,{caretSize:u,cornerRadius:h}=l,{topLeft:m,topRight:p,bottomLeft:x,bottomRight:y}=gi(h),{x:v,y:_}=e,{width:w,height:E}=n;let T,M,O,V,K,Y;return c==="center"?(K=_+E/2,r==="left"?(T=v,M=T-u,V=K+u,Y=K-u):(T=v+w,M=T+u,V=K-u,Y=K+u),O=T):(r==="left"?M=v+Math.max(m,x)+u:r==="right"?M=v+w-Math.max(p,y)-u:M=this.caretX,c==="top"?(V=_,K=V-u,T=M-u,O=M+u):(V=_+E,K=V+u,T=M+u,O=M-u),Y=V),{x1:T,x2:M,x3:O,y1:V,y2:K,y3:Y}}drawTitle(e,n,l){const r=this.title,c=r.length;let u,h,m;if(c){const p=pi(l.rtl,this.x,this.width);for(e.x=ro(this,l.titleAlign,l),n.textAlign=p.textAlign(l.titleAlign),n.textBaseline="middle",u=Be(l.titleFont),h=l.titleSpacing,n.fillStyle=l.titleColor,n.font=u.string,m=0;m<c;++m)n.fillText(r[m],p.x(e.x),e.y+u.lineHeight/2),e.y+=u.lineHeight+h,m+1===c&&(e.y+=l.titleMarginBottom-h)}}_drawColorBox(e,n,l,r,c){const u=this.labelColors[l],h=this.labelPointStyles[l],{boxHeight:m,boxWidth:p}=c,x=Be(c.bodyFont),y=ro(this,"left",c),v=r.x(y),_=m<x.lineHeight?(x.lineHeight-m)/2:0,w=n.y+_;if(c.usePointStyle){const E={radius:Math.min(p,m)/2,pointStyle:h.pointStyle,rotation:h.rotation,borderWidth:1},T=r.leftForLtr(v,p)+p/2,M=w+m/2;e.strokeStyle=c.multiKeyBackground,e.fillStyle=c.multiKeyBackground,ap(e,E,T,M),e.strokeStyle=u.borderColor,e.fillStyle=u.backgroundColor,ap(e,E,T,M)}else{e.lineWidth=Lt(u.borderWidth)?Math.max(...Object.values(u.borderWidth)):u.borderWidth||1,e.strokeStyle=u.borderColor,e.setLineDash(u.borderDash||[]),e.lineDashOffset=u.borderDashOffset||0;const E=r.leftForLtr(v,p),T=r.leftForLtr(r.xPlus(v,1),p-2),M=gi(u.borderRadius);Object.values(M).some(O=>O!==0)?(e.beginPath(),e.fillStyle=c.multiKeyBackground,_o(e,{x:E,y:w,w:p,h:m,radius:M}),e.fill(),e.stroke(),e.fillStyle=u.backgroundColor,e.beginPath(),_o(e,{x:T,y:w+1,w:p-2,h:m-2,radius:M}),e.fill()):(e.fillStyle=c.multiKeyBackground,e.fillRect(E,w,p,m),e.strokeRect(E,w,p,m),e.fillStyle=u.backgroundColor,e.fillRect(T,w+1,p-2,m-2))}e.fillStyle=this.labelTextColors[l]}drawBody(e,n,l){const{body:r}=this,{bodySpacing:c,bodyAlign:u,displayColors:h,boxHeight:m,boxWidth:p,boxPadding:x}=l,y=Be(l.bodyFont);let v=y.lineHeight,_=0;const w=pi(l.rtl,this.x,this.width),E=function(at){n.fillText(at,w.x(e.x+_),e.y+v/2),e.y+=v+c},T=w.textAlign(u);let M,O,V,K,Y,st,tt;for(n.textAlign=u,n.textBaseline="middle",n.font=y.string,e.x=ro(this,T,l),n.fillStyle=l.bodyColor,Vt(this.beforeBody,E),_=h&&T!=="right"?u==="center"?p/2+x:p+2+x:0,K=0,st=r.length;K<st;++K){for(M=r[K],O=this.labelTextColors[K],n.fillStyle=O,Vt(M.before,E),V=M.lines,h&&V.length&&(this._drawColorBox(n,e,K,w,l),v=Math.max(y.lineHeight,m)),Y=0,tt=V.length;Y<tt;++Y)E(V[Y]),v=y.lineHeight;Vt(M.after,E)}_=0,v=y.lineHeight,Vt(this.afterBody,E),e.y-=c}drawFooter(e,n,l){const r=this.footer,c=r.length;let u,h;if(c){const m=pi(l.rtl,this.x,this.width);for(e.x=ro(this,l.footerAlign,l),e.y+=l.footerMarginTop,n.textAlign=m.textAlign(l.footerAlign),n.textBaseline="middle",u=Be(l.footerFont),n.fillStyle=l.footerColor,n.font=u.string,h=0;h<c;++h)n.fillText(r[h],m.x(e.x),e.y+u.lineHeight/2),e.y+=u.lineHeight+l.footerSpacing}}drawBackground(e,n,l,r){const{xAlign:c,yAlign:u}=this,{x:h,y:m}=e,{width:p,height:x}=l,{topLeft:y,topRight:v,bottomLeft:_,bottomRight:w}=gi(r.cornerRadius);n.fillStyle=r.backgroundColor,n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.beginPath(),n.moveTo(h+y,m),u==="top"&&this.drawCaret(e,n,l,r),n.lineTo(h+p-v,m),n.quadraticCurveTo(h+p,m,h+p,m+v),u==="center"&&c==="right"&&this.drawCaret(e,n,l,r),n.lineTo(h+p,m+x-w),n.quadraticCurveTo(h+p,m+x,h+p-w,m+x),u==="bottom"&&this.drawCaret(e,n,l,r),n.lineTo(h+_,m+x),n.quadraticCurveTo(h,m+x,h,m+x-_),u==="center"&&c==="left"&&this.drawCaret(e,n,l,r),n.lineTo(h,m+y),n.quadraticCurveTo(h,m,h+y,m),n.closePath(),n.fill(),r.borderWidth>0&&n.stroke()}_updateAnimationTarget(e){const n=this.chart,l=this.$animations,r=l&&l.x,c=l&&l.y;if(r||c){const u=El[e.position].call(this,this._active,this._eventPosition);if(!u)return;const h=this._size=Hp(this,e),m=Object.assign({},u,this._size),p=Pp(n,e,m),x=qp(e,m,p,n);(r._to!==x.x||c._to!==x.y)&&(this.xAlign=p.xAlign,this.yAlign=p.yAlign,this.width=h.width,this.height=h.height,this.caretX=u.x,this.caretY=u.y,this._resolveAnimations().update(this,x))}}_willRender(){return!!this.opacity}draw(e){const n=this.options.setContext(this.getContext());let l=this.opacity;if(!l)return;this._updateAnimationTarget(n);const r={width:this.width,height:this.height},c={x:this.x,y:this.y};l=Math.abs(l)<.001?0:l;const u=Ea(n.padding),h=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&h&&(e.save(),e.globalAlpha=l,this.drawBackground(c,e,r,n),Bx(e,n.textDirection),c.y+=u.top,this.drawTitle(c,e,n),this.drawBody(c,e,n),this.drawFooter(c,e,n),Ux(e,n.textDirection),e.restore())}getActiveElements(){return this._active||[]}setActiveElements(e,n){const l=this._active,r=e.map(({datasetIndex:h,index:m})=>{const p=this.chart.getDatasetMeta(h);if(!p)throw new Error("Cannot find a dataset at index "+h);return{datasetIndex:h,element:p.data[m],index:m}}),c=!xo(l,r),u=this._positionChanged(r,n);(c||u)&&(this._active=r,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(e,n,l=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const r=this.options,c=this._active||[],u=this._getActiveElements(e,c,n,l),h=this._positionChanged(u,e),m=n||!xo(u,c)||h;return m&&(this._active=u,(r.enabled||r.external)&&(this._eventPosition={x:e.x,y:e.y},this.update(!0,n))),m}_getActiveElements(e,n,l,r){const c=this.options;if(e.type==="mouseout")return[];if(!r)return n.filter(h=>this.chart.data.datasets[h.datasetIndex]&&this.chart.getDatasetMeta(h.datasetIndex).controller.getParsed(h.index)!==void 0);const u=this.chart.getElementsAtEventForMode(e,c.mode,c,l);return c.reverse&&u.reverse(),u}_positionChanged(e,n){const{caretX:l,caretY:r,options:c}=this,u=El[c.position].call(this,e,n);return u!==!1&&(l!==u.x||r!==u.y)}}var t2={id:"tooltip",_element:Fp,positioners:El,afterInit(s,e,n){n&&(s.tooltip=new Fp({chart:s,options:n}))},beforeUpdate(s,e,n){s.tooltip&&s.tooltip.initialize(n)},reset(s,e,n){s.tooltip&&s.tooltip.initialize(n)},afterDraw(s){const e=s.tooltip;if(e&&e._willRender()){const n={tooltip:e};if(s.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;e.draw(s.ctx),s.notifyPlugins("afterTooltipDraw",n)}},afterEvent(s,e){if(s.tooltip){const n=e.replay;s.tooltip.handleEvent(e.event,n,e.inChartArea)&&(e.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(s,e)=>e.bodyFont.size,boxWidth:(s,e)=>e.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:sb},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:s=>s!=="filter"&&s!=="itemSort"&&s!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};const e2=(s,e,n,l)=>(typeof e=="string"?(n=s.push(e)-1,l.unshift({index:n,label:e})):isNaN(e)&&(n=null),n);function a2(s,e,n,l){const r=s.indexOf(e);if(r===-1)return e2(s,e,n,l);const c=s.lastIndexOf(e);return r!==c?n:r}const s2=(s,e)=>s===null?null:ea(Math.round(s),0,e);function Xp(s){const e=this.getLabels();return s>=0&&s<e.length?e[s]:s}class n2 extends _i{static id="category";static defaults={ticks:{callback:Xp}};constructor(e){super(e),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(e){const n=this._addedLabels;if(n.length){const l=this.getLabels();for(const{index:r,label:c}of n)l[r]===c&&l.splice(r,1);this._addedLabels=[]}super.init(e)}parse(e,n){if(Jt(e))return null;const l=this.getLabels();return n=isFinite(n)&&l[n]===e?n:a2(l,e,zt(n,e),this._addedLabels),s2(n,l.length-1)}determineDataLimits(){const{minDefined:e,maxDefined:n}=this.getUserBounds();let{min:l,max:r}=this.getMinMax(!0);this.options.bounds==="ticks"&&(e||(l=0),n||(r=this.getLabels().length-1)),this.min=l,this.max=r}buildTicks(){const e=this.min,n=this.max,l=this.options.offset,r=[];let c=this.getLabels();c=e===0&&n===c.length-1?c:c.slice(e,n+1),this._valueRange=Math.max(c.length-(l?0:1),1),this._startValue=this.min-(l?.5:0);for(let u=e;u<=n;u++)r.push({value:u});return r}getLabelForValue(e){return Xp.call(this,e)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(e){return typeof e!="number"&&(e=this.parse(e)),e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getPixelForTick(e){const n=this.ticks;return e<0||e>n.length-1?null:this.getPixelForValue(n[e].value)}getValueForPixel(e){return Math.round(this._startValue+this.getDecimalForPixel(e)*this._valueRange)}getBasePixel(){return this.bottom}}function i2(s,e){const n=[],{bounds:r,step:c,min:u,max:h,precision:m,count:p,maxTicks:x,maxDigits:y,includeBounds:v}=s,_=c||1,w=x-1,{min:E,max:T}=e,M=!Jt(u),O=!Jt(h),V=!Jt(p),K=(T-E)/(y+1);let Y=$g((T-E)/w/_)*_,st,tt,at,it;if(Y<1e-14&&!M&&!O)return[{value:E},{value:T}];it=Math.ceil(T/Y)-Math.floor(E/Y),it>w&&(Y=$g(it*Y/w/_)*_),Jt(m)||(st=Math.pow(10,m),Y=Math.ceil(Y*st)/st),r==="ticks"?(tt=Math.floor(E/Y)*Y,at=Math.ceil(T/Y)*Y):(tt=E,at=T),M&&O&&c&&q1((h-u)/c,Y/1e3)?(it=Math.round(Math.min((h-u)/Y,x)),Y=(h-u)/it,tt=u,at=h):V?(tt=M?u:tt,at=O?h:at,it=p-1,Y=(at-tt)/it):(it=(at-tt)/Y,ho(it,Math.round(it),Y/1e3)?it=Math.round(it):it=Math.ceil(it));const ft=Math.max(Qg(Y),Qg(tt));st=Math.pow(10,Jt(m)?ft:m),tt=Math.round(tt*st)/st,at=Math.round(at*st)/st;let nt=0;for(M&&(v&&tt!==u?(n.push({value:u}),tt<u&&nt++,ho(Math.round((tt+nt*Y)*st)/st,u,Gp(u,K,s))&&nt++):tt<u&&nt++);nt<it;++nt){const rt=Math.round((tt+nt*Y)*st)/st;if(O&&rt>h)break;n.push({value:rt})}return O&&v&&at!==h?n.length&&ho(n[n.length-1].value,h,Gp(h,K,s))?n[n.length-1].value=h:n.push({value:h}):(!O||at===h)&&n.push({value:at}),n}function Gp(s,e,{horizontal:n,minRotation:l}){const r=es(l),c=(n?Math.sin(r):Math.cos(r))||.001,u=.75*e*(""+s).length;return Math.min(e/c,u)}class l2 extends _i{constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(e,n){return Jt(e)||(typeof e=="number"||e instanceof Number)&&!isFinite(+e)?null:+e}handleTickRangeOptions(){const{beginAtZero:e}=this.options,{minDefined:n,maxDefined:l}=this.getUserBounds();let{min:r,max:c}=this;const u=m=>r=n?r:m,h=m=>c=l?c:m;if(e){const m=an(r),p=an(c);m<0&&p<0?h(0):m>0&&p>0&&u(0)}if(r===c){let m=c===0?1:Math.abs(c*.05);h(c+m),e||u(r-m)}this.min=r,this.max=c}getTickLimit(){const e=this.options.ticks;let{maxTicksLimit:n,stepSize:l}=e,r;return l?(r=Math.ceil(this.max/l)-Math.floor(this.min/l)+1,r>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${l} would result generating up to ${r} ticks. Limiting to 1000.`),r=1e3)):(r=this.computeTickLimit(),n=n||11),n&&(r=Math.min(n,r)),r}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const e=this.options,n=e.ticks;let l=this.getTickLimit();l=Math.max(2,l);const r={maxTicks:l,bounds:e.bounds,min:e.min,max:e.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},c=this._range||this,u=i2(r,c);return e.bounds==="ticks"&&Y1(u,this,"value"),e.reverse?(u.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),u}configure(){const e=this.ticks;let n=this.min,l=this.max;if(super.configure(),this.options.offset&&e.length){const r=(l-n)/Math.max(e.length-1,1)/2;n-=r,l+=r}this._startValue=n,this._endValue=l,this._valueRange=l-n}getLabelForValue(e){return Ao(e,this.chart.options.locale,this.options.ticks.format)}}class r2 extends l2{static id="linear";static defaults={ticks:{callback:Ax.formatters.numeric}};determineDataLimits(){const{min:e,max:n}=this.getMinMax(!0);this.min=Na(e)?e:0,this.max=Na(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const e=this.isHorizontal(),n=e?this.width:this.height,l=es(this.options.ticks.minRotation),r=(e?Math.sin(l):Math.cos(l))||.001,c=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,c.lineHeight/r))}getPixelForValue(e){return e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getValueForPixel(e){return this._startValue+this.getDecimalForPixel(e)*this._valueRange}}const Oo={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ta=Object.keys(Oo);function $p(s,e){return s-e}function Qp(s,e){if(Jt(e))return null;const n=s._adapter,{parser:l,round:r,isoWeekday:c}=s._parseOpts;let u=e;return typeof l=="function"&&(u=l(u)),Na(u)||(u=typeof l=="string"?n.parse(u,l):n.parse(u)),u===null?null:(r&&(u=r==="week"&&(vo(c)||c===!0)?n.startOf(u,"isoWeek",c):n.startOf(u,r)),+u)}function Zp(s,e,n,l){const r=ta.length;for(let c=ta.indexOf(s);c<r-1;++c){const u=Oo[ta[c]],h=u.steps?u.steps:Number.MAX_SAFE_INTEGER;if(u.common&&Math.ceil((n-e)/(h*u.size))<=l)return ta[c]}return ta[r-1]}function o2(s,e,n,l,r){for(let c=ta.length-1;c>=ta.indexOf(n);c--){const u=ta[c];if(Oo[u].common&&s._adapter.diff(r,l,u)>=e-1)return u}return ta[n?ta.indexOf(n):0]}function c2(s){for(let e=ta.indexOf(s)+1,n=ta.length;e<n;++e)if(Oo[ta[e]].common)return ta[e]}function Kp(s,e,n){if(!n)s[e]=!0;else if(n.length){const{lo:l,hi:r}=Ad(n,e),c=n[l]>=e?n[l]:n[r];s[c]=!0}}function u2(s,e,n,l){const r=s._adapter,c=+r.startOf(e[0].value,l),u=e[e.length-1].value;let h,m;for(h=c;h<=u;h=+r.add(h,1,l))m=n[h],m>=0&&(e[m].major=!0);return e}function Wp(s,e,n){const l=[],r={},c=e.length;let u,h;for(u=0;u<c;++u)h=e[u],r[h]=u,l.push({value:h,major:!1});return c===0||!n?l:u2(s,l,r,n)}class Jp extends _i{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(e){super(e),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(e,n={}){const l=e.time||(e.time={}),r=this._adapter=new u_._date(e.adapters.date);r.init(n),Tl(l.displayFormats,r.formats()),this._parseOpts={parser:l.parser,round:l.round,isoWeekday:l.isoWeekday},super.init(e),this._normalized=n.normalized}parse(e,n){return e===void 0?null:Qp(this,e)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const e=this.options,n=this._adapter,l=e.time.unit||"day";let{min:r,max:c,minDefined:u,maxDefined:h}=this.getUserBounds();function m(p){!u&&!isNaN(p.min)&&(r=Math.min(r,p.min)),!h&&!isNaN(p.max)&&(c=Math.max(c,p.max))}(!u||!h)&&(m(this._getLabelBounds()),(e.bounds!=="ticks"||e.ticks.source!=="labels")&&m(this.getMinMax(!1))),r=Na(r)&&!isNaN(r)?r:+n.startOf(Date.now(),l),c=Na(c)&&!isNaN(c)?c:+n.endOf(Date.now(),l)+1,this.min=Math.min(r,c-1),this.max=Math.max(r+1,c)}_getLabelBounds(){const e=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY;return e.length&&(n=e[0],l=e[e.length-1]),{min:n,max:l}}buildTicks(){const e=this.options,n=e.time,l=e.ticks,r=l.source==="labels"?this.getLabelTimestamps():this._generate();e.bounds==="ticks"&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);const c=this.min,u=this.max,h=$1(r,c,u);return this._unit=n.unit||(l.autoSkip?Zp(n.minUnit,this.min,this.max,this._getLabelCapacity(c)):o2(this,h.length,n.minUnit,this.min,this.max)),this._majorUnit=!l.major.enabled||this._unit==="year"?void 0:c2(this._unit),this.initOffsets(r),e.reverse&&h.reverse(),Wp(this,h,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(e=>+e.value))}initOffsets(e=[]){let n=0,l=0,r,c;this.options.offset&&e.length&&(r=this.getDecimalForValue(e[0]),e.length===1?n=1-r:n=(this.getDecimalForValue(e[1])-r)/2,c=this.getDecimalForValue(e[e.length-1]),e.length===1?l=c:l=(c-this.getDecimalForValue(e[e.length-2]))/2);const u=e.length<3?.5:.25;n=ea(n,0,u),l=ea(l,0,u),this._offsets={start:n,end:l,factor:1/(n+1+l)}}_generate(){const e=this._adapter,n=this.min,l=this.max,r=this.options,c=r.time,u=c.unit||Zp(c.minUnit,n,l,this._getLabelCapacity(n)),h=zt(r.ticks.stepSize,1),m=u==="week"?c.isoWeekday:!1,p=vo(m)||m===!0,x={};let y=n,v,_;if(p&&(y=+e.startOf(y,"isoWeek",m)),y=+e.startOf(y,p?"day":u),e.diff(l,n,u)>1e5*h)throw new Error(n+" and "+l+" are too far apart with stepSize of "+h+" "+u);const w=r.ticks.source==="data"&&this.getDataTimestamps();for(v=y,_=0;v<l;v=+e.add(v,h,u),_++)Kp(x,v,w);return(v===l||r.bounds==="ticks"||_===1)&&Kp(x,v,w),Object.keys(x).sort($p).map(E=>+E)}getLabelForValue(e){const n=this._adapter,l=this.options.time;return l.tooltipFormat?n.format(e,l.tooltipFormat):n.format(e,l.displayFormats.datetime)}format(e,n){const r=this.options.time.displayFormats,c=this._unit,u=n||r[c];return this._adapter.format(e,u)}_tickFormatFunction(e,n,l,r){const c=this.options,u=c.ticks.callback;if(u)return ee(u,[e,n,l],this);const h=c.time.displayFormats,m=this._unit,p=this._majorUnit,x=m&&h[m],y=p&&h[p],v=l[n],_=p&&y&&v&&v.major;return this._adapter.format(e,r||(_?y:x))}generateTickLabels(e){let n,l,r;for(n=0,l=e.length;n<l;++n)r=e[n],r.label=this._tickFormatFunction(r.value,n,e)}getDecimalForValue(e){return e===null?NaN:(e-this.min)/(this.max-this.min)}getPixelForValue(e){const n=this._offsets,l=this.getDecimalForValue(e);return this.getPixelForDecimal((n.start+l)*n.factor)}getValueForPixel(e){const n=this._offsets,l=this.getDecimalForPixel(e)/n.factor-n.end;return this.min+l*(this.max-this.min)}_getLabelSize(e){const n=this.options.ticks,l=this.ctx.measureText(e).width,r=es(this.isHorizontal()?n.maxRotation:n.minRotation),c=Math.cos(r),u=Math.sin(r),h=this._resolveTickFontOptions(0).size;return{w:l*c+h*u,h:l*u+h*c}}_getLabelCapacity(e){const n=this.options.time,l=n.displayFormats,r=l[n.unit]||l.millisecond,c=this._tickFormatFunction(e,0,Wp(this,[e],this._majorUnit),r),u=this._getLabelSize(c),h=Math.floor(this.isHorizontal()?this.width/u.w:this.height/u.h)-1;return h>0?h:1}getDataTimestamps(){let e=this._cache.data||[],n,l;if(e.length)return e;const r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(n=0,l=r.length;n<l;++n)e=e.concat(r[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(e)}getLabelTimestamps(){const e=this._cache.labels||[];let n,l;if(e.length)return e;const r=this.getLabels();for(n=0,l=r.length;n<l;++n)e.push(Qp(this,r[n]));return this._cache.labels=this._normalized?e:this.normalize(e)}normalize(e){return Nx(e.sort($p))}}function oo(s,e,n){let l=0,r=s.length-1,c,u,h,m;n?(e>=s[l].pos&&e<=s[r].pos&&({lo:l,hi:r}=fd(s,"pos",e)),{pos:c,time:h}=s[l],{pos:u,time:m}=s[r]):(e>=s[l].time&&e<=s[r].time&&({lo:l,hi:r}=fd(s,"time",e)),{time:c,pos:h}=s[l],{time:u,pos:m}=s[r]);const p=u-c;return p?h+(m-h)*(e-c)/p:h}class k2 extends Jp{static id="timeseries";static defaults=Jp.defaults;constructor(e){super(e),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const e=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(e);this._minPos=oo(n,this.min),this._tableRange=oo(n,this.max)-this._minPos,super.initOffsets(e)}buildLookupTable(e){const{min:n,max:l}=this,r=[],c=[];let u,h,m,p,x;for(u=0,h=e.length;u<h;++u)p=e[u],p>=n&&p<=l&&r.push(p);if(r.length<2)return[{time:n,pos:0},{time:l,pos:1}];for(u=0,h=r.length;u<h;++u)x=r[u+1],m=r[u-1],p=r[u],Math.round((x+m)/2)!==p&&c.push({time:p,pos:u/(h-1)});return c}_generate(){const e=this.min,n=this.max;let l=super.getDataTimestamps();return(!l.includes(e)||!l.length)&&l.splice(0,0,e),(!l.includes(n)||l.length===1)&&l.push(n),l.sort((r,c)=>r-c)}_getTimestampsForTable(){let e=this._cache.all||[];if(e.length)return e;const n=this.getDataTimestamps(),l=this.getLabelTimestamps();return n.length&&l.length?e=this.normalize(n.concat(l)):e=n.length?n:l,e=this._cache.all=e,e}getDecimalForValue(e){return(oo(this._table,e)-this._minPos)/this._tableRange}getValueForPixel(e){const n=this._offsets,l=this.getDecimalForPixel(e)/n.factor-n.end;return oo(this._table,l*this._tableRange+this._minPos,!0)}}const nb="label";function Ip(s,e){typeof s=="function"?s(e):s&&(s.current=e)}function d2(s,e){const n=s.options;n&&e&&Object.assign(n,e)}function ib(s,e){s.labels=e}function lb(s,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:nb;const l=[];s.datasets=e.map(r=>{const c=s.datasets.find(u=>u[n]===r[n]);return!c||!r.data||l.includes(c)?{...r}:(l.push(c),Object.assign(c,r),c)})}function f2(s){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:nb;const n={labels:[],datasets:[]};return ib(n,s.labels),lb(n,s.datasets,e),n}function h2(s,e){const{height:n=150,width:l=300,redraw:r=!1,datasetIdKey:c,type:u,data:h,options:m,plugins:p=[],fallbackContent:x,updateMode:y,...v}=s,_=j.useRef(null),w=j.useRef(null),E=()=>{_.current&&(w.current=new Ro(_.current,{type:u,data:f2(h,c),options:m&&{...m},plugins:p}),Ip(e,w.current))},T=()=>{Ip(e,null),w.current&&(w.current.destroy(),w.current=null)};return j.useEffect(()=>{!r&&w.current&&m&&d2(w.current,m)},[r,m]),j.useEffect(()=>{!r&&w.current&&ib(w.current.config.data,h.labels)},[r,h.labels]),j.useEffect(()=>{!r&&w.current&&h.datasets&&lb(w.current.config.data,h.datasets,c)},[r,h.datasets]),j.useEffect(()=>{w.current&&(r?(T(),setTimeout(E)):w.current.update(y))},[r,m,h.labels,h.datasets,y]),j.useEffect(()=>{w.current&&(T(),setTimeout(E))},[u]),j.useEffect(()=>(E(),()=>T()),[]),tx.createElement("canvas",{ref:_,role:"img",height:n,width:l,...v},x)}const m2=j.forwardRef(h2);function rb(s,e){return Ro.register(e),j.forwardRef((n,l)=>tx.createElement(m2,{...n,ref:l,type:s}))}const g2=rb("bar",l_),p2=rb("pie",c_),zo=({message:s,type:e="info",onClose:n,duration:l=5e3})=>{j.useEffect(()=>{const c=setTimeout(()=>{n()},l);return()=>clearTimeout(c)},[l,n]);const r=()=>{switch(e){case"success":return"alert-success";case"error":return"alert-error";case"warning":return"alert-warning";case"info":default:return"alert-info"}};return d.jsx("div",{className:`custom-alert ${r()}`,children:d.jsxs("div",{className:"alert-content",children:[d.jsx("span",{className:"alert-message",children:s}),d.jsx("button",{className:"alert-close",onClick:n,children:"×"})]})})},ob=document.createElement("style");ob.innerHTML=`
  .custom-alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideInRight 0.3s ease, fadeOut 0.5s ease 4.5s forwards;
    overflow: hidden;
  }

  .alert-content {
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-between;
  }

  .alert-message {
    flex: 1;
    font-weight: 500;
  }

  .alert-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
    color: inherit;
    opacity: 0.7;
  }

  .alert-close:hover {
    opacity: 1;
  }

  .alert-success {
    background: linear-gradient(135deg, #4ade80, #22c55e);
    color: white;
  }

  .alert-error {
    background: linear-gradient(135deg, #f87171, #ef4444);
    color: white;
  }

  .alert-warning {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
  }

  .alert-info {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: white;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0%, 90% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;document.head.appendChild(ob);const Pd=({message:s,onConfirm:e,onCancel:n,type:l="warning"})=>{const r=u=>{u.target===u.currentTarget&&n()},c=()=>{switch(l){case"danger":return"confirm-btn-danger";case"success":return"confirm-btn-success";case"info":return"confirm-btn-info";case"warning":default:return"confirm-btn-warning"}};return d.jsx("div",{className:"confirm-overlay",onClick:r,children:d.jsxs("div",{className:"confirm-modal",children:[d.jsxs("div",{className:"confirm-content",children:[d.jsx("div",{className:"confirm-icon",children:l==="danger"?d.jsx("i",{className:"fas fa-exclamation-triangle"}):l==="success"?d.jsx("i",{className:"fas fa-check-circle"}):l==="info"?d.jsx("i",{className:"fas fa-info-circle"}):d.jsx("i",{className:"fas fa-exclamation-circle"})}),d.jsx("p",{className:"confirm-message",children:s})]}),d.jsxs("div",{className:"confirm-actions",children:[d.jsx("button",{className:"confirm-btn-cancel",onClick:n,children:"Cancelar"}),d.jsx("button",{className:`confirm-btn-confirm ${c()}`,onClick:e,children:"Confirmar"})]})]})})},cb=document.createElement("style");cb.innerHTML=`
  .confirm-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }

  .confirm-modal {
    background: var(--card-background);
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
    overflow: hidden;
    animation: modalSlideIn 0.3s ease;
  }

  .confirm-content {
    padding: 25px;
    text-align: center;
  }

  .confirm-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--warning-color);
  }

  .confirm-btn-warning .confirm-icon {
    color: var(--warning-color);
  }
  
  .confirm-btn-danger .confirm-icon {
    color: var(--danger-color);
  }
  
  .confirm-btn-success .confirm-icon {
    color: var(--success-color);
  }
  
  .confirm-btn-info .confirm-icon {
    color: var(--info-color, #3b82f6);
  }

  .confirm-message {
    font-size: 1.1rem;
    color: var(--text-color);
    margin: 0;
    line-height: 1.5;
  }

  .confirm-actions {
    display: flex;
    gap: 10px;
    padding: 15px 25px;
    border-top: 1px solid var(--border-color);
    background-color: var(--card-background-light, rgba(0,0,0,0.03));
  }

  .confirm-btn-cancel,
  .confirm-btn-confirm {
    flex: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .confirm-btn-cancel {
    background-color: var(--border-color);
    color: var(--text-color);
  }

  .confirm-btn-cancel:hover {
    background-color: #e2e6ea;
  }

  .confirm-btn-confirm {
    background-color: var(--warning-color);
    color: white;
  }

  .confirm-btn-danger {
    background-color: var(--danger-color) !important;
  }

  .confirm-btn-success {
    background-color: var(--success-color) !important;
  }

  .confirm-btn-info {
    background-color: var(--info-color, #3b82f6) !important;
  }

  .confirm-btn-warning {
    background-color: var(--warning-color) !important;
  }

  .confirm-btn-confirm:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;document.head.appendChild(cb);Ro.register(Nj,t2,Fj,n2,r2,Mj,Gj,Uj);function ub({user:s,darkMode:e,toggleDarkMode:n,onLogout:l}){const[r,c]=j.useState("dashboard"),[u,h]=j.useState(!1),[m,p]=j.useState(!1),[x,y]=j.useState({name:s?.name||""}),[v,_]=j.useState("users"),[w,E]=j.useState(s?.profilePicture||"https://i.pravatar.cc/40"),[T,M]=j.useState(null),[O,V]=j.useState(!1),[K,Y]=j.useState({teachers:!1,students:!1,reports:!1,school:!1,users:!1}),[st,tt]=j.useState({teachers:null,students:null,reports:null,school:null,users:null}),[at,it]=j.useState([]),[ft,nt]=j.useState([]),[rt,vt]=j.useState([]),[xt,dt]=j.useState([]),[B,W]=j.useState(null),[lt,St]=j.useState([]),[A,$]=j.useState("all"),[G,J]=j.useState({students:0,teachers:0,admins:0}),[I,_t]=j.useState({students:0,teachers:0}),[ht,ae]=j.useState(""),[bt,jt]=j.useState({startDate:"",endDate:""}),[Ve,ke]=j.useState(!1),[Fe,aa]=j.useState([]);j.useState({name:"",subject:"",email:"",role:"teacher"});const[Ue,Ft]=j.useState(null),[Ta,ye]=j.useState(!1),[Ba]=j.useState(null),[Ua]=j.useState(""),[Nt,De]=j.useState({name:"",email:"",password:"",confirmPassword:"",role:"student",studentId:"",grade:"",subjects:""}),[he,ka]=j.useState(!1),[Xe,Re]=j.useState(""),[Ge,It]=j.useState(""),me=C=>{c(C)},ce=()=>{Ba&&Ba(),ye(!1)},Ha=()=>{ye(!1)},ha=async()=>{Y(C=>({...C,teachers:!0})),tt(C=>({...C,teachers:null}));try{const C=await bl.getUsers({role:"teacher",school_id:s.school_id});if(C.data){const et=C.data.map(ut=>({id:ut._id,name:ut.name,subject:ut.teaching?.subjects?.[0]||"N/A",email:ut.email,classes:ut.teaching?.classes?.length||0,createdAt:ut.createdAt}));it(et)}}catch(C){console.error("Erro ao carregar professores:",C),tt(et=>({...et,teachers:C.message||"Erro ao carregar professores"})),Ft({message:"Erro ao carregar professores: "+(C.message||"Erro de conexão"),type:"error"}),it([])}finally{Y(C=>({...C,teachers:!1}))}},z=async()=>{Y(C=>({...C,students:!0})),tt(C=>({...C,students:null}));try{const C=await bl.getUsers({role:"student",school_id:s.school_id});if(C.data){const et=C.data.map(ut=>({id:ut._id,name:ut.name,class:ut.academic?.grade||ut.academic?.class||"N/A",avg:ut.academic?.avg||0,createdAt:ut.createdAt}));nt(et),aa(et)}}catch(C){console.error("Erro ao carregar alunos:",C),tt(et=>({...et,students:C.message||"Erro ao carregar alunos"})),Ft({message:"Erro ao carregar alunos: "+(C.message||"Erro de conexão"),type:"error"}),nt([])}finally{Y(C=>({...C,students:!1}))}},ot=async()=>{Y(C=>({...C,school:!0})),tt(C=>({...C,school:null}));try{const C=await s1.getSchoolStats(s.school_id);C.data&&W(C.data)}catch(C){console.error("Erro ao carregar estatísticas da escola:",C),tt(et=>({...et,school:C.message||"Erro ao carregar estatísticas da escola"})),Ft({message:"Erro ao carregar estatísticas da escola: "+(C.message||"Erro de conexão"),type:"error"})}finally{Y(C=>({...C,school:!1}))}},Ut=async()=>{Y(C=>({...C,reports:!0})),tt(C=>({...C,reports:null}));try{const C=await Hg.getReports({type:"school-performance"});if(C.data){const et=C.data.map(ut=>({id:ut._id,title:ut.title||"Relatório",date:ut.createdAt?new Date(ut.createdAt).toLocaleDateString("pt-BR"):"N/A",status:ut.status||"Pendente",type:ut.type||"school-performance"}));vt(et)}}catch(C){console.error("Erro ao carregar relatórios:",C),tt(et=>({...et,reports:C.message||"Erro ao carregar relatórios"})),Ft({message:"Erro ao carregar relatórios: "+(C.message||"Erro de conexão"),type:"error"}),vt([])}finally{Y(C=>({...C,reports:!1}))}},Pt=C=>{const et=C.reduce((mt,Rt)=>(Rt.role==="student"?mt.students++:Rt.role==="teacher"?mt.teachers++:Rt.role==="school_admin"&&mt.admins++,mt),{students:0,teachers:0,admins:0}),ut=new Date;ut.setMonth(ut.getMonth()-6);const k=new Date;k.setMonth(k.getMonth()-12);const F=C.reduce((mt,Rt)=>{const ue=new Date(Rt.createdAt);return Rt.role==="student"&&ue>=ut?mt.students++:Rt.role==="teacher"&&ue>=k&&mt.teachers++,mt},{students:0,teachers:0});return{distribution:et,recentRegs:F}},sa=async()=>{Y(C=>({...C,users:!0})),tt(C=>({...C,users:null}));try{const C=await bl.getUsers({school_id:s.school_id});if(C.data){const et=C.data.map(F=>({id:F._id,name:F.name,email:F.email,role:F.role,roleDisplay:F.role==="student"?"Aluno":F.role==="teacher"?"Professor":F.role==="school_admin"?"Administrador":F.role,class:F.academic?.grade||F.academic?.class||"N/A",avg:F.academic?.avg||0,subject:F.teaching?.subjects?.[0]||"N/A",classes:F.teaching?.classes?.length||0,createdAt:F.createdAt}));St(et);const{distribution:ut,recentRegs:k}=Pt(et);J(ut),_t(k)}}catch(C){console.error("Erro ao carregar usuários:",C),tt(et=>({...et,users:C.message||"Erro ao carregar usuários"})),Ft({message:"Erro ao carregar usuários: "+(C.message||"Erro de conexão"),type:"error"}),St([])}finally{Y(C=>({...C,users:!1}))}},Aa=async C=>{if(C.preventDefault(),!ht||!bt.startDate||!bt.endDate){Ft({message:"Por favor, selecione um aluno e um período válido para gerar o relatório.",type:"warning"});return}ke(!0);try{const et=await Hg.generateStudentReport(ht,{startDate:bt.startDate,endDate:bt.endDate}),ut=Fe.find(F=>F.id===ht),k={id:et.data._id||xt.length+1,student:ut?.name||"Aluno Desconhecido",class:ut?.class||"N/A",subject:et.data.subject||"Geral",avg:et.data?.data?.overallScore||0,pomodoroSessions:et.data?.data?.pomodoroMetrics?.totalSessions||0,taskCompletion:et.data?.data?.taskMetrics?.completionRate||0,generationDate:new Date().toLocaleDateString("pt-BR")};dt(F=>[...F,k]),ae(""),jt({startDate:"",endDate:""}),Ft({message:"Relatório gerado com sucesso!",type:"success"})}catch(et){console.error("Erro ao gerar relatório:",et),Ft({message:"Erro ao gerar relatório: "+(et.message||"Erro de conexão"),type:"error"})}finally{ke(!1)}},Ca=()=>{h(!0)},Pa=()=>{h(!1),p(!1)},ks=()=>{p(!0)},ss=()=>{y({name:s?.name||""}),E(s?.profilePicture||"https://i.pravatar.cc/40"),M(null),p(!1)},na=C=>{const{name:et,value:ut}=C.target;y(k=>({...k,[et]:ut}))},rn=C=>{const et=C.target.files[0];if(et){const ut=new FileReader;ut.onloadend=()=>{E(ut.result)},ut.readAsDataURL(et)}},qa=()=>{document.getElementById("profile-image-upload").click()},As=async()=>{try{const C=T;let et;if(C){const k=new FormData;k.append("name",x.name),k.append("profilePicture",C),et=await fa.updateProfile(k)}else et=await fa.updateProfile({name:x.name});const ut={...s,name:et.data.user.name,profilePicture:et.data.user.profile?.avatar||et.data.user.profilePicture||s?.profilePicture};localStorage.setItem("user",JSON.stringify(ut)),p(!1),M(null),Ft({message:"Perfil atualizado com sucesso!",type:"success"})}catch(C){console.error("Erro ao atualizar perfil:",C),Ft({message:"Erro ao atualizar perfil: "+(C.message||"Erro de conexão"),type:"error"})}},Ya=async(C,et)=>{showConfirmation(`Tem certeza que deseja excluir o usuário "${et}"? Esta ação não pode ser desfeita.`,async()=>{try{await bl.deleteUser(C),await sa(),await z(),await ha(),Ft({message:`Usuário "${et}" excluído com sucesso!`,type:"success"})}catch(ut){console.error("Erro ao excluir usuário:",ut),Ft({message:"Erro ao excluir usuário: "+(ut.message||"Erro de conexão"),type:"error"})}},"warning")},He=C=>{De({...Nt,[C.target.name]:C.target.value})},Va=async C=>{if(C.preventDefault(),Re(""),It(""),Nt.password!==Nt.confirmPassword){Re("As senhas não coincidem");return}if(Nt.password.length<6){Re("A senha deve ter pelo menos 6 caracteres");return}if(!Nt.name||!Nt.email||!Nt.password){Re("Por favor, preencha todos os campos obrigatórios");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Nt.email)){Re("Por favor, insira um email válido");return}ka(!0);try{const ut={name:Nt.name,email:Nt.email,password:Nt.password,role:Nt.role};Nt.role==="student"?(ut.studentId=Nt.studentId,ut.grade=Nt.grade):Nt.role==="teacher"&&(ut.subjects=Nt.subjects.split(",").map(k=>k.trim()).filter(k=>k)),await bl.createUser(ut),It("Usuário criado com sucesso na instituição!"),sa(),z(),ha(),De({name:"",email:"",password:"",confirmPassword:"",role:"student",studentId:"",grade:"",subjects:""})}catch(ut){ut.message.includes("Email já cadastrado")?Re("Este email já está cadastrado. Tente outro email."):Re(ut.message||"Erro ao registrar. Por favor, tente novamente.")}finally{ka(!1)}},Ma=(C,et)=>{try{let ut="";if(C.length>0){const Rt=Object.keys(C[0]).join(",");ut+=Rt+"\\n",C.forEach(ue=>{const Xt=Object.values(ue).map(qe=>typeof qe=="string"&&(qe.includes(",")||qe.includes('"'))?`"${qe.replace(/"/g,'""')}"`:qe).join(",");ut+=Xt+"\\n"})}const k=new Blob(["\\uFEFF"+ut],{type:"text/csv;charset=utf-8;"}),F=document.createElement("a"),mt=URL.createObjectURL(k);F.setAttribute("href",mt),F.setAttribute("download",`${et}.csv`),F.style.visibility="hidden",document.body.appendChild(F),F.click(),document.body.removeChild(F),Ft({message:`Relatório "${et}" exportado com sucesso!`,type:"success"})}catch(ut){console.error("Erro ao exportar para Excel:",ut),Ft({message:"Erro ao exportar relatório: "+(ut.message||"Erro de conexão"),type:"error"})}},Pe=()=>{const C=lt.map(et=>({Nome:et.name,Email:et.email,Tipo:et.roleDisplay,Detalhes:et.role==="student"?`Turma: ${et.class}, Média: ${et.avg.toFixed(1)}`:et.role==="teacher"?`Disciplina: ${et.subject}, Turmas: ${et.classes}`:"Administrador","Data de Registro":et.createdAt?new Date(et.createdAt).toLocaleDateString("pt-BR"):"N/A"}));Ma(C,"relatorio_usuarios")},Kt=()=>{const C=[{Categoria:"Alunos",Quantidade:G.students},{Categoria:"Professores",Quantidade:G.teachers},{Categoria:"Administradores",Quantidade:G.admins}];Ma(C,"relatorio_distribuicao_usuarios")},ge=()=>{const C=[{Período:"Alunos (últimos 6 meses)",Quantidade:I.students},{Período:"Professores (último ano)",Quantidade:I.teachers}];Ma(C,"relatorio_cadastros_recentes")},we=({data:C,total:et})=>{const ut={labels:C.map(F=>F.label),datasets:[{data:C.map(F=>F.value),backgroundColor:C.map(F=>F.color),borderColor:C.map(F=>F.color),borderWidth:1,hoverOffset:4}]},k={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{padding:10,usePointStyle:!0,pointStyle:"circle",font:{size:12}}},tooltip:{callbacks:{label:function(F){const mt=F.label||"",Rt=F.raw||0,ue=et>0?(Rt/et*100).toFixed(1):0;return`${mt}: ${Rt} (${ue}%)`}}}},animation:{animateRotate:!0,animateScale:!0,duration:1e3}};return d.jsx("div",{style:{position:"relative",height:"200px",width:"100%"},children:d.jsx(p2,{data:ut,options:k})})},R=({data:C})=>{const et={labels:C.map(k=>k.label),datasets:[{label:"Quantidade",data:C.map(k=>k.value),backgroundColor:C.map(k=>k.color),borderColor:C.map(k=>k.borderColor||k.color),borderWidth:1,borderRadius:4,hoverBackgroundColor:C.map(k=>k.hoverColor||k.color)}]},ut={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(k){return`Quantidade: ${k.raw}`}}}},scales:{y:{beginAtZero:!0,ticks:{precision:0,font:{size:10}}},x:{ticks:{font:{size:10}}}},animation:{duration:1e3,easing:"easeInOutQuart"}};return d.jsx("div",{style:{position:"relative",height:"200px",width:"100%"},children:d.jsx(g2,{data:et,options:ut})})};j.useEffect(()=>{ha(),z(),Ut(),ot(),sa();const C=document.createElement("script");return C.src="https://kit.fontawesome.com/a076d05399.js",C.crossOrigin="anonymous",document.body.appendChild(C),()=>{document.body.removeChild(C)}},[s.school_id]);const ct={dashboard:"Dashboard Escola",users:"Lista de Usuários",reports:"Relatórios",performance:"Desempenho",register:"Registro de Usuário"};return d.jsxs("div",{className:"container",children:[d.jsxs("div",{className:`sidebar ${O?"open":""}`,children:[d.jsx("div",{className:"logo",children:d.jsxs("h1",{children:["Pomo",d.jsx("span",{children:"dash"})]})}),d.jsxs("div",{className:"menu",children:[d.jsxs("div",{className:`menu-item ${r==="dashboard"?"active":""}`,onClick:()=>{me("dashboard"),V(!1)},children:[d.jsx("i",{className:"fas fa-tachometer-alt"}),d.jsx("span",{children:"Dashboard"})]}),d.jsxs("div",{className:`menu-item ${r==="users"?"active":""}`,onClick:()=>{me("users"),V(!1)},children:[d.jsx("i",{className:"fas fa-users"}),d.jsx("span",{children:"Usuários"})]}),d.jsxs("div",{className:`menu-item ${r==="register"?"active":""}`,onClick:()=>{me("register"),V(!1)},children:[d.jsx("i",{className:"fas fa-user-plus"}),d.jsx("span",{children:"Registrar Usuário"})]}),d.jsxs("div",{className:`menu-item ${r==="reports"?"active":""}`,onClick:()=>{me("reports"),V(!1)},children:[d.jsx("i",{className:"fas fa-file-export"}),d.jsx("span",{children:"Relatórios"})]})]}),d.jsxs("div",{className:"profile",onClick:()=>{Ca(),V(!1)},children:[d.jsxs("div",{className:"profile-img-container",children:[d.jsx("img",{src:w,alt:"Instituição",className:"profile-img"}),d.jsx("button",{className:"profile-img-upload-btn",title:"Alterar foto",onClick:C=>{C.stopPropagation(),qa()},children:d.jsx("i",{className:"fas fa-camera"})})]}),d.jsx("div",{className:"profile-name",children:s?.name||"Instituição"})]})]}),O&&d.jsx("div",{className:"sidebar-overlay",onClick:()=>V(!1)}),d.jsxs("div",{className:"main-content",children:[d.jsx("div",{className:"header",children:d.jsxs("div",{className:"header-left",children:[d.jsx("button",{className:"menu-toggle",onClick:()=>V(!O),children:d.jsx("i",{className:"fas fa-bars"})}),d.jsx("h2",{className:"page-title",id:"page-title",children:ct[r]})]})}),d.jsxs("div",{className:`screen ${r==="dashboard"?"active":""}`,id:"dashboard-institution",children:[d.jsxs("div",{className:"stats-container",children:[d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-chalkboard-teacher fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:at.length}),d.jsx("div",{className:"stat-label",children:"Professores"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-users fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:ft.length}),d.jsx("div",{className:"stat-label",children:"Alunos"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-chart-line fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:rt.length}),d.jsx("div",{className:"stat-label",children:"Relatórios"})]}),B&&d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-graduation-cap fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:B.users?.total||0}),d.jsx("div",{className:"stat-label",children:"Total de Usuários"})]})]}),d.jsxs("div",{className:"dashboard-grid",children:[d.jsxs("div",{className:"card animated",style:{animationDelay:"0.1s"},children:[d.jsx("h3",{className:"card-title",children:"Distribuição de Usuários"}),d.jsx("div",{className:"pie-chart-wrapper",style:{marginTop:"10px",height:"200px"},children:d.jsx(we,{data:[{label:"Alunos",value:G.students,color:"#5cb85c"},{label:"Professores",value:G.teachers,color:"#0275d8"},{label:"Administradores",value:G.admins,color:"#d9534f"}],total:G.students+G.teachers+G.admins})})]}),d.jsxs("div",{className:"card animated",style:{animationDelay:"0.2s"},children:[d.jsx("h3",{className:"card-title",children:"Cadastros Recentes"}),d.jsxs("div",{className:"recent-registrations",children:[d.jsxs("div",{className:"registration-item",children:[d.jsx("div",{className:"registration-label",children:"Alunos (últimos 6 meses)"}),d.jsx("div",{className:"registration-value",children:I.students})]}),d.jsxs("div",{className:"registration-item",children:[d.jsx("div",{className:"registration-label",children:"Professores (último ano)"}),d.jsx("div",{className:"registration-value",children:I.teachers})]}),d.jsx("div",{className:"bar-chart-wrapper",style:{marginTop:"15px",height:"200px"},children:d.jsx(R,{data:[{label:"Alunos (6 meses)",value:I.students,color:"rgba(92, 184, 92, 0.7)",borderColor:"rgba(92, 184, 92, 1)",hoverColor:"rgba(92, 184, 92, 0.9)"},{label:"Professores (1 ano)",value:I.teachers,color:"rgba(2, 117, 216, 0.7)",borderColor:"rgba(2, 117, 216, 1)",hoverColor:"rgba(2, 117, 216, 0.9)"}]})})]})]})]})]}),d.jsx("div",{className:`screen ${r==="users"?"active":""}`,id:"users",children:d.jsxs("div",{className:"card",children:[d.jsxs("div",{className:"users-header",children:[d.jsx("h3",{className:"card-title",children:"Lista de Usuários"}),d.jsx("div",{className:"user-filters",children:d.jsxs("select",{value:A,onChange:C=>$(C.target.value),className:"user-category-filter",children:[d.jsx("option",{value:"all",children:"Todos"}),d.jsx("option",{value:"student",children:"Alunos"}),d.jsx("option",{value:"teacher",children:"Professores"}),d.jsx("option",{value:"school_admin",children:"Administradores"})]})})]}),K.users?d.jsx("div",{className:"loading",children:"Carregando usuários..."}):st.users?d.jsxs("div",{className:"error",children:["Erro: ",st.users]}):d.jsx("div",{className:"all-users-list",children:lt&&lt.length>0?d.jsx("div",{className:"users-table",children:d.jsxs("table",{children:[d.jsx("thead",{children:d.jsxs("tr",{children:[d.jsx("th",{children:"Nome"}),d.jsx("th",{children:"Email"}),d.jsx("th",{children:"Tipo"}),d.jsx("th",{children:"Detalhes"}),d.jsx("th",{children:"Data de Registro"}),d.jsx("th",{children:"Ações"})]})}),d.jsx("tbody",{children:lt.filter(C=>A==="all"||C.role===A).map(C=>d.jsxs("tr",{children:[d.jsx("td",{children:C.name}),d.jsx("td",{children:C.email}),d.jsx("td",{children:d.jsx("span",{className:`role-badge ${C.role}`,children:C.roleDisplay})}),d.jsxs("td",{children:[C.role==="student"&&d.jsxs("span",{children:["Turma: ",C.class," • Média: ",C.avg.toFixed(1)]}),C.role==="teacher"&&d.jsxs("span",{children:["Disciplina: ",C.subject," • Turmas: ",C.classes]}),C.role==="school_admin"&&d.jsx("span",{children:"Administrador"})]}),d.jsx("td",{children:C.createdAt?new Date(C.createdAt).toLocaleDateString("pt-BR"):"N/A"}),d.jsx("td",{children:d.jsx("button",{className:"btn-delete-user",onClick:()=>Ya(C.id,C.name),title:"Excluir usuário",children:"Excluir"})})]},C.id))})]})}):d.jsx("p",{children:"Nenhum usuário encontrado."})})]})}),d.jsx("div",{className:`screen ${r==="reports"?"active":""}`,id:"reports",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Relatórios da Escola"}),K.reports?d.jsx("div",{className:"loading",children:"Carregando relatórios..."}):st.reports?d.jsxs("div",{className:"error",children:["Erro: ",st.reports]}):d.jsx("div",{className:"report-table",children:d.jsxs("table",{children:[d.jsx("thead",{children:d.jsxs("tr",{children:[d.jsx("th",{children:"Título"}),d.jsx("th",{children:"Data"}),d.jsx("th",{children:"Tipo"}),d.jsx("th",{children:"Status"})]})}),d.jsx("tbody",{children:rt&&rt.length>0?rt.map(C=>d.jsxs("tr",{children:[d.jsx("td",{children:C.title}),d.jsx("td",{children:C.date}),d.jsx("td",{children:C.type||"N/A"}),d.jsx("td",{children:d.jsx("span",{className:`status ${C.status==="Aprovado"?"status-approved":"status-pending"}`,children:C.status})})]},C.id)):d.jsx("tr",{children:d.jsx("td",{colSpan:"4",children:"Nenhum relatório encontrado."})})})]})})]})}),d.jsx("div",{className:`screen ${r==="performance"?"active":""}`,id:"performance",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Relatórios de Desempenho dos Alunos"}),d.jsx("div",{className:"performance-controls",children:d.jsxs("form",{onSubmit:Aa,className:"generate-report-form",children:[d.jsxs("div",{className:"input-row",children:[d.jsxs("select",{value:ht,onChange:C=>ae(C.target.value),className:"add-student-input",required:!0,children:[d.jsx("option",{value:"",children:"Selecione um aluno"}),Fe&&Fe.map(C=>d.jsx("option",{value:C.id,children:C.name},C.id))]}),d.jsx("input",{type:"date",value:bt.startDate,onChange:C=>jt({...bt,startDate:C.target.value}),className:"add-student-input",required:!0}),d.jsx("input",{type:"date",value:bt.endDate,onChange:C=>jt({...bt,endDate:C.target.value}),className:"add-student-input",required:!0})]}),d.jsx("button",{type:"submit",className:"btn btn-primary",disabled:Ve,children:Ve?"Gerando...":"Gerar Relatório"})]})}),d.jsx("div",{className:"performance-reports-table",children:d.jsxs("table",{children:[d.jsx("thead",{children:d.jsxs("tr",{children:[d.jsx("th",{children:"Aluno"}),d.jsx("th",{children:"Turma"}),d.jsx("th",{children:"Disciplina"}),d.jsx("th",{children:"Média"}),d.jsx("th",{children:"Sessões Pomodoro"}),d.jsx("th",{children:"Conclusão Tarefas (%)"})]})}),d.jsx("tbody",{children:xt&&xt.length>0?xt.map(C=>d.jsxs("tr",{children:[d.jsx("td",{children:C.student}),d.jsx("td",{children:C.class}),d.jsx("td",{children:C.subject}),d.jsx("td",{children:C.avg.toFixed(1)}),d.jsx("td",{children:C.pomodoroSessions}),d.jsxs("td",{children:[C.taskCompletion,"%"]})]},C.id)):d.jsx("tr",{children:d.jsx("td",{colSpan:"6",children:"Nenhum relatório de desempenho gerado."})})})]})})]})}),d.jsx("div",{className:`screen ${r==="register"?"active":""}`,id:"register",children:d.jsxs("div",{className:"card register-card",children:[d.jsxs("div",{className:"register-header",children:[d.jsx("h3",{className:"card-title",children:"Cadastro de Usuário"}),d.jsx("p",{className:"register-subtitle",children:"Preencha os dados abaixo para registrar um novo usuário"})]}),d.jsxs("div",{className:"register-content",children:[Xe&&d.jsx("div",{className:"error-message",children:Xe}),Ge&&d.jsx("div",{className:"success-message",children:Ge}),d.jsxs("form",{className:"register-form",onSubmit:Va,children:[d.jsxs("div",{className:"form-section",children:[d.jsx("h4",{className:"section-title",children:"Informações Básicas"}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"name",children:"Nome Completo"}),d.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Seu nome completo",value:Nt.name,onChange:He,disabled:he,required:!0})]}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"email",children:"Email"}),d.jsx("input",{type:"email",id:"email",name:"email",placeholder:"seu@email.com",value:Nt.email,onChange:He,disabled:he,required:!0})]}),d.jsxs("div",{className:"input-row",children:[d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"password",children:"Senha"}),d.jsx("input",{type:"password",id:"password",name:"password",placeholder:"Sua senha (mínimo 6 caracteres)",value:Nt.password,onChange:He,disabled:he,required:!0,minLength:"6"})]}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"confirmPassword",children:"Confirmar Senha"}),d.jsx("input",{type:"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Confirme sua senha",value:Nt.confirmPassword,onChange:He,disabled:he,required:!0})]})]}),Nt.password&&Nt.confirmPassword&&Nt.password!==Nt.confirmPassword&&d.jsx("div",{className:"password-mismatch-error",children:"As senhas não coincidem"})]}),d.jsxs("div",{className:"form-section",children:[d.jsx("h4",{className:"section-title",children:"Tipo de Usuário"}),d.jsx("div",{className:"role-selection",children:d.jsxs("div",{className:"role-buttons",children:[d.jsxs("button",{type:"button",className:`role-btn ${Nt.role==="student"?"role-btn-active":""}`,onClick:()=>De({...Nt,role:"student",subjects:"",studentId:"",grade:""}),disabled:he,children:[d.jsx("i",{className:"fas fa-user-graduate"}),d.jsx("span",{children:"Aluno"})]}),d.jsxs("button",{type:"button",className:`role-btn ${Nt.role==="teacher"?"role-btn-active":""}`,onClick:()=>De({...Nt,role:"teacher",studentId:"",grade:""}),disabled:he,children:[d.jsx("i",{className:"fas fa-chalkboard-teacher"}),d.jsx("span",{children:"Professor"})]})]})})]}),Nt.role==="student"&&d.jsxs("div",{className:"form-section",children:[d.jsx("h4",{className:"section-title",children:"Informações do Aluno"}),d.jsxs("div",{className:"input-row",children:[d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"studentId",children:"Matrícula"}),d.jsx("input",{type:"text",id:"studentId",name:"studentId",placeholder:"Número de matrícula",value:Nt.studentId,onChange:He,disabled:he})]}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"grade",children:"Turma/Série"}),d.jsx("input",{type:"text",id:"grade",name:"grade",placeholder:"Ex: 1º Ano, 2º Ano, etc.",value:Nt.grade,onChange:He,disabled:he})]})]})]}),Nt.role==="teacher"&&d.jsxs("div",{className:"form-section",children:[d.jsx("h4",{className:"section-title",children:"Informações do Professor"}),d.jsxs("div",{className:"input-group",children:[d.jsx("label",{htmlFor:"subjects",children:"Disciplinas (separadas por vírgula)"}),d.jsx("input",{type:"text",id:"subjects",name:"subjects",placeholder:"Matemática, Português, etc.",value:Nt.subjects,onChange:He,disabled:he}),d.jsx("small",{className:"input-hint",children:"Digite as disciplinas separadas por vírgula"})]})]}),d.jsxs("div",{className:"form-actions",children:[d.jsx("button",{type:"submit",className:"btn btn-primary",disabled:he,children:he?d.jsxs(d.Fragment,{children:[d.jsx("i",{className:"fas fa-spinner fa-spin"}),d.jsx("span",{children:"Registrando..."})]}):d.jsxs(d.Fragment,{children:[d.jsx("i",{className:"fas fa-user-plus"}),d.jsx("span",{children:"Registrar Usuário"})]})}),d.jsxs("button",{type:"button",className:"btn btn-secondary",onClick:()=>{De({name:"",email:"",password:"",confirmPassword:"",role:"student",studentId:"",grade:"",subjects:""}),Re(""),It("")},disabled:he,children:[d.jsx("i",{className:"fas fa-undo"}),d.jsx("span",{children:"Limpar"})]})]})]})]})]})}),d.jsx("div",{className:`screen ${r==="reports"?"active":""}`,id:"reports",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Relatórios e Exportação"}),d.jsxs("div",{className:"report-tabs",children:[d.jsx("div",{className:`report-tab ${v==="users"?"active":""}`,onClick:()=>_("users"),children:"Usuários"}),d.jsx("div",{className:`report-tab ${v==="distribution"?"active":""}`,onClick:()=>_("distribution"),children:"Distribuição"}),d.jsx("div",{className:`report-tab ${v==="registrations"?"active":""}`,onClick:()=>_("registrations"),children:"Cadastros Recentes"})]}),d.jsxs("div",{className:"report-content",children:[v==="users"&&d.jsxs("div",{className:"report-data",children:[d.jsxs("div",{className:"report-header",children:[d.jsx("h4",{children:"Relatório de Usuários"}),d.jsxs("button",{className:"export-button",onClick:Pe,children:[d.jsx("i",{className:"fas fa-file-export"}),"Exportar para Excel"]})]}),d.jsxs("table",{className:"report-table",children:[d.jsx("thead",{children:d.jsxs("tr",{children:[d.jsx("th",{children:"Nome"}),d.jsx("th",{children:"Email"}),d.jsx("th",{children:"Tipo"}),d.jsx("th",{children:"Detalhes"}),d.jsx("th",{children:"Data de Registro"})]})}),d.jsx("tbody",{children:lt.map(C=>d.jsxs("tr",{children:[d.jsx("td",{children:C.name}),d.jsx("td",{children:C.email}),d.jsx("td",{children:d.jsx("span",{className:`role-badge ${C.role}`,children:C.roleDisplay})}),d.jsxs("td",{children:[C.role==="student"&&d.jsxs("span",{children:["Turma: ",C.class," • Média: ",C.avg.toFixed(1)]}),C.role==="teacher"&&d.jsxs("span",{children:["Disciplina: ",C.subject," • Turmas: ",C.classes]}),C.role==="school_admin"&&d.jsx("span",{children:"Administrador"})]}),d.jsx("td",{children:C.createdAt?new Date(C.createdAt).toLocaleDateString("pt-BR"):"N/A"})]},C.id))})]})]}),v==="distribution"&&d.jsxs("div",{className:"report-data",children:[d.jsxs("div",{className:"report-header",children:[d.jsx("h4",{children:"Relatório de Distribuição de Usuários"}),d.jsxs("button",{className:"export-button",onClick:Kt,children:[d.jsx("i",{className:"fas fa-file-export"}),"Exportar para Excel"]})]}),d.jsx("div",{className:"chart-container",children:d.jsx("div",{className:"pie-chart-wrapper",style:{marginTop:"10px",height:"200px"},children:d.jsx(we,{data:[{label:"Alunos",value:G.students,color:"#5cb85c"},{label:"Professores",value:G.teachers,color:"#0275d8"},{label:"Administradores",value:G.admins,color:"#d9534f"}],total:G.students+G.teachers+G.admins})})}),d.jsxs("table",{className:"report-table",children:[d.jsx("thead",{children:d.jsxs("tr",{children:[d.jsx("th",{children:"Categoria"}),d.jsx("th",{children:"Quantidade"}),d.jsx("th",{children:"Porcentagem"})]})}),d.jsxs("tbody",{children:[d.jsxs("tr",{children:[d.jsx("td",{children:"Alunos"}),d.jsx("td",{children:G.students}),d.jsxs("td",{children:[Math.round(G.students/Math.max(G.students+G.teachers+G.admins,1)*100),"%"]})]}),d.jsxs("tr",{children:[d.jsx("td",{children:"Professores"}),d.jsx("td",{children:G.teachers}),d.jsxs("td",{children:[Math.round(G.teachers/Math.max(G.students+G.teachers+G.admins,1)*100),"%"]})]}),d.jsxs("tr",{children:[d.jsx("td",{children:"Administradores"}),d.jsx("td",{children:G.admins}),d.jsxs("td",{children:[Math.round(G.admins/Math.max(G.students+G.teachers+G.admins,1)*100),"%"]})]})]})]})]}),v==="registrations"&&d.jsxs("div",{className:"report-data",children:[d.jsxs("div",{className:"report-header",children:[d.jsx("h4",{children:"Relatório de Cadastros Recentes"}),d.jsxs("button",{className:"export-button",onClick:ge,children:[d.jsx("i",{className:"fas fa-file-export"}),"Exportar para Excel"]})]}),d.jsxs("div",{className:"recent-registrations",children:[d.jsxs("div",{className:"registration-item",children:[d.jsx("div",{className:"registration-label",children:"Alunos (últimos 6 meses)"}),d.jsx("div",{className:"registration-value",children:I.students})]}),d.jsxs("div",{className:"registration-item",children:[d.jsx("div",{className:"registration-label",children:"Professores (último ano)"}),d.jsx("div",{className:"registration-value",children:I.teachers})]}),d.jsx("div",{className:"bar-chart-wrapper",style:{marginTop:"15px",height:"200px"},children:d.jsx(R,{data:[{label:"Alunos (6 meses)",value:I.students,color:"rgba(92, 184, 92, 0.7)",borderColor:"rgba(92, 184, 92, 1)",hoverColor:"rgba(92, 184, 92, 0.9)"},{label:"Professores (1 ano)",value:I.teachers,color:"rgba(2, 117, 216, 0.7)",borderColor:"rgba(2, 117, 216, 1)",hoverColor:"rgba(2, 117, 216, 0.9)"}]})})]}),d.jsxs("table",{className:"report-table",children:[d.jsx("thead",{children:d.jsxs("tr",{children:[d.jsx("th",{children:"Período"}),d.jsx("th",{children:"Quantidade"})]})}),d.jsxs("tbody",{children:[d.jsxs("tr",{children:[d.jsx("td",{children:"Alunos (últimos 6 meses)"}),d.jsx("td",{children:I.students})]}),d.jsxs("tr",{children:[d.jsx("td",{children:"Professores (último ano)"}),d.jsx("td",{children:I.teachers})]})]})]})]})]})]})})]}),u&&d.jsx("div",{className:"profile-modal",onClick:Pa,children:d.jsxs("div",{className:"profile-modal-content",onClick:C=>C.stopPropagation(),children:[d.jsx("button",{className:"close-modal",onClick:Pa,children:"×"}),d.jsxs("div",{className:"profile-modal-header",children:[d.jsxs("div",{className:"profile-modal-img-container",children:[d.jsx("img",{src:w,alt:"Instituição",className:"profile-modal-img"}),d.jsx("button",{className:"profile-img-upload-btn",title:"Alterar foto",onClick:qa,style:{display:m?"block":"none"},children:d.jsx("i",{className:"fas fa-camera"})}),d.jsx("input",{id:"profile-image-upload",type:"file",accept:"image/*",onChange:rn,style:{display:"none"}})]}),d.jsxs("div",{className:"profile-modal-info",children:[m?d.jsx("input",{type:"text",name:"name",value:x.name,onChange:na,className:"profile-name-input"}):d.jsx("h3",{children:s?.name||"Instituição"}),d.jsx("p",{children:s?.roleDescription||"Instituição"}),d.jsx("p",{children:s?.email||"email@exemplo.com"})]})]}),d.jsxs("div",{className:"profile-modal-details",children:[d.jsxs("div",{children:[d.jsx("label",{children:"Nome Completo"}),m?d.jsx("input",{type:"text",name:"name",value:x.name,onChange:na,className:"profile-input"}):d.jsx("span",{children:s?.name||"Instituição"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Email"}),d.jsx("span",{children:s?.email||"email@exemplo.com"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Tipo de Usuário"}),d.jsx("span",{children:s?.roleDescription||"Instituição"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Instituição"}),d.jsx("span",{children:s?.school?.name||"Não informada"})]})]}),d.jsxs("div",{className:"profile-modal-actions",children:[d.jsx("button",{onClick:n,className:"theme-toggle-btn","aria-label":e?"Alternar para modo claro":"Alternar para modo escuro",children:e?d.jsxs(d.Fragment,{children:[d.jsx("i",{className:"fas fa-sun"})," Modo Claro"]}):d.jsxs(d.Fragment,{children:[d.jsx("i",{className:"fas fa-moon"})," Modo Escuro"]})}),m?d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn btn-secondary",onClick:ss,children:"Cancelar"}),d.jsx("button",{className:"btn btn-primary",onClick:As,children:"Salvar"})]}):d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn btn-secondary",onClick:ks,children:"Editar Perfil"}),d.jsx("button",{className:"btn btn-primary",onClick:l,children:"Sair"})]})]})]})}),Ue&&d.jsx(zo,{message:Ue.message,type:Ue.type,onClose:()=>Ft(null)}),Ta&&d.jsx(Pd,{message:Ua,onConfirm:ce,onCancel:Ha,type:"warning"})]})}const db=document.createElement("style");db.innerHTML=`
  .container-app {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    background-color: var(--sidebar-background);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    z-index: 1000;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px;
    background-color: var(--background);
    width: calc(100% - 260px);
  }

  .add-task-form {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .input-row .add-task-input,
  .input-row select {
    flex: 1;
  }

  .task-status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: bold;
  }

  .task-status.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .task-status.in_progress {
    background-color: #cce5ff;
    color: #004085;
  }

  .task-status.completed {
    background-color: #d4edda;
    color: #155724;
  }

  .session-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
  }

  .session-info {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .session-type {
    font-weight: bold;
    color: var(--primary-color);
  }

  .session-status.completed {
    color: var(--success-color);
  }

  .session-status.abandoned {
    color: var(--danger-color);
  }

  .session-status.paused {
    color: var(--warning-color);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .stat-item {
    text-align: center;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .stat-item h4 {
    margin: 0 0 10px 0;
    color: var(--text-color);
  }

  .stat-item .stat-value {
    font-size: 1.5em;
    font-weight: bold;
    color: var(--primary-color);
    margin: 0;
  }

  .recent-activity {
    margin-top: 20px;
  }

  .recent-activity h4 {
    margin-bottom: 10px;
    color: var(--text-color);
  }

  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }

  .flashcard {
    height: 200px;
    perspective: 1000px;
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
  }

  .flashcard-front, .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--card-background);
    color: var(--text-color);
  }

  .flashcard-back {
    transform: rotateY(180deg);
  }

  .btn-delete-flashcard {
    position: absolute;
    top: 5px;
    right: 5px;
    background: var(--danger-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    z-index: 10;
  }

  .flashcard-stats {
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: flex;
    gap: 5px;
    z-index: 5;
  }

  .accuracy-badge, .attempts-badge {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 0.7em;
  }

  .accuracy-badge {
    background: linear-gradient(45deg, #10b981, #34d399);
  }

  .attempts-badge {
    background: linear-gradient(45deg, #d9534f, #c9302c);
  }

  /* Estilos para as telas do professor */
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    background: var(--card-background);
    transition: all 0.2s ease;
  }

  .task-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .task-content {
    flex: 1;
  }

  .task-title {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 4px;
  }

  .task-details {
    font-size: 0.9rem;
    color: var(--text-light-color);
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .task-meta {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }

  .task-status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .task-status.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .task-status.in_progress {
    background-color: #cce5ff;
    color: #004085;
  }

  .task-status.completed {
    background-color: #d4edda;
    color: #155724;
  }

  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 16px;
  }

  .flashcard-item {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.3s ease;
  }

  .flashcard-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .flashcard-content {
    margin-bottom: 12px;
  }

  .flashcard-question {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 8px;
  }

  .flashcard-answer {
    color: var(--text-light-color);
    font-style: italic;
  }

  .flashcard-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: var(--text-light-color);
    border-top: 1px solid var(--border-color);
    padding-top: 12px;
  }

  .flashcard-subject {
    background: rgba(229, 83, 69, 0.1);
    color: #e55345;
    padding: 2px 8px;
    border-radius: 12px;
  }

  .flashcard-tags {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    .container-app {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100%;
      height: auto;
      max-height: 300px;
      transform: translateX(-100%);
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
    
    .main-content {
      width: 100%;
    }
  }
  
  /* Register form styles from Register.css */
  .register-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .register-subtitle {
    text-align: center;
    margin-bottom: 20px;
    color: var(--text-light-color);
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-color);
    font-weight: 500;
  }
  
  .input-group input,
  .input-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--input-background);
    color: var(--text-color);
    font-size: 14px;
  }
  
  .input-group input:focus,
  .input-group select:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  .password-mismatch-error {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 5px;
  }
  
  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    border: 1px solid #f5c6cb;
  }
  
  .success-message {
    background-color: #d4edda;
    color: #155724;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    border: 1px solid #c3e6cb;
  }
  
  /* Users screen styles */
  .users-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .users-section {
    flex: 1;
    min-width: 300px;
  }
  
  .users-section h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 5px;
  }
  
  .teacher-item, .student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 8px;
    background: var(--card-background);
  }
  
  .teacher-content, .student-content {
    flex: 1;
  }
  
  .teacher-title, .student-title {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 4px;
  }
  
  .teacher-details, .student-details {
    font-size: 0.9rem;
    color: var(--text-light-color);
  }
  
  .btn-view-teacher, .btn-view-student {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
  }
  
  .btn-view-teacher:hover, .btn-view-student:hover {
    background: #c54335;
  }
  
  /* Role buttons styles */
  .role-buttons {
    display: flex;
    gap: 10px;
    margin-top: 5px;
  }
  
  .role-btn {
    flex: 1;
    padding: 10px;
    border: 1px solid var(--border-color);
    background-color: var(--input-background);
    color: var(--text-color);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .role-btn:hover {
    background-color: #f0f0f0;
  }
  
  .role-btn-active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .role-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  /* Users table styles */
  .users-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .users-table th,
  .users-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  .users-table th {
    background-color: var(--card-background);
    font-weight: 600;
    color: var(--text-color);
  }
  
  .role-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  .role-badge.student {
    background-color: rgba(40, 167, 69, 0.1);
    color: #28a745;
    border: 1px solid rgba(40, 167, 69, 0.3);
  }
  
  .role-badge.teacher {
    background-color: rgba(0, 123, 255, 0.1);
    color: #007bff;
    border: 1px solid rgba(0, 123, 255, 0.3);
  }
  
  .role-badge.school_admin {
    background-color: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    border: 1px solid rgba(220, 53, 69, 0.3);
  }
  
  /* Botão de exclusão de usuário */
  .btn-delete-user {
    background: var(--danger-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    transition: background 0.3s ease;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .btn-delete-user:hover {
    background: #c9302c;
  }
  
  /* Filtros de usuário */
  .users-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .user-filters {
    display: flex;
    gap: 10px;
  }
  
  .user-category-filter {
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--input-background);
    color: var(--text-color);
    font-size: 0.9rem;
  }
  
  .user-category-filter:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  /* Melhorias na dashboard */
  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .stat-card {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  }
  
  .stat-card i {
    display: block;
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #d9534f;
    margin: 10px 0;
  }
  
  .stat-label {
    font-size: 1rem;
    color: var(--text-light-color);
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }
  
  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
    
    .stats-container {
      grid-template-columns: 1fr;
    }
  }
  
  /* Pie Chart Styles */
  .pie-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .pie-chart-svg {
    width: 200px;
    height: 200px;
    transform: rotate(-90deg);
  }
  
  .pie-chart-circle-bg {
    fill: none;
    stroke: #f0f0f0;
    stroke-width: 8;
  }
  
  .pie-chart-circle {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease-in-out;
  }
  
  .pie-chart-labels {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  
  .pie-chart-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
  }
  
  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  
  .chart-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .total-count {
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--text-color);
  }
  
  .total-label {
    font-size: 0.8rem;
    color: var(--text-light-color);
  }
  
  .recent-registrations {
    padding: 10px 0;
  }
  
  .registration-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .registration-label {
    color: var(--text-light-color);
  }
  
  .registration-value {
    font-weight: bold;
    color: var(--primary-color);
  }
  
  .simple-bar-chart {
    margin-top: 20px;
  }
  
  .bar-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .bar-label {
    width: 100px;
    font-size: 0.8rem;
    color: var(--text-light-color);
  }
  
  .bar {
    flex: 1;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  
  .bar-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 0.5s ease;
  }
  
  .bar-students {
    background-color: #5cb85c;
  }
  
  .bar-teachers {
    background-color: #0275d8;
  }
  
  .bar-value {
    width: 30px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--text-color);
  }
  
  /* Abas de relatórios */
  .report-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
  }
  
  .report-tab {
    padding: 10px 20px;
    background: var(--input-background);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .report-tab.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .report-tab:hover:not(.active) {
    background: #f0f0f0;
  }
  
  .report-content {
    margin-top: 20px;
  }
  
  .export-button {
    background: var(--success-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s ease;
  }
  
  .export-button:hover {
    background: #218838;
  }
  
  .report-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .report-table th,
  .report-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  .report-table th {
    background: var(--card-background);
    font-weight: 600;
  }
  
  .report-data {
    margin-top: 20px;
  }
  
  /* Animações */
  @keyframes drawChart {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: var(--target-offset);
    }
  }
  
  /* Pie Chart Styles */
  .pie-chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .pie-chart-svg {
    width: 200px;
    height: 200px;
    transform: rotate(-90deg);
  }
  
  .pie-chart-circle-bg {
    fill: none;
    stroke: #f0f0f0;
    stroke-width: 8;
  }
  
  .pie-chart-circle {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease-in-out;
  }
  
  .pie-chart-labels {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  
  .pie-chart-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
  }
  
  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  
  .chart-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .total-count {
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--text-color);
  }
  
  .total-label {
    font-size: 0.8rem;
    color: var(--text-light-color);
  }
  
  /* Animações */
  @keyframes drawChart {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: var(--target-offset);
    }
  }
  
  @keyframes growBar {
    from {
      width: 0;
    }
    to {
      width: var(--target-width);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Animações gerais */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .slide-in-left {
    animation: slideInLeft 0.5s ease-in-out;
  }
  
  .slide-in-right {
    animation: slideInRight 0.5s ease-in-out;
  }
  
  .slide-in-up {
    animation: slideInUp 0.5s ease-in-out;
  }
  
  /* Estilos para cards com animação */
  .card.animated {
    opacity: 0;
    transform: translateY(20px);
    animation: slideInUp 0.6s ease-out forwards;
  }
  
  /* Estilos específicos para gráficos Chart.js */
  .chart-container {
    position: relative;
    height: 200px !important;
    width: 100% !important;
  }
  
  .chart-container canvas {
    height: 200px !important;
    width: 100% !important;
  }
  
  /* Estilos para wrappers de gráficos */
  .pie-chart-wrapper,
  .bar-chart-wrapper {
    height: 200px !important;
    width: 100% !important;
  }
  
  .pie-chart-wrapper canvas,
  .bar-chart-wrapper canvas {
    height: 200px !important;
    width: 100% !important;
  }
  
  /* Estilos para seção de registro otimizada */
  .register-card {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .register-header {
    text-align: left;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .register-subtitle {
    color: var(--text-light-color);
    font-size: 0.9rem;
    margin-top: 5px;
  }
  
  .register-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-section {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
  }
  
  .section-title {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 8px;
    font-size: 1.1rem;
  }
  
  .input-row {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .input-row .input-group {
    flex: 1;
  }
  
  .role-selection {
    margin-top: 10px;
  }
  
  .role-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .role-btn {
    flex: 1;
    min-width: 120px;
    padding: 12px;
    border: 1px solid var(--border-color);
    background-color: var(--input-background);
    color: var(--text-color);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .role-btn:hover {
    background-color: #f0f0f0;
  }
  
  .role-btn-active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .role-btn i {
    font-size: 1.5rem;
  }
  
  .form-actions {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
  }
  
  .btn-secondary {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  
  .btn-secondary:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .input-hint {
    display: block;
    font-size: 0.8rem;
    color: var(--text-light-color);
    margin-top: 5px;
  }
  
  .info-text {
    color: var(--text-light-color);
    font-style: italic;
  }
  
  .password-mismatch-error {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 5px;
    padding: 8px;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .password-mismatch-error::before {
    content: "⚠";
  }
  
  /* Responsividade para dispositivos móveis */
  @media (max-width: 768px) {
    .register-card {
      margin: 10px;
      padding: 15px;
    }
    
    .input-row {
      flex-direction: column;
      gap: 10px;
    }
    
    .role-buttons {
      flex-direction: column;
    }
    
    .role-btn {
      min-width: auto;
    }
    
    .form-actions {
      flex-direction: column;
      gap: 10px;
    }
    
    .form-actions .btn {
      width: 100%;
      justify-content: center;
    }
    
    .section-title {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .register-header h3 {
      font-size: 1.2rem;
    }
    
    .register-subtitle {
      font-size: 0.8rem;
    }
    
    .form-section {
      padding: 15px;
    }
  }
`;document.head.appendChild(db);const qd=()=>{const[s,e]=j.useState({});return j.useEffect(()=>{const h=localStorage.getItem("flashcardStats");h&&e(JSON.parse(h))},[]),j.useEffect(()=>{localStorage.setItem("flashcardStats",JSON.stringify(s))},[s]),{stats:s,updateFlashcardStats:(h,m)=>{e(p=>{const x=p[h]||{attempts:0,correct:0,incorrect:0,streak:0},y=x.attempts+1,v=m?x.correct+1:x.correct,_=m?x.incorrect:x.incorrect+1,w=Math.round(v/y*100),E=m?x.streak+1:0;return{...p,[h]:{attempts:y,correct:v,incorrect:_,accuracy:w,lastReviewed:new Date().toISOString(),streak:E}}})},getOverallAccuracy:()=>{const h=Object.values(s);if(h.length===0)return 0;const m=h.reduce((x,y)=>x+y.attempts,0),p=h.reduce((x,y)=>x+y.correct,0);return m>0?Math.round(p/m*100):0},getFlashcardStats:h=>s[h]||{attempts:0,correct:0,incorrect:0,accuracy:0,lastReviewed:null,streak:0},resetFlashcardStats:h=>{e(m=>{const{[h]:p,...x}=m;return x})},resetAllStats:()=>{e({})}}};function fb({user:s,darkMode:e,toggleDarkMode:n,onLogout:l}){const[r,c]=j.useState("dashboard"),[u,h]=j.useState(!1),[m,p]=j.useState(!1),[x,y]=j.useState({name:s?.name||""}),[v,_]=j.useState(s?.profilePicture||"https://i.pravatar.cc/40"),[w,E]=j.useState(null),[T,M]=j.useState(!1),[O,V]=j.useState([]),[K,Y]=j.useState([]),[st,tt]=j.useState([]),[at,it]=j.useState([]),[ft,nt]=j.useState({classes:!1,assignments:!1,flashcards:!1,performance:!1}),[rt,vt]=j.useState({classes:null,assignments:null,flashcards:null,performance:null}),[xt,dt]=j.useState(null),[B,W]=j.useState(!1),[lt,St]=j.useState(null),[A,$]=j.useState(""),{stats:G}=qd(),[J,I]=j.useState({title:"",subject:"",deadline:"",description:"",classId:""}),[_t,ht]=j.useState([]),[ae,bt]=j.useState(null),[jt,Ve]=j.useState({name:"",subject:"",cards:[]}),ke=z=>{c(z)},Fe=async()=>{nt(z=>({...z,classes:!0})),vt(z=>({...z,classes:null}));try{const z=await Ku.getClassesByTeacher(s._id);V(z.data||[])}catch(z){console.error("Erro ao carregar turmas:",z),vt(ot=>({...ot,classes:z.message})),dt({message:"Erro ao carregar turmas: "+z.message,type:"error"})}finally{nt(z=>({...z,classes:!1}))}},aa=async()=>{nt(z=>({...z,assignments:!0})),vt(z=>({...z,assignments:null}));try{const z=await Ie.getTasksByTeacher(s._id);Y(z.data||[])}catch(z){console.error("Erro ao carregar tarefas:",z),vt(ot=>({...ot,assignments:z.message})),dt({message:"Erro ao carregar tarefas: "+z.message,type:"error"})}finally{nt(z=>({...z,assignments:!1}))}},Ue=async()=>{nt(z=>({...z,flashcards:!0})),vt(z=>({...z,flashcards:null}));try{const z=await ts.getFlashcards();tt(z.data||[])}catch(z){console.error("Erro ao carregar flashcards:",z),vt(ot=>({...ot,flashcards:z.message})),dt({message:"Erro ao carregar flashcards: "+z.message,type:"error"})}finally{nt(z=>({...z,flashcards:!1}))}},Ft=async()=>{nt(z=>({...z,performance:!0})),vt(z=>({...z,performance:null}));try{const z=await Ie.getTasksByTeacher(s._id);it(z.data||[])}catch(z){console.error("Erro ao carregar dados de desempenho:",z),it([])}finally{nt(z=>({...z,performance:!1}))}},Ta=async z=>{z.preventDefault();try{const ot={name:z.target.name.value,subject:z.target.subject.value,teacher_id:s._id,school_id:s.school_id,academic_year:new Date().getFullYear().toString()},Ut=await Ku.createClass(ot);V(Pt=>[...Pt,Ut.data]),z.target.reset(),dt({message:"Turma criada com sucesso!",type:"success"})}catch(ot){console.error("Erro ao criar turma:",ot),dt({message:"Erro ao criar turma: "+ot.message,type:"error"})}},ye=async z=>{z.preventDefault();try{const ot={title:J.title,subject:J.subject,due_date:J.deadline,description:J.description,created_by:s._id,school_id:s.school_id,assigned_to:[]},Ut=await Ie.createTask(ot);Y(Pt=>[...Pt,Ut.data]),I({title:"",subject:"",deadline:"",description:"",classId:""}),dt({message:"Tarefa criada com sucesso!",type:"success"}),aa()}catch(ot){console.error("Erro ao criar tarefa:",ot),dt({message:"Erro ao criar tarefa: "+ot.message,type:"error"})}},Ba=async z=>{try{const ot=await Ku.getClassStudents(z);ht(ot.data||[]),bt(z)}catch(ot){console.error("Erro ao carregar alunos da turma:",ot),dt({message:"Erro ao carregar alunos da turma: "+ot.message,type:"error"}),ht([]),bt(null)}},Ua=z=>{I(ot=>({...ot,classId:z})),z?Ba(z):(ht([]),bt(null))},Nt=async z=>{if(z.preventDefault(),!jt.name.trim()||!jt.subject.trim()){dt({message:"Por favor, preencha todos os campos obrigatórios",type:"warning"});return}try{const ot={question:jt.name,answer:jt.subject,subject:jt.subject,user_id:s._id,school_id:s.school_id,tags:[jt.subject]},Ut=await ts.createFlashcard(ot);tt(Pt=>[...Pt,Ut.data]),Ve({name:"",subject:"",cards:[]}),dt({message:"Flashcard criado com sucesso!",type:"success"}),Ue()}catch(ot){console.error("Erro ao criar flashcard:",ot),dt({message:"Erro ao criar flashcard: "+ot.message,type:"error"})}},De=async z=>{he("Tem certeza que deseja excluir este flashcard?",async()=>{try{await ts.deleteFlashcard(z),tt(st.filter(ot=>ot._id!==z)),dt({message:"Flashcard excluído com sucesso!",type:"success"})}catch(ot){console.error("Erro ao excluir flashcard:",ot),dt({message:"Erro ao excluir flashcard: "+ot.message,type:"error"})}},"warning")},he=(z,ot,Ut="warning")=>{$(z),St(()=>ot),W(!0)},ka=()=>{h(!0)},Xe=()=>{h(!1),p(!1)},Re=()=>{p(!0)},Ge=async()=>{try{const z=w;let ot;if(z){const Pt=new FormData;Pt.append("name",x.name),Pt.append("profilePicture",z),ot=await fa.updateProfile(Pt)}else ot=await fa.updateProfile({name:x.name});const Ut={...s,name:ot.data.user.name,profilePicture:ot.data.user.profilePicture||ot.data.user.profile?.avatar||s?.profilePicture};localStorage.setItem("user",JSON.stringify(Ut)),p(!1),E(null),dt({message:"Perfil atualizado com sucesso!",type:"success"})}catch(z){console.error("Erro ao atualizar perfil:",z),dt({message:"Erro ao atualizar perfil: "+z.message,type:"error"})}},It=()=>{y({name:s?.name||""}),p(!1)},me=z=>{const{name:ot,value:Ut}=z.target;y(Pt=>({...Pt,[ot]:Ut}))},ce=z=>{const ot=z.target.files[0];if(ot){const Ut=new FileReader;Ut.onloadend=()=>{_(Ut.result)},Ut.readAsDataURL(ot),E(ot)}},Ha=()=>{document.getElementById("profile-image-upload").click()};j.useEffect(()=>{const z=document.createElement("script");return z.src="https://kit.fontawesome.com/a076d05399.js",z.crossOrigin="anonymous",document.body.appendChild(z),s&&s._id&&(Fe(),aa(),Ue(),Ft()),()=>{document.body.removeChild(z)}},[G,s]),j.useEffect(()=>{s&&s._id&&(Fe(),aa(),Ue(),Ft())},[s]);const ha={dashboard:"Dashboard Professor",assignments:"Tarefas",flashcards:"Flashcards",settings:"Configurações"};return d.jsxs("div",{className:"container",children:[d.jsxs("div",{className:`sidebar ${T?"open":""}`,children:[d.jsx("div",{className:"logo",children:d.jsxs("h1",{children:["Pomo",d.jsx("span",{children:"dash"})]})}),d.jsxs("div",{className:"menu",children:[d.jsxs("div",{className:`menu-item ${r==="dashboard"?"active":""}`,onClick:()=>{ke("dashboard"),M(!1)},children:[d.jsx("i",{className:"fas fa-tachometer-alt"}),d.jsx("span",{children:"Dashboard"})]}),d.jsxs("div",{className:`menu-item ${r==="classes"?"active":""}`,onClick:()=>{ke("classes"),M(!1)},children:[d.jsx("i",{className:"fas fa-users"}),d.jsx("span",{children:"Turmas"})]}),d.jsxs("div",{className:`menu-item ${r==="assignments"?"active":""}`,onClick:()=>{ke("assignments"),M(!1)},children:[d.jsx("i",{className:"fas fa-tasks"}),d.jsx("span",{children:"Tarefas"})]}),d.jsxs("div",{className:`menu-item ${r==="flashcards"?"active":""}`,onClick:()=>{ke("flashcards"),M(!1)},children:[d.jsx("i",{className:"fas fa-layer-group"}),d.jsx("span",{children:"Flashcards"})]}),d.jsxs("div",{className:`menu-item ${r==="performance"?"active":""}`,onClick:()=>{ke("performance"),M(!1)},children:[d.jsx("i",{className:"fas fa-chart-bar"}),d.jsx("span",{children:"Desempenho"})]})]}),d.jsxs("div",{className:"profile",onClick:()=>{ka(),M(!1)},children:[d.jsxs("div",{className:"profile-img-container",children:[d.jsx("img",{src:v,alt:"Professor",className:"profile-img"}),d.jsx("button",{className:"profile-img-upload-btn",title:"Alterar foto",onClick:Ha,style:{display:"none"},children:d.jsx("i",{className:"fas fa-camera"})})]}),d.jsx("div",{className:"profile-name",children:s?.name||"Professor"})]})]}),T&&d.jsx("div",{className:"sidebar-overlay",onClick:()=>M(!1)}),d.jsxs("div",{className:"main-content",children:[d.jsx("div",{className:"header",children:d.jsxs("div",{className:"header-left",children:[d.jsx("button",{className:"menu-toggle",onClick:()=>M(!T),children:d.jsx("i",{className:"fas fa-bars"})}),d.jsx("h2",{className:"page-title",id:"page-title",children:ha[r]})]})}),d.jsxs("div",{className:`screen ${r==="dashboard"?"active":""}`,id:"dashboard-professor",children:[d.jsxs("div",{className:"stats-container",children:[d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-users fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:O.length}),d.jsx("div",{className:"stat-label",children:"Turmas"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-tasks fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:K.length}),d.jsx("div",{className:"stat-label",children:"Tarefas"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-layer-group fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:st.length}),d.jsx("div",{className:"stat-label",children:"Flashcards"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-chart-line fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:at.length}),d.jsx("div",{className:"stat-label",children:"Alunos monitorados"})]})]}),d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Visão Geral"}),d.jsx("p",{children:"Seja bem-vindo ao painel do professor. Aqui você pode gerenciar suas turmas, criar tarefas para os alunos, desenvolver flashcards e acompanhar o desempenho dos estudantes."})]})]}),d.jsx("div",{className:`screen ${r==="classes"?"active":""}`,id:"classes",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Gerenciar Turmas"}),d.jsxs("form",{onSubmit:Ta,className:"add-class-form",children:[d.jsxs("div",{className:"input-row",children:[d.jsx("input",{type:"text",name:"name",placeholder:"Nome da turma",className:"add-class-input",required:!0}),d.jsx("input",{type:"text",name:"subject",placeholder:"Disciplina",className:"add-class-input",required:!0})]}),d.jsx("button",{type:"submit",className:"btn btn-primary",children:"Criar Turma"})]}),ft.classes?d.jsx("div",{className:"loading",children:"Carregando turmas..."}):rt.classes?d.jsxs("div",{className:"error",children:["Erro: ",rt.classes]}):d.jsx("div",{className:"class-list",children:O.map(z=>d.jsxs("div",{className:"class-item",children:[d.jsxs("div",{className:"class-content",children:[d.jsx("div",{className:"class-title",children:z.name}),d.jsxs("div",{className:"class-details",children:["Disciplina: ",z.subject," • Alunos: ",z.studentCount||0]})]}),d.jsx("button",{className:"btn-view-class",children:d.jsx("i",{className:"fas fa-eye"})})]},z._id||z.id))})]})}),d.jsx("div",{className:`screen ${r==="assignments"?"active":""}`,id:"assignments",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Gerenciar Tarefas"}),d.jsxs("form",{onSubmit:ye,className:"add-assignment-form",children:[d.jsxs("div",{className:"input-row",children:[d.jsx("input",{type:"text",value:J.title,onChange:z=>I({...J,title:z.target.value}),placeholder:"Título da tarefa",className:"add-assignment-input",required:!0}),d.jsx("input",{type:"text",value:J.subject,onChange:z=>I({...J,subject:z.target.value}),placeholder:"Disciplina",className:"add-assignment-input",required:!0})]}),d.jsxs("div",{className:"input-row",children:[d.jsxs("select",{value:J.classId,onChange:z=>Ua(z.target.value),className:"add-assignment-input",required:!0,children:[d.jsx("option",{value:"",children:"Selecione uma turma"}),O.map(z=>d.jsxs("option",{value:z._id||z.id,children:[z.name," (",z.subject,")"]},z._id||z.id))]}),d.jsx("input",{type:"date",value:J.deadline,onChange:z=>I({...J,deadline:z.target.value}),className:"add-assignment-input",required:!0})]}),d.jsx("div",{className:"input-row",children:d.jsx("textarea",{value:J.description,onChange:z=>I({...J,description:z.target.value}),placeholder:"Descrição da tarefa",className:"add-assignment-textarea",rows:"3"})}),d.jsx("button",{type:"submit",className:"btn btn-primary",children:"Criar Tarefa"})]}),ae&&_t.length>0&&d.jsxs("div",{className:"card",style:{marginTop:"20px"},children:[d.jsx("h3",{className:"card-title",children:"Atribuir Tarefa aos Alunos"}),d.jsxs("div",{className:"students-list",children:[d.jsxs("h4",{children:["Turma: ",O.find(z=>z._id===ae)?.name||O.find(z=>z.id===ae)?.name||"N/A"]}),d.jsx("div",{className:"student-assignments",children:_t.map(z=>d.jsxs("div",{className:"student-item",children:[d.jsx("span",{children:z.name}),d.jsx("input",{type:"checkbox",id:`student-${z._id||z.id}`})]},z._id||z.id))}),d.jsx("div",{style:{marginTop:"15px",textAlign:"right"},children:d.jsx("button",{className:"btn btn-primary",children:"Atribuir Tarefa Selecionada"})})]})]}),ft.assignments?d.jsx("div",{className:"loading",children:"Carregando tarefas..."}):rt.assignments?d.jsxs("div",{className:"error",children:["Erro: ",rt.assignments]}):d.jsx("div",{className:"assignment-list",children:K.map(z=>d.jsxs("div",{className:"assignment-item",children:[d.jsxs("div",{className:"assignment-content",children:[d.jsx("div",{className:"assignment-title",children:z.title}),d.jsxs("div",{className:"assignment-details",children:["Disciplina: ",z.subject||"N/A"," • Prazo: ",z.due_date?new Date(z.due_date).toLocaleDateString("pt-BR"):"N/A"," • Turma: ",z.class||"N/A"]})]}),d.jsx("button",{className:"btn-view-assignment",children:d.jsx("i",{className:"fas fa-eye"})})]},z._id||z.id))})]})}),d.jsx("div",{className:`screen ${r==="flashcards"?"active":""}`,id:"flashcards",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Gerenciar Flashcards"}),d.jsxs("form",{onSubmit:Nt,className:"add-flashcard-form",children:[d.jsxs("div",{className:"input-row",children:[d.jsx("input",{type:"text",value:jt.name,onChange:z=>Ve({...jt,name:z.target.value}),placeholder:"Pergunta",className:"add-flashcard-input",required:!0}),d.jsx("input",{type:"text",value:jt.subject,onChange:z=>Ve({...jt,subject:z.target.value}),placeholder:"Resposta",className:"add-flashcard-input",required:!0})]}),d.jsx("button",{type:"submit",className:"btn btn-primary",children:"Criar Flashcard"})]}),ft.flashcards?d.jsx("div",{className:"loading",children:"Carregando flashcards..."}):rt.flashcards?d.jsxs("div",{className:"error",children:["Erro: ",rt.flashcards]}):d.jsx("div",{className:"flashcard-deck-list",children:st.map(z=>d.jsxs("div",{className:"flashcard-deck-item",children:[d.jsxs("div",{className:"flashcard-deck-content",children:[d.jsx("div",{className:"flashcard-deck-title",children:z.question||z.name}),d.jsxs("div",{className:"flashcard-deck-details",children:["Disciplina: ",z.subject||z.tags?.[0]||"N/A"," • Resposta: ",z.answer||z.subject||"N/A"]})]}),d.jsxs("div",{className:"flashcard-actions",children:[d.jsx("button",{className:"btn-view-flashcard",title:"Visualizar",children:d.jsx("i",{className:"fas fa-eye"})}),d.jsx("button",{className:"btn-delete-flashcard",title:"Excluir",onClick:ot=>{ot.stopPropagation(),De(z._id||z.id)},children:d.jsx("i",{className:"fas fa-trash-alt"})})]})]},z._id||z.id))})]})}),d.jsxs("div",{className:`screen ${r==="performance"?"active":""}`,id:"performance",children:[d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Desempenho dos Alunos"}),ft.performance?d.jsx("div",{className:"loading",children:"Carregando desempenho..."}):rt.performance?d.jsxs("div",{className:"error",children:["Erro: ",rt.performance]}):d.jsx("div",{className:"performance-table",children:d.jsxs("table",{children:[d.jsx("thead",{children:d.jsxs("tr",{children:[d.jsx("th",{children:"Aluno"}),d.jsx("th",{children:"Turma"}),d.jsx("th",{children:"Disciplina"}),d.jsx("th",{children:"Tarefas Concluídas"}),d.jsx("th",{children:"Média"}),d.jsx("th",{children:"Última Atividade"})]})}),d.jsx("tbody",{children:at.length>0?at.map(z=>d.jsxs("tr",{children:[d.jsx("td",{children:z.assigned_to?.map(ot=>O.find(Ut=>Ut._id===z.class_id)?.students?.find(Ut=>Ut._id===ot.user)?.name).filter(Boolean)[0]||z.assigned_to?.[0]?.user_name||"N/A"}),d.jsx("td",{children:O.find(ot=>ot._id===z.class_id)?.name||z.class_name||"N/A"}),d.jsx("td",{children:z.subject||"N/A"}),d.jsxs("td",{children:[z.assigned_to?.filter(ot=>ot.status==="completed").length||0,"/",z.assigned_to?.length||0]}),d.jsx("td",{children:z.avg?z.avg.toFixed(1):"N/A"}),d.jsx("td",{children:z.assigned_to?.[0]?.completed_at?new Date(z.assigned_to[0].completed_at).toLocaleDateString("pt-BR"):"N/A"})]},z._id||z.id)):d.jsx("tr",{children:d.jsx("td",{colSpan:"6",children:"Nenhum dado de desempenho disponível."})})})]})})]}),d.jsxs("div",{className:"card",style:{marginTop:"20px"},children:[d.jsx("h3",{className:"card-title",children:"Estatísticas por Turma"}),O.length>0?d.jsx("div",{className:"class-stats",children:O.map(z=>d.jsxs("div",{className:"class-stat-item",children:[d.jsx("h4",{children:z.name}),d.jsxs("div",{className:"stat-info",children:[d.jsxs("div",{children:["Alunos: ",z.studentCount||0]}),d.jsxs("div",{children:["Tarefas: ",K.filter(ot=>ot.class_id===z._id||ot.class===z.name).length]}),d.jsxs("div",{children:["Média: ",K.filter(ot=>ot.class_id===z._id||ot.class===z.name).reduce((ot,Ut)=>ot+(Ut.avg||0),0)/Math.max(K.filter(ot=>ot.class_id===z._id||ot.class===z.name).length,1)]})]})]},z._id||z.id))}):d.jsx("p",{children:"Nenhuma turma encontrada."})]})]})]}),u&&d.jsx("div",{className:"profile-modal",onClick:Xe,children:d.jsxs("div",{className:"profile-modal-content",onClick:z=>z.stopPropagation(),children:[d.jsx("button",{className:"close-modal",onClick:Xe,children:"×"}),d.jsxs("div",{className:"profile-modal-header",children:[d.jsxs("div",{className:"profile-modal-img-container",children:[d.jsx("img",{src:v,alt:"Professor",className:"profile-modal-img"}),d.jsx("button",{className:"profile-img-upload-btn",title:"Alterar foto",onClick:Ha,style:{display:m?"block":"none"},children:d.jsx("i",{className:"fas fa-camera"})}),d.jsx("input",{id:"profile-image-upload",type:"file",accept:"image/*",onChange:ce,style:{display:"none"}})]}),d.jsxs("div",{className:"profile-modal-info",children:[m?d.jsx("input",{type:"text",name:"name",value:x.name,onChange:me,className:"profile-name-input"}):d.jsx("h3",{children:s?.name||"Professor"}),d.jsx("p",{children:s?.roleDescription||"Professor"}),d.jsx("p",{children:s?.email||"email@exemplo.com"})]})]}),d.jsxs("div",{className:"profile-modal-details",children:[d.jsxs("div",{children:[d.jsx("label",{children:"Nome Completo"}),m?d.jsx("input",{type:"text",name:"name",value:x.name,onChange:me,className:"profile-input"}):d.jsx("span",{children:s?.name||"Professor"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Email"}),d.jsx("span",{children:s?.email||"email@exemplo.com"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Tipo de Usuário"}),d.jsx("span",{children:s?.roleDescription||"Professor"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Instituição"}),d.jsx("span",{children:s?.school?.name||"Não informada"})]})]}),d.jsxs("div",{className:"profile-modal-actions",children:[d.jsx("button",{onClick:n,className:"theme-toggle-btn","aria-label":e?"Alternar para modo claro":"Alternar para modo escuro",children:e?d.jsxs(d.Fragment,{children:[d.jsx("i",{className:"fas fa-sun"})," Modo Claro"]}):d.jsxs(d.Fragment,{children:[d.jsx("i",{className:"fas fa-moon"})," Modo Escuro"]})}),m?d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn btn-secondary",onClick:It,children:"Cancelar"}),d.jsx("button",{className:"btn btn-primary",onClick:Ge,children:"Salvar"})]}):d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn btn-secondary",onClick:Re,children:"Editar Perfil"}),d.jsx("button",{className:"btn btn-primary",onClick:l,children:"Sair"})]})]})]})}),xt&&d.jsx(zo,{message:xt.message,type:xt.type,onClose:()=>dt(null)})]})}const hb=document.createElement("style");hb.innerHTML=`
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    background-color: var(--sidebar-background, #d9534f);
    color: white;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    z-index: 1000;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    box-shadow: 3px 0 10px rgba(0,0,0,0.1);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .logo {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .logo h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .logo h1 span {
    color: var(--secondary-color, #ffc107);
  }

  .menu {
    padding: 20px 0;
    flex: 1;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    margin: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(255,255,255,0.8);
  }

  .menu-item:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }

  .menu-item.active {
    background: rgba(255,255,255,0.2);
    color: white;
    font-weight: 500;
  }

  .menu-item i {
    margin-right: 12px;
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
  }

  .profile {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .profile:hover {
    background: rgba(255,255,255,0.1);
  }

  .profile-img-container {
    position: relative;
    margin-right: 12px;
  }

  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255,255,255,0.3);
  }

  .profile-img-upload-btn {
    position: absolute;
    bottom: -2px;
    right: -2px;
    background: var(--secondary-color, #ffc107);
    color: white;
    border: 2px solid white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    cursor: pointer;
  }

  .profile-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px;
    background-color: var(--background, #f8f9fa);
    width: calc(100% - 260px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .menu-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-color, #212529);
  }

  .page-title {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-color, #212529);
  }

  .screen {
    display: none;
  }

  .screen.active {
    display: block;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    background: white;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  }

  .stat-card i {
    display: block;
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--primary-color, #d9534f);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color, #d9534f);
    margin: 10px 0;
  }

  .stat-label {
    font-size: 1rem;
    color: var(--text-light-color, #6c757d);
  }

  .card {
    background: white;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  .card-title {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-color, #212529);
    border-bottom: 1px solid var(--border-color, #dee2e6);
    padding-bottom: 10px;
  }

  .add-class-form,
  .add-assignment-form,
  .add-flashcard-form {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
  }

  .input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .input-row .add-class-input,
  .input-row .add-assignment-input,
  .input-row .add-flashcard-input {
    flex: 1;
    min-width: 200px;
    padding: 10px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 4px;
    font-size: 14px;
  }

  .add-assignment-textarea {
    flex: 1 1 100%;
    padding: 10px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }

  .btn-primary {
    background-color: var(--primary-color, #d9534f);
    color: white;
  }

  .btn-primary:hover {
    background-color: var(--primary-dark, #c9302c);
  }

  .btn-secondary {
    background-color: var(--secondary-color, #6c757d);
    color: white;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
  }

  .btn-view-class,
  .btn-view-assignment,
  .btn-view-flashcard {
    background: var(--primary-color, #d9534f);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .btn-delete-flashcard {
    background: var(--danger-color, #d9534f);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 8px;
    cursor: pointer;
    margin-left: 8px;
  }

  .class-list,
  .assignment-list,
  .flashcard-deck-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .class-item,
  .assignment-item,
  .flashcard-deck-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
    background: white;
    transition: box-shadow 0.3s ease;
  }

  .class-item:hover,
  .assignment-item:hover,
  .flashcard-deck-item:hover {
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  }

  .class-content,
  .assignment-content,
  .flashcard-deck-content {
    flex: 1;
  }

  .class-title,
  .assignment-title,
  .flashcard-deck-title {
    font-weight: 600;
    color: var(--text-color, #212529);
    margin-bottom: 5px;
  }

  .class-details,
  .assignment-details,
  .flashcard-deck-details {
    font-size: 0.9rem;
    color: var(--text-light-color, #6c757d);
  }

  .flashcard-actions {
    display: flex;
    gap: 8px;
  }

  .loading,
  .error {
    padding: 15px;
    border-radius: 4px;
    text-align: center;
  }

  .loading {
    background-color: #fff3cd;
    color: #856404;
  }

  .error {
    background-color: #f8d7da;
    color: #721c24;
  }

  .performance-table table {
    width: 100%;
    border-collapse: collapse;
  }

  .performance-table th,
  .performance-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border-color, #dee2e6);
  }

  .performance-table th {
    background-color: #f8f9fa;
    font-weight: 600;
  }

  .class-stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
  }

  .class-stat-item {
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 8px;
    padding: 15px;
  }

  .class-stat-item h4 {
    margin-top: 0;
    color: var(--text-color, #212529);
  }

  .stat-info {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .stat-info div {
    background: #f8f9fa;
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: 500;
  }

  .students-list {
    margin-top: 15px;
  }

  .student-assignments {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 15px 0;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 4px;
  }

  .student-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid var(--border-color, #dee2e6);
  }

  .student-item:last-child {
    border-bottom: none;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: none;
  }

  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      left: -260px;
      height: 100vh;
      z-index: 1001;
    }

    .sidebar.open {
      left: 0;
    }

    .main-content {
      width: 100%;
    }

    .stats-container {
      grid-template-columns: 1fr;
    }

    .input-row {
      flex-direction: column;
    }

    .input-row .add-class-input,
    .input-row .add-assignment-input,
    .input-row .add-flashcard-input {
      min-width: 100%;
    }

    .sidebar-overlay {
      display: block;
    }
  }
  
  /* Estilos do modo escuro para flashcards */
  .dark-theme .flashcard-deck-item {
    background: var(--card-background);
    border-color: var(--border-color);
    color: var(--text-color);
  }
  
  .dark-theme .flashcard-deck-title {
    color: var(--text-color);
  }
  
  .dark-theme .flashcard-deck-details {
    color: var(--text-light-color);
  }
  
  .dark-theme .add-flashcard-form {
    background: var(--card-background);
    border-color: var(--border-color);
    color: var(--text-color);
  }
  
  .dark-theme .add-flashcard-input {
    background: var(--input-background);
    border-color: var(--border-color);
    color: var(--text-color);
  }
`;document.head.appendChild(hb);function x2({user:s,darkMode:e,toggleDarkMode:n,onLogout:l}){const[r,c]=j.useState("dashboard"),[u,h]=j.useState(!1),[m,p]=j.useState(!1),[x,y]=j.useState({name:s?.name||""}),[v,_]=j.useState(s?.profilePicture||"https://i.pravatar.cc/40"),[w,E]=j.useState(null),[T,M]=j.useState(!1),[O,V]=j.useState({focusTime:"0h 0m",completedTasks:0,totalTasks:0,flashcardAccuracy:0}),[K,Y]=j.useState([]),[st,tt]=j.useState([]),[at,it]=j.useState({title:"",subject:"",due_date:"",priority:"medium"}),[ft,nt]=j.useState(1500),[rt,vt]=j.useState(!1),[xt,dt]=j.useState("work"),[B,W]=j.useState(null),[lt,St]=j.useState([]),[A,$]=j.useState([]),[G,J]=j.useState([]),[I,_t]=j.useState({question:"",answer:"",tags:[]}),[ht,ae]=j.useState(null),[bt,jt]=j.useState(null),{updateFlashcardStats:Ve,getOverallAccuracy:ke,getFlashcardStats:Fe,stats:aa}=qd(),[Ue,Ft]=j.useState(!1),[Ta,ye]=j.useState(null),[Ba,Ua]=j.useState(""),Nt=k=>{c(k)},De=(k,F)=>{Ua(k),ye(()=>F),Ft(!0)},he=()=>{Ta&&Ta(),Ft(!1)},ka=()=>{Ft(!1)},Xe=(k,F)=>{it(mt=>({...mt,[k]:F}))},Re=async k=>{if(k.preventDefault(),!!at.title.trim())try{const F={title:at.title,subject:at.subject,due_date:at.due_date||void 0,priority:at.priority,assigned_to:[s._id]};await Ie.createTask(F),it({title:"",subject:"",due_date:"",priority:"medium"}),we()}catch(F){console.error("Erro ao criar tarefa:",F),bt("Erro ao criar tarefa: "+F.message)}},Ge=async(k,F)=>{try{const mt=F==="completed"?"pending":"completed";await Ie.updateTaskStatus(k,mt),we()}catch(mt){console.error("Erro ao atualizar status da tarefa:",mt),bt("Erro ao atualizar status da tarefa: "+mt.message)}},It=async k=>{if(window.confirm("Tem certeza que deseja arquivar esta tarefa?"))try{await Ie.archiveTask(k),we()}catch(F){console.error("Erro ao arquivar tarefa:",F),bt("Erro ao arquivar tarefa: "+F.message)}};j.useEffect(()=>{Ca(ft,rt);let k=null;return rt&&ft>0?k=setInterval(()=>{nt(F=>{const mt=F-1;return Ca(mt,!0),mt})},1e3):ft===0&&B&&ha(),()=>clearInterval(k)},[rt,ft,B,Ca,ha]);const me=async(k="work",F=25)=>{try{const mt={type:k,planned_duration:F},Rt=await Je.startSession(mt);W(Rt.data),vt(!0)}catch(mt){console.error("Erro ao iniciar sessão:",mt),bt("Erro ao iniciar sessão de Pomodoro: "+mt.message)}},ce=async()=>{if(B)try{await Je.pauseSession(B._id),vt(!1)}catch(k){console.error("Erro ao pausar sessão:",k),bt("Erro ao pausar sessão: "+k.message)}},Ha=async()=>{if(B)try{await Je.resumeSession(B._id),vt(!0)}catch(k){console.error("Erro ao retomar sessão:",k),bt("Erro ao retomar sessão: "+k.message)}},ha=async()=>{if(B)try{W(null),vt(!1),Kt(),Aa()}catch(k){console.error("Erro ao completar sessão:",k),bt("Erro ao completar sessão: "+k.message)}},z=async()=>{if(B)try{await Je.abandonSession(B._id),W(null),vt(!1),Kt()}catch(k){console.error("Erro ao abandonar sessão:",k),bt("Erro ao abandonar sessão: "+k.message)}},ot=async()=>{if(B)rt?await ce():await Ha();else{let k,F;switch(xt){case"Pomodoro":k="work",F=25;break;case"Short Break":k="short_break",F=5;break;case"Long Break":k="long_break",F=15;break;default:k="work",F=25}await me(k,F)}},Ut=async()=>{B&&await z(),vt(!1),nt(xt==="Pomodoro"||xt==="work"?1500:xt==="Short Break"||xt==="short_break"?300:900)},Pt=async k=>{B?De("Você tem uma sessão em andamento. Deseja abandoná-la e começar uma nova?",async()=>{await z(),dt(k),vt(!1),nt(k==="Pomodoro"||k==="work"?1500:k==="Short Break"||k==="short_break"?300:900)}):(dt(k),vt(!1),nt(k==="Pomodoro"||k==="work"?1500:k==="Short Break"||k==="short_break"?300:900))},sa=k=>{const F=Math.floor(k/60),mt=k%60;return`${F}:${mt<10?"0":""}${mt}`},Aa=()=>{const k=new(window.AudioContext||window.webkitAudioContext),F=k.createOscillator(),mt=k.createGain();F.connect(mt),mt.connect(k.destination),F.type="sine",F.frequency.value=800,mt.gain.value=.3,F.start(),mt.gain.exponentialRampToValueAtTime(1e-5,k.currentTime+.5),setTimeout(()=>{F.stop()},500)},Ca=(k,F)=>{if(F){const mt=sa(k);document.title=`${mt} - Pomodoro Timer`}else document.title="PomoDash"};j.useEffect(()=>(Ca(ft,rt),()=>{document.title="PomoDash"}),[rt,ft,Ca]);const Pa=async()=>{try{const F=(await ts.getFlashcards()).data.map(mt=>({...mt,stats:Fe(mt._id)}));$(F||[])}catch(k){console.error("Erro ao carregar flashcards:",k)}},ks=async k=>{if(k.preventDefault(),!I.question.trim()||!I.answer.trim()){bt("Pergunta e resposta são obrigatórias");return}try{const F=await ts.createFlashcard(I);$([...A,F.data]),_t({question:"",answer:"",tags:[]})}catch(F){console.error("Erro ao criar flashcard:",F),bt("Erro ao criar flashcard: "+F.message)}},ss=async k=>{if(window.confirm("Tem certeza que deseja deletar este flashcard?"))try{await ts.deleteFlashcard(k),$(A.filter(F=>F._id!==k))}catch(F){console.error("Erro ao deletar flashcard:",F),bt("Erro ao deletar flashcard: "+F.message)}},na=k=>{if(ht===k){const F=window.confirm('Você acertou este flashcard? Clique em "OK" se sim, "Cancelar" se não.');Ve(k,F)}ae(F=>F===k?null:k)},rn=()=>{h(!0)},qa=()=>{h(!1),p(!1)},As=()=>{p(!0)},Ya=async()=>{try{const k=w;let F;if(k){const Rt=new FormData;Rt.append("name",x.name),Rt.append("profilePicture",k),F=await fa.updateProfile(Rt)}else F=await fa.updateProfile({name:x.name});const mt={...s,name:F.data.user.name,profilePicture:F.data.user.profilePicture||s?.profilePicture};localStorage.setItem("user",JSON.stringify(mt)),p(!1),E(null)}catch(k){console.error("Erro ao atualizar perfil:",k),bt("Erro ao atualizar perfil: "+k.message)}},He=()=>{y({name:s?.name||""}),_(s?.profilePicture||"https://i.pravatar.cc/40"),E(null),p(!1)},Va=k=>{const{name:F,value:mt}=k.target;y(Rt=>({...Rt,[F]:mt}))},Ma=k=>{const F=k.target.files[0];if(F){const mt=new FileReader;mt.onloadend=()=>{_(mt.result)},mt.readAsDataURL(F),E(F)}},Pe=()=>{document.getElementById("profile-image-upload").click()},Kt=async()=>{try{const k=await Je.getSessions({limit:5});St(k.data||[])}catch(k){console.error("Erro ao carregar sessões recentes:",k)}},ge=async()=>{try{const k=await Je.getActiveSession();if(k.data){W(k.data);const F=new Date,mt=new Date(k.data.timing.started_at),Rt=Math.floor((F-mt)/1e3),ue=k.data.settings.planned_duration*60,Xt=Math.max(0,ue-Rt);nt(Xt),vt(!0)}}catch(k){k.message.includes("Nenhuma sessão ativa")||console.error("Erro ao carregar sessão ativa:",k)}},we=async()=>{try{const k=await Ie.getTasks({status:"pending"});Y(k.data||[])}catch(k){console.error("Erro ao carregar tarefas:",k)}},R=async()=>{try{const k=await Je.getStats(),F=await Ie.getTasks(),mt=F.data.filter(Fa=>Fa.assigned_to?.find(Dn=>Dn.user.toString()===s._id.toString()&&Dn.status==="completed")).length,Rt=F.data.filter(Fa=>Fa.assigned_to?.find(Dn=>Dn.user.toString()===s._id.toString())).length;let ue=0;k.data&&k.data.totalMinutes&&(ue=Math.floor(k.data.totalMinutes));const Xt=Math.floor(ue/60),qe=ue%60,Hl=`${Xt}h ${qe}m`,ns=ke();V({focusTime:Hl,completedTasks:mt,totalTasks:Rt,flashcardAccuracy:ns})}catch(k){console.error("Erro ao carregar estatísticas:",k)}};j.useEffect(()=>{const k=document.createElement("script");return k.src="https://kit.fontawesome.com/a076d05399.js",k.crossOrigin="anonymous",document.body.appendChild(k),ge(),Kt(),we(),Pa(),R(),()=>{document.body.removeChild(k),document.title="PomoDash"}},[aa,Pa,R]),j.useEffect(()=>{r==="professor-tasks"?C():r==="professor-flashcards"&&et()},[r,et,C]);const ct={dashboard:"Dashboard Geral",tasks:"Minhas Tarefas",pomodoro:"Pomodoro",flashcards:"Meus Flashcards",reports:"Relatórios",settings:"Configurações","professor-tasks":"Tarefas do Professor","professor-flashcards":"Flashcards do Professor"},C=async()=>{try{const k=await Ie.getTasks({school_id:s.school_id,created_by_role:"teacher"});tt(k.data||[])}catch(k){console.error("Erro ao carregar tarefas do professor:",k),jt({message:"Erro ao carregar tarefas do professor: "+(k.message||"Não foi possível conectar ao servidor"),type:"error"}),tt([])}},et=async()=>{try{const k=await ts.getFlashcards({school_id:s.school_id,created_by_role:"teacher"});J(k.data||[])}catch(k){console.error("Erro ao carregar flashcards do professor:",k),jt({message:"Erro ao carregar flashcards do professor: "+(k.message||"Não foi possível conectar ao servidor"),type:"error"}),J([])}},ut=k=>k?new Date(k).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}):"N/A";return d.jsxs("div",{className:"container",children:[d.jsxs("div",{className:`sidebar ${T?"open":""}`,children:[d.jsx("div",{className:"logo",children:d.jsxs("h1",{children:["Pomo",d.jsx("span",{children:"dash"})]})}),d.jsxs("div",{className:"menu",children:[d.jsxs("div",{className:`menu-item ${r==="dashboard"?"active":""}`,onClick:()=>{Nt("dashboard"),M(!1)},children:[d.jsx("i",{className:"fas fa-tachometer-alt"}),d.jsx("span",{children:"Dashboard"})]}),d.jsxs("div",{className:`menu-item ${r==="tasks"?"active":""}`,onClick:()=>{Nt("tasks"),M(!1)},children:[d.jsx("i",{className:"fas fa-tasks"}),d.jsx("span",{children:"Minhas Tarefas"})]}),d.jsxs("div",{className:`menu-item ${r==="pomodoro"?"active":""}`,onClick:()=>{Nt("pomodoro"),M(!1)},children:[d.jsx("i",{className:"fas fa-clock"}),d.jsx("span",{children:"Pomodoro"})]}),d.jsxs("div",{className:`menu-item ${r==="flashcards"?"active":""}`,onClick:()=>{Nt("flashcards"),M(!1)},children:[d.jsx("i",{className:"fas fa-layer-group"}),d.jsx("span",{children:"Meus Flashcards"})]})]}),d.jsxs("div",{className:"profile",onClick:()=>{rn(),M(!1)},children:[d.jsxs("div",{className:"profile-img-container",children:[d.jsx("img",{src:v,alt:"Usuário",className:"profile-img"}),d.jsx("button",{className:"profile-img-upload-btn",title:"Alterar foto",onClick:Pe,style:{display:"none"},children:d.jsx("i",{className:"fas fa-camera"})})]}),d.jsx("div",{className:"profile-name",children:s?.name||"Usuário"})]})]}),T&&d.jsx("div",{className:"sidebar-overlay",onClick:()=>M(!1)}),d.jsxs("div",{className:"main-content",children:[d.jsx("div",{className:"header",children:d.jsxs("div",{className:"header-left",children:[d.jsx("button",{className:"menu-toggle",onClick:()=>M(!T),children:d.jsx("i",{className:"fas fa-bars"})}),d.jsx("h2",{className:"page-title",id:"page-title",children:ct[r]})]})}),d.jsxs("div",{className:`screen ${r==="dashboard"?"active":""}`,id:"dashboard-user",children:[d.jsxs("div",{className:"stats-container",children:[d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-clock fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:O.focusTime}),d.jsx("div",{className:"stat-label",children:"Tempo de foco"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-check-circle fa-2x",style:{color:"var(--secondary-color)"}}),d.jsxs("div",{className:"stat-value",children:[O.completedTasks,"/",O.totalTasks]}),d.jsx("div",{className:"stat-label",children:"Tarefas concluídas"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-brain fa-2x",style:{color:"#FFC107"}}),d.jsxs("div",{className:"stat-value",children:[O.flashcardAccuracy,"%"]}),d.jsx("div",{className:"stat-label",children:"Aproveitamento de Flashcards"})]})]}),d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Visão Geral"}),d.jsx("p",{children:"Seja bem-vindo ao seu dashboard pessoal. Aqui você pode gerenciar suas tarefas, usar o temporizador Pomodoro para aumentar sua produtividade e estudar com flashcards."})]})]}),d.jsx("div",{className:`screen ${r==="tasks"?"active":""}`,id:"tasks",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Gerenciar Tarefas"}),d.jsxs("form",{onSubmit:Re,className:"add-task-form",children:[d.jsx("div",{className:"input-group",children:d.jsx("input",{type:"text",value:at.title,onChange:k=>Xe("title",k.target.value),placeholder:"Título da tarefa",className:"add-task-input",required:!0})}),d.jsxs("div",{className:"input-row",children:[d.jsx("input",{type:"text",value:at.subject,onChange:k=>Xe("subject",k.target.value),placeholder:"Disciplina",className:"add-task-input"}),d.jsx("input",{type:"date",value:at.due_date,onChange:k=>Xe("due_date",k.target.value),className:"add-task-input"})]}),d.jsxs("div",{className:"input-row",children:[d.jsxs("select",{value:at.priority,onChange:k=>Xe("priority",k.target.value),className:"add-task-input",children:[d.jsx("option",{value:"low",children:"Baixa"}),d.jsx("option",{value:"medium",children:"Média"}),d.jsx("option",{value:"high",children:"Alta"}),d.jsx("option",{value:"urgent",children:"Urgente"})]}),d.jsx("button",{type:"submit",className:"btn btn-primary",children:"Adicionar Tarefa"})]})]}),d.jsx("div",{className:"task-list",children:K&&K.length>0?K.map(k=>{const F=k.assigned_to?.find(Rt=>Rt.user.toString()===s._id.toString()),mt=F?F.status:"pending";return d.jsxs("div",{className:`task-item ${mt==="completed"?"completed":""}`,children:[d.jsx("input",{type:"checkbox",className:"task-checkbox",checked:mt==="completed",onChange:()=>Ge(k._id,mt)}),d.jsxs("div",{className:"task-content",children:[d.jsx("div",{className:"task-title",children:k.title}),d.jsxs("div",{className:"task-details",children:["Disciplina: ",k.subject||"N/A"," • Prazo: ",k.due_date?new Date(k.due_date).toLocaleDateString("pt-BR"):"Sem prazo"," • Prioridade: ",k.priority]})]}),d.jsx("button",{onClick:()=>It(k._id),className:"btn-delete-task",children:d.jsx("i",{className:"fas fa-trash-alt"})})]},k._id)}):d.jsx("p",{children:"Você não tem tarefas no momento."})})]})}),d.jsx("div",{className:`screen ${r==="pomodoro"?"active":""}`,id:"pomodoro",children:d.jsxs("div",{className:"card",children:[d.jsxs("div",{className:"session-types",children:[d.jsx("button",{onClick:()=>Pt("Pomodoro"),className:`btn-session ${xt==="Pomodoro"||xt==="work"?"active":""}`,children:"Pomodoro"}),d.jsx("button",{onClick:()=>Pt("Short Break"),className:`btn-session ${xt==="Short Break"||xt==="short_break"?"active":""}`,children:"Pausa Curta"}),d.jsx("button",{onClick:()=>Pt("Long Break"),className:`btn-session ${xt==="Long Break"||xt==="long_break"?"active":""}`,children:"Pausa Longa"})]}),d.jsxs("div",{className:"timer",children:[d.jsx("div",{className:"timer-time",children:sa(ft)}),d.jsx("div",{className:"timer-label",children:xt==="work"?"Pomodoro":xt==="short_break"?"Pausa Curta":"Pausa Longa"})]}),d.jsxs("div",{className:"timer-controls",children:[d.jsx("button",{onClick:ot,className:"btn btn-primary",children:B?rt?"Pausar":"Retomar":"Iniciar"}),d.jsx("button",{onClick:Ut,className:"btn btn-secondary",children:"Resetar"})]}),d.jsxs("div",{className:"recent-sessions",children:[d.jsx("h4",{children:"Sessões Recentes"}),lt.length>0?d.jsx("div",{className:"session-list",children:lt.map(k=>d.jsx("div",{className:"session-item",children:d.jsxs("div",{className:"session-info",children:[d.jsx("div",{className:"session-type",children:k.type==="work"?"Pomodoro":k.type==="short_break"?"Pausa Curta":"Pausa Longa"}),d.jsx("div",{className:"session-date",children:ut(k.timing.started_at)}),d.jsxs("div",{className:"session-duration",children:[Math.round(k.timing.actual_duration/60)," min"]}),d.jsx("div",{className:`session-status ${k.status}`,children:k.status==="completed"?"Concluído":k.status==="abandoned"?"Abandonado":k.status==="paused"?"Pausado":k.status})]})},k._id))}):d.jsx("p",{children:"Nenhuma sessão registrada ainda."})]})]})}),d.jsxs("div",{className:`screen ${r==="flashcards"?"active":""}`,id:"flashcards",children:[d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Criar Novo Flashcard"}),d.jsxs("form",{onSubmit:ks,className:"add-flashcard-form",children:[d.jsx("div",{className:"input-group",children:d.jsx("input",{type:"text",value:I.question,onChange:k=>_t({...I,question:k.target.value}),placeholder:"Pergunta",className:"add-flashcard-input",required:!0})}),d.jsx("div",{className:"input-group",children:d.jsx("input",{type:"text",value:I.answer,onChange:k=>_t({...I,answer:k.target.value}),placeholder:"Resposta",className:"add-flashcard-input",required:!0})}),d.jsx("div",{className:"input-group",children:d.jsx("input",{type:"text",value:I.tags.join(", "),onChange:k=>_t({...I,tags:k.target.value.split(",").map(F=>F.trim()).filter(F=>F)}),placeholder:"Tags (separadas por vírgula)",className:"add-flashcard-input"})}),d.jsx("button",{type:"submit",className:"btn btn-primary",children:"Adicionar Flashcard"})]})]}),d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Seus Flashcards"}),A&&A.length>0?d.jsx("div",{className:"flashcard-grid",children:A.map(k=>d.jsxs("div",{className:`flashcard ${ht===k._id?"flipped":""}`,onClick:()=>na(k._id),children:[d.jsxs("div",{className:"flashcard-inner",children:[d.jsx("div",{className:"flashcard-front",children:k.question}),d.jsx("div",{className:"flashcard-back",children:k.answer})]}),d.jsxs("div",{className:"flashcard-stats",children:[d.jsxs("span",{className:"accuracy-badge",title:`Aproveitamento: ${k.stats?.accuracy||0}%`,children:[k.stats?.accuracy||0,"%"]}),d.jsx("span",{className:"attempts-badge",title:`Tentativas: ${k.stats?.attempts||0}`,children:k.stats?.attempts||0})]}),d.jsx("button",{onClick:F=>{F.stopPropagation(),ss(k._id)},className:"btn-delete-flashcard",children:d.jsx("i",{className:"fas fa-trash-alt"})})]},k._id))}):d.jsx("p",{children:"Você não tem flashcards criados ainda."})]})]}),d.jsx("div",{className:`screen ${r==="reports"?"active":""}`,id:"reports",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Meus Relatórios"}),d.jsx("p",{children:"Aqui você pode visualizar seus relatórios de produtividade, tempo de foco e progresso nos estudos."})]})}),d.jsx("div",{className:`screen ${r==="professor-tasks"?"active":""}`,id:"professor-tasks",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Tarefas do Professor"}),d.jsx("div",{className:"task-list",children:st&&st.length>0?st.map(k=>d.jsxs("div",{className:"task-item",children:[d.jsxs("div",{className:"task-content",children:[d.jsx("div",{className:"task-title",children:k.title}),d.jsxs("div",{className:"task-details",children:["Disciplina: ",k.subject||"N/A"," • Prazo: ",k.due_date?new Date(k.due_date).toLocaleDateString("pt-BR"):"N/A"," • Prioridade: ",k.priority]})]}),d.jsx("div",{className:"task-meta",children:d.jsx("span",{className:`task-status ${k.status||"pending"}`,children:k.status==="completed"?"Concluída":k.status==="in_progress"?"Em Progresso":"Pendente"})})]},k._id)):d.jsx("p",{children:"Nenhuma tarefa do professor disponível no momento."})})]})}),d.jsx("div",{className:`screen ${r==="professor-flashcards"?"active":""}`,id:"professor-flashcards",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Flashcards do Professor"}),d.jsx("div",{className:"flashcard-grid",children:G&&G.length>0?G.map(k=>d.jsxs("div",{className:"flashcard-item",children:[d.jsxs("div",{className:"flashcard-content",children:[d.jsx("div",{className:"flashcard-question",children:k.question}),d.jsx("div",{className:"flashcard-answer",children:k.answer})]}),d.jsxs("div",{className:"flashcard-meta",children:[d.jsx("span",{className:"flashcard-subject",children:k.subject||"N/A"}),d.jsx("span",{className:"flashcard-tags",children:k.tags&&k.tags.length>0?k.tags.join(", "):"Sem tags"})]})]},k._id)):d.jsx("p",{children:"Nenhum flashcard do professor disponível no momento."})})]})})]}),u&&d.jsx("div",{className:"profile-modal",onClick:qa,children:d.jsxs("div",{className:"profile-modal-content",onClick:k=>k.stopPropagation(),children:[d.jsx("button",{className:"close-modal",onClick:qa,children:"×"}),d.jsxs("div",{className:"profile-modal-header",children:[d.jsxs("div",{className:"profile-modal-img-container",children:[d.jsx("img",{src:v,alt:"Usuário",className:"profile-modal-img"}),d.jsx("button",{className:"profile-img-upload-btn",title:"Alterar foto",onClick:Pe,style:{display:m?"block":"none"},children:d.jsx("i",{className:"fas fa-camera"})}),d.jsx("input",{id:"profile-image-upload",type:"file",accept:"image/*",onChange:Ma,style:{display:"none"}})]}),d.jsxs("div",{className:"profile-modal-info",children:[d.jsx("div",{className:"profile-name-container",children:m?d.jsx("input",{type:"text",name:"name",value:x.name,onChange:Va,className:"profile-name-input"}):d.jsx("h3",{children:s?.name||"Usuário"})}),d.jsx("p",{children:s?.roleDescription||"Usuário Geral"}),d.jsx("p",{children:s?.email||"email@exemplo.com"})]})]}),d.jsxs("div",{className:"profile-modal-details",children:[d.jsxs("div",{children:[d.jsx("label",{children:"Nome Completo"}),m?d.jsx("input",{type:"text",name:"name",value:x.name,onChange:Va,className:"profile-input"}):d.jsx("span",{children:s?.name||"Usuário"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Email"}),d.jsx("span",{children:s?.email||"email@exemplo.com"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Tipo de Usuário"}),d.jsx("span",{children:s?.roleDescription||"Usuário Geral"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Instituição"}),d.jsx("span",{children:s?.school?.name||"Não informada"})]})]}),d.jsxs("div",{className:"profile-modal-actions",children:[d.jsx("button",{onClick:n,className:"theme-toggle-btn","aria-label":e?"Alternar para modo claro":"Alternar para modo escuro",children:e?d.jsxs(d.Fragment,{children:[d.jsx("i",{className:"fas fa-sun"})," Modo Claro"]}):d.jsxs(d.Fragment,{children:[d.jsx("i",{className:"fas fa-moon"})," Modo Escuro"]})}),m?d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn btn-secondary",onClick:He,children:"Cancelar"}),d.jsx("button",{className:"btn btn-primary",onClick:Ya,children:"Salvar"})]}):d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn btn-secondary",onClick:As,children:"Editar Perfil"}),d.jsx("button",{className:"btn btn-primary",onClick:l,children:"Sair"})]})]})]})}),bt&&d.jsx(zo,{message:bt.message,type:bt.type,onClose:()=>jt(null)}),Ue&&d.jsx(Pd,{message:Ba,onConfirm:he,onCancel:ka,type:"warning"})]})}const mb=document.createElement("style");mb.innerHTML=`
  .container-app {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    background: linear-gradient(135deg, #d9534f 0%, #c9302c 100%);
    color: white;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    z-index: 1000;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    box-shadow: 3px 0 10px rgba(0,0,0,0.1);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .logo {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .logo h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .logo h1 span {
    color: #ffc107;
  }

  .menu {
    padding: 20px 0;
    flex: 1;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    margin: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(255,255,255,0.8);
  }

  .menu-item:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }

  .menu-item.active {
    background: rgba(255,255,255,0.2);
    color: white;
    font-weight: 500;
  }

  .menu-item i {
    margin-right: 12px;
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
  }

  .profile {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .profile:hover {
    background: rgba(255,255,255,0.1);
  }

  .profile-img-container {
    position: relative;
    margin-right: 12px;
  }

  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255,255,255,0.3);
  }

  .profile-img-upload-btn {
    position: absolute;
    bottom: -2px;
    right: -2px;
    background: #ffc107;
    color: white;
    border: 2px solid white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    cursor: pointer;
  }

  .profile-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px;
    background-color: #f8f9fa;
    width: calc(100% - 260px);
  }

  .add-task-form {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .input-row .add-task-input,
  .input-row select {
    flex: 1;
  }

  .task-status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: bold;
  }

  .task-status.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .task-status.in_progress {
    background-color: #cce5ff;
    color: #004085;
  }

  .task-status.completed {
    background-color: #d4edda;
    color: #155724;
  }

  .session-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
  }

  .session-info {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .session-type {
    font-weight: bold;
    color: var(--primary-color);
  }

  .session-status.completed {
    color: var(--success-color);
  }

  .session-status.abandoned {
    color: var(--danger-color);
  }

  .session-status.paused {
    color: var(--warning-color);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .stat-item {
    text-align: center;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .stat-item h4 {
    margin: 0 0 10px 0;
    color: var(--text-color);
  }

  .stat-item .stat-value {
    font-size: 1.5em;
    font-weight: bold;
    color: var(--primary-color);
    margin: 0;
  }

  .recent-activity {
    margin-top: 20px;
  }

  .recent-activity h4 {
    margin-bottom: 10px;
    color: var(--text-color);
  }

  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }

  .flashcard {
    height: 200px;
    perspective: 1000px;
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
  }

  .flashcard-front, .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--card-background);
    color: var(--text-color);
  }

  .flashcard-back {
    transform: rotateY(180deg);
  }

  .btn-delete-flashcard {
    position: absolute;
    top: 5px;
    right: 5px;
    background: var(--danger-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    z-index: 10;
  }

  .flashcard-stats {
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: flex;
    gap: 5px;
    z-index: 5;
  }

  .accuracy-badge, .attempts-badge {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 0.7em;
  }

  .accuracy-badge {
    background: linear-gradient(45deg, #10b981, #34d399);
  }

  .attempts-badge {
    background: linear-gradient(45deg, #d9534f, #c9302c);
  }

  /* Estilos para as telas do professor */
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    background: var(--card-background);
    transition: all 0.2s ease;
  }

  .task-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .task-content {
    flex: 1;
  }

  .task-title {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 4px;
  }

  .task-details {
    font-size: 0.9rem;
    color: var(--text-light-color);
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .task-meta {
    display: flex;
    align-items: center;
    margin-left: 16px;
  }

  .task-status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .task-status.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .task-status.in_progress {
    background-color: #cce5ff;
    color: #004085;
  }

  .task-status.completed {
    background-color: #d4edda;
    color: #155724;
  }

  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 16px;
  }

  .flashcard-item {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.3s ease;
  }

  .flashcard-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .flashcard-content {
    margin-bottom: 12px;
  }

  .flashcard-question {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 8px;
  }

  .flashcard-answer {
    color: var(--text-light-color);
    font-style: italic;
  }

  .flashcard-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: var(--text-light-color);
    border-top: 1px solid var(--border-color);
    padding-top: 12px;
  }

  .flashcard-subject {
    background: rgba(229, 83, 69, 0.1);
    color: #e55345;
    padding: 2px 8px;
    border-radius: 12px;
  }

  .flashcard-tags {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    .container-app {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100%;
      height: auto;
      max-height: 300px;
      transform: translateX(-100%);
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
    
    .main-content {
      width: 100%;
    }
  }
`;document.head.appendChild(mb);function gb({user:s,darkMode:e,toggleDarkMode:n,onLogout:l}){const[r,c]=j.useState("dashboard"),[u,h]=j.useState([]),[m,p]=j.useState({focusTime:"0h 0m",completedTasks:0,totalTasks:0,flashcardAccuracy:0,recentSessions:[],upcomingTasks:[]}),[x,y]=j.useState({title:"",subject:"",due_date:"",priority:"medium"}),[v,_]=j.useState(!1),[w,E]=j.useState(!1),[T,M]=j.useState(!1),[O,V]=j.useState({name:s?.name||""}),[K,Y]=j.useState(s?.profilePicture||"https://i.pravatar.cc/40"),[st,tt]=j.useState(null),[at,it]=j.useState(!1),[ft,nt]=j.useState(1500),[rt,vt]=j.useState(!1),[xt,dt]=j.useState("work"),[B,W]=j.useState(null),[lt,St]=j.useState([]),[A,$]=j.useState([]),[G,J]=j.useState({question:"",answer:"",tags:[]}),[I,_t]=j.useState(!1),[ht,ae]=j.useState(null),[bt,jt]=j.useState(null),{updateFlashcardStats:Ve,getOverallAccuracy:ke,getFlashcardStats:Fe,stats:aa}=qd(),[Ue,Ft]=j.useState(!1),[Ta,ye]=j.useState(null),[Ba,Ua]=j.useState(""),Nt=R=>{c(R)},De=(R,ct)=>{Ua(R),ye(()=>ct),Ft(!0)},he=()=>{Ta&&Ta(),Ft(!1)},ka=()=>{Ft(!1)},Xe=async R=>{if(R.preventDefault(),!!x.title.trim())try{const ct={title:x.title,subject:x.subject,due_date:x.due_date||void 0,priority:x.priority,assigned_to:[s._id]};await Ie.createTask(ct),y({title:"",subject:"",due_date:"",priority:"medium"}),_(!1),Kt(),jt({message:"Tarefa criada com sucesso!",type:"success"})}catch(ct){jt({message:"Erro ao criar tarefa: "+ct.message,type:"error"})}},Re=async(R,ct)=>{try{const C=ct==="completed"?"pending":"completed";await Ie.updateTaskStatus(R,C),Kt()}catch(C){jt({message:"Erro ao atualizar status da tarefa: "+C.message,type:"error"})}},Ge=async R=>{if(window.confirm("Tem certeza que deseja arquivar esta tarefa?"))try{await Ie.archiveTask(R),Kt(),jt({message:"Tarefa arquivada com sucesso!",type:"success"})}catch(ct){jt({message:"Erro ao arquivar tarefa: "+ct.message,type:"error"})}},It=(R,ct)=>{y(C=>({...C,[R]:ct}))};j.useEffect(()=>{let R=null;return rt&&ft>0?R=setInterval(()=>{nt(ct=>ct-1)},1e3):ft===0&&B&&ha(),()=>clearInterval(R)},[rt,ft,B]);const me=async(R="work",ct=25)=>{try{const C={type:R,planned_duration:ct},et=await Je.startSession(C);W(et.data),vt(!0)}catch(C){jt({message:"Erro ao iniciar sessão de Pomodoro: "+C.message,type:"error"})}},ce=async()=>{if(B)try{await Je.pauseSession(B._id),vt(!1)}catch(R){jt({message:"Erro ao pausar sessão: "+R.message,type:"error"})}},Ha=async()=>{if(B)try{await Je.resumeSession(B._id),vt(!0)}catch(R){jt({message:"Erro ao retomar sessão: "+R.message,type:"error"})}},ha=async()=>{if(B)try{W(null),vt(!1),Ma(),jt({message:"Sessão completada com sucesso!",type:"success"})}catch(R){jt({message:"Erro ao completar sessão: "+R.message,type:"error"})}},z=async()=>{if(B)try{await Je.abandonSession(B._id),W(null),vt(!1),Ma(),jt({message:"Sessão abandonada com sucesso!",type:"info"})}catch(R){jt({message:"Erro ao abandonar sessão: "+R.message,type:"error"})}},ot=async()=>{if(B)rt?await ce():await Ha();else{let R,ct;switch(xt){case"Pomodoro":R="work",ct=25;break;case"Short Break":R="short_break",ct=5;break;case"Long Break":R="long_break",ct=15;break;default:R="work",ct=25}await me(R,ct)}},Ut=async()=>{B&&await z(),vt(!1),nt(xt==="Pomodoro"||xt==="work"?1500:xt==="Short Break"||xt==="short_break"?300:900)},Pt=async R=>{B?De("Você tem uma sessão em andamento. Deseja abandoná-la e começar uma nova?",async()=>{await z(),dt(R),vt(!1),nt(R==="Pomodoro"||R==="work"?1500:R==="Short Break"||R==="short_break"?300:900)}):(dt(R),vt(!1),nt(R==="Pomodoro"||R==="work"?1500:R==="Short Break"||R==="short_break"?300:900))},sa=R=>{const ct=Math.floor(R/60),C=R%60;return`${ct}:${C<10?"0":""}${C}`},Aa=async()=>{try{const ct=(await ts.getFlashcards()).data.map(C=>({...C,stats:Fe(C._id)}));$(ct||[])}catch(R){jt({message:"Erro ao carregar flashcards: "+R.message,type:"error"})}},Ca=async R=>{if(R.preventDefault(),!G.question.trim()||!G.answer.trim()){jt({message:"Pergunta e resposta são obrigatórias",type:"error"});return}try{const ct=await ts.createFlashcard(G);$([...A,ct.data]),J({question:"",answer:"",tags:[]}),_t(!1),jt({message:"Flashcard criado com sucesso!",type:"success"})}catch(ct){jt({message:"Erro ao criar flashcard: "+ct.message,type:"error"})}},Pa=async R=>{if(window.confirm("Tem certeza que deseja deletar este flashcard?"))try{await ts.deleteFlashcard(R),$(A.filter(ct=>ct._id!==R)),jt({message:"Flashcard deletado com sucesso!",type:"success"})}catch(ct){jt({message:"Erro ao deletar flashcard: "+ct.message,type:"error"})}},ks=R=>{if(ht===R){const ct=window.confirm('Você acertou este flashcard? Clique em "OK" se sim, "Cancelar" se não.');Ve(R,ct)}ae(ct=>ct===R?null:R)},ss=()=>{E(!0)},na=()=>{E(!1),M(!1)},rn=()=>{M(!0)},qa=async()=>{try{const R=st;let ct;if(R){const et=new FormData;et.append("name",O.name),et.append("profilePicture",R),ct=await fa.updateProfile(et)}else ct=await fa.updateProfile({name:O.name});const C={...s,name:ct.data.user.name,profilePicture:ct.data.user.profilePicture||s?.profilePicture};localStorage.setItem("user",JSON.stringify(C)),M(!1),tt(null),jt({message:"Perfil atualizado com sucesso!",type:"success"})}catch(R){jt({message:"Erro ao atualizar perfil: "+R.message,type:"error"})}},As=()=>{V({name:s?.name||""}),Y(s?.profilePicture||"https://i.pravatar.cc/40"),tt(null),M(!1)},Ya=R=>{const{name:ct,value:C}=R.target;V(et=>({...et,[ct]:C}))},He=R=>{const ct=R.target.files[0];if(ct){const C=new FileReader;C.onloadend=()=>{Y(C.result)},C.readAsDataURL(ct),tt(ct)}},Va=()=>{document.getElementById("profile-image-upload").click()},Ma=async()=>{try{const R=await Je.getSessions({limit:5});St(R.data||[])}catch(R){jt({message:"Erro ao carregar sessões recentes: "+R.message,type:"error"})}},Pe=async()=>{try{const R=await Je.getActiveSession();if(R.data){W(R.data);const ct=new Date,C=new Date(R.data.timing.started_at),et=Math.floor((ct-C)/1e3),ut=R.data.settings.planned_duration*60,k=Math.max(0,ut-et);nt(k),vt(!0)}}catch(R){R.message.includes("Nenhuma sessão ativa")||jt({message:"Erro ao carregar sessão ativa: "+R.message,type:"error"})}},Kt=async()=>{try{const R=await Je.getStats(),ct=await Ie.getTasks({status:"pending"}),C=await Ie.getTasks(),et=C.data.filter(Xt=>Xt.assigned_to?.find(qe=>qe.user.toString()===s._id.toString()&&qe.status==="completed")).length,ut=C.data.filter(Xt=>Xt.assigned_to?.find(qe=>qe.user.toString()===s._id.toString())).length;let k=0;R.data&&R.data.totalMinutes&&(k=Math.floor(R.data.totalMinutes));const F=Math.floor(k/60),mt=k%60,Rt=`${F}h ${mt}m`,ue=ke();p({focusTime:Rt,completedTasks:et,totalTasks:ut,flashcardAccuracy:ue,recentSessions:[],upcomingTasks:ct.data.slice(0,3)}),h(ct.data||[])}catch(R){jt({message:"Erro ao carregar estatísticas: "+R.message,type:"error"})}};j.useEffect(()=>{const R=document.createElement("script");return R.src="https://kit.fontawesome.com/a076d05399.js",R.crossOrigin="anonymous",document.body.appendChild(R),Pe(),Ma(),Kt(),Aa(),()=>{document.body.removeChild(R)}},[aa]);const ge={dashboard:"Dashboard",tasks:"Tarefas",pomodoro:"Pomodoro",flashcards:"Flashcards",stats:"Estatísticas",settings:"Configurações"},we=R=>new Date(R).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"});return d.jsxs("div",{className:"container-app",children:[d.jsxs("div",{className:`sidebar ${at?"open":""}`,children:[d.jsx("div",{className:"logo",children:d.jsxs("h1",{children:["Pomo",d.jsx("span",{children:"dash"})]})}),d.jsxs("div",{className:"menu",children:[d.jsxs("div",{className:`menu-item ${r==="dashboard"?"active":""}`,onClick:()=>{Nt("dashboard"),it(!1)},children:[d.jsx("i",{className:"fas fa-tachometer-alt"}),d.jsx("span",{children:"Dashboard"})]}),d.jsxs("div",{className:`menu-item ${r==="tasks"?"active":""}`,onClick:()=>{Nt("tasks"),it(!1)},children:[d.jsx("i",{className:"fas fa-tasks"}),d.jsx("span",{children:"Tarefas"})]}),d.jsxs("div",{className:`menu-item ${r==="pomodoro"?"active":""}`,onClick:()=>{Nt("pomodoro"),it(!1)},children:[d.jsx("i",{className:"fas fa-clock"}),d.jsx("span",{children:"Pomodoro"})]}),d.jsxs("div",{className:`menu-item ${r==="flashcards"?"active":""}`,onClick:()=>{Nt("flashcards"),it(!1)},children:[d.jsx("i",{className:"fas fa-layer-group"}),d.jsx("span",{children:"Flashcards"})]}),d.jsxs("div",{className:`menu-item ${r==="stats"?"active":""}`,onClick:()=>{Nt("stats"),it(!1)},children:[d.jsx("i",{className:"fas fa-chart-bar"}),d.jsx("span",{children:"Estatísticas"})]})]}),d.jsxs("div",{className:"profile",onClick:()=>{ss(),it(!1)},children:[d.jsxs("div",{className:"profile-img-container",children:[d.jsx("img",{src:K,alt:"User",className:"profile-img"}),d.jsx("button",{className:"profile-img-upload-btn",title:"Alterar foto",onClick:Va,style:{display:"none"},children:d.jsx("i",{className:"fas fa-camera"})})]}),d.jsx("div",{className:"profile-name",children:s?.name||"Usuário"})]})]}),at&&d.jsx("div",{className:"sidebar-overlay",onClick:()=>it(!1)}),d.jsxs("div",{className:"main-content",children:[d.jsx("div",{className:"header",children:d.jsxs("div",{className:"header-left",children:[d.jsx("button",{className:"menu-toggle",onClick:()=>it(!at),children:d.jsx("i",{className:"fas fa-bars"})}),d.jsx("h2",{className:"page-title",id:"page-title",children:ge[r]})]})}),d.jsxs("div",{className:`screen ${r==="dashboard"?"active":""}`,id:"dashboard",children:[d.jsxs("div",{className:"stats-container",children:[d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-clock fa-2x",style:{color:"#e55345"}}),d.jsx("div",{className:"stat-value",children:m.focusTime}),d.jsx("div",{className:"stat-label",children:"Tempo de foco"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-check-circle fa-2x",style:{color:"var(--secondary-color)"}}),d.jsxs("div",{className:"stat-value",children:[m.completedTasks,"/",m.totalTasks]}),d.jsx("div",{className:"stat-label",children:"Tarefas concluídas"})]}),d.jsxs("div",{className:"stat-card card",children:[d.jsx("i",{className:"fas fa-brain fa-2x",style:{color:"#FFC107"}}),d.jsxs("div",{className:"stat-value",children:[m.flashcardAccuracy,"%"]}),d.jsx("div",{className:"stat-label",children:"Aproveitamento de Flashcards"})]})]}),d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Suas próximas tarefas"}),m.upcomingTasks&&m.upcomingTasks.length>0?d.jsx("div",{className:"task-list",children:m.upcomingTasks.map(R=>{const ct=R.assigned_to?.find(et=>et.user.toString()===s._id.toString()),C=ct?ct.status:"pending";return d.jsxs("div",{className:`task-item ${C==="completed"?"completed":""}`,children:[d.jsxs("div",{className:"task-content",children:[d.jsx("div",{className:"task-title",children:R.title}),d.jsxs("div",{className:"task-details",children:["Disciplina: ",R.subject||"N/A"," • Prazo: ",R.due_date?new Date(R.due_date).toLocaleDateString("pt-BR"):"Sem prazo"," • Prioridade: ",R.priority]})]}),d.jsx("span",{className:`task-status ${C}`,children:C==="pending"?"Pendente":C==="in_progress"?"Em andamento":"Concluída"})]},R._id)})}):d.jsx("p",{children:"Você não tem tarefas pendentes no momento."})]}),d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Suas últimas sessões"}),lt&&lt.length>0?d.jsx("div",{className:"session-list",children:lt.map(R=>d.jsx("div",{className:"session-item",children:d.jsxs("div",{className:"session-info",children:[d.jsx("div",{className:"session-type",children:R.type==="work"?"Pomodoro":R.type==="short_break"?"Pausa Curta":"Pausa Longa"}),d.jsx("div",{className:"session-date",children:we(R.timing.started_at)}),d.jsxs("div",{className:"session-duration",children:[Math.round(R.timing.actual_duration/60)," min"]}),d.jsx("div",{className:`session-status ${R.status}`,children:R.status==="completed"?"Concluído":R.status==="abandoned"?"Abandonado":R.status==="paused"?"Pausado":R.status})]})},R._id))}):d.jsx("p",{children:"Você não tem sessões registradas ainda."})]})]}),d.jsx("div",{className:`screen ${r==="tasks"?"active":""}`,id:"tasks",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Gerenciar Tarefas"}),d.jsxs("div",{className:"create-task-section",children:[d.jsx("button",{className:"btn btn-primary",onClick:()=>_(!v),children:v?"Cancelar":"+ Criar Nova Tarefa"}),v&&d.jsxs("form",{onSubmit:Xe,className:"add-task-form",style:{marginTop:"20px"},children:[d.jsx("div",{className:"input-group",children:d.jsx("input",{type:"text",value:x.title,onChange:R=>It("title",R.target.value),placeholder:"Título da tarefa",className:"add-task-input",required:!0})}),d.jsxs("div",{className:"input-row",children:[d.jsx("input",{type:"text",value:x.subject,onChange:R=>It("subject",R.target.value),placeholder:"Disciplina",className:"add-task-input"}),d.jsx("input",{type:"date",value:x.due_date,onChange:R=>It("due_date",R.target.value),className:"add-task-input"})]}),d.jsxs("div",{className:"input-row",children:[d.jsxs("select",{value:x.priority,onChange:R=>It("priority",R.target.value),className:"add-task-input",children:[d.jsx("option",{value:"low",children:"Baixa"}),d.jsx("option",{value:"medium",children:"Média"}),d.jsx("option",{value:"high",children:"Alta"}),d.jsx("option",{value:"urgent",children:"Urgente"})]}),d.jsxs("div",{style:{display:"flex",gap:"10px",marginTop:"10px"},children:[d.jsx("button",{type:"submit",className:"btn btn-primary",children:"Adicionar Tarefa"}),d.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>_(!1),children:"Cancelar"})]})]})]})]}),d.jsx("div",{className:"task-list",children:u&&u.length>0?u.map(R=>{const ct=R.assigned_to?.find(et=>et.user.toString()===s._id.toString()),C=ct?ct.status:"pending";return d.jsxs("div",{className:`task-item ${C==="completed"?"completed":""}`,children:[d.jsx("input",{type:"checkbox",className:"task-checkbox",checked:C==="completed",onChange:()=>Re(R._id,C)}),d.jsxs("div",{className:"task-content",children:[d.jsx("div",{className:"task-title",children:R.title}),d.jsxs("div",{className:"task-details",children:["Disciplina: ",R.subject||"N/A"," • Prazo: ",R.due_date?new Date(R.due_date).toLocaleDateString("pt-BR"):"Sem prazo"," • Prioridade: ",R.priority]})]}),d.jsx("button",{onClick:()=>Ge(R._id),className:"btn-delete-task",children:d.jsx("i",{className:"fas fa-trash-alt"})})]},R._id)}):d.jsx("p",{children:"Você não tem tarefas no momento."})})]})}),d.jsx("div",{className:`screen ${r==="pomodoro"?"active":""}`,id:"pomodoro",children:d.jsxs("div",{class:"card",children:[d.jsxs("div",{className:"session-types",children:[d.jsx("button",{onClick:()=>Pt("Pomodoro"),className:`btn-session ${xt==="Pomodoro"||xt==="work"?"active":""}`,children:"Pomodoro"}),d.jsx("button",{onClick:()=>Pt("Short Break"),className:`btn-session ${xt==="Short Break"||xt==="short_break"?"active":""}`,children:"Pausa Curta"}),d.jsx("button",{onClick:()=>Pt("Long Break"),className:`btn-session ${xt==="Long Break"||xt==="long_break"?"active":""}`,children:"Pausa Longa"})]}),d.jsxs("div",{className:"timer",children:[d.jsx("div",{className:"timer-time",children:sa(ft)}),d.jsx("div",{className:"timer-label",children:xt==="work"?"Pomodoro":xt==="short_break"?"Pausa Curta":"Pausa Longa"})]}),d.jsxs("div",{className:"timer-controls",children:[d.jsx("button",{onClick:ot,className:"btn btn-primary",children:B?rt?"Pausar":"Retomar":"Iniciar"}),d.jsx("button",{onClick:Ut,className:"btn btn-secondary",children:"Resetar"})]}),d.jsxs("div",{className:"recent-sessions",children:[d.jsx("h4",{children:"Sessões Recentes"}),lt.length>0?d.jsx("div",{className:"session-list",children:lt.map(R=>d.jsx("div",{className:"session-item",children:d.jsxs("div",{className:"session-info",children:[d.jsx("div",{className:"session-type",children:R.type==="work"?"Pomodoro":R.type==="short_break"?"Pausa Curta":"Pausa Longa"}),d.jsx("div",{className:"session-date",children:we(R.timing.started_at)}),d.jsxs("div",{className:"session-duration",children:[Math.round(R.timing.actual_duration/60)," min"]}),d.jsx("div",{className:`session-status ${R.status}`,children:R.status==="completed"?"Concluído":R.status==="abandoned"?"Abandonado":R.status==="paused"?"Pausado":R.status})]})},R._id))}):d.jsx("p",{children:"Nenhuma sessão registrada ainda."})]})]})}),d.jsx("div",{className:`screen ${r==="flashcards"?"active":""}`,id:"flashcards",children:d.jsxs("div",{className:"card",children:[d.jsx("h3",{className:"card-title",children:"Seus Flashcards"}),d.jsxs("div",{className:"create-flashcard-section",children:[d.jsx("button",{className:"btn btn-primary",onClick:()=>_t(!I),children:I?"Cancelar":"+ Criar Novo Flashcard"}),I&&d.jsxs("form",{onSubmit:Ca,className:"add-flashcard-form",style:{marginTop:"20px"},children:[d.jsx("div",{className:"input-group",children:d.jsx("input",{type:"text",value:G.question,onChange:R=>J({...G,question:R.target.value}),placeholder:"Pergunta",className:"add-flashcard-input",required:!0})}),d.jsx("div",{className:"input-group",children:d.jsx("input",{type:"text",value:G.answer,onChange:R=>J({...G,answer:R.target.value}),placeholder:"Resposta",className:"add-flashcard-input",required:!0})}),d.jsx("div",{className:"input-group",children:d.jsx("input",{type:"text",value:G.tags.join(", "),onChange:R=>J({...G,tags:R.target.value.split(",").map(ct=>ct.trim()).filter(ct=>ct)}),placeholder:"Tags (separadas por vírgula)",className:"add-flashcard-input"})}),d.jsxs("div",{style:{display:"flex",gap:"10px",marginTop:"10px"},children:[d.jsx("button",{type:"submit",className:"btn btn-primary",children:"Adicionar Flashcard"}),d.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>{_t(!1),J({question:"",answer:"",tags:[]})},children:"Cancelar"})]})]})]}),A&&A.length>0?d.jsx("div",{className:"flashcard-grid",children:A.map(R=>d.jsxs("div",{className:`flashcard ${ht===R._id?"flipped":""}`,onClick:()=>ks(R._id),children:[d.jsxs("div",{className:"flashcard-inner",children:[d.jsx("div",{className:"flashcard-front",children:R.question}),d.jsx("div",{className:"flashcard-back",children:R.answer})]}),d.jsxs("div",{className:"flashcard-stats",children:[d.jsxs("span",{className:"accuracy-badge",title:`Aproveitamento: ${R.stats?.accuracy||0}%`,children:[R.stats?.accuracy||0,"%"]}),d.jsx("span",{className:"attempts-badge",title:`Tentativas: ${R.stats?.attempts||0}`,children:R.stats?.attempts||0})]}),d.jsx("button",{onClick:ct=>{ct.stopPropagation(),Pa(R._id)},className:"btn-delete-flashcard",children:d.jsx("i",{className:"fas fa-trash-alt"})})]},R._id))}):d.jsx("p",{children:"Você não tem flashcards criados ainda."})]})}),d.jsx("div",{className:`screen ${r==="stats"?"active":""}`,id:"stats",children:d.jsxs("div",{class:"card",children:[d.jsx("h3",{class:"card-title",children:"Suas Estatísticas"}),d.jsxs("div",{className:"stats-grid",children:[d.jsxs("div",{className:"stat-item",children:[d.jsx("h4",{children:"Tempo de Foco"}),d.jsx("p",{className:"stat-value",children:m.focusTime})]}),d.jsxs("div",{className:"stat-item",children:[d.jsx("h4",{children:"Tarefas Concluídas"}),d.jsxs("p",{className:"stat-value",children:[m.completedTasks,"/",m.totalTasks]})]}),d.jsxs("div",{className:"stat-item",children:[d.jsx("h4",{children:"Flashcards Criados"}),d.jsx("p",{className:"stat-value",children:A.length})]}),d.jsxs("div",{className:"stat-item",children:[d.jsx("h4",{children:"Sessões de Pomodoro"}),d.jsx("p",{className:"stat-value",children:lt.length})]})]}),d.jsxs("div",{className:"recent-activity",children:[d.jsx("h4",{children:"Sessões Recentes"}),lt&&lt.length>0?d.jsx("div",{className:"session-list",children:lt.map(R=>d.jsx("div",{className:"session-item",children:d.jsxs("div",{className:"session-info",children:[d.jsx("div",{className:"session-type",children:R.type==="work"?"Pomodoro":R.type==="short_break"?"Pausa Curta":"Pausa Longa"}),d.jsx("div",{className:"session-date",children:we(R.timing.started_at)}),d.jsxs("div",{className:"session-duration",children:[Math.round(R.timing.actual_duration/60)," min"]}),d.jsx("div",{className:`session-status ${R.status}`,children:R.status==="completed"?"Concluído":R.status==="abandoned"?"Abandonado":R.status==="paused"?"Pausado":R.status})]})},R._id))}):d.jsx("p",{children:"Nenhuma sessão registrada ainda."})]}),d.jsxs("div",{className:"recent-activity",children:[d.jsx("h4",{children:"Tarefas Recentes"}),m.upcomingTasks&&m.upcomingTasks.length>0?d.jsx("div",{className:"task-list",children:m.upcomingTasks.map(R=>{const ct=R.assigned_to?.find(et=>et.user.toString()===s._id.toString()),C=ct?ct.status:"pending";return d.jsxs("div",{className:`task-item ${C==="completed"?"completed":""}`,children:[d.jsxs("div",{className:"task-content",children:[d.jsx("div",{className:"task-title",children:R.title}),d.jsxs("div",{className:"task-details",children:["Disciplina: ",R.subject||"N/A"," • Prazo: ",R.due_date?new Date(R.due_date).toLocaleDateString("pt-BR"):"Sem prazo"," • Prioridade: ",R.priority]})]}),d.jsx("span",{className:`task-status ${C}`,children:C==="pending"?"Pendente":C==="in_progress"?"Em andamento":"Concluída"})]},R._id)})}):d.jsx("p",{children:"Você não tem tarefas recentes."})]})]})})]}),w&&d.jsx("div",{className:"profile-modal",onClick:na,children:d.jsxs("div",{className:"profile-modal-content",onClick:R=>R.stopPropagation(),children:[d.jsx("button",{className:"close-modal",onClick:na,children:"×"}),d.jsxs("div",{className:"profile-modal-header",children:[d.jsxs("div",{className:"profile-modal-img-container",children:[d.jsx("img",{src:K,alt:"User",className:"profile-modal-img"}),d.jsx("button",{className:"profile-img-upload-btn",title:"Alterar foto",onClick:Va,style:{display:T?"block":"none"},children:d.jsx("i",{className:"fas fa-camera"})}),d.jsx("input",{id:"profile-image-upload",type:"file",accept:"image/*",onChange:He,style:{display:"none"}})]}),d.jsxs("div",{className:"profile-modal-info",children:[d.jsx("div",{className:"profile-name-container",children:T?d.jsx("input",{type:"text",name:"name",value:O.name,onChange:Ya,className:"profile-name-input"}):d.jsx("h3",{children:s?.name||"Usuário"})}),d.jsx("p",{children:s?.roleDescription||"Tipo de Usuário"}),d.jsx("p",{children:s?.email||"email@exemplo.com"})]})]}),d.jsxs("div",{className:"profile-modal-details",children:[d.jsxs("div",{children:[d.jsx("label",{children:"Nome Completo"}),T?d.jsx("input",{type:"text",name:"name",value:O.name,onChange:Ya,className:"profile-input"}):d.jsx("span",{children:s?.name||"Usuário"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Email"}),d.jsx("span",{children:s?.email||"email@exemplo.com"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Tipo de Usuário"}),d.jsx("span",{children:s?.roleDescription||"Tipo de Usuário"})]}),d.jsxs("div",{children:[d.jsx("label",{children:"Instituição"}),d.jsx("span",{children:s?.school?.name||"Não informada"})]})]}),d.jsxs("div",{className:"profile-modal-actions",children:[d.jsxs("button",{onClick:n,className:"theme-toggle-btn","aria-label":e?"Alternar para modo claro":"Alternar para modo escuro",children:[d.jsx("div",{className:"theme-toggle-switch",children:d.jsx("div",{className:`theme-toggle-slider ${e?"dark":"light"}`,children:d.jsx("i",{className:`theme-toggle-icon ${e?"fas fa-sun":"fas fa-moon"}`})})}),d.jsx("span",{className:"theme-toggle-label",children:e?"Modo Claro":"Modo Escuro"})]}),T?d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn btn-secondary",onClick:As,children:"Cancelar"}),d.jsx("button",{className:"btn btn-primary",onClick:qa,children:"Salvar"})]}):d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn btn-secondary",onClick:rn,children:"Editar Perfil"}),d.jsx("button",{className:"btn btn-primary",onClick:l,children:"Sair"})]})]})]})}),bt&&d.jsx(zo,{message:bt.message,type:bt.type,onClose:()=>jt(null)}),Ue&&d.jsx(Pd,{message:Ba,onConfirm:he,onCancel:ka,type:"warning"})]})}const pb=document.createElement("style");pb.innerHTML=`
  .container-app {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    background-color: var(--sidebar-background);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    z-index: 1000;
    position: sticky;
    top: 0;
    height: 100vh;
  }
  
  .container-app {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    background-color: var(--sidebar-background);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    z-index: 1000;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px;
    background-color: var(--background);
    width: calc(100% - 260px);
  }

  .add-task-form {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .input-row .add-task-input,
  .input-row select {
    flex: 1;
  }

  .task-status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    font-weight: bold;
  }

  .task-status.pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .task-status.in_progress {
    background-color: #cce5ff;
    color: #004085;
  }

  .task-status.completed {
    background-color: #d4edda;
    color: #155724;
  }

  .session-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
  }

  .session-info {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .session-type {
    font-weight: bold;
    color: var(--primary-color);
  }

  .session-status.completed {
    color: var(--success-color);
  }

  .session-status.abandoned {
    color: var(--danger-color);
  }

  .session-status.paused {
    color: var(--warning-color);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .stat-item {
    text-align: center;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .stat-item h4 {
    margin: 0 0 10px 0;
    color: var(--text-color);
  }

  .stat-item .stat-value {
    font-size: 1.5em;
    font-weight: bold;
    color: var(--primary-color);
    margin: 0;
  }

  .recent-activity {
    margin-top: 20px;
  }

  .recent-activity h4 {
    margin-bottom: 10px;
    color: var(--text-color);
  }

  .flashcard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }

  .flashcard {
    height: 200px;
    perspective: 1000px;
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
  }

  .flashcard-front, .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--card-background);
    color: var(--text-color);
  }

  .flashcard-back {
    transform: rotateY(180deg);
  }

  .btn-delete-flashcard {
    position: absolute;
    top: 5px;
    right: 5px;
    background: var(--danger-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    z-index: 10;
  }

  .flashcard-stats {
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: flex;
    gap: 5px;
    z-index: 5;
  }

  .accuracy-badge, .attempts-badge {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 0.7em;
  }

  .accuracy-badge {
    background: linear-gradient(45deg, #10b981, #34d399);
  }

  .attempts-badge {
    background: linear-gradient(45deg, #d9534f, #c9302c);
  }

  /* Modern Theme Toggle Button */
  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-radius: 12px;
    border: 2px solid var(--border-color);
    background: var(--card-background);
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    min-width: 180px;
    justify-content: center;
  }

  .theme-toggle-btn:hover {
    background: linear-gradient(135deg, var(--primary-color) 0%, #c9302c 100%);
    color: white;
    border-color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(217, 83, 79, 0.3);
  }

  .theme-toggle-switch {
    position: relative;
    width: 40px;
    height: 20px;
    background: var(--border-color);
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  .theme-toggle-slider {
    position: absolute;
    top: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .theme-toggle-slider.light {
    left: 2px;
    background: linear-gradient(135deg, #FFC107, #FF9800);
  }

  .theme-toggle-slider.dark {
    left: 22px;
    background: linear-gradient(135deg, #d9534f, #c9302c);
  }

  .theme-toggle-icon {
    font-size: 8px;
    color: white;
  }

  .theme-toggle-label {
    font-size: 0.95rem;
  }

  .theme-toggle-btn:hover .theme-toggle-slider.light {
    transform: scale(1.1);
  }

  .theme-toggle-btn:hover .theme-toggle-slider.dark {
    transform: scale(1.1) rotate(15deg);
  }

  @media (max-width: 768px) {
    .container-app {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100%;
      height: auto;
      max-height: 300px;
      transform: translateX(-100%);
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
    
    .main-content {
      width: 100%;
    }
  }
`;document.head.appendChild(pb);const co=({children:s,user:e})=>e?s:d.jsx(Ts,{to:"/login",replace:!0}),b2=({user:s,darkMode:e,toggleDarkMode:n,onLogout:l})=>{if(!s)return d.jsx(Ts,{to:"/login",replace:!0});const{role:r}=s;switch(r){case"global_admin":case"school_admin":return d.jsx(ub,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l});case"teacher":return d.jsx(fb,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l});case"student":return d.jsx(gb,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l});default:return d.jsx(x2,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l})}},y2=({user:s,darkMode:e,toggleDarkMode:n,onLogout:l})=>s?d.jsx(ub,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l}):d.jsx(Ts,{to:"/login",replace:!0}),v2=({user:s,darkMode:e,toggleDarkMode:n,onLogout:l})=>s?d.jsx(fb,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l}):d.jsx(Ts,{to:"/login",replace:!0}),S2=({user:s,darkMode:e,toggleDarkMode:n,onLogout:l})=>s?d.jsx(gb,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l}):d.jsx(Ts,{to:"/login",replace:!0}),_2=({user:s,onLogin:e,darkMode:n,toggleDarkMode:l})=>{const r=To();if(s){const{role:u}=s;let h="/dashboard";switch(u){case"global_admin":case"school_admin":h="/dashboard/institution";break;case"teacher":h="/dashboard/professor";break;case"student":h="/dashboard/student";break;default:h="/dashboard"}return d.jsx(Ts,{to:h,replace:!0})}const c=(u,h)=>{e(u,h);const{role:m}=u;let p="/dashboard";switch(m){case"global_admin":case"school_admin":p="/dashboard/institution";break;case"teacher":p="/dashboard/professor";break;case"student":p="/dashboard/student";break;default:p="/dashboard"}r(p,{replace:!0})};return d.jsx(l1,{onLogin:c,onRegister:()=>r("/register",{replace:!0}),darkMode:n,toggleDarkMode:l})},j2=({user:s,darkMode:e,toggleDarkMode:n})=>{const l=To();if(s){const{role:r}=s;let c="/dashboard";switch(r){case"global_admin":case"school_admin":c="/dashboard/institution";break;case"teacher":c="/dashboard/professor";break;case"student":c="/dashboard/student";break;default:c="/dashboard"}return d.jsx(Ts,{to:c,replace:!0})}return d.jsx(o1,{onRegister:()=>l("/login",{replace:!0}),onLogin:()=>l("/login",{replace:!0}),darkMode:e,toggleDarkMode:n})},w2=({user:s,darkMode:e,toggleDarkMode:n,onLogout:l,onLogin:r})=>d.jsxs(wv,{children:[d.jsx(Ss,{path:"/login",element:d.jsx(_2,{user:s,onLogin:r,darkMode:e,toggleDarkMode:n})}),d.jsx(Ss,{path:"/register",element:d.jsx(j2,{user:s,darkMode:e,toggleDarkMode:n})}),d.jsx(Ss,{path:"/dashboard",element:d.jsx(co,{user:s,children:d.jsx(b2,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l})})}),d.jsx(Ss,{path:"/dashboard/institution",element:d.jsx(co,{user:s,children:d.jsx(y2,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l})})}),d.jsx(Ss,{path:"/dashboard/professor",element:d.jsx(co,{user:s,children:d.jsx(v2,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l})})}),d.jsx(Ss,{path:"/dashboard/student",element:d.jsx(co,{user:s,children:d.jsx(S2,{user:s,darkMode:e,toggleDarkMode:n,onLogout:l})})}),d.jsx(Ss,{path:"/",element:d.jsx(Ts,{to:"/login",replace:!0})}),d.jsx(Ss,{path:"*",element:d.jsx(Ts,{to:s?"/dashboard":"/login",replace:!0})})]}),N2=()=>{const s=document.createElement("style");s.innerHTML=`
    :root {
      --primary-color: #d9534f; /* Red mais suave */
      --primary-light: #e78c88;
      --primary-dark: #c9302c;
      --secondary-color: #6c757d;
      --success-color: #28a745;
      --warning-color: #ffc107;
      --danger-color: #d9534f; /* Red mais suave */
      --background-color: #f8f9fa;
      --card-background: white;
      --text-color: #212529;
      --text-light-color: #6c757d;
      --text-white: white;
      --border-color: #dee2e6;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .dark-theme {
      --background-color: #121212;
      --card-background: #1e1e1e;
      --text-color: #e0e0e0;
      --text-light-color: #b0b0b0;
      --border-color: #444444;
    }
  `,document.head.appendChild(s)};N2();i1();function E2(){const[s,e]=j.useState(null),[n,l]=j.useState(!1);j.useEffect(()=>{const h=localStorage.getItem("darkMode")==="true";l(h),h&&(document.documentElement.classList.add("dark-theme"),document.body.classList.add("dark-theme"));const m=localStorage.getItem("user"),p=localStorage.getItem("token");if(m&&p)try{const x=JSON.parse(m);e(x)}catch(x){console.error("Erro ao parsear usuário do localStorage:",x),localStorage.removeItem("token"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user")}},[]);const r=()=>{const h=!n;l(h),localStorage.setItem("darkMode",h),h?(document.documentElement.classList.add("dark-theme"),document.body.classList.add("dark-theme")):(document.documentElement.classList.remove("dark-theme"),document.body.classList.remove("dark-theme"))},c=(h,m)=>{e({...h,access:m})},u=async()=>{try{await fa.logout()}catch(h){console.error("Erro ao fazer logout:",h)}finally{localStorage.removeItem("token"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),e(null)}};return d.jsx("div",{className:`App ${n?"dark-theme":""}`,children:d.jsx($v,{children:d.jsx(w2,{user:s,darkMode:n,toggleDarkMode:r,onLogout:u,onLogin:c})})})}Oy.createRoot(document.getElementById("root")).render(d.jsx(j.StrictMode,{children:d.jsx(E2,{})}));
