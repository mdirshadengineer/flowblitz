import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import React, { memo } from 'react';

type OperatorNodeProps = Node<{
  id: string;
  type: 'operatorNode';
  data: { operator: string };
}>;

export default memo(({ data }: NodeProps<OperatorNodeProps>) => {
  console.log(data);
  return (
    <div className="w-[120px] h-full">
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="target" id="b" position={Position.Left} />
      <span className="text-foreground">{data.data?.operator}</span>
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
});

// import React, { useMemo } from 'react';
// import {
//   Handle,
//   Position,
//   useNodeConnections,
//   useNodesData,
//   NodeProps,
//   // Either import useEdges if available...
//   useEdges,
//   // ...or if not, you can use the store hook:
//   // useStore
// } from '@xyflow/react';

// interface NodeData {
//   operator?: string;
//   value?: number;
// }

// const mathFunctions: Record<string, (a: number, b: number) => number> = {
//   '+': (a, b) => a + b,
//   '-': (a, b) => a - b,
//   '*': (a, b) => a * b,
//   '/': (a, b) => a / b,
// };

// const CustomMathNode: React.FC<NodeProps> = ({ id }) => {
//   // Get connections for the current (result) node.
//   // These are connections where this node is the target.
//   const sourceConnections = useNodeConnections({ handleType: 'target' });

//   // Get the operator node id from the first connection's source.
//   const operatorNodeId = sourceConnections[0]?.source;

//   // Get all edges (connections) in the graph.
//   // If your library doesn’t export useEdges, you could alternatively use a store hook.
//   const allEdges = useEdges();
//   // For example, if useEdges is unavailable:
//   // const allEdges = useStore((state) => state.edges);

//   // Now filter the edges that target the operator node.
//   // This gives us the connections for the operator node (i.e. its inbound connections).
//   const operatorSourceConnections = useMemo(() => {
//     if (!operatorNodeId) return [];
//     return allEdges.filter((edge) => edge.target === operatorNodeId);
//   }, [allEdges, operatorNodeId]);

//   // Get data for the operator node (from the result node’s connections).
//   const operatorData = useNodesData(
//     sourceConnections.map((connection) => connection.source)
//   );

//   // Get data for the value nodes from the operator node's inbound connections.
//   const valueData = useNodesData(
//     operatorSourceConnections.map((connection) => connection.source)
//   );

//   // Compute the result.
//   const result = useMemo(() => {
//     if (!operatorData.length || valueData.length < 2) return 0;

//     const operator = operatorData[0].data?.operator;
//     if (!operator) return 0;

//     // Get the two numeric values from the value nodes.
//     const [a, b] = valueData.map((node) => node.data?.value);
//     if (a === undefined || b === undefined) return 0;

//     // Compute the result and round to 2 decimal places.
//     const computed = mathFunctions[operator](a, b);
//     return Math.round(computed * 100) / 100;
//   }, [operatorData, valueData]);

//   return (
//     <div className="calculation">
//       {valueData.map((node, i) => (
//         <React.Fragment key={`${node.id}-${node.data?.value}`}>
//           <span>{node.data??.value}</span>
//           {i !== valueData.length - 1 && (
//             <span>{operatorData[0]?.data?.operator}</span>
//           )}
//         </React.Fragment>
//       ))}
//       <span> = </span>
//       <span
//         className="result"
//         style={{ color: result > 0 ? '#5EC697' : '#f15a16' }}
//       >
//         {result}
//       </span>
//       <Handle
//         type="target"
//         position={Position.Left}
//         isConnectable={false}
//         style={{ background: result > 0 ? '#5EC697' : '#f15a16' }}
//       />
//     </div>
//   );
// };

// export default CustomMathNode;
