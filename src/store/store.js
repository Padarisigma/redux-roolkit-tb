import { configureStore } from '@reduxjs/toolkit'
import tableUserSliceReduser from './reducers/tableUserSlice'

export const store = configureStore({
	reducer: {
		tableUser : tableUserSliceReduser 
	}
})