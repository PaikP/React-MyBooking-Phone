import React, { Component } from 'react';
import MenuListBox from './MenuListBox';
import MainMenuCom from '../menu/MainMenuCom';

import menuList from '../assets/imgs/menu-list.png';
import OncallCom from '../form/OncallCom';
import OncallBookingCom from '../form/OncallBookingCom';

import './StyleHeader.css'

export default class MenuListCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
    }

    // getCookie = (cname) => {
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) === ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) === 0) {    
    //             return c.substring(name.length, c.length);
    //         } 
    //     }
    //     return null;                        
    // }

    menuListClick = () => {
        this.setState({
            menu: !this.state.menu
        })
        console.log('Menu List')  
    }

    render() {
        const { menu } = this.state
        const {...res } = this.props

        // const staff_name = this.getCookie('staff_name')
        // console.log(staff_name)

        let menuView = ''
        let classHide = ''
        let classShow = 'hide'

        if(menu) {
            menuView = <MainMenuCom {...this.props} /> 
        }

        return(
            <div>
                <div>
                    <MenuListBox image={menuList} onClick={this.menuListClick}/>
                        <div className="menuViewDiv">
                            {menuView}
                        </div>
                </div>
                    {/* <OncallBookingCom /> */}
                    
            </div>
        )
    }
}