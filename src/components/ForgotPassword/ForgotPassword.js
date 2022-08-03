import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import React, { useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi';
import { BsXLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const navigation = useNavigate();
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [validstate, setValidstate] = useState(false);
    const [showPasswd, setShowPasswd] = useState(false);
    const [cshowPasswd, csetShowPasswd] = useState(false);
    const [msg, setmsg] = useState("");
    const [ErrorNotification, setErrorNotification] = useState(false);
    const textHandler = (e) => {
        setInput(e.target.value);
    }
    const passwdHandler = (e) => {
        setPassword(e.target.value);
    }
    const cpasswdHandler = (e) => {
        setCpassword(e.target.value);
    }
    const checkHandler = async () => {
        let res = await axios.post(`${process.env.REACT_APP_PATH}/forgot_password`, { data: input }, { withCredentials: true });
        setValidstate(res.data.isValid);
        res.data.isValid ? setErrorNotification(false) : setErrorNotification(true);
    }
    const submitHandler = async () => {
        if (password === cpassword) {
            let res = await axios.post(`${process.env.REACT_APP_PATH}/set_password`, { username: input, password: password, cpassword: cpassword });
            if (res.data.isUpdated) {
                navigation('/login', { replace: true })
            }
            setmsg(res.data.message);
            timer();
        } else {
            setmsg("Both passwords must be same")
            timer()
        }
    }

    const timer = () => {
        setTimeout(() => {
            setmsg("")
        }, 1500)
    }

    const visible = () => {
        setShowPasswd(!showPasswd)
    }
    const cvisible = () => {
        csetShowPasswd(!cshowPasswd)
    }
    const errorNotification = () => {
        setErrorNotification(false)
    }
    return (
        <div className='h-[85vh] w-screen flex flex-col justify-center items-center'>
            <Player
                autoplay
                loop
                src="https://assets5.lottiefiles.com/packages/lf20_b0lj6sfx.json"
                style={{ width: '200px', background: "transparent" }}
            >
            </Player>
            <div className='flex flex-col w-[300px] h-[100px] justify-around'>
                <input className='border-b-[2.7px] border-gray-600 rounded-xl w-[300px] pl-4 pr-4 pb-2 pt-1 focus:outline-none' placeholder='Enter username/Email' type="text" value={input} name="uname" id="uname" onChange={textHandler} required />
                <button className='bg-amber-400 pl-2 pr-2 pt-1 pb-1 rounded-md' onClick={checkHandler}>Check</button>
            </div>
            {validstate ?
                <>
                    <div className='flex flex-col items-center justify-around h-[160px] mt-2'>
                        <div className='flex items-center'>
                            <input onChange={passwdHandler} className='border-b-[2.7px] border-gray-600 rounded-lg w-[300px] pl-9 pr-7 focus:outline-none' type={showPasswd ? "text" : "password"} name="password" id="password" required placeholder='Enter New Password' />
                            {<div className='text-lg ml-2 absolute'><span onClick={visible}>{showPasswd ? <BiHide /> : <BiShow />}</span></div>}
                        </div>
                        <div className='flex items-center'>
                            <input onChange={cpasswdHandler} className='border-b-[2.7px] border-gray-600 rounded-lg w-[300px] pl-9 pr-7 pb-1 focus:outline-none' type={showPasswd ? "text" : "password"} name="cpassword" id="cpassword" required placeholder='Enter Confirm Password' />
                            {<div className='text-lg ml-2 absolute' ><span onClick={cvisible}>{cshowPasswd ? <BiHide /> : <BiShow />}</span></div>}
                        </div>
                        <button className='bg-amber-400 pl-2 pr-2 pt-1 pb-1 rounded-md' onClick={submitHandler}>Submit</button>
                    </div>
                </>
                :
                ErrorNotification ?
                    <div className='w-full flex justify-center absolute top-5'>
                        <div className='z-20 min-w-[400px] flex justify-between items-center bg-red-400 rounded-md'>
                            <p className='text-white w-full text-center p-2 ml-4 rounded-md opacity-95'>No User Found</p>
                            <BsXLg className='relative mr-3 text-xs text-white hover:text-gray-200' onClick={errorNotification} />
                        </div>
                    </div> : ""
            }
            {msg ? <p>{msg}</p> : ""}
        </div>
    )
}

export default ForgotPassword