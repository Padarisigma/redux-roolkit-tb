import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { addUser, editUser, getById, removeUser } from './store/reducers/tableUserSlice'
import { Modal } from 'antd'
import { useState } from 'react'

function App() {  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [newUser, setNewUser] = useState({ fullname: '', email: '', city: '', status: false });
  const [seacrh, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [editFullname, setEditFullname] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editCity, setEditCity] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [editingID, setEditingId] = useState(null)
  const user = useSelector((store)=> store.tableUser.data)
  const selectedUser = useSelector((store)=> store.tableUser.selectedUser)
  const dispatch = useDispatch()

  const handleOpenModal = (id) => {
    dispatch(getById(id))
    setIsModalOpen(true)
  }

  const handleSaveUser = () => {
    dispatch(addUser(newUser))
    setIsModalAddOpen(false)
  }

  const handleEditModal = (user) => {
    setEditFullname(user.fullname)
    setEditEmail(user.email)
    setEditCity(user.city)
    setEditingId(user.id)
    setIsModalEditOpen(true)

  }

  const saveEdit = () => {
    if(editFullname.trim() && editEmail.trim() && editCity.trim())
    dispatch(editUser({
      id: editingID,
      fullname: editFullname,
      email: editEmail,
      city: editCity,
      status: editStatus === 'active'
    }))
    setIsModalEditOpen(false)
  }

  const filterUsers = user.filter((user)=> {
    return (statusFilter === '' || statusFilter === 'all' || (statusFilter === 'active' ? user.status : !user.status)) && (cityFilter === '' || cityFilter === 'all' || (cityFilter === user.city)) && (seacrh === '' || user.fullname.toLowerCase().includes(seacrh.toLowerCase()))
  })

  return (
    <>
      <div className='header'>
        <h1>Table User with <span className='header__text--blue'>Redux ToolKit</span></h1>

        <button onClick={()=> setIsModalAddOpen(true)}>Add +</button>
      </div>

      <div className='tool__container'>
        <div className='tool__box__item'>
          <select value={statusFilter} onChange={(e)=> setStatusFilter(e.target.value)} className='tool__container__select' name="" id="">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select value={cityFilter} onChange={(e)=> setCityFilter(e.target.value)} className='tool__container__select' name="" id="">
            <option value="all">All city</option>
            <option value="Dushanbe">Dushanbe</option>
            <option value="America">America</option>
            <option value="Berlin">Berlin</option>
          </select>
        </div>

        <input value={seacrh} onChange={(e)=> setSearch(e.target.value)} className='tool__container__input' type="text" placeholder='Search...' />
      </div>

      <table>
        <tbody>
          {
            filterUsers.length ? filterUsers.map((user) => (
              <tr key={user.id}>
                  <td><p>{user.fullname}</p></td>
                  <td><p>{user.email}</p></td>
                  <td><p>{user.city}</p></td>
                  <td><span className={user.status ? 'text--green' : 'text--red'}>{user.status ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <div className='table__tool'>
                      <button onClick={()=> dispatch(removeUser(user.id))}>🗑️</button>
                      <button onClick={() => handleEditModal(user)}>🖋️</button>
                      <button onClick={()=> handleOpenModal(user.id)}>👁️‍🗨️</button>
                    </div>
                  </td>
              </tr>
            )) : (<h1 className='error__message'>Not Found</h1>)
          }
        </tbody>
      </table>

      <Modal title={'Info'} open={isModalOpen} onCancel={()=> setIsModalOpen(false)} footer={null}>
        {selectedUser && (
          <div style={{padding: '10px'}}>
            <p className='select__user'>Имя: {selectedUser.fullname}</p>
            <p className='select__user'>Email: {selectedUser.email}</p>
            <p className='select__user'>City: {selectedUser.city}</p>
            <p className={'select__user'}>Status: <span>{selectedUser.status ? 'Active' : 'Inactive'}</span></p>
          </div>
        )}
      </Modal>

      <Modal open={isModalAddOpen} onCancel={()=> setIsModalAddOpen(false)} footer={null}>
          <div className='modal__container'>
            <input value={newUser.fullname} onChange={(e)=> setNewUser({...newUser, fullname: e.target.value})} type="text" placeholder='Fullname...' />
            <input value={newUser.email} onChange={(e)=> setNewUser({...newUser, email: e.target.value})} type="text" placeholder='Email...' />
            <input value={newUser.city} onChange={(e)=> setNewUser({...newUser, city: e.target.value})} type="text" placeholder='City...' />
            <select value={newUser.status  ? 'active' : 'inactive'}  onChange={(e) => setNewUser({ ...newUser, status: e.target.value === 'active' })} name="" id="">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button onClick={handleSaveUser}>Save</button>
          </div>
      </Modal>

      <Modal open={isModalEditOpen} onCancel={() => setIsModalEditOpen(false)} footer={null}>
          <div className='modal__container'>
            <input value={editFullname} onChange={(e)=> setEditFullname(e.target.value)} type="text" placeholder='Fullname...' />
            <input value={editEmail} onChange={(e)=> setEditEmail(e.target.value)} type="text" placeholder='Email...' />
            <input value={editCity} onChange={(e)=> setEditCity(e.target.value)} type="text" placeholder='City...' />
            <select value={editStatus} onChange={(e)=> setEditStatus(e.target.value)} name="" id="">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button onClick={saveEdit}>Save</button>
          </div>
      </Modal>
    </>
  )
}

export default App