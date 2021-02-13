import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {auth} from '../../firebase/firebase.utils';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link to="/">
      <Logo className="logo" />
    </Link>

    <div className="options">
      <Link className="option" to="/shop">SHOP</Link>
      <Link className="option" to="/contact">CONTACT</Link>
      {
        currentUser?
        <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
        :
        <Link className="option" to="/signin">SIGN IN</Link>
      }
      <CartIcon />
    </div>

    {hidden ? null : <CartDropdown />}
  </div>
)

// map redux state to component props
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden
});

// example with destructuring
// const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
//   currentUser, hidden
// });

export default connect(mapStateToProps)(Header);