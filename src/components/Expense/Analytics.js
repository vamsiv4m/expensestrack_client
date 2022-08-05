import React, { Component } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler

} from 'chart.js';
import axios from 'axios';
import UserContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    Filler,
    LineElement
)
ChartJS.defaults.color = "#fff";
ChartJS.defaults.borderColor = "rgb(200,200,200,0.1)"

const labels = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineData: {
                months,
                datasets: [{
                    label: 'Expense',
                    data: [],
                    fill: false,
                    borderColor: "#742774"
                }]
            },
            chartData: {
                labels,
                datasets: [{
                    label: 'Expense',
                    barThickness: 8,
                    borderRadius: "5",
                    borderColor: "#fff",
                    hoverBackgroundColor: [
                        'rgb(232, 82, 82)'
                    ],
                    color: ['#333'],
                    data: [],
                    backgroundColor: [
                        'rgb(255, 255, 55)'
                    ],
                    backgroundWidth: [
                        "5px"
                    ]
                }]
            },
            avg: 0,
            total: 0
        }
    }

    getSevendaysData = async () => {
        let chartarr = [];
        let mydata = [];
        const res = await axios.get(`${process.env.REACT_APP_PATH}/getSevendaysData`)
            .then((res) => res.data.filter((i) => {
                return i._id.userId === this.context.userData.userId
            }))
        mydata = res.map((i) => {
            return ({
                day: i._id.dayofweek,
                week: i._id.week,
                currentweek: i._id.currentweek,
                total: i.Total
            })
        }).sort();
        // console.log(mydata);
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < mydata.length; j++) {
                if (mydata[j].currentweek === mydata[j].week) {
                    if (i + 1 === mydata[j].day) {
                        chartarr[i] = mydata[j].total;
                        break;
                    } else { chartarr[i] = 0; }
                }
            }
        }
        // console.log(chartarr);
        this.setState({
            chartData: {
                labels,
                datasets: [{
                    label: 'Expense',
                    barThickness: 12,
                    borderRadius: "4",
                    borderColor: "#fff",
                    hoverBackgroundColor: [
                        'rgb(255, 50, 50)'
                    ],
                    color: ['#333'],
                    data: chartarr,
                    backgroundColor: [
                        'rgb(255, 205, 21)'
                    ],
                    backgroundWidth: [
                        "5px"
                    ]
                }]
            }
        })
    }
    getAllweekstat = async () => {
        // console.log(this.context.userData.userId);
        const res = await axios.get(`${process.env.REACT_APP_PATH}/getWeeklyData`)
            .then((res) => res.data.filter((i) => i._id.week === i._id.currentweek && i._id.userId === this.context.userData.userId))
        this.setState({
            avg: res[0].avg,
            total: res[0].Total
        })
    }
    
    getHalfYearly = async () => {
        let lineArr = [];
        let mydata = [];
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const res = await axios.get(`${process.env.REACT_APP_PATH}/getMonthlyData`).then((res) => res.data.filter((i) => {
            return i._id.userId === this.context.userData.userId
        }));
        mydata = res.map((i) => {
            return ({
                month: i._id.month,
                year: i._id.year,
                total: i.Total
            })
        })
        // console.log(mydata[0].year === new Date().getFullYear());
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < mydata.length; j++) {
                if (mydata[j].year === new Date().getFullYear()) {
                    if (i + 1 === mydata[j].month) { lineArr[i] = mydata[j].total; break; } else { lineArr[i] = 0; }
                }
            }
        }
        // console.log(lineArr);
        this.setState({
            lineData: {
                labels,
                showTooltips: true,
                datasets: [{
                    label: 'Expense',
                    data: lineArr,
                    fill: true,
                    backgroundColor: "rgba(116,39,116,0.2)",
                    borderColor: "rgba(116,39,116,0.79)"
                }]
            }
        })
    }

    componentDidMount() {
        this.getSevendaysData();
        this.getAllweekstat();
        this.getHalfYearly();
    }

    render() {
        return (
            <div className='w-full flex flex-col justify-center items-center overflow-x-hidden' id='scroll'>
                <div className='md:w-[650px] w-[94%] flex justify-between pl-5 pr-5 pt-4 pb-4 m-3 items-center  bg-slate-100 rounded-xl' style={{
                    boxShadow: 'rgba(60, 64, 67, 0.2) 0px 1px 4px 1px, rgba(60, 64, 67, 0.08) 0px 3px 10px 0px',
                }}>
                    <motion.button whileTap={{ scale: 0.8 }} className='bg-yellow-400 rounded-full p-1' onClick={() => {
                        this.props.navigation(-1)
                    }}><IoArrowBack className='text-[1.3rem] font-semibold text-gray-800 ' /></motion.button>
                    <p className='font-semibold text-gray-600 text-xl w-full text-center mr-2'><span className='text-amber-500 font-bold'>Ana</span>lytics</p>
                </div>
                <div className='ml-3 mr-3 mb-2 mt-1 w-[95%] sm:w-[495px]'>
                    {this.state.chartData.datasets[0].data.length > 0 || this.state.lineData.datasets[0].data.length > 0 ?
                        <>
                            <p className='w-full text-center mb-1 font-semibold opacity-80'>Weekly Graph</p>
                            <div className='rounded-2xl mb-1 h-[5rem] drop-shadow-md w-full flex justify-between items-center text-white' style={{ backgroundColor: "rgb(20,20,20)" }}>
                                <div className='m-6'>
                                    <p className='text-xs text-white opacity-80'>This Week</p>
                                    <p className='text-2xl font-medium mt-1'>{this.state.total}</p>
                                </div>
                                <div className='m-6 text-center'>
                                    <p className='text-xs text-white opacity-80'>Avg day</p>
                                    <p className='text-xl mt-1 font-medium'>{this.state.avg.toFixed(2)}</p>
                                </div>
                            </div>
                            <Bar data={this.state.chartData} className='w-full rounded-3xl p-2 mb-3' style={{ backgroundColor: "rgb(18,18,18)" }} />
                            <p className='font-semibold w-full text-center text-black opacity-75'> Monthly Graph</p>
                            <Line data={this.state.lineData} options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "black"
                                        }
                                    }
                                },
                                scales: {

                                    x: {
                                        ticks: {
                                            color: 'black'
                                        }
                                    },
                                    y: {
                                        ticks: {
                                            color: "black"
                                        }
                                    }
                                }
                            }} className="rounded-xl m-2 p-2 md:pb-7" style={{ backgroundColor: "white", boxShadow: 'rgba(60, 64, 67, 0.2) 0px 1px 4px 1px, rgba(60, 64, 67, 0.08) 0px 3px 10px 0px' }} />
                        </> : <p className='w-full text-center font-medium h-[60px] items-center justify-center flex'>No Data to visualize</p>
                    }
                </div>
            </div>
        )
    }
}

export default Analytics


export function Analytic() {
    const navigation = useNavigate();
    return (
        <>
            <Analytics navigation={navigation} />
        </>
    )
}


Analytics.contextType = UserContext;