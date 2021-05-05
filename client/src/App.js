import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch
// } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>Data should go here</div>
//       </header>
//     </div>
//   );
// }

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        data: data
      });
      console.log('data from api:', data);
    });
  }

  // render() {
  //   return(
  //     <div>{[this.state.data]}</div>
  //   )
  // }

}
export default App;
