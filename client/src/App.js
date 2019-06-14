import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import './styles/global.css';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Message from './components/Message';

class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            currentUser: null
        };
        this.baseUrl = {
            API: "http://localhost:5000/api",
            React: "http://localhost:3000"
        };
    }

    componentDidMount() {
        const cookies = new Cookies();

        if (!this.state.currentUser && cookies.get('currentUserEmail')) {
            this.setState({
                currentUser: {
                    _id: cookies.get('currentUserId'),
                    emailAddress: cookies.get('currentUserEmail'),
                    firstName: cookies.get('currentUserFirstName'),
                    lastName: cookies.get('currentUserLastName'),
                    password: cookies.get('currentUserPassword')
                }
            });
        }
    }

    createCourse = (course, callback) => {
        this.setState({ loading: true });

        if (this.state.currentUser) {
            axios({
                method: 'post',
                url: this.baseUrl.API + "/courses201",
                data: {
                    title: course.title,
                    description: course.description,
                    estimatedTime: course.estimatedTime,
                    materialsNeeded: course.materialsNeeded
                },
                withCredentials: true
            }).then(response => {
                this.setState({ loading: false }, () => {
                    callback(response.data._id);
                });                
            }).catch(error => {
                if (error && error.response && error.response.data) {
                    console.log('2 ERROR: ' + JSON.stringify(error.response.data.message));
                    alert(error.response.data.message);
                } else {
                    console.log('3 ERROR: ' + JSON.stringify(error));
                }
                this.setState({ loading: false });
            });
        } else {
            console.log("Create Course Forbidden!");
        }
    }

    signIn = (email, password, callback) => {

        this.setState({ loading: true });

        axios({
            method: 'get',
            url: this.baseUrl.API + "/users200",
            auth: {
                username: email,
                password: password
            },
            withCredentials: true
        }).then(response => {
            console.log(response.data);

            const currentUser = {
                _id: response.data[0]._id,
                emailAddress: response.data[0].emailAddress,
                firstName: response.data[0].firstName,
                lastName: response.data[0].lastName,
                password
            };

            this.setState({
                loading: false,
                currentUser
            }, () => { 
                const cookies = new Cookies();
                cookies.set('currentUserId', response.data[0]._id, { path: '/' });
                cookies.set('currentUserEmail', response.data[0].emailAddress, { path: '/' });
                cookies.set('currentUserFirstName', response.data[0].firstName, { path: '/' });
                cookies.set('currentUserLastName', response.data[0].lastName, { path: '/' });
                cookies.set('currentUserPassword', password, { path: '/' });
                callback(); 
            });
        })
        .catch(error => {
            if (error && error.response && error.response.data) {
                console.log('ERROR: ' + JSON.stringify(error.response.data.message));
                alert(error.response.data.message);
            } else {
                console.log('ERROR: ' + JSON.stringify(error));
            }
            this.setState({ loading: false });
            // window.location.href = this.baseUrl.React + "/error";
        });
    }

    registerUser = (user, callback) => {
        this.setState({ loading: true });

        if (user.confirmPassword !== user.password) {
            alert("Password must be equals to confirm password!");
            this.setState({ loading: false });
        } else {
            axios({
                method: 'post',
                url: this.baseUrl.API + "/users201",
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailAddress: user.emailAddress,
                    password: user.password
                },
            }).then(response => {

                const currentUser = {
                    _id: response.data._id,
                    emailAddress: response.data.emailAddress,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    password: user.password
                };
    
                this.setState({
                    loading: false,
                    currentUser
                }, () => { callback() });

            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    console.log('ERROR: ' + JSON.stringify(error.response.data.message));
                    alert(error.response.data.message);
                } else {
                    console.log('ERROR: ' + JSON.stringify(error));
                }
                this.setState({ loading: false });
                // window.location.href = this.baseUrl.React + "/error";
            });
        }
    }

    setCurrentCourse = (courseId, callback) => {
        let course = {};
        for (let i = 0; i < this.state.courses.length; i++) {
            if (this.state.courses[i]._id === courseId) {
                course = this.state.courses[i];
                break;
            }
        }
        this.setState({currentCourse: course});
        callback();
    }

    signOut = () => {
        const cookies = new Cookies();
        cookies.remove('currentUserId', { path: '/' });
        cookies.remove('currentUserEmail', { path: '/' });
        cookies.remove('currentUserFirstName', { path: '/' });
        cookies.remove('currentUserLastName', { path: '/' });
        cookies.remove('currentUserPassword', { path: '/' });

        this.setState({ currentUser: null });
    }

    isAuthenticated = () => {
        return this.state.currentUser ? true : false;
    }

    render() {

        const erroMsg = { title: "Error", body: "Sorry! We just encountered an unexpected error." };
        const forbiddenMsg = { title: "Forbidden", body: "Oh oh! You can't access this page." };
        const notFoundMsg = { title: "Not Found", body: "Sorry! We couldn't find the page you're looking for." };

        return (
            <div className="App">
                <Router>
                    <Header currentUser={this.state.currentUser} signOut={this.signOut}/>
                    <hr />
                    { (this.state.loading) ? <h3>Loading...</h3> : 
                        <Switch>
                            <Route exact path="/" component={ () => <Courses currentUser={this.state.currentUser}/> } />
                            <Route path="/signin" component={ () => <UserSignIn signIn={this.signIn} /> } />
                            <Route path="/signup" component={ () => <UserSignUp registerUser={this.registerUser}/> } />
                            <Route path="/courses/create" component={ () => <CreateCourse createCourse={this.createCourse} isAuthenticated={this.isAuthenticated()}/>} />
                            <Route path="/courses/:id/update" component={ () => <UpdateCourse currentUser={this.state.currentUser} isAuthenticated={this.isAuthenticated()}/> } />
                            <Route path="/courses/:id" component={ () => <CourseDetail deleteCourse={this.deleteCourse} currentUser={this.state.currentUser} /> } />
                            <Route path="/error" component={ () => <Message message={erroMsg}/> } />
                            <Route path="/forbidden" component={ () => <Message message={forbiddenMsg}/> } />
                            <Route path="/notfound" component={ () => <Message message={notFoundMsg}/> } />
                            <Route path="*" component={ () => <Message message={notFoundMsg}/> } />
                        </Switch>
                    }
                </Router>
            </div>
        );
    }

}

export default App;
