'use client';

import type { EdgeProps } from '@xyflow/react';

import { Fragment } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow
} from '@xyflow/react';
import { XIcon } from 'lucide-react';
import { Button } from 'components/ui/button';

export function EdgeDeletable(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  return (
    <Fragment>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
        // className="!stroke-red-600" // TODO: Have to customise the edge paths
      />
      <EdgeLabelRenderer>
        <div
          className="flex flex-col items-center"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all'
          }}
        >
          <Button
            variant={'outline'}
            size={'icon'}
            className="w-6 h-6 border active:bg-red-600 flex flex-col items-center group cursor-pointer hover:bg-red-600 rounded-full text-xs leading-none hover:shadow-lg"
            onDoubleClick={() => {
              setEdges(edges => edges.filter(edge => edge.id !== props.id));
            }}
          >
            <XIcon width={15} height={15} className="group-hover:text-white" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </Fragment>
  );
}
