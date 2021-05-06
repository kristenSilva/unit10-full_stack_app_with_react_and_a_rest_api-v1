import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import withContext from './Context';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignUpWithContext = withContext(UserSignUp);

export default () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/courses" component={CreateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
      </Switch>
    </div>
  </Router>
);
