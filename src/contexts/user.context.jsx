import { createContext, useState } from 'react';

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
