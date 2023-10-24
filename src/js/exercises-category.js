//основная логика (слухачі подій)
import { Notify } from 'notiflix';

import { getExercisesMarkup } from './api-service/exercises-category-api';
import { createMarkup } from './templates/exercises-category-markup';
import { returnPaginationRange } from './utils/utils';
import { renderPagination } from './templates/pagination-markup';
import { onExercisesPage } from './exercises';

window.addEventListener('load', () => {
  refs.bodyPartsItem.style.color = 'black';
});

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

getExercisesMarkup(refs.list.dataset.filter, page)
  .then(data => {
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

  refs.title.textContent = 'Exercise';
  refs.form.classList.add('is-hidden');
  refs.list.dataset.filter = filter;
  getExercisesMarkup(filter, page)
    .then(data => {
      addMarkup(data.results);
      let array = returnPaginationRange(data.totalPages, page);
      refs.pagination.innerHTML = renderPagination(page, array);

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

  window.scrollTo({ top: refs.newList.offsetTop - 120 });
  page = Number(page);
  getExercisesMarkup(refs.list.dataset.filter, page)
    .then(data => {
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

function removeActiveClass() {
  if (refs.bodyPartsItem.classList.contains('active')) {
    refs.bodyPartsItem.classList.remove('active');
    refs.bodyPartsItem.style.color = '#24242499';
  }
  if (refs.musclesItem.classList.contains('active')) {
    refs.musclesItem.classList.remove('active');
    refs.musclesItem.style.color = '#24242499';
  }
  if (refs.equipmentItem.classList.contains('active')) {
    refs.equipmentItem.classList.remove('active');
    refs.equipmentItem.style.color = '#24242499';
  }
}

refs.bodyPartsItem.addEventListener('click', () => {
  removeActiveClass();
  refs.bodyPartsItem.classList.add('active');
  refs.bodyPartsItem.style.color = 'black';
  refs.bodyPartsItem.disabled = true;
  refs.musclesItem.disabled = false;
  refs.equipmentItem.disabled = false;
});
refs.musclesItem.addEventListener('click', () => {
  removeActiveClass();
  refs.musclesItem.classList.add('active');
  refs.musclesItem.style.color = 'black';
  refs.bodyPartsItem.style.color = '#24242499';
  refs.bodyPartsItem.disabled = false;
  refs.musclesItem.disabled = true;
  refs.equipmentItem.disabled = false;
});

refs.equipmentItem.addEventListener('click', () => {
  removeActiveClass();
  refs.equipmentItem.classList.add('active');
  refs.equipmentItem.style.color = 'black';
  refs.bodyPartsItem.style.color = '#24242499';
  refs.bodyPartsItem.disabled = false;
  refs.musclesItem.disabled = false;
  refs.equipmentItem.disabled = true;
});

function addMarkup(data) {
  if (Array.isArray(data)) {
    refs.newList.innerHTML = createMarkup(data);
  } else {
    console.error('Data is not an array:', data);
  }
}

