import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();
export const useLoading = () => useContext(LoadingContext);


export const loadingService = {
  setLoading: () => {},
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  loadingService.setLoading = setIsLoading;

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
