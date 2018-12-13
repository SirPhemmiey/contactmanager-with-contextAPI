import React, { Component } from 'react'
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_CONTACT':
        return {
            ...state,
            contacts: state.contacts.filter(contact => contact.id !== action.payload)
        }
        break;
        case 'SHOW_CONTACT':
        return {
            ...state,
            showContactInfo: !state.showContactInfo
        }
        break;
        case 'ADD_CONTACT':
        return {
            ...state,
            contacts: [action.payload, ...state.contacts, ]
        }
        break;
        case 'UPDATE_CONTACT':
        return {
            ...state,
            contacts: state.contacts.map(contact => contact.id === action.payload.id ? (contact = action.payload) : contact)
        }
        default:
        return state;
    }
}

export class Provider extends Component {
    state = {
        contacts: [
            // {
            //     id: 1,
            //     name: 'John Doe',
            //     email: 'doe@gmail.com',
            //     phone: '233-3365-453'
            // },
            // {
            //     id: 2,
            //     name: 'Karren Will',
            //     email: 'will@gmail.com',
            //     phone: '9332-3365-453'
            // },
            // {
            //     id: 3,
            //     name: 'Henry Josh',
            //     email: 'joe@gmail.com',
            //     phone: '233-3365-453'
            // }
        ],
        showContactInfo: false,
        dispatch: action => this.setState(state => reducer(state, action))
    };

    async componentDidMount() {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        this.setState({contacts: res.data});
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;