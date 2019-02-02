import React from 'react';

export default class Posts extends React.Component {
    state = {
        posts: null
    }

    componentDidMount() {
        this.makeRemoteRequest()
    }

    makeRemoteRequest() {
        fetch('http://localhost:3000/posts')
            .then(resp => resp.json())
            .then(data => {
                console.log('data data data', data)
                let posts = data.filter((post) => {
                    console.log('post.user_id', post.user_id, 'this.props.user.id', this.props.user.id)
                    return post.user_id === this.props.user.id
                })
                this.setState({
                    posts: posts
                })
            })
    }

    likePost(post, status) {
        let like = post.likes.find((like) => {
            return this.props.user.id === like.user_id
        })
        console.log(like)
        status == 'like' ?
            fetch('http://localhost:3000/likes', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    user_id: this.props.user.id,
                    post_id: post.id
                }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => this.makeRemoteRequest())
            :
            fetch(`http://localhost:3000/likes/${like.id}`, {
                method: 'DELETE', // or 'PUT'
            })
                .then(() => this.makeRemoteRequest())
    }


    render() {
        return (
            <div id='posts'>
                {this.state.posts ? this.state.posts.map((post, index) => {
                    console.log(post.id)
                    return <div key={index} className='postCard' style={{ margin: '10px' }}>
                        <img src={post.image} alt='blurb' />
                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            {post.likes.length == 1 ? <span>{post.likes.length} like</span> : <span>{post.likes.length} likes</span>}
                            {post.comments.length == 1 ? <span>{post.comments.length} comment</span> : <span>{post.comments.length} comments</span>}
                            <i className="fa fa-heart" onClick={
                                post.likes.find((like) => { return like.user_id === this.props.user.id }) ? () => this.likePost(post, 'dislike') : () => this.likePost(post, 'like')
                            } style={post.likes.find((like) => { return like.user_id === this.props.user.id }) ? { color: 'red' } : { color: 'black' }}></i>
                            <i className="fa fa-comment"></i>
                        </span>
                    </div>
                })
                    : null}
            </div>
        )
    }
}