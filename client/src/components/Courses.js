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
		.catch(err => {
			this.props.history.push('/error');
			console.log(err);
		});
	}

	render() {
		const { courses } = this.state;
		//generates the 'home' display where all courses are listed out
		const courseList = courses.map((course) => {
			return (
				<Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
				<h2 className="course--label">Course</h2>
				<h3 className="course--title">{course.title}</h3>
				</Link>
			);
		});

		return(
			<React.Fragment>
				<div className="wrap main--grid">
					{courseList}
					<Link className="course--module course--add--module" to="/courses/create">
						<span className="course--add--title">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
							viewBox="0 0 13 13" className="add">
							<polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
							</svg>
							New Course
						</span>
					</Link>               
				</div>
			</React.Fragment>
		);
	}
}