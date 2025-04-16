import axios from 'axios'
const baseUrl = '/api'

axios.defaults.withCredentials = true;

const getExercises = async () => {
  const response = await axios.get(`${baseUrl}/exercises`);
  return response.data;
}

export default { getExercises }
