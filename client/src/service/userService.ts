import axios from 'axios'
const baseUrl = '/api/users/login'

import { userCredentials } from '../types'

const postLogin = async (credentials: userCredentials) => {
	const res = await axios.post(baseUrl, credentials)
	return res.data
}

const postLogout = () => {
	window.localStorage.removeItem('user')
}

export default { postLogin, postLogout }