import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Courses extends Component {
    state = {
        courses: [],
    };

    componentDidMount(){
        const { context } = this.props;

        context.data.getCourses()
        .then((courses) => {
            this.setState({ courses });
        })
        .catch(err => console.log(err));
    }

    render() {
        const { courses } = this.state;
        const courseList = courses.map(course =>
            <Link className="course--module course--link" to={`/courses/${course.id}`}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title" key={course.id}>{course.title}</h3>
            </Link>
        );

        return(
            <React.Fragment>
                <div className="wrap main--grid">
                    {courseList}
                    <a className="course--module course--add--module">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </a>               
                </div>
            </React.Fragment>
        );
    }
}