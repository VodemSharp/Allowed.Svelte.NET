var ct=Object.defineProperty;var at=(t,e,n)=>e in t?ct(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var V=(t,e,n)=>(at(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();function A(){}function ye(t,e){for(const n in e)t[n]=e[n];return t}function Ze(t){return t()}function We(){return Object.create(null)}function ne(t){t.forEach(Ze)}function Re(t){return typeof t=="function"}function x(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let he;function Te(t,e){return he||(he=document.createElement("a")),he.href=e,t===he.href}function dt(t){return Object.keys(t).length===0}function et(t,...e){if(t==null)return A;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function je(t,e,n){t.$$.on_destroy.push(et(e,n))}function ue(t,e,n,i){if(t){const r=tt(t,e,n,i);return t[0](r)}}function tt(t,e,n,i){return t[1]&&i?ye(n.ctx.slice(),t[1](i(e))):n.ctx}function fe(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(e.dirty.length,r.length);for(let l=0;l<s;l+=1)o[l]=e.dirty[l]|r[l];return o}return e.dirty|r}return e.dirty}function ce(t,e,n,i,r,o){if(r){const s=tt(e,n,i,o);t.p(s,r)}}function ae(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let ve=!1;function _t(){ve=!0}function mt(){ve=!1}function ht(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function pt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const u=[];for(let f=0;f<e.length;f++){const c=e[f];c.claim_order!==void 0&&u.push(c)}e=u}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let u=0;u<e.length;u++){const f=e[u].claim_order,c=(r>0&&e[n[r]].claim_order<=f?r+1:ht(1,r,O=>e[n[O]].claim_order,f))-1;i[u]=n[c]+1;const $=c+1;n[$]=u,r=Math.max($,r)}const o=[],s=[];let l=e.length-1;for(let u=n[r]+1;u!=0;u=i[u-1]){for(o.push(e[u-1]);l>=u;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);o.reverse(),s.sort((u,f)=>u.claim_order-f.claim_order);for(let u=0,f=0;u<s.length;u++){for(;f<o.length&&s[u].claim_order>=o[f].claim_order;)f++;const c=f<o.length?o[f]:null;t.insertBefore(s[u],c)}}function _(t,e){if(ve){for(pt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function g(t,e,n){ve&&!n?_(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function a(t){t.parentNode&&t.parentNode.removeChild(t)}function y(t){return document.createElement(t)}function R(t){return document.createTextNode(t)}function T(){return R(" ")}function D(){return R("")}function nt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function b(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function E(t){return Array.from(t.childNodes)}function $t(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function rt(t,e,n,i,r=!1){$t(t);const o=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const u=n(l);return u===void 0?t.splice(s,1):t[s]=u,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const u=n(l);return u===void 0?t.splice(s,1):t[s]=u,r?u===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function gt(t,e,n,i){return rt(t,r=>r.nodeName===e,r=>{const o=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||o.push(l.name)}o.forEach(s=>r.removeAttribute(s))},()=>i(e))}function v(t,e,n){return gt(t,e,n,y)}function B(t,e){return rt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>R(e),!0)}function L(t){return B(t," ")}function it(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function bt(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(r)):o===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function M(t,e){return new t(e)}let oe;function ie(t){oe=t}function yt(){if(!oe)throw new Error("Function called outside component initialization");return oe}function st(t){yt().$$.on_mount.push(t)}const te=[],Qe=[],$e=[],ze=[],vt=Promise.resolve();let Ie=!1;function wt(){Ie||(Ie=!0,vt.then(ot))}function Oe(t){$e.push(t)}const Le=new Set;let Z=0;function ot(){if(Z!==0)return;const t=oe;do{try{for(;Z<te.length;){const e=te[Z];Z++,ie(e),Et(e.$$)}}catch(e){throw te.length=0,Z=0,e}for(ie(null),te.length=0,Z=0;Qe.length;)Qe.pop()();for(let e=0;e<$e.length;e+=1){const n=$e[e];Le.has(n)||(Le.add(n),n())}$e.length=0}while(te.length);for(;ze.length;)ze.pop()();Ie=!1,Le.clear(),ie(t)}function Et(t){if(t.fragment!==null){t.update(),ne(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Oe)}}const ge=new Set;let K;function Q(){K={r:0,c:[],p:K}}function z(){K.r||ne(K.c),K=K.p}function m(t,e){t&&t.i&&(ge.delete(t),t.i(e))}function p(t,e,n,i){if(t&&t.o){if(ge.has(t))return;ge.add(t),K.c.push(()=>{ge.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Me(t,e){const n={},i={},r={$$scope:1};let o=t.length;for(;o--;){const s=t[o],l=e[o];if(l){for(const u in s)u in l||(i[u]=1);for(const u in l)r[u]||(n[u]=l[u],r[u]=1);t[o]=l}else for(const u in s)r[u]=1}for(const s in i)s in n||(n[s]=void 0);return n}function xe(t){return typeof t=="object"&&t!==null?t:{}}function P(t){t&&t.c()}function I(t,e){t&&t.l(e)}function N(t,e,n,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),i||Oe(()=>{const s=t.$$.on_mount.map(Ze).filter(Re);t.$$.on_destroy?t.$$.on_destroy.push(...s):ne(s),t.$$.on_mount=[]}),o.forEach(Oe)}function k(t,e){const n=t.$$;n.fragment!==null&&(ne(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function St(t,e){t.$$.dirty[0]===-1&&(te.push(t),wt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function q(t,e,n,i,r,o,s,l=[-1]){const u=oe;ie(t);const f=t.$$={fragment:null,ctx:[],props:o,update:A,not_equal:r,bound:We(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:We(),dirty:l,skip_bound:!1,root:e.target||u.$$.root};s&&s(f.root);let c=!1;if(f.ctx=n?n(t,e.props||{},($,O,...h)=>{const d=h.length?h[0]:O;return f.ctx&&r(f.ctx[$],f.ctx[$]=d)&&(!f.skip_bound&&f.bound[$]&&f.bound[$](d),c&&St(t,$)),O}):[],f.update(),c=!0,ne(f.before_update),f.fragment=i?i(f.ctx):!1,e.target){if(e.hydrate){_t();const $=E(e.target);f.fragment&&f.fragment.l($),$.forEach(a)}else f.fragment&&f.fragment.c();e.intro&&m(t.$$.fragment),N(t,e.target,e.anchor,e.customElement),mt(),ot()}ie(u)}class G{$destroy(){k(this,1),this.$destroy=A}$on(e,n){if(!Re(n))return A;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!dt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Nt(t){let e;return document.title=e=t[0],{c:A,l(n){bt("svelte-1g2xq30",document.head).forEach(a)},m:A,p(n,[i]){i&1&&e!==(e=n[0])&&(document.title=e)},i:A,o:A,d:A}}function kt(t,e,n){let{value:i=""}=e;return t.$$set=r=>{"value"in r&&n(0,i=r.value)},[i]}class de extends G{constructor(e){super(),q(this,e,kt,Nt,x,{value:0})}}function Pt(t){let e;const n=t[1].default,i=ue(n,t,t[2],null);return{c(){i&&i.c()},l(r){i&&i.l(r)},m(r,o){i&&i.m(r,o),e=!0},p(r,o){i&&i.p&&(!e||o&4)&&ce(i,n,r,r[2],e?fe(n,r[2],o,null):ae(r[2]),null)},i(r){e||(m(i,r),e=!0)},o(r){p(i,r),e=!1},d(r){i&&i.d(r)}}}function At(t){let e,n,i;var r=t[0];function o(s){return{props:{$$slots:{default:[Pt]},$$scope:{ctx:s}}}}return r&&(e=M(r,o(t))),{c(){e&&P(e.$$.fragment),n=D()},l(s){e&&I(e.$$.fragment,s),n=D()},m(s,l){e&&N(e,s,l),g(s,n,l),i=!0},p(s,[l]){const u={};if(l&4&&(u.$$scope={dirty:l,ctx:s}),r!==(r=s[0])){if(e){Q();const f=e;p(f.$$.fragment,1,0,()=>{k(f,1)}),z()}r?(e=M(r,o(s)),P(e.$$.fragment),m(e.$$.fragment,1),N(e,n.parentNode,n)):e=null}else r&&e.$set(u)},i(s){i||(e&&m(e.$$.fragment,s),i=!0)},o(s){e&&p(e.$$.fragment,s),i=!1},d(s){s&&a(n),e&&k(e,s)}}}function Tt(t,e,n){let{$$slots:i={},$$scope:r}=e,{layout:o}=e;return t.$$set=s=>{"layout"in s&&n(0,o=s.layout),"$$scope"in s&&n(2,r=s.$$scope)},[o,i,r]}class Lt extends G{constructor(e){super(),q(this,e,Tt,At,x,{layout:0})}}const ee=[];function Dt(t,e){return{subscribe:le(t,e).subscribe}}function le(t,e=A){let n;const i=new Set;function r(l){if(x(t,l)&&(t=l,n)){const u=!ee.length;for(const f of i)f[1](),ee.push(f,t);if(u){for(let f=0;f<ee.length;f+=2)ee[f][0](ee[f+1]);ee.length=0}}}function o(l){r(l(t))}function s(l,u=A){const f=[l,u];return i.add(f),i.size===1&&(n=e(r)||A),l(t),()=>{i.delete(f),i.size===0&&(n(),n=null)}}return{set:r,update:o,subscribe:s}}function jt(t,e,n){const i=!Array.isArray(t),r=i?[t]:t,o=e.length<2;return Dt(n,s=>{let l=!1;const u=[];let f=0,c=A;const $=()=>{if(f)return;c();const h=e(i?u[0]:u,s);o?s(h):c=Re(h)?h:A},O=r.map((h,d)=>et(h,w=>{u[d]=w,f&=~(1<<d),l&&$()},()=>{f|=1<<d}));return l=!0,$(),function(){ne(O),c()}})}class C{constructor(e,n,i,r=!1){V(this,"name");V(this,"min");V(this,"max");V(this,"real");this.name=e,this.min=n,this.max=i,this.real=r}}const De=[new C("sbyte",-128,127),new C("byte",0,255),new C("short",-32768,32767),new C("ushort",0,65535),new C("int",-2147483648,2147483647),new C("uint",0,4294967295),new C("long",-9223372036854776e3,9223372036854776e3),new C("ulong",0,18446744073709552e3),new C("float",-34028234663852886e22,34028234663852886e22,!0),new C("double",-17976931348623157e292,17976931348623157e292,!0),new C("decimal",-7922816251426434e13,7922816251426434e13,!0)];class It{isParameter(e){return e[0]=="{"&&e[e.length-1]=="}"}removeQuestionMark(e){return e.split("?").join("")}countNecessaryParts(e){let n=e.length;for(let i=e.length-1;i>=0&&!(!e[i].endsWith("?}")&&!e[i].startsWith("{*"));i--)n--;return n}getSuitableByLength(e,n){return e.filter(i=>this.countNecessaryParts(i)<=n.length&&(i.length>=n.length||i.some(r=>r.indexOf("{*")>-1)))}getParameterParts(e){const i=e.substring(1,e.length-1).split(":"),r=i.length==2?this.removeQuestionMark(i[1]):void 0;return{parameterParts:i,type:r}}isValidType(e,n){const{parameterParts:i,type:r}=this.getParameterParts(e);if(i[0][0]!="*"&&De.some(o=>o.name==r)){const o=De.filter(l=>l.name==r)[0],s=Number(n);return n.indexOf("e")==-1&&!isNaN(s)&&(o.real||n.indexOf(".")==-1&&!o.real)&&s>=o.min&&s<=o.max}return!0}getSuitableByContent(e,n){for(let i=0;i<n.length;i++)for(let r=0;r<e.length;r++)i<e[r].length&&(!this.isParameter(e[r][i])&&n[i]!=e[r][i]||this.isParameter(e[r][i])&&n[i]!=""&&!this.isValidType(e[r][i],n[i]))&&(e=e.filter(o=>e.indexOf(o)!=r),r--);return e}countFirstNotParameter(e){let n=0;for(let i=0;i<e.length&&!this.isParameter(e[i]);i++)n++;return n}getBestComparison(e){let n=e[0],i=this.countFirstNotParameter(e[0]);for(let r=1;r<e.length;r++){let o=this.countFirstNotParameter(e[r]);o>i&&(n=e[r],i=o)}return n}getActivePage(e,n){const i=n.split("/");let r=this.getSuitableByLength(e,i);if(r=this.getSuitableByContent(r,i),r.length!=0)return this.getBestComparison(r).join("/")}getParameters(e,n){const i=e.split("/"),r=n.split("/"),o={};for(let s=0;s<i.length;s++){const l=i[s];if(this.isParameter(l)){const{parameterParts:u,type:f}=this.getParameterParts(l);if(u[0][0]=="*"){const c=this.removeQuestionMark(u[0].substring(1));o[c]=s<r.length?r.slice(s).join("/"):void 0}else{const c=this.removeQuestionMark(u[0]);De.some($=>$.name==f)?o[c]=s<r.length?Number(r[s]):0:o[c]=s<r.length?r[s]:void 0}}}return o}}const lt=new It;class Ve{constructor(e=void 0,n=void 0){V(this,"path");V(this,"route");this.path=e,this.route=n}}function Ot(t,e){const n=new Ve,{subscribe:i,set:r}=le(n);let o=[],s=Object.keys(t);for(let l=0;l<s.length;l++)o[l]=s[l].split("/");return e.subscribe(l=>{const u=lt.getActivePage(o,l.pathname);r(new Ve(u,u==null?void 0:t[u]))}),{subscribe:i}}const Vt=t=>({}),Ke=t=>({}),Rt=t=>({}),Je=t=>({});function Mt(t){let e;const n=t[2]["not-found"],i=ue(n,t,t[1],Ke);return{c(){i&&i.c()},l(r){i&&i.l(r)},m(r,o){i&&i.m(r,o),e=!0},p(r,o){i&&i.p&&(!e||o&2)&&ce(i,n,r,r[1],e?fe(n,r[1],o,Vt):ae(r[1]),Ke)},i(r){e||(m(i,r),e=!0)},o(r){p(i,r),e=!1},d(r){i&&i.d(r)}}}function xt(t){let e;const n=t[2].found,i=ue(n,t,t[1],Je);return{c(){i&&i.c()},l(r){i&&i.l(r)},m(r,o){i&&i.m(r,o),e=!0},p(r,o){i&&i.p&&(!e||o&2)&&ce(i,n,r,r[1],e?fe(n,r[1],o,Rt):ae(r[1]),Je)},i(r){e||(m(i,r),e=!0)},o(r){p(i,r),e=!1},d(r){i&&i.d(r)}}}function Ct(t){let e,n,i,r;const o=[xt,Mt],s=[];function l(u,f){return u[0].path?0:1}return e=l(t),n=s[e]=o[e](t),{c(){n.c(),i=D()},l(u){n.l(u),i=D()},m(u,f){s[e].m(u,f),g(u,i,f),r=!0},p(u,[f]){let c=e;e=l(u),e===c?s[e].p(u,f):(Q(),p(s[c],1,1,()=>{s[c]=null}),z(),n=s[e],n?n.p(u,f):(n=s[e]=o[e](u),n.c()),m(n,1),n.m(i.parentNode,i))},i(u){r||(m(n),r=!0)},o(u){p(n),r=!1},d(u){s[e].d(u),u&&a(i)}}}function Bt(t,e,n){let{$$slots:i={},$$scope:r}=e,{route:o=new Ve}=e;return st(()=>{document.addEventListener("click",function(s){if(s.target.closest("a")){const u=s.target.getAttribute("href");s.target.getAttribute("target")!="_blank"&&(u.startsWith("/")||u.startsWith(window.location.host))&&(s.preventDefault(),history.pushState({},"",u))}})}),t.$$set=s=>{"route"in s&&n(0,o=s.route),"$$scope"in s&&n(1,r=s.$$scope)},[o,r,i]}class qt extends G{constructor(e){super(),q(this,e,Bt,Ct,x,{route:0})}}function Gt(t){let e,n,i;const r=[t[2]];var o=t[1].route.component;function s(l){let u={};for(let f=0;f<r.length;f+=1)u=ye(u,r[f]);return{props:u}}return o&&(e=M(o,s())),{c(){e&&P(e.$$.fragment),n=D()},l(l){e&&I(e.$$.fragment,l),n=D()},m(l,u){e&&N(e,l,u),g(l,n,u),i=!0},p(l,u){const f=u&4?Me(r,[xe(l[2])]):{};if(o!==(o=l[1].route.component)){if(e){Q();const c=e;p(c.$$.fragment,1,0,()=>{k(c,1)}),z()}o?(e=M(o,s()),P(e.$$.fragment),m(e.$$.fragment,1),N(e,n.parentNode,n)):e=null}else o&&e.$set(f)},i(l){i||(e&&m(e.$$.fragment,l),i=!0)},o(l){e&&p(e.$$.fragment,l),i=!1},d(l){l&&a(n),e&&k(e,l)}}}function Ft(t){let e,n,i;var r=t[0];function o(s){return{props:{$$slots:{default:[Ut]},$$scope:{ctx:s}}}}return r&&(e=M(r,o(t))),{c(){e&&P(e.$$.fragment),n=D()},l(s){e&&I(e.$$.fragment,s),n=D()},m(s,l){e&&N(e,s,l),g(s,n,l),i=!0},p(s,l){const u={};if(l&22&&(u.$$scope={dirty:l,ctx:s}),r!==(r=s[0])){if(e){Q();const f=e;p(f.$$.fragment,1,0,()=>{k(f,1)}),z()}r?(e=M(r,o(s)),P(e.$$.fragment),m(e.$$.fragment,1),N(e,n.parentNode,n)):e=null}else r&&e.$set(u)},i(s){i||(e&&m(e.$$.fragment,s),i=!0)},o(s){e&&p(e.$$.fragment,s),i=!1},d(s){s&&a(n),e&&k(e,s)}}}function Ht(t){let e,n,i;var r=t[1].route.layout;function o(s){return{props:{$$slots:{default:[Wt]},$$scope:{ctx:s}}}}return r&&(e=M(r,o(t))),{c(){e&&P(e.$$.fragment),n=D()},l(s){e&&I(e.$$.fragment,s),n=D()},m(s,l){e&&N(e,s,l),g(s,n,l),i=!0},p(s,l){const u={};if(l&22&&(u.$$scope={dirty:l,ctx:s}),r!==(r=s[1].route.layout)){if(e){Q();const f=e;p(f.$$.fragment,1,0,()=>{k(f,1)}),z()}r?(e=M(r,o(s)),P(e.$$.fragment),m(e.$$.fragment,1),N(e,n.parentNode,n)):e=null}else r&&e.$set(u)},i(s){i||(e&&m(e.$$.fragment,s),i=!0)},o(s){e&&p(e.$$.fragment,s),i=!1},d(s){s&&a(n),e&&k(e,s)}}}function Ut(t){let e,n,i;const r=[t[2]];var o=t[1].route.component;function s(l){let u={};for(let f=0;f<r.length;f+=1)u=ye(u,r[f]);return{props:u}}return o&&(e=M(o,s())),{c(){e&&P(e.$$.fragment),n=D()},l(l){e&&I(e.$$.fragment,l),n=D()},m(l,u){e&&N(e,l,u),g(l,n,u),i=!0},p(l,u){const f=u&4?Me(r,[xe(l[2])]):{};if(o!==(o=l[1].route.component)){if(e){Q();const c=e;p(c.$$.fragment,1,0,()=>{k(c,1)}),z()}o?(e=M(o,s()),P(e.$$.fragment),m(e.$$.fragment,1),N(e,n.parentNode,n)):e=null}else o&&e.$set(f)},i(l){i||(e&&m(e.$$.fragment,l),i=!0)},o(l){e&&p(e.$$.fragment,l),i=!1},d(l){l&&a(n),e&&k(e,l)}}}function Wt(t){let e,n,i;const r=[t[2]];var o=t[1].route.component;function s(l){let u={};for(let f=0;f<r.length;f+=1)u=ye(u,r[f]);return{props:u}}return o&&(e=M(o,s())),{c(){e&&P(e.$$.fragment),n=D()},l(l){e&&I(e.$$.fragment,l),n=D()},m(l,u){e&&N(e,l,u),g(l,n,u),i=!0},p(l,u){const f=u&4?Me(r,[xe(l[2])]):{};if(o!==(o=l[1].route.component)){if(e){Q();const c=e;p(c.$$.fragment,1,0,()=>{k(c,1)}),z()}o?(e=M(o,s()),P(e.$$.fragment),m(e.$$.fragment,1),N(e,n.parentNode,n)):e=null}else o&&e.$set(f)},i(l){i||(e&&m(e.$$.fragment,l),i=!0)},o(l){e&&p(e.$$.fragment,l),i=!1},d(l){l&&a(n),e&&k(e,l)}}}function Qt(t){let e,n,i,r;const o=[Ht,Ft,Gt],s=[];function l(u,f){return u[1].route.layout?0:u[0]?1:2}return e=l(t),n=s[e]=o[e](t),{c(){n.c(),i=D()},l(u){n.l(u),i=D()},m(u,f){s[e].m(u,f),g(u,i,f),r=!0},p(u,[f]){let c=e;e=l(u),e===c?s[e].p(u,f):(Q(),p(s[c],1,1,()=>{s[c]=null}),z(),n=s[e],n?n.p(u,f):(n=s[e]=o[e](u),n.c()),m(n,1),n.m(i.parentNode,i))},i(u){r||(m(n),r=!0)},o(u){p(n),r=!1},d(u){s[e].d(u),u&&a(i)}}}function zt(t,e,n){let i,{defaultLayout:r}=e,{route:o}=e,{url:s}=e;return t.$$set=l=>{"defaultLayout"in l&&n(0,r=l.defaultLayout),"route"in l&&n(1,o=l.route),"url"in l&&n(3,s=l.url)},t.$$.update=()=>{t.$$.dirty&10&&n(2,i=lt.getParameters(o==null?void 0:o.path,s==null?void 0:s.pathname))},[r,o,i,s]}class Kt extends G{constructor(e){super(),q(this,e,zt,Qt,x,{defaultLayout:0,route:1,url:3})}}class Jt{constructor(e,n){V(this,"isSSR",!1);V(this,"isFromSSR",!1);V(this,"href","");V(this,"data",{});this.data=e,this.isFromSSR=n,this.isSSR=typeof window>"u"}}const Xt={method:"GET",headers:{"Svdn-Data-Only":"1"}};function Yt(t,e){const n=new Jt(t,!0),{subscribe:i,set:r,update:o}=le(n);return e.subscribe(s=>{o(l=>(l.href&&l.href!=s.href&&(l.data={}),l.href=s.href,l))}),{set:r,subscribe:i,update:o,isDataEmpty:()=>Object.keys(n.data).length==0,updateData:async(s=Xt)=>{const l=await(await fetch(n.href,s)).json();o(u=>(u.data=l,u))}}}function Zt(t){if(typeof window>"u")return{subscribe:le(new URL(t)).subscribe};const e=le(window.location.href),n=history.pushState,i=history.replaceState,r=()=>e.set(window.location.href);return history.pushState=function(){n.apply(this,arguments),r()},history.replaceState=function(){i.apply(this,arguments),r()},window.addEventListener("popstate",r),window.addEventListener("hashchange",r),{subscribe:jt(e,o=>new URL(o)).subscribe,navigate:function(o){history.pushState({},"",o)}}}function en(t){let e,n,i,r,o;n=new de({props:{value:"Svelte.NET"}});const s=t[1].default,l=ue(s,t,t[0],null);return{c(){e=T(),P(n.$$.fragment),i=T(),r=y("div"),l&&l.c(),this.h()},l(u){e=L(u),I(n.$$.fragment,u),i=L(u),r=v(u,"DIV",{class:!0});var f=E(r);l&&l.l(f),f.forEach(a),this.h()},h(){b(r,"class","index-layout")},m(u,f){g(u,e,f),N(n,u,f),g(u,i,f),g(u,r,f),l&&l.m(r,null),o=!0},p(u,[f]){l&&l.p&&(!o||f&1)&&ce(l,s,u,u[0],o?fe(s,u[0],f,null):ae(u[0]),null)},i(u){o||(m(n.$$.fragment,u),m(l,u),o=!0)},o(u){p(n.$$.fragment,u),p(l,u),o=!1},d(u){u&&a(e),k(n,u),u&&a(i),u&&a(r),l&&l.d(u)}}}function tn(t,e,n){let{$$slots:i={},$$scope:r}=e;return t.$$set=o=>{"$$scope"in o&&n(0,r=o.$$scope)},[r,i]}class nn extends G{constructor(e){super(),q(this,e,tn,en,x,{})}}function Xe(t){let e,n=t[0].text+"",i;return{c(){e=y("p"),i=R(n)},l(r){e=v(r,"P",{});var o=E(e);i=B(o,n),o.forEach(a)},m(r,o){g(r,e,o),_(e,i)},p(r,o){o&1&&n!==(n=r[0].text+"")&&it(i,n)},d(r){r&&a(e)}}}function rn(t){let e,n,i,r,o,s,l,u,f,c,$,O;n=new de({props:{value:"About"}});let h=t[0]&&t[0].text&&Xe(t);return{c(){e=T(),P(n.$$.fragment),i=T(),r=y("main"),o=y("h1"),s=R("About"),l=T(),h&&h.c(),u=T(),f=y("p"),c=y("a"),$=R("Go to index"),this.h()},l(d){e=L(d),I(n.$$.fragment,d),i=L(d),r=v(d,"MAIN",{});var w=E(r);o=v(w,"H1",{});var re=E(o);s=B(re,"About"),re.forEach(a),l=L(w),h&&h.l(w),u=L(w),f=v(w,"P",{});var J=E(f);c=v(J,"A",{href:!0});var H=E(c);$=B(H,"Go to index"),H.forEach(a),J.forEach(a),w.forEach(a),this.h()},h(){b(c,"href","/")},m(d,w){g(d,e,w),N(n,d,w),g(d,i,w),g(d,r,w),_(r,o),_(o,s),_(r,l),h&&h.m(r,null),_(r,u),_(r,f),_(f,c),_(c,$),O=!0},p(d,[w]){d[0]&&d[0].text?h?h.p(d,w):(h=Xe(d),h.c(),h.m(r,u)):h&&(h.d(1),h=null)},i(d){O||(m(n.$$.fragment,d),O=!0)},o(d){p(n.$$.fragment,d),O=!1},d(d){d&&a(e),k(n,d),d&&a(i),d&&a(r),h&&h.d()}}}function sn(t,e,n){let i,r;return je(t,be,o=>n(1,r=o)),st(async()=>{be.isDataEmpty()&&await be.updateData()}),t.$$.update=()=>{t.$$.dirty&2&&n(0,i=r.data)},[i,r]}class on extends G{constructor(e){super(),q(this,e,sn,rn,x,{})}}const ln="/app/assets/svelte-a39f39b7.svg";function un(t){let e,n,i,r,o;return{c(){e=y("button"),n=R("Count is "),i=R(t[0])},l(s){e=v(s,"BUTTON",{});var l=E(e);n=B(l,"Count is "),i=B(l,t[0]),l.forEach(a)},m(s,l){g(s,e,l),_(e,n),_(e,i),r||(o=nt(e,"click",t[1]),r=!0)},p(s,[l]){l&1&&it(i,s[0])},i:A,o:A,d(s){s&&a(e),r=!1,o()}}}function fn(t,e,n){let{counter:i=0}=e;const r=()=>{n(0,i+=1)};return t.$$set=o=>{"counter"in o&&n(0,i=o.counter)},[i,r]}class cn extends G{constructor(e){super(),q(this,e,fn,un,x,{counter:0})}}function an(t){let e,n,i,r,o,s,l,u,f,c,$,O,h,d,w,re,J,H,we,Ee,U,W,Se,X,Ne,ke,Y,Pe,_e,Ae,Ce;return n=new de({props:{value:"Index"}}),W=new cn({props:{counter:t[0]}}),{c(){e=T(),P(n.$$.fragment),i=T(),r=y("main"),o=y("div"),s=y("a"),l=y("img"),f=T(),c=y("a"),$=y("img"),h=T(),d=y("a"),w=y("img"),J=T(),H=y("h1"),we=R("Vite + Svelte + .NET"),Ee=T(),U=y("div"),P(W.$$.fragment),Se=T(),X=y("button"),Ne=R("Go to about"),ke=T(),Y=y("p"),Pe=R("Click on the Vite, Svelte and .NET logos to learn more"),this.h()},l(S){e=L(S),I(n.$$.fragment,S),i=L(S),r=v(S,"MAIN",{});var j=E(r);o=v(j,"DIV",{});var F=E(o);s=v(F,"A",{href:!0,target:!0,rel:!0});var Be=E(s);l=v(Be,"IMG",{src:!0,class:!0,alt:!0}),Be.forEach(a),f=L(F),c=v(F,"A",{href:!0,target:!0,rel:!0});var qe=E(c);$=v(qe,"IMG",{src:!0,class:!0,alt:!0}),qe.forEach(a),h=L(F),d=v(F,"A",{href:!0,target:!0,rel:!0});var Ge=E(d);w=v(Ge,"IMG",{src:!0,class:!0,alt:!0}),Ge.forEach(a),F.forEach(a),J=L(j),H=v(j,"H1",{});var Fe=E(H);we=B(Fe,"Vite + Svelte + .NET"),Fe.forEach(a),Ee=L(j),U=v(j,"DIV",{class:!0});var me=E(U);I(W.$$.fragment,me),Se=L(me),X=v(me,"BUTTON",{});var He=E(X);Ne=B(He,"Go to about"),He.forEach(a),me.forEach(a),ke=L(j),Y=v(j,"P",{class:!0});var Ue=E(Y);Pe=B(Ue,"Click on the Vite, Svelte and .NET logos to learn more"),Ue.forEach(a),j.forEach(a),this.h()},h(){Te(l.src,u="/app/vite.svg")||b(l,"src",u),b(l,"class","logo svelte-141kimj"),b(l,"alt","Vite Logo"),b(s,"href","https://vitejs.dev"),b(s,"target","_blank"),b(s,"rel","noreferrer"),Te($.src,O=ln)||b($,"src",O),b($,"class","logo svelte svelte-141kimj"),b($,"alt","Svelte Logo"),b(c,"href","https://svelte.dev"),b(c,"target","_blank"),b(c,"rel","noreferrer"),Te(w.src,re="/app/dotnet.svg")||b(w,"src",re),b(w,"class","logo svelte-141kimj"),b(w,"alt","DotNet Logo"),b(d,"href","https://dotnet.microsoft.com"),b(d,"target","_blank"),b(d,"rel","noreferrer"),b(U,"class","card"),b(Y,"class","read-the-docs svelte-141kimj")},m(S,j){g(S,e,j),N(n,S,j),g(S,i,j),g(S,r,j),_(r,o),_(o,s),_(s,l),_(o,f),_(o,c),_(c,$),_(o,h),_(o,d),_(d,w),_(r,J),_(r,H),_(H,we),_(r,Ee),_(r,U),N(W,U,null),_(U,Se),_(U,X),_(X,Ne),_(r,ke),_(r,Y),_(Y,Pe),_e=!0,Ae||(Ce=nt(X,"click",t[1]),Ae=!0)},p(S,[j]){const F={};j&1&&(F.counter=S[0]),W.$set(F)},i(S){_e||(m(n.$$.fragment,S),m(W.$$.fragment,S),_e=!0)},o(S){p(n.$$.fragment,S),p(W.$$.fragment,S),_e=!1},d(S){S&&a(e),k(n,S),S&&a(i),S&&a(r),k(W),Ae=!1,Ce()}}}function dn(t,e,n){let{counter:i}=e;function r(){se.navigate("/about")}return t.$$set=o=>{"counter"in o&&n(0,i=o.counter)},[i,r]}class _n extends G{constructor(e){super(),q(this,e,dn,an,x,{counter:0})}}function mn(t){let e,n,i,r;return{c(){e=T(),n=y("main"),i=y("h1"),r=R("Users page")},l(o){e=L(o),n=v(o,"MAIN",{});var s=E(n);i=v(s,"H1",{});var l=E(i);r=B(l,"Users page"),l.forEach(a),s.forEach(a)},m(o,s){g(o,e,s),g(o,n,s),_(n,i),_(i,r)},p:A,i:A,o:A,d(o){o&&a(e),o&&a(n)}}}class Ye extends G{constructor(e){super(),q(this,e,null,mn,x,{})}}class pe{constructor(e,n=void 0){V(this,"component");V(this,"layout");this.component=e,this.layout=n}}const hn={"/{counter:double?}":new pe(_n,nn),"/about":new pe(on),"/users":new pe(Ye),"/users/{skip}":new pe(Ye)};let se,be,ut;function pn(t,e){se=Zt(t),be=Yt(e,se),ut=Ot(hn,se)}function $n(t){let e,n,i,r,o;n=new de({props:{value:"Svelte.NET"}});const s=t[1].default,l=ue(s,t,t[0],null);return{c(){e=T(),P(n.$$.fragment),i=T(),r=y("div"),l&&l.c(),this.h()},l(u){e=L(u),I(n.$$.fragment,u),i=L(u),r=v(u,"DIV",{class:!0});var f=E(r);l&&l.l(f),f.forEach(a),this.h()},h(){b(r,"class","main-layout")},m(u,f){g(u,e,f),N(n,u,f),g(u,i,f),g(u,r,f),l&&l.m(r,null),o=!0},p(u,[f]){l&&l.p&&(!o||f&1)&&ce(l,s,u,u[0],o?fe(s,u[0],f,null):ae(u[0]),null)},i(u){o||(m(n.$$.fragment,u),m(l,u),o=!0)},o(u){p(n.$$.fragment,u),p(l,u),o=!1},d(u){u&&a(e),k(n,u),u&&a(i),u&&a(r),l&&l.d(u)}}}function gn(t,e,n){let{$$slots:i={},$$scope:r}=e;return t.$$set=o=>{"$$scope"in o&&n(0,r=o.$$scope)},[r,i]}class ft extends G{constructor(e){super(),q(this,e,gn,$n,x,{})}}function bn(t){let e,n,i;return n=new Kt({props:{route:t[0],url:t[1],defaultLayout:ft}}),{c(){e=y("div"),P(n.$$.fragment),this.h()},l(r){e=v(r,"DIV",{slot:!0});var o=E(e);I(n.$$.fragment,o),o.forEach(a),this.h()},h(){b(e,"slot","found")},m(r,o){g(r,e,o),N(n,e,null),i=!0},p(r,o){const s={};o&1&&(s.route=r[0]),o&2&&(s.url=r[1]),n.$set(s)},i(r){i||(m(n.$$.fragment,r),i=!0)},o(r){p(n.$$.fragment,r),i=!1},d(r){r&&a(e),k(n)}}}function yn(t){let e,n;return{c(){e=y("p"),n=R("Sorry, there's nothing at this address."),this.h()},l(i){e=v(i,"P",{role:!0});var r=E(e);n=B(r,"Sorry, there's nothing at this address."),r.forEach(a),this.h()},h(){b(e,"role","alert")},m(i,r){g(i,e,r),_(e,n)},p:A,d(i){i&&a(e)}}}function vn(t){let e,n,i,r,o;return n=new de({props:{value:"Not found"}}),r=new Lt({props:{layout:ft,$$slots:{default:[yn]},$$scope:{ctx:t}}}),{c(){e=y("div"),P(n.$$.fragment),i=T(),P(r.$$.fragment),this.h()},l(s){e=v(s,"DIV",{slot:!0});var l=E(e);I(n.$$.fragment,l),i=L(l),I(r.$$.fragment,l),l.forEach(a),this.h()},h(){b(e,"slot","not-found")},m(s,l){g(s,e,l),N(n,e,null),_(e,i),N(r,e,null),o=!0},p(s,l){const u={};l&4&&(u.$$scope={dirty:l,ctx:s}),r.$set(u)},i(s){o||(m(n.$$.fragment,s),m(r.$$.fragment,s),o=!0)},o(s){p(n.$$.fragment,s),p(r.$$.fragment,s),o=!1},d(s){s&&a(e),k(n),k(r)}}}function wn(t){let e,n;return e=new qt({props:{route:t[0],$$slots:{"not-found":[vn],found:[bn]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment)},l(i){I(e.$$.fragment,i)},m(i,r){N(e,i,r),n=!0},p(i,[r]){const o={};r&1&&(o.route=i[0]),r&7&&(o.$$scope={dirty:r,ctx:i}),e.$set(o)},i(i){n||(m(e.$$.fragment,i),n=!0)},o(i){p(e.$$.fragment,i),n=!1},d(i){k(e,i)}}}function En(t,e,n){let i,r;return je(t,ut,o=>n(0,i=o)),je(t,se,o=>n(1,r=o)),[i,r]}class Sn extends G{constructor(e){super(),q(this,e,En,wn,x,{})}}pn(window.location.href,window.SVELTE_DOT_NET_STATE);new Sn({target:document.getElementById("app"),hydrate:!0});