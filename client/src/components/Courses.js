import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

class Courses extends Component {

    constructor() {
        super();
        this.state = {
            courses: [],
            loading: false
        }
        this.baseUrl = {
            API: "http://localhost:5000/api",
            React: "http://localhost:3000"
        };
        this.axiosCancelTokenSource = axios.CancelToken.source();
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.requestCourses();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelTokenSource.cancel('Axios canceled.');
    }

    requestCourses = () => {
        this._isMounted && this.setState({ loading: true });

        axios.get(this.baseUrl.API + "/courses200", {
            cancelToken: this.axiosCancelTokenSource.token
        }).then(response => {
            this.setState({
                courses: response.data,
                loading: false
            });
        })
        .catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.log('Error fetching and parsing data', error);
            }
            this._isMounted && this.setState({ loading: false });
        });
    }

    render () {

        return (
            <div className="bounds">
                {this.state.courses.map((course, index) => (
                    <Link key={index} to={`/courses/${course._id}`} className="grid-33">
                        <div className="course--module course--link">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </div>
                    </Link>
                ))}
    
                {
                    this.props.currentUser &&
                    <div className="grid-33">
                        <Link to="/courses/create" className="course--module course--add--module">
                            <h3 className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                New Course
                            </h3>
                        </Link>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(Courses);