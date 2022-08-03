import axios from 'axios';
import { motion } from 'framer-motion'
import React, { Component } from 'react'
import { BsXLg } from 'react-icons/bs';
import { Navigate } from 'react-router-dom'
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      message: "",
      status: ""
    }
  }

  usernameHandler = (e) => {
    this.setState({ username: e.target.value });
  }
  emailHandler = (e) => {
    this.setState({ email: e.target.value });
  }
  passwordHandler = (e) => {
    this.setState({ password: e.target.value });
  }
  cpasswordHandler = (e) => {
    this.setState({ cpassword: e.target.value });
  }

  submitHandler = async (e) => {
    e.preventDefault();
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      cpassword: this.state.cpassword
    }
    const res = await axios.post(`${process.env.REACT_APP_PATH}/registration`, data);
    this.setState({
      message: res.data.message,
      status:res.data.status
    })
    if(this.state.status==="OK"){
      <Login/>
    }
  }

  errorNotification = () => {
    this.setState({
      message: ""
    })
  }

  render() {
    return (
      < div className='h-screen w-screen' >
        {this.state.message ?
          <div className='w-full flex justify-center absolute top-5'>
            <div className={`z-20 min-w-[400px] flex justify-between items-center ${this.state.status?'bg-green-400':'bg-red-400'} rounded-md`}>
              <p className='text-white w-full text-center p-2 ml-4 rounded-md opacity-95'>{this.state.message}</p>
              <BsXLg className='relative mr-3 text-xs text-white hover:text-gray-200' onClick={this.errorNotification} />
            </div>
          </div> :
          ""
        }
        <div className='w-full flex justify-center'>
          <img className='w-[350px]' src="/images/expensebg2.png" alt="login img" />
        </div>
        <div className='sm:flex flex-col items-center ml-3 mr-3'>
          <p className='font-semibold text-xl ml-5 pl-3 mb-3'>SignUp</p>
          <div className='ml-5 pl-3 pr-3 mr-5 flex flex-col gap-4 mt-3'>
            <div className='flex items-center gap-2'>
              <span className='w-[22px] absolute ml-3 opacity-[0.65]'>
                <img src="/images/user.png" alt='user'/>
              </span>
              <input placeholder='Username'
                className='pl-[50px] pr-6 focus:outline-none font-medium border-gray-600 border-b-[2.5px] rounded-lg w-full sm:w-[400px] p-2'
                type="text"
                name="username"
                value={this.state.username}
                id="username" required onChange={this.usernameHandler} />
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-[22px] absolute ml-3 opacity-70'>
                <img src="/images/mail.png" alt='mail' />
              </span>
              <input
                placeholder='Mail Id'
                className='pl-[50px] pr-6 focus:outline-none font-medium border-gray-600 border-b-[2.5px] rounded-lg w-full sm:w-[400px] p-2'
                type="email"
                name="email"
                value={this.state.email}
                id="email" required onChange={this.emailHandler} />
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-[22px] absolute ml-3 opacity-70'>
                <img src="/images/password.png" alt="" />
              </span>
              <input
                placeholder='Create Password'
                className='pl-[50px] pr-6 focus:outline-none font-medium text-base border-gray-600 border-b-[2.5px] rounded-lg w-full sm:w-[400px] p-2'
                type="password"
                name="Password"
                value={this.state.password}
                id="Password" required onChange={this.passwordHandler} />
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-[22px] absolute ml-3 opacity-70'>
                <img src="/images/password.png" alt="" />
              </span>
              <input
                placeholder='Confirm Password'
                className='pl-[50px] pr-6 focus:outline-none font-medium text-base border-gray-600 border-b-[2.5px] rounded-lg w-full sm:w-[400px] p-2'
                type="password"
                value={this.state.cpassword}
                name="Confirm Password" id="Confirm Password" required onChange={this.cpasswordHandler} />
            </div>
            {/* <div className='flex justify-end pt-3 pr-1 text-sm text-gray-600'><p>Forgot Password?</p></div> */}
            <motion.button whileTap={{ scale: 0.93 }}
              className='p-2 mt-2 text-white rounded-lg bg-amber-500 active:bg-amber-400'
              onClick={this.submitHandler} >SignUp</motion.button>
            {/* <Link to={"/signUp"} style={{textAlign:"center"}}><p className='text-sm font-medium'> have an account?</p></Link>  */}
            {this.state.status&&<Navigate to={'/login'} replace/>}
          </div>
        </div>
      </div >
    )
  }
}
