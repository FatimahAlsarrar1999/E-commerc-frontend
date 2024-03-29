import React, { ChangeEvent, FormEvent, useState } from 'react'
import '../../styles/Dashboard.scss'
import UserSideBar from './UserSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { editProfile } from '../../redux/slices/users/userSlice'
import '../../styles/Profile.scss'

const UserDashboard = () => {
  const { users, isLoading, error, isSignedin, userData } = useSelector(
    (state: RootState) => state.users
  )

  const dispatch: AppDispatch = useDispatch()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return { ...prevUser, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!user.name) {
      alert('the field is required')
      return
    }

    if (user.name.length < 2) {
      alert('First and Last name must be at least 2 characters long')
      return
    }
    const editUserData = { id: userData?.id, ...user }
    dispatch(editProfile(editUserData))
    setIsFormOpen(false)
  }

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }
  return (
    <div className="profile-wrapper">
      <h2>Profile</h2>
      <div className="container">
        {userData && (
          <div className="user-info">
            <div key={userData.id}>
              <p>User ID: {userData._id}</p>
              <p> Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <button className="btn" onClick={handleFormOpen}>
                {isFormOpen ? 'Close' : 'Edit'}
              </button>
            </div>

            <div className="edit-form">
              {isFormOpen && (
                <form onSubmit={handleSubmit}>
                  <div className="first-name">
                    <label htmlFor="firstName">First Name: </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="last-name">
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="btn" type="submit">
                    Save
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
        {/* <button className="btn" onClick={handleLogout}>
          Logout
        </button> */}
      </div>
    </div>
  )
}

export default UserDashboard
