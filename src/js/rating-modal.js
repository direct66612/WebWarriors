import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';
const ratingRefs = {
  closeBtn: document.querySelector('.close-rating-btn'),
  ratingStars: document.querySelector('.rating-stars'),
  ratingForm: document.querySelector('.rating-feedback-form'),
  stars: document.querySelectorAll('.star'),
};
ratingRefs.ratingStars.closeBtn.addEventListener('click',ratingModalClose)
ratingRefs.ratingStars.addEventListener('change', onStarClick);

ratingRefs.ratingForm.userEmail.addEventListener('input', emailValidator);

ratingRefs.ratingForm.userEmail.addEventListener('change', ev => {
  if (!emailValidator(ev)) {
    addErrorAnimation(ev.currentTarget);
  }
});

ratingRefs.closeBtn.addEventListener('click', ratingModalClose);

ratingRefs.ratingForm.comment.addEventListener('change', commentValidator);

ratingRefs.ratingForm.addEventListener('submit', rateFormSubmit);

function onStarClick(ev) {
  const ratingValue = ev.currentTarget.firstElementChild;
  ratingValue.textContent = ev.target.value + '.0';
  ev.target.labels[0].children[0].classList.add('animate');
  starsColorReset(ratingRefs.stars);
  changeStarColor(ev.target.value, ratingRefs.stars);
  const timerID = setTimeout(() => {
    ev.target.labels[0].children[0].classList.remove('animate');
    clearTimeout(timerID);
  }, 1700);
}

function setDefaultColorInput(el) {
  el.style.borderColor = '#f4f4f4';
}

function starsColorReset(elements) {
  for (let i = 0; i < 5; i += 1) {
    elements[i].classList.remove('star-active');
  }
}
function changeStarColor(amount, elements) {
  for (let i = 0; i < amount; i += 1) {
    elements[i].classList.add('star-active');
  }
}

function addErrorAnimation(el) {
  el.classList.add('error');
  const errorTimeId = setTimeout(() => {
    el.classList.remove('error');
  }, 600);
}

function emailValidator(ev) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  if (!EMAIL_REGEXP.test(ev.currentTarget.value)) {
    ev.currentTarget.style.borderColor = '#bd7a7ae5';
    return false;
  } else {
    ev.currentTarget.style.borderColor = '#acdb9de5';
    return true;
  }
}

function commentValidator(ev) {
  if (ev.currentTarget.value.length < 5) {
    ev.currentTarget.style.borderColor = '#bd7a7ae5';
    addErrorAnimation(ev.currentTarget);
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
// Patch rating
function servicePatchRate(id, rateObj) {
  axios
    .patch(`/exercises/${id}/rating`, rateObj)
    .then(response => {
      Notiflix.Notify.success('Success');
    })
    .catch(err => {
      Notiflix.Notify.failure(err.response.data.message);
    });
}
// ! тут потрібно замінити ід на таргет датасет

// Submit form
function rateFormSubmit(ev) {
  ev.preventDefault();
  if (!ev.currentTarget.elements.userEmail.validity.valid) {
    Notiflix.Notify.failure('Check email');
    return;
  }
  let rate = document.querySelector('input[name="star"]:checked');
  if (rate === null) {
    Notiflix.Notify.failure('Please select rating stars');

    return;
  }
  const rateObj = createOjgRating(
    Number(rate.value),
    ev.currentTarget.elements.userEmail.value,
    ev.currentTarget.elements.comment.value
  );
  servicePatchRate(ev.currentTarget.dataset.id, rateObj);
  setDefaultColorInput(ev.currentTarget.elements.userEmail);
  setDefaultColorInput(ev.currentTarget.elements.comment);
  starsColorReset(ratingRefs.stars);
  ev.currentTarget.reset();
  ratingModalClose();
}

function ratingModalOpen(ev) {
  ratingRefs.ratingForm.dataset.id = ev.currentTarget.dataset.id;
  ratingRefs.ratingForm.classList.remove('is-hidden');
  // !Тут Дмитро закриває свою модалку ()=>{ виклик моєї функції, +закриття його модалки}
}

function ratingModalClose() {
  ratingRefs.ratingForm.classList.add('is-hidden');
  // !Тут відкривається попередня модалка...
}
export const openRatingModal = ratingModalOpen;
