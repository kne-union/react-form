"use strict";(self.webpackChunk_kne_components_react_form=self.webpackChunk_kne_components_react_form||[]).push([[304],{24304:(e,t,r)=>{r.d(t,{c:()=>ie});var n={};r.r(n),r.d(n,{Form:()=>K,Group:()=>H,GroupList:()=>ae,RULES:()=>T,default:()=>K,formUtils:()=>se,interceptors:()=>x,preset:()=>_,useField:()=>X,useFormContext:()=>S,useGroup:()=>$,useReset:()=>Y,useSubmit:()=>ee,util:()=>oe});var a=r(49256),o=r.n(a),s=r(96312),i=r(57272),u=r(33480),l=r.n(u),c=r(6940),m=r.n(c),d=r(24872),f=r.n(d),p=r(25768),g=r.n(p),v=r(25816);const h=(0,a.createContext)({}),{Provider:b,Consumer:R}=h,S=()=>(0,a.useContext)(h),x={input:[],output:[]};x.input.use=(e,t)=>x.input.push({name:e,exec:t}),x.output.use=(e,t)=>x.output.push({name:e,exec:t});const P=x,I=(e,t,r)=>{Array.isArray(r)||(r=[r]);const n=(0,s.uniqBy)(P[t].concat((0,s.get)(e,t,[])).filter((e=>{let{name:t}=e;return r.indexOf(t)>-1})).reverse(),(e=>{let{name:t}=e;return t}));return 0===n.length?e=>e:(0,i.c)(...n.map((e=>{let{exec:t}=e;return t})))},k=e=>Object.values(e).every((e=>e.isPass));function F(){return F=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},F.apply(this,arguments)}function O(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}class C{constructor(e){let{id:t,name:r}=e;this.id=t,this.name=r,this.isPass=!1,this.validate={}}setInfo(e){let{groupName:t,groupIndex:r,label:n,rule:a,interceptor:o,noTrim:s,fieldRef:i,errMsg:u}=e;return this.groupName=t,this.groupIndex=r,this.label=n,this.rule=a,this.interceptor=o,this.noTrim=s,this.fieldRef=i,this.errMsg=u,this}deleteValue(){return delete this.value,this}setValue(e){return this.value=e,this}clone(){return(0,s.clone)(this)}setValidateStatus(e){let{status:t,msg:r="",validateData:n}=e;return this.validate={status:t,msg:r,validateData:Object.assign({},this.validate.validateData,n)},this}async runValidate(e,t){const r=await(async e=>{let{field:t,value:r,formRules:n,getFormData:a}=e;if("function"===typeof t.rule)return await t.rule(r,Object.assign({},{data:a()},{field:t}));if("object"===typeof t.rule&&t.rule instanceof RegExp)return{result:t.rule.test(r),errMsg:""};const o={};if("string"===typeof t.rule){const e=t.rule.split(" ").filter((e=>e.length>0));for(let s of e){let[e,...i]=s.split("-");const u=n[e.toUpperCase()];if("function"===typeof u){if("REQ"!==s&&!0!==n.REQ(r,...i,Object.assign({},{data:a()},{field:t})).result)return{result:!0,errMsg:"",data:o};const l=await u(r,...i,Object.assign({},{data:a()},{field:t}));if(Object.assign(o,{[e.toUpperCase()]:l.data}),!0!==l.result)return{result:!1,errMsg:l.errMsg,data:o}}else console.error("\u6821\u9a8c\u89c4\u5219".concat(s,"\u4e0d\u5728\u5f53\u524dform\u7684rules\u91cc\u9762\uff0c\u8bf7\u786e\u8ba4").concat(t.name,"\u7684\u6821\u9a8c\u89c4\u5219").concat(t.rule,"\u662f\u5426\u6b63\u786e"))}}return{result:!0,errMsg:"",data:o}})({field:this.clone(),value:this.value,formRules:e,getFormData:t});return this.isPass=r.result,this.validate={status:!0===r.result?1:2,msg:r.errMsg,validateData:Object.assign({},r.data)},this}}class D{constructor(e){let{id:t,runner:r,complete:n}=e;this.id=t,this.isCancel=!1,this.target=Promise.race([Promise.resolve(r()),new Promise((e=>{this.resolve=e}))]).then((e=>this.isCancel?new Promise((()=>{})):e)),this.target.then((function(){return Promise.resolve(n(...arguments))}))}cancel(){!0!==this.isCancel&&(this.isCancel=!0,this.resolve(...arguments))}}class E{constructor(){this.queue=[]}append(e){const t=new Proxy(e.complete,{apply:(e,t,n)=>{const a=e.apply(t,n),o=this.queue.indexOf(r);return this.queue.splice(o,1),a}});e.complete=t;const r=new D(e),n=this.queue.find((e=>{let{id:t}=e;return r.id===t}));if(n){const e=this.queue.indexOf(n);n.cancel(),this.queue.splice(e,1)}this.queue.push(r)}}const y=(e,t)=>t.id?e[t.id]:t.groupName?Object.values(e).find((e=>e.name===t.name&&e.groupName===t.groupName&&e.groupIndex===t.groupIndex)):Object.values(e).find((e=>e.name===t.name)),j=e=>{let{formStateRef:t,formDataRef:r,setFormState:n,otherProps:a,taskQueue:o,emitter:s}=e;const i=e=>{e.fieldRef.current&&n(Object.assign({},t.current,{[e.id]:e}))};return e=>{let{id:n,name:u,groupName:l,groupIndex:c}=e;const m=y(t.current,{id:n,name:u,groupName:l,groupIndex:c});if(!m)return void console.error("\u672a\u627e\u5230\u8981\u6c42\u5b57\u6bb5");const d=m.clone();d.setValidateStatus({status:3}),i(d);let f=d.value;"string"===typeof d.value&&!0!==d.noTrim&&(f=d.value.trim(),d.value!==f&&(d.setValue(f),s.emit("form-field-data-change",{id:n,value:f}))),o.append({id:n,runner:()=>d.runValidate(a.current.rules,(()=>r.current)),complete:()=>{i(d),s.emit("form-field-validate-complete",{id:n,name:d.name,value:f,index:d.groupIndex,validate:d.validate})}})}},N=e=>{let{formStateRef:t,taskQueue:r,emitter:n}=e;return e=>(e=Object.assign({},e),Object.values(t.current).forEach((e=>{n.emit("form-field-validate",{id:e.id})})),Promise.all(r.queue.map((e=>e.target))).then((function(){return e.callback&&e.callback({formState:t.current})})))},M=e=>{let{setFormState:t,formStateRef:r,initDataRef:n,formDataRef:a,taskQueue:o,emitter:s,otherProps:i}=e;const u=j({formStateRef:r,formDataRef:a,setFormState:t,otherProps:i,taskQueue:o,emitter:s});return(e,a)=>{const{runValidate:o}=Object.assign({},{runValidate:!0},a),s=Object.assign({},r.current),l=[];e.forEach((e=>{const{name:t,groupName:r,groupIndex:a,value:o,validate:u,toInitData:c}=Object.assign({},{toInitData:!1},e),d=y(s,{name:t,groupName:r,groupIndex:a});if(d)return s[d.id]=d.clone().setValue(I(i.current.interceptors,"input",d.interceptor)(o)),void(u?s[d.id].setValidateStatus(u):l.push(d.id));if(r&&g()(a)){const e=(p=s,(v={groupName:r,name:t}).groupName?Object.values(p).filter((e=>e.name===v.name&&e.groupName===v.groupName)):[]);e.forEach((e=>{s[e.id]=e.clone().setValue(I(i.current.interceptors,"input",e.interceptor)(o)),u?s[e.id].setValidateStatus(u):l.push(e.id)}))}else{var p,v;if(c){if(r&&f()(r.split("."))===t&&!g()(a))return void m()(n.current,"".concat(r,'["').concat(a,'"]'),o);if(r&&t&&!g()(a))return void m()(n.current,"".concat(r,'["').concat(a,'"].').concat(t),o);if(t)return void m()(n.current,t,o)}}})),t(s),o&&l.forEach((e=>u({id:e})))}},L=e=>{if((0,s.isPlainObject)(e)){const t=(0,s.values)(e);return t.length>0&&t.some((e=>!!e))}return(0,s.isArray)(e)?e.length>0:"number"===typeof e?!isNaN(e):!(void 0===e||null===e||""===e||0===e.length)},V=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if((0,s.isArray)(e))return e.map((e=>V(e))).filter(L);if((0,s.isPlainObject)(e)){const t={};return Object.keys(e).forEach((r=>{const n=V(e[r]);L(n)&&(t[r]=n)})),t}return e},w=(e,t)=>"string"===typeof e?e.replace("%s",t):e(t),A=e=>Object.values(e).filter((e=>2===(0,s.get)(e,"validate.status"))).map((e=>Object.assign({},e.validate,{name:e.name,label:e.label,groupName:e.groupName,fieldRef:e.fieldRef,groupIndex:e.groupIndex,errMsg:w(e.errMsg||(0,s.get)(e,"validate.msg",""),e.label)}))),Q=["debug","formStateRef","formData","formDataRef","computedIsPassRef","initDataRef"],B=e=>{let{debug:t,formStateRef:r,formData:n,formDataRef:o,initDataRef:i}=e,u=O(e,Q);const c=l()({debug:t,name:"react-form"}),d=(0,a.useRef)(c);d.current=c;const p=(e=>{const t=(0,a.useRef)({});return Object.keys(e).forEach((r=>{t.current[r]=e[r]})),t})(u);return p.current=u,(0,a.useEffect)((()=>{const e=d.current,t=p.current.setFormState,n=new E;return e.addListener("form-field-add",(e=>{let{formStateRef:t,setFormState:r}=e;return e=>{let{id:n,name:a}=e;const o=new C({id:n,name:a});r(Object.assign({},t.current,{[n]:o}))}})({formStateRef:r,setFormState:t})),e.addListener("form-field-edit",(e=>{let{formStateRef:t,setFormState:r,initDataRef:n,otherProps:a}=e;return e=>{let{id:o,name:i,rule:u,label:l,interceptor:c,value:m,noTrim:d,groupName:f,groupIndex:p,fieldRef:g,errMsg:v}=e;const h=t.current[o].clone();h.setInfo({groupName:f,groupIndex:p,label:l,rule:u,interceptor:c,noTrim:d,fieldRef:g,errMsg:v}),void 0===h.value&&h.setValue(I(a.current.interceptors,"input",c)(m||(f&&(0,s.last)(f.split("."))===i?(0,s.get)(n.current,"".concat(f,'["').concat(p,'"]')):f?(0,s.get)(n.current,"".concat(f,'["').concat(p,'"].').concat(i)):(0,s.get)(n.current,i)))),r(Object.assign({},t.current,{[o]:h}))}})({formStateRef:r,setFormState:t,initDataRef:i,otherProps:p})),e.addListener("form-field-remove",(e=>{let{formStateRef:t,setFormState:r}=e;return e=>{let{id:n}=e;const a=Object.assign({},t.current);delete a[n],r(a)}})({formStateRef:r,setFormState:t})),e.addListener("form-field-validate",j({formStateRef:r,formDataRef:o,setFormState:t,otherProps:p,taskQueue:n,emitter:e})),e.addListener("form-field-data-change",(e=>{let{formStateRef:t,setFormState:r}=e;return e=>{let{id:n,value:a}=e;if(!t.current[n])return;const o=t.current[n].clone();o.setValue(a),o.setValidateStatus({status:0}),r(Object.assign({},t.current,{[n]:o}))}})({formStateRef:r,setFormState:t})),e.addListener("form-data-set",(e=>{let{setFormState:t,formStateRef:r,initDataRef:n,otherProps:a,taskQueue:o,emitter:i}=e;const u=N({formStateRef:r,taskQueue:o,emitter:i});return e=>{let{data:o,runValidate:i=!0}=e;n.current=o;const l={};Object.values(Object.assign({},r.current)).forEach((e=>{const t=e.clone(),r=t.groupName,n=t.groupIndex,i=t.name,u=r&&(0,s.last)(r.split("."))===i?(0,s.get)(o,"".concat(r,"[").concat(n,"]")):r?(0,s.get)(o,"".concat(r,"[").concat(n,"].").concat(i)):(0,s.get)(o,i);t.setValue(I(a.current.interceptors,"input",e.interceptor)(u)),l[t.id]=t})),t(l),i&&u()}})({setFormState:t,formStateRef:r,initDataRef:i,otherProps:p,taskQueue:n,emitter:e})),e.addListener("form-data-reset",(e=>{let{initDataRef:t,setFormState:r,formStateRef:n}=e;return()=>{t.current={};const e=Object.assign({},n.current),a={};Object.values(e).forEach((e=>{const t=e.clone();t.deleteValue(),t.validate={},a[e.id]=t})),r(a)}})({initDataRef:i,setFormState:t,formStateRef:r})),e.addListener("form-data-set-field",(e=>{let{setFormState:t,formStateRef:r,initDataRef:n,formDataRef:a,taskQueue:o,emitter:s,otherProps:i}=e;const u=j({formStateRef:r,formDataRef:a,setFormState:t,otherProps:i,taskQueue:o,emitter:s});return e=>{let{name:a,groupName:o,groupIndex:s,value:l,runValidate:c=!0}=e;console.warn("form-data-set-field\u4e8b\u4ef6\u5df2\u7ecf\u5e9f\u5f03\u76ee\u524d\u6682\u65f6\u517c\u5bb9\uff0c\u540e\u7eed\u7248\u672c\u53ef\u80fd\u4f1a\u5220\u9664,\u8bf7\u4f7f\u7528form-data-set-field-list\u4e8b\u4ef6\u4ee3\u66ff");const d=Object.assign({},r.current),p=o?Object.values(d).find((e=>e.name===a&&e.groupName===o&&e.groupIndex===s)):Object.values(d).find((e=>e.name===a));if(!p)return o&&f()(o.split("."))===a?void m()(n.current,"".concat(o,'["').concat(s,'"]'),l):o?void m()(n.current,"".concat(o,'["').concat(s,'"].').concat(a),l):void m()(n.current,a,l);d[p.id]=p.clone().setValue(I(i.current.interceptors,"input",p.interceptor)(l)),t(d),c&&u({id:p.id})}})({setFormState:t,formStateRef:r,initDataRef:i,formDataRef:o,taskQueue:n,emitter:e,otherProps:p})),e.addListener("form-data-set-field-list",M({setFormState:t,formStateRef:r,initDataRef:i,formDataRef:o,taskQueue:n,emitter:e,otherProps:p})),e.addListener("form-data-set-field-validate",(e=>{let{setFormState:t,formStateRef:r,emitter:n}=e;return e=>{let{name:a,groupName:o,groupIndex:s,validate:i}=e;const u=Object.assign({},r.current),l=y(u,{name:a,groupName:o,groupIndex:s});if(!l)return void console.error("\u672a\u627e\u5230\u8981\u6c42\u5b57\u6bb5");const c=l.clone();c.setValidateStatus(i),t(Object.assign({},u,{[c.id]:c})),n.emit("form-field-validate-complete",{id:c.id,name:c.name,value:c.value,index:c.groupIndex,validate:c.validate})}})({setFormState:t,formStateRef:r,emitter:e})),e.addListener("form-validate-all",N({formStateRef:r,taskQueue:n,emitter:e})),e.addListener("form-submit",(e=>{let{formStateRef:t,formDataRef:r,taskQueue:n,otherProps:a,emitter:o}=e;const s=N({formStateRef:t,taskQueue:n,emitter:o});return e=>{Array.isArray(e)||(e=[e]);const{onPrevSubmit:n,onError:i,onComplete:u,onSubmit:l,noFilter:c}=a.current;s().then((async()=>{const a=t.current;if(!k(a)){const t=A(a);return o.emit("form-submit-error",t),i&&await i(t,...e),!1}const s=!0===c?r.current:V(r.current);return o.emit("form-prev-submit"),n&&!1===await n(s,...e)?(o.emit("form-prev-submit-error"),!1):(l&&await l(s,...e),o.emit("form-submit-success",s),!0)})).then((e=>{o.emit("form-submit-end",e)}),(t=>(console.error(t),o.emit("form-error",t),i&&i(t,...e)))).then((()=>{const e=t.current,n=k(e),a=!0===c?r.current:V(r.current),s=A(e);return o.emit("form-submit-complete",{formData:a,isPass:n,errors:s}),u&&u({formData:a,isPass:n,errors:s})}))}})({formStateRef:r,formDataRef:o,taskQueue:n,otherProps:p,emitter:e})),()=>{e.removeAllListeners()}}),[r,i,p]),(0,a.useMemo)((()=>{d.current.emit("form-data-change",{data:n})}),[n]),c},T={REQ:function(e){return{result:L(e),errMsg:""}},TEL:function(e){return{result:/^1[0-9]{10}$/.test(e),errMsg:"\u8bf7\u8f93\u5165\u6709\u6548\u7684\u624b\u673a\u53f7"}},EMAIL:function(e){return{result:/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e),errMsg:"\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u7bb1"}},LEN:function(e,t,r){return e=e.toString(),r===t&&e.length!==Number(r)?{result:!1,errMsg:"%s\u957f\u5ea6\u5fc5\u987b\u7b49\u4e8e".concat(r)}:e.length<t?{result:!1,errMsg:"%s\u957f\u5ea6\u5fc5\u987b\u5927\u4e8e".concat(t)}:r&&e.length>r?{result:!1,errMsg:"%s\u957f\u5ea6\u5fc5\u987b\u5c0f\u4e8e".concat(r)}:{result:!0}}},_=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object.assign(T,e)},q=(0,a.createContext)(),{Provider:G}=q,U=()=>(0,a.useContext)(q),z=(e,t)=>"".concat(e,"@").concat(t),Z=e=>{let{children:t}=e;const r=(0,a.useMemo)((()=>(0,s.uniqueId)("group_")),[]),n=U(),[i,u]=(0,a.useState)({}),{emitter:l}=S();return(0,a.useEffect)((()=>{const e=l.addListener("form-group-add",(e=>{let{id:t,parentId:r,name:n}=e;u((e=>{const a=Object.assign({},e),o=z(r,n);a[o]||(a[o]=[]);const s=a[o].slice(0);return s.push(t),a[o]=s,a}))})),t=l.addListener("form-group-remove",(e=>{let{id:t,parentId:r,name:n}=e;u((e=>{const a=Object.assign({},e),o=z(r,n),s=a[o].slice(0),i=s.indexOf(t);return s.splice(i,1),a[o]=s,a}))}));return()=>{e.remove(),t.remove()}}),[l]),o().createElement(G,{value:Object.assign({},n,{id:r,groupMap:i})},t)},H=e=>{let{name:t,children:r}=e;const{formIsMount:n,emitter:i}=S(),u=(0,a.useMemo)((()=>(0,s.uniqueId)("group_")),[]),{id:l,index:c,groupMap:m,name:d}=U(),f=(0,a.useMemo)((()=>(0,s.get)(m,z(l,t),[]).indexOf(u)),[u,l,m,t]),p=(0,a.useMemo)((()=>f>-1&&d?"".concat(d,"[").concat(c,"].").concat(t):t),[d,t,f,c]);return(0,a.useEffect)((()=>{let e=!1;return n&&(e=!0,i.emit("form-group-add",{id:u,parentId:l,name:t})),()=>{e&&i.emit("form-group-remove",{id:u,parentId:l,name:t})}}),[n,i,u,l,t]),o().createElement(G,{value:{id:u,name:p,groupMap:m,index:f}},r)},$=U,K=(0,a.forwardRef)(((e,t)=>{const{formState:r,formStateRef:n,formData:i,fields:u,isPass:l,isPassRef:c,formDataRef:m,setFormState:d}=(e=>{const[t,r]=(0,a.useState)({}),n=(0,a.useRef)({});n.current=t;const o=(0,a.useRef)({});o.current=e;const i=(0,a.useMemo)((()=>Object.values(t).map((e=>({field:e.fieldRef,label:e.label,name:e.name,rule:e.rule})))),[t]),u=(0,a.useMemo)((()=>k(t)),[t]),l=(0,a.useMemo)((()=>{const e={};return Object.values(t).forEach((t=>{if(!t.name)return;const r=I(o.current.interceptors,"output",t.interceptor)(t.value);t.groupName&&(0,s.last)(t.groupName.split("."))===t.name?(0,s.set)(e,"".concat(t.groupName,"[").concat(t.groupIndex,"]"),r):t.groupName?(0,s.set)(e,"".concat(t.groupName,"[").concat(t.groupIndex,"].").concat(t.name),r):(0,s.set)(e,t.name,r)})),e}),[t]),c=(0,a.useRef)({});return c.current=l,{fields:i,isPass:u,formData:l,formDataRef:c,formState:t,formStateRef:n,setFormState:e=>{n.current=e,r(e)}}})(e),f=(0,a.useRef)(e.data),[p,g]=(0,a.useState)(!1),v=Object.assign({},T,e.rules),h=B({onPrevSubmit:e.onPrevSubmit,rules:v,interceptors:e.interceptors,noFilter:e.noFilter,onError:e.onError,onSubmit:e.onSubmit,debug:e.debug,formState:r,formStateRef:n,formData:i,isPassRef:c,formDataRef:m,setFormState:d,initDataRef:f}),R=(0,a.useRef)(h);R.current=h,(0,a.useEffect)((()=>(g(!0),f.current&&R.current.emit("form-data-set",{data:f.current}),R.current.emit("form-mount"),()=>{R.current.emit("form-unmount")})),[]);const S=(e=>{let{emitter:t,fields:r,formState:n,formData:o,isPass:s}=e;return(0,a.useMemo)((()=>({emitter:t,submit:function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];t.emit("form-submit",r)},get isPass(){return s},get data(){return o},get fields(){return r},get formState(){return n},set data(e){t.emit("form-data-set",{data:e})},get errors(){return A(n)},reset(){t.emit("form-data-reset")},onReady(e){t.addListener("form-mount",(()=>{e&&e()}))},onDestroy(e){t.addListener("form-unmount",(()=>{e&&e()}))},validateField(e){let{name:r,groupName:n,groupIndex:a}=e;t.emit("form-field-validate",{name:r,groupName:n,groupIndex:a})},validateAll:()=>new Promise((e=>{t.emit("form-validate-all",{callback:t=>{let{formState:r}=t;e({isPass:k(r),errors:A(r)})}})})),setFormData:function(e){let r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t.emit("form-data-set",{data:e,runValidate:r})},getFormData:()=>o,setFieldValidate(e){let{name:r,validate:n,groupName:a,groupIndex:o}=e;t.emit("form-data-set-field-validate",{name:r,groupName:a,groupIndex:o,validate:n})},setField(e){let{name:r,value:n,groupName:a,groupIndex:o,validate:s,runValidate:i=!0}=e;t.emit("form-data-set-field-list",[{name:r,groupName:a,groupIndex:o,value:n,validate:s}],{runValidate:i})},setFields(e,r){t.emit("form-data-set-field-list",e,r)}})),[t,r,n,s,o])})({emitter:h,fields:u,formState:r,setFormState:d,formData:i,isPass:l});return(0,a.useImperativeHandle)(t,(()=>S),[S]),o().createElement(b,{value:{formState:r,formData:i,setFormState:d,emitter:h,fields:u,isPass:l,formIsMount:p,initDataRef:f,openApi:S}},o().createElement(Z,null,e.children))}));K.defaultProps={data:{},debug:!1,rules:{},interceptors:{}};const J=(e,t)=>{if((e=>window.Event&&(e instanceof window.Event||(0,s.get)(e,"nativeEvent")instanceof window.Event||"function"===typeof(0,s.get)(e,"preventDefault")))(e)){if(void 0===t)switch(e.target.type){case"checkbox":case"radio":t=e.target.checked;break;default:t=e.target.value}}else t=e;return t},W=["name","rule","label","interceptor","noTrim","debounce","onChange","value","errMsg"],X=e=>{let{name:t,rule:r,label:n,interceptor:o,noTrim:i,debounce:u=0,onChange:l,value:c,errMsg:m}=e,d=O(e,W);const f=$(),p=(0,s.get)(f,"name"),g=(0,s.get)(f,"index"),{formState:h,formData:b}=S(),R=(0,a.useMemo)((()=>(0,s.uniqueId)("".concat(t,"_"))),[t]),x=(0,s.get)(h,R),P=(e=>{let{name:t,rule:r,label:n,interceptor:o,noTrim:s,value:i,id:u,groupName:l,groupIndex:c,errMsg:m}=e;const d=(0,a.useRef)(null),{formIsMount:f,emitter:p}=S();return(0,a.useEffect)((()=>{let e=!1;return f&&(e=!0,p.emit("form-field-add",{name:t,id:u})),()=>{e&&p.emit("form-field-remove",{id:u})}}),[f,p,t,u]),(0,a.useEffect)((()=>{f&&-1!==c&&p.emit("form-field-edit",{name:t,rule:r,label:n,interceptor:o,noTrim:s,id:u,groupName:l,groupIndex:c,value:i,fieldRef:d,errMsg:m})}),[f,p,t,r,n,o,s,u,l,c,i,d,m]),d})({name:t,rule:r,label:n,interceptor:o,noTrim:i,value:c,id:R,groupName:p,groupIndex:g,errMsg:m}),I=(e=>{let{name:t,id:r,time:n}=e;const{formIsMount:o,emitter:s}=S(),i=()=>{o&&s.emit("form-field-validate",{name:t,id:r})},u=(0,v.yK)(i,n),l=u.cancel;return(0,a.useEffect)((()=>{const e=s.addListener("form-data-reset",l);return()=>{e&&e.remove()}}),[s,l]),n?u:i})({name:t,id:R,time:u}),{isValueChanged:k,onChange:C}=(e=>{let{name:t,id:r,onChange:n}=e;const{emitter:o}=S(),[s,i]=(0,a.useState)(!1);return{isValueChanged:s,onChange:function(){n&&n(...arguments),i(!0);const e=J(...arguments);o.emit("form-field-data-change",{name:t,value:e,id:r})}}})({name:t,id:R,onChange:l});return F({},d,{id:R,name:t,label:n,fieldRef:P,formData:b,formState:h,rule:r,groupName:p,groupIndex:g,onChange:C,isValueChanged:k,value:(0,s.get)(x,"value"),triggerValidate:I,errState:(0,s.get)(x,"validate.status",0),errMsg:w(m||(0,s.get)(x,"validate.msg",""),n)})},Y=()=>{const{emitter:e}=S();return{onClick:(0,a.useCallback)((()=>{e.emit("form-data-reset")}),[e])}},ee=e=>{const[t,r]=(0,a.useState)(!1),{isPass:n,emitter:o}=S(),{onClick:s}=Object.assign({},e);return(0,a.useEffect)((()=>{const e=o.addListener("form-submit-complete",(()=>{r(!1)}));return()=>{e&&e.remove()}}),[o]),{isLoading:t,isPass:n,onClick:(0,a.useCallback)((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];r(!0),setTimeout((()=>{Promise.resolve(s&&s(...t)).then((e=>{o.emit("form-submit",e||t)}),(()=>{r(!1)}))}),0)}),[o,r])}},te=(0,a.createContext)({}),{Provider:re}=te,ne=e=>{let{children:t}=e;const{index:r}=U();return t({index:r})},ae=(0,a.forwardRef)(((e,t)=>{let{name:r,defaultLength:n,empty:i,children:u}=e;const[l,c]=(0,a.useState)([]),{initDataRef:m,emitter:d}=S(),f=U()||{},{name:p,index:g}=f,v=(0,a.useMemo)((()=>g>-1&&p?"".concat(p,"[").concat(g,"]"):""),[p,g]),h=(0,a.useRef)(f);h.current=f;const b=(0,a.useRef)();b.current=v?"".concat(v,".").concat(r):r;const R=(0,a.useRef)(n);(0,a.useEffect)((()=>{const e=e=>{const t=h.current.id,r=(e,r)=>t?"".concat(t,"-").concat(r):r;return Number.isInteger(R.current)&&R.current>0&&!(Array.isArray(e)&&e.length>=R.current)?(0,s.range)(0,R.current).map(r):Array.isArray(e)?e.map(r):[]};c((()=>{const t=(0,s.get)(m.current,v?"".concat(v,".").concat(r):r);return e(t)}));const t=d.addListener("form-data-set",(t=>{let{data:n}=t;c((()=>{const t=(0,s.get)(n,v?"".concat(v,".").concat(r):r);return e(t)}))}));return()=>{t.remove()}}),[d,v,r]);const x=(0,a.useCallback)((e=>{const{isUnshift:t}=Object.assign({},e),r=h.current.id;c((e=>{if(0===e.length)return["".concat(r,"-0")];const n=e.slice(0),a=Math.max(parseInt((0,s.last)(e[0].split("-"))),parseInt((0,s.last)((0,s.last)(e).split("-"))))+1;return n[t?"unshift":"push"](r?"".concat(r,"-").concat(a):a),n}))}),[]),P=(0,a.useCallback)((e=>{c((t=>{const r=t.indexOf(e),n=(0,s.get)(m.current,b.current);Array.isArray(n)&&n.splice(r,1);const a=t.slice(0);return a.splice(r,1),a}))}),[]);return(0,a.useImperativeHandle)(t,(()=>({onAdd:x,onRemove:P}))),o().createElement(re,{value:{onAdd:x,onRemove:P}},0===l.length?i:l.map((e=>o().createElement(H,{key:e,name:r},o().createElement(ne,null,(t=>{let{index:r}=t;return u(e,{index:r,length:l.length,onAdd:x,onRemove:()=>P(e)})}))))))}));ae.defaultProps={empty:null},ae.useAction=()=>(0,a.useContext)(te);const oe={isNotEmpty:L,isEmpty:e=>!L(e),filterEmpty:V,stateToIsPass:k,stateToError:A,compileErrMsg:w,getField:y},se=oe,ie={name:"react-form",summary:"<h4>\u7279\u70b9</h4>\n<ul>\n<li>UI\u5206\u79bb\uff0c\u652f\u6301\u81ea\u5b9a\u4e49UI\u6846\u67b6\u3002\u63d0\u4f9b\u4e86antd\u7684\u7ec4\u4ef6\u5c01\u88c5 @kne/react-form-antd \u548c taro\u7684\u7ec4\u4ef6\u5c01\u88c5 @kne/react-form-taro</li>\n<li>\u5206\u7ea7\u6821\u9a8c\u89c4\u5219\u914d\u7f6e\uff0c\u6821\u9a8c\u89c4\u5219\u652f\u6301\u5f02\u6b65\u6821\u9a8c</li>\n<li>\u4e8b\u4ef6\u9a71\u52a8\uff0c\u65b9\u4fbf\u7075\u6d3b\u6269\u5c55\u3002\u53ef\u4ee5\u901a\u8fc7debug\u9009\u9879\u914d\u7f6e\uff0c\u901a\u8fc7\u89e6\u53d1\u4e8b\u4ef6\u987a\u5e8f\u548c\u53c2\u6570\u8f7b\u677e\u8c03\u8bd5</li>\n<li>\u652f\u6301\u5305\u542bGroup\u7684\u590d\u6742\u8868\u5355\uff0c\u5b50\u8868\u5355</li>\n</ul>",description:"\u7528\u4e8e\u8868\u5355\u9a8c\u8bc1\u7684react\u7ec4\u4ef6",packageName:"@kne/react-form",api:"",example:{isFull:!1,className:"react_form_5f21f",style:"",list:[{title:"\u8fd9\u91cc\u586b\u5199\u793a\u4f8b\u6807\u9898",description:"\u8fd9\u91cc\u586b\u5199\u793a\u4f8b\u8bf4\u660e",code:"const { default: Form, useField, useSubmit, useReset } = reactForm;\n\nconst Input = props => {\n  const fieldProps = useField(props);\n  return (<div>\n    {fieldProps.label}\n    <input ref={fieldProps.fieldRef} type='text' value={fieldProps.value || ''} onChange={fieldProps.onChange}\n           onBlur={fieldProps.triggerValidate} />\n    {fieldProps.errState}\n    {fieldProps.errMsg}\n  </div>);\n};\n\nconst SubmitButton = ({ children }) => {\n  const { isLoading, onClick } = useSubmit();\n  return (<button onClick={onClick}>\n    {children}\n    {isLoading ? '\u6b63\u5728\u63d0\u4ea4\u4e2d...' : ''}\n  </button>);\n};\n\nconst ResetButton = () => {\n  const { onClick } = useReset();\n  return <button onClick={onClick}>\u91cd\u7f6e</button>;\n};\n\nconst Example = ()=>{\n  return <Form>\n    <Input name=\"name\" label=\"\u540d\u79f0\" rule=\"REQ LEN-0-10\"/>\n    <div>\n      <SubmitButton>\u63d0\u4ea4</SubmitButton>\n      <ResetButton>\u91cd\u7f6e</ResetButton>\n    </div>\n  </Form>\n};\n\nrender(<Example />);\n\n",scope:[{name:"reactForm",packageName:"@kne/react-form",component:n}]},{title:"\u5c55\u793a\u4e86GroupList\u7684\u4f7f\u7528",description:"\u8fd9\u91cc\u586b\u5199\u793a\u4f8b\u8bf4\u660e",code:"const { default: Form, useField, useSubmit, useReset, GroupList } = reactForm;\n\nconst {useRef} = React;\n\nconst Input = props => {\n  const fieldProps = useField(props);\n  return (<div>\n    {fieldProps.label}\n    <input ref={fieldProps.fieldRef} type='text' value={fieldProps.value || ''} onChange={fieldProps.onChange}\n           onBlur={fieldProps.triggerValidate} />\n    {fieldProps.errState}\n    {fieldProps.errMsg}\n  </div>);\n};\n\nconst SubmitButton = ({ children }) => {\n  const { isLoading, onClick } = useSubmit();\n  return (<button onClick={onClick}>\n    {children}\n    {isLoading ? '\u6b63\u5728\u63d0\u4ea4\u4e2d...' : ''}\n  </button>);\n};\n\nconst ResetButton = () => {\n  const { onClick } = useReset();\n  return <button onClick={onClick}>\u91cd\u7f6e</button>;\n};\n\nconst InputComputed = () => {\n  return <Input name=\"field3\" label=\"\u5b57\u6bb53\" />;\n};\n\nconst GroupInner = () => {\n  const groupListRef2 = useRef(null);\n  return <div>\n    <button\n      onClick={() => {\n        groupListRef2.current.onAdd();\n      }}>\n      \u6dfb\u52a0\n    </button>\n    <GroupList ref={groupListRef2} name=\"group2\">\n      {(key, { onRemove }) => (<div>\n        <Input name=\"field2\" label=\"\u5b57\u6bb5\"/>\n        <InputComputed/>\n        <button onClick={() => onRemove(key)}>\u5220\u9664</button>\n      </div>)}\n    </GroupList>\n  </div>;\n};\n\nconst Example = () => {\n  return <Form>\n    <Input name='name' label='\u540d\u79f0' rule='REQ LEN-0-10' />\n    <GroupInner />\n    <div>\n      <SubmitButton>\u63d0\u4ea4</SubmitButton>\n      <ResetButton>\u91cd\u7f6e</ResetButton>\n    </div>\n  </Form>;\n};\n\nrender(<Example />);\n\n",scope:[{name:"reactForm",packageName:"@kne/react-form",component:n}]}]}}}}]);
//# sourceMappingURL=304.b090d66d.chunk.js.map