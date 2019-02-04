import React from 'react';
import Post from '../components/Post'

export default class HomeScreen extends React.Component {
    state = {
        bio: null,
        showUpdateBio: false,
        posts: null
    }

    componentDidMount() {
        if (this.props.user) {
            this.setState({
                bio: this.props.user.bio
            })
        }
        this.makeRemoteRequest()
    }

    makeRemoteRequest(post) {
        fetch('http://localhost:3000/posts')
            .then(resp => resp.json())
            .then(data => {
                let posts = data.filter((post) => {
                    return post.user_id !== this.props.user.id
                })
                this.setState({
                    posts: posts.reverse()
                })
            })
    }

    render() {
        return (
            <div id='homescreen'>
                <h1>myInsta</h1>
                <form>
                    <textarea style={{ display: this.state.showUpdateBio ? 'flex' : 'none', margin: 'auto' }} placeholder='Bio' name='bio' onChange={(event) => this.handleChange(event)} />
                    <button style={{ display: this.state.showUpdateBio ? 'flex' : 'none', margin: 'auto' }} type='submit' onClick={(event) => this.handleSubmit(event)}>Submit</button>
                </form>
                <h2>Welcome, {this.props.user ? this.props.user.username : null}!</h2>
                <Post user={this.props.user} posts={this.state.posts} mRR={(post) => this.makeRemoteRequest(post)} />
            </div>
        )
    }
}