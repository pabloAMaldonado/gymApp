
import { configureStore } from '@reduxjs/toolkit'

import userSlice from '../reducer/userSlice'
// import routineSlice from '../reducer/routineSlice'
// import excersiceSlice from '../reducer/excersiceSlice'

const store = configureStore({
	reducer: {
		user: userSlice,
		// routine: routineSlice,
		// excersice: excersiceSlice
	}
})

export type RootState = ReturnType<typeof store.getState>

export default store
