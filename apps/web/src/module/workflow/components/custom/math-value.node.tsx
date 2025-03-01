import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import React, { memo } from 'react';

import { Input } from 'components/ui/input';

type ValueNodeProps = Node<{
  id: string;
  type: 'valueNode';
  data: { value: number };
}>;

export default memo(({ data }: NodeProps<ValueNodeProps>) => {
  console.log(data);
  return (
    <div>
      <Input type="number" placeholder="Value" />
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
});
