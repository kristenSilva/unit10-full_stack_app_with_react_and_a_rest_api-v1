import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import withContext from './Context';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
      </Switch>
    </div>
  </Router>
);
