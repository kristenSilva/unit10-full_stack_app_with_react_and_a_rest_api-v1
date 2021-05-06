import config from './config';

export default class Data {
	api(path, method = 'GET', body = null){
			const url = config.apiBaseUrl + path;

			const options = {
					method,
					headers: {
							'Content-Type': 'application/json; charset=utf-8',
					}
			}

			if(body !== null){
					options.body = JSON.stringify(body);
			}

			return fetch(url, options);
	}

  /**
   * USER ACTIONS
   */

  // GETS individual user
  async getUser() {
    const response = await this.api(`/users`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // POST creates user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * COURSE ACTIONS
   */

  // GETS all courses
	async getCourses() {
		const response = await this.api('/courses', 'GET', null);
		if (response.status === 200){
			return response.json().then(data => data);
		} else if (response.status === 401){
			return null;
		} else {
			throw new Error();
		}
	}

  // GETS individual course
	async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // POST creates course
  async createCourse(course) {
    const response = await this.api('/courses', 'POST', course);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }  
}