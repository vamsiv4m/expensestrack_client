import { MdAddCircleOutline } from 'react-icons/md'
import React, { Component } from 'react'
import { motion } from "framer-motion";
import categoryJson from '../../expenseCategory.json'
import Select from 'react-select'
import axios from 'axios';
import ExpenseList from './ExpenseList';
import UserContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

class ExpenseTracker extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            expenseName: "",
            price: 0,
            expItems: [],
            loading: true,
            categories: categoryJson,
            categoryItem: "",
            recentData: [],
            isAuth: false
        }
    }

    componentDidMount() {
        this.getExpenseData();
        this.getRecentData();
    }

    addExpense = () => {
        this.setState({ visible: !this.state.visible })
    }

    expNameHandler = (e) => {
        this.setState({
            expenseName: e.target.value
        })
    }
    expPriceHandler = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    deleteExp = async (id) => {
        const res = await axios.delete(`${process.env.REACT_APP_PATH}/delExpense/${id}?userid=${this.context.userData.userId}`);
        const recent = await axios.get(`${process.env.REACT_APP_PATH}/getRecentExpenses/${this.context.userData.userId}`)
        this.setState({
            expItems: res.data,
            loading: false,
            recentData: recent.data
        })
    }

    submitHandler = async (e) => {
        e.preventDefault();
        let data = {
            expense_name: this.state.expenseName,
            price: this.state.price,
            category: this.state.categoryItem.value,
            categoryIcon: `/${this.state.categoryItem.value}.png`.toLowerCase(),
            date: Date.now(),
            userId: this.context.userData.userId
        }
        const res = await axios.post(`${process.env.REACT_APP_PATH}/addExpense`, data)
        const recent = await axios.get(`${process.env.REACT_APP_PATH}/getRecentExpenses/${this.context.userData.userId}`)
        // console.log(res.data);
        this.setState({
            expItems: res.data,
            loading: false,
            visible: false,
            recentData: recent.data
        })
    }

    getExpenseData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_PATH}/getExpenses/${this.context.userData.userId}`);
        // console.log(res.data);
        this.setState({
            expItems: res.data,
            loading: false
        })
    }

    getRecentData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_PATH}/getRecentExpenses/${this.context.userData.userId}`);
        this.setState({
            recentData: res.data
        })
    }

    sumOfExp = () => {
        let sum = 0;
        const getPrice = this.state.expItems.map((i) => i.price)
        //using forEach
        // getPrice.forEach((value)=>{
        //     sum+=value;
        // })
        //using reduce method
        sum = getPrice.reduce((a, b) => a + b, 0)
        return sum.toFixed(1)
    }

    monthlyExpenseSum = () => {
        let sum = 0;
        const getPrice = this.state.expItems.filter((items) => new Date(items.date).getMonth() === new Date().getMonth()).map((i) => i.price)
        sum = getPrice.reduce((a, b) => a + b, 0);
        return sum.toFixed(1);
    }

    disablebox = (e) => {
        e.preventDefault();
        this.setState({ visible: false })
    }

    selectHandling = (e) => {
        this.setState({
            categoryItem: e
        })
    }

    render() {

        return (
            <div className='w-full h-full flex flex-col' style={{
                background: 'rgb(255, 255, 255)',
            }
            }>
                <div className='md:flex justify-center w-full'>
                    <div className='md:w-[700px] top-4 z-10 flex items-center justify-between rounded-xl m-3 md:mt-3 md:mb-3 bg-slate-100' style={{
                        padding: "7px 20px",
                        boxShadow: 'rgba(60, 64, 67, 0.2) 0px 1px 4px 1px, rgba(60, 64, 67, 0.08) 0px 3px 10px 0px',
                    }}>
                        <div>
                            <p className='font-semibold text-md text-amber-500'>Hello<span className='text-black'>,</span></p>
                            <motion.p className='font-semibold text-xl text-black opacity-95'>
                                {this.context.userData.username}
                            </motion.p>
                        </div>

                        <motion.div whileTap={{ scale: 0.7 }} onClick={() => this.addExpense()}>
                            <MdAddCircleOutline animate={{ scale: 1 }} className='text-3xl text-black opacity-95 active:text-gray-500' />
                        </motion.div>

                    </div>
                </div>

                {
                    this.state.visible ?
                        <div className='w-full flex justify-center'>
                            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className='ml-4 mt-1 mr-4 mb-3 p-4 bg-white h-[190px] lg:h-[190px] rounded-xl gap-2 md:w-[365px]' style={{
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 20px",
                                boxShadow: 'rgba(60, 64, 67, 0.2) 0px 3px 4px 1px, rgba(60, 64, 67, 0.08) 0px 3px 40px 0px',
                            }} >
                                <div className='mb-2 gap-4 flex' >
                                    <input required className='rounded-md pl-3 pr-2 pt-2 pb-2 w-[75%] bg-white border-b-gray-500 border-b-[2.5px] focus:outline-none' type="text" name="expense_name" id="expense_name" value={this.state.expenseName} onChange={this.expNameHandler} placeholder="Expense Name" />
                                    <input min={0} required className='rounded-md w-[20%] text-center bg-white border-b-gray-500 border-b-[2.5px] focus:outline-none' type="number" name='price' value={this.state.price} onChange={this.expPriceHandler} placeholder='₹' style={{ fontFamily: "sans-serif" }} />
                                </div>
                                <Select placeholder="Category" options={this.state.categories} className="w-full mb-2 outline-none" onChange={this.selectHandling} defaultValue={this.state.categoryItem.value} required />

                                <motion.button whileTap={{ scale: 0.85 }} style={{ userSelect: "none" }} className='bg-amber-500 w-full rounded-md p-1 text-white pt-2 pb-2' onClick={this.submitHandler} >Add</motion.button>

                            </motion.div>
                        </div> :
                        ""
                }

                <div className='w-full flex justify-center flex-col items-center mt-1 mb-2' onClick={this.disablebox}>
                    <p className='text-xs font-semibold text-slate-800 opacity-90'>This Month Spent</p>
                    <p className='text-5xl mt-[6px] text-black opacity-85'><span className='opacity-80 text-gray-900 text-5xl' style={{ fontFamily: "sans-serif" }}>₹</span>{this.monthlyExpenseSum()}</p>
                </div>
                <div className='w-full flex justify-between md:justify-center'>
                    <div className='md:w-[650px] flex justify-between w-full'>
                        <p className='ml-5 mt-1 mr-5 font-normal text-sm font-medium  text-gray-700 opacity-90'>Recent Expenses</p>
                        {/* {console.log(this.state.expItems)} */}
                        {this.state.expItems.length > 5 ?
                            <Link to={'viewall'} state={this.state.expItems}>
                                <motion.button whileTap={{ scale: 0.8 }} className='mr-5 bg-amber-400  pl-2 pr-2 pt-1 pb-1 rounded-md mb-2 text-sm'>See All</motion.button>
                            </Link>
                            : ""
                        }
                    </div>
                </div>
                <ExpenseList state={this.state} disablebox={this.disablebox} deleteExp={this.deleteExp} />
            </div>
        )
    }
}


export default ExpenseTracker

ExpenseTracker.contextType = UserContext;