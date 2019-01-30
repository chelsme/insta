import React from 'react';
import Posts from '../components/Posts'

export default class HomeScreen extends React.Component {
    componentDidMount() {
        // console.log(this.props)
    }

    render() {
        return (
            <div>
                <h1>myInsta</h1>
                <p>You got this, I promise!</p>
                <button onClick={this.props.logout}>Logout</button>

                <h2>{this.props.username} logged in!</h2>
                <Posts username={this.props.username} />
            </div>
        )
    }
}