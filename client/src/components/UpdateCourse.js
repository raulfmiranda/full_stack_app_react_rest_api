import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Validation from './Validation';

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
            this.setState({emptyValues: []});
            this.props.updateCourse(this.state.course, () => {
                console.log(JSON.stringify(this.props.history));
                this.props.history.push('/detail');
            });
        }
    }

    componentDidMount() {
        this.setState({ course: this.props.course });
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

export default withRouter(UpdateCourse);