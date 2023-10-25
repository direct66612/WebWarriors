import notiflix from 'notiflix';
import { createMarkup } from './templates/favorites-markup';
import { openModal } from './modal-ex-favorites';
import { workoutSearch } from './api-service/favorites-api';
const arrFavoriteExercises = JSON.parse(
  localStorage.getItem('favoriteExercises')
);
const messageNone = document.querySelector('.favorites-not-found-text');
if (arrFavoriteExercises.length) {
  messageNone.style.display = 'none';
}
if (arrFavoriteExercises.length) {
  const favoritsWorkoutsList = document.querySelector(
    '.favorites-exercise-card-wrapper'
  );
  favoritsWorkoutsList.innerHTML = createMarkup(arrFavoriteExercises);
}
if (arrFavoriteExercises.length) {
  const deleteBtn = document.querySelectorAll('.exercise-card-remove-btn');

  deleteBtn.forEach(btnEl => {
    btnEl.addEventListener('click', deletefromLocalStorage);
  });
  let infexOfEl;

  function deletefromLocalStorage(event) {
    const currentId = event.target.closest('.favorites-exercise-card').dataset
      .id;
    arrFavoriteExercises.forEach(el => {
      infexOfEl = arrFavoriteExercises.findIndex(
        ({ _id }) => _id === currentId
      );
    });
    arrFavoriteExercises.splice(infexOfEl, 1);

    localStorage.removeItem('favoriteExercises');
    localStorage.setItem(
      'favoriteExercises',
      JSON.stringify(arrFavoriteExercises)
    );
    location.reload();
  }
}
if (!arrFavoriteExercises.length) {
  messageNone.style.display = 'block';
}

const openButtons = document.querySelectorAll('[data-modal-open]');
openButtons.forEach(openModalBtnItem => {
  openModalBtnItem.addEventListener('click', openModal);
});
// const refs = {
//   notFoundText: document.querySelector('.favorites-not-found-text'),
//   exercisesWrapper: document.querySelector('.favorites-exercise-card-wrapper'),
// };
// const arr = [
//   '64f389465ae26083f39b17a2',
//   '64f389465ae26083f39b17df',
//   '64f389465ae26083f39b17a5',
//   '64f389465ae26083f39b17b7',
//   '64f389465ae26083f39b17ba',
//   '64f389465ae26083f39b180e',
//   '64f389465ae26083f39b189e',
//   '64f389465ae26083f39b18ae',
//   '64f389465ae26083f39b18d7',
//   '64f389465ae26083f39b190d',
// ];

// renderMarkup();
// console.log(typeof refs.exercisesWrapper.innerHTML);
// if (refs.exercisesWrapper.innerHTML === '') {
//   refs.notFoundText.style.display = 'block';
// }
// function addListener() {
//   document
//     .querySelector('.favorites-exercise-card')
//     .addEventListener('click', () => {
//       console.log();
//       if (
//         event.target.classList.value === 'exercise-card-remove-btn' ||
//         event.target.classList.value === 'exercise-card-remove-icon' ||
//         event.target.classList.value === ''
//       ) {
//         removeValueFromArray(arr, event.currentTarget.dataset.id);
//         refs.exercisesWrapper.innerHTML = '';
//         renderMarkup();
//         notiflix.Notify.warning('You have just deleted an exercise', {
//           fontSize: '24px',
//           width: '600px',
//           position: 'center-top',
//           distance: '165px',
//           borderRadius: '10px',
//         });
//       }
// else if (refs.exercisesWrapper.innerHTML === '') {
//   refs.notFoundText.style.display = 'block';
// }
//       else {
//         return;
//       }
//     });
// }
// function renderMarkup() {
//   getFavoriteExerciseData(arr).then(response => {
//     response.map(({ data }) => {
//       const { bodyPart, name, target, burnedCalories, _id } = data;
//       refs.exercisesWrapper.insertAdjacentHTML(
//         'afterbegin',
//         createMarkup(
//           firstLetterUpperCase(bodyPart),
//           firstLetterUpperCase(name),
//           firstLetterUpperCase(target),
//           burnedCalories,
//           _id
//         )
//       );
//       addListener();
//     });
//   });
// }

// async function getFavoriteExerciseData(ids) {
//   const arrayOfPromises = ids.map(async id => {
//     const response = await axios.get(
//       `https://your-energy.b.goit.study/api/exercises/${id}`
//     );
//     return response;
//   });

//   const exercises = await Promise.all(arrayOfPromises);
//   return exercises;
// }

// function firstLetterUpperCase(word) {
//   const splitted = word.split('');
//   const first = splitted[0].toUpperCase();
//   const rest = [...splitted];
//   rest.splice(0, 1);
//   const result = [first, ...rest].join('');
//   return result;
// }

// function removeValueFromArray(array, value) {
//   const index = array.indexOf(value);
//   if (index > -1) {
//     array.splice(index, 1);
//   }
// }
