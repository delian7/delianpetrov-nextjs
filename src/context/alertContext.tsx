import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface AlertContextType {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  onOpen: (type: 'success' | 'error', message: string) => void;
  onClose: () => void;
}

// Define the props for the provider
interface AlertProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [state, setState] = useState<AlertContextType>({
    isOpen: false,
    type: 'success',
    message: '',
    onOpen: (type: 'success' | 'error', message: string) => setState({ isOpen: true, type, message, onOpen: state.onOpen, onClose: state.onClose }),
    onClose: () => setState({ isOpen: false, type: 'success', message: '', onOpen: state.onOpen, onClose: state.onClose }),
  });

  return (
    <AlertContext.Provider value={state}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};