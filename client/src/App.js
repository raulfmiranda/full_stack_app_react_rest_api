import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
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
            courses: [],
            loading: false,
            currentUser: null,
            currentCourse: null
            // currentUser: {
            //     emailAddress: "jm@email.com",
            //     password: "1"
            // }
        };
        this.baseUrl = {
            API: "http://localhost:5000/api",
            React: "http://localhost:3000"
        };
    }

    requestCourses = () => {
        console.log("REQUEST COURSES");
        this.setState({ loading: true });

        axios.get(this.baseUrl.API + "/courses200")
            .then(response => {
                this.setState({
                    courses: response.data,
                    loading: false
                }, () => { });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                this.setState({ loading: false });
                // window.location.href = this.baseUrl.React + "/error";
            });
    }

    requestLogin = (email, password, callback) => {

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
            });
            
            callback();
            // this.props.history.push("/");
            // window.location.href = this.baseUrl.React + "/";
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

    registerUser = (user) => {
        this.setState({ loading: true });

        if (user.confirmPassword !== user.password) {
            console.log("Password must be equals to confirm password!");
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
                console.log(response.data);
    
                this.setState({
                    loading: false
                });
            })
                .catch(error => {
                    console.log('ERROR: ' + JSON.stringify(error.response.data.message));
                    this.setState({ loading: false });
                    // window.location.href = this.baseUrl.React + "/error";
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
    
                this.setState({
                    loading: false
                });

                let coursesTemp = this.state.courses;
                coursesTemp.push(response.data);
                this.setState({ courses: coursesTemp });

                callback();
                // window.location.href = this.baseUrl.React + "/";
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    console.log('ERROR: ' + JSON.stringify(error.response.data.message));
                } else {
                    console.log('ERROR: ' + JSON.stringify(error));
                }
                this.setState({ loading: false });
                // window.location.href = this.baseUrl.React + "/error";
            });
        } else {
            console.log("Create Course Forbidden!");
            // window.location.href = this.baseUrl.React + "/forbidden";
        }
    }

    updateCourse = (course) => {
        this.setState({ loading: true });

        if (this.state.currentUser) {
            axios({
                method: 'put',
                url: this.baseUrl.API + `/courses/${course._id}`,
                auth: {
                    username: this.state.currentUser.emailAddress,
                    password: this.state.currentUser.password
                },
                data: {
                    title: course.title,
                    description: course.description,
                    estimatedTime: course.estimatedTime,
                    materialsNeeded: course.materialsNeeded
                }
            }).then(response => {
                console.log(response.data);
    
                this.setState({
                    loading: false
                });
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    console.log('ERROR: ' + JSON.stringify(error.response.data.message));
                } else {
                    console.log('ERROR: ' + JSON.stringify(error));
                }
                this.setState({ loading: false });
                // window.location.href = this.baseUrl.React + "/error";
            });
        } else {
            this.setState({ loading: false });
            // window.location.href = this.baseUrl.React + "/forbidden";
        }
    }

    deleteCourse = (callback) => {

        this.setState({ loading: true });

        if (this.state.currentUser) {
            axios({
                method: 'delete',
                url: this.baseUrl.API + `/courses/${this.state.currentCourse._id}`,
                withCredentials: true
            }).then(response => {
                console.log(response.data);

                let coursesAfterDelete = this.state.courses;
                for (let i = 0; i < this.state.courses.length; i++) {
                    if (this.state.currentCourse._id === this.state.courses[i]._id) {
                        coursesAfterDelete.splice(i, 1);
                        break;
                    }
                }

                this.setState({
                    loading: false,
                    courses: coursesAfterDelete,
                }, () => { callback() });
            
            })
            .catch(error => {
                console.log('ERROR: ' + JSON.stringify(error));
                if (error && error.response && error.response.data) {
                    console.log('ERROR: ' + JSON.stringify(error.response.data.message));
                } 

                this.setState({ loading: false });
                // window.location.href = this.baseUrl.React + "/error";
            });
        }  else {
            this.setState({ loading: false });
            // window.location.href = this.baseUrl.React + "/forbidden";
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
        this.setState({ currentUser: null });
    }

    componentDidMount() {
        this.requestCourses();
    }

    render() {

        const courseDetail = this.state.currentCourse && <CourseDetail course={this.state.currentCourse} deleteCourse={this.deleteCourse}/>;
        const updateCourse = this.state.currentCourse && <UpdateCourse course={this.state.currentCourse} updateCourse={this.updateCourse}/>;
        
        const erroMsg = { title: "Error", body: "Sorry! We just encountered an unexpected error." };
        const forbiddenMsg = { title: "Forbidden", body: "Oh oh! You can't access this page." };
        const notFoundMsg = { title: "Not Found", body: "Sorry! We couldn't find the page you're looking for." };

        return (
            <div className="App">
                <Router>
                    <Header currentUser={this.state.currentUser} signOut={this.signOut}/>
                    <hr />
                    <Switch>
                        <Route exact path="/" component={ () => <Courses courses={this.state.courses} currentUser={this.state.currentUser} setCurrentCourse={this.setCurrentCourse}/> } />
                        <Route path="/signin" component={ () => <UserSignIn requestLogin={this.requestLogin} /> } />
                        <Route path="/signup" component={ () => <UserSignUp registerUser={this.registerUser}/> } />
                        <Route path="/create" component={ () => <CreateCourse createCourse={this.createCourse}/>} />
                        <Route path="/update" component={ () => updateCourse } />
                        <Route path="/detail" component={ () => courseDetail } />
                        <Route path="/error" component={ () => <Message message={erroMsg}/> } />
                        <Route path="/forbidden" component={ () => <Message message={forbiddenMsg}/> } />
                        <Route path="*" component={ () => <Message message={notFoundMsg}/> } />
                    </Switch>
                </Router>
            </div>
        );
    }

}

export default App;
