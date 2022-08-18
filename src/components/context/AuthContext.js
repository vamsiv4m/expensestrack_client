import axios from 'axios';
import React, { Component } from 'react';
const UserContext = React.createContext();
export  class AuthContext extends Component {
    state = {
        userData: {},
        isLoading:true
    }
    
    getUserData = async() => {
        const res = await axios.get(`${process.env.REACT_APP_PATH}/getUserData`,{withCredentials:true});
        // console.log(res.data);
        this.setState({
            userData: res.data,
            isLoading:false
        })
    }

    render(){
        const {getUserData} = this;
        const {userData} = this.state;
        const {isLoading} = this.state;
        return(
            <UserContext.Provider value={{
                userData,getUserData,isLoading
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserContext;
