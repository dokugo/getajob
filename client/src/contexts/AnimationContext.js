import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

export const AnimationContext = createContext();

const AnimationContextProvider = ({ children }) => {
  const [listAnimation, setListAnimation] = useState(false);

  const toggleAnimation = boolean => {
    setListAnimation(boolean);
  };
  return (
    <AnimationContext.Provider value={{ listAnimation, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContextProvider;
