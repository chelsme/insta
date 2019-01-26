import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import AuthScreen from './containers/AuthScreen'
import HomeScreen from './containers/HomeScreen'

class App extends Component {
  state = {
    token: null,
    username: null,
    password: null
  }

  // componentDidMount() {
  //   console.log(this.state.username, this.state.password, this.state.token)
  // }

  makeFetchRequest() {
    if (this.state.username !== null && this.state.password !== null) {
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
        .then(response => response.json())
        .then(response => {
          // localStorage.setItem('app-token', response.token)
          // localStorage.getItem('app-token')
          this.setState({
            token: response.token
          })
        }).then(resp => console.log(resp))

      setTimeout(() => {
        fetch(`http://localhost:3000/users/1`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.state.token}`
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        })
      }, 3000)
    }
  }

  login(token) {
    this.setState({
      token: token
    })
    console.log('get logged in now!')
    this.forceUpdate()
  }

  render() {
    return (
      <div className="App">
        {this.state.token ? <HomeScreen /> : <AuthScreen login={(token) => this.login(token)} />}
      </div>
    );
  }
}

export default App;
