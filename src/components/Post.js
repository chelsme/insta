import React from 'react';

export default class Post extends React.Component {
    state = {
        posts: null
    }

    likePost(post, status) {
        let like = post.likes.find((like) => {
            return this.props.user.id === like.user_id
        })
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
                .then(() => this.props.mRR(post))
            :
            fetch(`http://localhost:3000/likes/${like.id}`, {
                method: 'DELETE', // or 'PUT'
            })
                .then(() => this.props.mRR(post))
    }

    showComments(post) {
        let comments = []
        post.comments.map((comment) => {
            comments.push(comment.text)
        })
        alert(comments)
    }

    render() {
        return (
            <div id='posts'>
                {this.props.posts ? this.props.posts.map((post, index) => {
                    return <div key={index} className='postCard' style={{ margin: '10px' }}>
                        {post.user_id !== this.props.user.id ?
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {post.user.avatar ? <img className='avatar' src={post.user.avatar} alt='avatar' /> : <img className='avatar' src='http://visualoop.com/wp-content/themes/visualoop/img/there-is-no-picture-for-this-user2.png' alt='avatar' />}
                                &nbsp;&nbsp;
                            <h2>{post.user.username}</h2>
                            </div>
                            : null
                        }
                        <img className='postImg' src={post.image} alt='blurb' />
                        <h3>{post.caption}</h3>
                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            {post.likes.length == 1 ? <span>{post.likes.length} like</span> : <span>{post.likes.length} likes</span>}
                            {post.comments.length == 1 ? <span onClick={() => this.showComments(post)}>{post.comments.length} comment</span> : <span onClick={() => this.showComments(post)}>{post.comments.length} comments</span>}
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