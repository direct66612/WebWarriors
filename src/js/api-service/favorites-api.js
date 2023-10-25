import axios from 'axios';

const BASE_URL = 'https://your-energy.b.goit.study/api/';
const EXERCISES_ENDPOINT = 'exercises';

export async function workoutSearch(id) {
  const response = await axios.get(`${BASE_URL}${EXERCISES_ENDPOINT}/${id}`);
  return response.data;
}
