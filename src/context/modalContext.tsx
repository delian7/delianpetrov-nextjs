"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, useDisclosure } from '@chakra-ui/react'; // Add necessary imports for Modal

interface ModalContextType {
  setModalTitle: (title: string) => void
  setModalContent: (newContent: ReactNode) => void;
  openModal: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const modal = useDisclosure();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<ReactNode>();

  const [state] = useState<ModalContextType>({
    setModalTitle: (title: string) => setTitle(title),
    setModalContent: (newContent: ReactNode) => setContent(newContent),
    openModal: () => modal.onOpen(),
  });

  return (
    <ModalContext.Provider value={state}>
      {children}

      <Modal
        size={'4xl'}
        motionPreset='slideInBottom'
        onClose={modal.onClose}
        isOpen={modal.isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              fontSize={'2xl'}
              color={"rgb(29, 112, 151);"}
              fontWeight={700}
            >
              {title}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {content}
          </ModalBody>
          <ModalFooter>
            <Button onClick={modal.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};