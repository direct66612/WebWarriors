import Notiflix from 'notiflix';
import { BASE_URL } from '../js/api/api';
import axios from 'axios';

async function getQuote() {
  const response = await axios.get('/quote');
  return response.data;
}

const refs = {
  quoteContainer: document.querySelector('.quote'),
};
const savedDate = localStorage.getItem('quoteDate');
const currentDate = new Date().toDateString();

if (savedDate === currentDate) {
  const savedQuote = localStorage.getItem('quote');
  const savedAuthor = localStorage.getItem('author');
  const savedData = { quote: savedQuote, author: savedAuthor };
  refs.quoteContainer.insertAdjacentHTML(
    'beforeend',
    createMarkupQuote(savedData)
  );
} else {
  getQuote()
    .then(data => {
      console.log(data);
      refs.quoteContainer.insertAdjacentHTML(
        'beforeend',
        createMarkupQuote(data)
      );
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
