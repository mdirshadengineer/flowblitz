'use client';

import { createContext, useState } from 'react';
import { FormElement, FormElementInstance } from './FormElements';

type FormBuilderDesignerContentType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
};

export const FormBuilderDesignerContext =
  createContext<FormBuilderDesignerContentType | null>(null);

export default function FormBuilderDesignerProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements(prev => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements(prev => {
      const index = prev.findIndex(element => element.id === id);
      if (index === -1) {
        console.warn(`Element with id ${id} not found`);
        return prev; // Return the original array if element not found
      }
      console.log(`Removing element with id ${id}`);
      const newElements = [...prev];
      newElements.splice(index, 1);
      return newElements;
    });
  };

  return (
    <FormBuilderDesignerContext.Provider
      value={{ elements, addElement, removeElement }}
    >
      {children}
    </FormBuilderDesignerContext.Provider>
  );
}
