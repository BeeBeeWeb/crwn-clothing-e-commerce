import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import CurrentUserContext from './contexts/current-user/current-user.context';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          // console.log(snapshot.data());
          this.setState({
              currentUser: {
              id: snapshot.id,
              ...snapshot.data()
              }
            })
        });
      } else {
        // userAuth is return null when user signs out
        this.setState({currentUser: userAuth})
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>
          <Route
            exact
            path='/signin'
            render={() => this.state.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />}></Route>
        </Switch>
      </div>
    )
  };
}

export default App;
