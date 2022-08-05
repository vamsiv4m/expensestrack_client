import React, { Component } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion } from 'framer-motion'
import ExpenseBox from './ExpenseBox';
export default class ExpenseList extends Component {
    render() {
        const { recentData, loading, visible } = this.props.state;
        return (
            <div className='w-full pb-2 pt-1 mb-8 flex-1 overflow-y-scroll md:flex md:justify-center md:mb-6' id='scroll' onClick={this.props.disablebox}>
                <div className="md:h-full md:w-[650px]">
                    {/* <hr className='w-full ml-5 mr-5 mb-2' /> */}
                    <div className='w-full flex flex-col rounded-2xl'>
                        {loading ?
                            <Player
                                autoplay
                                loop
                                src="https://assets8.lottiefiles.com/packages/lf20_2uenfqbr.json"
                                style={{ height: '250px', width: '250px', background: "transparent", marginTop: visible ? "5px" : "50px" }}
                            >
                            </Player> :
                            recentData.length > 0 ?
                                <>
                                    {recentData.map((items) => {
                                        return (
                                            <ExpenseBox items={items} deleteExp={this.props.deleteExp} icon={`/images/${items.categoryIcon}`} />
                                        )
                                    })}
                                </> :
                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: -10 }} className='font-semibold text-base flex justify-center text-slate-600' style={{ marginTop: visible ? "140px" : "130px" }}>
                                    No Expenses
                                </motion.p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
