import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class UserSignUp extends Component {

    constructor () {
        super();
        this.state = {
            user: {
                firstName: "Jose", 
                lastName: "Maria",
                emailAddress: "jm@email.com", 
                password: "1",
                confirmPassword: "1"
            }
        }
    }

    changeHandler = e => {

        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    }

    submitHandler = () => {
        this.props.registerUser(this.state.user, () => {
            this.props.history.push('/');
        });
    }

    render() {

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form>
                            <div>
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text" 
                                    placeholder="First Name" 
                                    onChange={this.changeHandler} 
                                    value={this.state.user.firstName.value} 
                                    defaultValue="Jose"
                                />
                            </div>
                            <div>
                                <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text" 
                                    placeholder="Last Name" 
                                    onChange={this.changeHandler} 
                                    value={this.state.user.lastName.value} 
                                    defaultValue="Maria"
                                />
                            </div>
                            <div>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text" 
                                    placeholder="Email Address" 
                                    onChange={this.changeHandler} 
                                    value={this.state.user.emailAddress.value} 
                                    defaultValue="jm@email.com"
                                />
                            </div>
                            <div>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    placeholder="Password" 
                                    onChange={this.changeHandler} 
                                    value={this.state.user.password.value} 
                                    defaultValue="1"
                                />
                            </div>
                            <div>
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    onChange={this.changeHandler}
                                    value={this.state.user.password.value} 
                                    defaultValue="1"
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button 
                                    className="button" 
                                    type="button" 
                                    onClick={this.submitHandler}>
                                    Sign Up
                                </button>
                                <Link to="/" className="button button-secondary">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
     }
    
}

export default withRouter(UserSignUp);