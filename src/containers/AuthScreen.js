import React from 'react';

export default class AuthScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            token: null,
            name: null,
            username: null,
            password: null,
            passwordV: null,
            loginShow: false,
            signUpShow: false
        }
    }

    clickHandler(event) {
        if (event.target.innerText.toLowerCase() == 'login') {
            this.setState({
                loginShow: !this.state.loginShow,
                signUpShow: false
            })
        } else if (event.target.innerText.toLowerCase() == 'sign up') {
            this.setState({
                loginShow: false,
                signUpShow: !this.state.signUpShow
            })
        }
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.login(this.state)
        this.setState({
            username: null,
            password: null
        })
    }

    signup(event) {
        event.preventDefault()
        if (this.state.name !== null && this.state.username !== null && this.state.password !== null && this.state.password === this.state.passwordV)
            fetch('http://localhost:3000/users', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    fullname: this.state.name,
                    username: this.state.username,
                    password: this.state.password,
                    password_confirmation: this.state.passwordV
                }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(() => { this.forceUpdate() })
                .then(() => { this.props.login(this.state) })
                .then(() => {
                    this.setState({
                        username: null,
                        password: null,
                        passwordV: null
                    })
                })

        // this.props.login(this.state)

    }

    render() {
        return (
            <div id='auth'>
                <h1>myInsta</h1>
                <p>You got this, I promise!</p>

                <h2 onClick={(event) => this.clickHandler(event)}>Login</h2>
                <form style={{ display: this.state.loginShow ? 'flex' : 'none' }}>
                    <input type='text' placeholder='Username' name='username' onChange={(event) => this.handleChange(event)}></input>
                    <input type='password' placeholder='Password' name='password' onChange={(event) => this.handleChange(event)}></input>
                    <button type='submit' onClick={(event) => this.handleSubmit(event)}>Submit</button>
                </form>

                <h2 onClick={(event) => this.clickHandler(event)}>Sign Up</h2>
                <form style={{ display: this.state.signUpShow ? 'flex' : 'none' }}>
                    <input type='text' placeholder='Name' name='name' onChange={(event) => this.handleChange(event)}></input>
                    <input type='text' placeholder='Username' name='username' onChange={(event) => this.handleChange(event)}></input>
                    <input type='password' placeholder='Password' name='password' onChange={(event) => this.handleChange(event)}></input>
                    <input type='password' placeholder='Verify Password' name='passwordV' onChange={(event) => this.handleChange(event)
                    }></input >
                    <button type='submit' onClick={(event) => this.signup(event)}>Submit</button>
                </form >
            </div >
        )
    }
}