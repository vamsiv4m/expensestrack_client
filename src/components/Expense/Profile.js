import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import UserContext from '../context/AuthContext';
import axios from 'axios';
import { utils, writeFile } from 'xlsx';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs'
const Profile = () => {
  const navigation = useNavigate();
  const userData = useContext(UserContext);
  const { username } = userData.userData;
  const [month, setMonth] = useState(0);
  const [visible, setVisible] = useState(false);

  const getWeeklyData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_PATH}/getSevendaysData1`);
    const filteredData = res.data.filter((i) => {
      return i._id.userId === userData.userData.userId && i._id.currentweek === i._id.week
    });
    const newData = filteredData.map((i, key) => {
      return ({
        sno: key + 1,
        expense_name: i._id.expense_name,
        price: i._id.price,
        category: i._id.category,
        day: moment(i._id.date).format('dddd'),
        date: moment(i._id.date).format('MMM Do YY')
      })
    })
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(newData);
    utils.book_append_sheet(wb, ws, "Sheet1");
    writeFile(wb, `Weeklydata.xlsx`);
  }

  const getMonthlyData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_PATH}/getMonthlyData1`)
    const filterdData = res.data.filter((i) => {
      return moment(i._id.date).format('YYYY-MM') === month && i._id.userId === userData.userData.userId;
    });

    const newData = filterdData.map((i, key) => {
      return (
        {
          sno: key + 1,
          expense_name: i._id.expense_name,
          price: i._id.price,
          category: i._id.category,
          year: i._id.year
        }
      )
    })
    // console.log(newData.length);
    if (newData.length > 0) {
      let wb = utils.book_new();
      let ws = utils.json_to_sheet(newData);
      utils.book_append_sheet(wb, ws, `Sheet1`);
      writeFile(wb, `month${month}data.xlsx`);
    } else {
      alert("No Data to Downalod")
    }
  }

  const monthHandler = (e) => {
    setMonth(e.target.value)
    // setDropdownvalue(e.target.label)
  }

  const logoutHandler = async () => {
    const res = await axios.get(`${process.env.REACT_APP_PATH}/logout`,{withCredentials:true});
    if (res.data.isLogout) {
      navigation('/login', { replace: true });
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='md:w-[650px] w-[94%] flex justify-between pl-5 pr-5 pt-4 pb-4 m-3 items-center  bg-slate-100 rounded-xl' style={{
        boxShadow: 'rgba(60, 64, 67, 0.2) 0px 1px 4px 1px, rgba(60, 64, 67, 0.08) 0px 3px 10px 0px',
      }}>
        <motion.button whileTap={{ scale: 0.8 }} className='bg-yellow-400 rounded-full p-1' onClick={() => {
          navigation(-1);
        }}><IoArrowBack className='text-[1.3rem] font-semibold text-gray-800 ' /></motion.button>
        <p className='font-semibold text-gray-600 text-xl w-full text-center mr-2'><span className='text-amber-500 font-bold'>Pro</span>file</p>
        <motion.div whileTap={{ scale: 0.8 }} className="bg-yellow-400 rounded-full p-1" onClick={() => setVisible(!visible)}>
          <BsThreeDotsVertical className='text-xl' />
        </motion.div>
      </div>
      {visible ?
        <div className='w-full flex justify-end md:w-[650px] absolute top-[85px]'>
          <button className='bg-gray-100 pl-3 pt-2 pb-2 pr-3 w-[180px] mr-4 rounded-md focus:border-gray-600 focus:border-2' onClick={logoutHandler}>Logout</button>
        </div> : <></>
      }
      <div className='mt-3 flex flex-col items-center justify-center gap-2'>
        {/* <div className='bg-gray-50 flex justify-center items-center'> */}
        <Player
          autoplay
          loop
          className='rounded-full pr-3'
          src="https://assets4.lottiefiles.com/datafiles/i1uFIojbGt3KRN2/data.json"
          style={{ height: "130px", width: '130px', background: "#e9f1ff" }}
        >
        </Player>
        {/* </div> */}
        <p className='font-medium text-xl'>{username}</p>
      </div>
      <div className='flex flex-col mt-2'>
        {/* <input className='w-[300px] pt-2 pb-2 pl-4 pr-3 mt-2 border-gray-600 rounded-md border-b-[3px] focus:outline-none' type="email" name="email" id="email" placeholder='Change Email'/>
        <input placeholder='Change Password' className='w-[300px] pt-2 pb-2 pl-4 pr-3 mt-2 border-gray-600 rounded-md border-b-[3px] focus:outline-none' type="password" name="password" id="password" /> */}
        <p className='text-lg font-medium mt-4 mb-2'>Export Sevendays Data</p>
        <button className='bg-amber-500 p-2 rounded-md mt-2 mb-4' onClick={getWeeklyData}>Export</button>
        <p className='text-lg font-medium mt-4'>Export Montly Data </p>
        {/* <select value={new Date().getMonth()} onChange={dropdownhandler} className='p-3 font-semibold bg-white text-gray-600 rounded-md border-b-[3px] border-b-gray-600 mb-2 focus:outline-none text-center'>
          <option value={1} label="January">January</option>
          <option value={2} label="February">February</option>
          <option value={3} label="March">March</option>
          <option value={4} label="April">April</option>
          <option value={5} label="May">May</option>
          <option value={6} label="June">June</option>
          <option value={7} label="July">July</option>
          <option value={8} label="August">August</option>
          <option value={9} label="September">September</option>
          <option value={10} label="October">October</option>
          <option value={11} label="November">November</option>
          <option value={12} label="December">December</option>
        </select> */}
        <input placeholder='Select Month' onChange={monthHandler} className='w-full p-3 bg-white text-center font-semibold rounded-md border-b-[3px] border-b-gray-600 mb-2 focus:outline-none text-center' type="month" name="month" id="month" />
        <button className='bg-amber-500 p-2 rounded-md mt-2' onClick={getMonthlyData}>Export</button>
      </div>
    </div>
  )
}

export default Profile

