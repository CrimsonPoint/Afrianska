"use strict";var e=document.querySelector(".talk_btn"),t=document.querySelector(".modal"),s=document.querySelector(".modal__closebtn"),a=document.querySelector("body"),u=document.querySelector(".popupForModal"),l=document.querySelector(".popupForModal");e.addEventListener("click",(function(){t.classList.add("open"),a.classList.add("modal-block")})),l.addEventListener("click",(function(){u.classList.remove("open"),a.classList.remove("modal-block")})),s.addEventListener("click",(function(){t.classList.remove("open"),a.classList.remove("modal-block")})),t.addEventListener("click",(function(e){"modal open"==e.target.classList&&(t.classList.remove("open"),a.classList.remove("modal-block"))})),u.addEventListener("click",(function(e){"popupForModal open"==e.target.classList&&(u.classList.remove("open"),a.classList.remove("modal-block"))}));var o=document.getElementById("user_name"),d=document.getElementById("user_email"),r=document.getElementById("user_message"),c=document.getElementById("user_message__errorMessage"),i=document.getElementById("user_name__errorMessage"),n=document.getElementById("user_email__errorMessage"),m=document.getElementById("form"),v=[o,d,r],F=[i,n,c],L=/^(((?:(?![\t-\r "\(\),\.:-<>@\[\]\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])+(\.(?:(?![\t-\r "\(\),\.:-<>@\[\]\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])+)*)|("(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+"))@(((?:(?![\t-\r "\(\),\.:-<>@\[\]\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])+\.)+(?:(?![\t-\r "\(\),\.:-<>@\[\]\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S]){2,})$/i;o.addEventListener("input",(function(e){""==o.value.trim()?o.classList.add("validateRejected"):o.classList.remove("validateRejected")}));for(var g=function(e){v[e].addEventListener("input",(function(t){var s=d.value.trim();if(""==v[e].value.trim())v[e].classList.add("validateRejected"),F[e].classList.add("errMessageVisible");else{if(1==e&&!L.test(d.value.trim()))return v[e].classList.add("validateRejected"),console.log(!L.test(s)),void n.classList.add("errMessageVisible");v[e].classList.remove("validateRejected"),F[e].classList.remove("errMessageVisible")}}))},f=0;f<v.length;f++)g(f);m.addEventListener("submit",(function(e){if(e.preventDefault(),console.log("!!!"),function(){var e=!0;""===o.value.trim()&&(e=!1,o.classList.add("validateRejected"),i.classList.add("errMessageVisible"));var t=d.value.trim();""!=t&&L.test(t)||(e=!1,d.classList.add("validateRejected"),n.classList.add("errMessageVisible"));""===r.value.trim()&&(e=!1,r.classList.add("validateRejected"),c.classList.add("errMessageVisible"));return e}()){var s=new FormData(m);fetch("local",{method:"POST",body:s}).then((function(){t.classList.remove("open"),a.classList.remove("modal-block"),u.classList.add("open"),v.forEach((function(e){e.value=""}))})).catch((function(e){console.error("Ошибка:",e)}))}}));