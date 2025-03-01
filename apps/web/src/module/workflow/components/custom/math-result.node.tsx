import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import React, { memo } from 'react';

type ResultNodeProps = Node<{
  id: string;
  type: 'resultNode';
  data: { result: number };
}>;

export default memo(({ data }: NodeProps<ResultNodeProps>) => {
  return (
    <div className="">
      <span>{data?.data?.result}</span>
      <Handle type="target" position={Position.Left} id="output" />
    </div>
  );
});
