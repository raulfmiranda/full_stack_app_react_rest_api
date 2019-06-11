import React from 'react';
import { Link } from "react-router-dom";

const UserSignOut = ({ signOut }) => {

    return (
        <Link to="/" onClick={signOut} className="signout">Sign Out</Link>
    );
}

export default UserSignOut;