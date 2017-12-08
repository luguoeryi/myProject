import React from 'react'
import {NavLink as Link} from 'react-router-dom'
import './index.css'

const NavBar = () => {
    return (
        <div className="navlink">
            <div>
                <Link exact to="/" style={{fontSize: '50px'}} activeClassName="activeClass">home</Link> &nbsp;
                <Link exact to="/login" activeClassName="activeClass">login</Link> &nbsp;
                <Link exact to="/reg" activeClassName="activeClass">reg</Link> &nbsp;
                <Link exact to="/rrrrrr" activeClassName="activeClass">error</Link> &nbsp;
                <Link to="/404" activeClassName="activeClass">404</Link>
            </div>
        </div>
    )
}

export default NavBar