import type { NodeProps } from '@xyflow/react';
import type { AppNodeData } from '../../../types/app-node';

import { memo, useMemo } from 'react';
import { NodeCard } from './node-card';
import { NodeHeader } from './node-header';
import { NodeInput, NodeInputs } from './node-inputs';
import { TaskRegistry } from '../../../lib/task/registry';
import { NodeOutput, NodeOutputs } from './node-outputs';

const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const nodeData = data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  // Memoizing the input elements to prevent unnecessary renders
  const inputElements = useMemo(
    () =>
      task.inputs.map(input => (
        <NodeInput key={input.name} input={input} nodeId={id} />
      )),
    [task.inputs, id]
  );

  const outputElements = useMemo(
    () =>
      task.outputs.map(output => (
        <NodeOutput key={output.name} output={output} nodeId={id} />
      )),
    [task.outputs, id]
  );

  return (
    <NodeCard nodeId={id} isSelected={selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>{inputElements}</NodeInputs>
      <NodeOutputs>{outputElements}</NodeOutputs>
    </NodeCard>
  );
});

NodeComponent.displayName = 'NodeComponent';
export { NodeComponent };
