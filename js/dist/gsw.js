!function(t,n){function i(t,i){return(i||n).querySelector(t)}function e(t,n){for(var i in n)t.style[i]=n[i]}function o(t,n){t.classList?t.classList.add(n):hasClass(t,n)||(t.className+=" "+n)}function r(){return t.innerWidth||n.documentElement.clientWidth||n.body.clientWidth}function c(){return t.innerHeight||n.documentElement.clientHeight||n.body.clientHeight}function l(t){var n=t.getBoundingClientRect();return n.top>=0&&n.left>=0&&n.bottom<=c()&&n.right<=r()}function u(){return n.hidden?!1:(setTimeout(function(){e(f,{opacity:1})},800),setTimeout(function(){e(s,{opacity:1})},1900),!0)}function a(){u()&&n.removeEventListener("visibilitychange",a)}function d(){var t=r();if(t!==h){h=t,e(g,{borderWidth:"0 "+Math.floor(.5*t).toString()+"px 15px 0",opacity:1}),e(v,{borderWidth:"0 0 25px "+Math.floor(.33*t).toString()+"px",opacity:1});var n=c();e(m,{height:n+"px"})}}var f=i(".clean"),s=i(".dash");t.onload=function(){u()||n.addEventListener("visibilitychange",a)};var h,g=i(".tri-left"),v=i(".tri-right"),m=i(".hero-img");t.onresize=d,d();var p=i(".profile"),y=!1;t.onscroll=function(){y?t.onscroll=function(){}:l(p)&&(y=!0,o(p,"hello"))}}(window,document);
//# sourceMappingURL=maps/gsw.js.map