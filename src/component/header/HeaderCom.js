import React, { Component } from 'react';

import HeaderBox from './HeaderBox';

import logo from '../assets/imgs/Kaidee-logo.png';
import MenulistCom from './MenuListCom';

import { PropTypes } from 'prop-types';

export default class HeaderCom extends Component {

        
    static propTypes = {
        history: PropTypes.object,
    }

    home = () => {
        this.props.history.push('/menu')
        console.log('test onclick menu')
    }

    homePage = () => {
        this.props.history.push('/')
    }

    search = () => {
        this.props.history.push('/search')
    }

    

    render() {
        console.log(this.props)
        
        return(
            <div>
                <HeaderBox image={logo}/>
            </div>
        )
    }
}