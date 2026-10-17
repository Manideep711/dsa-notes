import React from "react";
import { tokens } from "../tokens";

export const GRAPHS_DS = {
  id: "graphs",
  label: "Graphs",
  abbr: "G",
  description: "BFS, DFS, Dijkstra, Topological Sort and more.",
  tabs: [
    {
      id: "traversal",
      label: "Graph Traversal",
      colorVar: tokens.accent3,
      sections: [
        {
          id: "g1",
          labelText: "Coming Soon",
          labelColor: tokens.accent3,
          title: "Graph Traversal",
          navLabel: "Traversal",
          render: () => (
            <div className="callout proof">
              <div className="callout-label">Placeholder</div>
              Add graph traversal notes here when your next transcript is ready.
            </div>
          ),
        },
      ],
    },
  ],
};

