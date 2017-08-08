/**
 * Created by deanroberts on 8/7/17.
 */
import React, { Component } from 'react';
import ContactForm from './ContactForm';

export default class EditContact extends Component {
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                Edit
                <ContactForm />
            </div>
        );
    }
}