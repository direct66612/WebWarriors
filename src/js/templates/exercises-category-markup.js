//разметка

export function createMarkup(array) {
  return array
    .map(({ filter, name, imgURL }) => {
      return `
        <li class = "new-exercises-item">  
          <div class = "exercises-filter-IMG js-category-item js-item" style="
          background: linear-gradient(0deg, rgba(17, 17, 17, 0.50) 0%, rgba(17, 17, 17, 0.50) 100%), url('${imgURL}'), lightgray -19.24px -11px / 112.354% 111.111% no-repeat; background-size: contain; background-size: cover;" data-category="${name}">
            <div class="container-for-h2-and-p-card">
              <h3 class="exercises-title-of-item js-item">${name}</h3>
              <p class="exercises-text-of-item js-item">${filter}</p>
            </div>              
          </div>            
        </li>`;
    })
    .join('');
}
