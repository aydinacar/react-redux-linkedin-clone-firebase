import React from 'react'
import "./Header.css"
import SearchIcon from "@material-ui/icons/Search"
import HomeIcon from "@material-ui/icons/Home"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter"
import NotificationsIcon from "@material-ui/icons/Notifications"
import ChatIcon from "@material-ui/icons/Chat"
import HeaderOption from './HeaderOption'
import {useDispatch} from "react-redux"
import { logout } from '../../features/user/userSlice'
import { auth } from '../../firebase'

function Header() {

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout)
        auth.signOut()
    }
    return (
        <div className="header">
            <div className="header_left">
                <img src="https://image.flaticon.com/icons/png/128/174/174857.png" alt="" />
                <div className="header_search">
                    <SearchIcon />
                    <input placeholder="Search" type="text" />
                </div>
            </div>
            <div className="header_right">
                <HeaderOption Icon={HomeIcon} title="Home"/>
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network"/>
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs"/>
                <HeaderOption Icon={ChatIcon} title="Messaging"/>
                <HeaderOption Icon={NotificationsIcon} title="Notifications"/>
                <HeaderOption avatar={true} onClick={logoutHandler} title="me" />
            </div> 

        </div>
    )
}

export default Header
