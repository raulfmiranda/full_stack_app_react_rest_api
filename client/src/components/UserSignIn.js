import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class UserSignIn extends Component {

    constructor() {
        super();
        this.state = {
            toHome: false
        }
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    handleSubmit = () => {
        this.props.requestLogin(
            this.emailInput.current.value, 
            this.passwordInput.current.value,
            () => {
                console.log(JSON.stringify(this.props.history));
                this.props.history.push('/');
            }
        );
    }

    render () {

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div><input id="emailAddress" name="emailAddress" type="text" ref={this.emailInput} placeholder="Email Address" defaultValue="jm@email.com"/></div>
                            <div><input id="password" name="password" type="password" ref={this.passwordInput} placeholder="Password" defaultValue="1"/></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="button" onClick={this.handleSubmit}>Sign In</button>
                                <Link to="/" className="button button-secondary">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
}

export default withRouter(UserSignIn);