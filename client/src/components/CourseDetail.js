import React, { Component } from 'react';

export default class CourseDetail extends Component {
	state = {
		course: {}
	};

	componentDidMount(){
		const { context } = this.props;
		//i figured out how to do this bc i inspected the components in chromedev tools
		const { match } = this.props;
		
		context.data.getCourse(match.params.id)
		.then((course) => {
			this.setState({ course });
		})
		.catch(err => console.log(`error fetching individual route: ${err}`));
	}

	render(){
		const { course } = this.state;
		const materials = course.materialsNeeded;

		return(
			<React.Fragment>
				<div className="wrap">
					<h2>Course Detail</h2>
					<form>
						<div className="main--flex">
							<div>
								<h3 className="course--detail--title">Course</h3>
								<h4 className="course--name">{course.title}</h4>
								<p>By HOW DO I GET AUTHOR? IS IT USER?</p>
								<p>{course.description}</p>
							</div>
							<div>
								<h3 className="course--detail--title">Estimated Time</h3>
								<p>{course.estimatedTime}</p>
								<h3 className="course--detail--title">Materials Needed</h3>
								<ul className="course--detail--list">{materials}</ul>
							</div>
						</div>
					</form>
				</div>
			</React.Fragment>
		);
	}
}