import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ3 = {
  id: "tiq3",
  labelText: "Question 03",
  labelColor: tokens.accent5,
  title: "Diameter of Binary Tree",
  navLabel: "Diameter",
  render: () => (
    <>
      {/* ── Problem ── */}
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the <code className="ds-code">root</code> of a binary tree, return the{" "}
        <strong className="ds-strong">length of the diameter</strong> — the longest path
        between any two nodes. The path may or may not pass through the root.
        Length = number of <strong className="ds-strong">edges</strong>, not nodes.
      </div>

      {/* ── What is Diameter ── */}
      <h3 className="ds-h3">What Exactly is a Diameter?</h3>
      <p className="ds-p">
        A <strong className="ds-strong">path</strong> in a tree is a sequence of nodes
        where no edge is repeated. The diameter is the longest such path — measured in
        edges, not nodes.
      </p>
      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 420 200">
          {/* edges */}
          <line x1="210" y1="30" x2="120" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="210" y1="30" x2="300" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="120" y1="90" x2="70"  y2="155" stroke="#f43f5e" strokeWidth="2.5"/>
          <line x1="120" y1="90" x2="170" y2="155" stroke="#f43f5e" strokeWidth="2.5"/>
          <line x1="300" y1="90" x2="300" y2="155" stroke="#252b3d" strokeWidth="1.5"/>
          {/* nodes */}
          <circle cx="210" cy="30"  r="20" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
          <text x="210" y="35"  textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">1</text>
          <circle cx="120" cy="92"  r="20" fill="#1a1f2e" stroke="#f43f5e" strokeWidth="2"/>
          <text x="120" y="97"  textAnchor="middle" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono">2</text>
          <circle cx="300" cy="92"  r="20" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
          <text x="300" y="97"  textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">3</text>
          <circle cx="70"  cy="157" r="20" fill="#1a1f2e" stroke="#f43f5e" strokeWidth="2"/>
          <text x="70"  y="162" textAnchor="middle" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono">4</text>
          <circle cx="170" cy="157" r="20" fill="#1a1f2e" stroke="#f43f5e" strokeWidth="2"/>
          <text x="170" y="162" textAnchor="middle" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono">5</text>
          <circle cx="300" cy="157" r="20" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
          <text x="300" y="162" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">3</text>
          {/* diameter label */}
          <text x="22" y="185" fill="#f43f5e" fontSize="10" fontFamily="JetBrains Mono">← diameter path: 4→2→5  (2 edges)</text>
          <text x="22" y="198" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">   or 4→2→1→3  (3 edges) ← this is longer</text>
        </svg>
        <figcaption>
          Red path (4→2→5) has 2 edges. Path 4→2→1→3 has 3 edges — that's the diameter.
        </figcaption>
      </div>

      <div className="callout warn">
        <div className="callout-label">Two important clarifications from the author</div>
        <strong className="ds-strong">1. No duplicate edges in a path.</strong> You cannot
        go 4→2→1→2→5 — that reuses the edge 2↔1. A valid path visits each edge at most once.
        <br/><br/>
        <strong className="ds-strong">2. The diameter doesn't have to pass through root.</strong>{" "}
        It can pass through any node. The longest path between two leaf nodes always
        defines the diameter — and it bends at some node (the turning point).
      </div>

      <div className="callout proof">
        <div className="callout-label">Key Observation — Longest path is always between two leaves</div>
        If a path endpoint is not a leaf, we can extend it further down → the path gets longer.
        So the maximum possible diameter always connects two leaf nodes, bending at some
        internal node we call the <strong className="ds-strong">turning point</strong>.
      </div>

      {/* ── Core Idea ── */}
      <h3 className="ds-h3">Core Idea — Every Node as a Turning Point</h3>
      <p className="ds-p">
        For any node acting as the <strong className="ds-strong">turning point</strong>, the
        longest path through it equals:
      </p>
      <div className="formula">
        <div className="formula-label">Path length at turning point</div>
        leftHeight + rightHeight
      </div>
      <p className="ds-p">
        We don't know which node is the actual turning point, so we{" "}
        <strong className="ds-strong">treat every node as a candidate turning point</strong>,
        compute <code className="ds-code">leftHeight + rightHeight</code> at each, and track
        the global maximum. That maximum is the diameter.
      </p>

      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Finding height</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Standard post-order recursion from Q1:{" "}
            <code className="ds-code">1 + max(leftH, rightH)</code>. This tells us how far
            we can go <em>down</em> each side.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>Finding diameter</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            At each node, candidate diameter = <code className="ds-code">leftH + rightH</code>.
            Track the global max across all nodes. That's the answer.
          </p>
        </div>
      </div>

      {/* ── Pass by Reference trick ── */}
      <h3 className="ds-h3">Java Trick — Pass by Reference with int[]</h3>
      <p className="ds-p">
        We need a variable <code className="ds-code">maxi</code> that{" "}
        <strong className="ds-strong">all recursive calls can update and share</strong>. In
        Java, primitives are passed by value — changes inside a recursive call don't
        reflect outside. But <strong className="ds-strong">arrays are passed by reference</strong>.
      </p>
      <div className="trick-box">
        <div className="trick-title">The Workaround</div>
        <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 8 }}>
          Wrap the integer in a single-element array:{" "}
          <code className="ds-code">int[] maxi = new int[1]</code>. Now every recursive call
          receives a reference to the same array object. Updating{" "}
          <code className="ds-code">maxi[0]</code> inside any call is visible to all others.
        </p>
        <pre className="ds-pre" style={{ margin: 0 }}><code dangerouslySetInnerHTML={{ __html:
`<span class="cm">// WRONG — primitive int, changes lost after recursion returns</span>
<span class="kw">int</span> maxi = <span class="num">0</span>;
<span class="fn">findHeight</span>(root, maxi); <span class="cm">// maxi stays 0 here</span>

<span class="cm">// CORRECT — array passed by reference, all calls share it</span>
<span class="kw">int</span>[] maxi = <span class="kw">new int</span>[<span class="num">1</span>]; <span class="cm">// default value is 0</span>
<span class="fn">findHeight</span>(root, maxi); <span class="cm">// maxi[0] reflects all updates</span>`
        }}/></pre>
      </div>

      <div className="callout info">
        <div className="callout-label">Why int[] default is already 0</div>
        In Java, integer arrays are zero-initialized by default. So{" "}
        <code className="ds-code">new int[1]</code> gives you{" "}
        <code className="ds-code">[0]</code> — no need to explicitly set{" "}
        <code className="ds-code">maxi[0] = 0</code>.
      </div>

      {/* ── Algorithm ── */}
      <h3 className="ds-h3">Algorithm</h3>
      <ol className="ds-steps">
        <li>
          <div>
            Create <code className="ds-code">int[] maxi = new int[1]</code> (pass-by-reference
            container for the global maximum diameter).
          </div>
        </li>
        <li>
          <div>
            Call <code className="ds-code">findHeight(root, maxi)</code> — this runs a
            post-order DFS over the entire tree.
          </div>
        </li>
        <li>
          <div>
            Inside <code className="ds-code">findHeight</code>: base case{" "}
            <code className="ds-code">root == null → return 0</code>.
          </div>
        </li>
        <li>
          <div>
            Recurse left and right to get <code className="ds-code">leftHeight</code> and{" "}
            <code className="ds-code">rightHeight</code>.
          </div>
        </li>
        <li>
          <div>
            Update <code className="ds-code">maxi[0] = max(maxi[0], leftHeight + rightHeight)</code>{" "}
            — this node as the turning point.
          </div>
        </li>
        <li>
          <div>
            Return <code className="ds-code">1 + max(leftHeight, rightHeight)</code> — height
            of this subtree, needed by the parent.
          </div>
        </li>
        <li>
          <div>
            After recursion completes, <code className="ds-code">maxi[0]</code> holds the answer.
          </div>
        </li>
      </ol>

      {/* ── Dry Run ── */}
      <div className="trick-box">
        <div className="trick-title">
          Dry Run — Tree: [1, 2, 3, 4, 5] (root=1, left=2 with children 4,5, right=3)
        </div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>Call</th>
              <th>Node</th>
              <th>lH</th>
              <th>rH</th>
              <th>lH+rH</th>
              <th>maxi[0]</th>
              <th>Returns (height)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["findHeight(null,…)","null","—","—","—","0","0 ← base"],
              ["findHeight(4,…)","4","0","0","0+0=0","max(0,0)=0","1+max(0,0)=1"],
              ["findHeight(null,…)","null","—","—","—","0","0 ← base"],
              ["findHeight(null,…)","null","—","—","—","0","0 ← base"],
              ["findHeight(5,…)","5","0","0","0+0=0","max(0,0)=0","1+max(0,0)=1"],
              ["findHeight(2,…)","2","1←4","1←5","1+1=2","max(0,2)=2","1+max(1,1)=2"],
              ["findHeight(null,…)","null","—","—","—","2","0 ← base"],
              ["findHeight(3,…)","3","0","0","0+0=0","max(2,0)=2","1+max(0,0)=1"],
              ["findHeight(1,…)","1","2←2","1←3","2+1=3","max(2,3)=3","1+max(2,1)=3"],
            ].map(([call,node,lh,rh,sum,mx,ret]) => (
              <tr key={call}>
                <td style={{ fontSize: 10 }}><code className="ds-code">{call}</code></td>
                <td style={{ color: "#f43f5e" }}>{node}</td>
                <td style={{ color: tokens.accent2, fontSize: 12 }}>{lh}</td>
                <td style={{ color: tokens.accent2, fontSize: 12 }}>{rh}</td>
                <td style={{ color: tokens.accent,  fontSize: 12 }}>{sum}</td>
                <td style={{ color: tokens.accent3, fontWeight: 500, fontSize: 12 }}>{mx}</td>
                <td style={{ color: "#c8d3e0",      fontSize: 12 }}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{ color: tokens.accent3, marginTop: 10, marginBottom: 0 }}>
          <code className="ds-code">maxi[0] = 3</code> ✓ — diameter is 3 edges (path: 4→2→1→3)
        </p>
      </div>

      {/* ── Code ── */}
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public int</span> <span class="fn">diameterOfBinaryTree</span>(<span class="type">TreeNode</span> root) {
        <span class="kw">int</span>[] maxi = <span class="kw">new int</span>[<span class="num">1</span>]; <span class="cm">// pass-by-reference trick</span>
        <span class="fn">findHeight</span>(root, maxi);
        <span class="kw">return</span> maxi[<span class="num">0</span>];
    }

    <span class="kw">public int</span> <span class="fn">findHeight</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span>[] maxi) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>;

        <span class="kw">int</span> leftHeight  = <span class="fn">findHeight</span>(root.left,  maxi); <span class="cm">// post-order: left first</span>
        <span class="kw">int</span> rightHeight = <span class="fn">findHeight</span>(root.right, maxi); <span class="cm">// then right</span>

        <span class="cm">// treat this node as the turning point</span>
        maxi[<span class="num">0</span>] = Math.<span class="fn">max</span>(maxi[<span class="num">0</span>], leftHeight + rightHeight);

        <span class="cm">// return height to parent (not diameter)</span>
        <span class="kw">return</span> (<span class="num">1</span> + Math.<span class="fn">max</span>(leftHeight, rightHeight));
    }
}`
      }}/></pre>

      {/* ── Key Distinction ── */}
      <div className="callout warn">
        <div className="callout-label">Height vs Diameter — Two Different Things Computed Together</div>
        <code className="ds-code">findHeight</code> does two jobs in one pass:
        <br/><br/>
        <strong className="ds-strong">Returns:</strong> the height of the current subtree
        (used by the parent to compute its own diameter candidate).
        <br/><br/>
        <strong className="ds-strong">Side-effect:</strong> updates <code className="ds-code">maxi[0]</code>
        with the diameter candidate at this node (<code className="ds-code">lH + rH</code>).
        <br/><br/>
        The function's <em>return value</em> and the <em>answer</em> are different things.
        Never confuse them.
      </div>

      {/* ── Why not return diameter directly ── */}
      <div className="callout purple">
        <div className="callout-label">Author's Insight — Why we can't just return diameter</div>
        The recursive function must return the <strong className="ds-strong">height</strong> to
        its parent (so the parent can compute its own diameter candidate). If we returned the
        diameter instead, the parent would get the wrong height and compute a wrong candidate.
        That's exactly why we use a separate <code className="ds-code">maxi[]</code> — it
        travels through all recursive calls as a side-channel, collecting the global maximum
        without interfering with the height computation.
      </div>

      {/* ── Connection to Q1 ── */}
      <h3 className="ds-h3 green">Connection to Q1 (Max Depth)</h3>
      <p className="ds-p">
        This problem is a <strong className="ds-strong">direct extension of Q1</strong>. In Q1
        we computed height and returned it. Here we do the same height computation but
        additionally record <code className="ds-code">lH + rH</code> at each node. The author's
        point: understanding Q1 deeply makes Q3 a minor tweak, not a new problem.
      </p>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="cm">// Q1 — findHeight only cares about returning height</span>
<span class="kw">return</span> (<span class="num">1</span> + Math.<span class="fn">max</span>(lh, rh));

<span class="cm">// Q3 — same height logic, but also update global max before returning</span>
maxi[<span class="num">0</span>] = Math.<span class="fn">max</span>(maxi[<span class="num">0</span>], lh + rh); <span class="cm">// ← one extra line</span>
<span class="kw">return</span> (<span class="num">1</span> + Math.<span class="fn">max</span>(lh, rh));           <span class="cm">// ← same as Q1</span>`
      }}/></pre>

      {/* ── Complexity ── */}
      <h3 className="ds-h3">Complexity Analysis</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Every node visited exactly once (post-order DFS)"],
            ["Space — balanced tree","O(log n)","Recursion stack depth = height = log n"],
            ["Space — skewed tree","O(n)","Recursion stack depth = height = n"],
            ["Space — general","O(h)","h = height of tree ∈ [log n, n]"],
            ["Extra space","O(1)","Only maxi[] of size 1 — constant"],
          ].map(([m,v,r]) => (
            <tr key={m}>
              <td><strong className="ds-strong">{m}</strong></td>
              <td><span className={v === "O(n)" ? "tc tc-n" : "tc tc-log"}>{v}</span></td>
              <td style={{ color: "#64748b", fontSize: 13 }}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout proof">
        <div className="callout-label">The extra maxi[] update is O(1) — doesn't affect time complexity</div>
        The <code className="ds-code">maxi[0] = Math.max(...)</code> line inside{" "}
        <code className="ds-code">findHeight</code> is a constant-time operation. It runs once
        per node — n times total — but O(n) × O(1) = O(n). The time complexity stays O(n),
        identical to Q1.
      </div>
    </>
  ),
};
