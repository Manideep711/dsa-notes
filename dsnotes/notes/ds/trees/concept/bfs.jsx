import React from "react";
import { tokens } from "../../../../tokens";

export const treeBfsTab = {
  id: "treeBfs",
  label: "BFS Traversal",
  colorVar: tokens.accent2,
  sections: [
    {
      id: "bfs1",
      labelText: "Section 01",
      labelColor: tokens.accent2,
      title: "What is Breadth-First Search (BFS)?",
      navLabel: "What is BFS?",
      render: () => (
        <>
          <p className="ds-p"><strong className="ds-strong">Breadth-First Search</strong> (also called <strong className="ds-strong">Level Order Traversal</strong> in trees) is an algorithm that processes all directly connected nodes (distance 1) before moving deeper to nodes at distance 2, and so on.</p>
          <div className="callout info">
            <div className="callout-label">The Intuition</div>
            Think of it like reading a book: left-to-right, line-by-line. You process the root (Level 0), then all its children (Level 1), then all its grandchildren (Level 2).
          </div>
          <p className="ds-p">Because we need to process things in a First-Come, First-Serve (FCFS) order, the underlying data structure powering BFS is always a <strong className="ds-strong">Queue</strong>.</p>
        </>
      ),
    },
    {
      id: "bfs2",
      labelText: "Section 02",
      labelColor: tokens.accent2,
      title: "BFS on Binary Trees",
      navLabel: "Binary Tree BFS",
      render: () => (
        <>
          <p className="ds-p">The algorithm uses a Queue. Push the root, then while the queue isn't empty: pop a node, process it, and push its non-null left and right children.</p>
          
          <div className="flex flex-col items-center my-6">
            <svg viewBox="0 0 320 200" className="w-full max-w-lg" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
              {/* Edges */}
              <line x1="160" y1="30" x2="90" y2="90" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="160" y1="30" x2="230" y2="90" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="90" y1="90" x2="50" y2="150" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="90" y1="90" x2="130" y2="150" stroke={tokens.accent2} strokeWidth="2" />
              
              {/* Nodes */}
              <circle cx="160" cy="30" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="160" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>
              
              <circle cx="90" cy="90" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="90" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">2</text>
              
              <circle cx="230" cy="90" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="230" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>
              
              <circle cx="50" cy="150" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="50" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">4</text>
              
              <circle cx="130" cy="150" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="130" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

              {/* Order Indicator */}
              <rect x="230" y="140" width="85" height="45" rx="5" fill="#2a2a2a" stroke="white" strokeWidth="1"/>
              <text x="272" y="158" textAnchor="middle" fill="white" fontSize="12">Level Order:</text>
              <text x="272" y="176" textAnchor="middle" fill={tokens.accent2} fontSize="14" fontWeight="bold">1, 2, 3, 4, 5</text>
            </svg>
          </div>

          <h3 className="ds-h3 mt-6 mb-2">Step-by-step Dry Run</h3>
          <div className="overflow-x-auto my-4">
            <table className="ds-tbl w-full text-left">
              <thead>
                <tr>
                  <th>Current Node</th>
                  <th>Action</th>
                  <th>Queue State (Front &rarr; Back)</th>
                  <th>Output Array</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>-</td>
                  <td>Offer Root (1)</td>
                  <td><code className="ds-code">[1]</code></td>
                  <td><code className="ds-code">[]</code></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Poll 1, Offer Left(2), Offer Right(3)</td>
                  <td><code className="ds-code">[2, 3]</code></td>
                  <td><code className="ds-code">[1]</code></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Poll 2, Offer Left(4), Offer Right(5)</td>
                  <td><code className="ds-code">[3, 4, 5]</code></td>
                  <td><code className="ds-code">[1, 2]</code></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Poll 3, No children</td>
                  <td><code className="ds-code">[4, 5]</code></td>
                  <td><code className="ds-code">[1, 2, 3]</code></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Poll 4, No children</td>
                  <td><code className="ds-code">[5]</code></td>
                  <td><code className="ds-code">[1, 2, 3, 4]</code></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Poll 5, No children</td>
                  <td><code className="ds-code">[]</code></td>
                  <td><code className="ds-code">[1, 2, 3, 4, 5]</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public static</span> <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">BFS</span>(<span class="type">TreeNode</span>&lt;<span class="type">Integer</span>&gt; root) {
    <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

    <span class="type">Queue</span>&lt;<span class="type">TreeNode</span>&lt;<span class="type">Integer</span>&gt;&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
    queue.<span class="fn">offer</span>(root);
    
    <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
        <span class="type">TreeNode</span>&lt;<span class="type">Integer</span>&gt; node = queue.<span class="fn">poll</span>();
        res.<span class="fn">add</span>(node.data);
        
        <span class="kw">if</span> (node.left != <span class="kw">null</span>) {
            queue.<span class="fn">offer</span>(node.left);
        }
        <span class="kw">if</span> (node.right != <span class="kw">null</span>) {
            queue.<span class="fn">offer</span>(node.right);
        }
    }
    <span class="kw">return</span> res;
}`}} /></pre>
          <div className="callout proof">
            <div className="callout-label">Time & Space Complexity</div>
            <strong className="ds-strong">Time: O(N)</strong> - We visit every node exactly once.<br/>
            <strong className="ds-strong">Space: O(W)</strong> - The queue at its maximum holds the widest level of the tree. In the worst case (a perfectly balanced tree), the bottom level has N/2 nodes, making it O(N) space.
          </div>
        </>
      ),
    },
    {
      id: "bfs3",
      labelText: "Section 03",
      labelColor: tokens.accent2,
      title: "BFS on N-ary Trees",
      navLabel: "N-ary BFS",
      render: () => (
        <>
          <p className="ds-p">For an N-ary tree, the core logic is identical, but instead of checking <code className="ds-code">left</code> and <code className="ds-code">right</code>, we loop through the <code className="ds-code">children</code> list.</p>
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
    <span class="type">Node</span> node = queue.<span class="fn">poll</span>();
    res.<span class="fn">add</span>(node.data);
    
    <span class="cm">// Instead of node.left/right, iterate over children</span>
    <span class="kw">for</span> (<span class="type">Node</span> child : node.children) {
        <span class="kw">if</span> (child != <span class="kw">null</span>) {
            queue.<span class="fn">offer</span>(child);
        }
    }
}`}} /></pre>
          <div className="callout warn">
            <div className="callout-label">Handling Bad Code Implementations</div>
            Ideally, an N-ary tree's <code className="ds-code">children</code> list should only contain valid nodes. However, poor implementations might push <code className="ds-code">null</code> elements into the list. Always use the <code className="ds-code">if (child != null)</code> safeguard before offering it to the queue to prevent NullPointerExceptions down the line.
          </div>
        </>
      ),
    },
    {
      id: "bfs4",
      labelText: "Section 04",
      labelColor: tokens.accent2,
      title: "Level Order returning List of Lists",
      navLabel: "List of Lists (Level Wise)",
      render: () => (
        <>
          <p className="ds-p">Many LeetCode problems ask you to return the output grouped by levels: <code className="ds-code">[[20], [5, 7], [9, 8, 10]]</code> instead of a flat list. To do this, we capture the <strong className="ds-strong">size of the queue</strong> at the start of each level.</p>
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">List</span>&lt;<span class="type">Integer</span>&gt;&gt; <span class="fn">levelOrder</span>(<span class="type">Node</span> root) {
    <span class="type">List</span>&lt;<span class="type">List</span>&lt;<span class="type">Integer</span>&gt;&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

    <span class="type">Queue</span>&lt;<span class="type">Node</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
    queue.<span class="fn">offer</span>(root);

    <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
        <span class="cm">// Capture the size BEFORE processing the level</span>
        <span class="kw">int</span> size = queue.<span class="fn">size</span>();
        <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; levelList = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();

        <span class="cm">// Process exactly 'size' elements</span>
        <span class="kw">while</span> (size &gt; <span class="num">0</span>) {
            <span class="type">Node</span> node = queue.<span class="fn">poll</span>();
            levelList.<span class="fn">add</span>(node.data);

            <span class="kw">for</span> (<span class="type">Node</span> child : node.children) {
                <span class="kw">if</span> (child != <span class="kw">null</span>) queue.<span class="fn">offer</span>(child);
            }
            size--;
        }
        <span class="cm">// Level finished, add to final result</span>
        res.<span class="fn">add</span>(levelList);
    }
    <span class="kw">return</span> res;
}`}} /></pre>
          <div className="callout danger">
            <div className="callout-label">The 'Size' Gotcha</div>
            You <strong className="ds-strong">must</strong> store the queue size in a variable (<code className="ds-code">int size = queue.size();</code>) before starting the inner loop. Do not write <code className="ds-code">for (int i = 0; i &lt; queue.size(); i++)</code> because <code className="ds-code">queue.size()</code> changes dynamically as you push children into it, which will cause an infinite or out-of-bounds loop!
          </div>
        </>
      ),
    },
  ],
};
