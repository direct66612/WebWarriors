import svgSprite from '../../img/symbol-defs.svg';

export default function renderExercises(array) {
  return array
    .map(item => {
      const { rating, name, burnedCalories, time, bodyPart, target, _id } =
        item;

      return `
      <li class="item">
        <div class="item-header">
          <span class='item-workout'>Workout</span>
          <p class='item-rating js-rating'>${
            Number.isInteger(rating) ? `${rating}.0` : rating
          }</p>
          <svg class="rating-star" width="18" height="18">
            <use href="${svgSprite}#icon-exercises-content-gold-star"></use>
          </svg>
        </div>

        <div class="item-body">
          <svg class="" width="24" height="24">
            <use href="${svgSprite}#icon-running-man"></use>
          </svg>
          <h3 class="item-title js-item-title">${name}</h3>
        </div>

        <div class='item-footer'>
          <p>Burned calories: <span>${burnedCalories} / ${time} min</span></p>
          <p>Body part: <span class="capitalize">${bodyPart}</span></p>
          <p>Target: <span class="capitalize">${target}</span></p>
        </div>

        <button class='item-button' data-id=${_id} data-modal-open>Start
          <svg class="start-icon" width="16" height="16">
            <use href="${svgSprite}#icon-scroll-arrow"></use>
          </svg>
        </button>
      </li>
    `;
    })
    .join('');
}
