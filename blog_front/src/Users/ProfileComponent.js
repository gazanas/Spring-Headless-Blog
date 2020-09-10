import React, { Component } from "react";

import { Image } from 'react-bootstrap'

import NavbarComponent from '../Navbar/NavbarComponent'
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faGlobe, faGift, faMapMarker } from '@fortawesome/free-solid-svg-icons'

class ProfileComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {user: null}
    }

    componentDidMount() {
        axios.get('http://localhost:8080/user/' + this.props.match.params.uid).then(response => this.setState({user: response.data}))
    }

    render() {
        let profile = ''
        if (this.state.user !== null) {
            profile = <div className='row d-flex justify-content-center p-5'>
                    <div class="col-5">
                        <Image src={"http://localhost:8080/uploads/static/images/users/" + this.state.user.profile.avatar}  alt="" fluid rounded />
                    </div>
                    <div class="col-7">
                        <blockquote>
                            <p>{this.state.user.profile.firstname} {this.state.user.profile.lastname}</p>
                            <small><cite title="Source Title">{this.state.user.profile.city} {(this.state.user.profile.city.length !== null && this.state.user.profile.country !== null) ? ',' : ''} {this.state.user.profile.country}  <FontAwesomeIcon icon={faMapMarker} /></cite></small>
                        </blockquote>   
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} /> {this.state.user.email} <br />
                            <FontAwesomeIcon icon={faGlobe} /> {this.state.user.profile.website} <br />
                            <FontAwesomeIcon icon={faGift} /> {this.state.user.profile.birthdate}
                        </p>
                    </div>
                </div>
        }
        console.log()
        return (
            <div>
                <NavbarComponent />
                <div className='container border-left border-right border-dark min-vh-100'>
                    {profile}
                </div>
            </div>
        )
    }
}

export default ProfileComponent