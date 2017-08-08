/**
 * Created by deanroberts on 8/7/17.
 */
import React, { Component } from 'react';
export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.name = props.name || "";
        this.state.number = props.number|| "";
    }
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
                <form onSubmit={(e) => { e.preventDefault(); this.props.submit(this.state.name, this.state.number)}}>
                    <label>Name</label>
                    <input name="name" onChange={this.handleInputChange.bind(this)}/>
                    <label>Phone Number</label>
                    <input name="number" onChange={this.handleInputChange.bind(this)}/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}