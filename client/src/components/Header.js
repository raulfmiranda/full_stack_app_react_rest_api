import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = (props) => {

    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    <a className="signup" href="sign-up.html">Sign Up</a>
                    <a className="signin" href="sign-in.html">Sign In</a>
                    {/* <NavLink to='/dogs' onClick={() => props.onSearch('dogs')}>Dogs</NavLink> */}
                </nav>
            </div>
        </div>
    );
}

export default Header;