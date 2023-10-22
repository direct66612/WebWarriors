import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';
const ratingRefs = {
  closeBtn: document.querySelector('.close-rating-btn'),
  ratingStars: document.querySelector('.rating-stars'),
  ratingForm: document.querySelector('.rating-feedback-form'),
  stars: document.querySelectorAll('.star'),
};

ratingRefs.ratingStars.addEventListener('change', onStarClick);

ratingRefs.ratingForm.userEmail.addEventListener('input', emailValidator);

ratingRefs.ratingForm.userEmail.addEventListener('change', (ev) => {
    if (!emailValidator(ev)) {
        errorAnimation(ev.currentTarget)
    }
} )

ratingRefs.closeBtn.addEventListener('click', ratingModalClose)

ratingRefs.ratingForm.comment.addEventListener('change', commentValidator);

ratingRefs.ratingForm.addEventListener('submit', rateFormSubmit);

function onStarClick(ev) {
  const ratingValue = ev.currentTarget.firstElementChild;
  ratingValue.textContent = ev.target.value + '.0';
  ev.target.labels[0].children[0].classList.add('animate');
  startColorReset(ratingRefs.stars);
  changeStarColor(ev.target.value, ratingRefs.stars);
  const timerID = setTimeout(() => {
    ev.target.labels[0].children[0].classList.remove('animate');
    clearTimeout(timerID);
  }, 1700);
}

function startColorReset(elements) {
  for (let i = 0; i < 5; i += 1) {
    elements[i].classList.remove('star-active');
  }
}
function changeStarColor(amount, elements) {
  for (let i = 0; i < amount; i += 1) {
    elements[i].classList.add('star-active');
  }
}

function errorAnimation(el) {
    el.classList.add('error')
    const errorTimeId = setTimeout(() => {
        el.classList.remove('error')
    },600)
}

function setDefaultColorInput(el) {
  el.style.borderColor = '#f4f4f4';
}
function emailValidator(ev) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  if (!EMAIL_REGEXP.test(ev.currentTarget.value)) {
      ev.currentTarget.style.borderColor = '#bd7a7ae5';
      return false
  } else {
      ev.currentTarget.style.borderColor = '#acdb9de5';
      return true
  }
}
function commentValidator(ev) {
  if (ev.currentTarget.value.length < 5) {
      ev.currentTarget.style.borderColor = '#bd7a7ae5';
      errorAnimation(ev.currentTarget)
  } else {
    ev.currentTarget.style.borderColor = '#acdb9de5';
  }
}

function createOjgRating(rate, email, comment) {
  return {
    rate: rate,
    email: email,
    review: comment,
  };
}
function serviceGetRate(id, rateObj) {
  axios
    .patch(`/exercises/${id}/rating`, rateObj)
    .then(response => {
      Notiflix.Notify.success('Success');
    })
    .catch(err => {
      Notiflix.Notify.failure(err.response.data.message);
    });
}
// ! туту потрібно замінити ід на таргет датасет
function rateFormSubmit(ev) {
    ev.preventDefault();
    if(!ev.currentTarget.elements.userEmail.validity.valid){
        Notiflix.Notify.failure('Check email')
        return
    }
  let rate = document.querySelector('input[name="star"]:checked');
  if (rate === null) {
    Notiflix.Notify.failure('Rating stars can not be empty');
    
    return;
  }
  const rateObj = createOjgRating(
    Number(rate.value),
    ev.currentTarget.elements.userEmail.value,
    ev.currentTarget.elements.comment.value
  );
  serviceGetRate('64f389465ae26083f39b17a4', rateObj);
  setDefaultColorInput(ev.currentTarget.elements.userEmail);
  setDefaultColorInput(ev.currentTarget.elements.comment);
  startColorReset(ratingRefs.stars);
  ev.currentTarget.reset();
}

function ratingModalOpen(ev) {
    ratingRefs.ratingForm.dataset.id = ev.target.dataset.id;
    ratingRefs.ratingForm.classList.remove('visually-hidden');
}

function ratingModalClose() {
    ratingRefs.ratingForm.classList.add('visually-hidden')
}
export const rmo =  ratingModalOpen;

