import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

class CourseDetail extends Component {

    constructor () {
        super();
        this.state = {
            course: {
                user: {
                    firstName: '',
                    lastName: ''
                },
                description: '',
                materialsNeeded: ''
            },
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
        const { id } = this.props.match.params;
        this.requestCourse(id);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelTokenSource.cancel('Axios canceled.');
    }

    requestCourse = (courseId) => {
        this._isMounted && this.setState({ loading: true });

        axios.get(this.baseUrl.API + `/courses/${courseId}`, {
            cancelToken: this.axiosCancelTokenSource.token
        })
        .then(response => {
            this._isMounted && this.setState({
                course: response.data,
                loading: false
            });
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
            this._isMounted && this.setState({ loading: false });
            this.props.history.push('/notfound');
        });
    }

    deleteCourse = (callback) => {

        this.setState({ loading: true });

        if (this.props.currentUser) {
            axios({
                method: 'delete',
                url: this.baseUrl.API + `/courses/${this.state.course._id}`,
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                callback();
            })
            .catch(error => {
                console.log('ERROR1: ' + JSON.stringify(error));
                if (error && error.response && error.response.data) {
                    console.log('ERROR2: ' + JSON.stringify(error.response.data.message));
                    alert(error.response.data.message);
                } 

                this.setState({ loading: false });
                // window.location.href = this.baseUrl.React + "/error";
            });
        }  else {
            this.setState({ loading: false });
            // window.location.href = this.baseUrl.React + "/forbidden";
        }
    }

    deleteHandler = () => {
        this.deleteCourse(() => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link to={`/courses/${this.state.course._id}/update`} className="button">Update Course</Link>
                                <button className="button" type="button" onClick={this.deleteHandler}>Delete Course</button>
                            </span>
                                <Link to="/" className="button button-secondary">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.course.title}</h3>
                            <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            {this.state.course.description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {this.state.course.materialsNeeded.split("\n*").map((s, i) => <li key={i}>{s.replace('*', '')}</li>)}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }    
}

export default withRouter(CourseDetail);