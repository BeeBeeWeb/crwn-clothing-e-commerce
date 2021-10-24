import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';

const App = ({ setCurrentUser, currentUser }) => {

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
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

    return () => {
      console.log('unmounted');
      unsubscribeFromAuth();
    };

  }, [setCurrentUser]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
        <Route exact path='/checkout' component={CheckoutPage}></Route>
        <Route
          exact
          path='/signin'
          render={() => currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />}></Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// e.g with state de-structured into user
// const mapStateToProps = ({user}) => ({
//   currentUser: user.currentUser
// });

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
