import axios from 'axios';

export default async function getExerciseData(searchParams, page = 1) {
  let { filter = '', category = '', keyword = '' } = searchParams;

  switch (filter) {
    case 'Body parts':
      filter = 'bodypart';
      break;
    case 'Muscles':
      filter = 'muscles';
      break;
    case 'Equipment':
      filter = 'equipment';
      break;
  }

  const params = new URLSearchParams({
    [filter]: category,
    keyword: keyword,
    page: page,
    limit: window.innerWidth < 768 ? 8 : 10,
  });

  const response = await axios.get('/exercises', { params });
  return response.data;
}
