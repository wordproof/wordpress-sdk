!function(){"use strict";var t={n:function(o){var e=o&&o.__esModule?function(){return o.default}:function(){return o};return t.d(e,{a:e}),e},d:function(o,e){for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:function(t,o){return Object.prototype.hasOwnProperty.call(t,o)}},o=window.wp.apiFetch,e=t.n(o);async function n(t,o,e){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:200;try{const a=await t();return!!a&&(a.status===n?o(a):e(a))}catch(t){console.error(t.message)}}async function a(t){try{return await e()(t)}catch(t){return t.error&&t.status?t:t instanceof Response&&await t.json()}}const r=async()=>await n((async()=>await(async()=>await a({path:"wordproof/v1/oauth/destroy",method:"POST"}))()),(t=>t),(()=>!1)),{get:i}=lodash,s=t=>i(window,"wordproofSdk.data"+(t?`.${t}`:""),{});function d(t){const o=new window.CustomEvent(t);window.dispatchEvent(o)}const{dispatch:c}=wp.data;!function(){const{setIsAuthenticated:t}=c("wordproof"),o=s("popup_redirect_authentication_url"),e=s("popup_redirect_settings_url");let i=null;const w=(t,o)=>{i=function(t,o){let e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:800,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:680;const r=t.top.outerHeight/2+t.top.screenY-a/2,i=t.top.outerWidth/2+t.top.screenX-n/2;return t.open(o,e,`toolbar=no,\n\t\tlocation=no,\n\t\tdirectories=no,\n\t\tstatus=no,\n\t\tmenubar=no,\n\t\tresizable=no,\n\t\tcopyhistory=no,\n\t\twidth=${n},\n\t\theight=${a},\n\t\ttop=${r},\n\t\tleft=${i}`)}(window,t,o),i&&i.focus(),window.addEventListener("message",u,!1)},u=async t=>{const{data:o,source:e,origin:r}=t;if(r===s("origin")&&i===e)switch(o.type){case"wordproof:oauth:granted":!1===await f(o)&&await p("wordproof:oauth:failed",!1);break;case"wordproof:oauth:failed":await p("wordproof:oauth:failed",!1);break;case"wordproof:oauth:denied":await p("wordproof:oauth:denied",!1);break;case"wordproof:webhook:success":await p("wordproof:oauth:success",!0);break;case"wordproof:webhook:failed":await p("wordproof:webhook:failed",!1);break;case"wordproof:settings:updated":await p("wordproof:settings:updated"),await(async()=>await n((async()=>await(async()=>await a({path:"wordproof/v1/settings",method:"GET"}))()),(t=>t),(()=>!1)))();break;case"wordproof:oauth:destroy":await p("wordproof:oauth:destroy",!1)}},p=async function(o){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;window.removeEventListener("message",u,!1),d(o),!1===e&&(await r(),t(!1)),!0===e&&t(!0),i.close()},f=async t=>{await n((()=>(async t=>{let{state:o,code:e}=t;return await a({path:"wordproof/v1/oauth/authenticate",method:"POST",data:{state:o,code:e}})})(t)),(async t=>{const o={type:"wordproof:sdk:access-token",source_id:t.source_id};return i.postMessage(o,s("origin")),!0}),(async t=>!1))};window.addEventListener("wordproof:open_authentication",(t=>{t.preventDefault(),w(o,"WordProof_Authentication")}),!1),window.addEventListener("wordproof:open_settings",(t=>{t.preventDefault(),w(e,"WordProof_Settings")}),!1)}()}();