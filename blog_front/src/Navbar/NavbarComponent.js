import React, { Component } from 'react'
import axios from 'axios'

import { Button, Form, FormControl, Nav, Navbar, NavDropdown, NavbarBrand } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import SearchComponent from './SearchComponent'

class NavbarComponent extends Component {

    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)

        this.state = {categories: [], principal: null}
    }

    componentDidMount() {
        axios.get('http://localhost:8080/category/all').then(response => this.setState({categories: response.data}))
        axios.get('http://localhost:8080/user/principal', {headers: {'Authorization': Cookies.get('Authorization')}}).then(response => this.setState({principal: response.data}))
    }

    logout(event) {
        event.preventDefault()
        Cookies.remove('Authorization')
        window.location = 'http://localhost:3000'
    }

    render() {
        const navbarGreet = (this.state.principal != null) ? 
                                <span>Hello {this.state.principal.username} <Link onClick={this.logout} className='nav-greet-link'>logout</Link></span> : 
                                <span>Hello guest <Link to='/' className='nav-greet-link'>login</Link></span>
 
        const newPostAccess = (this.state.principal != null && this.state.principal.role.id > 1) ? <Nav.Link href='/posts/create'>New Post</Nav.Link> : null
    
        return (
            <Navbar bg='dark' expand='lg' className='navbar-dark text-light'>
                <NavbarBrand href='/posts'>Blog</NavbarBrand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        {this.state.categories.map(category => {
                            return (
                                <Nav.Link href={'/category/' + category.category.toLowerCase()} key={category.id}>{category.category}</Nav.Link>
                            )
                        })}
                        {newPostAccess}
                    </Nav>
                    <SearchComponent />           
                    {navbarGreet}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarComponent