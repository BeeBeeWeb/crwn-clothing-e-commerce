import React, { useState } from 'react';

import './sign-in.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = userCredentials;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({ email: '', password: '' });
    } catch (error) {
      console.log('error signing in', error);
    }

  }

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({...userCredentials, [name]: value });
  }

  return (
    <div className="sign-in">
      <h2>I already have an account.</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={userCredentials.email}
          required
          handleChange={handleChange}
          label='Email' />

        <FormInput
          name="password"
          type="password"
          value={userCredentials.password}
          required
          handleChange={handleChange}
          label="Password" />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton type="button" isGoogleSignIn onClick={signInWithGoogle}>Sign In with Google</CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;