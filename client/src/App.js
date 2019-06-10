import React, { Component } from 'react';
import axios from 'axios';
import './styles/global.css';

import Header from './components/Header';
// import Courses from './components/Courses';
// import CourseDetail from './components/CourseDetail';
// import UserSignIn from './components/UserSignIn';
// import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
// import UpdateCourse from './components/UpdateCourse';

class App extends Component {

    constructor() {
        super();
        this.state = {
            courses: [],
            loading: false
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

        if (!course) {
            console.log("No course!");
            this.setState({ loading: false });
        } else {
            axios({
                method: 'post',
                url: `http://localhost:5000/api/courses201`,
                data: {
                    title: course.title,
                    description: course.description,
                    estimatedTime: course.estimatedTime,
                    materialsNeeded: course.materialsNeeded
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

    componentDidMount() {
        // this.requestCourses();
    }

    render() {

        // const course = this.state.courses[0] && <CourseDetail course={this.state.courses[0]}/>;

        return (
            <div className="App">
                <Header />
                <hr />
                {/* <Courses courses={this.state.courses}/> */}
                {/* { course } */}
                {/* <UserSignIn requestLogin={this.requestLogin} /> */}
                {/* <UserSignUp registerUser={this.registerUser}/> */}
                <CreateCourse createCourse={this.createCourse}/>
                {/* <UpdateCourse/> */}
            </div>
        );
    }

}

export default App;
