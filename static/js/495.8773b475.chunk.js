(self.webpackChunk_kne_components_react_form=self.webpackChunk_kne_components_react_form||[]).push([[495,114],{2876:(t,r,e)=>{"use strict";e.r(r),e.d(r,{default:()=>c});var n=e(49256),i=e(46136),s=e.n(i);const{EventEmitter:o}=s();class u extends o{constructor(t){super();const{debug:r,name:e="event"}=Object.assign({},t);this.debug=r,this.name=e}emit(){for(var t=arguments.length,r=new Array(t),e=0;e<t;e++)r[e]=arguments[e];this.debug&&console.log("[".concat(this.name,"][debug]:"),...r),super.emit(...r)}}const c=t=>{const r=(0,n.useRef)(t);return(0,n.useMemo)((()=>{const t=new u(r.current);return{addListener:function(){return t.addListener(...arguments)},emit:function(){return t.emit(...arguments)},removeAllListeners:function(){return t.removeAllListeners(...arguments)},listeners:function(){return t.listeners(...arguments)},once:function(){return t.once(...arguments)}}}),[])}},46136:(t,r,e)=>{var n={EventEmitter:e(86208),EmitterSubscription:e(35284)};t.exports=n},86208:(t,r,e)=>{"use strict";var n=e(35284),i=e(60968),s=e(68480),o=e(40480),u=function(){function t(){this._subscriber=new i,this._currentSubscription=null}var r=t.prototype;return r.addListener=function(t,r,e){return this._subscriber.addSubscription(t,new n(this._subscriber,r,e))},r.once=function(t,r,e){var n=this;return this.addListener(t,(function(){n.removeCurrentListener(),r.apply(e,arguments)}))},r.removeAllListeners=function(t){this._subscriber.removeAllSubscriptions(t)},r.removeCurrentListener=function(){this._currentSubscription||s(!1),this._subscriber.removeSubscription(this._currentSubscription)},r.listeners=function(t){var r=this._subscriber.getSubscriptionsForType(t);return r?r.filter(o.thatReturnsTrue).map((function(t){return t.listener})):[]},r.emit=function(t){var r=this._subscriber.getSubscriptionsForType(t);if(r){for(var e=Object.keys(r),n=0;n<e.length;n++){var i=r[e[n]];i&&(this._currentSubscription=i,this.__emitToSubscription.apply(this,[i].concat(Array.prototype.slice.call(arguments))))}this._currentSubscription=null}},r.__emitToSubscription=function(t,r){var e=Array.prototype.slice.call(arguments,2);t.listener.apply(t.context,e)},t}();t.exports=u},35284:(t,r,e)=>{"use strict";var n=function(t){var r,e;function n(r,e,n){var i;return(i=t.call(this,r)||this).listener=e,i.context=n,i}return e=t,(r=n).prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e,n}(e(92032));t.exports=n},92032:t=>{"use strict";var r=function(){function t(t){this.subscriber=t}return t.prototype.remove=function(){this.subscriber&&(this.subscriber.removeSubscription(this),this.subscriber=null)},t}();t.exports=r},60968:(t,r,e)=>{"use strict";var n=e(68480),i=function(){function t(){this._subscriptionsForType={},this._currentSubscription=null}var r=t.prototype;return r.addSubscription=function(t,r){r.subscriber!==this&&n(!1),this._subscriptionsForType[t]||(this._subscriptionsForType[t]=[]);var e=this._subscriptionsForType[t].length;return this._subscriptionsForType[t].push(r),r.eventType=t,r.key=e,r},r.removeAllSubscriptions=function(t){void 0===t?this._subscriptionsForType={}:delete this._subscriptionsForType[t]},r.removeSubscription=function(t){var r=t.eventType,e=t.key,n=this._subscriptionsForType[r];n&&delete n[e]},r.getSubscriptionsForType=function(t){return this._subscriptionsForType[t]},t}();t.exports=i},40480:t=>{"use strict";function r(t){return function(){return t}}var e=function(){};e.thatReturns=r,e.thatReturnsFalse=r(!1),e.thatReturnsTrue=r(!0),e.thatReturnsNull=r(null),e.thatReturnsThis=function(){return this},e.thatReturnsArgument=function(t){return t},t.exports=e},68480:t=>{"use strict";var r=function(t){};t.exports=function(t,e){for(var n=arguments.length,i=new Array(n>2?n-2:0),s=2;s<n;s++)i[s-2]=arguments[s];if(r(e),!t){var o;if(void 0===e)o=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=0;(o=new Error(e.replace(/%s/g,(function(){return String(i[u++])})))).name="Invariant Violation"}throw o.framesToPop=1,o}}}}]);
//# sourceMappingURL=495.8773b475.chunk.js.map