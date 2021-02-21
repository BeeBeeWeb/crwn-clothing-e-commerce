import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import './App.css';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions'
import { selectCollectionForPreview } from './redux/shop/shop.selectors'

import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;

    addCollectionAndDocuments(
      'collections',
      collectionsArray.map(({ title, items }) => ({ title, items }))
    );

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          // console.log(snapshot.data());
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
        });
      } else {
        // userAuth is return null when user signs out
        setCurrentUser(userAuth)
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>
          <Route
            exact
            path='/signin'
            render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />}></Route>
        </Switch>
      </div>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionForPreview
});

// e.g with state de-structured into user
// const mapStateToProps = ({user}) => ({
//   currentUser: user.currentUser
// });

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
