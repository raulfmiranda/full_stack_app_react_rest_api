import React, { Component } from 'react';
import Validation from './Validation';
import { Link, withRouter } from "react-router-dom";
import { requireAuthentication } from "./PrivateRoute";

class CreateCourse extends Component {

    constructor () {
        super();
        this.state = {
            course: {
                title: "My course",
                description: "My long description",
                estimatedTime: "6",
                materialsNeeded: "Lots of stuff"
            },
            emptyValues: []
        }
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
                this.props.createCourse(this.state.course, (courseId) => {
                    this.props.history.push(`/courses/${courseId}`);
                });
            });
        }
    }

    render() {
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
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
                                        defaultValue="My course" 
                                    />
                                </div>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        placeholder="Course description..."
                                        onChange={this.changeHandler}
                                        defaultValue="My long description"
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
                                                defaultValue="6" 
                                            />
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
                                                defaultValue="Lots of stuff"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="button" onClick={this.submitHandler}>Create Course</button>
                            <Link to="/" className="button button-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}


export default withRouter(requireAuthentication(CreateCourse));