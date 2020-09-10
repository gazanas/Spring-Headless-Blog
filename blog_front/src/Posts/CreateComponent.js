import React, { Component } from "react";
import NavbarComponent from "../Navbar/NavbarComponent";

import TextareaComponent from './TextareaComponent'
import { Form, Button } from "react-bootstrap";

import axios from 'axios'

import Cookies from 'js-cookie'
import FooterComponent from "../Footer/FooterComponent";

class CreateComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {categories: [], principal: null}

        this.post = this.post.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/category/all').then(response => this.setState({categories: response.data}))
        axios.get('http://localhost:8080/user/principal', {headers: {'Authorization': Cookies.get('Authorization')}}).then(response => this.setState({principal: response.data}))
    }

    post(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        formData.append('author', this.state.principal.id)
        axios({
            url: 'http://localhost:8080/post/add',
            method: 'POST',
            data: formData,
            headers: {
                'Authorization': Cookies.get('Authorization')
            },
            withCredentials: true
        })
    }

    render() {
        return (
            <div>
                <NavbarComponent />
                <div className='container vh-100'>
                    <div className='row d-flex justify-content-center p-5'>
                        <Form onSubmit={this.post}>
                            <Form.Group className='col-12'>
                                <Form.Control type='text' name='title' placeholder='Post Title' />
                            </Form.Group>
                            <Form.Group className='col-12'>
                                <Form.Control type='file' name='imageFile' />
                            </Form.Group>
                            <Form.Group className='col-12'>
                                <Form.Control as='select' name='category' defaultValue='default'>
                                    <option value="default" disabled>Select Category</option>
                                    {this.state.categories.map(category => {
                                        return <option value={category.id} key={category.id}>{category.category}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <TextareaComponent />
                            <Form.Group className='col-12'>
                                <Button variant='primary' type='submit'>Create Post</Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
}

export default CreateComponent