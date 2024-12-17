import React from 'react'
import "./navbar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext } from "react";

const Navbar = () => {
  return (
      <div className='navbar'>
          <div className="wrapper">
              <div className="search">
                  <input type="text" placeholder='Search..' />
                  <SearchOutlinedIcon />
              </div>
              <div className="items">
                  <div className="item">
                      <NotificationsNoneOutlinedIcon />
                  </div>
                  <div className="item">
                      <ChatBubbleOutlineOutlinedIcon />
                      <div className="counter">1</div>
                  </div>
                  <div className="item">
                      <ListOutlinedIcon />
                      <div className="counter">1</div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Navbar
