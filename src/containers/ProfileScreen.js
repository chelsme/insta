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
                    return post.user_id === this.props.user.id
                })
                this.setState({
                    posts: posts.reverse()
                })
            })
    }

    showUpdateBio() {
        this.setState({
            showUpdateBio: !this.state.showUpdateBio
        })
        // if (this.state.showUpdateBio) {
        //     'flex'
        // } else {
        //     'none'
        // }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let token = localStorage.getItem('app-token')
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                bio: this.state.bio
            })
        })
        this.props.updateBio(this.state.bio)
        this.setState({
            showUpdateBio: false
        })
    }

    render() {
        console.log('profile props>>>>>>>>>>>>>>>', this.props.user.username)
        return (
            <div id='homescreen'>
                <h1>myInsta</h1>
                <p>{this.props.user ? this.props.user.bio : null}</p>
                <p><i className="fa fa-edit falink" onClick={() => this.showUpdateBio()} /></p>
                <form>
                    <textarea style={{ display: this.state.showUpdateBio ? 'flex' : 'none', margin: 'auto' }} placeholder='Bio' name='bio' onChange={(event) => this.handleChange(event)} />
                    <button style={{ display: this.state.showUpdateBio ? 'flex' : 'none', margin: 'auto' }} type='submit' onClick={(event) => this.handleSubmit(event)}>Submit</button>
                </form>
                {/* <p><i className="fa fa-sign-out falink" onClick={this.props.logout} /></p> */}

                <h2>{this.props.user ? this.props.user.username : null} logged in!</h2>
                <Post user={this.props.user} posts={this.state.posts} mRR={(post) => this.makeRemoteRequest(post)} />
            </div>
        )
    }
}