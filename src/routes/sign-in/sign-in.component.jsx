import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    // from the total response all we need is the user object
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Come on in!</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
    </div>
  );
};

export default SignIn;
