
import { UnknownAction } from 'redux'
import { RootState } from '../store/store.ts'
import { ThunkAction } from 'redux-thunk'
import { createSlice } from '@reduxjs/toolkit'

import loginService from '../service/userService.ts'
// import { setNotificationWithTimeout } from './notiReducer'                    to add notification service

import { userCredentials } from '../types'

const initializeUser = () => {
    const savedUser: string | null = window.localStorage.getItem('user');
    const parsedUser = savedUser ? JSON.parse(savedUser) : null
    return parsedUser
}

const userSlice = createSlice({
	name: 'user',
	initialState: initializeUser(),
	reducers: {
		loginUser(_, action) {
			const user = action.payload
			window.localStorage.setItem('user', JSON.stringify(user))
			return user
		},
		logoutUser() {
			return null
		}
	}
})

export const { loginUser, logoutUser } = userSlice.actions

export const setToken = (credentials: userCredentials): ThunkAction<void, RootState, unknown, UnknownAction>  => {
	return async dispatch => {
		try {
			const user = await loginService.postLogin(credentials)
			dispatch(loginUser(user))
			// dispatch(setNotificationWithTimeout(`${user.name} logged in.`, 5))
		} catch (err) {
			// dispatch(setNotificationWithTimeout('Error on credentials.', 3))
		}
	}
}

export const logoutToken = (event: React.MouseEvent<HTMLButtonElement>): ThunkAction<void, RootState, unknown, UnknownAction> => {
	return  dispatch => {
		event.preventDefault()
		loginService.postLogout()

		dispatch(logoutUser())
	}
}

export default userSlice.reducer