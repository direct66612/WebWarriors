import axios from 'axios';

const backdrop = document.querySelector('.backdrop-ex');
const closeButton = document.querySelector('.modal-close-btn');
const modal = document.querySelector('.modal-ex');
const KEY_LS = 'favoriteExercises';

closeButton.addEventListener('click', closeModal);
document.addEventListener('keydown', onEscKeyPress);
const ratingForm = document.querySelector('.rating-feedback-form');

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

function openModal() {
  if (modal) {
    document.querySelector('body').style.overflow = 'hidden';
    modal.classList.remove('is-hidden');
    backdrop.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscKeyPress);

    modal.addEventListener('click', event => {
      event.stopPropagation();
    });

    backdrop.removeEventListener('click', closeModal);
    // backdrop.addEventListener('click', closeModal);

    updateFavoriteButtonStatus(exercise[0]._id);
  }
}

function closeModal() {
  if (modal) {
    document.querySelector('body').style.overflow = 'visible';

    modal.classList.add('is-hidden');
    document.removeEventListener('keydown', onEscKeyPress);
    backdrop.removeEventListener('click', closeModal);
    backdrop.classList.add('is-hidden');
    ratingForm.classList.add('visually-hidden');
    ratingForm.classList.remove('rating-form-active');
  }
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// backdrop.addEventListener('click', event => {
//   if (event.target === backdrop) {
//     closeModal();
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  const exercisesContainer = document.querySelector(
    '.favorites-exercise-card-wrapper'
  );

  exercisesContainer.addEventListener('click', async event => {
    const seeExerciseBtn = event.target.closest('.exercise-card-start-btn');
    if (!seeExerciseBtn) return;

    let exerciseId = seeExerciseBtn.dataset.id;
    try {
      const fetchedExercise = await fetchExercise(exerciseId);
      if (fetchedExercise) {
        exercise = fetchedExercise;

        updateFavoriteButtonStatus(exercise);
        openModal();
      }
    } catch (error) {
      console.log(error);
    }
  });
});

let currentExerciseId;
let exercise;

export function setExerciseId(exerciseId) {
  currentExerciseId = exerciseId;
}

async function fetchExercise(exerciseId) {
  const url = `https://your-energy.b.goit.study/api/exercises/${exerciseId}`;
  try {
    const response = await axios.get(url);
    exercise = [response.data];

    setExerciseId(exerciseId);

    displayExerciseImg(exercise);
    displayExerciseTitle(exercise);
    displayExerciseDescription(exercise);
    displayExerciseRating(exercise);
    displayExerciseList(exercise);
    displayStarRating(exercise);
    return exercise;
  } catch (error) {
    console.log(error);
  }
}
function displayExerciseImg(exercise) {
  const exerciseImg = document.querySelector('.modal-img');
  exerciseImg.src = exercise[0].gifUrl;
}

function displayExerciseTitle(exercise) {
  const exerciseTitleEl = document.querySelector('.ex-title');
  exerciseTitleEl.textContent = exercise[0].name;
}

function displayExerciseDescription(exercise) {
  const exerciseDecriptionEl = document.querySelector('.ex-description');
  exerciseDecriptionEl.textContent = exercise[0].description;
}

function displayExerciseRating(exercise) {
  const exerciseRatingEl = document.querySelector('.ratinng-value');
  exerciseRatingEl.textContent = Number.isInteger(exercise[0].rating)
    ? `${exercise[0].rating}.0`
    : exercise[0].rating;
}

function displayExerciseList(exercise) {
  const exerciseInfoEl = document.querySelector('.info-list');
  exerciseInfoEl.innerHTML = exercise
    .map(item => {
      const { bodyPart, burnedCalories, target, equipment, popularity, time } =
        item;
      return `
      <li class="info-item_info"><span>Target</span> <span class="info-item">${target}</span></li>
      <li class="info-item_info"><span>Body Part</span> <span class="info-item">${bodyPart}</span></li>
      <li class="info-item_info"><span>Equipment</span> <span class="info-item">${equipment}</span></li>
      <li class="info-item_info"><span>Popular</span> <span class="info-item">${popularity}</span></li>
      <li class="info-item_info"><span>Burned Calories</span> <span class="info-item">${burnedCalories}/${time} min</span></li>
  `;
    })
    .join('');
}

function displayStarRating(exercise) {
  const ratingValue = parseFloat(exercise[0].rating);
  const starElements = document.querySelectorAll('.modal-rating-star-icon');

  for (let i = 0; i < starElements.length; i++) {
    if (i < ratingValue) {
      starElements[i].classList.add('active');
    } else {
      starElements[i].classList.remove('active');
    }
  }
}

function getFavoriteExercises() {
  return JSON.parse(localStorage.getItem('favoriteExercises')) || [];
}

function saveFavoriteExercises(favoriteExercises) {
  localStorage.setItem(KEY_LS, JSON.stringify(favoriteExercises));
}

function isExerciseInFavorites(exerciseId) {
  const favoriteExercises = getFavoriteExercises();

  const isFavorite = favoriteExercises.some(
    favoriteExercise => favoriteExercise === exerciseId
  );

  return isFavorite;
}

// Функція додавання вправи
function addToFavorites(exerciseId) {
  const favoriteExercises = getFavoriteExercises();
  favoriteExercises.push(exerciseId);
  saveFavoriteExercises(favoriteExercises);
}

// Функція видалення вправи
function removeFromFavorites(exerciseId) {
  const favoriteExercises = getFavoriteExercises();

  const updatedFavoriteExercises = favoriteExercises.filter(
    favoriteExercise => favoriteExercise !== exerciseId
  );

  saveFavoriteExercises(updatedFavoriteExercises);
}

const addToFavoriteButton = document.querySelector('.btn-add-favorite');

addToFavoriteButton.addEventListener('click', () => {
  const exerciseId = exercise[0]._id;
  const isFavorite = isExerciseInFavorites(exerciseId);

  if (isFavorite) {
    removeFromFavorites(exerciseId);
    addToFavoriteButton.textContent = 'Add to favorite ♡';
  } else {
    addToFavorites(exerciseId);
    addToFavoriteButton.textContent = 'Remove from favorite 🗑';
  }
});

// let exerciseId = exercise[0]._id;

function updateFavoriteButtonStatus(exerciseId) {
  const isFavorite = isExerciseInFavorites(exerciseId);
  addToFavoriteButton.textContent = isFavorite
    ? 'Remove from favorite 🗑'
    : 'Add to favorite ♡';
}
export { currentExerciseId };
export { openModal };
