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
    console.log(this.state)
    if (this.state.username !== null && this.state.password !== null && this.state.token == undefined) {
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
          console.log('tokentokentoken', this.state.token)
          localStorage.setItem('app-token', response.token)
          let t = localStorage.getItem('app-token')
          this.setState({
            token: t
          })
        })
        .then(() => {
          if (localStorage.getItem('app-token') !== undefined && localStorage.getItem('app-token') !== 'undefined') {
            this.setState({
              loggedIn: true
            })
          } else {
            alert('Incorrect Username or Password')
          }
        })
    }


    //   // this would be to update data
    //   // setTimeout(() => {
    //   //   fetch(`http://localhost:3000/users/1`, {
    //   //     method: 'POST',
    //   //     headers: {
    //   //       'Content-Type': 'application/json',
    //   //       "Authorization": `Bearer ${this.state.token}`
    //   //     },
    //   //     body: JSON.stringify({
    //   //       username: this.state.username,
    //   //       password: this.state.password
    //   //     })
    //   //   })
    //   // }, 3000)
    // }
  }

  login(authstate) {
    this.setState({
      username: authstate.username,
      password: authstate.password,
      // loggedIn: true
    })
    // localStorage.setItem('login', 'yay tostitos!');
    // let y = localStorage.getItem('login');
    console.log(this.state.token)
  }


  // bind 'this' when passing down function to access parent's this' when passed back up
  logout() {
    this.setState({
      token: null,
      username: null,
      password: null,
      loggedIn: false
    })
  }


  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <HomeScreen username={this.state.username} logout={this.logout.bind(this)} /> : <AuthScreen login={(token) => this.login(token)} />}
      </div>
    );
  }
}

export default App;
