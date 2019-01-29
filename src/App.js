import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import AuthScreen from './containers/AuthScreen'
import HomeScreen from './containers/HomeScreen'

class App extends Component {
  state = {
    token: null,
    username: null,
    password: null,
    loggedIn: false
  }

  componentDidUpdate(prevState) {
    if (this.state.username !== prevState.username) {
      this.makeFetchRequest()
    }
  }

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
        })
      // .catch(() => {
      //   alert('invalid credentials##$#$#$#$$')
      // })


      // this would be to update data
      // setTimeout(() => {
      //   fetch(`http://localhost:3000/users/1`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       "Authorization": `Bearer ${this.state.token}`
      //     },
      //     body: JSON.stringify({
      //       username: this.state.username,
      //       password: this.state.password
      //     })
      //   })
      // }, 3000)
    }
  }

  login(authstate) {
    this.setState({
      username: authstate.username,
      password: authstate.password,
      loggedIn: true
    })
  }


  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <HomeScreen user={this.state.username} /> : <AuthScreen login={(token) => this.login(token)} />}
      </div>
    );
  }
}

export default App;
