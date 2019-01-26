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
                    console.log(response)
                    this.setState({
                        token: response.token
                    })
                })

            // setTimeout(() => {
            //   fetch('http://localhost:3000/users/1', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //       "Authorization": `Bearer ${this.state.token}`
            //     },
            //     body: JSON.stringify({
            //       username: 'Guy',
            //       password: 'hi'
            //     })
            //   })
            // }, 3000)
        }
    }

    handleChange(event) {
        // console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.makeFetchRequest()
        if (this.state.token !== null) {
            this.props.login(this.state.token)
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>myInsta</h1>
                <p>You got this, I promise!</p>

                <h2>Login:</h2>
                <form>
                    <input type='text' placeholder='Username' name='username' onChange={(event) => this.handleChange(event)}></input>
                    <input type='text' placeholder='Password' name='password' onChange={(event) => this.handleChange(event)}></input>
                    <button type='submit' onClick={(event) => this.handleSubmit(event)}>Submit</button>
                </form>

                <h2>Sign Up:</h2>
                <form>
                    <input type='text' placeholder='Name' name='name' onChange={(event) => this.handleChange(event)}></input>
                    <input type='text' placeholder='Username' name='username' onChange={(event) => this.handleChange(event)}></input>
                    <input type='text' placeholder='Password' name='password' onChange={(event) => this.handleChange(event)}></input>
                    <input type='text' placeholder='Password' name='passwordV' onChange={(event) => this.handleChange(event)
                    }></input >
                    <button type='submit' onSubmit={() => console.log('submitted')}>Submit</button>
                </form >
            </div >
        )
    }
}