import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class Courses extends Component {

    clickDetailHandler = e => {
        if (e) {
            console.log(e.currentTarget.id);
            this.props.setCurrentCourse(e.currentTarget.id, () => {
                console.log(JSON.stringify(this.props.history));
                this.props.history.push('/detail');
            });
        }
    }

    render () {

        const newCourse = this.props.currentUser && (
            <div className="grid-33">
                <Link to="/create" className="course--module course--add--module">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </h3>
                </Link>
            </div>
        );

        return (
            <div className="bounds">
                {this.props.courses.map((course, index) => (
                    <div key={index} id={course._id} onClick={this.clickDetailHandler} className="grid-33">
                        <div className="course--module course--link">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </div>
                        {/* <Link to="/detail" className="course--module course--link">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <input type="hidden" name="courseId" value={course._id}/>
                        </Link> */}
                    </div>
                ))}
    
                { newCourse }
            </div>
        );
    }
}

export default withRouter(Courses);