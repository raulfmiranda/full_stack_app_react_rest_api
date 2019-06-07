import React from 'react';

const UserSignIn = ({ requestLogin }) => {

    const emailInput = React.createRef();
    const passwordInput = React.createRef();

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form>
                        <div><input id="emailAddress" name="emailAddress" type="text" ref={emailInput} placeholder="Email Address" defaultValue="jm@email.com"/></div>
                        <div><input id="password" name="password" type="password" ref={passwordInput} placeholder="Password" defaultValue="1"/></div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="button" onClick={() => requestLogin(emailInput.current.value, passwordInput.current.value)}>Sign In</button>
                            <button className="button button-secondary" type="button" onClick={() => console.log('canceled!')}>Cancel</button>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
            </div>
        </div>
    );
}

export default UserSignIn;