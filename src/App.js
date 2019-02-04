import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import AuthScreen from './containers/AuthScreen'
import HomeScreen from './containers/HomeScreen'
import ProfileScreen from './containers/ProfileScreen'

export default class AppRouter extends React.Component {
  state = {
    token: null,
    username: null,
    password: null,
    loggedIn: false,
    user: null
  }

  componentDidUpdate(prevState) {
    if (this.state.username !== prevState.username) {
      this.loginRequest()
    }
  }

  loginRequest() {
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
            fetch('http://localhost:3000/users')
              .then(resp => resp.json())
              .then(data => {
                let currentUser = data.filter((user) => {
                  return user.username === this.state.username
                })
                this.setState({
                  user: currentUser[0]
                })
              })
          } else {
            alert('Incorrect Username or Password')
          }
        })
    }
  }

  login(authstate) {
    this.setState({
      username: authstate.username,
      password: authstate.password,
    })
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

  updateBio(bio) {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        bio: bio
      }
    }))
  }

  newPost() {
    alert('Create a new post.')
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.loggedIn ?
            <nav>
              <div>
                <span>
                  <Link to="/"><i className="fa fa-home falink"></i></Link>
                </span>
                <span>
                  <Link to="/profile/"><i className="fa fa-user falink"></i></Link>
                </span>
                <span>
                  <i className="fa fa-plus falink" onClick={() => this.newPost()} />
                </span>
                <span>
                  <i className="fa fa-sign-out falink" onClick={() => this.logout()} />
                </span>
              </div>
            </nav>
            : null}

          <Switch>
            {this.state.loggedIn ? <Route exact path="/" render={(props) => <HomeScreen {...props} user={this.state.user} logout={this.logout.bind(this)} updateBio={(bio) => this.updateBio(bio)} />} /> : <Route exact path="/" render={(props) => <AuthScreen {...props} login={(token) => this.login(token)} />} />}

            {this.state.loggedIn ? <Route path="/profile/" render={(props) => <ProfileScreen {...props} user={this.state.user} logout={this.logout.bind(this)} updateBio={(bio) => this.updateBio(bio)} />} /> : <Route exact path="/profile/" render={(props) => <AuthScreen {...props} login={(token) => this.login(token)} />} />}
          </Switch>
        </div>
      </Router>
    )
  }
}