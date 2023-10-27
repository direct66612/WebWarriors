import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './templates/favorites-markup';
import { openModal } from './modal-ex-favorites';
import { workoutSearch } from './api-service/favorites-api';
import { returnPaginationRange } from './utils/utils';
import { renderPagination } from './templates/pagination-markup';

const messageNone = document.querySelector('.favorites-not-found-text');
const favoritsWorkoutsList = document.querySelector(
  '.favorites-exercise-card-wrapper'
);
const exercisesListWrapper = document.querySelector(
  '.favorites-exercise-wrapper'
);
const pagination = document.querySelector('.pagination-nav');
const nonDesktop = window.matchMedia('(max-width: 1339px)');
const desktop = window.matchMedia('(min-width: 1440px)');

let page = 1;
let perPage;
const isDesktop = window.innerWidth >= 1440;

if (window.innerWidth < 768) {
  perPage = 8;
} else if (window.innerWidth < 1440) {
  perPage = 10;
}

nonDesktop.addEventListener('change', event => {
  if (event.matches) {
    perPage = 10;
    updateMarkup();
    pagination.style.display = 'block';
  }
});

desktop.addEventListener('change', event => {
  if (event.matches) {
    perPage = 999;
    updateMarkup();
    pagination.style.display = 'none';
  }
});

exercisesListWrapper.addEventListener('click', deletefromLocalStorage);
pagination.addEventListener('click', onPageShow);

let arrFavoriteExercises =
  JSON.parse(localStorage.getItem('favoriteExercises')) || [];

if (arrFavoriteExercises.length) {
  messageNone.style.display = 'none';
  updateMarkup();
} else {
  messageNone.style.display = 'block';
}

function onPageShow(event) {
  let page = event.target.dataset.page;

  if (
    page === '...' ||
    !event.target.classList.contains('js-page-link') ||
    event.target.classList.contains('active')
  ) {
    return;
  }

  page = Number(page);
  window.scrollTo({ top: favoritsWorkoutsList.offsetTop - 180 });

  const splitArrFavoriteExercises = splitArrayIntoSubarrays(
    arrFavoriteExercises,
    perPage
  );
  const totalPages = Math.ceil(arrFavoriteExercises.length / perPage);

  workoutSearch(splitArrFavoriteExercises[page - 1])
    .then(data => {
      favoritsWorkoutsList.innerHTML = createMarkup(data);
      const array = returnPaginationRange(totalPages, page);
      pagination.innerHTML = renderPagination(page, array);
    })
    .catch(error => {
      console.log(error);
      Notify.failure('Oops. Something went wrong. Please refresh the page.');
    });
}

function deletefromLocalStorage(event) {
  if (!event.target.closest('.exercise-card-remove-btn')) {
    return;
  }

  const currentId = event.target.closest('.favorites-exercise-card').dataset.id;

  arrFavoriteExercises = arrFavoriteExercises.filter(id => id !== currentId);

  localStorage.setItem(
    'favoriteExercises',
    JSON.stringify(arrFavoriteExercises)
  );

  if (arrFavoriteExercises.length === 0) {
    messageNone.style.display = 'block';
    favoritsWorkoutsList.innerHTML = '';
    pagination.innerHTML = '';
  } else {
    updateMarkup();
  }
}

// Функція для розділення масиву на підмасиви
function splitArrayIntoSubarrays(arr, subarraySize) {
  const result = [];
  for (let i = 0; i < arr.length; i += subarraySize) {
    result.push(arr.slice(i, i + subarraySize));
  }
  return result;
}

function updateMarkup() {
  if (arrFavoriteExercises.length <= perPage) {
    pagination.style.display = 'none';
  }

  if (!isDesktop) {
    const splitArrFavoriteExercises = splitArrayIntoSubarrays(
      arrFavoriteExercises,
      perPage
    );
    const totalPages = Math.ceil(arrFavoriteExercises.length / perPage);

    workoutSearch(splitArrFavoriteExercises[page - 1])
      .then(data => {
        favoritsWorkoutsList.innerHTML = createMarkup(data);
        const array = returnPaginationRange(totalPages, page);
        pagination.innerHTML = renderPagination(page, array);
      })
      .catch(error => {
        console.log(error);
        Notify.failure('Oops. Something went wrong. Please refresh the page.');
      });
  } else {
    workoutSearch(arrFavoriteExercises)
      .then(data => {
        favoritsWorkoutsList.innerHTML = createMarkup(data);
      })
      .catch(error => {
        console.log(error);
        Notify.failure('Oops. Something went wrong. Please refresh the page.');
      });
  }
}
