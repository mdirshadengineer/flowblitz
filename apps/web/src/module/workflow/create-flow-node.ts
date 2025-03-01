import type { AppNode } from 'src/module/workflow/types/app-node';
import type { TaskType } from 'src/module/workflow/types/task-type';
import type { XYPosition } from '@xyflow/react';

export function CreateFlowNode(
  nodeType: TaskType,
  position?: XYPosition
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: 'FlowBlitz',
    dragHandle: '.drag-handle',
    data: {
      type: nodeType,
      inputs: {}
    },
    position: position ?? { x: 0, y: 0 }
  };
}
