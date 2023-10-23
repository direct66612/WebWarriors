import Notiflix from 'notiflix';
import { BASE_URL } from '../js/api/api';
import axios from 'axios';

async function getQuote() {
  const response = await axios.get('/quote');
  return response.data;
}

const savedDate = localStorage.getItem('quoteDate');
const currentDate = new Date().toDateString();

if (savedDate === currentDate) {
  const savedQuote = localStorage.getItem('quote');
  const savedAuthor = localStorage.getItem('author');
  const savedData = { quote: savedQuote, author: savedAuthor };
  if (document.querySelector('.quote') !== null) {
    document
      .querySelector('.quote')
      .insertAdjacentHTML('beforeend', createMarkupQuote(savedData));
  }
  if (document.querySelector('.favorites-quote') !== null) {
    document
      .querySelector('.favorites-quote')
      .insertAdjacentHTML('beforeend', createMarkupFavQuote(savedData));
  }
} else {
  getQuote()
    .then(data => {
      if (document.querySelector('.quote') !== null) {
        document
          .querySelector('.quote')
          .insertAdjacentHTML('beforeend', createMarkupQuote(data));
      }
      if (document.querySelector('.favorites-quote') !== null) {
        document
          .querySelector('.favorites-quote')
          .insertAdjacentHTML('beforeend', createMarkupFavQuote(data));
      }
      localStorage.setItem('quote', data.quote);
      localStorage.setItem('author', data.author);
      localStorage.setItem('quoteDate', currentDate);
    })
    .catch(() => Notiflix.Notify.failure('Server error, please try again'));
}

function createMarkupQuote(data) {
  return `<div class="quote-text-container"><p class="quote-text">${data.quote}</p>
  <p class="quote-author">${data.author}</p></div>`;
}
function createMarkupFavQuote(data) {
  return `<div class="quote-text-container"><p class="quote-text">${data.quote}</p>
  <p class="favorites-quote-author">${data.author}</p></div>`;
}
