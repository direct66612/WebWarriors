import{s as h,a as w,r as M,b as P,n as L,N as v}from"./pagination-markup-e223a62f.js";function S(e){return e.map(t=>{const{name:r,burnedCalories:s,time:i,bodyPart:d,target:y,_id:g}=t.data;return`
      <div class="favorites-exercise-card" data-modal-open data-id="${g}">
      <div class="exercise-card-top">
        <p class="exercise-card-top-text">WORKOUT</p>
        <button class="exercise-card-remove-btn">
          <svg
            class="exercise-card-remove-icon"
            width="16"
            height="16">
            <use
              href="${h}#icon-exercises-content-garbage"
            ></use>
          </svg>
        </button>
        <button class="exercise-card-start-btn" data-id="${g}">
          Start
          <svg
            class="exercise-card-start-icon"
            width="16"
            height="16">
            <use
              href="${h}#icon-scroll-arrow"
            ></use>
          </svg>
        </button>
      </div>
      <div class="exercise-card-mid">
        <div class="man-icon-wrapper">
          <svg
            class="exercise-card-man-icon"
            width="20"
            height="20">
            <use href="${h}#icon-aside-men"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${r}</h3>
      </div>
      <div class="exercise-card-bottom">
        <p class="exercice-card-indexes">Burned calories: <span class="exercice-card-indexes-values">${s} / ${i} min</span>Body part: <span class="exercice-card-indexes-values">${d}</span>Target: <span class="exercice-card-indexes-values">${y}</span></p>
      </div>
    </div>`}).join("")}const c=document.querySelector(".backdrop-ex"),j=document.querySelector(".modal-close-btn"),u=document.querySelector(".modal-ex"),J="favoriteExercises";j.addEventListener("click",f);document.addEventListener("keydown",k);const $=document.querySelector(".rating-feedback-form");c.addEventListener("click",e=>{e.target===c&&(f(),$.classList.add("is-hidden"))});function V(){u&&(document.querySelector("body").style.overflow="hidden",u.classList.remove("is-hidden"),c.classList.remove("is-hidden"),document.addEventListener("keydown",k),u.addEventListener("click",e=>{e.stopPropagation()}),c.removeEventListener("click",f),B(a[0]._id))}function f(){u&&(document.querySelector("body").style.overflow="visible",u.classList.add("is-hidden"),document.removeEventListener("keydown",k),c.removeEventListener("click",f),c.classList.add("is-hidden"),$.classList.add("is-hidden"),location.reload())}function k(e){e.key==="Escape"&&f()}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".favorites-exercise-card-wrapper").addEventListener("click",async t=>{const r=t.target.closest(".exercise-card-start-btn");if(!r)return;let s=r.dataset.id;try{const i=await G(s);i&&(a=i,B(a),V())}catch(i){console.log(i)}})});let N,a;function K(e){N=e}async function G(e){const t=`https://your-energy.b.goit.study/api/exercises/${e}`;try{return a=[(await w.get(t)).data],K(e),U(a),X(a),Y(a),Q(a),Z(a),z(a),a}catch(r){console.log(r)}}function U(e){const t=document.querySelector(".modal-img");t.src=e[0].gifUrl}function X(e){const t=document.querySelector(".ex-title");t.textContent=e[0].name}function Y(e){const t=document.querySelector(".ex-description");t.textContent=e[0].description}function Q(e){const t=document.querySelector(".ratinng-value");t.textContent=Number.isInteger(e[0].rating)?`${e[0].rating}.0`:e[0].rating}function Z(e){const t=document.querySelector(".info-list");t.innerHTML=e.map(r=>{const{bodyPart:s,burnedCalories:i,target:d,equipment:y,popularity:g,time:W}=r;return`
      <li class="info-item_info"><span>Target</span> <span class="info-item">${d}</span></li>
      <li class="info-item_info"><span>Body Part</span> <span class="info-item">${s}</span></li>
      <li class="info-item_info"><span>Equipment</span> <span class="info-item">${y}</span></li>
      <li class="info-item_info"><span>Popular</span> <span class="info-item">${g}</span></li>
      <li class="info-item_info"><span>Burned Calories</span> <span class="info-item">${i}/${W} min</span></li>
  `}).join("")}function z(e){const t=parseFloat(e[0].rating),r=document.querySelectorAll(".modal-rating-star-icon");for(let s=0;s<r.length;s++)s<t?r[s].classList.add("active"):r[s].classList.remove("active")}function q(){return JSON.parse(localStorage.getItem("favoriteExercises"))||[]}function I(e){localStorage.setItem(J,JSON.stringify(e))}function O(e){return q().some(s=>s===e)}function ee(e){const t=q();t.push(e),I(t)}function te(e){const r=q().filter(s=>s!==e);I(r)}const p=document.querySelector(".btn-add-favorite");p.addEventListener("click",()=>{const e=a[0]._id;O(e)?(te(e),p.textContent="Add to favorite ♡"):(ee(e),p.textContent="Remove from favorite 🗑")});function B(e){const t=O(e);p.textContent=t?"Remove from favorite 🗑":"Add to favorite ♡"}async function b(e){const t=e.map(async s=>await w.get(`https://your-energy.b.goit.study/api/exercises/${s}`));return await Promise.all(t)}const T=document.querySelector(".favorites-not-found-text"),m=document.querySelector(".favorites-exercise-card-wrapper"),re=document.querySelector(".favorites-exercise-wrapper"),x=document.querySelector(".pagination-nav");let E=1,l;const se=window.innerWidth>=1440;window.innerWidth<768?l=8:window.innerWidth<1440&&(l=10);re.addEventListener("click",ie);x.addEventListener("click",ne);let o=JSON.parse(localStorage.getItem("favoriteExercises"))||[];o.length?(T.style.display="none",A()):T.style.display="block";function ne(e){let t=e.target.dataset.page;if(t==="..."||!e.target.classList.contains("js-page-link")||e.target.classList.contains("active"))return;t=Number(t),window.scrollTo({top:m.offsetTop-180});const r=R(o,l),s=Math.ceil(o.length/l);b(r[t-1]).then(i=>{m.innerHTML=S(i);const d=M(s,t);x.innerHTML=P(t,d)}).catch(i=>{console.log(i),L.Notify.failure("Oops. Something went wrong. Please refresh the page.")})}function ie(e){if(!e.target.closest(".exercise-card-remove-btn"))return;const t=e.target.closest(".favorites-exercise-card").dataset.id;o=o.filter(r=>r!==t),localStorage.setItem("favoriteExercises",JSON.stringify(o)),o.length===0?(T.style.display="block",m.innerHTML="",x.innerHTML=""):A()}function R(e,t){const r=[];for(let s=0;s<e.length;s+=t)r.push(e.slice(s,s+t));return r}function A(){if(se)b(o).then(e=>{m.innerHTML=S(e)}).catch(e=>{console.log(e),L.Notify.failure("Oops. Something went wrong. Please refresh the page.")});else{const e=R(o,l),t=Math.ceil(o.length/l);b(e[E-1]).then(r=>{m.innerHTML=S(r);const s=M(t,E);x.innerHTML=P(E,s)}).catch(r=>{console.log(r),L.Notify.failure("Oops. Something went wrong. Please refresh the page.")})}}const n={closeBtn:document.querySelector(".close-rating-btn"),ratingStars:document.querySelector(".rating-stars"),ratingForm:document.querySelector(".rating-feedback-form"),stars:document.querySelectorAll(".star"),openModalBtn:document.querySelector(".btn-give-rating"),exerciseModal:document.querySelector(".modal-ex"),ratingNumber:document.querySelector(".rating-number")};n.closeBtn.addEventListener("click",F);n.ratingStars.addEventListener("change",ae);n.ratingForm.userEmail.addEventListener("input",D);n.ratingForm.userEmail.addEventListener("change",e=>{D(e)||H(e.currentTarget)});n.closeBtn.addEventListener("click",F);n.ratingForm.comment.addEventListener("change",ce);n.ratingForm.addEventListener("submit",ue);function ae(e){const t=e.currentTarget.firstElementChild;t.textContent=e.target.value+".0",e.target.labels[0].children[0].classList.add("animate"),_(n.stars),oe(e.target.value,n.stars);const r=setTimeout(()=>{e.target.labels[0].children[0].classList.remove("animate"),clearTimeout(r)},1700)}function C(e){e.style.borderColor="#f4f4f4"}function _(e){for(let t=0;t<5;t+=1)e[t].classList.remove("star-active")}function oe(e,t){for(let r=0;r<e;r+=1)t[r].classList.add("star-active")}function H(e){e.classList.add("error"),setTimeout(()=>{e.classList.remove("error")},600)}function D(e){return/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(e.currentTarget.value)?(e.currentTarget.style.borderColor="#acdb9de5",!0):(e.currentTarget.style.borderColor="#bd7a7ae5",!1)}function ce(e){e.currentTarget.value.length<5?(e.currentTarget.style.borderColor="#bd7a7ae5",H(e.currentTarget)):e.currentTarget.style.borderColor="#acdb9de5"}function le(e,t,r){return{rate:e,email:t,review:r}}function de(e,t){w.patch(`/exercises/${e}/rating`,t).then(r=>{v.Notify.success("Success")}).catch(r=>{v.Notify.failure(r.response.data.message)})}function ue(e){if(e.preventDefault(),!e.currentTarget.elements.userEmail.validity.valid){v.Notify.failure("Check email");return}let t=document.querySelector('input[name="star"]:checked');if(t===null){v.Notify.failure("Please select rating stars");return}const r=le(Number(t.value),e.currentTarget.elements.userEmail.value,e.currentTarget.elements.comment.value);de(N,r),C(e.currentTarget.elements.userEmail),C(e.currentTarget.elements.comment),_(n.stars),n.ratingNumber.textContent="0.0",e.currentTarget.reset(),F()}n.openModalBtn.addEventListener("click",me);function me(e){n.ratingForm.classList.remove("is-hidden"),n.exerciseModal.classList.add("is-hidden")}function F(){n.ratingForm.classList.add("is-hidden"),n.exerciseModal.classList.remove("is-hidden")}
