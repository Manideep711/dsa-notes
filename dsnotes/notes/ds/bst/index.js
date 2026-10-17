import { bstConceptsTab } from "./concept/concepts";
import { bstDeleteTab } from "./concept/delete";
import { bstValidateTab } from "./concept/validate";
import { bstTwoSumTab } from "./concept/twosum";
import { bstKthSmallestTab } from "./concept/kth_smallest";
import { bstLcaTab } from "./concept/lca";
import { bstIteratorTab } from "./concept/bst_iterator";
export const BST_DS = {
  id: "bst",
  label: "BST",
  abbr: "B",
  description: "Binary Search Tree fundamentals — construction, insertion, and search.",
  tabs: [
    bstConceptsTab,
    bstDeleteTab,
    bstValidateTab,
    bstTwoSumTab,
    bstKthSmallestTab,
    bstLcaTab,
   bstIteratorTab
  ]
};