import React from 'react';
import FormBuilderDesignerProvider from 'src/form/FormBuilderContext';

export default function FormEditorBuilderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <FormBuilderDesignerProvider>{children}</FormBuilderDesignerProvider>
    </React.Fragment>
  );
}
