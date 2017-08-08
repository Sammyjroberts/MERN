/**
 * Created by deanroberts on 8/7/17.
 */
import React, { Component } from 'react';
import axios from 'axios';
export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        };
    }
    componentDidMount() {
        axios.get("http://localhost:3000/api/contacts")
        .then(res => {
            this.setState({contacts: res.data});
        })
        .catch( err => {
            console.error(err);
        });
    }
    render() {
        return (
            <div className="container">
                <div>
                    <ul>
                    {this.state.contacts.map((contact, i) => {
                        return <li key={i}>{contact.name} {contact.number}</li>
                    })}
                    </ul>
                </div>
            </div>
        );
    }
}