!function(t,i){function n(t,n){return(n||i).querySelector(t)}function e(t,i){for(var n in i)t.style[n]=i[n]}function o(){return i.hidden?!1:(setTimeout(function(){e(d,{opacity:1})},800),setTimeout(function(){e(h,{opacity:1})},1900),!0)}function r(){o()&&i.removeEventListener("visibilitychange",r)}function c(){var n=t.innerWidth||i.documentElement.clientWidth||i.body.clientWidth;e(a,{borderWidth:"0 "+Math.floor(.5*n).toString()+"px 15px 0",opacity:1}),e(u,{borderWidth:"0 0 25px "+Math.floor(.33*n).toString()+"px",opacity:1});var o=t.innerHeight||i.documentElement.clientHeight||i.body.clientHeight;e(l,{height:o+"px"})}var d=n(".clean"),h=n(".dash");t.onload=function(){o()||i.addEventListener("visibilitychange",r)};var a=n(".tri-left"),u=n(".tri-right"),l=n(".hero-img");t.onresize=c,c()}(window,document);
//# sourceMappingURL=maps/gsw.js.map