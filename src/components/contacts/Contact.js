import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Contact extends Component {

    onDeleteClick = async (id, dispatch) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        dispatch({type: 'DELETE_CONTACT', payload: id})
    }
    onShowContact = (dispatch) => {
        dispatch({type: 'SHOW_CONTACT'})
    }
  render() {
      const { name, email, phone, id } = this.props.contact;
    return (
        <Consumer>
            {value => {
                const { dispatch, showContactInfo } = value
                return (
                    <div className="card card-body mb-3">
                    <h4>{name} <i onClick={this.onShowContact.bind(this, dispatch)} className="fas fa-sort-down"
                    style={{ cursor: 'pointer'}}></i>
                    <i className="fas fa-times" style={{ cursor: 'pointer', float: 'right',  color: 'red'}}
                    onClick={this.onDeleteClick.bind(this, id, dispatch)}></i>

                    <Link to={`contact/edit/${id}`}>
                    <i
                    className="fas fa-pencil-alt"
                    style={{
                        cursor: 'pointer',
                        float: 'right',
                        color: 'black',
                        marginRight: '1rem'
                    }}></i>
                    </Link>
                    </h4>
                    { showContactInfo ? (
                        <ul className="list-group">
                        <li className="list-group-item">Email: {email}</li>
                        <li className="list-group-item">Phone: {phone}</li>
                    </ul>
                    ) : null}
                  </div>
                )
            }}
        </Consumer>
    )
  }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired
}
