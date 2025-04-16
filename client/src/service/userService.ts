import axios from 'axios'
const baseUrl = '/api/'

import { userCredentials, userCredentialsRegistration } from '../types'

axios.defaults.withCredentials = true

const postLogin = async (credentials: userCredentials) => {
	const res = await axios.post(baseUrl + 'login', credentials, { withCredentials: true })
	console.log(res)
	return res.data
}

const postLogout = async () => {
	const res = await axios.post(baseUrl + 'logout', { withCredentials: true })
	return res.data
}

const registerUser = async (credentials: userCredentialsRegistration) => {
	const res = await axios.post(baseUrl + 'new-user', credentials)
	return res.data
}

const userVerification = async (id: string) => {
	const  res = await axios.put(baseUrl + `verify/:${id}`)
	return res.data
}

export default { postLogin, postLogout, registerUser, userVerification }