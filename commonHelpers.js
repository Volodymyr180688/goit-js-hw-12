import{S as w,a as L,i}from"./assets/vendor-95dc692e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const S=new w(".gallery a",{captionsData:"alt"}),d=document.querySelector("ul.gallery");function f(s){const e=s.hits.map(r=>`<li class="img-blok">
        <a href="${r.largeImageURL}">     
          <img  src="${r.webformatURL}"
            data-source="${r.largeImageURL}"
            alt="${r.tags}">
          <ul class="image-descript">
            <li>
              <h3>likes</h3>
              <p>${r.likes}</p>
            </li>
            <li>
              <h3>views</h3>
              <p>${r.views}</p>
            </li>
            <li>
              <h3>comments</h3>
              <p>${r.comments}</p>
            </li>
            <li>
              <h3>downloads</h3>
              <p>${r.downloads}</p>
            </li>
          </ul>
        </a>
      </li>`).join("");d.insertAdjacentHTML("beforeend",e),S.refresh()}async function m(s,e){const o=`https://pixabay.com/api/?${new URLSearchParams({key:"43032026-51d5efc66afaddf8a06e125fe",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:e})}`,{data:a}=await L(o);return a}const u=document.querySelector("form"),p=document.querySelector(".flower-spinner"),h=document.querySelector(".load-more");let n=1,l="";const y=()=>{p.style.display="flex"},g=()=>{p.style.display="none"},P=async s=>{if(s.preventDefault(),d.innerHTML="",n=1,l=s.currentTarget.elements.query.value.trim(),!l){i.error({color:"yellow",message:" Please fill in the field for search query.",position:"topRight"});return}y();try{const e=await m(l,n);if(e.hits.length===0){i.error({color:"red",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f(e),e.totalHits>15&&(h.style.display="block")}catch{i.error({color:"red",message:"❌ Sorry, there was a mistake. Please try again!",position:"topRight"})}finally{g(),u.reset()}};u.addEventListener("submit",P);const b=async s=>{n+=1,y();try{const e=await m(l,n),r=Math.ceil(e.totalHits/15);f(e),R(),n===r&&(h.style.display="none",i.info({color:"yellow",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{i.error({color:"red",message:"❌ Sorry, there was a mistake. Please try again!",position:"topRight"})}finally{g(),u.reset()}};h.addEventListener("click",b);function R(){const{height:s}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
