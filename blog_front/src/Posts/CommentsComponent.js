import React, { Component } from "react";
import { Button } from "react-bootstrap";

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

class CommentsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {comments: [], page: 0, loading: false}
        
        this.loadMore = this.loadMore.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/comment/post', {params: {'post': this.props.post_id, 'direction': 'desc', 'field': 'createdAt', 'page': this.state.page, 'size': 2}}).then(response => this.setState({comments: response.data}))
        axios.get('http://localhost:8080/comment/post', {params: {'post': this.props.post_id, 'direction': 'desc', 'field': 'createdAt', 'page': this.state.page, 'size': 2}}).then(response => this.setState({comments: response.data}))
    }

    loadMore() {
        this.setState({loading: true}, () => {
            axios.get('http://localhost:8080/comment/post', {params: {'post': this.props.post_id, 'direction': 'desc', 'field': 'createdAt', 'page': this.state.page+1, 'size': 2}}).then(response => this.setState({comments: this.state.comments.concat(response.data), page: this.state.page+1, loading: false}))
        })
    }

    render() {
        const loading = <FontAwesomeIcon icon={faSpinner} spin />

        return (
            <div class="container">
                <div class="row">
                    <div class="panel panel-default widget">
                        <div class="panel-heading">
                            <span class="glyphicon glyphicon-comment"></span>
                            <h3 class="panel-title">
                                Recent Comments</h3>
                        </div>
                        <div class="panel-body">
                            <ul class="list-group">
                                {this.state.comments.map(comment => {
                                    return(
                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-xs-2 col-md-1">
                                                    <img src={"http://localhost:8080/uploads/static/images/users/" + comment.author.profile.avatar} class="img-circle img-fluid" alt="" />
                                                </div>
                                                <div class="col-xs-10 col-md-11">
                                                    <div>
                                                        <div class="mic-info">
                                                            By: <a href="#">{comment.author.username}</a> on {comment.updated_at}
                                                        </div>
                                                    </div>
                                                    <div class="comment-text">
                                                        {comment.body}
                                                    </div>
                                                    <div class="action">
                                                        <button type="button" class="btn btn-primary btn-xs" title="Edit">
                                                            <span class="glyphicon glyphicon-pencil"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-success btn-xs" title="Approved">
                                                            <span class="glyphicon glyphicon-ok"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-danger btn-xs" title="Delete">
                                                            <span class="glyphicon glyphicon-trash"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            {this.state.loading ? 
                                <div className='row d-flex justify-content-center p-5'>
                                {loading} 
                                </div>
                                    :   
                                <div className='row d-flex justify-content-center p-5'>
                                    <Button variant='primary' type='button' className='col-12' onClick={this.loadMore}>Load More</Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsComponent