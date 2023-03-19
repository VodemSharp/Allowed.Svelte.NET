var $e=Object.defineProperty;var ge=(e,t,r)=>t in e?$e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var x=(e,t,r)=>(ge(e,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();function V(){}function St(e,t){for(const r in t)e[r]=t[r];return e}function oe(e){return e()}function Zt(){return Object.create(null)}function lt(e){e.forEach(oe)}function Ft(e){return typeof e=="function"}function F(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let yt;function Ot(e,t){return yt||(yt=document.createElement("a")),yt.href=t,e===yt.href}function be(e){return Object.keys(e).length===0}function le(e,...t){if(e==null)return V;const r=e.subscribe(...t);return r.unsubscribe?()=>r.unsubscribe():r}function Mt(e,t,r){e.$$.on_destroy.push(le(t,r))}function dt(e,t,r,i){if(e){const n=ue(e,t,r,i);return e[0](n)}}function ue(e,t,r,i){return e[1]&&i?St(r.ctx.slice(),e[1](i(t))):r.ctx}function _t(e,t,r,i){if(e[2]&&i){const n=e[2](i(r));if(t.dirty===void 0)return n;if(typeof n=="object"){const o=[],s=Math.max(t.dirty.length,n.length);for(let u=0;u<s;u+=1)o[u]=t.dirty[u]|n[u];return o}return t.dirty|n}return t.dirty}function ht(e,t,r,i,n,o){if(n){const s=ue(t,r,i,o);e.p(s,n)}}function mt(e){if(e.ctx.length>32){const t=[],r=e.ctx.length/32;for(let i=0;i<r;i++)t[i]=-1;return t}return-1}let kt=!1;function ye(){kt=!0}function ve(){kt=!1}function we(e,t,r,i){for(;e<t;){const n=e+(t-e>>1);r(n)<=i?e=n+1:t=n}return e}function Ee(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const l=[];for(let f=0;f<t.length;f++){const c=t[f];c.claim_order!==void 0&&l.push(c)}t=l}const r=new Int32Array(t.length+1),i=new Int32Array(t.length);r[0]=-1;let n=0;for(let l=0;l<t.length;l++){const f=t[l].claim_order,c=(n>0&&t[r[n]].claim_order<=f?n+1:we(1,n,I=>t[r[I]].claim_order,f))-1;i[l]=r[c]+1;const h=c+1;r[h]=l,n=Math.max(h,n)}const o=[],s=[];let u=t.length-1;for(let l=r[n]+1;l!=0;l=i[l-1]){for(o.push(t[l-1]);u>=l;u--)s.push(t[u]);u--}for(;u>=0;u--)s.push(t[u]);o.reverse(),s.sort((l,f)=>l.claim_order-f.claim_order);for(let l=0,f=0;l<s.length;l++){for(;f<o.length&&s[l].claim_order>=o[f].claim_order;)f++;const c=f<o.length?o[f]:null;e.insertBefore(s[l],c)}}function d(e,t){if(kt){for(Ee(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function v(e,t,r){kt&&!r?d(e,t):(t.parentNode!==e||t.nextSibling!=r)&&e.insertBefore(t,r||null)}function a(e){e.parentNode&&e.parentNode.removeChild(e)}function p(e){return document.createElement(e)}function O(e){return document.createTextNode(e)}function L(){return O(" ")}function R(){return O("")}function fe(e,t,r,i){return e.addEventListener(t,r,i),()=>e.removeEventListener(t,r,i)}function y(e,t,r){r==null?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r)}function w(e){return Array.from(e.childNodes)}function Se(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function ae(e,t,r,i,n=!1){Se(e);const o=(()=>{for(let s=e.claim_info.last_index;s<e.length;s++){const u=e[s];if(t(u)){const l=r(u);return l===void 0?e.splice(s,1):e[s]=l,n||(e.claim_info.last_index=s),u}}for(let s=e.claim_info.last_index-1;s>=0;s--){const u=e[s];if(t(u)){const l=r(u);return l===void 0?e.splice(s,1):e[s]=l,n?l===void 0&&e.claim_info.last_index--:e.claim_info.last_index=s,u}}return i()})();return o.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,o}function ke(e,t,r,i){return ae(e,n=>n.nodeName===t,n=>{const o=[];for(let s=0;s<n.attributes.length;s++){const u=n.attributes[s];r[u.name]||o.push(u.name)}o.forEach(s=>n.removeAttribute(s))},()=>i(t))}function b(e,t,r){return ke(e,t,r,p)}function M(e,t){return ae(e,r=>r.nodeType===3,r=>{const i=""+t;if(r.data.startsWith(i)){if(r.data.length!==i.length)return r.splitText(i.length)}else r.data=i},()=>O(t),!0)}function T(e){return M(e," ")}function ce(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function Ne(e,t){const r=[];let i=0;for(const n of t.childNodes)if(n.nodeType===8){const o=n.textContent.trim();o===`HEAD_${e}_END`?(i-=1,r.push(n)):o===`HEAD_${e}_START`&&(i+=1,r.push(n))}else i>0&&r.push(n);return r}function B(e,t){return new e(t)}let at;function ut(e){at=e}function Pe(){if(!at)throw new Error("Function called outside component initialization");return at}function de(e){Pe().$$.on_mount.push(e)}const ot=[],te=[],vt=[],ee=[],Ae=Promise.resolve();let xt=!1;function Le(){xt||(xt=!0,Ae.then(_e))}function Bt(e){vt.push(e)}const Rt=new Set;let it=0;function _e(){if(it!==0)return;const e=at;do{try{for(;it<ot.length;){const t=ot[it];it++,ut(t),Te(t.$$)}}catch(t){throw ot.length=0,it=0,t}for(ut(null),ot.length=0,it=0;te.length;)te.pop()();for(let t=0;t<vt.length;t+=1){const r=vt[t];Rt.has(r)||(Rt.add(r),r())}vt.length=0}while(ot.length);for(;ee.length;)ee.pop()();xt=!1,Rt.clear(),ut(e)}function Te(e){if(e.fragment!==null){e.update(),lt(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Bt)}}const wt=new Set;let Z;function z(){Z={r:0,c:[],p:Z}}function J(){Z.r||lt(Z.c),Z=Z.p}function _(e,t){e&&e.i&&(wt.delete(e),e.i(t))}function m(e,t,r,i){if(e&&e.o){if(wt.has(e))return;wt.add(e),Z.c.push(()=>{wt.delete(e),i&&(r&&e.d(1),i())}),e.o(t)}else i&&i()}function Gt(e,t){const r={},i={},n={$$scope:1};let o=e.length;for(;o--;){const s=e[o],u=t[o];if(u){for(const l in s)l in u||(i[l]=1);for(const l in u)n[l]||(r[l]=u[l],n[l]=1);e[o]=u}else for(const l in s)n[l]=1}for(const s in i)s in r||(r[s]=void 0);return r}function Ht(e){return typeof e=="object"&&e!==null?e:{}}function N(e){e&&e.c()}function C(e,t){e&&e.l(t)}function S(e,t,r,i){const{fragment:n,after_update:o}=e.$$;n&&n.m(t,r),i||Bt(()=>{const s=e.$$.on_mount.map(oe).filter(Ft);e.$$.on_destroy?e.$$.on_destroy.push(...s):lt(s),e.$$.on_mount=[]}),o.forEach(Bt)}function k(e,t){const r=e.$$;r.fragment!==null&&(lt(r.on_destroy),r.fragment&&r.fragment.d(t),r.on_destroy=r.fragment=null,r.ctx=[])}function De(e,t){e.$$.dirty[0]===-1&&(ot.push(e),Le(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function G(e,t,r,i,n,o,s,u=[-1]){const l=at;ut(e);const f=e.$$={fragment:null,ctx:[],props:o,update:V,not_equal:n,bound:Zt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:Zt(),dirty:u,skip_bound:!1,root:t.target||l.$$.root};s&&s(f.root);let c=!1;if(f.ctx=r?r(e,t.props||{},(h,I,...D)=>{const P=D.length?D[0]:I;return f.ctx&&n(f.ctx[h],f.ctx[h]=P)&&(!f.skip_bound&&f.bound[h]&&f.bound[h](P),c&&De(e,h)),I}):[],f.update(),c=!0,lt(f.before_update),f.fragment=i?i(f.ctx):!1,t.target){if(t.hydrate){ye();const h=w(t.target);f.fragment&&f.fragment.l(h),h.forEach(a)}else f.fragment&&f.fragment.c();t.intro&&_(e.$$.fragment),S(e,t.target,t.anchor,t.customElement),ve(),_e()}ut(l)}class H{$destroy(){k(this,1),this.$destroy=V}$on(t,r){if(!Ft(r))return V;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(r),()=>{const n=i.indexOf(r);n!==-1&&i.splice(n,1)}}$set(t){this.$$set&&!be(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function je(e){let t;return document.title=t=e[0],{c:V,l(r){Ne("svelte-1g2xq30",document.head).forEach(a)},m:V,p(r,[i]){i&1&&t!==(t=r[0])&&(document.title=t)},i:V,o:V,d:V}}function Ve(e,t,r){let{value:i=""}=t;return e.$$set=n=>{"value"in n&&r(0,i=n.value)},[i]}class pt extends H{constructor(t){super(),G(this,t,Ve,je,F,{value:0})}}function Ie(e){let t;const r=e[1].default,i=dt(r,e,e[2],null);return{c(){i&&i.c()},l(n){i&&i.l(n)},m(n,o){i&&i.m(n,o),t=!0},p(n,o){i&&i.p&&(!t||o&4)&&ht(i,r,n,n[2],t?_t(r,n[2],o,null):mt(n[2]),null)},i(n){t||(_(i,n),t=!0)},o(n){m(i,n),t=!1},d(n){i&&i.d(n)}}}function Oe(e){let t,r,i;var n=e[0];function o(s){return{props:{$$slots:{default:[Ie]},$$scope:{ctx:s}}}}return n&&(t=B(n,o(e))),{c(){t&&N(t.$$.fragment),r=R()},l(s){t&&C(t.$$.fragment,s),r=R()},m(s,u){t&&S(t,s,u),v(s,r,u),i=!0},p(s,[u]){const l={};if(u&4&&(l.$$scope={dirty:u,ctx:s}),n!==(n=s[0])){if(t){z();const f=t;m(f.$$.fragment,1,0,()=>{k(f,1)}),J()}n?(t=B(n,o(s)),N(t.$$.fragment),_(t.$$.fragment,1),S(t,r.parentNode,r)):t=null}else n&&t.$set(l)},i(s){i||(t&&_(t.$$.fragment,s),i=!0)},o(s){t&&m(t.$$.fragment,s),i=!1},d(s){s&&a(r),t&&k(t,s)}}}function Re(e,t,r){let{$$slots:i={},$$scope:n}=t,{layout:o}=t;return e.$$set=s=>{"layout"in s&&r(0,o=s.layout),"$$scope"in s&&r(2,n=s.$$scope)},[o,i,n]}class Ce extends H{constructor(t){super(),G(this,t,Re,Oe,F,{layout:0})}}const st=[];function Me(e,t){return{subscribe:ct(e,t).subscribe}}function ct(e,t=V){let r;const i=new Set;function n(u){if(F(e,u)&&(e=u,r)){const l=!st.length;for(const f of i)f[1](),st.push(f,e);if(l){for(let f=0;f<st.length;f+=2)st[f][0](st[f+1]);st.length=0}}}function o(u){n(u(e))}function s(u,l=V){const f=[u,l];return i.add(f),i.size===1&&(r=t(n)||V),u(e),()=>{i.delete(f),i.size===0&&(r(),r=null)}}return{set:n,update:o,subscribe:s}}function xe(e,t,r){const i=!Array.isArray(e),n=i?[e]:e,o=t.length<2;return Me(r,s=>{let u=!1;const l=[];let f=0,c=V;const h=()=>{if(f)return;c();const D=t(i?l[0]:l,s);o?s(D):c=Ft(D)?D:V},I=n.map((D,P)=>le(D,$=>{l[P]=$,f&=~(1<<P),u&&h()},()=>{f|=1<<P}));return u=!0,h(),function(){lt(I),c()}})}class q{constructor(t,r,i,n=!1){x(this,"name");x(this,"min");x(this,"max");x(this,"real");this.name=t,this.min=r,this.max=i,this.real=n}}const Ct=[new q("sbyte",-128,127),new q("byte",0,255),new q("short",-32768,32767),new q("ushort",0,65535),new q("int",-2147483648,2147483647),new q("uint",0,4294967295),new q("long",-9223372036854776e3,9223372036854776e3),new q("ulong",0,18446744073709552e3),new q("float",-34028234663852886e22,34028234663852886e22,!0),new q("double",-17976931348623157e292,17976931348623157e292,!0),new q("decimal",-7922816251426434e13,7922816251426434e13,!0)];class Be{isParameter(t){return t[0]=="{"&&t[t.length-1]=="}"}removeQuestionMark(t){return t.split("?").join("")}countNecessaryParts(t){let r=t.length;for(let i=t.length-1;i>=0&&!(!t[i].endsWith("?}")&&!t[i].startsWith("{*"));i--)r--;return r}getSuitableByLength(t,r){return t.filter(i=>this.countNecessaryParts(i)<=r.length&&(i.length>=r.length||i.some(n=>n.indexOf("{*")>-1)))}getParameterParts(t){const i=t.substring(1,t.length-1).split(":"),n=i.length==2?this.removeQuestionMark(i[1]):void 0;return{parameterParts:i,type:n}}isValidType(t,r){const{parameterParts:i,type:n}=this.getParameterParts(t);if(i[0][0]!="*"&&Ct.some(o=>o.name==n)){const o=Ct.filter(u=>u.name==n)[0],s=Number(r);return r.indexOf("e")==-1&&!isNaN(s)&&(o.real||r.indexOf(".")==-1&&!o.real)&&s>=o.min&&s<=o.max}return!0}getSuitableByContent(t,r){for(let i=0;i<r.length;i++)for(let n=0;n<t.length;n++)i<t[n].length&&(!this.isParameter(t[n][i])&&r[i]!=t[n][i]||this.isParameter(t[n][i])&&r[i]!=""&&!this.isValidType(t[n][i],r[i]))&&(t=t.filter(o=>t.indexOf(o)!=n),n--);return t}countFirstNotParameter(t){let r=0;for(let i=0;i<t.length&&!this.isParameter(t[i]);i++)r++;return r}getBestComparison(t){let r=t[0],i=this.countFirstNotParameter(t[0]);for(let n=1;n<t.length;n++){let o=this.countFirstNotParameter(t[n]);o>i&&(r=t[n],i=o)}return r}getActivePage(t,r){const i=r.split("/");let n=this.getSuitableByLength(t,i);if(n=this.getSuitableByContent(n,i),n.length!=0)return this.getBestComparison(n).join("/")}getParameters(t,r){const i=t.split("/"),n=r.split("/"),o={};for(let s=0;s<i.length;s++){const u=i[s];if(this.isParameter(u)){const{parameterParts:l,type:f}=this.getParameterParts(u);if(l[0][0]=="*"){const c=this.removeQuestionMark(l[0].substring(1));o[c]=s<n.length?n.slice(s).join("/"):void 0}else{const c=this.removeQuestionMark(l[0]);Ct.some(h=>h.name==f)?o[c]=s<n.length?Number(n[s]):0:o[c]=s<n.length?n[s]:void 0}}}return o}}const he=new Be;class qt{constructor(t=void 0,r=void 0){x(this,"path");x(this,"route");this.path=t,this.route=r}}function qe(e,t){const r=new qt,{subscribe:i,set:n}=ct(r);let o=[],s=Object.keys(e);for(let u=0;u<s.length;u++)o[u]=s[u].split("/");return t.subscribe(u=>{const l=he.getActivePage(o,u.pathname);n(new qt(l,l==null?void 0:e[l]))}),{subscribe:i}}const Fe=e=>({}),ne=e=>({}),Ge=e=>({}),re=e=>({});function He(e){let t;const r=e[2]["not-found"],i=dt(r,e,e[1],ne);return{c(){i&&i.c()},l(n){i&&i.l(n)},m(n,o){i&&i.m(n,o),t=!0},p(n,o){i&&i.p&&(!t||o&2)&&ht(i,r,n,n[1],t?_t(r,n[1],o,Fe):mt(n[1]),ne)},i(n){t||(_(i,n),t=!0)},o(n){m(i,n),t=!1},d(n){i&&i.d(n)}}}function We(e){let t;const r=e[2].found,i=dt(r,e,e[1],re);return{c(){i&&i.c()},l(n){i&&i.l(n)},m(n,o){i&&i.m(n,o),t=!0},p(n,o){i&&i.p&&(!t||o&2)&&ht(i,r,n,n[1],t?_t(r,n[1],o,Ge):mt(n[1]),re)},i(n){t||(_(i,n),t=!0)},o(n){m(i,n),t=!1},d(n){i&&i.d(n)}}}function Ke(e){let t,r,i,n;const o=[We,He],s=[];function u(l,f){return l[0].path?0:1}return t=u(e),r=s[t]=o[t](e),{c(){r.c(),i=R()},l(l){r.l(l),i=R()},m(l,f){s[t].m(l,f),v(l,i,f),n=!0},p(l,[f]){let c=t;t=u(l),t===c?s[t].p(l,f):(z(),m(s[c],1,1,()=>{s[c]=null}),J(),r=s[t],r?r.p(l,f):(r=s[t]=o[t](l),r.c()),_(r,1),r.m(i.parentNode,i))},i(l){n||(_(r),n=!0)},o(l){m(r),n=!1},d(l){s[t].d(l),l&&a(i)}}}function Qe(e,t,r){let{$$slots:i={},$$scope:n}=t,{route:o=new qt}=t;return de(()=>{document.addEventListener("click",function(s){if(s.target.closest("a")){const l=s.target.getAttribute("href");s.target.getAttribute("target")!="_blank"&&(l.startsWith("/")||l.startsWith(window.location.host))&&(s.preventDefault(),history.pushState({},"",l))}})}),e.$$set=s=>{"route"in s&&r(0,o=s.route),"$$scope"in s&&r(1,n=s.$$scope)},[o,n,i]}class Ue extends H{constructor(t){super(),G(this,t,Qe,Ke,F,{route:0})}}function ze(e){let t,r,i;const n=[e[2]];var o=e[1].route.component;function s(u){let l={};for(let f=0;f<n.length;f+=1)l=St(l,n[f]);return{props:l}}return o&&(t=B(o,s())),{c(){t&&N(t.$$.fragment),r=R()},l(u){t&&C(t.$$.fragment,u),r=R()},m(u,l){t&&S(t,u,l),v(u,r,l),i=!0},p(u,l){const f=l&4?Gt(n,[Ht(u[2])]):{};if(o!==(o=u[1].route.component)){if(t){z();const c=t;m(c.$$.fragment,1,0,()=>{k(c,1)}),J()}o?(t=B(o,s()),N(t.$$.fragment),_(t.$$.fragment,1),S(t,r.parentNode,r)):t=null}else o&&t.$set(f)},i(u){i||(t&&_(t.$$.fragment,u),i=!0)},o(u){t&&m(t.$$.fragment,u),i=!1},d(u){u&&a(r),t&&k(t,u)}}}function Je(e){let t,r,i;var n=e[0];function o(s){return{props:{$$slots:{default:[Ye]},$$scope:{ctx:s}}}}return n&&(t=B(n,o(e))),{c(){t&&N(t.$$.fragment),r=R()},l(s){t&&C(t.$$.fragment,s),r=R()},m(s,u){t&&S(t,s,u),v(s,r,u),i=!0},p(s,u){const l={};if(u&22&&(l.$$scope={dirty:u,ctx:s}),n!==(n=s[0])){if(t){z();const f=t;m(f.$$.fragment,1,0,()=>{k(f,1)}),J()}n?(t=B(n,o(s)),N(t.$$.fragment),_(t.$$.fragment,1),S(t,r.parentNode,r)):t=null}else n&&t.$set(l)},i(s){i||(t&&_(t.$$.fragment,s),i=!0)},o(s){t&&m(t.$$.fragment,s),i=!1},d(s){s&&a(r),t&&k(t,s)}}}function Xe(e){let t,r,i;var n=e[1].route.layout;function o(s){return{props:{$$slots:{default:[Ze]},$$scope:{ctx:s}}}}return n&&(t=B(n,o(e))),{c(){t&&N(t.$$.fragment),r=R()},l(s){t&&C(t.$$.fragment,s),r=R()},m(s,u){t&&S(t,s,u),v(s,r,u),i=!0},p(s,u){const l={};if(u&22&&(l.$$scope={dirty:u,ctx:s}),n!==(n=s[1].route.layout)){if(t){z();const f=t;m(f.$$.fragment,1,0,()=>{k(f,1)}),J()}n?(t=B(n,o(s)),N(t.$$.fragment),_(t.$$.fragment,1),S(t,r.parentNode,r)):t=null}else n&&t.$set(l)},i(s){i||(t&&_(t.$$.fragment,s),i=!0)},o(s){t&&m(t.$$.fragment,s),i=!1},d(s){s&&a(r),t&&k(t,s)}}}function Ye(e){let t,r,i;const n=[e[2]];var o=e[1].route.component;function s(u){let l={};for(let f=0;f<n.length;f+=1)l=St(l,n[f]);return{props:l}}return o&&(t=B(o,s())),{c(){t&&N(t.$$.fragment),r=R()},l(u){t&&C(t.$$.fragment,u),r=R()},m(u,l){t&&S(t,u,l),v(u,r,l),i=!0},p(u,l){const f=l&4?Gt(n,[Ht(u[2])]):{};if(o!==(o=u[1].route.component)){if(t){z();const c=t;m(c.$$.fragment,1,0,()=>{k(c,1)}),J()}o?(t=B(o,s()),N(t.$$.fragment),_(t.$$.fragment,1),S(t,r.parentNode,r)):t=null}else o&&t.$set(f)},i(u){i||(t&&_(t.$$.fragment,u),i=!0)},o(u){t&&m(t.$$.fragment,u),i=!1},d(u){u&&a(r),t&&k(t,u)}}}function Ze(e){let t,r,i;const n=[e[2]];var o=e[1].route.component;function s(u){let l={};for(let f=0;f<n.length;f+=1)l=St(l,n[f]);return{props:l}}return o&&(t=B(o,s())),{c(){t&&N(t.$$.fragment),r=R()},l(u){t&&C(t.$$.fragment,u),r=R()},m(u,l){t&&S(t,u,l),v(u,r,l),i=!0},p(u,l){const f=l&4?Gt(n,[Ht(u[2])]):{};if(o!==(o=u[1].route.component)){if(t){z();const c=t;m(c.$$.fragment,1,0,()=>{k(c,1)}),J()}o?(t=B(o,s()),N(t.$$.fragment),_(t.$$.fragment,1),S(t,r.parentNode,r)):t=null}else o&&t.$set(f)},i(u){i||(t&&_(t.$$.fragment,u),i=!0)},o(u){t&&m(t.$$.fragment,u),i=!1},d(u){u&&a(r),t&&k(t,u)}}}function tn(e){let t,r,i,n;const o=[Xe,Je,ze],s=[];function u(l,f){return l[1].route.layout?0:l[0]?1:2}return t=u(e),r=s[t]=o[t](e),{c(){r.c(),i=R()},l(l){r.l(l),i=R()},m(l,f){s[t].m(l,f),v(l,i,f),n=!0},p(l,[f]){let c=t;t=u(l),t===c?s[t].p(l,f):(z(),m(s[c],1,1,()=>{s[c]=null}),J(),r=s[t],r?r.p(l,f):(r=s[t]=o[t](l),r.c()),_(r,1),r.m(i.parentNode,i))},i(l){n||(_(r),n=!0)},o(l){m(r),n=!1},d(l){s[t].d(l),l&&a(i)}}}function en(e,t,r){let i,{defaultLayout:n}=t,{route:o}=t,{url:s}=t;return e.$$set=u=>{"defaultLayout"in u&&r(0,n=u.defaultLayout),"route"in u&&r(1,o=u.route),"url"in u&&r(3,s=u.url)},e.$$.update=()=>{e.$$.dirty&10&&r(2,i=he.getParameters(o==null?void 0:o.path,s==null?void 0:s.pathname))},[n,o,i,s]}class nn extends H{constructor(t){super(),G(this,t,en,tn,F,{defaultLayout:0,route:1,url:3})}}class ie{constructor(t,r=void 0){x(this,"component");x(this,"layout");this.component=t,this.layout=r}}class rn{constructor(t,r){x(this,"isSSR",!1);x(this,"isFromSSR",!1);x(this,"href","");x(this,"data",{});this.data=t,this.isFromSSR=r,this.isSSR=typeof window>"u"}}const sn={method:"GET",headers:{"Svdn-Data-Only":"1"}};function on(e,t){const r=new rn(e,!0),{subscribe:i,set:n,update:o}=ct(r);return t.subscribe(s=>{o(u=>(u.href&&u.href!=s.href&&(u.data={}),u.href=s.href,u))}),{set:n,subscribe:i,update:o,isDataEmpty:()=>Object.keys(r.data).length==0,updateData:async(s=sn)=>{const u=await(await fetch(r.href,s)).json();o(l=>(l.data=u,l))}}}function ln(e){if(typeof window>"u")return{subscribe:ct(new URL(e)).subscribe};const t=ct(window.location.href),r=history.pushState,i=history.replaceState,n=()=>t.set(window.location.href);return history.pushState=function(){r.apply(this,arguments),n()},history.replaceState=function(){i.apply(this,arguments),n()},window.addEventListener("popstate",n),window.addEventListener("hashchange",n),{subscribe:xe(t,o=>new URL(o)).subscribe,navigate:function(o){history.pushState({},"",o)}}}function un(e){let t,r,i,n,o;r=new pt({props:{value:"Svelte.NET"}});const s=e[1].default,u=dt(s,e,e[0],null);return{c(){t=L(),N(r.$$.fragment),i=L(),n=p("div"),u&&u.c(),this.h()},l(l){t=T(l),C(r.$$.fragment,l),i=T(l),n=b(l,"DIV",{class:!0});var f=w(n);u&&u.l(f),f.forEach(a),this.h()},h(){y(n,"class","index-layout")},m(l,f){v(l,t,f),S(r,l,f),v(l,i,f),v(l,n,f),u&&u.m(n,null),o=!0},p(l,[f]){u&&u.p&&(!o||f&1)&&ht(u,s,l,l[0],o?_t(s,l[0],f,null):mt(l[0]),null)},i(l){o||(_(r.$$.fragment,l),_(u,l),o=!0)},o(l){m(r.$$.fragment,l),m(u,l),o=!1},d(l){l&&a(t),k(r,l),l&&a(i),l&&a(n),u&&u.d(l)}}}function fn(e,t,r){let{$$slots:i={},$$scope:n}=t;return e.$$set=o=>{"$$scope"in o&&r(0,n=o.$$scope)},[n,i]}class an extends H{constructor(t){super(),G(this,t,fn,un,F,{})}}function se(e){let t,r,i=e[0].text+"",n;return{c(){t=p("p"),r=O("Data: "),n=O(i)},l(o){t=b(o,"P",{});var s=w(t);r=M(s,"Data: "),n=M(s,i),s.forEach(a)},m(o,s){v(o,t,s),d(t,r),d(t,n)},p(o,s){s&1&&i!==(i=o[0].text+"")&&ce(n,i)},d(o){o&&a(t)}}}function cn(e){let t,r,i,n,o,s,u,l,f,c,h,I,D,P;r=new pt({props:{value:"About"}});let $=e[0]&&e[0].text&&se(e);return{c(){t=L(),N(r.$$.fragment),i=L(),n=p("main"),o=p("h1"),s=O("About"),u=L(),l=p("p"),f=L(),$&&$.c(),c=L(),h=p("p"),I=p("a"),D=O("Index link"),this.h()},l(g){t=T(g),C(r.$$.fragment,g),i=T(g),n=b(g,"MAIN",{});var A=w(n);o=b(A,"H1",{});var K=w(o);s=M(K,"About"),K.forEach(a),u=T(A),l=b(A,"P",{}),w(l).forEach(a),f=T(A),$&&$.l(A),c=T(A),h=b(A,"P",{});var tt=w(h);I=b(tt,"A",{href:!0});var et=w(I);D=M(et,"Index link"),et.forEach(a),tt.forEach(a),A.forEach(a),this.h()},h(){y(I,"href","/")},m(g,A){v(g,t,A),S(r,g,A),v(g,i,A),v(g,n,A),d(n,o),d(o,s),d(n,u),d(n,l),d(n,f),$&&$.m(n,null),d(n,c),d(n,h),d(h,I),d(I,D),P=!0},p(g,[A]){g[0]&&g[0].text?$?$.p(g,A):($=se(g),$.c(),$.m(n,c)):$&&($.d(1),$=null)},i(g){P||(_(r.$$.fragment,g),P=!0)},o(g){m(r.$$.fragment,g),P=!1},d(g){g&&a(t),k(r,g),g&&a(i),g&&a(n),$&&$.d()}}}function dn(e,t,r){let i,n;return Mt(e,Et,o=>r(1,n=o)),de(async()=>{Et.isDataEmpty()&&await Et.updateData()}),e.$$.update=()=>{e.$$.dirty&2&&r(0,i=n.data)},[i,n]}class _n extends H{constructor(t){super(),G(this,t,dn,cn,F,{})}}const hn="/app/assets/svelte-a39f39b7.svg";function mn(e){let t,r,i,n,o;return{c(){t=p("button"),r=O("Count is "),i=O(e[0])},l(s){t=b(s,"BUTTON",{});var u=w(t);r=M(u,"Count is "),i=M(u,e[0]),u.forEach(a)},m(s,u){v(s,t,u),d(t,r),d(t,i),n||(o=fe(t,"click",e[1]),n=!0)},p(s,[u]){u&1&&ce(i,s[0])},i:V,o:V,d(s){s&&a(t),n=!1,o()}}}function pn(e,t,r){let{counter:i=0}=t;const n=()=>{r(0,i+=1)};return e.$$set=o=>{"counter"in o&&r(0,i=o.counter)},[i,n]}class $n extends H{constructor(t){super(),G(this,t,pn,mn,F,{counter:0})}}function gn(e){let t,r,i,n,o,s,u,l,f,c,h,I,D,P,$,g,A,K,tt,et,Q,U,Nt,nt,Pt,At,X,Lt,Y,Tt,Dt,jt,rt,Vt,$t,It,Wt;return r=new pt({props:{value:"Index"}}),U=new $n({props:{counter:e[0]}}),{c(){t=L(),N(r.$$.fragment),i=L(),n=p("main"),o=p("div"),s=p("a"),u=p("img"),f=L(),c=p("a"),h=p("img"),D=L(),P=p("a"),$=p("img"),A=L(),K=p("h1"),tt=O("Vite + Svelte + .NET"),et=L(),Q=p("div"),N(U.$$.fragment),Nt=L(),nt=p("button"),Pt=O("Go to about"),At=L(),X=p("p"),Lt=O("Check out "),Y=p("a"),Tt=O("SvelteKit"),Dt=O(`, the official Svelte\r
        app framework powered by Vite!`),jt=L(),rt=p("p"),Vt=O("Click on the Vite and Svelte logos to learn more"),this.h()},l(E){t=T(E),C(r.$$.fragment,E),i=T(E),n=b(E,"MAIN",{});var j=w(n);o=b(j,"DIV",{});var W=w(o);s=b(W,"A",{href:!0,target:!0});var Kt=w(s);u=b(Kt,"IMG",{src:!0,class:!0,alt:!0}),Kt.forEach(a),f=T(W),c=b(W,"A",{href:!0,target:!0});var Qt=w(c);h=b(Qt,"IMG",{src:!0,class:!0,alt:!0}),Qt.forEach(a),D=T(W),P=b(W,"A",{href:!0,target:!0});var Ut=w(P);$=b(Ut,"IMG",{src:!0,class:!0,alt:!0}),Ut.forEach(a),W.forEach(a),A=T(j),K=b(j,"H1",{});var zt=w(K);tt=M(zt,"Vite + Svelte + .NET"),zt.forEach(a),et=T(j),Q=b(j,"DIV",{class:!0});var gt=w(Q);C(U.$$.fragment,gt),Nt=T(gt),nt=b(gt,"BUTTON",{});var Jt=w(nt);Pt=M(Jt,"Go to about"),Jt.forEach(a),gt.forEach(a),At=T(j),X=b(j,"P",{});var bt=w(X);Lt=M(bt,"Check out "),Y=b(bt,"A",{href:!0,target:!0});var Xt=w(Y);Tt=M(Xt,"SvelteKit"),Xt.forEach(a),Dt=M(bt,`, the official Svelte\r
        app framework powered by Vite!`),bt.forEach(a),jt=T(j),rt=b(j,"P",{class:!0});var Yt=w(rt);Vt=M(Yt,"Click on the Vite and Svelte logos to learn more"),Yt.forEach(a),j.forEach(a),this.h()},h(){Ot(u.src,l="/app/vite.svg")||y(u,"src",l),y(u,"class","logo svelte-141kimj"),y(u,"alt","Vite Logo"),y(s,"href","https://vitejs.dev"),y(s,"target","_blank"),Ot(h.src,I=hn)||y(h,"src",I),y(h,"class","logo svelte svelte-141kimj"),y(h,"alt","Svelte Logo"),y(c,"href","https://svelte.dev"),y(c,"target","_blank"),Ot($.src,g="/app/dotnet.svg")||y($,"src",g),y($,"class","logo svelte-141kimj"),y($,"alt","DotNet Logo"),y(P,"href","https://dotnet.microsoft.com"),y(P,"target","_blank"),y(Q,"class","card"),y(Y,"href","https://github.com/sveltejs/kit#readme"),y(Y,"target","_blank"),y(rt,"class","read-the-docs svelte-141kimj")},m(E,j){v(E,t,j),S(r,E,j),v(E,i,j),v(E,n,j),d(n,o),d(o,s),d(s,u),d(o,f),d(o,c),d(c,h),d(o,D),d(o,P),d(P,$),d(n,A),d(n,K),d(K,tt),d(n,et),d(n,Q),S(U,Q,null),d(Q,Nt),d(Q,nt),d(nt,Pt),d(n,At),d(n,X),d(X,Lt),d(X,Y),d(Y,Tt),d(X,Dt),d(n,jt),d(n,rt),d(rt,Vt),$t=!0,It||(Wt=fe(nt,"click",e[1]),It=!0)},p(E,[j]){const W={};j&1&&(W.counter=E[0]),U.$set(W)},i(E){$t||(_(r.$$.fragment,E),_(U.$$.fragment,E),$t=!0)},o(E){m(r.$$.fragment,E),m(U.$$.fragment,E),$t=!1},d(E){E&&a(t),k(r,E),E&&a(i),E&&a(n),k(U),It=!1,Wt()}}}function bn(e,t,r){let{counter:i}=t;function n(){ft.navigate("/about")}return e.$$set=o=>{"counter"in o&&r(0,i=o.counter)},[i,n]}class yn extends H{constructor(t){super(),G(this,t,bn,gn,F,{counter:0})}}const vn={"/{counter:double?}":new ie(yn,an),"/about":new ie(_n)};let ft,Et,me;function wn(e,t){ft=ln(e),Et=on(t,ft),me=qe(vn,ft)}function En(e){let t,r,i,n,o;r=new pt({props:{value:"Svelte.NET"}});const s=e[1].default,u=dt(s,e,e[0],null);return{c(){t=L(),N(r.$$.fragment),i=L(),n=p("div"),u&&u.c(),this.h()},l(l){t=T(l),C(r.$$.fragment,l),i=T(l),n=b(l,"DIV",{class:!0});var f=w(n);u&&u.l(f),f.forEach(a),this.h()},h(){y(n,"class","main-layout")},m(l,f){v(l,t,f),S(r,l,f),v(l,i,f),v(l,n,f),u&&u.m(n,null),o=!0},p(l,[f]){u&&u.p&&(!o||f&1)&&ht(u,s,l,l[0],o?_t(s,l[0],f,null):mt(l[0]),null)},i(l){o||(_(r.$$.fragment,l),_(u,l),o=!0)},o(l){m(r.$$.fragment,l),m(u,l),o=!1},d(l){l&&a(t),k(r,l),l&&a(i),l&&a(n),u&&u.d(l)}}}function Sn(e,t,r){let{$$slots:i={},$$scope:n}=t;return e.$$set=o=>{"$$scope"in o&&r(0,n=o.$$scope)},[n,i]}class pe extends H{constructor(t){super(),G(this,t,Sn,En,F,{})}}function kn(e){let t,r,i;return r=new nn({props:{route:e[0],url:e[1],defaultLayout:pe}}),{c(){t=p("div"),N(r.$$.fragment),this.h()},l(n){t=b(n,"DIV",{slot:!0});var o=w(t);C(r.$$.fragment,o),o.forEach(a),this.h()},h(){y(t,"slot","found")},m(n,o){v(n,t,o),S(r,t,null),i=!0},p(n,o){const s={};o&1&&(s.route=n[0]),o&2&&(s.url=n[1]),r.$set(s)},i(n){i||(_(r.$$.fragment,n),i=!0)},o(n){m(r.$$.fragment,n),i=!1},d(n){n&&a(t),k(r)}}}function Nn(e){let t,r;return{c(){t=p("p"),r=O("Sorry, there's nothing at this address."),this.h()},l(i){t=b(i,"P",{role:!0});var n=w(t);r=M(n,"Sorry, there's nothing at this address."),n.forEach(a),this.h()},h(){y(t,"role","alert")},m(i,n){v(i,t,n),d(t,r)},p:V,d(i){i&&a(t)}}}function Pn(e){let t,r,i,n,o;return r=new pt({props:{value:"Not found"}}),n=new Ce({props:{layout:pe,$$slots:{default:[Nn]},$$scope:{ctx:e}}}),{c(){t=p("div"),N(r.$$.fragment),i=L(),N(n.$$.fragment),this.h()},l(s){t=b(s,"DIV",{slot:!0});var u=w(t);C(r.$$.fragment,u),i=T(u),C(n.$$.fragment,u),u.forEach(a),this.h()},h(){y(t,"slot","not-found")},m(s,u){v(s,t,u),S(r,t,null),d(t,i),S(n,t,null),o=!0},p(s,u){const l={};u&4&&(l.$$scope={dirty:u,ctx:s}),n.$set(l)},i(s){o||(_(r.$$.fragment,s),_(n.$$.fragment,s),o=!0)},o(s){m(r.$$.fragment,s),m(n.$$.fragment,s),o=!1},d(s){s&&a(t),k(r),k(n)}}}function An(e){let t,r;return t=new Ue({props:{route:e[0],$$slots:{"not-found":[Pn],found:[kn]},$$scope:{ctx:e}}}),{c(){N(t.$$.fragment)},l(i){C(t.$$.fragment,i)},m(i,n){S(t,i,n),r=!0},p(i,[n]){const o={};n&1&&(o.route=i[0]),n&7&&(o.$$scope={dirty:n,ctx:i}),t.$set(o)},i(i){r||(_(t.$$.fragment,i),r=!0)},o(i){m(t.$$.fragment,i),r=!1},d(i){k(t,i)}}}function Ln(e,t,r){let i,n;return Mt(e,me,o=>r(0,i=o)),Mt(e,ft,o=>r(1,n=o)),[i,n]}class Tn extends H{constructor(t){super(),G(this,t,Ln,An,F,{})}}wn(window.location.href,window.SVELTE_DOT_NET_STATE);new Tn({target:document.getElementById("app"),hydrate:!0});
