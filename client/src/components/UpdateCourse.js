import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
	state = {
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		errors: [],
	};

  componentDidMount() {
    const { context } = this.props;
    const { match } = this.props;
    const authUser = context.authenticatedUser;

    context.data.getCourse(match.params.id)
    .then((course) => {
      this.setState({
        title: course.title, 
        description: course.description, 
        estimatedTime: course.estimatedTime, 
        materialsNeeded: course.materialsNeeded
      });
      console.log(`course user id: ${course.userId}`);
      console.log(`authorized user id: ${authUser.id}`);
      if(course.userId !== authUser.id){
        //going to need to include a redirect page here
        this.props.history.push('/');
      }
    })
    .catch(err => console.log(`error fetching route: ${err}`));
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return(
      <div className="main--flex">
        <div>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div>
                <label>Course Title
                  <input 
                    id="title" 
                    name="title" 
                    type="text"
                    value={title} 
                    onChange={this.change} />
                </label>
                <p>By AUTHOR</p>
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
                    value={estimatedTime || ''} 
                    onChange={this.change} />
                </label>
                <label>Materials Needed
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded"
                    type="materialsNeeded"
                    value={materialsNeeded || ''} 
                    onChange={this.change} />
                </label>
              </div>
            </React.Fragment>
          )} />
        </div>
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
    const { match } = this.props;
		const authUser = context.authenticatedUser;
		const userId = authUser.id;

    const { 
      title, 
      description, 
      estimatedTime, 
      materialsNeeded
    } = this.state;

    //updated course info object using shorthand syntax
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    //update course
    context.data.updateCourse(course, match.params.id, authUser.emailAddress, authUser.password)
    .then(errors => {
      if(errors.length){
        this.setState({ errors });
      } else {
        console.log(`course updated: ${title}`);
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
    const { match } = this.props;
    this.props.history.push(`/courses/${match.params.id}`);
  }

}