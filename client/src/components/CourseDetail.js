import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class CourseDetail extends Component {

    deleteHandler = () => {
        this.props.deleteCourse(() => {
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
                                <Link to="/update" className="button">Update Course</Link>
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
                            <h3 className="course--title">{this.props.course.title}</h3>
                            <p>By {this.props.course.user.firstName} {this.props.course.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            {this.props.course.description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.props.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {this.props.course.materialsNeeded.split("\n*").map((s, i) => <li key={i}>{s.replace('*', '')}</li>)}
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