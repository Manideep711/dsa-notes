import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ1 = {
  id: "tiq1",
  labelText: "Question 01",
  labelColor: tokens.accent5,
  title: "Maximum Depth of Binary Tree",
  navLabel: "Max Depth Binary",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the <code className="ds-code">root</code> of a binary tree, return its{" "}
        <strong className="ds-strong">maximum depth</strong> — the number of nodes along the
        longest path from the root node down to the farthest leaf node.
      </div>

      <h3 className="ds-h3">Key Insight — Maximum Depth = Height of the Tree</h3>
      <p className="ds-p">
        Before jumping to code, recognize what the problem is really asking.
        The <strong className="ds-strong">maximum depth</strong> is identical to the{" "}
        <strong className="ds-strong">height</strong> of the binary tree — a concept you already know.
        Two equivalent lenses to see it:
      </p>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Path Definition</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Count nodes along the longest root → leaf path. For [3,9,20,null,null,15,7],
            paths <code className="ds-code">3→20→15</code> and <code className="ds-code">3→20→7</code>{" "}
            both have 3 nodes → answer is <strong className="ds-strong">3</strong>.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent}` }}>
          <h4 className="ds-h4">Level Definition</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Last level index (0-based) + 1. Root = Level 0, children = Level 1,
            grandchildren = Level 2. Last level = 2, so depth = <strong className="ds-strong">2 + 1 = 3</strong>.
          </p>
        </div>
      </div>
      <p className="ds-p">
        Both definitions give the same answer and directly suggest our two approaches:{" "}
        <strong className="ds-strong">BFS</strong> (count levels) and{" "}
        <strong className="ds-strong">DFS</strong> (recursively compute height).
      </p>

      <h3 className="ds-h3">Approach 1 — BFS (Level Order Traversal)</h3>
      <p className="ds-p">
        Run a standard BFS. Each complete pass through a level processes all nodes at that
        depth. We track a <code className="ds-code">level</code> counter and increment it every
        time we finish a level and there are still more nodes waiting. When the queue empties,
        return <code className="ds-code">level + 1</code>.
      </p>

      <div className="callout warn">
        <div className="callout-label">Why level + 1 at the end?</div>
        <code className="ds-code">level</code> starts at 0 and only increments{" "}
        <em>between</em> levels (when the queue is non-empty after finishing one). After
        processing all levels it equals <code className="ds-code">totalLevels − 1</code>.
        Adding 1 gives the actual node count along the deepest path.
      </div>

      <ol className="ds-steps">
        <li><div>Base case: <code className="ds-code">root == null</code> → return <code className="ds-code">0</code>.</div></li>
        <li><div>Create a Queue, offer root. Set <code className="ds-code">level = 0</code>.</div></li>
        <li><div>Snapshot <code className="ds-code">size = queue.size()</code> (= nodes at this level).</div></li>
        <li><div>Poll each of those <code className="ds-code">size</code> nodes; offer non-null left and right children.</div></li>
        <li><div>After the inner loop, if the queue is still non-empty → <code className="ds-code">level++</code>.</div></li>
        <li><div>Return <code className="ds-code">level + 1</code>.</div></li>
      </ol>

      <div className="trick-box">
        <div className="trick-title">BFS Dry Run — Tree: [3, 9, 20, null, null, 15, 7]</div>
        <div className="diagram-wrap" style={{ marginTop: 12 }}>
          <svg width="100%" viewBox="0 0 420 170">
            <line x1="200" y1="30" x2="110" y2="88" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="200" y1="30" x2="290" y2="88" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="290" y1="88" x2="248" y2="145" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="290" y1="88" x2="332" y2="145" stroke="#252b3d" strokeWidth="1.5"/>
            <circle cx="200" cy="30" r="20" fill="#1a1f2e" stroke="#f43f5e" strokeWidth="2"/>
            <text x="200" y="35" textAnchor="middle" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono">3</text>
            <text x="36" y="36" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">Level 0</text>
            <circle cx="110" cy="92" r="20" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="110" y="97" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">9</text>
            <circle cx="290" cy="92" r="20" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="290" y="97" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">20</text>
            <text x="36" y="96" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">Level 1</text>
            <circle cx="248" cy="150" r="20" fill="#1a1f2e" stroke="#10b981" strokeWidth="1.5"/>
            <text x="248" y="155" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="JetBrains Mono">15</text>
            <circle cx="332" cy="150" r="20" fill="#1a1f2e" stroke="#10b981" strokeWidth="1.5"/>
            <text x="332" y="155" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="JetBrains Mono">7</text>
            <text x="36" y="154" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">Level 2</text>
          </svg>
          <figcaption>Root at Level 0. Deepest nodes (15, 7) at Level 2. Answer = 2 + 1 = 3.</figcaption>
        </div>
        <table className="ds-tbl" style={{ marginTop: 14 }}>
          <thead>
            <tr><th>Pass</th><th>Queue before</th><th>Size</th><th>Nodes processed</th><th>Children added</th><th>Queue after</th><th>level</th></tr>
          </thead>
          <tbody>
            {[
              ["1","[3]","1","3","9, 20","[9, 20]","0→1"],
              ["2","[9, 20]","2","9, 20","15, 7 (from 20)","[15, 7]","1→2"],
              ["3","[15, 7]","2","15, 7","none","[]","stays 2 (queue empty)"],
            ].map(([pass,qb,sz,proc,ch,qa,lv]) => (
              <tr key={pass}>
                <td style={{color:"#f43f5e"}}>{pass}</td>
                <td><code className="ds-code">{qb}</code></td>
                <td style={{color:tokens.accent}}>{sz}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{proc}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{ch}</td>
                <td><code className="ds-code">{qa}</code></td>
                <td style={{color:tokens.accent3,fontWeight:500}}>{lv}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
          Return <code className="ds-code">level + 1 = 2 + 1 = 3</code> ✓
        </p>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public int</span> <span class="fn">maxDepth</span>(<span class="type">TreeNode</span> root) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>;

    <span class="type">Queue</span>&lt;<span class="type">TreeNode</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
    queue.<span class="fn">offer</span>(root);
    <span class="kw">int</span> level = <span class="num">0</span>;

    <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
        <span class="kw">int</span> size = queue.<span class="fn">size</span>(); <span class="cm">// snapshot: nodes at this level</span>

        <span class="kw">while</span> (size-- &gt; <span class="num">0</span>) {
            <span class="type">TreeNode</span> node = queue.<span class="fn">poll</span>();
            <span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.<span class="fn">offer</span>(node.left);
            <span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.<span class="fn">offer</span>(node.right);
        }

        <span class="kw">if</span> (!queue.<span class="fn">isEmpty</span>()) level++; <span class="cm">// only if there is a next level</span>
    }
    <span class="kw">return</span> (level + <span class="num">1</span>);
}`}}/></pre>

      <h3 className="ds-h3">Approach 2 — DFS (Recursive Post-order)</h3>
      <p className="ds-p">
        The recursive insight: the depth at any node equals{" "}
        <strong className="ds-strong">1 (for itself) + the larger of its two subtree heights</strong>.
        We don't know subtree heights yet, so we resolve children before the parent —
        that ordering is <strong className="ds-strong">Post-order (L → R → Root)</strong>.
      </p>

      <div className="callout proof">
        <div className="callout-label">Recurrence</div>
        <code className="ds-code">height(null) = 0</code><br/>
        <code className="ds-code">height(node) = 1 + max(height(node.left), height(node.right))</code>
      </div>

      <div className="callout info">
        <div className="callout-label">Why Post-order specifically?</div>
        To compute the current node's answer we first need both children's answers.
        Call order: recurse left → recurse right → use results at current node.
        Pre-order visits the root first (before children are resolved) — useless here.
      </div>

      <div className="trick-box">
        <div className="trick-title">DFS Call Stack Trace — Tree: [3, 9, 20, null, null, 15, 7]</div>
        <table className="ds-tbl" style={{marginTop:12}}>
          <thead>
            <tr><th>Call</th><th>Node</th><th>lh</th><th>rh</th><th>Returns</th></tr>
          </thead>
          <tbody>
            {[
              ["maxDepth(null)","null","—","—","0  ← base case"],
              ["maxDepth(9)","9","0 (left=null)","0 (right=null)","1 + max(0,0) = 1"],
              ["maxDepth(null)","null","—","—","0  ← base case"],
              ["maxDepth(null)","null","—","—","0  ← base case"],
              ["maxDepth(15)","15","0","0","1 + max(0,0) = 1"],
              ["maxDepth(null)","null","—","—","0  ← base case"],
              ["maxDepth(null)","null","—","—","0  ← base case"],
              ["maxDepth(7)","7","0","0","1 + max(0,0) = 1"],
              ["maxDepth(20)","20","1 ← from 15","1 ← from 7","1 + max(1,1) = 2"],
              ["maxDepth(3)","3","1 ← from 9","2 ← from 20","1 + max(1,2) = 3 ✓"],
            ].map(([call,node,lh,rh,ret]) => (
              <tr key={call}>
                <td style={{fontSize:11}}><code className="ds-code">{call}</code></td>
                <td style={{color:"#f43f5e"}}>{node}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{lh}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{rh}</td>
                <td style={{color:tokens.accent3,fontWeight:500,fontSize:12}}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public int</span> <span class="fn">maxDepth</span>(<span class="type">TreeNode</span> root) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>; <span class="cm">// null node contributes 0 height</span>

    <span class="kw">int</span> lh = <span class="fn">maxDepth</span>(root.left);  <span class="cm">// resolve left subtree first</span>
    <span class="kw">int</span> rh = <span class="fn">maxDepth</span>(root.right); <span class="cm">// resolve right subtree second</span>

    <span class="kw">return</span> (<span class="num">1</span> + Math.<span class="fn">max</span>(lh, rh)); <span class="cm">// current node + taller child</span>
}`}}/></pre>

      <div className="callout purple">
        <div className="callout-label">Author's Tip — Recursion Unlocks Tree Questions</div>
        BFS needs a Queue, a nested loop, and a size-tracking variable.
        DFS is <strong className="ds-strong">3 meaningful lines</strong>.
        Once you're comfortable with recursion, most tree questions become a short
        post-order call. Master recursion — it pays off on the entire class.
      </div>

      <h3 className="ds-h3 green">Full Comparison</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Aspect</th><th>BFS</th><th>DFS (Recursive)</th></tr>
        </thead>
        <tbody>
          {[
            ["Traversal","Level-order","Post-order (L → R → Root)"],
            ["Core DS","Queue","Call stack (implicit)"],
            ["Time","O(n)","O(n) — visits every node twice (down + up)"],
            ["Space — balanced","O(n) — last level has n/2 nodes","O(log n) — stack depth = height"],
            ["Space — skewed","O(1) — one node per level","O(n) — stack depth = n ← danger"],
            ["Code size","~12–15 lines","~3 lines"],
          ].map(([asp,bfs,dfs]) => (
            <tr key={asp}>
              <td><strong className="ds-strong">{asp}</strong></td>
              <td style={{color:"#c8d3e0",fontSize:13}}>{bfs}</td>
              <td style={{color:"#c8d3e0",fontSize:13}}>{dfs}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout danger">
        <div className="callout-label">StackOverflow Risk with DFS</div>
        In a fully skewed tree (like a linked list), the recursive stack reaches depth n.
        For n = 10⁵ this causes a <strong className="ds-strong">StackOverflowError</strong> in Java.
        For very large inputs, prefer BFS or iterative DFS with an explicit stack.
      </div>
    </>
  ),
};
