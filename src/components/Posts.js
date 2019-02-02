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


    render() {
        return (
            <div id='posts'>
                {this.state.posts ? this.state.posts.map((post, index) => {
                    return <p key={index} className='postCard'><img src={post.image} alt='blurb' />
                        {/* <i className="fa fa-spinner fa-spin">no spinner but why</i> */}
                        <i className="fa fa-heart"></i>
                        <i className="fa fa-comment"></i>
                        {/* <FontAwesomeIcon icon="igloo" /> */}
                    </p>
                })
                    : null}
            </div>
        )
    }
}