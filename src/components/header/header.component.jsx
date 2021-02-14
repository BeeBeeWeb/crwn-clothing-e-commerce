import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import React from 'react';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartDropdownHidden } from '../../redux/cart/cart.selectors';

import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';


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
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartDropdownHidden
});

// example without 'createStructuredSelector'
// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartDropdownHidden(state)
// });

// example without using selector
// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser,
//   hidden: state.cart.hidden
// });

// example with destructuring
// const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
//   currentUser, hidden
// });

export default connect(mapStateToProps)(Header);