import axios from 'axios';
import notiflix from 'notiflix';
import { returnPaginationRange } from './utils/utils.js';
import { renderPagination } from './templates/pagination-markup.js';

const refs = {
  notFoundText: document.querySelector('.favorites-not-found-text'),
  exercisesWrapper: document.querySelector('.favorites-exercise-card-wrapper'),
  pagination: document.querySelector('.pagination-nav'),
};

function checkWrapper() {
  if (refs.exercisesWrapper.innerHTML === '') {
    refs.notFoundText.classList.remove('hidden');
    return;
  }
}

function pushItemToStorage(item) {
  array.push(item);
  localStorage.setItem('favoriteExercises', array);
}

function removeValueFromArrayStorage(array, value) {
  console.log(array, value);
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
    pushArrayToStorage(array);
  }
}

function getArrayFromStorage() {
  if (localStorage.getItem('favoriteExercises') === null) {
    return;
  }
  return localStorage.getItem('favoriteExercises').split(',');
}

function pushArrayToStorage(array) {
  console.log(array);
  localStorage.setItem('favoriteExercises', array);
}

function addListener() {
  document
    .querySelector('.favorites-exercise-card')
    .addEventListener('click', () => {
      console.log();
      if (
        event.target.classList.value === 'exercise-card-remove-btn' ||
        event.target.classList.value === 'exercise-card-remove-icon' ||
        event.target.classList.value === ''
      ) {
        removeValueFromArrayStorage(array, event.currentTarget.dataset.id);
        refs.exercisesWrapper.innerHTML = '';
        renderMarkup();
        notiflix.Notify.warning('You have just deleted an exercise', {
          fontSize: '24px',
          width: '600px',
          position: 'center-top',
          distance: '165px',
          borderRadius: '10px',
        });
      }
    });
}

function renderMarkup() {
  if (getArrayFromStorage().includes('')) {
    refs.notFoundText.classList.remove('hidden');
  }
  getFavoriteExerciseData(getArrayFromStorage()).then(response => {
    response.map(({ data }) => {
      const { bodyPart, name, target, burnedCalories, _id } = data;
      refs.exercisesWrapper.insertAdjacentHTML(
        'afterbegin',
        createMarkup(
          firstLetterUpperCase(bodyPart),
          firstLetterUpperCase(name),
          firstLetterUpperCase(target),
          burnedCalories,
          _id
        )
      );
      addListener();
      refs.notFoundText.classList.add('hidden');
    });
  });
}

async function getFavoriteExerciseData(ids) {
  const arrayOfPromises = ids.map(async id => {
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises/${id}`
    );
    return response;
  });

  const exercises = await Promise.all(arrayOfPromises);
  return exercises;
}

function firstLetterUpperCase(word) {
  const splitted = word.split('');
  const first = splitted[0].toUpperCase();
  const rest = [...splitted];
  rest.splice(0, 1);
  const result = [first, ...rest].join('');
  return result;
}

function createMarkup(part, title, target, calories, id) {
  return `<div class="favorites-exercise-card" data-id="${id}">
                  <div class="exercise-card-top">
                    <p class="exercise-card-top-text">WORKOUT</p>
                    <button class="exercise-card-remove-btn">
                      <svg
                        class="exercise-card-remove-icon"
                        width="16"
                        height="16">
                        <use
                          href="img/symbol-defs.svg#icon-exercises-content-garbage"
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
                          href="img/symbol-defs.svg#icon-scroll-arrow"
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
                        <use href="img/symbol-defs.svg#icon-aside-men"></use>
                      </svg>
                    </div>
                    <h3 class="exercise-card-title">${title}</h3>
                  </div>
                  <div class="exercise-card-bottom">
                    <p class="exercice-card-indexes">Burned calories: <span class="exercice-card-indexes-values">${calories}/3 min</span>Body part: <span class="exercice-card-indexes-values">${part}</span>Target: <span class="exercice-card-indexes-values">${target}</span></p>
                  </div>
                </div>`;
}

let array = [];

// pushItemToStorage('64f389465ae26083f39b17a2');
// pushItemToStorage('64f389465ae26083f39b17df');
// pushItemToStorage('64f389465ae26083f39b17a5');
// pushItemToStorage('64f389465ae26083f39b17b7');
// pushItemToStorage('64f389465ae26083f39b17ba');
// pushItemToStorage('64f389465ae26083f39b180e');
// pushItemToStorage('64f389465ae26083f39b189e');
// pushItemToStorage('64f389465ae26083f39b18ae');
// pushItemToStorage('64f389465ae26083f39b18d7');
// pushItemToStorage('64f389465ae26083f39b190d');

if (
  localStorage.getItem('favoriteExercises') === null ||
  localStorage.getItem('favoriteExercises') === ''
) {
  refs.notFoundText.classList.remove('hidden');
} else {
  refs.notFoundText.classList.add('hidden');
  array = getArrayFromStorage();
  refs.exercisesWrapper.innerHTML = '';

  // checkWrapper();

  renderMarkup();

  checkWrapper();
}
