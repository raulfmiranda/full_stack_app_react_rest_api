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

class App extends Component {

    constructor() {
        super();
        this.state = {
            courses: [],
            loading: false,
            currentUser: {
                emailAddress: "jm@email.com",
                password: "1"
            }
        };
    }

    requestCourses = () => {

        this.setState({ loading: true });

        axios.get(`http://localhost:5000/api/courses200`)
            .then(response => {
                this.setState({
                    courses: response.data,
                    loading: false
                }, () => { });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                this.setState({ loading: false });
            });
    }

    requestLogin = (email, password) => {

        this.setState({ loading: true });

        axios({
            method: 'get',
            url: `http://localhost:5000/api/users200`,
            auth: {
                username: email,
                password: password
            }
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
        })
            .catch(error => {
                console.log('ERROR: ' + JSON.stringify(error.response.data.message));
                this.setState({ loading: false });
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
                url: `http://localhost:5000/api/users201`,
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
                });
        }
    }

    createCourse = (course) => {
        this.setState({ loading: true });

        axios({
            method: 'post',
            url: `http://localhost:5000/api/courses201`,
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
            });
    }

    updateCourse = (course) => {
        this.setState({ loading: true });

        axios({
            method: 'put',
            url: `http://localhost:5000/api/courses/${course._id}`,
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
            });
    }

    deleteCourse = (course) => {
        this.setState({ loading: true });

        axios({
            method: 'delete',
            url: `http://localhost:5000/api/courses/${course._id}`,
            auth: {
                username: this.state.currentUser.emailAddress,
                password: this.state.currentUser.password
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
            });
    }

    componentDidMount() {
        this.requestCourses();
    }

    render() {

        const courseDetail = this.state.courses[0] && <CourseDetail course={this.state.courses[0]} deleteCourse={this.deleteCourse}/>;
        const updateCourse = this.state.courses[0] && <UpdateCourse course={this.state.courses[0]} updateCourse={this.updateCourse}/>;

        return (
            <div className="App">
                <Router>
                    <Header />
                    <hr />
                    <Switch>
                        <Route exact path="/" component={ () => <Courses courses={this.state.courses}/> } />
                        <Route path="/signin" component={ () => <UserSignIn requestLogin={this.requestLogin} /> } />
                        <Route path="/signup" component={ () => <UserSignUp registerUser={this.registerUser}/> } />
                        <Route path="/create" component={ () => <CreateCourse createCourse={this.createCourse}/>} />
                        <Route path="/update" component={ () => updateCourse } />
                        <Route path="/detail" component={ () => courseDetail } />
                    </Switch>
                </Router>
            </div>
        );
    }

}

export default App;
