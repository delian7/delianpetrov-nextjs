import React, { createContext, useContext } from 'react';

const ScrollContext = createContext<((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleSmoothScroll = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = event.currentTarget.getAttribute("id");
    if (targetId) {
      event.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <ScrollContext.Provider value={handleSmoothScroll}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};