import axios from 'axios'
const baseUrl = '/api/'

axios.defaults.withCredentials = true

const getRoutine = async () => {
  const response = await axios.get(baseUrl + 'routines', { withCredentials: true })
  return response.data
}

export default { getRoutine }
      