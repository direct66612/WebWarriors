//основная логика (слухачі подій)
import { Notify } from 'notiflix';

import { getExercisesMarkup } from './api-service/exercises-category-api';
import { createMarkup } from './templates/exercises-category-markup';
import { returnPaginationRange } from './utils/utils';
import { renderPagination } from './templates/pagination-markup';
import { clearInput, onExercisesPage } from './exercises';
import { loader } from './templates/loader';

const refs = {
  list: document.querySelector('.exercises-filter-list'),
  newList: document.querySelector('.list-for-new-exercises'),
  bodyPartsItem: document.querySelector('.filter-of-body-parts'),
  musclesItem: document.querySelector('.filter-of-muscles'),
  equipmentItem: document.querySelector('.filter-of-equipment'),
  pagination: document.querySelector('.pagination-nav'),
  title: document.querySelector('.exercises-main-title'),
  form: document.querySelector('.js-form'),
};

let page = 1;

refs.list.addEventListener('click', handleFilter);

refs.newList.innerHTML = loader;
getExercisesMarkup(refs.list.dataset.filter, page)
  .then(data => {
    if (data.totalPages === 1) {
      refs.pagination.style.display = 'none';
    }

    refs.newList.innerHTML = '';
    addMarkup(data.results);
    let array = returnPaginationRange(data.totalPages, page);
    refs.pagination.innerHTML = renderPagination(page, array);

    refs.pagination.addEventListener('click', onCategoriesPage);
  })
  .catch(err => {
    console.error('Error: ', err);
    Notify.failure('Oops. Something went wrong. Try reloading the page');
  });

function handleFilter(event) {
  const filter = event.target.dataset.category;

  if (!event.target.classList.contains('exercises-filter-btn')) {
    return;
  }

  [...event.currentTarget.children].forEach(element => {
    element.children[0].classList.remove('active');
    element.children[0].disabled = false;
  });

  event.target.classList.add('active');
  event.target.disabled = true;

  refs.title.textContent = 'Exercises';
  refs.form.classList.add('is-hidden');
  refs.form.reset();
  refs.list.dataset.filter = filter;
  getExercisesMarkup(filter, page)
    .then(data => {
      if (data.totalPages <= 1) {
        refs.pagination.style.display = 'none';
      } else {
        refs.pagination.style.display = 'block ';
      }
      refs.newList.innerHTML = '';
      addMarkup(data.results);
      let array = returnPaginationRange(data.totalPages, page);
      refs.pagination.innerHTML = renderPagination(page, array);

      refs.pagination.removeEventListener('click', onExercisesPage);
      refs.pagination.addEventListener('click', onCategoriesPage);
    })
    .catch(err => {
      console.error('Error: ', err);
      Notify.failure('Oops. Something went wrong. Try reloading the page');
    });
}

export function onCategoriesPage(event) {
  let page = event.target.dataset.page;

  if (
    page === '...' ||
    !event.target.classList.contains('js-page-link') ||
    page === '' ||
    event.target.classList.contains('active')
  ) {
    return;
  }

  window.scrollTo({ top: refs.title.offsetTop - 60 });
  page = Number(page);
  getExercisesMarkup(refs.list.dataset.filter, page)
    .then(data => {
      addMarkup(data.results);
      let array = returnPaginationRange(data.totalPages, page);
      refs.pagination.innerHTML = renderPagination(page, array);
    })
    .catch(err => {
      console.error('Error: ', err);
      Notify.failure('Oops. Something went wrong. Try reloading the page');
    });
}

function addMarkup(data) {
  if (Array.isArray(data)) {
    refs.newList.innerHTML = createMarkup(data);
  } else {
    console.error('Data is not an array:', data);
  }
}
