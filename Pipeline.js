import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  { id: "1", type: "input", data: { label: "📤 Input" }, position: { x: 100, y: 50 } },
  { id: "2", data: { label: "🧠 OCR Processing" }, position: { x: 300, y: 150 } },
  { id: "3", type: "output", data: { label: "📄 Output" }, position: { x: 500, y: 250 } }
];

const edges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true }
];

const Pipeline = () => (
  <div style={{ height: 300, border: "1px solid #ccc", marginBottom: 30 }}>
    <ReactFlow nodes={nodes} edges={edges} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  </div>
);

export default Pipeline;
