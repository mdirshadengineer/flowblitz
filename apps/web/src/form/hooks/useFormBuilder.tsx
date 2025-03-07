'use client';

import React, { useContext } from 'react';
import { FormBuilderDesignerContext } from '../FormBuilderContext';

function useFormBuilder() {
  const context = useContext(FormBuilderDesignerContext);

  if (!context) {
    throw new Error(
      'useFormBuilder must be used within a FormBuilderDesignerContext'
    );
  }
  return context;
}

export default useFormBuilder;
