import axios from 'axios';

const BASE_URL = 'https://your-energy.b.goit.study/api/';
const EXERCISES_ENDPOINT = 'exercises';

export async function workoutSearch(ids) {
  const arrayOfPromises = ids.map(async id => {
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises/${id}`
    );

    return response;
  });
  const exercises = await Promise.all(arrayOfPromises);
  return exercises;
}
