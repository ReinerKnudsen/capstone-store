import { useState } from 'react';

import { signInExistingUser, signInWithGooglePopup } from '../../utils/firebase.utils.jsx';
import FormInput from '../form-input/form-input.component.jsx';
import Button from '../button/button.component.jsx';

import './sign-in-form.styles.scss';

const initialFormData = {
  email: '',
  password: '',
};

function SignInForm() {
  const [formData, setFormData] = useState(initialFormData);
  const { email, password } = formData;

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const signInWithGoogle = async () => {
    // from the total response all we need is the user object
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInExistingUser(email, password);
      resetForm();
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/invalid-password':
          alert('The combination of email and password is not recognized!');
          break;
        default:
          console.log(error);
          alert('Something went wrong');
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button buttonType='default' type='submit'>
            Sign in
          </Button>
          <Button buttonType='google-sign-in' type='button' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
