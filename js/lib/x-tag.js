(function(){var e=document.getElementsByTagName("head")[0],t=function(){var e=window.getComputedStyle(document.documentElement,""),t=(Array.prototype.slice.call(e).join("").match(/moz|webkit|ms/)||e.OLink===""&&["o"])[0],n="WebKit|Moz|MS|O".match(new RegExp("("+t+")","i"))[1];return{dom:n,lowercase:t,css:"-"+t+"-",js:t[0].toUpperCase()+t.substr(1),keyframes:!!window.CSSKeyframesRule||!!window[n+"CSSKeyframesRule"]}}(),n=function(e,t,n){switch(xtag.typeOf(n)){case"object":xtag.typeOf(e[t])=="object"?xtag.merge(e[t],n):e[t]=xtag.clone(n);break;case"array":e[t]=xtag.toArray(n);break;default:e[t]=n}return e},r=function(e,t,n){return function(r){!!~t.match(/(\d+)/g).indexOf(String(r.keyCode))==(n=="keypass")&&e.apply(this,xtag.toArray(arguments))}};xtag={tags:{},tagList:[],callbacks:{},prefix:t,anchor:document.createElement("a"),tagOptions:{content:"",mixins:[],events:{},methods:{},getters:{},setters:{},onCreate:function(){},onInsert:function(){}},eventMap:{animationstart:["animationstart","oAnimationStart","MSAnimationStart","webkitAnimationStart"],transitionend:["transitionend","oTransitionEnd","MSTransitionEnd","webkitTransitionEnd"],tap:["ontouchend"in document?"touchend":"mouseup"]},pseudos:{delegate:function(e,t,n,r){var i=xtag.query(this,t).filter(function(e){return e==r.target||e.contains?e.contains(r.target):!1})[0];return i?function(){e.apply(i,xtag.toArray(arguments))}:!1},keystop:r,keypass:r,retain:function(e,t,n,r,i){var s=i[r];return function(){e(),typeof s!="undefined"&&(i[r]=s)}},preventable:function(e,t,n){return function(t){t.defaultPrevented||e.apply(this,xtag.toArray(arguments))}}},mixins:{request:{onInsert:function(){this.src=this.getAttribute("src")},getters:{"dataready:retain":function(){return this.xtag.dataready}},setters:{src:function(e){e&&(this.setAttribute("src",e),xtag.request(this,{url:e,method:"GET"}))},"dataready:retain":function(e){this.xtag.dataready=e,this.xtag.request&&this.xtag.request.readyState==4&&e.call(this,this.xtag.request)}}}},typeOf:function(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},toArray:function(e){var t=Array.prototype.slice.call(e,0);return t.hasOwnProperty?t:[e]},hasClass:function(e,t){return!!~e.className.split(" ").indexOf(t)},addClass:function(e,t){return xtag.hasClass(e,t)||(e.className=e.className+" "+t),e},removeClass:function(e,t){return e.className=e.className.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)"),"$1"),e},toggleClass:function(e,t){return xtag.hasClass(e,t)?xtag.removeClass(e,t):xtag.addClass(e,t)},query:function(e,t){return xtag.toArray(e.querySelectorAll(t))},defineProperty:function(e,t,n,r){return document.documentElement.__defineGetter__?function(e,t,n,r){e["__define"+n[0].toUpperCase()+"etter__"](t,r)}:function(e,t,n,r){var i={configurable:!0};i[n]=r,Object.defineProperty(e,t,i)}}(),clone:function(e){var t=function(){};return t.prototype=e,new t},merge:function(e,t,r){if(xtag.typeOf(t)=="string")return n(e,t,r);for(var i=1,s=arguments.length;i<s;i++){var o=arguments[i];for(var u in o)n(e,u,o[u])}return e},wrap:function(e,t){return function(){var n=xtag.toArray(arguments);e.apply(this,n),t.apply(this,n)}},skipTransition:function(e,n,r){var i=t.js+"TransitionDuration";e.style[i]="0.001s",n.call(r),xtag.addEvent(e,"transitionend",function(){e.style[i]=""})},tagCheck:function(e){return e.tagName?xtag.tags[e.tagName.toLowerCase()]:!1},getOptions:function(e){return xtag.tagCheck(e)||xtag.tagOptions},register:function(e,n){xtag.tagList.push(e),xtag.tags[e]=xtag.merge({},xtag.tagOptions,xtag.applyMixins(n)),t.keyframes?xtag.attachKeyframe(e):xtag.domready&&xtag.query(document,e).forEach(function(e){s({target:e,animationName:"nodeInserted"})})},attachKeyframe:function(e){xtag.sheet.insertRule(e+t.properties,0)},extendElement:function(e){if(!e.xtag){e.xtag={};var t=xtag.getOptions(e);for(var n in t.methods)xtag.bindMethods(e,n,t.methods[n]);for(var n in t.setters)xtag.applyAccessor(e,n,"set",t.setters[n]);for(var n in t.getters)xtag.applyAccessor(e,n,"get",t.getters[n]);xtag.addEvents(e,t.events,t.eventMap),t.content&&(e.innerHTML=t.content),t.onCreate.call(e)}},bindMethods:function(e,t,n){e.xtag[t]=function(){return n.apply(e,xtag.toArray(arguments))}},applyMixins:function(e){return e.mixins&&e.mixins.forEach(function(t){var n=xtag.mixins[t];for(var r in n)switch(xtag.typeOf(n[r])){case"function":e[r]=e[r]?xtag.wrap(e[r],n[r]):n[r];break;case"object":e[r]=xtag.merge({},n[r],e[r]);break;default:e[r]=n[r]}}),e},applyAccessor:function(e,t,n,r){var i=t.split(":")[0];xtag.applyPseudos(e,t,function(){xtag.defineProperty(e,i,n,r)},[i,e])},applyPseudos:function(e,t,n,r){var i=n,r=xtag.toArray(r);t.match(":")&&t.replace(/:(\w*)(?:\(([^\)]*)\))?/g,function(t,s,o){if(i){var u=xtag.toArray(r);u.unshift(i,o,s);var a=xtag.pseudos[s].apply(e,u);i=a===!1?!1:a||n}}),i&&i.apply(e,r)},request:function(t,n){xtag.clearRequest(t);var r=t.xtag.request||{};t.xtag.request=n;var i=t.xtag.request,s=t.getAttribute("data-callback-key")||"callback=xtag.callbacks.";if(xtag.fireEvent(t,"beforerequest")===!1)return!1;if(r.url&&!n.update&&r.url.replace(new RegExp("&?("+s+"x[0-9]+)"),"")==t.xtag.request.url)return t.xtag.request=r,!1;t.setAttribute("src",t.xtag.request.url),xtag.anchor.href=n.url;if(xtag.anchor.hostname==window.location.hostname)i=xtag.merge(new XMLHttpRequest,i),i.onreadystatechange=function(){t.setAttribute("data-readystate",i.readyState),i.readyState==4&&i.status<400&&xtag.requestCallback(t,i)},["error","abort","load"].forEach(function(e){i["on"+e]=function(n){n.request=i,xtag.fireEvent(t,e,n)}}),i.open(i.method,i.url,!0),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send();else{var o=i.callbackID="x"+(new Date).getTime();t.setAttribute("data-readystate",i.readyState=0),xtag.callbacks[o]=function(e){i.status=200,i.readyState=4,i.responseText=e,xtag.requestCallback(t,i),delete xtag.callbacks[o],xtag.clearRequest(t)},i.script=document.createElement("script"),i.script.type="text/javascript",i.script.src=n.url=n.url+(~n.url.indexOf("?")?"&":"?")+s+o,i.script.onerror=function(e){t.setAttribute("data-readystate",i.readyState=4),t.setAttribute("data-requeststatus",i.status=400),xtag.fireEvent(t,"error",e)},e.appendChild(i.script)}t.xtag.request=i},requestCallback:function(e,t){if(t!=e.xtag.request)return xtag;e.setAttribute("data-readystate",t.readyState),e.setAttribute("data-requeststatus",t.status),xtag.fireEvent(e,"dataready",{request:t}),e.dataready&&e.dataready.call(e,t)},clearRequest:function(t){var n=t.xtag.request;if(!n)return xtag;n.script&&~xtag.toArray(e.children).indexOf(n.script)?e.removeChild(n.script):n.abort&&n.abort()},addEvent:function(e,t,n,r){var i=t.split(":")[0],s=(r||xtag.eventMap||{})[i]||[i];s.forEach(function(r){e.addEventListener(r,function(r){xtag.applyPseudos(e,t,n,[r,e])},!!~["focus","blur"].indexOf(r))})},addEvents:function(e,t,n){for(var r in t)xtag.addEvent(e,r,t[r],n)},fireEvent:function(e,t,n){var r=document.createEvent("Event");r.initEvent(t,!0,!0),e.dispatchEvent(xtag.merge(r,n))}};var i=document.createElement("style"),s=function(e){e.animationName=="nodeInserted"&&xtag.tagCheck(e.target)&&(xtag.extendElement(e.target),xtag.getOptions(e.target).onInsert.call(e.target))};i.type="text/css";if(t.keyframes){var o="animation-duration: 0.0001s;",u="animation-name: nodeInserted !important;";t.properties="{"+o+u+t.css+o+t.css+u+"}",xtag.eventMap.animationstart.forEach(function(e){document.addEventListener(e,s,!1)}),i.appendChild(document.createTextNode("@"+(t.keyframes?t.css:"")+"keyframes nodeInserted {"+"from { clip: rect(1px, auto, auto, auto); } to { clip: rect(0px, auto, auto, auto); }"+"}"))}else document.addEventListener("DOMContentLoaded",function(e){xtag.domready=!0,xtag.tagList[0]&&xtag.query(document,xtag.tagList).forEach(function(e){s({target:e,animationName:"nodeInserted"})})},!1),document.addEventListener("DOMNodeInserted",function(e){e.animationName="nodeInserted",s(e)},!1);e.appendChild(i),xtag.sheet=i.sheet;var a=document.createElement;document.createElement=function(e){var t=a.call(this,e);return xtag.tagCheck(t)&&xtag.extendElement(t),t}})()