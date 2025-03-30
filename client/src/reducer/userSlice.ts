
import { UnknownAction } from 'redux'
import { RootState } from '../store/store.ts'
import { ThunkAction } from 'redux-thunk'
import { createSlice } from '@reduxjs/toolkit'

import loginService from '../service/userService.ts'

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

export const loginToken = (credentials: userCredentials): ThunkAction<void, RootState, unknown, UnknownAction>  => {
	return async dispatch => {
		try {
			const user = await loginService.postLogin(credentials)
			dispatch(loginUser(user))
		} catch (err) {
		}
	}
}

export const logoutToken = (): ThunkAction<void, RootState, unknown, UnknownAction> => {
	return async dispatch => {
		try {
			loginService.postLogout()
			dispatch(logoutUser())
		} catch (err) {
		}
		
	}
}

export default userSlice.reducer