//получения ссылок
import axios from 'axios';

export async function getExercisesMarkup(value, page) {
  const mobileBreakpoint = 768;
  const params = new URLSearchParams({
    filter: value,
    page: page,
    limit: window.innerWidth < mobileBreakpoint ? 9 : 12,
  });

  return await axios.get(`/filters`, { params }).then(resp => {
    return resp.data;
  });
}

//console.log(getExercisesMarkup("Body parts"));
