import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, FormText } from 'react-bootstrap'
import Cookies from 'js-cookie'

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.login = this.login.bind(this);
        
        this.state = {error: ''}
    }

    componentDidMount() {
        axios.get('http://localhost:8080/user/all', {withCredentials: true})
    }

    login(event) {
        event.preventDefault()
        var object = {};
        const data = new FormData(event.target)
        data.forEach((value, key) => {object[key] = value});
        axios({
            url: 'http://localhost:8080/login',
            method: 'POST',
            data: object,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            withCredentials: true
        })
        .then(response => { Cookies.set('Authorization', response.headers.authorization); window.location = 'http://localhost:3000/posts'})
        .catch(error => this.setState({error: error.response.data.message}))
    }

    render() {
        return (
            <div className='login-wrapper vw-100 vh-100'>
                <div className='login container d-flex h-100'>
                    <Form onSubmit={this.login} className='row justify-content-center align-self-center mx-auto border rounded'>
                        <h2 className='col-12'>Login</h2>
                        <Form.Group className='col-12' controlId='formBasicEmail'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' name='username' placeholder='Enter username' />
                        </Form.Group>

                        <Form.Group className='col-12' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Password' />
                        </Form.Group>
                        <Button variant='primary' type='submit' className='col-2 mx-auto'>
                            Submit
                        </Button>
                        <FormText className='col-12 text-danger text-center text-sm'>
                            {this.state.error}
                        </FormText>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginComponent