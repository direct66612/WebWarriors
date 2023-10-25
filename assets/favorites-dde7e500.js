import{a as f,s as c,N as p}from"./symbol-defs-a74cbd4a.js";const n={notFoundText:document.querySelector(".favorites-not-found-text"),exercisesWrapper:document.querySelector(".favorites-exercise-card-wrapper")},o=["64f389465ae26083f39b17a2","64f389465ae26083f39b17df","64f389465ae26083f39b17a5","64f389465ae26083f39b17b7","64f389465ae26083f39b17ba","64f389465ae26083f39b180e","64f389465ae26083f39b189e","64f389465ae26083f39b18ae","64f389465ae26083f39b18d7","64f389465ae26083f39b190d"];d();function x(){document.querySelector(".favorites-exercise-card").addEventListener("click",()=>{if(console.log(),event.target.classList.value==="exercise-card-remove-btn"||event.target.classList.value==="exercise-card-remove-icon"||event.target.classList.value==="")g(o,event.currentTarget.dataset.id),n.exercisesWrapper.innerHTML="",d(),p.Notify.warning("You have just deleted an exercise",{fontSize:"24px",width:"600px",position:"center-top",distance:"165px",borderRadius:"10px"});else return})}function d(){v(o).then(e=>{e.map(({data:s})=>{const{bodyPart:r,name:t,target:a,burnedCalories:l,_id:u}=s;n.exercisesWrapper.insertAdjacentHTML("afterbegin",b(i(r),i(t),i(a),l,u)),x()})})}async function v(e){const s=e.map(async t=>await f.get(`https://your-energy.b.goit.study/api/exercises/${t}`));return await Promise.all(s)}function i(e){const s=e.split(""),r=s[0].toUpperCase(),t=[...s];return t.splice(0,1),[r,...t].join("")}function b(e,s,r,t,a){return`<div class="favorites-exercise-card" data-id="${a}">
                  <div class="exercise-card-top">
                    <p class="exercise-card-top-text">WORKOUT</p>
                    <button class="exercise-card-remove-btn">
                      <svg
                        class="exercise-card-remove-icon"
                        width="16"
                        height="16">
                        <use
                          href="${c}#icon-exercises-content-garbage"
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
                          href="${c}#icon-scroll-arrow"
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
                        <use href="${c}#icon-aside-men"></use>
                      </svg>
                    </div>
                    <h3 class="exercise-card-title">${s}</h3>
                  </div>
                  <div class="exercise-card-bottom">
                    <p class="exercice-card-indexes">Burned calories: <span class="exercice-card-indexes-values">${t}/3 min</span>Body part: <span class="exercice-card-indexes-values">${e}</span>Target: <span class="exercice-card-indexes-values">${r}</span></p>
                  </div>
                </div>`}function g(e,s){const r=e.indexOf(s);r>-1&&e.splice(r,1)}
