/**
 * Created by deanroberts on 8/7/17.
 */
import React, { Component } from 'react';
import ContactForm from './ContactForm';
import axios from 'axios';
export default class AddContact extends Component {
    submit(name, number) {
        const contact =  {name, number};
        axios.post("http://localhost:3000/api/contacts",contact)
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.error(err);
        });
    }
    render() {
        return (
            <div>
                Add
                <ContactForm submit = {this.submit.bind(this)} />
            </div>
        );
    }
}