import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {
  //set initial state to value stored in Cookie OR null
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;

    //value object to provide utility methods of Data class
    const value = {
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
      authenticatedUser
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);

    //need to store password in order to access in other components - this is done instead of working with hashed variable
    if(user !== null ){
      this.setState(() => {
        user.password = password;
        user.emailAddress = emailAddress;
        return {
          authenticatedUser: user
        };
      });
      //persist credentials after authentication-authenticatedUser is name of Cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState( () => {
      return { 
        authenticatedUser: null 
      }
    });
    Cookies.remove('authenticatedUser');
  }
  
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

