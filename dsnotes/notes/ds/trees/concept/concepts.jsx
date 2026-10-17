import React from "react";
import { tokens } from "../../../../tokens";

export const treeConceptsTab = {
  id: "treeConcepts",
  label: "Tree Basics",
  colorVar: tokens.accent,
  sections: [
    {
      id: "tc1",
      labelText: "Section 01",
      labelColor: tokens.accent,
      title: "Linear vs Non-Linear Data Structures",
      navLabel: "Linear vs Non-Linear",
      render: () => (
        <>
          <p className="ds-p">A <strong className="ds-strong">Data Structure</strong> is a way of organizing, storing, and managing data so it can be accessed efficiently.</p>
          <div className="prop-grid">
            <div className="prop-card">
              <h4 className="ds-h4">LINEAR DS</h4>
              <p className="ds-p" style={{color:"#c8d3e0"}}>Elements are stored sequentially in a single level. Traversal is one-by-one. Memory can be contiguous or non-contiguous.</p>
              <div className="formula" style={{fontSize:12}}>Examples: Arrays, Linked Lists, Stacks, Queues</div>
              <p className="ds-p" style={{color:"#64748b", fontSize:13, marginBottom:0}}>Real-life: A queue at a ticket counter.</p>
            </div>
            <div className="prop-card">
              <h4 className="ds-h4" style={{color:tokens.accent}}>NON-LINEAR DS</h4>
              <p className="ds-p" style={{color:"#c8d3e0"}}>Elements are arranged hierarchically in multiple levels. A single element can connect to multiple elements. Traversal requires DFS or BFS.</p>
              <div className="formula" style={{fontSize:12}}>Examples: Trees, Graphs, Heaps, Tries</div>
              <p className="ds-p" style={{color:"#64748b", fontSize:13, marginBottom:0}}>Real-life: Family tree or org chart.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "tc2",
      labelText: "Section 02",
      labelColor: tokens.accent,
      title: "Tree Terminologies",
      navLabel: "Terminologies",
      render: () => (
        <>
          <p className="ds-p">A tree is a collection of nodes connected by edges in a hierarchical fashion. It always has a designated <strong className="ds-strong">Root Node</strong> (unlike a generic Graph).</p>
          <table className="ds-tbl">
            <thead><tr><th>Term</th><th>Definition</th></tr></thead>
            <tbody>
              {[
                ["Node", "An entity that holds data and pointers to its children."],
                ["Edge", "The link/connection between two nodes."],
                ["Root Node", "The topmost node with no parent. The origin of the tree."],
                ["Leaf Node", "A node with no children (no descendants)."],
                ["Internal Node", "Any node with at least one child (Non-leaf node)."],
                ["Ancestor / Descendant", "Path going up to the root / Path going down to the leaves."],
                ["Sibling", "Nodes that share the exact same parent."],
                ["Cousin", "Nodes at the exact same level but with different parents."],
                ["Neighbor", "Nodes directly connected by an edge (parent or child)."],
              ].map(([t, d]) => (
                <tr key={t}>
                  <td><strong className="ds-strong">{t}</strong></td>
                  <td style={{color:"#c8d3e0"}}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout info">
            <div className="callout-label">Tricky Edge Case</div>
            If a tree consists of only <strong className="ds-strong">one node</strong>, that node is both the Root and the Leaf. In this case, the tree has exactly 0 internal nodes!
          </div>
        </>
      ),
    },
    {
      id: "tc3",
      labelText: "Section 03",
      labelColor: tokens.accent,
      title: "Tree Properties: Depth, Height, & Degree",
      navLabel: "Depth, Height, Degree",
      render: () => (
        <>
          <p className="ds-p">These three properties are frequently asked in interviews to test your understanding of tree traversal distances.</p>
          <h3 className="ds-h3 green">1. Depth vs Height</h3>
          <ul className="ds-ul">
            <li><strong className="ds-strong">Depth of a Node:</strong> Number of edges from the node <strong className="ds-strong">up to the Root</strong>. The Root is at depth 0.</li>
            <li><strong className="ds-strong">Height of a Node:</strong> The <strong className="ds-strong">longest path</strong> (number of edges) from the node <strong className="ds-strong">down to a Leaf</strong>.</li>
            <li><strong className="ds-strong">Height of the Tree:</strong> The height of its Root node (longest path from Root to any Leaf).</li>
          </ul>
          <h3 className="ds-h3 green">2. Degree</h3>
          <ul className="ds-ul">
            <li><strong className="ds-strong">Degree of a Node:</strong> The number of direct children the node has.</li>
            <li><strong className="ds-strong">Degree of the Tree:</strong> The maximum degree among all nodes in the tree.</li>
          </ul>
          <div className="callout proof">
            <div className="callout-label">N Nodes = N-1 Edges</div>
            An unspoken golden rule in trees: If a tree has <strong className="ds-strong">N</strong> nodes, it will always have exactly <strong className="ds-strong">N - 1</strong> edges. This is because every node except the root has exactly one incoming edge from its parent.
          </div>
        </>
      ),
    },
    {
      id: "tc4",
      labelText: "Section 04",
      labelColor: tokens.accent,
      title: "Types of Trees & Node Representation",
      navLabel: "Types & Representation",
      render: () => (
        <>
          <p className="ds-p">Trees are categorized by their maximum allowed degree (max number of children per node).</p>
          <div className="prop-grid">
            <div className="prop-card">
              <h4 className="ds-h4">BINARY TREE</h4>
              <p className="ds-p" style={{color:"#c8d3e0"}}>At most <strong className="ds-strong">2 children</strong> per node (degree ≤ 2). It has explicitly defined Left and Right pointers.</p>
              <pre className="ds-pre" style={{marginTop:8}}><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">TreeNode</span>&lt;E&gt; {
    E data;
    <span class="type">TreeNode</span>&lt;E&gt; left;
    <span class="type">TreeNode</span>&lt;E&gt; right;
}`}}/></pre>
            </div>
            <div className="prop-card">
              <h4 className="ds-h4" style={{color:tokens.accent2}}>N-ARY TREE</h4>
              <p className="ds-p" style={{color:"#c8d3e0"}}>At most <strong className="ds-strong">N children</strong> per node. Instead of hardcoded pointers, we use a List or Array.</p>
              <pre className="ds-pre" style={{marginTop:8}}><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">NaryNode</span>&lt;E&gt; {
    E data;
    <span class="type">List</span>&lt;<span class="type">NaryNode</span>&lt;E&gt;&gt; children;
}`}}/></pre>
            </div>
          </div>
          <div className="callout warn">
            <div className="callout-label">Why List instead of an Array for N-ary?</div>
            While you can use a fixed array <code className="ds-code">Node[] children = new Node[N];</code>, using an <code className="ds-code">ArrayList</code> is vastly preferred in dynamic interviews because it automatically manages sizing and avoids null-pointer gaps.
          </div>
        </>
      ),
    },
  ],
};
