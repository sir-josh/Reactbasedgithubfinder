import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({iconName, title}) => {
    return (
        <nav className="navbar bg-primary">
            <h1> <i className={iconName}></i> {title}</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}
Navbar.defaultProps = {
    title: 'Github Finder',
    iconName: 'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
}

export default Navbar
