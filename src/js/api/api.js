import '../api-service/exercises-api';
import '../api-service/categories-api';
import '../templates/exercises-markup';
import axios from 'axios';

export const BASE_URL = 'https://your-energy.b.goit.study/api';
axios.defaults.baseURL = BASE_URL;
