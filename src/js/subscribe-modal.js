import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  closeModalBtn: document.querySelector('.close-subscribe-btn'),
  backdrop: document.querySelector('.subscribe-backdrop'),
  modal: document.querySelector('.subscribe-backdrop'),
  body: document.body,
  form: document.querySelector('.subscribe-modal-form'),
};

refs.closeModalBtn.addEventListener('click', closeModal);

setTimeout(() => {
  refs.modal.classList.remove('hidden');
  refs.body.classList.add('no-scroll');
}, 10000);

window.addEventListener('click', e => {
  if (e.target === refs.backdrop) {
    closeModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !refs.modal.classList.contains('hidden')) {
    closeModal();
  }
});

function closeModal() {
  refs.modal.classList.add('hidden');
  refs.body.classList.remove('no-scroll');
}

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const { email } = event.currentTarget.elements;

  const user = {
    email: email.value,
  };

  sendSubscription(user)
    .then(response => {
      Notify.success(response.data.message);
    })
    .catch(error => {
      Notify.failure(error.response.data.message);
    });
}

function emailValidator(ev) {
  console.log(ev.currentTarget);
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

function sendSubscription(obj) {
  return axios.post('/subscription', obj);
}
