//разметка

export function createMarkup(array) {
    return array.map(({filter, name, imgURL}) => {
      return `<li>
            <h2>${name}</h2>
            <p>${filter}</p>
            <img src="${imgURL}"/>
        </li>`
    }).join('');
};