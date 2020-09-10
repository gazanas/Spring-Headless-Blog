import React, { Component } from "react";
import axios from "axios";

import NavbarComponent from '../Navbar/NavbarComponent'
import CommentsComponent from "./CommentsComponent";
import FooterComponent from '../Footer/FooterComponent'

class PostComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {post: null}
    }

    componentDidMount() {
        axios.get('http://localhost:8080/post/find', {params: {'title': this.props.match.params.title}}).then(response => this.setState({post: response.data}))
    }

    render() {
        if (this.state.post != null)
            return (
                <div>
                    <NavbarComponent />
                    <div className='container min-vh-100'>
                        <div className='row d-flex justify-content-center border-left border-right border-dark p-5'>
                            <div className='post-title col-12 text-center h1'>{this.state.post.title}</div>
                            <small className='post-author col-12 text-center'>by {this.state.post.author.username}</small>
                            <img src={'http://localhost:8080/uploads/static/images/articles/' + this.state.post.image } className='img-fluid col-12 p-0' />
                            <div className='post-body col-12 py-5' dangerouslySetInnerHTML={{__html: this.state.post.body}} />
                            <CommentsComponent post_id={this.state.post.id} />
                        </div>
                    </div>
                    <FooterComponent />
                </div>
            )

        return ('')
    }
}

export default PostComponent;