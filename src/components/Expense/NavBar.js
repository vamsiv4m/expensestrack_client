import React, { Component } from 'react'
import BottomBar from './BottomBar'
import { Navigate, Outlet } from 'react-router-dom'
import UserContext from '../context/AuthContext';
class NavBar extends Component {
  constructor(context) {
    super(context);
    this.state = {
      isAuth: Boolean,
      isLoading: true
    }
    // console.log(context);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 500)
  }

  render() {
    return (
      !this.context.userData.isAuthorized ?
        <Navigate to={'/login'} />
        :
        <>
          <div>
            <Outlet />
            <BottomBar />
          </div>
        </>
    )
  }
}

export default NavBar

NavBar.contextType = UserContext;