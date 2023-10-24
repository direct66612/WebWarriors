// import axios from 'axios';

// const backdrop = document.querySelector('.backdrop-ex');
// const closeButton = document.querySelector('.modal-close-btn');
// const modal = document.querySelector('.modal-ex');

// closeButton.addEventListener('click', closeModal);
// document.addEventListener('keydown', onEscKeyPress);

// backdrop.addEventListener('click', event => {
//   if (event.target !== modal && !modal.contains(event.target)) {
//     closeModal();
//   }
// });

// function openModal() {
//   if (modal) {
//     modal.classList.remove('is-hidden');
//     backdrop.classList.remove('is-hidden');
//     document.addEventListener('keydown', onEscKeyPress);

//     modal.addEventListener('click', event => {
//       event.stopPropagation();
//     });

//     backdrop.removeEventListener('click', closeModal);
//     backdrop.addEventListener('click', closeModal);

//     updateFavoriteButtonStatus(exercise);
//   }
// }

// function closeModal() {
//   if (modal) {
//     modal.classList.add('is-hidden');
//     document.removeEventListener('keydown', onEscKeyPress);
//     backdrop.removeEventListener('click', closeModal);
//     backdrop.classList.add('is-hidden');
//   }
// }

// function onEscKeyPress(event) {
//   if (event.key === 'Escape') {
//     closeModal();
//   }
// }

// backdrop.addEventListener('click', event => {
//   if (event.target === backdrop) {
//     closeModal();
//   }
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const exercisesContainer = document.querySelector('.js-list');

//   exercisesContainer.addEventListener('click', async event => {
//     const seeExerciseBtn = event.target.closest('.item-button');
//     if (!seeExerciseBtn) return;

//     const exerciseId = seeExerciseBtn.dataset.id;
//     try {
//       const fetchedExercise = await fetchExercise(exerciseId);
//       if (fetchedExercise) {
//         exercise = fetchedExercise;

//         updateFavoriteButtonStatus(exercise);
//         openModal();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });

// });

// let currentExerciseId;

// export function setExerciseId(exerciseId) {
//   currentExerciseId = exerciseId;
// }

// async function fetchExercise(exerciseId) {
//   const url = `https://your-energy.b.goit.study/api/exercises/${exerciseId}`;
//   try {
//     const response = await axios.get(url);
//     const exercise = response.data;

//     setExerciseId(exerciseId);

//     displayExerciseImg(exercise);
//     displayExerciseTitle(exercise);
//     displayExerciseDescription(exercise);
//     displayExerciseTime(exercise);
//     displayExerciseRating(exercise);
//     displayExerciseList(exercise);
//     displayStarRating(exercise);
//     return exercise;
//   } catch (error) {
//     console.log(error);
//   }
// }

// function displayExerciseImg(exercise) {
//   const exerciseImg = document.querySelector('.modal-img');
//   const imgLink = exercise.gifUrl;

//   if (imgLink !== '') {exerciseImg.src = `${imgLink}`;
//     }

// }

// function displayExerciseTitle(exercise) {
//   const exerciseTitleEl = document.querySelector('.ex-title');
//   exerciseTitleEl.textContent = exercise.name;
// }

// function displayExerciseDescription(exercise) {
//   const exerciseDecriptionEl = document.querySelector('.ex-description');
//   exerciseDecriptionEl.textContent = exercise.description;
// }

// function displayExerciseTime(exercise) {
//   const exerciseBurnedEl = document.querySelector('.ex-time');
//   exerciseBurnedEl.textContent = exercise.time;
// }

// function displayExerciseRating(exercise) {
//   const exerciseRatingEl = document.querySelector('.ratinng-value');
//   exerciseRatingEl.textContent = exercise.rating;
// }

// function displayExerciseList(exercise) {
//   const exerciseInfoEl = document.querySelector(
//     '.info-list'
//   );
//   exerciseInfoEl.innerHTML = exercise.informations
//     .map(
//       ({ info, name }) => `
//     <li class="info-item">
//       <p class="info-item_name">${name}</p>
//       <p class="info-item_info">${info}</p>
//     </li>
//   `
//     )
//     .join('');
// }

// function displayStarRating(exercise) {
//   const ratingValue = parseFloat(exercise.rating);
//   const starElements = document.querySelectorAll('.modal-rating-star-icon');

//   for (let i = 0; i < starElements.length; i++) {
//     if (i < ratingValue) {
//       starElements[i].classList.add('active');
//     } else {
//       starElements[i].classList.remove('active');
//     }
//   }
// }

// function getFavoriteExercises() {
//   const favoriteExercises =
//     JSON.parse(localStorage.getItem('favoriteExercises')) || [];
//   return favoriteExercises;
// }

// function saveFavoriteExercises(favoriteExercises) {
//   localStorage.setItem('favoriteExercises', JSON.stringify(favoriteExercises));
// }

// function removeFromFavorites(exercise) {
//   const favoriteExercises = getFavoriteExercises();
//   const updatedFavorites = favoriteExercises.filter(
//     favoriteExercise => favoriteExercise.id !== exercise._id
//   );

//   saveFavoriteExercises(updatedFavorites);
// }

// const addToFavoriteButton = document.querySelector('.btn-add-favorite');

// function isExerciseInFavorites(exercise) {
//   const favoriteExercises = getFavoriteExercises();
//   const isFavorite = favoriteExercises.some(
//     favoriteExercise => favoriteExercise.id === exercise._id
//   );

//   return isFavorite;
// }

// function addToFavorites(exercise) {
//   const favoriteExercises = getFavoriteExercises();
//   const { _id, name, bodyPart, rating, burnedCalories, time, description, target, equipment, popularity } = exercise;

//   const newExercise = { id: _id, name, bodyPart, rating, burnedCalories, time, description, target, equipment, popularity };

//   const isDuplicate = isExerciseInFavorites(exercise);
//   if (!isDuplicate) {
//     favoriteExercises.push(newExercise);
//     addToFavoriteButton.textContent = 'Remove from favorite';
//   } else {
//     const updatedFavorites = favoriteExercises.filter(
//       favoriteExercise => favoriteExercise.id !== _id
//     );
//     saveFavoriteExercises(updatedFavorites);
//     addToFavoriteButton.textContent = 'Add to favorite';
//   }
//   saveFavoriteExercises(favoriteExercises);
// }

// addToFavoriteButton.addEventListener('click', () => {

//   const isFavorite = isExerciseInFavorites(exercise);

//   if (isFavorite) {
//     removeFromFavorites(exercise);
//     addToFavoriteButton.textContent = 'Add to favorite';
//   } else {
//     addToFavorites(exercise);
//     addToFavoriteButton.textContent = 'Remove from favorite';
//   }
// });

// function updateFavoriteButtonStatus(exercise) {
//   const isFavorite = isExerciseInFavorites(exercise);
//   addToFavoriteButton.textContent = isFavorite
//     ? 'Remove from favorite'
//     : 'Add to favorite';
// }
