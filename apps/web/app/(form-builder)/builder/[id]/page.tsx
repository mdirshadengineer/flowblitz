import { GetFormById } from 'actions/form';
import React from 'react';
import FormBuilder from '../_components/FormBuilder';

async function FormBuilderEditPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const form = await GetFormById(id);
  if (!form) {
    throw new Error('form not found');
  }
  return (
    <React.Fragment>
      <FormBuilder form={form} />
    </React.Fragment>
  );
}

export default FormBuilderEditPage;
