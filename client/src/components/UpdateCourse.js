import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import Validation from './Validation';
import { requireAuthentication } from "./PrivateRoute";

class UpdateCourse extends Component {

    constructor () {
        super();
        this.state = {
            course: {
                user: {
                    firstName: '',
                    lastName: ''
                },
                title: '',
                description: '',
                estimatedTime: '',
                materialsNeeded: ''
            },
            emptyValues: [],
            loading: false
        }
        this.baseUrl = {
            API: "http://localhost:5000/api",
            React: "http://localhost:3000"
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.requestCourse(id);
    }

    changeHandler = e => {

        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            course: {
                ...this.state.course,
                [name]: value
            }
        });
    }

    submitHandler = () => {
        
        if (this.state.course.title === "" || this.state.course.description === "") {
            if (this.state.course.title === "")
                this.setState({emptyValues: ["Title"]});
            else
                this.setState({emptyValues: ["Description"]});
        } else {
            this.setState({emptyValues: []}, () => {
                this.updateCourse(() => {
                    console.log(JSON.stringify(this.props.history));
                    this.props.history.push(`/courses/${this.state.course._id}`);
                });
            });
        }
    }

    requestCourse = (courseId) => {
        this.setState({ loading: true });

        axios.get(this.baseUrl.API + `/courses/${courseId}`)
            .then(response => {
                this.setState({
                    course: response.data,
                    loading: false
                }, () => {
                    if (response.data.user._id !== this.props.currentUser._id) {
                        this.props.history.push('/forbidden');
                    }
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                this.setState({ loading: false });
                this.props.history.push('/notfound');
            });
    }

    updateCourse = (callback) => {
        this.setState({ loading: true });

        if (this.props.currentUser) {
            axios({
                method: 'put',
                url: this.baseUrl.API + `/courses/${this.state.course._id}`,
                data: {
                    title: this.state.course.title,
                    description: this.state.course.description,
                    estimatedTime: this.state.course.estimatedTime,
                    materialsNeeded: this.state.course.materialsNeeded
                },
                withCredentials: true
            }).then(response => {
                
                console.log(response.data);
                callback();

            }).catch(error => {
                console.log('ERROR: ' + error);

                if (error && error.response && error.response.data) {
                    console.log('ERROR: ' + JSON.stringify(error.response.data.message));
                    alert(error.response.data.message);
                }
                this.setState({ loading: false });
            });
        } else {
            this.setState({ loading: false });
        }
    }

    render () {
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Validation emptyValues={this.state.emptyValues}/>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        placeholder="Course title..."
                                        onChange={this.changeHandler}
                                        value={this.state.course.title}
                                    />
                                </div>
                                { this.state.course.user && <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>}
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        placeholder="Course description..."
                                        onChange={this.changeHandler}
                                        value={this.state.course.description}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text" 
                                                className="course--time--input"
                                                placeholder="Hours"
                                                onChange={this.changeHandler}
                                                value={this.state.course.estimatedTime} />
                                            </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                placeholder="List materials..." 
                                                onChange={this.changeHandler}
                                                value={this.state.course.materialsNeeded}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="button" onClick={this.submitHandler}>Update Course</button>
                            <Link to="/" className="button button-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(requireAuthentication(UpdateCourse));