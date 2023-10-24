import _, { times } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { returnPaginationRange } from './utils/utils';
// import getCategoryData from './api-service/categories-api';
import getExerciseData from './api-service/exercises-api';
// import renderCategories from './templates/categories-markup';
import renderExercises from './templates/exercises-markup';
import { renderPagination } from './templates/pagination-markup';
import { onCategoriesPage } from './exercises-category';

const form = document.querySelector('.js-form');
const title = document.querySelector('.exercises-main-title');
const filterList = document.querySelector('.exercises-filter-list');
const list = document.querySelector('.list-for-new-exercises');
const filterNav = document.querySelector('.js-filter-nav');
const pagination = document.querySelector('.pagination-nav');

const categoriesSearchParams = {
  filter: 'Body parts',
  limit: window.innerWidth < 768 ? 9 : 12,
};

const exercisesSearchParams = {
  filter: '',
  category: '',
  keyword: '',
  limit: window.innerWidth < 768 ? 8 : 10,
};

let page = 1;
let isCategoriesBlock = true;

list.addEventListener('click', handleToExercises);

// function handleFilter(event) {
//   const categoryName = event.target.dataset.category;

//   if (
//     !event.target.classList.contains('nav-link') ||
//     (isCategoriesBlock && categoriesSearchParams.filter === categoryName)
//   ) {
//     return;
//   }

//   isCategoriesBlock = true;
//   title.innerHTML = 'Exercises';
//   pagination.removeEventListener('click', onExercisesPage);
//   pagination.addEventListener('click', onCategoriesPage);
//   form.classList.add('is-hidden');

//   categoriesSearchParams.filter = categoryName;

//   document.querySelectorAll('.category-nav a').forEach(link => {
//     link.classList.remove('active');
//   });

//   event.target.classList.add('active');

//   getCategoryData(categoriesSearchParams, page)
//     .then(data => {
//       list.innerHTML = renderCategories(data.results);
//       let array = returnPaginationRange(data.totalPages, page);
//       pagination.innerHTML = renderPagination(page, array);
//     })
//     .catch(error => {
//       console.error(error);
//       Notify.failure('Oops. Something went wrong. Try reloading the page');
//     });
// }

// Навігація по пагінації блок вправ
export function onExercisesPage(event) {
  let page = event.target.dataset.page;

  if (
    page === '...' ||
    !event.target.classList.contains('js-page-link') ||
    event.target.classList.contains('active')
  ) {
    return;
  }

  window.scrollTo({ top: list.offsetTop - 200 });
  page = Number(page);
  getExerciseData(exercisesSearchParams, page)
    .then(data => {
      list.innerHTML = renderExercises(data.results);
      let array = returnPaginationRange(data.totalPages, page);
      pagination.innerHTML = renderPagination(page, array);
    })
    .catch(error => {
      console.error(error);
      Notify.failure('Oops. Something went wrong. Try reloading the page');
    });
}

// Переключення на список вправ
export function handleToExercises(event) {
  if (!event.target.classList.contains('js-item')) {
    return;
  }

  isCategoriesBlock = false;
  // form.reset();
  pagination.removeEventListener('click', onCategoriesPage);
  pagination.addEventListener('click', onExercisesPage);
  exercisesSearchParams.filter = filterList.dataset.filter;
  exercisesSearchParams.category =
    event.target.closest('.js-category-item').dataset.category;

  form.classList.remove('is-hidden');
  form.addEventListener('input', handleSearch);
  getExerciseData(exercisesSearchParams, page)
    .then(data => {
      const categoryName =
        exercisesSearchParams.category[0].toUpperCase() +
        exercisesSearchParams.category.slice(1);
      title.innerHTML = `Exercises / <span>${categoryName}</span>`;
      list.innerHTML = renderExercises(data.results);
      let array = returnPaginationRange(data.totalPages, page);
      pagination.innerHTML = renderPagination(page, array);
    })
    .catch(error => {
      console.error(error);
      Notify.failure('Oops. Something went wrong. Try reloading the page');
    });
}

const searchIcon = `
  <svg class="search-icon" width="26" height="26">
    <use href="../img/symbol-defs.svg#icon-search"></use>
  </svg>
`;

const clearIcon = `
  <svg class="clear-icon" width="18" height="18">
    <use href="../img/symbol-defs.svg#icon-remove"></use>
  </svg>
`;

// Пошук в полі пошуку
function handleSearch(event) {
  const { input, button } = event.currentTarget.elements;

  if (input.value.length > 0) {
    button.innerHTML = clearIcon;
    button.addEventListener('click', clearInput);
  } else {
    button.removeEventListener('click', clearInput);
    button.innerHTML = searchIcon;
  }

  // Prevent user adding 2 or more adjacent spaces
  const inputValue = input.value.replace(/\s{2,}/g, ' ');
  input.value = inputValue;
  exercisesSearchParams.keyword = inputValue;

  getExerciseData(exercisesSearchParams, page)
    .then(data => {
      if (data.results.length === 0) {
        list.innerHTML =
          '<p><b style="font-size: 28px">No matches found</b> <br>Please try another search</p>';
        pagination.innerHTML = '';
        return;
      }
      list.innerHTML = renderExercises(data.results);
      let array = returnPaginationRange(data.totalPages, page);
      pagination.innerHTML = renderPagination(page, array);
    })
    .catch(error => {
      console.error(error);
      Notify.failure('Oops. Something went wrong. Try reloading the page');
    })
    .finally(() => {
      exercisesSearchParams.keyword = '';
    });
}

function clearInput() {
  form.reset();

  // Create and dispatch an 'input' event
  const inputEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  form.dispatchEvent(inputEvent);
}
