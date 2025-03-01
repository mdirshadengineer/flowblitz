import { Handle, Position } from '@xyflow/react';
import React, { ReactNode } from 'react';
import { TaskParam } from '../../../types/task-type';
import { cn } from 'components/lib/utils';
import { NodeParamField } from './node-param-field';
import { ColorForHandle } from './common';

export function NodeInputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col divide-y-2 gap-2">{children}</div>;
}

export function NodeInput({
  input,
  nodeId
}: {
  input: TaskParam;
  nodeId: string;
}) {
  return (
    <div className="flex justify-start relative p-3 bg-zinc-100 dark:bg-zinc-800 w-full">
      {/* {input.name} */}
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
      <NodeParamField nodeId={nodeId} param={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            '!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4',
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
