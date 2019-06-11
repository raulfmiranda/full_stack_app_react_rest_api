import React from 'react';
import { Link } from "react-router-dom";
import UserSignOut from "./UserSignOut";

const Header = ({ currentUser, signOut }) => {

    const signup = !currentUser && <Link to="/signup" className="signup">Sign Up</Link>;
    const signin = !currentUser && <Link to="/signin" className="signin">Sign In</Link>;
    const welcome = currentUser && <span>Welcome { currentUser.firstName } { currentUser.lastName }!</span>;
    const signout = currentUser && <UserSignOut signOut={signOut}/>;

    return (
        <div className="header">
            <div className="bounds">
                <Link to="/">
                    <h1 className="header--logo">Courses</h1>
                </Link>
                <nav>
                    { signup }
                    { signin }
                    { welcome }
                    { signout }
                </nav>
            </div>
        </div>
    );
}

export default Header;