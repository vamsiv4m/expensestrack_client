import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ExpenseBox from './ExpenseBox';
import { IoArrowBack } from 'react-icons/io5'
import { BiSearchAlt } from 'react-icons/bi'
import { motion } from 'framer-motion'
const ViewAll = () => {
  let location = useLocation().state;
  const navigate = useNavigate();
  const [expenselist, setExpenseList] = useState();
  const [searchBox, setSearchBox] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handler = (e) => {
    setSearchInput(e.target.value);
    if (searchInput !== "") {
      const a = location.filter((i) => {
        return i.category.toLowerCase().includes(searchInput) || i.expense_name.toLowerCase().includes(searchInput)
      })
      setExpenseList(a);
    } else {
      setExpenseList(location)
    }
  }
  return (
    <div className='flex flex-col w-full items-center h-screen'>
      <div className='md:w-[650px] w-[94%] flex justify-between pl-5 pr-5 pt-4 pb-4 ml-4 m-3 items-center  bg-slate-100 rounded-xl' style={{
        boxShadow: 'rgba(60, 64, 67, 0.2) 0px 1px 4px 1px, rgba(60, 64, 67, 0.08) 0px 3px 10px 0px',
      }}>
        <motion.button whileTap={{ scale: 0.8 }} className='bg-yellow-400 rounded-full p-1' onClick={() => {
          navigate(-1)
        }}><IoArrowBack className='text-[1.3rem] font-semibold text-gray-800 ' /></motion.button>
        <p className='font-semibold text-gray-600 text-xl'><span className='text-amber-500 font-bold'>Total</span> Expenses</p>
        <motion.button onClick={() => setSearchBox(!searchBox)} whileTap={{ scale: 0.8 }} className='bg-yellow-400 rounded-full p-1'><BiSearchAlt className='text-[1.3rem] font-semibold text-gray-800' /></motion.button>
      </div>
      {searchBox ?
        <div className='w-[94%] md:w-[500px] ml-4 mr-4 mb-4 rounded-xl flex items-center justify-between bg-gray-100 h-[100px] pt-3 pb-3'>
          <input type="text" placeholder='Query by Category or Name' value={searchInput} onChange={handler} className='font-medium focus:outline-none border-b-[2.3px] border-gray-800 rounded-lg w-full pl-4 pr-4 pt-2 pb-2 ml-5 mr-5' />
          {/* <motion.button whileTap={{ scale: 0.8 }} className='bg-yellow-400 rounded-full p-1 mr-3'><BiSearchAlt className='text-[1.5rem] font-semibold text-gray-800' /></motion.button> */}
        </div> : ""
      }

      <div className='h-full w-full mb-5 pb-6 pt-1 overflow-y-scroll md:w-[620px]' id='scroll'>
        {searchInput.length < 1 ? location.map((item) => {
          return (
            <ExpenseBox items={item} icon={`/images/${item.categoryIcon}`} />
          )
        }) :
          expenselist.map((item) => {
            return (
              <ExpenseBox items={item} icon={`/images/${item.categoryIcon}`} />
            )
          })
        }
      </div>
    </div>
  )
}

export default ViewAll