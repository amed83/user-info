import React, { Component } from 'react';
import UserInfo from './UserInfo'

class App extends Component {
  render() {
    return (
      <div style={divStyle}>
        <UserInfo />
      </div>
    );
  }
}

const divStyle={
    display: 'flex',
    justifyContent:'center'
}

export default App;
