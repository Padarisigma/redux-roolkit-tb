import { createSlice } from '@reduxjs/toolkit'

export const tableUserSlice = createSlice({
	name: 'tableUser',
	initialState: {
		data: [
			{
				id: 1,
				fullname: 'Maks Donfort',
				email: 'maks@gmail.com',
				city: 'Dushanbe',
				status: false,
			},
			{
				id: 2,
				fullname: 'Eliot Anderson',
				email: 'mrobot@gmail.com',
				city: 'America',
				status: true,
			},
			{
				id: 3,
				fullname: 'Jake Donfort',
				email: 'jakeduskwood@gmail.com',
				city: 'Berlin',
				status: true,
			},
		],
		selectedUser: null,
		newUser: { fullname: '', email: '', city: '', status: false }
	},
	reducers: {
		setData: (state, action) => {
			state.data = action.payload
		},
		removeUser: (state, action) => {
			state.data = state.data.filter(user => user.id != action.payload)
		},
		getById: (state, action) => {
			state.selectedUser = state.data.find(user => user.id == action.payload)
		},
		addUser: (state, action) => {
			const newUser = {id: Date.now(), ...action.payload }
			state.data.push(newUser)
			state.newUser = {fullname: '', email: '', city: '', status: false }
		},
		editUser: (state, action) => {
			const {id, fullname, email, city, status} = action.payload
			const user = state.data.find(user=> user.id === id)
			if(user){
				user.fullname = fullname
				user.email = email
				user.city = city
				user.status = status
			}
		}
	},
})

export default tableUserSlice.reducer
export const { setData, removeUser, getById, addUser, editUser } = tableUserSlice.actions
