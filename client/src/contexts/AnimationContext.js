import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

export const AnimationContext = createContext();

const AnimationContextProvider = ({ children }) => {
  const [listAnimation, setListAnimation] = useState(false);

  return (
    <AnimationContext.Provider value={{ listAnimation, setListAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContextProvider;
