import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignUpContainer } from './sign-up-form.styles.jsx';

const initialSignUpForm = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(initialSignUpForm);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetForm = () => {
    setFormFields(initialSignUpForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetForm();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('A user with this email already exists');
      } else {
        console.log('Problems when creating a user', error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // this is interesting; we update the entire state. We spread out all fields
    // and only change the one which was changed in the form (identified by 'name')
    // That is actually how to update a state object!!
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='DisplayName'
          type='text'
          required
          name='displayName'
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label='Confirm password'
          type='password'
          required
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button buttonType={BUTTON_TYPE_CLASSES.default} type='submit'>
          Sign up
        </Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;
