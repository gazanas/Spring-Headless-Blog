import React, { Component } from "react";
import axios from "axios";

import Cookies from 'js-cookie'
import { ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavbarComponent from '../Navbar/NavbarComponent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import FooterComponent from "../Footer/FooterComponent";

class CategoriesComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {posts: [], page: 0, loading: false}

        this.loadMore = this.loadMore.bind(this)
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            axios.get('http://localhost:8080/post/' + this.props.match.params.category, {headers: {'Authorization': Cookies.get('Authorization')}, params: {'direction': 'desc', 'field': 'createdAt', 'page': this.state.page, 'size': 4}}).then(response => this.setState({posts: response.data, loading: false}))
        })
    }
    
    loadMore(event) {
        event.preventDefault()

        this.setState({loading: true}, () => { axios.get('http://localhost:8080/post/' + this.props.match.params.category, {headers: {'Authorization': Cookies.get('Authorization')}, params: {'direction': 'desc', 'field': 'createdAt', 'page': this.state.page+1, 'size': 4}}).then(response => 
            {
                let more = this.state.posts.concat(response.data)
                this.setState({posts: more, page: this.state.page+1, loading: false})
            })
        })
    }

    render() {
        const loading = <FontAwesomeIcon icon={faSpinner} spin />

        return (
            <div>
                <NavbarComponent />
                <div className='container border-left border-right border-dark min-vh-100'>
                    <div className='row d-flex justify-content-center p-5'>
                            {this.state.posts.map(post => {
                                return(
                                    <div className='row col-12 py-5 border-bottom border-dark'>
                                        <div className='col-6'>
                                            <Link to={'/posts/' + post.title}><img src={'http://localhost:8080/uploads/static/images/articles/' + post.image} className='img-fluid' /></Link>
                                        </div>
                                        <div className='col-6'>
                                            <ListGroup as='ul'>
                                                <ListGroup.Item>
                                                    <Link to={'/posts/' + post.title} className='text-decoration-none'><p className='h3 text-truncate text-dark'>{post.title}</p></Link>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <div><span class='font-weight-bold'>Author: </span><span>{post.author.username}</span></div>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <div><span class='font-weight-bold'>Created: </span><span>{post.createdAt}</span></div>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </div>
                                )
                            })}
                        <div className='row d-flex justify-content-center'>
                            {this.state.loading ? 
                                <div className='row d-flex justify-content-center p-5'>
                                    {loading}
                                </div>
                                : 
                                <div className='row d-flex justify-content-center p-5'>
                                    <Button onClick={this.loadMore} variant='primary'>Load More</Button> 
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
}

export default CategoriesComponent