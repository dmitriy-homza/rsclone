import React, { Component } from 'react';

import { Helmet } from 'react-helmet';
import {
  InputGroup, InputGroupAddon, InputGroupText, Input,
} from 'reactstrap';
import firebase from '../components/firebase';
import Layout from '../components/layout';
import '../styles/index.scss';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const db = firebase.database();
    console.log('db', db);
  }

  handleChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  createAccount = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        {' '}
        <Helmet title="Terassa - Login" />
        <Layout>
          <div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input placeholder="email" id="email" type="text" onChange={this.handleChange} />
              <Input
                placeholder="password"
                id="password"
                type="password"
                onChange={this.handleChange}
              />
              <Input type="submit" onClick={this.createAccount} />
            </InputGroup>
          </div>
        </Layout>
      </div>
    );
  }
}
