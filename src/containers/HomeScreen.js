import React from 'react';

export default class HomeScreen extends React.Component {
    componentDidMount() {
        console.log('You can do this!')
    }

    render() {
        return (
            <div>
                <h1>myInsta</h1>
                <p>You got this, I promise!</p>

                <h2>You got logged in!</h2>

            </div>
        )
    }
}