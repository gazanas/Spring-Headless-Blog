import React, { Component } from "react"
import axios from "axios"
import Cookies from 'js-cookie'

import NavbarComponent from '../Navbar/NavbarComponent'
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import FooterComponent from "../Footer/FooterComponent";

class PostsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {posts: [], page: 0, loading: false}
    
        this.loadPosts = this.loadPosts.bind(this)
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            axios.get('http://localhost:8080/post/all', {headers: {'Authorization': Cookies.get('Authorization')}, params: {'direction': 'desc', 'field': 'createdAt', 'page': this.state.page, 'size': 6}, withCredentials: true}).then(response => this.setState({posts: response.data, loading: false}))
        })
    }

    loadPosts(event) {
        event.preventDefault()

        this.setState({loading: true}, () => {
            axios.get('http://localhost:8080/post/all', {headers: {'Authorization': Cookies.get('Authorization')}, params: {'direction': 'desc', 'field': 'createdAt', 'page': this.state.page+1, 'size': 6}, withCredentials: true}).then(response => {
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
                            return <Link to={'/posts/' + post.title.toLowerCase()} className='col-4 row d-flex justify-content-center text-decoration-none text-dark p-3' key={post.id}>
                                <h2 className='col-12 text-truncate'>{post.title}</h2>
                                <img src={'http://localhost:8080/uploads/static/images/articles/' + post.image} className='col-12 img-fluid' />
                            </Link>
                        })}
                    </div>
                    <div className='row d-flex justify-content-center'>
                        {this.state.loading ? 
                            <div className='row d-flex justify-content-center p-5'>
                                {loading} 
                            </div>
                                : 
                            <div className='row d-flex justify-content-center p-5'>
                            <Button onClick={this.loadPosts} variant='primary'>Load More</Button> 
                            </div>
                        }
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
}

export default PostsComponent