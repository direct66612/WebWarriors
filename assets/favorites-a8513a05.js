import{s as v,a as p,N as f}from"./symbol-defs-a74cbd4a.js";function B(e){return e.map(({_id:t,bodyPart:r,name:s,target:a,burnedCalories:u})=>`<div class="favorites-exercise-card" data-modal-open data-id="${t}">
                  <div class="exercise-card-top">
                    <p class="exercise-card-top-text">WORKOUT</p>
                    <button class="exercise-card-remove-btn">
                      <svg
                        class="exercise-card-remove-icon"
                        width="16"
                        height="16">
                        <use
                          href="${v}#icon-exercises-content-garbage"
                        ></use>
                      </svg>
                    </button>
                    <button class="exercise-card-start-btn">
                      Start
                      <svg
                        class="exercise-card-start-icon"
                        width="16"
                        height="16">
                        <use
                          href="${v}#icon-scroll-arrow"
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
                        <use href="${v}#icon-aside-men"></use>
                      </svg>
                    </div>
                    <h3 class="exercise-card-title">${s}</h3>
                  </div>
                  <div class="exercise-card-bottom">
                    <p class="exercice-card-indexes">Burned calories: <span class="exercice-card-indexes-values">${u}/3 min</span>Body part: <span class="exercice-card-indexes-values">${r}</span>Target: <span class="exercice-card-indexes-values">${a}</span></p>
                  </div>
                </div>`).join("")}const c=document.querySelector(".backdrop-ex"),N=document.querySelector(".modal-close-btn"),l=document.querySelector(".modal-ex"),M="favoriteExercises";N.addEventListener("click",d);document.addEventListener("keydown",x);const S=document.querySelector(".rating-feedback-form");c.addEventListener("click",e=>{e.target===c&&(d(),S.classList.add("is-hidden"))});function L(){l&&(document.querySelector("body").style.overflow="hidden",l.classList.remove("is-hidden"),c.classList.remove("is-hidden"),document.addEventListener("keydown",x),l.addEventListener("click",e=>{e.stopPropagation()}),c.removeEventListener("click",d),k(i))}function d(){l&&(document.querySelector("body").style.overflow="scroll",l.classList.add("is-hidden"),document.removeEventListener("keydown",x),c.removeEventListener("click",d),c.classList.add("is-hidden"),S.classList.add("is-hidden"))}function x(e){e.key==="Escape"&&d()}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".favorites-exercise-card-wrapper").addEventListener("click",async t=>{const r=t.target.closest(".item-button");if(!r)return;let s=r.dataset.id;try{const a=await O(s);a&&(i=a,k(i),L())}catch(a){console.log(a)}})});let b,i;function R(e){b=e}async function O(e){const t=`https://your-energy.b.goit.study/api/exercises/${e}`;try{return i=[(await p.get(t)).data],R(e),A(i),_(i),P(i),D(i),j(i),J(i),i}catch(r){console.log(r)}}function A(e){const t=document.querySelector(".modal-img");t.src=e[0].gifUrl}function _(e){const t=document.querySelector(".ex-title");t.textContent=e[0].name}function P(e){const t=document.querySelector(".ex-description");t.textContent=e[0].description}function D(e){const t=document.querySelector(".ratinng-value");t.textContent=Number.isInteger(e[0].rating)?`${e[0].rating}.0`:e[0].rating}function j(e){const t=document.querySelector(".info-list");t.innerHTML=e.map(r=>{const{bodyPart:s,burnedCalories:a,target:u,equipment:g,popularity:$,time:w}=r;return`
      <li class="info-item_info"><span>Target</span> <span class="info-item">${u}</span></li>
      <li class="info-item_info"><span>Body Part</span> <span class="info-item">${s}</span></li>
      <li class="info-item_info"><span>Equipment</span> <span class="info-item">${g}</span></li>
      <li class="info-item_info"><span>Popular</span> <span class="info-item">${$}</span></li>
      <li class="info-item_info"><span>Burned Calories</span> <span class="info-item">${a}/${w} min</span></li>
  `}).join("")}function J(e){const t=parseFloat(e[0].rating),r=document.querySelectorAll(".modal-rating-star-icon");for(let s=0;s<r.length;s++)s<t?r[s].classList.add("active"):r[s].classList.remove("active")}function E(){return JSON.parse(localStorage.getItem("favoriteExercises"))||[]}function q(e){localStorage.setItem(M,JSON.stringify(e))}function T(e){return E().some(s=>s===e)}function V(e){const t=E();t.push(e),q(t)}function K(e){const r=E().filter(s=>s!==e);q(r)}const m=document.querySelector(".btn-add-favorite");m.addEventListener("click",()=>{const e=i[0]._id;T(e)?(K(e),m.textContent="Add to favorite ♡"):(V(e),m.textContent="Remove from favorite 🗑")});function k(e){const t=T(e);m.textContent=t?"Remove from favorite 🗑":"Add to favorite ♡"}const U="https://your-energy.b.goit.study/api/",X="exercises";async function G(e){return[(await p.get(`${U}${X}/${e}`)).data]}const o=JSON.parse(localStorage.getItem("favoriteExercises")),H=document.querySelector(".favorites-not-found-text");o.length&&(H.style.display="none");if(o.length){const e=document.querySelector(".favorites-exercise-card-wrapper");o.forEach(t=>G(t).then(r=>e.insertAdjacentHTML("beforeend",B(r))))}if(o.length){let r=function(s){const a=s.target.closest(".favorites-exercise-card").dataset.id;o.forEach(u=>{t=o.findIndex(({_id:g})=>g===a)}),o.splice(t,1),localStorage.removeItem("favoriteExercises"),localStorage.setItem("favoriteExercises",JSON.stringify(o)),location.reload()};document.querySelectorAll(".exercise-card-remove-btn").forEach(s=>{s.addEventListener("click",r)});let t}const W=document.querySelectorAll("[data-modal-open]");W.forEach(e=>{e.addEventListener("click",L)});const n={closeBtn:document.querySelector(".close-rating-btn"),ratingStars:document.querySelector(".rating-stars"),ratingForm:document.querySelector(".rating-feedback-form"),stars:document.querySelectorAll(".star"),openModalBtn:document.querySelector(".btn-give-rating"),exerciseModal:document.querySelector(".modal-ex"),ratingNumber:document.querySelector(".rating-number")};n.closeBtn.addEventListener("click",y);n.ratingStars.addEventListener("change",Y);n.ratingForm.userEmail.addEventListener("input",I);n.ratingForm.userEmail.addEventListener("change",e=>{I(e)||F(e.currentTarget)});n.closeBtn.addEventListener("click",y);n.ratingForm.comment.addEventListener("change",Q);n.ratingForm.addEventListener("submit",te);function Y(e){const t=e.currentTarget.firstElementChild;t.textContent=e.target.value+".0",e.target.labels[0].children[0].classList.add("animate"),C(n.stars),z(e.target.value,n.stars);const r=setTimeout(()=>{e.target.labels[0].children[0].classList.remove("animate"),clearTimeout(r)},1700)}function h(e){e.style.borderColor="#f4f4f4"}function C(e){for(let t=0;t<5;t+=1)e[t].classList.remove("star-active")}function z(e,t){for(let r=0;r<e;r+=1)t[r].classList.add("star-active")}function F(e){e.classList.add("error"),setTimeout(()=>{e.classList.remove("error")},600)}function I(e){return/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(e.currentTarget.value)?(e.currentTarget.style.borderColor="#acdb9de5",!0):(e.currentTarget.style.borderColor="#bd7a7ae5",!1)}function Q(e){e.currentTarget.value.length<5?(e.currentTarget.style.borderColor="#bd7a7ae5",F(e.currentTarget)):e.currentTarget.style.borderColor="#acdb9de5"}function Z(e,t,r){return{rate:e,email:t,review:r}}function ee(e,t){p.patch(`/exercises/${e}/rating`,t).then(r=>{f.Notify.success("Success")}).catch(r=>{f.Notify.failure(r.response.data.message)})}function te(e){if(e.preventDefault(),!e.currentTarget.elements.userEmail.validity.valid){f.Notify.failure("Check email");return}let t=document.querySelector('input[name="star"]:checked');if(t===null){f.Notify.failure("Please select rating stars");return}const r=Z(Number(t.value),e.currentTarget.elements.userEmail.value,e.currentTarget.elements.comment.value);ee(b,r),h(e.currentTarget.elements.userEmail),h(e.currentTarget.elements.comment),C(n.stars),n.ratingNumber.textContent="0.0",e.currentTarget.reset(),y()}n.openModalBtn.addEventListener("click",re);function re(e){n.ratingForm.classList.remove("is-hidden"),n.exerciseModal.classList.add("is-hidden")}function y(){n.ratingForm.classList.add("is-hidden"),n.exerciseModal.classList.remove("is-hidden")}
