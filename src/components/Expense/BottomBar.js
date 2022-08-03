import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class BottomBar extends Component {
    render() {
        return (
            <div className='flex justify-center w-full fixed bottom-0'>
                <div className='flex justify-around items-center mt-5 p-2 w-[90%] md:w-[40%] bg-gray-100 shadow-black shadow-md shadow-gray-400 z-50 rounded-tl-xl rounded-tr-xl'>
                    <NavLink end to={""} className="pl-10 pr-10 pt-1 pb-1 rounded-lg" style={({ isActive }) => isActive ? { backgroundColor: "white", boxShadow: 'rgba(99, 99, 99, 0.3) 0px 3px 7px 0px' } : undefined}>
                        <img src="/images/home.png" className='w-[24px] opacity-80' alt="" />
                    </NavLink>
                    <NavLink end to={"analytics"} className="pl-10 pr-10 pt-1 pb-1 rounded-lg" style={({ isActive }) => isActive ? { backgroundColor: "white", boxShadow: 'rgba(99, 99, 99, 0.3) 0px 3px 7px 0px' } : undefined}>
                        <img src="/images/chart.png" className='w-[24px]' alt="" /></NavLink>
                    <NavLink end to={"profile"} className="pl-10 pr-10 pt-1 pb-1 rounded-lg" style={({ isActive }) => isActive ? { backgroundColor: " ", boxShadow: 'rgba(99, 99, 99, 0.3) 0px 3px 7px 0px' } : undefined}>
                        <img src="/images/user.png" className='w-[24px] opacity-80' alt="" /></NavLink>
                </div>
            </div>
        )
    }
}