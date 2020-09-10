import React, { Component } from "react";

import { Form, FormControl, Button, Dropdown } from 'react-bootstrap'
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'

class SearchComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {results: [], show: false, loading: false, searchCancelToken: axios.CancelToken.source()}

        this.search = this.search.bind(this)

        this.searchBlurHandler = this.searchBlurHandler.bind(this)
        this.toggleHoverIn = this.toggleHoverIn.bind(this)
        this.clickLink = this.clickLink.bind(this)
    }

    clickLink(link) {
        window.location = link 
    }

    searchBlurHandler(event) {
        let input = document.getElementsByClassName('search_input')[0]
        input.style.width = '0'
        this.setState({show: false})
    }

    toggleHoverIn(event) {
        let input = document.getElementsByClassName('search_input')[0]
        let icon = document.getElementsByClassName('search_icon')[0]
        input.style.width = '150px'
        icon.style.borderTopLeftRadius = '0'
        icon.style.borderBottomLeftRadius = '0'
        input.focus()
        if (this.state.results.length > 0)
            this.setState({show: true})
    }

    search(event) {
        let search = event.target.value
        
        if (search === '') {
            this.setState({results: [], show: false, loading: false})
            this.state.searchCancelToken.cancel('')
            return
        }
        
        this.setState({loading: true, show: true}, () => {
            axios.get('http://localhost:8080/post/search', {params: {'title': search, 'direction': 'desc', 'field': 'createdAt', 'page': 0, 'size': 5}, cancelToken: this.state.searchCancelToken.token}).then(response => {
                if (response.data.length === 0) {
                    this.setState({results: response.data, show: false, loading: false})
                } else {
                    this.setState({results: response.data, show: true, loading: false})
                }
            })
        })
    }

    render() {
        const loading = <FontAwesomeIcon icon={faSpinner} spin />

        return (
            <Form inline className="row mr-1 d-flex dropdown">
                <div class="searchbar">
                    <input type='text' placeholder='Search' className='search_input' onChange={this.search} onBlur={this.searchBlurHandler}/>
                    <div onClick={this.toggleHoverIn} class="search_icon"><FontAwesomeIcon icon={faSearch} /></div>
                </div>
                    <Dropdown.Menu className='row col-12 py-0' show={this.state.show}>
                        {this.state.loading ? 
                            <div className='row d-flex justify-content-center py-3'>
                                {loading}
                            </div> 
                            : 
                            <div>
                                {this.state.results.map(result => {
                                    return (
                                        <Dropdown.Item onMouseDown={() => this.clickLink('/posts/' + result.title)} className='row col-12 d-flex py-2 px-0 m-0'>
                                            <div className='col-5 pr-0 pl-2'>
                                                <img src={'http://localhost:8080/uploads/static/images/articles/' + result.image} className='img-fluid' />
                                            </div>
                                            <div className='col-7 text-truncate align-self-center pl-1 pr-2'>
                                                {result.title}
                                            </div>
                                        </Dropdown.Item>
                                    );
                                })}
                                <Dropdown.Item href='/posts/' className='row col-12 d-flex px-0 m-0'>
                                    <Button type='button' className='col-12' variant='primary'>More Results</Button>
                                </Dropdown.Item>
                            </div>
                        }
                    </Dropdown.Menu>
            </Form>
        )
    }
}

export default SearchComponent