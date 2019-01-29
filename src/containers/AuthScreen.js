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

    render() {
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