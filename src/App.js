import './App.css';
import ExpenseTracker from './components/Expense/ExpenseTracker';
import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Expense/NavBar';
import ViewAll from './components/Expense/ViewAll';
import { Analytic } from './components/Expense/Analytics';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { AuthContext } from './components/context/AuthContext';
import { Player } from '@lottiefiles/react-lottie-player';
import Profile from './components/Expense/Profile';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 2000)
  }

  render() {
    return (
      <div className=''>
        {
          this.state.isLoading ?
            <div className='z-50 overflow-x-hidden h-screen w-screen absolute flex justify-center' style={{
              backgroundColor: "#000",
              opacity: "0.93 ",
            }}>
              <div className='w-full h-[76%] flex flex-col justify-center items-center'>
                <Player
                  autoplay
                  loop
                  src="https://assets8.lottiefiles.com/packages/lf20_7o7lgwke.json"
                  style={{ width: '200px', background: "transparent" }}
                >
                </Player>
                <p className='text-xl text-white font-semibold'>Loading</p>
              </div>
            </div>
            : ""
        }
        <div className='' >
          <AuthContext>
            <Routes>
              <Route path='login' element={<Login />} />
              <Route path='signUp' element={<SignUp />} />
              <Route path='forgotpassword' element={<ForgotPassword />} />
              <Route path="expense_tracker" element={<NavBar />}>
                <Route index element={<ExpenseTracker />} />
                <Route path='viewAll' element={<ViewAll />} />
                <Route path='analytics' element={<Analytic />} />
                <Route path='profile' element={<Profile />} />
                <Route path='viewall' element={<ViewAll />} />
              </Route>
              <Route path='*' element={<Login />} />
            </Routes>
          </AuthContext>
        </div>
      </div>
    );
  }
}

export default App;