import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {
    Input,
    Button,
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import { toggleMobileNav, toggleSidebar } from "../../features/layout";

const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { mobileNavOpened } = useSelector((state) => state.layout)
    const { sidebarOpened } = useSelector((state) => state.layout)
    const [userMenuOpen, setMenuOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [msgOpen, setMsgOpen] = useState(false)
    const [navbarOpen, navbarToggle] = useState(false)
    

    console.log(mobileNavOpened)
  return (
    <Navbar expand="md" light={true} className="header-menu-one">
            <div className="nav-bar-header-one">
                <div className="header-logo">
                    <a href="index.html">
                        <img src="../../img/logo.png" alt="logo" />
                    </a>
                </div>
                 <div className="toggle-button sidebar-toggle" onClick={() => dispatch(toggleSidebar(!sidebarOpened))}>
                    <Button type="button" className="item-link">
                        <span className="btn-icon-wrap">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </Button>
                </div>
            </div>
            <div className="d-md-none mobile-nav-bar">
               <NavbarToggler tag="button" className="pulse-animation" type="button" data-toggle="collapse" data-target="#mobile-navbar" aria-expanded="false" onClick={()=> navbarToggle(!navbarOpen)}>
                    <i className="far fa-arrow-alt-circle-down"></i>
                </NavbarToggler>
                <NavbarToggler tag="button" type="button" className="sidebar-toggle-mobile" onClick={() => dispatch(toggleMobileNav(!mobileNavOpened))}>
                    <i className="fas fa-bars"></i>
                </NavbarToggler>
            </div>
            <Collapse className="header-main-menu" id="mobile-navbar" isOpen={navbarOpen} navbar>
                <Nav navbar>
                    <li className="navbar-item header-search-bar">
                        <div className="input-group stylish-input-group">
                            <span className="input-group-addon">
                                <Button type="submit">
                                    <span className="flaticon-search" aria-hidden="true"></span>
                                </Button>
                            </span>
                            <Input type="text" className="form-control" placeholder="Find Something . . ." />
                        </div>
                    </li>
                </Nav>
                <Nav navbar>
                    <Dropdown tag="li" className="navbar-item header-admin" isOpen={userMenuOpen} toggle={() => setMenuOpen(!userMenuOpen)} nav={true}>
                        <DropdownToggle tag="a" className="navbar-nav-link" role="button" data-toggle="dropdown"
                            aria-expanded="false">
                            <div className="admin-title">
                                <h5 className="item-title">{user.firstName} {user.lastName }</h5>
                                <span>Admin</span>
                            </div>
                            <div className="admin-img">
                                <img src="../../img/figure/admin.jpg" alt="Admin" />
                            </div>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu" tag="div" right={true}>
                            <div className="item-header">
                                <h6 className="item-title h4">{user.firstName} {user.lastName}</h6>
                            </div>
                            <div className="item-content">
                                <ul className="settings-list">
                                    <li><a href="#"><i className="flaticon-user"></i>My Profile</a></li>
                                    <li><a href="#"><i className="flaticon-list"></i>Task</a></li>
                                    <li><a href="#"><i className="flaticon-chat-comment-oval-speech-bubble-with-text-lines"></i>Message</a></li>
                                    <li><a href="#"><i className="flaticon-gear-loading"></i>Account Settings</a></li>
                                    <li><a href="login.html"><i className="flaticon-turn-off"></i>Log Out</a></li>
                                </ul>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown tag="li" className="navbar-item header-message" isOpen={msgOpen} toggle={() => setMsgOpen(!msgOpen)}>
                        <DropdownToggle tag="a" className="navbar-nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                            aria-expanded="false">
                            <i className="far fa-envelope"></i>
                            <div className="item-title d-md-none text-16 mg-l-10">Message</div>
                            <span>5</span>
                        </DropdownToggle>

                        <DropdownMenu tag="div" end={true}>
                            <div className="item-header">
                                <h6 className="item-title">05 Message</h6>
                            </div>
                            <div className="item-content">
                                <div className="media">
                                    <div className="item-img bg-skyblue author-online">
                                        <img src="../../img/figure/student11.png" alt="img" />
                                    </div>
                                    <div className="media-body space-sm">
                                        <div className="item-title">
                                            <a href="#">
                                                <span className="item-name">Maria Zaman</span> 
                                                <span className="item-time">18:30</span> 
                                            </a>  
                                        </div>
                                        <p>What is the reason of buy this item. 
                                        Is it usefull for me.....</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <div className="item-img bg-yellow author-online">
                                        <img src="../../img/figure/student12.png" alt="img" />
                                    </div>
                                    <div className="media-body space-sm">
                                        <div className="item-title">
                                            <a href="#">
                                                <span className="item-name">Benny Roy</span> 
                                                <span className="item-time">10:35</span> 
                                            </a>  
                                        </div>
                                        <p>What is the reason of buy this item. 
                                        Is it usefull for me.....</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <div className="item-img bg-pink">
                                        <img src="../../img/figure/student13.png" alt="img" />
                                    </div>
                                    <div className="media-body space-sm">
                                        <div className="item-title">
                                            <a href="#">
                                                <span className="item-name">Steven</span> 
                                                <span className="item-time">02:35</span> 
                                            </a>  
                                        </div>
                                        <p>What is the reason of buy this item. 
                                        Is it usefull for me.....</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <div className="item-img bg-violet-blue">
                                        <img src="../../img/figure/student11.png" alt="img" />
                                    </div>
                                    <div className="media-body space-sm">
                                        <div className="item-title">
                                            <a href="#">
                                                <span className="item-name">Joshep Joe</span> 
                                                <span className="item-time">12:35</span> 
                                            </a>  
                                        </div>
                                        <p>What is the reason of buy this item. 
                                        Is it usefull for me.....</p>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown tag="li" className="navbar-item header-notification" isOpen={notifOpen} toggle={()=> setNotifOpen(!notifOpen)}>
                        <DropdownToggle tag="a" className="navbar-nav-link" role="button" data-toggle="dropdown"
                            aria-expanded="false">
                            <i className="far fa-bell"></i>
                            <div className="item-title d-md-none text-16 mg-l-10">Notification</div>
                            <span>8</span>
                        </DropdownToggle>

                        <DropdownMenu tag="div" right={true}>
                            <div className="item-header">
                                <h6 className="item-title">03 Notifiacations</h6>
                            </div>
                            <div className="item-content">
                                <div className="media">
                                    <div className="item-icon bg-skyblue">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <div className="media-body space-sm">
                                        <div className="post-title">Complete Today Task</div>
                                        <span>1 Mins ago</span>
                                    </div>
                                </div>
                                <div className="media">
                                    <div className="item-icon bg-orange">
                                        <i className="fas fa-calendar-alt"></i>
                                    </div>
                                    <div className="media-body space-sm">
                                        <div className="post-title">Director Metting</div>
                                        <span>20 Mins ago</span>
                                    </div>
                                </div>
                                <div className="media">
                                    <div className="item-icon bg-violet-blue">
                                        <i className="fas fa-cogs"></i>
                                    </div>
                                    <div className="media-body space-sm">
                                        <div className="post-title">Update Password</div>
                                        <span>45 Mins ago</span>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                     <Dropdown tag="li" className="navbar-item header-language">
                        <DropdownToggle tag="a" className="navbar-nav-link dropdown-toggle" href="#" role="button" 
                        data-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-globe-americas"></i>EN</DropdownToggle>
                        <DropdownMenu tag="div" right={true}>
                            <a className="dropdown-item" href="#">English</a>
                            <a className="dropdown-item" href="#">Spanish</a>
                            <a className="dropdown-item" href="#">French</a>
                            <a className="dropdown-item" href="#">Chinese</a>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
            </Collapse>
    </Navbar>
  )
}

export default Header