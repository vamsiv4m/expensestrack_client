import React, { Component } from 'react'
import moment from 'moment';
class ExpenseBox extends Component {
  render() {
    // console.log(this.props.items);
    return (
      <div>
        <div key={this.props.items.id} className="flex justify-between items-center ml-5 mr-5 mb-4 bg-white pt-5 pb-5 pr-5 pl-5 rounded-xl" style={{
          boxShadow: 'rgba(60, 64, 67, 0.2) 0px 2px 4px 0px, rgba(60, 64, 67, 0.08) 0px 3px 10px 0px'
        }}>
          <div className='bg-gray-100 p-2 rounded-2xl'>
            <img src={this.props.icon.replace(" ","_")} width="29px" alt='item'/>
          </div>
          <p className='font-semibold text-slate-700 flex-1 pl-4 pr-4 md:ml-6' title={this.props.items.expense_name}>{
            this.props.items.expense_name.length>25?
            this.props.items.expense_name.charAt(0).toUpperCase() + this.props.items.expense_name.slice(1,26)+"...":
            this.props.items.expense_name.charAt(0).toUpperCase() + this.props.items.expense_name.slice(1)
            // this.props.items.expense_name
          }</p>
          <div className='flex flex-col justify-center items-center gap-[0.7px] mr-2'>
            <span className='font-semibold text-gray-800 opacity-95 pt-2'><span className='opacity-80' style={{ fontFamily: "sans-serif" }}>₹{""}</span>{this.props.items.price}</span>
            <span className='text-gray-800 text-xs font-medium opacity-70 text-right'>{moment(this.props.items.date).format('DD MMM')}</span>
            {/* <Link to={'detail'}>
              <motion.div whileTap={{ scale: 0.8 }}>
                <CgInfo className='text-gray-700 active:text-red-600 ml-1 font-medium text-xl' />
              </motion.div>
            </Link> */}
            {/* onClick={() => this.props.deleteExp(this.props.items._id)} */}
          </div>
        </div>
      </div>
    )
  }
}
export default ExpenseBox