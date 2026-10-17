import React from "react";
import { tokens } from "../../../../tokens";

export const treeDfsTab = {
  id: "treeDfs",
  label: "DFS Traversal",
  colorVar: tokens.accent2,
  sections: [
    {
      id: "dfs1",
      labelText: "Section 01",
      labelColor: tokens.accent2,
      title: "Depth-First Search (DFS) in Trees",
      navLabel: "What is DFS?",
      render: () => (
        <>
          <p className="ds-p">
            <strong className="ds-strong">Depth-First Search</strong> goes as deep as possible down one path before backtracking. In binary trees, there are three main types of DFS, depending on when you process the <strong className="ds-strong">Root</strong> relative to its Left and Right children.
          </p>
          
          <div className="flex flex-col items-center my-8">
            <svg viewBox="0 0 400 200" className="w-full max-w-lg" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
              {/* Edges */}
              <line x1="200" y1="30" x2="100" y2="100" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="200" y1="30" x2="300" y2="100" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="100" y1="100" x2="50" y2="170" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="100" y1="100" x2="150" y2="170" stroke={tokens.accent2} strokeWidth="2" />
              
              {/* Nodes */}
              <circle cx="200" cy="30" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="200" y="35" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">1</text>
              <text x="230" y="35" fill="gray" fontSize="12">Root</text>
              
              <circle cx="100" cy="100" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="100" y="105" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">2</text>
              <text x="50" y="105" fill="gray" fontSize="12">Left</text>
              
              <circle cx="300" cy="100" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="300" y="105" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">3</text>
              <text x="330" y="105" fill="gray" fontSize="12">Right</text>
              
              <circle cx="50" cy="170" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="50" y="175" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">4</text>
              
              <circle cx="150" cy="170" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="150" y="175" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">5</text>
            </svg>
          </div>

          <div className="callout info">
            <div className="callout-label">The Three DFS Types</div>
            The names strictly refer to <strong className="ds-strong">when the Root is processed</strong>.
            <ul className="ds-list">
              <li><strong className="ds-strong">Preorder (Root, Left, Right):</strong> Root is processed <em className="ds-em">PRE</em>-vious to children. <code>[1, 2, 4, 5, 3]</code></li>
              <li><strong className="ds-strong">Inorder (Left, Root, Right):</strong> Root is processed <em className="ds-em">IN</em> between children. <code>[4, 2, 5, 1, 3]</code></li>
              <li><strong className="ds-strong">Postorder (Left, Right, Root):</strong> Root is processed <em className="ds-em">POST</em> (after) children. <code>[4, 5, 2, 3, 1]</code></li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "dfs2",
      labelText: "Section 02",
      labelColor: tokens.accent2,
      title: "Preorder Traversal",
      navLabel: "Preorder",
      render: () => (
        <>
          <p className="ds-p">
            In Preorder, the root is processed <em className="ds-em">before</em> the subtrees. This is useful for creating a copy of the tree or serializing it.
          </p>
          <h3 className="ds-h3 mt-4 mb-2 text-sm">Recursive Dry Run</h3>
          <div className="overflow-x-auto my-4">
            <table className="ds-tbl w-full text-left text-sm">
              <thead>
                <tr>
                  <th>Current Node</th>
                  <th>Action</th>
                  <th>Output Array</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Process 1, call left(2)</td><td><code className="ds-code">[1]</code></td></tr>
                <tr><td>2</td><td>Process 2, call left(4)</td><td><code className="ds-code">[1, 2]</code></td></tr>
                <tr><td>4</td><td>Process 4, call left/right(null) &rarr; return</td><td><code className="ds-code">[1, 2, 4]</code></td></tr>
                <tr><td>2</td><td>return from left, call right(5)</td><td><code className="ds-code">[1, 2, 4]</code></td></tr>
                <tr><td>5</td><td>Process 5, call left/right(null) &rarr; return</td><td><code className="ds-code">[1, 2, 4, 5]</code></td></tr>
                <tr><td>2</td><td>return from right &rarr; return to 1</td><td><code className="ds-code">[1, 2, 4, 5]</code></td></tr>
                <tr><td>1</td><td>return from left, call right(3)</td><td><code className="ds-code">[1, 2, 4, 5]</code></td></tr>
                <tr><td>3</td><td>Process 3, call left/right(null) &rarr; return</td><td><code className="ds-code">[1, 2, 4, 5, 3]</code></td></tr>
                <tr><td>1</td><td>return from right &rarr; done</td><td><code className="ds-code">[1, 2, 4, 5, 3]</code></td></tr>
              </tbody>
            </table>
          </div>
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public static void</span> <span class="fn">preorderTraversal</span>(<span class="type">Node</span> root, <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span>;
    
    res.<span class="fn">add</span>(root.data); <span class="cm">// 1. Process Root</span>
    <span class="fn">preorderTraversal</span>(root.left, res); <span class="cm">// 2. Process Left</span>
    <span class="fn">preorderTraversal</span>(root.right, res); <span class="cm">// 3. Process Right</span>
}`}} /></pre>
        </>
      ),
    },
    {
      id: "dfs3",
      labelText: "Section 03",
      labelColor: tokens.accent2,
      title: "Inorder Traversal",
      navLabel: "Inorder",
      render: () => (
        <>
          <p className="ds-p">
            In Inorder, the root is processed <em className="ds-em">in between</em> the subtrees. A very important property of Inorder traversal is that <strong className="ds-strong">on a Binary Search Tree (BST), Inorder traversal yields elements in sorted (ascending) order.</strong>
          </p>
          <h3 className="ds-h3 mt-4 mb-2 text-sm">Recursive Dry Run</h3>
          <div className="overflow-x-auto my-4">
            <table className="ds-tbl w-full text-left text-sm">
              <thead>
                <tr>
                  <th>Current Node</th>
                  <th>Action</th>
                  <th>Output Array</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Call left(2)</td><td><code className="ds-code">[]</code></td></tr>
                <tr><td>2</td><td>Call left(4)</td><td><code className="ds-code">[]</code></td></tr>
                <tr><td>4</td><td>Call left(null), Process 4, call right(null) &rarr; return</td><td><code className="ds-code">[4]</code></td></tr>
                <tr><td>2</td><td>Process 2, call right(5)</td><td><code className="ds-code">[4, 2]</code></td></tr>
                <tr><td>5</td><td>Call left(null), Process 5, call right(null) &rarr; return</td><td><code className="ds-code">[4, 2, 5]</code></td></tr>
                <tr><td>2</td><td>Return to 1</td><td><code className="ds-code">[4, 2, 5]</code></td></tr>
                <tr><td>1</td><td>Process 1, call right(3)</td><td><code className="ds-code">[4, 2, 5, 1]</code></td></tr>
                <tr><td>3</td><td>Call left(null), Process 3, call right(null) &rarr; return</td><td><code className="ds-code">[4, 2, 5, 1, 3]</code></td></tr>
                <tr><td>1</td><td>Return &rarr; done</td><td><code className="ds-code">[4, 2, 5, 1, 3]</code></td></tr>
              </tbody>
            </table>
          </div>
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public void</span> <span class="fn">inorderTraversal</span>(<span class="type">Node</span> root, <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span>;
    
    <span class="fn">inorderTraversal</span>(root.left, res); <span class="cm">// 1. Process Left</span>
    res.<span class="fn">add</span>(root.data); <span class="cm">// 2. Process Root</span>
    <span class="fn">inorderTraversal</span>(root.right, res); <span class="cm">// 3. Process Right</span>
}`}} /></pre>
        </>
      ),
    },
    {
      id: "dfs4",
      labelText: "Section 04",
      labelColor: tokens.accent2,
      title: "Postorder Traversal",
      navLabel: "Postorder",
      render: () => (
        <>
          <p className="ds-p">
            In Postorder, the root is processed <em className="ds-em">after</em> the subtrees. This is useful when you need to delete a tree (you must delete children before the parent) or when calculating the height of a tree (you need the height of children first).
          </p>
          <h3 className="ds-h3 mt-4 mb-2 text-sm">Recursive Dry Run</h3>
          <div className="overflow-x-auto my-4">
            <table className="ds-tbl w-full text-left text-sm">
              <thead>
                <tr>
                  <th>Current Node</th>
                  <th>Action</th>
                  <th>Output Array</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Call left(2)</td><td><code className="ds-code">[]</code></td></tr>
                <tr><td>2</td><td>Call left(4)</td><td><code className="ds-code">[]</code></td></tr>
                <tr><td>4</td><td>Call left(null), call right(null), Process 4 &rarr; return</td><td><code className="ds-code">[4]</code></td></tr>
                <tr><td>2</td><td>Call right(5)</td><td><code className="ds-code">[4]</code></td></tr>
                <tr><td>5</td><td>Call left(null), call right(null), Process 5 &rarr; return</td><td><code className="ds-code">[4, 5]</code></td></tr>
                <tr><td>2</td><td>Process 2 &rarr; return</td><td><code className="ds-code">[4, 5, 2]</code></td></tr>
                <tr><td>1</td><td>Call right(3)</td><td><code className="ds-code">[4, 5, 2]</code></td></tr>
                <tr><td>3</td><td>Call left(null), call right(null), Process 3 &rarr; return</td><td><code className="ds-code">[4, 5, 2, 3]</code></td></tr>
                <tr><td>1</td><td>Process 1 &rarr; return</td><td><code className="ds-code">[4, 5, 2, 3, 1]</code></td></tr>
              </tbody>
            </table>
          </div>
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public void</span> <span class="fn">postorderTraversal</span>(<span class="type">Node</span> root, <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span>;
    
    <span class="fn">postorderTraversal</span>(root.left, res); <span class="cm">// 1. Process Left</span>
    <span class="fn">postorderTraversal</span>(root.right, res); <span class="cm">// 2. Process Right</span>
    res.<span class="fn">add</span>(root.data); <span class="cm">// 3. Process Root</span>
}`}} /></pre>
          <div className="callout proof">
            <div className="callout-label">Time & Space Complexity</div>
            <strong className="ds-strong">Time: O(N)</strong> - We visit every node exactly once, doing O(1) work per node.<br/>
            <strong className="ds-strong">Space: O(H)</strong> - The implicit recursion call stack size is proportional to the <strong className="ds-strong">height (H)</strong> of the tree. In the worst-case (a skewed tree), this degrades to <strong className="ds-strong">O(N)</strong>. In a perfectly balanced tree, it is <strong className="ds-strong">O(log N)</strong>.
          </div>
        </>
      ),
    },
  ],
};
