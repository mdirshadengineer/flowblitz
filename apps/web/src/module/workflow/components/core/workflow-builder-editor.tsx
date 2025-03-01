'use client';

import type { HTMLAttributes } from 'react';
import type {
  ColorMode,
  Connection,
  EdgeTypes,
  NodeTypes
} from '@xyflow/react';

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Panel,
  Edge,
  OnConnect,
  addEdge,
  useReactFlow,
  Position
} from '@xyflow/react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from 'components/ui/select';
import { DevTools } from 'components/devtools';
import { ZoomSlider } from 'components/zoom-slider';
import { useTheme } from 'next-themes';

import { TaskType } from 'src/module/workflow/types/task-type';

import { CreateFlowNode } from 'src/module/workflow/create-flow-node';
import { NodeComponent } from 'src/module/workflow/components/core/node/node-component';
import { AppNode } from '../../types/app-node';
import { EdgeDeletable } from './edge/edge-deletable';

interface WorkflowBuilderEditorProps extends HTMLAttributes<HTMLDivElement> {}

const nodeTypes: NodeTypes = {
  FlowBlitz: NodeComponent
};

const edgeTypes: EdgeTypes = {
  default: EdgeDeletable
};

// Updated zoom constraints
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.0;

export default function WorkflowBuilderEditor(
  props: WorkflowBuilderEditorProps
) {
  const { theme, setTheme } = useTheme();
  const [colorMode, setColorMode] = useState<ColorMode>(theme as ColorMode);
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([
    CreateFlowNode(TaskType.LAUNCH_BROWSER)
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition, getViewport, setViewport } = useReactFlow();

  const onConnect: OnConnect = useCallback((connection: Connection) => {
    setEdges(eds => addEdge({ ...connection, animated: true }, eds));
  }, []);

  const onColorChange = (value: string) => {
    setColorMode(value as ColorMode);
    setTheme(value);
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData('application/reactflow');
    if (typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });

    const newNode = CreateFlowNode(taskType as TaskType, position);

    setNodes(nds => nds.concat(newNode));
  }, []);

  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      event.preventDefault();

      const viewport = getViewport();
      const panSpeed = 1;

      setViewport({
        x: viewport.x - event.deltaX * panSpeed,
        y: viewport.y - event.deltaY * panSpeed,
        zoom: viewport.zoom
      });
    },
    [getViewport, setViewport]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      zoomOnScroll={false}
      colorMode={colorMode}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      snapGrid={[25, 25]}
      onDrop={onDrop}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onWheel={handleWheel}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      fitViewOptions={{ padding: 1 }}
      proOptions={{
        hideAttribution: true
      }}
      fitView
      snapToGrid
    >
      {/* <MiniMap /> */}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      {/* <Controls position="bottom-left" /> */}
      <ZoomSlider position="bottom-left" />
      {/* {process.env.NODE_ENV !== 'production' && <DevTools />} */}
      <Panel title="Properties" position="top-right">
        <Select onValueChange={onColorChange} defaultValue={colorMode}>
          <SelectTrigger className="w-[180px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
            <SelectValue placeholder="Toggle theme" />
          </SelectTrigger>
          <SelectContent
            className="!bg-zinc-200 dark:!bg-zinc-800 border-none text-zinc-900 dark:text-zinc-100"
            position="popper"
            sideOffset={5}
          >
            <SelectGroup>
              <SelectLabel>Theme</SelectLabel>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Panel>
    </ReactFlow>
  );
}
