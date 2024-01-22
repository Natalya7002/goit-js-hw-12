import{S as h,i as u,a as L}from"./assets/vendor-029e731f.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const v="41780713-d9d59fd8c4b13cd5ac9a220da",m=document.querySelector(".gallery"),l=document.querySelector(".load-more-wrapper"),c=document.querySelector(".loader-wrapper"),q=document.querySelector("button.load-more"),b=document.querySelector(".search-form"),f=document.querySelector(".no-more"),w=new h(".gallery li a",{captionsData:"alt",captionDelay:250});let i=[],d=1,y="";const g=40;async function S(o=!1){const t=document.querySelector(".search-form input").value.trim();if(!t)return u.error({title:"Error",message:"Please enter a search query"});y!==t||o?(i=[],d=1,y=t):d+=1,f.classList.remove("is-active"),l.classList.add("is-hidden"),c.classList.add("is-active");try{i=[];const a=await L.get("https://pixabay.com/api/",{params:{key:v,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:g,page:d}});i.push(...a.data.hits),c.classList.remove("is-active"),l.classList.remove("is-hidden"),a.data.hits.length<g&&(l.classList.add("is-hidden"),f.classList.add("is-active"))}catch{u.error({title:"Error",message:"Something went wrong, try again later!"}),c.classList.remove("is-active")}}async function E(o=!1){const t=i.map(s=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${s.largeImageURL}">
            <img
                class="gallery-image"
                src="${s.webformatURL}"
                alt="${s.tags}"
            />
            </a>
        </li>
        `).join("");if(o?m.innerHTML=t:m.insertAdjacentHTML("beforeend",t),i.length===0)return u.error({title:"Error",message:"No images found for this request"});w.refresh();const a=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}async function p(o=!1){await S(o),await E(o)}b.addEventListener("submit",async o=>{o.preventDefault(),p(!0)});q.addEventListener("click",async()=>{p()});
//# sourceMappingURL=commonHelpers.js.map