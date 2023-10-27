import svgSprite from '../../img/symbol-defs.svg';

export function createMarkup(array) {
  return array
    .map(item => {
      const { name, burnedCalories, time, bodyPart, target, _id } = item.data;

      return `
      <div class="favorites-exercise-card" data-modal-open data-id="${_id}">
      <div class="exercise-card-top">
        <p class="exercise-card-top-text">WORKOUT</p>
        <button class="exercise-card-remove-btn">
          <svg
            class="exercise-card-remove-icon"
            width="16"
            height="16">
            <use
              href="${svgSprite}#icon-exercises-content-garbage"
            ></use>
          </svg>
        </button>
        <button class="exercise-card-start-btn" data-id="${_id}">
          Start
          <svg
            class="exercise-card-start-icon"
            width="16"
            height="16">
            <use
              href="${svgSprite}#icon-scroll-arrow"
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
            <use href="${svgSprite}#icon-aside-men"></use>
          </svg>
        </div>
        <h3 class="exercise-card-title">${name}</h3>
      </div>
      <div class="exercise-card-bottom">
        <p>Burned calories: <span>${burnedCalories} / ${time} min</span></p>
        <p>Body part: <span class="capitalize">${bodyPart}</span></p>
        <p>Target: <span class="capitalize">${target}</span></p>
      </div>
    </div>`;
    })
    .join('');
}
