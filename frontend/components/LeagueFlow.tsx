'use client';

import React, { useMemo } from 'react';
import {
  ReactFlow,
  Panel,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
  Handle,
  Position,
  ConnectionMode,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const ZoomControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Panel position="top-left" className="flex flex-col gap-2">
      <div className="flex bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <button 
          onClick={() => zoomIn()}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors border-r border-white/5 font-bold text-lg"
          title="Zoom In"
        >
          +
        </button>
        <button 
          onClick={() => zoomOut()}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors border-r border-white/5 font-bold text-lg"
          title="Zoom Out"
        >
          −
        </button>
        <button 
          onClick={() => fitView()}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors font-bold text-[10px] uppercase tracking-tighter"
          title="Reset View"
        >
          Fit
        </button>
      </div>
    </Panel>
  );
};

const LeagueMatchNode = ({ data }: { data: any }) => {
  return (
    <div className="px-4 py-3 shadow-2xl rounded-xl bg-slate-800 border-2 border-slate-700 min-w-[220px] border-l-4 border-l-blue-500">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center pb-2 border-b border-slate-700/50">
          <span className="text-[10px] font-bold text-blue-400 tracking-widest uppercase">
            MATCH {data.idx + 1}
          </span>
          <span className="text-[10px] text-slate-500 font-medium truncate max-w-[100px]">
            {data.venue}
          </span>
        </div>
        
        <div className="py-2 flex flex-col items-center gap-1">
          <div className="text-sm font-bold text-white tracking-tight">
            {data.team1}
          </div>
          <div className="text-[9px] font-black text-slate-600">VS</div>
          <div className="text-sm font-bold text-white tracking-tight">
            {data.team2}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-700/50 flex flex-col gap-1">
          <div className="text-[9px] text-slate-400 flex items-center gap-1.5 font-medium">
             <span className="opacity-50">📅</span> {data.time_slot}
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Left} className="!hidden" />
      <Handle type="source" position={Position.Right} className="!hidden" />
    </div>
  );
};

const DayHeaderNode = ({ data }: { data: any }) => {
  return (
    <div className="px-6 py-2 bg-blue-600 rounded-full border border-blue-400/50 shadow-lg shadow-blue-500/20">
      <div className="text-xs font-black text-white uppercase tracking-[0.2em]">
        {data.label}
      </div>
    </div>
  );
};

const nodeTypes = {
  match: LeagueMatchNode,
  header: DayHeaderNode,
};

type Props = {
  matches: any[];
};

export default function LeagueFlow({ matches }: Props) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    if (!matches || matches.length === 0) return { nodes, edges };

    // Group matches by day/date
    const dayGroups: { [key: string]: any[] } = {};
    matches.forEach((m, idx) => {
      const datePart = m.time_slot.split(' - ')[0] || 'Day 1';
      if (!dayGroups[datePart]) dayGroups[datePart] = [];
      dayGroups[datePart].push({ ...m, idx });
    });

    const dates = Object.keys(dayGroups).sort();
    const HORIZONTAL_SPACING = 300;
    const VERTICAL_SPACING = 160;

    dates.forEach((date, dateIdx) => {
      // Add Header Node
      nodes.push({
        id: `header-${dateIdx}`,
        type: 'header',
        position: { x: dateIdx * HORIZONTAL_SPACING + 20, y: -60 },
        data: { label: date },
        draggable: false,
      });

      // Add Match Nodes
      dayGroups[date].forEach((match, matchIdx) => {
        const nodeId = `m-${match.idx}`;
        const team1 = match.match?.split(' vs ')[0] || match.team1;
        const team2 = match.match?.split(' vs ')[1] || match.team2;

        nodes.push({
          id: nodeId,
          type: 'match',
          position: { 
            x: dateIdx * HORIZONTAL_SPACING, 
            y: matchIdx * VERTICAL_SPACING 
          },
          data: { ...match, team1, team2 },
        });

        // Simple timeline edges (optional)
        if (dateIdx > 0) {
          // You could connect matches of same teams, but for a simple schedule, 
          // we'll leave edges empty or connect sequentially
        }
      });
    });

    return { nodes, edges };
  }, [matches]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[70vh] w-full bg-slate-900 shadow-inner relative overflow-hidden rounded-2xl border border-white/5">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          className="bg-transparent"
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          zoomOnScroll={true}
          panOnScroll={true}
          preventScrolling={false}
          minZoom={0.1}
          maxZoom={1}
        >
          <ZoomControls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
