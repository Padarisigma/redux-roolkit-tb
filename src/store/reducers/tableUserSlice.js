import { createSlice } from '@reduxjs/toolkit'

export const tableUserSlice = createSlice({
	name: 'tableUser',
	initialState: {
		 data : [
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
			{
			  id: 4,
			  fullname: 'Anna Smith',
			  email: 'anna.smith@gmail.com',
			  city: 'London',
			  status: false,
			},
			{
			  id: 5,
			  fullname: 'Michael Johnson',
			  email: 'michael.j@gmail.com',
			  city: 'New York',
			  status: true,
			},
			{
			  id: 6,
			  fullname: 'Sophia Davis',
			  email: 'sophia.d@gmail.com',
			  city: 'Sydney',
			  status: false,
			},
			{
			  id: 7,
			  fullname: 'Liam Brown',
			  email: 'liam.b@gmail.com',
			  city: 'Toronto',
			  status: true,
			},
			{
			  id: 8,
			  fullname: 'Emma Wilson',
			  email: 'emma.w@gmail.com',
			  city: 'Paris',
			  status: false,
			},
			{
			  id: 9,
			  fullname: 'Noah Martinez',
			  email: 'noah.m@gmail.com',
			  city: 'Madrid',
			  status: true,
			},
			{
			  id: 10,
			  fullname: 'Olivia Taylor',
			  email: 'olivia.t@gmail.com',
			  city: 'Rome',
			  status: false,
			},
			{
			  id: 11,
			  fullname: 'William Lee',
			  email: 'william.l@gmail.com',
			  city: 'Seoul',
			  status: true,
			},
			{
			  id: 12,
			  fullname: 'Isabella Harris',
			  email: 'isabella.h@gmail.com',
			  city: 'Tokyo',
			  status: false,
			}
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
