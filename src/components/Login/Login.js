import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios';
import { BsXLg } from 'react-icons/bs'
import UserContext from '../context/AuthContext';
import { Player } from '@lottiefiles/react-lottie-player';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      data: "",
      message: "",
      isAuth: false,
    }
  }

  componentDidMount() {
    this.context.getUserData();
    this.setState({
      isAuth: this.context.userData.isAuthorized
    })
  }

  usernameHandle = (e) => {
    this.setState({ username: e.target.value });
  }
  passwdHandle = (e) => {
    this.setState({ password: e.target.value });
  }

  submitHandle = async () => {
    // const {login} = this.context.;
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    const res = await axios.post(`${process.env.REACT_APP_PATH}/login`, data, { withCredentials: true });
    // console.log(res.data.message);
    this.setState({
      message: res.data.message
    })
    this.context.getUserData();
  }

  errorNotification = () => {
    this.setState({
      message: ""
    })
  }

  render() {
    return (
      !this.context.userData.isAuthorized ?
        // setTimeout(()=>{
        <div className='h-screen w-screen'>
          {this.state.message ?
            <div className='w-full flex justify-center absolute top-5'>
              <div className='z-20 min-w-[400px] flex justify-between items-center bg-red-400 rounded-md'>
                <p className='text-white w-full text-center p-2 ml-4 rounded-md opacity-95'>{this.state.message}</p>
                <BsXLg className='relative mr-3 text-xs text-white hover:text-gray-200' onClick={this.errorNotification} />
              </div>
            </div> :
            ""
          }
          <div className='w-full flex justify-center h-auto'>
            {/* <img className='w-[350px]' src="/images/expensebg2.png" alt="login img" /> */}
            <Player
              autoplay
              loop
              src="/json/loginAnimation.json"
              style={{ width: '350px', background: "transparent" }}
            >
            </Player>
          </div>
          <div className='sm:flex flex-col items-center ml-3 mr-3'>
            <p className='font-semibold text-xl ml-5 pl-3 mb-3'>Login</p>
            <div className='ml-5 pl-3 pr-3 mr-5 flex flex-col gap-4 mt-4'>
              <div className='flex items-center gap-2'>
                <span className='w-[22px] absolute ml-3 opacity-[0.5]'>
                  <img src="/images/user.png" alt='user' />
                </span>
                <input placeholder='Username' className='pl-[50px] pr-6 focus:outline-none font-medium border-gray-700 border-b-[2.7px] rounded-lg w-full sm:w-[400px] p-2' type="text" name="username" id="username" onChange={this.usernameHandle} />
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-[22px] absolute ml-3 opacity-[0.5]'>
                  <img src="/images/password.png" alt="" />
                </span>
                <input placeholder='Password' className='pl-[50px] pr-6 focus:outline-none font-medium text-base border-gray-700 border-b-[2.8px] rounded-lg w-full sm:w-[400px] p-2' type="password" name="password" id="password" onChange={this.passwdHandle} />
              </div>
              <div className='flex justify-end pt-3 pr-1 text-sm text-gray-600'>
                <Link to={'/forgotpassword'}>
                  <p>Forgot Password?</p>
                </Link>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} className='p-2 mt-2 text-white rounded-lg bg-amber-500' onClick={this.submitHandle} >Login</motion.button>
              <Link to={"/signUp"} style={{ textAlign: "center" }}><p className='text-sm font-medium'>Don't have an account?</p></Link>
            </div>
          </div>
        </div>
        // },600)
        :
        <Navigate to={'/expense_tracker'} />
    )
  }
}

Login.contextType = UserContext;
