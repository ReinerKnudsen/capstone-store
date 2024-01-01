import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase.utils';

// the context is the actual VALUE we want to exit from other components
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// the Provider is the actual COMPONENT we can use to wrap those child components
// we want to provide the context to
// the Provider provides his state objects to all his child components
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // this initiates the Listener as soon as the component mounts
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // in the follwoing function we verify if the user already exsists
        createUserDocumentFromAuth(user);
      }
      // if the user logged out, 'user' will be null
      // if a user signed in, 'user' will be the user object
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
