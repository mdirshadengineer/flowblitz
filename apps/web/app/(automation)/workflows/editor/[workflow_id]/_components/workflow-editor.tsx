'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { LoadingSpinner } from 'src/shared/loader/spinner';

const WorkflowEditor = dynamic(
  () => import('src/module/workflow/components/core/workflow-builder-editor'),
  {
    ssr: false,
    loading: () => <LoadingSpinner /> // TODO: Add a proper loading spinner
  }
);

export { WorkflowEditor };
