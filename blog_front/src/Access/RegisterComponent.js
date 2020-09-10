import React, { Component } from "react";
import axios from "axios";
import { Form, Button, FormText } from 'react-bootstrap'

class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.register = this.register.bind(this)

        this.state = {error: ''}
    }

    register(event) {
        event.preventDefault()
        const data = new FormData(event.target)
        var object = {}
        data.forEach((value, key) => object[key] = value)

        axios({
            url: 'http://localhost:8080/user/add',
            method: 'POST',
            data: object,
            withCredentials: true
        })
        .then(response => window.location = 'http://localhost:3000/')
        .catch(error => this.setState({error: error.response.data.message}))
    }

    render() {
        return (
            <div className='login-wrapper vw-100 vh-100'>
                <div className='login container d-flex h-100'>
                    <Form onSubmit={this.register} className='row justify-content-center align-self-center mx-auto border rounded'>
                        <h2 className='col-12'>Register</h2>
                        <Form.Group className='col-12' controlId='formBasicEmail'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' name='username' placeholder='Enter username' />
                        </Form.Group>

                        <Form.Group className='col-12' controlId='formBasicEmail'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' name='email' placeholder='Enter email' />
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

export default RegisterComponent