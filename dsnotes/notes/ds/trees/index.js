import { treeConceptsTab } from "./concept/concepts";
import { treeBfsTab } from "./concept/bfs";
import { treeDfsTab } from "./concept/dfs";
import { treeDfsIterativeTab } from "./concept/dfs_iterative";
import { treeUniqueTab } from "./concept/unique_trees";
import { treeIqTab } from "./questions/iq";

export const TREES_DS = {
  id: "trees",
  label: "Trees",
  abbr: "T",
  description: "Tree fundamentals, BFS and DFS traversals, Binary Search Trees.",
  tabs: [
    treeConceptsTab,
    treeBfsTab,
    treeDfsTab,
    treeDfsIterativeTab,
    treeUniqueTab,
    treeIqTab
  ]
};
