import axios from 'axios'
const baseUrl = '/api/'

import { userCredentials, newUser } from '../types'

axios.defaults.withCredentials = true

const postLogin = async (credentials: userCredentials) => {
	const res = await axios.post(baseUrl + 'login', credentials, { withCredentials: true })
	return res.data
}

const postLogout = async () => {
	const res = await axios.post(baseUrl + 'logout', { withCredentials: true })
	return res.data
}

const registerUser = async (credentials: newUser) => {
	const res = await axios.post(baseUrl + 'new-user', credentials)
	return res.data
}

const userVerification = async (id: string) => {
	const  res = await axios.put(baseUrl + `/verify/:${id}`)
	return res.data
}

export default { postLogin, postLogout, registerUser, userVerification }