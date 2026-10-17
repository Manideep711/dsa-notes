import { heapConceptsTab } from "./concept/concepts";
import { pqTab } from "./concept/pq";
import { cmpTab } from "./concept/cmp";
import { iqTab } from "./questions/iq";

export const HEAPS_DS = {
  id: "heaps",
  label: "Heaps",
  abbr: "H",
  description: "Heap internals, Priority Queue abstraction, and Object Comparison in Java.",
  tabs: [
    heapConceptsTab,
    pqTab,
    cmpTab,
    iqTab
  ]
};
