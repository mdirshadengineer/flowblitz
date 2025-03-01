'use client';

import type { AppNode } from 'src/module/workflow/types/app-node';

import { TaskParamType, type TaskParam } from '../../../types/task-type';

import { useMemo, useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

import StringParam from './param/string.param';
import BrowserInstanceParam from './param/browser-instance.param';

function NodeParamField({
  param,
  nodeId
}: {
  param: TaskParam;
  nodeId: string;
}) {
  const { updateNodeData, getNode } = useReactFlow();

  // Memoizing node lookup to prevent unnecessary calls
  const node = useMemo(() => getNode(nodeId) as AppNode, [getNode, nodeId]);

  // Extracting value only when node updates
  const value = useMemo(
    () => node?.data.inputs?.[param.name] ?? '',
    [node?.data.inputs, param.name]
  );

  // Memoized update function to prevent unnecessary re-renders
  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      if (newValue !== value) {
        // Prevent unnecessary state updates
        updateNodeData(nodeId, {
          inputs: {
            ...node?.data.inputs,
            [param.name]: newValue
          }
        });
      }
    },
    [updateNodeData, param.name, node?.data.inputs, value] // Include value to prevent redundant updates
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <div className="text-xs text-muted-foreground">Not Implemented</div>
        </div>
      );
  }
}

export { NodeParamField };
