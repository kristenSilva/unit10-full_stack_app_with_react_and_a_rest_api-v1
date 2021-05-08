import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
	state = {
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		errors: []
	};

	render(){
		const { context } = this.props;
		const authUser = context.authenticatedUser;

		const {
			title,
			description,
			estimatedTime,
			materialsNeeded,
			errors
		} = this.state;

		return(
			<div className="wrap">
				<h2>Create Course</h2>
					<Form 
						cancel={this.cancel}
						errors={errors}
						submit={this.submit}
						submitButtonText="Create Course"
						elements={() => (
							<React.Fragment>
								<div className="main--flex">
									<div>
										<label>Course Title
											<input 
												id="title" 
												name="title" 
												type="text"
												value={title} 
												onChange={this.change} />
										</label>
										<p>By {authUser.firstName} {authUser.lastName}</p>
										<label>Course Description
											<textarea 
												id="description" 
												name="description" 
												type="text"
												value={description} 
												onChange={this.change} />
										</label>
									</div>
									<div>
										<label>Estimated Time
											<input 
												id="estimatedTime" 
												name="estimatedTime" 
												type="text"
												value={estimatedTime} 
												onChange={this.change} />
										</label>
										<label>Materials Needed
											<textarea 
												id="materialsNeeded" 
												name="materialsNeeded"
												type="materialsNeeded"
												value={materialsNeeded} 
												onChange={this.change} />
										</label>
									</div>
								</div>
							</React.Fragment>
						)} />
			</div>
		);
	}
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
		const authUser = context.authenticatedUser;
		const userId = authUser.id;
		
    const { 
			title, 
			description, 
			estimatedTime, 
			materialsNeeded,
		} = this.state;

    //new course info object using shorthand syntax
    const course = {
			title,
			description,
			estimatedTime,
			materialsNeeded,
			userId
    };
		
    //create new course
    context.data.createCourse(course, authUser.emailAddress, authUser.password)
    .then(errors => {
      if(errors.length){
        this.setState({ errors });
      } else {
        console.log(`course created: ${title}`);
				this.props.history.push('/');
      }
    })
    .catch(err => {
      //handle the rejected promise
      console.log(err);
      //redirect to error page by pushing to history stack
      this.props.history.push('/error');
    })
  }

  cancel = () => {
		// const { context } = this.props;
		// const authUser = context.authenticatedUser;
		// console.log('this is user according to createCourse:');
		// console.log(authUser);
    this.props.history.push('/');
  }
}