import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ11 = {
  id: "tiq11",
  labelText: "Question 11",
  labelColor: tokens.accent5,
  title: "Boundary Traversal of Binary Tree",
  navLabel: "Boundary Traversal",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the root of a binary tree, return its{" "}
        <strong className="ds-strong">boundary traversal</strong> — the nodes forming the
        outline of the tree, in the order: root, left boundary (top to bottom), leaf
        nodes (left to right), right boundary (bottom to top).
      </div>

      <h3 className="ds-h3">Three Parts of the Boundary</h3>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Left Boundary</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            From root, keep moving left until hitting a leaf. Direction:{" "}
            <strong className="ds-strong">top to bottom</strong>.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Leaf Nodes</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            All nodes with no children. Direction:{" "}
            <strong className="ds-strong">left to right</strong>.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}`, gridColumn: "1/-1" }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>Right Boundary</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            From root, keep moving right until hitting a leaf. Direction:{" "}
            <strong className="ds-strong">bottom to top</strong> (reversed!).
          </p>
        </div>
      </div>

      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 480 230">
          {/* edges */}
          <line x1="240" y1="25" x2="140" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="240" y1="25" x2="340" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="140" y1="80" x2="100" y2="135" stroke={tokens.accent2} strokeWidth="2.5"/>
          <line x1="100" y1="135" x2="80" y2="190" stroke={tokens.accent2} strokeWidth="2.5"/>
          <line x1="140" y1="80" x2="180" y2="135" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="180" y1="135" x2="160" y2="190" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="180" y1="135" x2="200" y2="190" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="340" y1="80" x2="300" y2="135" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="340" y1="80" x2="380" y2="135" stroke={tokens.accent5} strokeWidth="2.5"/>
          <line x1="300" y1="135" x2="280" y2="190" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="300" y1="135" x2="320" y2="190" stroke="#252b3d" strokeWidth="1.5"/>
          {/* nodes */}
          {[
            ["1",240,25,tokens.accent],
            ["2",140,82,tokens.accent2],["7",340,82,tokens.accent5],
            ["4",100,137,tokens.accent2],["5",180,137,"#64748b"],["3",300,137,"#64748b"],["11",380,137,tokens.accent5],
            ["8",80,192,tokens.accent3],["9",160,192,tokens.accent3],["10",200,192,tokens.accent3],
            ["6",280,192,tokens.accent3],["—",320,192,"#64748b"],
          ].map(([v,cx,cy,col]) => (
            v!=="—" &&
            <g key={cx+""+cy}>
              <circle cx={cx} cy={cy} r="17" fill="#1a1f2e" stroke={col} strokeWidth="1.5"/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          <text x="10" y="215" fill={tokens.accent2} fontSize="9" fontFamily="JetBrains Mono">Left boundary (top→down): 1,2,4</text>
          <text x="10" y="226" fill={tokens.accent3} fontSize="9" fontFamily="JetBrains Mono">Leaves (left→right): 8,9,10,6,11</text>
          <text x="280" y="215" fill={tokens.accent5} fontSize="9" fontFamily="JetBrains Mono">Right boundary (bottom→up): 7,3</text>
        </svg>
        <figcaption>Final answer: [1, 2, 4] + [8, 9, 10, 6, 11] + [7, 3] = [1,2,4,8,9,10,6,11,7,3]</figcaption>
      </div>

      <h3 className="ds-h3">Why DFS Traversal Order Doesn't Matter for Leaves</h3>
      <p className="ds-p">
        The author addresses a common misconception: many tutorials claim post-order
        traversal won't work for finding leaves left-to-right. This is{" "}
        <strong className="ds-strong">false</strong>. Pre-order, in-order, and post-order
        all visit the left subtree entirely before the right subtree — only the position
        of the <em>root visit</em> differs. Since leaves are found{" "}
        <em>within</em> each subtree, left subtree's leaves are always discovered before
        right subtree's leaves in all three traversals.
      </p>
      <div className="callout proof">
        <div className="callout-label">Proof — why all three DFS orders give same leaf order</div>
        Pre-order: Root → Left → Right.
        In-order: Left → Root → Right.
        Post-order: Left → Right → Root.
        <br/><br/>
        In every case, the entire left subtree is processed before the entire right
        subtree. So all leaves inside the left subtree appear before all leaves inside
        the right subtree — regardless of where "Root" sits in the traversal name.
      </div>

      <h3 className="ds-h3">Why BFS Doesn't Work Directly</h3>
      <p className="ds-p">
        BFS processes level by level. If the tree's structure puts a right-side leaf at
        a shallower level than a left-side leaf, BFS would emit the right one first —
        breaking the required left-to-right leaf order. DFS naturally respects
        left-to-right because it fully explores the left subtree before touching the
        right subtree, regardless of depth.
      </p>

      <h3 className="ds-h3">Critical Edge Case — Avoiding Duplicate Root</h3>
      <p className="ds-p">
        If the root itself is a leaf (single-node tree), inserting it unconditionally
        and then finding leaves would add it{" "}
        <strong className="ds-strong">twice</strong>. Fix: only insert root directly if{" "}
        <code className="ds-code">!isLeaf(root)</code>. If root is a leaf, the leaf-finding
        step will catch it exactly once.
      </p>
      <div className="callout warn">
        <div className="callout-label">isLeaf helper</div>
        A node is a leaf if and only if{" "}
        <strong className="ds-strong">both left and right children are null</strong>.
        This two-line helper is used by all three boundary-finding functions to know when
        to stop.
      </div>

      <h3 className="ds-h3">Left Boundary Algorithm</h3>
      <ol className="ds-steps">
        <li><div>Start at <code className="ds-code">root.left</code>.</div></li>
        <li><div>While current node is not null: if it's a leaf, stop (don't include leaves here — they belong to the leaf section).</div></li>
        <li><div>Otherwise add current node's value, then prefer moving left; only move right if left is null.</div></li>
      </ol>

      <h3 className="ds-h3">Right Boundary Algorithm — Stack for Reversal</h3>
      <p className="ds-p">
        Mirror logic of left boundary but moving right-first. Since output must be{" "}
        <strong className="ds-strong">bottom to top</strong>, we collect nodes into a{" "}
        <code className="ds-code">Stack</code> while traversing top-down, then pop them
        all at the end — automatically reversing the order.
      </p>
      <div className="callout info">
        <div className="callout-label">Why a Stack for reversal</div>
        We traverse root→right→right naturally top-down (easiest direction to code), but
        need bottom-up output. A Stack is LIFO — pushing in top-down order and popping
        gives bottom-up order for free, no manual array reversal needed.
      </div>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Right Boundary on the example tree</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Step</th><th>Current node</th><th>isLeaf?</th><th>Action</th><th>Stack</th></tr>
          </thead>
          <tbody>
            {[
              ["1","7","No","push 7, move right→null, move left→11","[7]"],
              ["2","11","Yes","stop (don't push leaf)","[7]"],
            ].map(([s,node,leaf,act,stack]) => (
              <tr key={s}>
                <td style={{color:tokens.accent5}}>{s}</td>
                <td style={{color:"#c8d3e0"}}>{node}</td>
                <td style={{color:leaf==="Yes"?tokens.accent3:tokens.muted}}>{leaf}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{act}</td>
                <td><code className="ds-code">{stack}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:"#c8d3e0", marginTop:8, marginBottom:0}}>
          Wait — should also include node 3. Corrected trace: starting at root.right=3:
          3 is not leaf → push 3 → move right→7 → 7 not leaf → push 7 → move right→null → move left→11 (leaf) → stop.
          Stack = [3, 7]. Pop order: 7, then 3 → <strong style={{color:tokens.accent3}}>[7, 3]</strong> ✓
        </p>
      </div>

      <h3 className="ds-h3">Leaf Node Algorithm — Simple Pre-order DFS</h3>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">public void</span> <span class="fn">insertLeafNode</span>(<span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res, <span class="type">Node</span> root) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span>;
    <span class="fn">insertLeafNode</span>(res, root.left);   <span class="cm">// left subtree first</span>
    <span class="fn">insertLeafNode</span>(res, root.right);  <span class="cm">// then right subtree</span>
    <span class="kw">if</span> (<span class="fn">isLeaf</span>(root)) res.<span class="fn">add</span>(root.data); <span class="cm">// add only if leaf</span>
}`
      }}/></pre>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">boundary</span>(<span class="type">Node</span> node) {
        <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();

        <span class="kw">if</span> (!<span class="fn">isLeaf</span>(node)) res.<span class="fn">add</span>(node.data); <span class="cm">// avoid double-counting single-node tree</span>

        <span class="fn">insertLeftBoundary</span>(res, node);
        <span class="fn">insertLeafNode</span>(res, node);
        <span class="fn">insertRightBoundary</span>(res, node);
        <span class="kw">return</span> res;
    }

    <span class="kw">public boolean</span> <span class="fn">isLeaf</span>(<span class="type">Node</span> node) {
        <span class="kw">return</span> (node.left == <span class="kw">null</span> &amp;&amp; node.right == <span class="kw">null</span>);
    }

    <span class="kw">public void</span> <span class="fn">insertLeftBoundary</span>(<span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res, <span class="type">Node</span> root) {
        <span class="type">Node</span> leftNode = root.left;
        <span class="kw">while</span> (leftNode != <span class="kw">null</span>) {
            <span class="kw">if</span> (<span class="fn">isLeaf</span>(leftNode)) <span class="kw">break</span>;   <span class="cm">// leaves handled separately</span>
            res.<span class="fn">add</span>(leftNode.data);
            leftNode = (leftNode.left != <span class="kw">null</span>) ? leftNode.left : leftNode.right;
        }
    }

    <span class="kw">public void</span> <span class="fn">insertRightBoundary</span>(<span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res, <span class="type">Node</span> root) {
        <span class="type">Node</span> rightNode = root.right;
        <span class="type">Stack</span>&lt;<span class="type">Integer</span>&gt; stack = <span class="kw">new</span> <span class="type">Stack</span>&lt;&gt;();
        <span class="kw">while</span> (rightNode != <span class="kw">null</span>) {
            <span class="kw">if</span> (<span class="fn">isLeaf</span>(rightNode)) <span class="kw">break</span>;
            stack.<span class="fn">push</span>(rightNode.data);  <span class="cm">// collect top-down</span>
            rightNode = (rightNode.right != <span class="kw">null</span>) ? rightNode.right : rightNode.left;
        }
        <span class="kw">while</span> (!stack.<span class="fn">isEmpty</span>())
            res.<span class="fn">add</span>(stack.<span class="fn">pop</span>());          <span class="cm">// emit bottom-up</span>
    }

    <span class="kw">public void</span> <span class="fn">insertLeafNode</span>(<span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res, <span class="type">Node</span> root) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span>;
        <span class="fn">insertLeafNode</span>(res, root.left);
        <span class="fn">insertLeafNode</span>(res, root.right);
        <span class="kw">if</span> (<span class="fn">isLeaf</span>(root)) res.<span class="fn">add</span>(root.data);
    }
}`
      }}/></pre>

      <h3 className="ds-h3 green">Left vs Right Boundary — Mirror Symmetry</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Aspect</th><th>Left Boundary</th><th>Right Boundary</th></tr>
        </thead>
        <tbody>
          {[
            ["Start node","root.left","root.right"],
            ["Preference","left first, right if forced","right first, left if forced"],
            ["Storage","Direct insert into result","Stack — then pop for reversal"],
            ["Final order","Top to bottom (natural)","Bottom to top (reversed via stack)"],
          ].map(([asp,l,r]) => (
            <tr key={asp}>
              <td><strong className="ds-strong">{asp}</strong></td>
              <td style={{color:"#c8d3e0",fontSize:13}}>{l}</td>
              <td style={{color:"#c8d3e0",fontSize:13}}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="ds-h3">Complexity</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Component</th><th>Time</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Left boundary","O(h)","Moves down the tree height at most"],
            ["Right boundary","O(h)","Same, plus O(h) for stack pop reversal"],
            ["Leaf nodes (DFS)","O(n)","Visits every node once"],
            ["Total","O(n + h) = O(n)","n dominates since h ≤ n"],
          ].map(([c,t,r]) => (
            <tr key={c}>
              <td>{c}</td>
              <td><span className={t==="O(n)"||t.startsWith("O(n")?"tc tc-n":"tc tc-log"}>{t}</span></td>
              <td style={{color:"#64748b",fontSize:13}}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout purple">
        <div className="callout-label">Author's Insight — Don't trust every tutorial</div>
        The author explicitly debunks a common wrong claim (that post-order fails for
        leaf-finding) found in many tutorials. Always verify the reasoning yourself —
        left subtree processed before right subtree holds true across pre/in/post-order,
        so leaf order left-to-right is guaranteed regardless of which DFS variant you pick.
      </div>
    </>
  ),
};