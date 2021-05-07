import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
	state = {
		course: {},
		userInfo: {}
	};

	componentDidMount(){
		const { context } = this.props;
		//i figured out how to do this bc i inspected the components in chromedev tools
		const { match } = this.props;
		
		context.data.getCourse(match.params.id)
		.then((course) => {
			this.setState({ 
				course,
				userInfo: course.User
			});
		})
		.catch(err => console.log(`error fetching individual route: ${err}`));
	}

	render(){
		const { course, userInfo } = this.state;

		return(
			<React.Fragment>
				<main>
					<div className="actions--bar">
						<div className="wrap">
							<Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
							<Link className="button" to="/">Delete Course</Link>
							<Link className="button" to="/">Return to List</Link>
						</div>
					</div>
					<div className="wrap">
						<h2>Course Detail</h2>
						<form>
							<div className="main--flex">
								<div>
									<h3 className="course--detail--title">Course</h3>
									<h4 className="course--name">{course.title}</h4>
									<p>By {userInfo.firstName} {userInfo.lastName}</p>
									<p>{course.description}</p>
								</div>
								<div>
									<h3 className="course--detail--title">Estimated Time</h3>
									<p>{course.estimatedTime}</p>
									<h3 className="course--detail--title">Materials Needed</h3>
									<ul className="course--detail--list">{course.materialsNeeded}</ul>
								</div>
							</div>
						</form>
					</div>
				</main>
			</React.Fragment>
		);
	}
}