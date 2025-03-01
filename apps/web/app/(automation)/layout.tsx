import React from 'react';

import '@xyflow/react/dist/style.css';
import 'app/_styles/react-flow.css';

import { ReactFlowProvider } from '@xyflow/react';

export default function AutomationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </React.Fragment>
  );
}
