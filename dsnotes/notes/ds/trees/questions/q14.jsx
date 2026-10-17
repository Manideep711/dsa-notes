import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ14 = {
  id: "tiq14",
  labelText: "Question 14",
  labelColor: tokens.accent5,
  title: "Lowest Common Ancestor of a Binary Tree",
  navLabel: "LCA",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given a binary tree, find the{" "}
        <strong className="ds-strong">lowest common ancestor (LCA)</strong> of two given
        nodes p and q. The LCA is the lowest node that has both p and q as descendants
        (a node can be a descendant of itself).
      </div>

      <h3 className="ds-h3">What is LCA — Two Equivalent Views</h3>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Bottom-up view</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Trace each node's path of ancestors up to the root. The{" "}
            <strong className="ds-strong">first common node</strong> in both paths,
            found going upward, is the LCA.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>Top-down view</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Walking root → node for both p and q, the{" "}
            <strong className="ds-strong">last common node</strong> before the paths
            diverge is the LCA.
          </p>
        </div>
      </div>
      <div className="callout proof">
        <div className="callout-label">A node can be its own ancestor</div>
        If one of the target nodes lies on the path to the other (e.g., LCA of node 2 and
        node 9, where 9 is an ancestor of 2), the ancestor itself is the LCA — not some
        node further up.
      </div>

      <h3 className="ds-h3">The Core Insight — Use DFS's Natural Bottom-Up Return</h3>
      <p className="ds-p">
        DFS naturally goes top-down then returns bottom-up. The trick: instead of
        returning ordinary values, have each recursive call{" "}
        <strong className="ds-strong">return the target node it found</strong> (or null).
        As results bubble up, the first node that receives{" "}
        <strong className="ds-strong">both</strong> p and q from its two subtrees is the LCA.
      </p>

      <h3 className="ds-h3">Three Return Rules</h3>
      <ol className="ds-steps">
        <li><div><strong className="ds-strong">Both subtrees return null</strong> → return null (neither p nor q found here).</div></li>
        <li><div><strong className="ds-strong">One subtree returns non-null, other null</strong> → return the non-null one (it's carrying p or q upward — or possibly the LCA itself, found deeper).</div></li>
        <li><div><strong className="ds-strong">Both subtrees return non-null</strong> → the current node is the LCA — return the current node itself.</div></li>
      </ol>

      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 460 220">
          <line x1="230" y1="20" x2="140" y2="75" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="230" y1="20" x2="320" y2="75" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="140" y1="75" x2="100" y2="130" stroke={tokens.accent3} strokeWidth="2.5"/>
          <line x1="140" y1="75" x2="180" y2="130" stroke={tokens.accent3} strokeWidth="2.5"/>
          <line x1="100" y1="130" x2="80"  y2="185" stroke={tokens.accent5} strokeWidth="2.5"/>
          <line x1="180" y1="130" x2="180" y2="185" stroke={tokens.accent2} strokeWidth="2.5"/>
          {[
            ["7",230,20,"#64748b"],
            ["9",140,77,tokens.accent3],["13",320,77,"#64748b"],
            ["2",100,132,"#64748b"],["14",180,132,"#64748b"],
            ["15",80,187,tokens.accent5],["1",180,187,tokens.accent2],
          ].map(([v,cx,cy,col]) => (
            <g key={cx+""+cy}>
              <circle cx={cx} cy={cy} r="16" fill="#1a1f2e" stroke={col} strokeWidth="1.5"/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          <text x="10" y="210" fill={tokens.accent3} fontSize="9" fontFamily="JetBrains Mono">LCA(15, 1) = 9 — first node receiving both from its children</text>
        </svg>
        <figcaption>Node 9 receives 15 from its left subtree and 1 from its right subtree → both non-null → 9 is the LCA.</figcaption>
      </div>

      <h3 className="ds-h3">Algorithm</h3>
      <ol className="ds-steps">
        <li><div>Base case: if <code className="ds-code">root == null</code> OR <code className="ds-code">root == p</code> OR <code className="ds-code">root == q</code> → return <code className="ds-code">root</code> (stop descending — found a target or hit a dead end).</div></li>
        <li><div>Recurse: <code className="ds-code">leftChild = LCA(root.left, p, q)</code>, <code className="ds-code">rightChild = LCA(root.right, p, q)</code>.</div></li>
        <li><div>If <code className="ds-code">leftChild == null</code> → return <code className="ds-code">rightChild</code>.</div></li>
        <li><div>Else if <code className="ds-code">rightChild == null</code> → return <code className="ds-code">leftChild</code>.</div></li>
        <li><div>Else (both non-null) → return <code className="ds-code">root</code> (this is the LCA).</div></li>
      </ol>

      <div className="callout warn">
        <div className="callout-label">Why stop immediately when root == p or root == q</div>
        Once you find one of the target nodes, there's no need to search its subtree —
        even if the other target is nested inside it, the answer doesn't change; the
        found node itself becomes a candidate that gets carried upward. Descending
        further wastes work without changing the result.
      </div>

      <div className="trick-box">
        <div className="trick-title">Dry Run — LCA(15, 1), Tree: 7→9→[15,14→1], 7→13</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Call</th><th>Node</th><th>leftChild</th><th>rightChild</th><th>Returns</th></tr>
          </thead>
          <tbody>
            {[
              ["LCA(15,…)","15","—","—","15 ← root==p, stop"],
              ["LCA(null,…)","null","—","—","null ← base case"],
              ["LCA(9,…)","9","15","null","15 (Rule 2: left non-null)"],
              ["LCA(1,…)","1","—","—","1 ← root==q, stop"],
              ["LCA(null,…)","null","—","—","null"],
              ["LCA(14,…)","14","null","1","1 (Rule 2: right non-null)"],
              ["LCA(9,…) again","9","15","1","9 ← Rule 3: both non-null = LCA!"],
              ["LCA(13,…)","13","null","null","null (Rule 1)"],
              ["LCA(7,…)","7","9","null","9 (Rule 2: left non-null)"],
            ].map(([call,node,lc,rc,ret],i) => (
              <tr key={call+i}>
                <td style={{fontSize:10}}><code className="ds-code">{call}</code></td>
                <td style={{color:tokens.accent5}}>{node}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{lc}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{rc}</td>
                <td style={{color:i===6?tokens.accent3:"#c8d3e0",fontWeight:i===6?600:400,fontSize:12}}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
          Final answer: LCA(15, 1) = 9 ✓
        </p>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">lowestCommonAncestor</span>(<span class="type">TreeNode</span> root, <span class="type">TreeNode</span> p, <span class="type">TreeNode</span> q) {
        <span class="kw">if</span> (root == <span class="kw">null</span> || root == p || root == q) {
            <span class="kw">return</span> root; <span class="cm">// found a target, or hit a dead end</span>
        }

        <span class="type">TreeNode</span> leftChild  = <span class="fn">lowestCommonAncestor</span>(root.left,  p, q);
        <span class="type">TreeNode</span> rightChild = <span class="fn">lowestCommonAncestor</span>(root.right, p, q);

        <span class="kw">if</span> (leftChild == <span class="kw">null</span>) {
            <span class="kw">return</span> rightChild;       <span class="cm">// Rule 2: only right side found something</span>
        } <span class="kw">else if</span> (rightChild == <span class="kw">null</span>) {
            <span class="kw">return</span> leftChild;        <span class="cm">// Rule 2: only left side found something</span>
        } <span class="kw">else</span> {
            <span class="kw">return</span> root;             <span class="cm">// Rule 3: both sides found something → this is the LCA</span>
        }
    }
}`
      }}/></pre>

      <div className="callout purple">
        <div className="callout-label">Author's Insight — Why this works without explicit path tracking</div>
        Notice we never explicitly build the ancestor path for p or q. Instead, we let
        DFS's return mechanism do the work implicitly: a non-null return value means
        "somewhere in my subtree, I found p, q, or their LCA." Once both subtrees report
        something non-null at the same node, that node is provably the LCA — its
        children's subtrees independently each contain one of the two targets.
      </div>

      <h3 className="ds-h3 green">Alternative Approach — Parent Pointer Map</h3>
      <p className="ds-p">
        Another valid technique: do a BFS/DFS pass building a{" "}
        <code className="ds-code">HashMap&lt;Node, Node&gt;</code> mapping each node to
        its parent. Then walk both p and q up to the root collecting ancestor sets, and
        find the first common ancestor by intersecting paths. The author notes this
        approach is{" "}
        <strong className="ds-strong">preferred when the problem explicitly asks you to
        construct the tree</strong> (e.g., in online assessments providing only an edge
        list), since you'll need parent pointers anyway for other parts of the problem.
      </p>

      <h3 className="ds-h3">Complexity</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Single DFS pass; every node visited at most once"],
            ["Space","O(h)","Recursion stack depth = height of tree"],
          ].map(([m,v,r]) => (
            <tr key={m}>
              <td><strong className="ds-strong">{m}</strong></td>
              <td><span className={v==="O(n)"?"tc tc-n":"tc tc-log"}>{v}</span></td>
              <td style={{color:"#64748b",fontSize:13}}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ),
};