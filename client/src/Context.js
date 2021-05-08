import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {
  state = {
    authenticatedUser: null
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
    user.password =  password;
    if(user !== null){
      this.setState(() => {
        return {
          authenticatedUser: user
        };
      });
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
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

