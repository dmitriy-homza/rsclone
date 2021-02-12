import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Helmet } from 'react-helmet';
import { Button } from 'reactstrap';
import { Link } from 'gatsby';
import firebase from '../core/firebase';
import 'firebase/database';
import 'firebase/auth';
import Layout from '../components/layout';

import '../styles/index.scss';

// Configure FirebaseUI.

export default class login extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    hasAccount: false,
    uiConfig: null,
  };

  componentDidMount() {
    console.log(firebase);
    this.setState({
      uiConfig: {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false,
        },
      },
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ hasAccount: true });
        // this.loadData(user);
      } else {
        this.setState({ hasAccount: false });
      }
    });
  }

  render() {
    const { hasAccount, uiConfig } = this.state;
    if (!uiConfig) {
      return <p>Loading...</p>;
    }
    return (
      <Layout>
        {hasAccount ? (
          <div id="signed-In">
            <p>
              Welcome
              {' '}
              {firebase.auth().currentUser.displayName}
              ! You are now signed-in!
            </p>
            <div className="account-nav">
              <Button tag={Link} to="/private">Your orders</Button>
              <Button tag={Link} to="/admin-additions">Edit additions</Button>
              <Button tag={Link} to="/adminPanel">Edit tables</Button>
              <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
            </div>

          </div>
        ) : (
          <div id="signed-out">
            <p>Please sign-in:</p>

            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        )}
        <Helmet title="Terassa - Login" />
      </Layout>
    );
  }
}
