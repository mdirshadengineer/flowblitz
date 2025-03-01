'use client';

import type { ReactNode } from 'react';

import { useReactFlow } from '@xyflow/react';

import { cn } from 'components/lib/utils';
import { Card, CardContent } from 'components/ui/card';

function NodeCard({
  children,
  nodeId,
  isSelected
}: {
  nodeId: string;
  children: ReactNode;
  isSelected: boolean;
}) {
  const { getNode, setCenter } = useReactFlow();
  return (
    <Card
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;

        const x = position.x + width! / 2;
        const y = position.y + height! / 2;

        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500
        });
      }}
      className={cn(
        'rounded-md ring-1 border-none cursor-pointer ring-zinc-200 dark:ring-zinc-700 bg-background w-[210px] xl:w-[320px] 2xl:w-[420px] text-xs gap-1 flex flex-col',
        isSelected && 'ring-zinc-300 dark:ring-zinc-600 shadow-xl'
      )}
    >
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

export { NodeCard };
