(this["webpackJsonpreact-form-example"]=this["webpackJsonpreact-form-example"]||[]).push([[0],{199:function(e,t,r){"use strict";r.r(t);r(91);var n=r(0),a=r.n(n),u=r(82),i=r.n(u),o=r(19),c=r(13),s=r(14),f=r(9),l=r.n(f),m=r(83),d=r(84),v=r(29),p=r(11),b=r(10),g=r(30),j=r.n(g),O=r(85),h=r(2),x=r.n(h),R=r(86),S=r.n(R),y=r(31),k=r.n(y),P=r(54),E=r.n(P),C=r(87),D=r.n(C),M=r(3),I=r.n(M),F=r(90),N=r(89),w=r.n(N),L=r(32),A=r.n(L),V=r(201),Q=Object(n.createContext)({}),T=Q.Provider,q=(Q.Consumer,function(){return Object(n.useContext)(Q)}),z={input:[],output:[]};z.input.use=function(e,t){return z.input.push({name:e,exec:t})},z.output.use=function(e,t){return z.output.push({name:e,exec:t})};var _=z,J=function(e,t,r){Array.isArray(r)||(r=[r]);var n=S()(_[t].concat(x()(e,t,[])).filter((function(e){var t=e.name;return r.indexOf(t)>-1})).reverse(),(function(e){return e.name}));return 0===n.length?function(e){return e}:O.a.apply(void 0,Object(b.a)(n.map((function(e){return e.exec}))))},U=function(e){if(E()(e)){var t=D()(e);return t.length>0&&t.some((function(e){return!!e}))}return I()(e)?e.length>0:"number"===typeof e?!isNaN(e):!(void 0===e||null===e||""===e||0===e.length)},Z=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(I()(t))return t.map((function(t){return e(t)}));if(E()(t)){var r={};return Object.keys(t).forEach((function(n){var a=e(t[n]);U(a)&&(r[n]=a)})),r}return t};function B(){return(B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function H(e,t){if(null==e)return{};var r,n,a={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}var $=function(){var e=Object(v.a)(l.a.mark((function e(t){var r,n,a,u,i,o,c,s,f,v,p,g,j,O;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.field,n=t.value,a=t.formRules,u=t.getFormData,"function"!==typeof r.rule){e.next=5;break}return e.next=4,r.rule(n);case 4:return e.abrupt("return",e.sent);case 5:if(!("object"===typeof r.rule&&r.rule instanceof RegExp)){e.next=7;break}return e.abrupt("return",{result:r.rule.test(n),errMsg:""});case 7:if("string"!==typeof r.rule){e.next=39;break}i=r.rule.split(" ").filter((function(e){return e.length>0})),o=Object(d.a)(i),e.prev=10,o.s();case 12:if((c=o.n()).done){e.next=31;break}if(s=c.value,f=s.split("-"),v=Object(m.a)(f),p=v[0],g=v.slice(1),"function"!==typeof(j=a[p.toUpperCase()])){e.next=28;break}if("REQ"===s){e.next=21;break}if(!0===a.REQ.apply(a,[n].concat(Object(b.a)(g),[u()])).result){e.next=21;break}return e.abrupt("return",{result:!0,errMsg:""});case 21:return e.next=23,j.apply(void 0,[n].concat(Object(b.a)(g),[u()]));case 23:if(!0===(O=e.sent).result){e.next=26;break}return e.abrupt("return",{result:!1,errMsg:O.errMsg});case 26:e.next=29;break;case 28:console.error("\u6821\u9a8c\u89c4\u5219".concat(s,"\u4e0d\u5728\u5f53\u524dform\u7684rules\u91cc\u9762\uff0c\u8bf7\u786e\u8ba4").concat(r.name,"\u7684\u6821\u9a8c\u89c4\u5219").concat(r.rule,"\u662f\u5426\u6b63\u786e"));case 29:e.next=12;break;case 31:e.next=36;break;case 33:e.prev=33,e.t0=e.catch(10),o.e(e.t0);case 36:return e.prev=36,o.f(),e.finish(36);case 39:return e.abrupt("return",{result:!0,errMsg:""});case 40:case"end":return e.stop()}}),e,null,[[10,33,36,39]])})));return function(t){return e.apply(this,arguments)}}(),G=function(){function e(t){var r=t.id,n=t.name;Object(c.a)(this,e),this.id=r,this.name=n,this.isPass=!1}return Object(s.a)(e,[{key:"setInfo",value:function(e){var t=e.groupName,r=e.groupIndex,n=e.label,a=e.rule,u=e.interceptor,i=e.noTrim,o=e.fieldRef;return this.groupName=t,this.groupIndex=r,this.label=n,this.rule=a,this.interceptor=u,this.noTrim=i,this.fieldRef=o,this}},{key:"deleteValue",value:function(){return delete this.value,this}},{key:"setValue",value:function(e){return this.value=e,this}},{key:"clone",value:function(){return w()(this)}},{key:"setValidateStatus",value:function(e){var t=e.status,r=e.msg,n=void 0===r?"":r;return this.validate={status:t,msg:n},this}},{key:"runValidate",value:function(){var e=Object(v.a)(l.a.mark((function e(t,r){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$({field:{name:this.name,rule:this.rule},value:this.value,formRules:t,getFormData:r});case 2:return n=e.sent,this.isPass=n.result,this.validate={status:!0===n.result?1:2,msg:n.errMsg},e.abrupt("return",this);case 6:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()}]),e}(),K=function(){function e(t){var r=this,n=t.id,a=t.runner,u=t.complete;Object(c.a)(this,e),this.id=n,this.isCancel=!1,this.target=Promise.race([Promise.resolve(a()),new Promise((function(e){r.resolve=e}))]).then((function(e){return r.isCancel?new Promise((function(){})):e})),this.target.then((function(){return Promise.resolve(u.apply(void 0,arguments))}))}return Object(s.a)(e,[{key:"cancel",value:function(){!0!==this.isCancel&&(this.isCancel=!0,this.resolve.apply(this,arguments))}}]),e}(),W=function(){function e(){Object(c.a)(this,e),this.queue=[]}return Object(s.a)(e,[{key:"append",value:function(e){var t=this,r=new Proxy(e.complete,{apply:function(e,r,a){var u=e.apply(r,a),i=t.queue.indexOf(n);return t.queue.splice(i,1),u}});e.complete=r;var n=new K(e),a=this.queue.find((function(e){var t=e.id;return n.id===t}));if(a){var u=this.queue.indexOf(a);a.cancel(),this.queue.splice(u,1)}this.queue.push(n)}}]),e}(),X=function(e){var t=e.formStateRef,r=e.taskQueue,n=e.emitter;return function(){return Object.values(t.current).forEach((function(e){n.emit("form-field-validate",{id:e.id})})),Promise.all(r.queue.map((function(e){return e.target})))}},Y=["debug","formStateRef","formDataRef","isPassRef","initDataRef"],ee=function(e){var t=e.debug,r=e.formStateRef,a=e.formDataRef,u=e.isPassRef,i=e.initDataRef,c=H(e,Y),s=Object(F.a)({debug:t,name:"react-form"}),f=Object(n.useRef)(s);f.current=s;var m=function(e){var t=Object(n.useRef)({});return Object.keys(e).forEach((function(r){t.current[r]=e[r]})),t}(c);return m.current=c,Object(n.useEffect)((function(){var e=f.current,t=m.current.setFormState,n=new W;return e.addListener("form-field-add",function(e){var t=e.formStateRef,r=e.setFormState;return function(e){var n=e.id,a=e.name,u=new G({id:n,name:a});r(Object.assign({},t.current,Object(o.a)({},n,u)))}}({formStateRef:r,setFormState:t})),e.addListener("form-field-edit",function(e){var t=e.formStateRef,r=e.setFormState,n=e.initDataRef,a=e.otherProps;return function(e){var u=e.id,i=e.name,c=e.rule,s=e.label,f=e.interceptor,l=e.value,m=e.noTrim,d=e.groupName,v=e.groupIndex,p=e.fieldRef,b=t.current[u].clone();b.setInfo({groupName:d,groupIndex:v,label:s,rule:c,interceptor:f,noTrim:m,fieldRef:p}),b.setValue(J(a.current.interceptors,"input",f)(l||(d&&k()(d.split("."))===i?x()(n.current,"".concat(d,'["').concat(v,'"]')):d?x()(n.current,"".concat(d,'["').concat(v,'"].').concat(i)):x()(n.current,i)))),r(Object.assign({},t.current,Object(o.a)({},u,b)))}}({formStateRef:r,setFormState:t,initDataRef:i,otherProps:m})),e.addListener("form-field-remove",function(e){var t=e.formStateRef,r=e.setFormState;return function(e){var n=e.id,a=Object.assign({},t.current);delete a[n],r(a)}}({formStateRef:r,setFormState:t})),e.addListener("form-field-validate",function(e){var t=e.formStateRef,r=e.formDataRef,n=e.setFormState,a=e.otherProps,u=e.taskQueue,i=e.emitter,c=function(e){n(Object.assign({},t.current,Object(o.a)({},e.id,e)))};return function(e){var n=e.id,o=t.current[n].clone();o.setValidateStatus({status:3}),c(o);var s=o.value;"string"===typeof o.value&&!0!==o.noTrim&&(s=o.value.trim(),o.value!==s&&i.emit("form-field-data-change",{id:n,value:s})),u.append({id:n,runner:function(){return o.runValidate(a.current.rules,(function(){return r.current}))},complete:function(){c(o),i.emit("form-field-validate-complete",{id:n,name:o.name,value:s,index:o.groupIndex,validate:o.validate})}})}}({formStateRef:r,formDataRef:a,setFormState:t,otherProps:m,taskQueue:n,emitter:e})),e.addListener("form-field-data-change",function(e){var t=e.formStateRef,r=e.setFormState;return function(e){var n=e.id,a=e.value,u=t.current[n].clone();u.setValue(a),u.setValidateStatus({status:0}),r(Object.assign({},t.current,Object(o.a)({},n,u)))}}({formStateRef:r,setFormState:t})),e.addListener("form-data-set",function(e){var t=e.setFormState,r=e.formStateRef,n=e.initDataRef,a=e.otherProps,u=e.taskQueue,i=e.emitter,o=X({formStateRef:r,taskQueue:u,emitter:i});return function(e){var u=e.data,i=e.runValidate,c=void 0===i||i;n.current=u;var s={};Object.values(Object.assign({},r.current)).forEach((function(e){var t=e.clone(),r=t.groupName,n=t.groupIndex,i=t.name,o=r&&k()(r.split("."))===i?x()(u,"".concat(r,"[").concat(n,"]")):r?x()(u,"".concat(r,"[").concat(n,"].").concat(i)):x()(u,i);t.setValue(J(a.current.interceptors,"input",e.interceptor)(o)),s[t.id]=t})),t(s),c&&o()}}({setFormState:t,formStateRef:r,initDataRef:i,otherProps:m,taskQueue:n,emitter:e})),e.addListener("form-data-reset",function(e){var t=e.initDataRef,r=e.setFormState,n=e.formStateRef;return function(){t.current={};var e=Object.assign({},n.current),a={};Object.keys(e).forEach((function(e){var t=e.clone();t.deleteValue(),a[e.id]=t})),r(a)}}({initDataRef:i,setFormState:t,formStateRef:r})),e.addListener("form-data-set-field",function(e){var t=e.setFormState,r=e.formStateRef,n=e.otherProps;return function(e){var a=e.name,u=e.groupName,i=e.groupIndex,o=e.value,c=Object.assign({},r.current);if(u){var s=c.find((function(e){return e.name===a&&e.groupName===u&&e.groupIndex===i}));c[s.id]=s.clone().setValue(J(n.current.interceptors,"input",s.interceptor)(o))}else{var f=c.find((function(e){return e.name===a}));c[f.id]=f.clone().setValue(J(n.current.interceptors,"input",f.interceptor)(o))}t(c)}}({setFormState:t,formStateRef:r,otherProps:m})),e.addListener("form-submit",function(e){var t=e.formStateRef,r=e.formDataRef,n=e.isPassRef,a=e.taskQueue,u=e.otherProps,i=e.emitter,o=X({formStateRef:t,taskQueue:a,emitter:i});return function(e){Array.isArray(e)||(e=[e]);var a=u.current,c=a.onPrevSubmit,s=a.onError,f=a.onSubmit;o().then(Object(v.a)(l.a.mark((function a(){var u,o,m;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(u=t.current,n.current){a.next=10;break}if(o=Object.values(u).filter((function(e){return 2===e.validate.status})).map((function(e){return Object.assign({},e.validate,{name:e.name,groupName:e.groupName,fieldRef:e.fieldRef,groupIndex:e.groupIndex})})),i.emit("form-submit-error",o),a.t0=s,!a.t0){a.next=9;break}return a.next=9,s.apply(void 0,[o].concat(Object(b.a)(e)));case 9:return a.abrupt("return",!1);case 10:if(m=r.current,i.emit("form-prev-submit"),a.t1=c,!a.t1){a.next=18;break}return a.next=16,c.apply(void 0,[m].concat(Object(b.a)(e)));case 16:a.t2=a.sent,a.t1=!1===a.t2;case 18:if(!a.t1){a.next=21;break}return i.emit("form-prev-submit-error"),a.abrupt("return",!1);case 21:if(a.t3=f,!a.t3){a.next=25;break}return a.next=25,f.apply(void 0,[m].concat(Object(b.a)(e)));case 25:return i.emit("form-submit-success",m),a.abrupt("return",!0);case 27:case"end":return a.stop()}}),a)})))).then((function(e){i.emit("form-submit-end",e)}),(function(e){console.error(e),i.emit("form-error",e)})).then((function(){i.emit("form-submit-complete")}))}}({formStateRef:r,formDataRef:a,isPassRef:u,taskQueue:n,otherProps:m,emitter:e})),function(){e.removeAllListeners()}}),[r,i,m]),s},te={REQ:function(e){return{result:U(e),errMsg:""}},TEL:function(e){return{result:/^1[0-9]{10}$/.test(e),errMsg:"\u8bf7\u8f93\u5165\u6709\u6548\u7684\u624b\u673a\u53f7"}},EMAIL:function(e){return{result:/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e),errMsg:"\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u7bb1"}},LEN:function(e,t,r){return e=e.toString(),r===t&&e.length!==Number(r)?{result:!1,errMsg:"%s\u957f\u5ea6\u5fc5\u987b\u7b49\u4e8e".concat(r)}:e.length<t?{result:!1,errMsg:"%s\u957f\u5ea6\u5fc5\u987b\u5927\u4e8e".concat(t)}:r&&e.length>r?{result:!1,errMsg:"%s\u957f\u5ea6\u5fc5\u987b\u5c0f\u4e8e".concat(r)}:{result:!0}}},re=Object(n.createContext)(),ne=re.Provider,ae=function(){return Object(n.useContext)(re)},ue=function(e){var t=e.children,r=Object(n.useMemo)((function(){return Symbol(A()("group_"))}),[]),u=Object(n.useState)({}),i=Object(p.a)(u,2),o=i[0],c=i[1],s=q().emitter;return Object(n.useEffect)((function(){var e=s.addListener("form-group-add",(function(e){var t=e.id,r=e.parentId;c((function(e){var n=Object.assign({},e);n[r]||(n[r]=[]);var a=n[r].slice(0);return a.push(t),n[r]=a,n}))})),t=s.addListener("form-group-remove",(function(e){var t=e.id,r=e.parentId;c((function(e){var n=Object.assign({},e),a=n[r].slice(0),u=a.indexOf(t);return a.splice(u,1),n[r]=a,n}))}));return function(){e.remove(),t.remove()}}),[s]),a.a.createElement(ne,{value:{id:r,groupMap:o}},t)},ie=function(e){var t=e.name,r=e.children,u=q(),i=u.formIsMount,o=u.emitter,c=Object(n.useMemo)((function(){return Symbol(A()("group_"))}),[]),s=ae(),f=s.id,l=s.index,m=s.groupMap,d=s.name,v=Object(n.useMemo)((function(){return x()(m,f,[]).indexOf(c)}),[c,f,m]),p=Object(n.useMemo)((function(){return v>-1&&d?"".concat(d,"[").concat(l,"].").concat(t):t}),[d,t,v,l]);return Object(n.useEffect)((function(){var e=!1;return i&&(e=!0,o.emit("form-group-add",{id:c,parentId:f})),function(){e&&o.emit("form-group-remove",{id:c,parentId:f})}}),[i,o,c,f]),a.a.createElement(ne,{value:{id:c,name:p,groupMap:m,index:v}},r)},oe=ae,ce=Object(n.forwardRef)((function(e,t){var r=function(e){var t=Object(n.useState)({}),r=Object(p.a)(t,2),a=r[0],u=r[1],i=Object(n.useRef)([]);i.current=a;var o=Object(n.useRef)({});o.current=e;var c=Object(n.useMemo)((function(){return Object.values(a).map((function(e){return{field:e.fieldRef,label:e.label,name:e.name,rule:e.rule}}))}),[a]),s=Object(n.useMemo)((function(){return Object.values(a).every((function(e){return e.isPass}))}),[a]),f=Object(n.useRef)(s);f.current=s;var l=Object(n.useMemo)((function(){var t={};return Object.values(a).forEach((function(e){var r=J(o.current.interceptors,"output",e.interceptor)(e.value);e.groupName&&k()(e.groupName.split("."))===e.name?j()(t,"".concat(e.groupName,"[").concat(e.groupIndex,"]"),r):e.groupName?j()(t,"".concat(e.groupName,"[").concat(e.groupIndex,"].").concat(e.name),r):j()(t,e.name,r)})),e.noFilter?t:Z(t)}),[a,e.noFilter]),m=Object(n.useRef)({});return m.current=l,{fields:c,isPass:s,isPassRef:f,formData:l,formDataRef:m,formState:a,formStateRef:i,setFormState:function(e){i.current=e,u(e)}}}(e),u=r.formState,i=r.formStateRef,o=r.formData,c=r.fields,s=r.isPass,f=r.isPassRef,l=r.formDataRef,m=r.setFormState,d=Object(n.useRef)(e.data),v=Object(n.useState)(!1),b=Object(p.a)(v,2),g=b[0],O=b[1],h=Object.assign({},te,e.rules),x=ee({onPrevSubmit:e.onPrevSubmit,rules:h,interceptors:e.interceptors,noFilter:e.noFilter,onError:e.onError,onSubmit:e.onSubmit,debug:e.debug,formState:u,formStateRef:i,formData:o,isPassRef:f,formDataRef:l,setFormState:m,initDataRef:d}),R=Object(n.useRef)(x);R.current=x,Object(n.useEffect)((function(){return O(!0),d.current&&R.current.emit("form-data-set",{data:d.current}),R.current.emit("form-mount"),function(){R.current.emit("form-unmount")}}),[]);var S=function(e){var t=e.emitter,r=e.fields,a=e.formState,u=e.formData,i=e.isPass;return Object(n.useMemo)((function(){return{emitter:t,submit:function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];t.emit("form-submit",r)},get isPass(){return i},get data(){return u},get fields(){return r},get formState(){return a},set data(e){t.emit("form-data-set",{data:e})},reset:function(){t.emit("form-data-reset")},onReady:function(e){t.addListener("form-mount",(function(){e&&e()}))},onDestroy:function(e){t.addListener("form-unmount",(function(){e&&e()}))},validateField:function(e,r){var n=a[e],u=Object.getOwnPropertySymbols(n.data).find((function(e){var t=n.data[e];return!r||r===t.groupName}));u?t.emit("form-field-validate",{name:e,index:u}):console.error("group[".concat(r,"]\u4e2d\u6ca1\u6709\u627e\u5230\u5b57\u6bb5[").concat(e,"]"))},setFieldValidate:function(e){var r=e.name,n=e.value,a=e.groupName,u=e.groupIndex;t.emit("form-data-set-field",{name:r,value:{groupName:a,groupIndex:u,validate:n}})}}}),[t,r,a,i,u])}({emitter:x,fields:c,formState:u,formData:o,isPass:s});return Object(n.useImperativeHandle)(t,(function(){return S}),[S]),a.a.createElement(T,{value:{formState:u,formData:o,setFormState:m,emitter:x,fields:c,isPass:s,formIsMount:g,initDataRef:d,openApi:S}},a.a.createElement(ue,null,e.children))}));ce.defaultProps={data:{},debug:!1,rules:{},interceptors:{}};var se=function(e,t){if(function(e){return e instanceof window.Event||x()(e,"nativeEvent")instanceof window.Event||"function"===typeof x()(e,"preventDefault")}(e)){if(void 0===t)switch(e.target.type){case"checkbox":case"radio":t=e.target.checked;break;default:t=e.target.value}}else t=e;return t},fe=function(e,t){return"string"===typeof e?e.replace("%s",t):e(t)},le=["name","rule","label","interceptor","noTrim","debounce","onChange","value","errMsg"],me=function(e){var t=e.name,r=e.rule,a=e.label,u=e.interceptor,i=e.noTrim,o=e.debounce,c=void 0===o?0:o,s=e.onChange,f=e.value,l=e.errMsg,m=H(e,le),d=oe(),v=x()(d,"name"),b=x()(d,"index"),g=q(),j=g.formState,O=g.formData,h=Object(n.useMemo)((function(){return A()("".concat(t,"_"))}),[t]),R=x()(j,h),S=function(e){var t=e.name,r=e.rule,a=e.label,u=e.interceptor,i=e.noTrim,o=e.value,c=e.id,s=e.groupName,f=e.groupIndex,l=Object(n.useRef)(null),m=q(),d=m.formIsMount,v=m.emitter;return Object(n.useEffect)((function(){var e=!1;return d&&(e=!0,v.emit("form-field-add",{name:t,id:c})),function(){e&&v.emit("form-field-remove",{id:c})}}),[d,v,t,c]),Object(n.useEffect)((function(){d&&-1!==f&&v.emit("form-field-edit",{name:t,rule:r,label:a,interceptor:u,noTrim:i,id:c,groupName:s,groupIndex:f,value:o,fieldRef:l})}),[d,v,t,r,a,u,i,c,s,f,o,l]),l}({name:t,rule:r,label:a,interceptor:u,noTrim:i,value:f,id:h,groupName:v,groupIndex:b}),y=function(e){var t=e.name,r=e.id,a=e.time,u=q().emitter,i=function(){u.emit("form-field-validate",{name:t,id:r})},o=Object(V.a)(i,a),c=o.callback,s=o.cancel;return Object(n.useEffect)((function(){var e=u.addListener("form-data-reset",s);return function(){e&&e.remove()}}),[u,s]),a?c:i}({name:t,id:h,time:c}),k=function(e){var t=e.name,r=e.id,a=e.onChange,u=q().emitter,i=Object(n.useState)(!1),o=Object(p.a)(i,2),c=o[0],s=o[1];return{isValueChanged:c,onChange:function(){a&&a.apply(void 0,arguments),s(!0);var e=se.apply(void 0,arguments);u.emit("form-field-data-change",{name:t,value:e,id:r})}}}({name:t,id:h,onChange:s}),P=k.isValueChanged,E=k.onChange;return B({},m,{id:h,name:t,label:a,fieldRef:S,formData:O,formState:j,rule:r,groupName:v,groupIndex:b,onChange:E,isValueChanged:P,value:x()(R,"value"),triggerValidate:y,errState:x()(R,"validate.status",0),errMsg:fe(l||x()(R,"validate.msg",""),a)})},de=Object(n.createContext)({}),ve=de.Provider,pe=Object(n.forwardRef)((function(e,t){var r=e.name,u=e.empty,i=e.children,o=Object(n.useState)([]),c=Object(p.a)(o,2),s=c[0],f=c[1],l=q(),m=l.initDataRef,d=l.emitter;Object(n.useEffect)((function(){f((function(){return(Array.isArray(m.current[r])?m.current[r]:[]).map((function(e,t){return t}))}));var e=d.addListener("form-data-set",(function(e){var t=e.data;f((function(){return(Array.isArray(t[r])?t[r]:[]).map((function(e,t){return t}))}))}));return function(){e.remove()}}),[d,r]);var v=Object(n.useCallback)((function(){f((function(e){if(0===e.length)return[0];var t=e.slice(0);return t.push(e[e.length-1]+1),t}))}),[]),b=Object(n.useCallback)((function(e){f((function(t){var r=t.indexOf(e),n=t.slice(0);return n.splice(r,1),n}))}),[]);return Object(n.useImperativeHandle)(t,(function(){return{onAdd:v,onRemove:b}})),a.a.createElement(ue,null,a.a.createElement(ve,{value:{onAdd:v,onRemove:b}},0===s.length?u:s.map((function(e){return a.a.createElement(ie,{key:e,name:r},i(e,{onAdd:v,onRemove:b}))}))))}));pe.defaultProps={empty:null},pe.useAction=function(){return Object(n.useContext)(de)};var be=r(1),ge=function(e){var t=me(e);return Object(be.jsxs)(be.Fragment,{children:[t.label,Object(be.jsx)("input",{ref:t.fieldRef,type:"text",value:t.value||"",onChange:t.onChange,onBlur:t.triggerValidate}),t.errState,t.errMsg]})},je=function(e){var t=e.children,r=function(){var e=Object(n.useState)(!1),t=Object(p.a)(e,2),r=t[0],a=t[1],u=q(),i=u.isPass,o=u.emitter;return Object(n.useEffect)((function(){var e=o.addListener("form-submit-complete",(function(){a(!1)}));return function(){e&&e.remove()}}),[o]),{isLoading:r,isPass:i,onClick:Object(n.useCallback)((function(){a(!0);for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];o.emit("form-submit",t)}),[o,a])}}(),a=r.isLoading,u=r.onClick;return Object(be.jsxs)("button",{onClick:u,children:[t,a?"\u6b63\u5728\u63d0\u4ea4\u4e2d...":""]})},Oe=function(){var e=Object(n.useRef)(null),t=Object(n.useRef)(null),r=Object(n.useRef)(null);return Object(be.jsxs)(ce,{debug:!0,ref:r,rules:{RULE:function(e,t){return console.log(t),{result:!0}}},data:{abc:[{field1:"123zzz",field2:"22222",field3:"33333"},{field2:"23232323"}],field:""},onError:function(e){console.log(e[0].fieldRef.current)},onSubmit:function(e,t){return console.log(t),new Promise((function(t){setTimeout((function(){console.log(JSON.stringify(e)),t()}),1e3)}))},children:[Object(be.jsx)(ge,{name:"field",label:"\u5b57\u6bb5",rule:"REQ LEN-0-10 RULE"}),Object(be.jsxs)("div",{children:[Object(be.jsx)("button",{onClick:function(){t.current.onAdd()},children:"\u6dfb\u52a0"}),Object(be.jsx)(pe,{ref:t,name:"group2",children:function(e,t){var r=t.onRemove;return Object(be.jsxs)("div",{children:[Object(be.jsx)(ge,{name:"group2",label:"\u5b57\u6bb5"}),Object(be.jsx)("button",{onClick:function(){return r(e)},children:"\u5220\u9664"})]})}})]}),Object(be.jsxs)("div",{children:[Object(be.jsx)("button",{onClick:function(){e.current.onAdd()},children:"\u6dfb\u52a0"}),Object(be.jsx)(pe,{ref:e,name:"abc",children:function(e,t){var r=t.onRemove;return Object(be.jsxs)("div",{children:[Object(be.jsx)(ge,{name:"field",label:"\u5b57\u6bb5"}),Object(be.jsx)(ge,{name:"field2",label:"\u5b57\u6bb52"}),Object(be.jsx)(ge,{name:"field3",label:"\u5b57\u6bb53"}),Object(be.jsx)("button",{onClick:function(){return r(e)},children:"\u5220\u9664"})]})}})]}),Object(be.jsx)(je,{children:"\u63d0\u4ea4"}),Object(be.jsx)("button",{onClick:function(){r.current.submit("xxxxxxx","aaaaa")},children:"\u70b9\u51fb"})]})},he=function(){return Object(be.jsx)(Oe,{})};i.a.render(Object(be.jsx)(he,{}),document.getElementById("root"))},91:function(e,t,r){}},[[199,1,2]]]);
//# sourceMappingURL=main.fdf21b11.chunk.js.map