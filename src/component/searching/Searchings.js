import React, { Component } from 'react'

import SearchingChild from './child/SearchingChild'

import firebase from '../../firebase'
import swal from 'sweetalert';
import moment from 'moment'
import { DateRangePicker } from 'react-dates';

export default class Searchings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            onCallNum: null,
            load: false,
            emailSearch: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.setDateTime = this.setDateTime.bind(this)
    }
    
    handleChange(event) {
        // this.setState({startDate: event.target.value});
        // this.setState({endDate: event.target.value});
        this.setState({emailSearch: event.target.value});

        console.log(this.state.startDate)
        console.log(this.state.endDate)
        console.log(this.state.emailSearch)
    }

// Date Picker
    setDateTime = (a, b) => {
        this.setState({
            startDate: a,
            endDate: b,
        })
    }
//Date Picker    
    setFocusState = (focus) => {
        this.setState({
            focusedInput: focus.focusedInput,
        })
    }

    componentDidMount =() => {
        const checkCookie = this.getCookie('staff_name')
        if(checkCookie) {
            // this.loginSuccess()
        this.props.history.push('/search')
            
        } else {
            // this.notLogin()
            window.location.href = "/"
        }
    }

    getCookie = (cname) => {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {    
                return c.substring(name.length, c.length);
            } 
        }
        return null;                        
    }

    onCallSearch = (e) => {
        if(!this.state.startDate && !this.state.endtDate) {
            swal({
                title:'Please input start date & end date for search'
            })
        } else {
            const db = firebase.firestore();
 
            const email = this.getCookie('staff_name')
            // const email = this.state.emailSearch
            const oncallnumber = this.state.onCallNum
            const start = this.state.startDate.toDate();
            start.setHours(0,0,0)
            const end = this.state.endDate.toDate();
            end.setHours(23, 59, 59)
            this.setState({data: ''})
            this.setState({load: true})

            console.log(email)
            // console.log(oncallnumber)
            console.log(start)
            console.log(end)

            db.collection("oncalllogs") 
                .where('dateTime', '>=', start)
                .where('dateTime', '<=', end) 
                .where('email', '==', email)
            .onSnapshot((querySnapshot) => {
                var data = [];
                if(querySnapshot.size > 0) {
                    querySnapshot.forEach((querySnapshot) => {
                        data.push(querySnapshot.data())
                    });
                    this.setState({
                        data,
                    })
                    this.setState({load: false})
                } else {
                    swal('No booking on search')
                    this.setState({load: false})                
                } 
            });
        }
    }

    dataRender = (data) => {
        return data.map((e, i) => {
            return (
                <tr key={i} style={{backgroundColor:'rgba(228, 228, 228, 0.43)'}}>
                    <td>{e.oncallnumber}</td>
                    <td>{moment(e.dateTime).format('Y-MM-DD')}</td>
                    <td style={{textAlign:'left', paddingLeft:'16px'}}>{e.email}</td>
                </tr>
            );            
        });    
    }

    render() {
        return(
            <div>
                <br />


                <SearchingChild 
                    {...this.state}
                    dataRender={this.dataRender}
                    onCallSearch={this.onCallSearch}
                    handleChange={this.handleChange}
                    setDateTime={this.setDateTime}
                    setFocusState={this.setFocusState}
                    setEmail={this.setEmail}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}