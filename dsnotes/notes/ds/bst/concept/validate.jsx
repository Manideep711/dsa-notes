import React from "react";
import { tokens } from "../../../../tokens";

export const bstValidateTab = {
  id: "bstValidate",
  label: "Validate BST",
  colorVar: tokens.accent2,
  sections: [
    // ─── Section 01 ────────────────────────────────────────────────────────
    {
      id: "bstval1",
      labelText: "Section 01",
      labelColor: tokens.accent2,
      title: "Validate Binary Search Tree — Problem",
      navLabel: "Problem & Insight",
      render: () => (
        <>
          <div className="callout info">
            <div className="callout-label">Problem</div>
            Given the root of a binary tree, determine if it is a{" "}
            <strong className="ds-strong">valid BST</strong>: every node's left subtree
            contains only keys less than the node's key, every right subtree contains
            only keys greater than the node's key, and{" "}
            <strong className="ds-strong">both subtrees must also be valid BSTs</strong>.
          </div>

          <h3 className="ds-h3">The Naive Trap — Checking Only Immediate Children</h3>
          <p className="ds-p">
            It's tempting to just check <code className="ds-code">node.left.val &lt;
            node.val &lt; node.right.val</code> at every node. This is{" "}
            <strong className="ds-strong">wrong</strong> — the BST property is a global
            constraint, not a local one. A node deep in the left subtree must still be
            smaller than every ancestor it descended from, not just its immediate parent.
          </p>

          <div className="callout warn">
            <div className="callout-label">Why local checks fail</div>
            A tree where every parent-child pair individually satisfies left&lt;parent&lt;right
            can still be an invalid BST overall — a deep left-subtree node could exceed
            some higher ancestor's value while staying smaller than its immediate parent.
          </div>

          <h3 className="ds-h3">The Core Insight — Pass Down a Valid Range</h3>
          <p className="ds-p">
            Instead of comparing only to the immediate parent, give every node a{" "}
            <strong className="ds-strong">(min, max) range</strong> it must fall strictly
            within. As we descend, this range narrows based on which direction we moved.
          </p>

          <div className="prop-grid">
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Going Left</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                New range = <code className="ds-code">(min, parent.val)</code>. The lower
                bound stays the same (inherited from above), but the upper bound tightens
                to the parent's value — nothing in the left subtree can exceed it.
              </p>
            </div>
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent5 }}>Going Right</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                New range = <code className="ds-code">(parent.val, max)</code>. The upper
                bound stays the same, but the lower bound tightens to the parent's value
                — nothing in the right subtree can fall below it.
              </p>
            </div>
          </div>

          <div className="diagram-wrap">
            <svg width="100%" viewBox="0 0 460 200">
              <line x1="230" y1="20" x2="140" y2="75" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="230" y1="20" x2="320" y2="75" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="140" y1="75" x2="100" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="140" y1="75" x2="180" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="320" y1="75" x2="280" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="320" y1="75" x2="360" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              {[
                ["10",230,20,tokens.accent3],
                ["8",140,77,tokens.accent2],["15",320,77,tokens.accent5],
                ["6",100,132,tokens.accent2],["9",180,132,tokens.accent2],
                ["11",280,132,tokens.accent5],["30",360,132,tokens.accent5],
              ].map(([v,cx,cy,col]) => (
                <g key={cx+""+cy}>
                  <circle cx={cx} cy={cy} r="16" fill="#1a1f2e" stroke={col} strokeWidth="1.5"/>
                  <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
                </g>
              ))}
              <text x="10"  y="155" fill={tokens.accent2} fontSize="9" fontFamily="JetBrains Mono">left subtree range: (IMIN, 10) — then (IMIN,8) for 6, (8,10) for 9</text>
              <text x="240" y="155" fill={tokens.accent5} fontSize="9" fontFamily="JetBrains Mono">right subtree range: (10, IMAX) — then (10,15) for 11, (15,IMAX) for 30</text>
            </svg>
            <figcaption>
              Range narrows at each step. Node 9's range becomes (8, 10) — not just
              "less than 10" — correctly enforcing it stays above its own parent 8 too.
            </figcaption>
          </div>

          <div className="callout proof">
            <div className="callout-label">Why ranges, not just parent comparison, are necessary</div>
            Node 9 sits in 10's left subtree but is also 8's right child. Its valid range
            isn't just "less than 10" — it must also be "greater than 8." By carrying
            <code className="ds-code">(min, max)</code> through the recursion, both
            constraints accumulate automatically instead of needing separate ancestor checks.
          </div>
        </>
      ),
    },

    // ─── Section 02 ────────────────────────────────────────────────────────
    {
      id: "bstval2",
      labelText: "Section 02",
      labelColor: tokens.accent2,
      title: "Dry Run — Tracing the Range Through Recursion",
      navLabel: "Dry Run",
      render: () => (
        <>
          <p className="ds-p">
            The root always starts with the widest possible range —{" "}
            <code className="ds-code">(MIN_VALUE, MAX_VALUE)</code> — since it has no
            constraints yet.
          </p>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Valid Tree: 10 → left:8(6,9) → right:15(11,30)</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>Node</th><th>Range received</th><th>In range?</th><th>Next call</th></tr>
              </thead>
              <tbody>
                {[
                  ["10","(MIN, MAX)","yes","left:(MIN,10), right:(10,MAX)"],
                  ["8","(MIN, 10)","8 &gt; MIN, 8 &lt; 10 ✓","left:(MIN,8), right:(8,10)"],
                  ["6","(MIN, 8)","6 &lt; 8 ✓","both null → true"],
                  ["9","(8, 10)","9 &gt; 8, 9 &lt; 10 ✓","both null → true"],
                  ["15","(10, MAX)","15 &gt; 10 ✓","left:(10,15), right:(15,MAX)"],
                  ["11","(10, 15)","11 &gt; 10, 11 &lt; 15 ✓","both null → true"],
                  ["30","(15, MAX)","30 &gt; 15 ✓","both null → true"],
                ].map(([node,range,inr,next]) => (
                  <tr key={node}>
                    <td style={{color:tokens.accent3}}>{node}</td>
                    <td><code className="ds-code">{range}</code></td>
                    <td style={{color:"#c8d3e0",fontSize:12}} dangerouslySetInnerHTML={{__html:inr}}/>
                    <td style={{color:"#64748b",fontSize:11}} dangerouslySetInnerHTML={{__html:next}}/>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
              All checks pass → overall result: <strong>true</strong> ✓
            </p>
          </div>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Invalid Tree: same shape but 11 replaced with 11... wait, value changed to violate range</div>
            <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 8 }}>
              Suppose the node under 15 (left child) is changed to value{" "}
              <strong style={{color:tokens.danger}}>11</strong> but the tree shape stays the
              same — and 15's left child range should be <code className="ds-code">(10, 15)</code>.
              Now imagine instead that the value placed there breaks the lower bound — e.g.
              a node with value 11 placed where the range demands &gt; 15:
            </p>
            <table className="ds-tbl" style={{ marginTop: 0 }}>
              <thead>
                <tr><th>Node</th><th>Range received</th><th>Check</th><th>Result</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{color:tokens.danger}}>11</td>
                  <td><code className="ds-code">(15, IMAX)</code></td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>11 ≤ 15 → violates lower bound</td>
                  <td style={{color:tokens.danger,fontWeight:600}}>false</td>
                </tr>
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.danger, marginTop:10, marginBottom:0}}>
              One false anywhere propagates up — every ancestor that combines this
              result via AND also returns false, so the final answer is <strong>false</strong>.
            </p>
          </div>
        </>
      ),
    },

    // ─── Section 03 ────────────────────────────────────────────────────────
    {
      id: "bstval3",
      labelText: "Section 03",
      labelColor: tokens.accent2,
      title: "Algorithm & Code",
      navLabel: "Algorithm & Code",
      render: () => (
        <>
          <h3 className="ds-h3">Algorithm</h3>
          <ol className="ds-steps">
            <li><div>Call <code className="ds-code">validate(root, MIN_VALUE, MAX_VALUE)</code> — root has no constraints.</div></li>
            <li><div>Base case: <code className="ds-code">root == null</code> → return <code className="ds-code">true</code> (an empty subtree never violates anything).</div></li>
            <li><div>If <code className="ds-code">root.val &lt;= min</code> OR <code className="ds-code">root.val &gt;= max</code> → return <code className="ds-code">false</code> (value out of allowed range).</div></li>
            <li><div>Recurse left: <code className="ds-code">validate(root.left, min, root.val)</code> — upper bound tightens.</div></li>
            <li><div>Recurse right: <code className="ds-code">validate(root.right, root.val, max)</code> — lower bound tightens.</div></li>
            <li><div>Return <code className="ds-code">leftSubtree && rightSubtree</code> — both must be valid for this node to be valid.</div></li>
          </ol>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public boolean</span> <span class="fn">isValidBST</span>(<span class="type">TreeNode</span> root) {
        <span class="kw">return</span> <span class="fn">validate</span>(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    <span class="kw">public boolean</span> <span class="fn">validate</span>(<span class="type">TreeNode</span> root, <span class="kw">long</span> min, <span class="kw">long</span> max) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) {
            <span class="kw">return true</span>; <span class="cm">// empty subtree is trivially valid</span>
        }

        <span class="kw">if</span> (root.val &lt;= min || root.val &gt;= max) {
            <span class="kw">return false</span>; <span class="cm">// value violates the inherited range</span>
        }

        <span class="kw">boolean</span> leftSubtree  = <span class="fn">validate</span>(root.left,  min, root.val); <span class="cm">// tighten upper bound</span>
        <span class="kw">boolean</span> rightSubtree = <span class="fn">validate</span>(root.right, root.val, max); <span class="cm">// tighten lower bound</span>

        <span class="kw">return</span> (leftSubtree &amp;&amp; rightSubtree); <span class="cm">// both sides must hold</span>
    }
}`
          }}/></pre>

          <div className="callout danger">
            <div className="callout-label">Why long, not int — the overflow trap</div>
            Node values can span the entire <code className="ds-code">int</code> range,
            including <code className="ds-code">Integer.MIN_VALUE</code> and{" "}
            <code className="ds-code">Integer.MAX_VALUE</code>. If the comparison bounds
            were declared as <code className="ds-code">int</code>, there would be no
            valid sentinel value strictly outside the entire int range — you couldn't
            represent "one less than the smallest possible value." Using{" "}
            <code className="ds-code">long</code> with{" "}
            <code className="ds-code">Long.MIN_VALUE</code> /{" "}
            <code className="ds-code">Long.MAX_VALUE</code> gives genuine headroom beyond
            any possible int node value.
          </div>

          <div className="callout warn">
            <div className="callout-label">Strict inequality — why &lt;= and &gt;=, not &lt; and &gt;</div>
            The bounds are exclusive — a node's value must be{" "}
            <strong className="ds-strong">strictly greater</strong> than min and{" "}
            <strong className="ds-strong">strictly less</strong> than max. Using{" "}
            <code className="ds-code">&lt;=</code> / <code className="ds-code">&gt;=</code>{" "}
            in the failure check correctly rejects values equal to either bound — since
            BSTs (by the problem's definition here) don't allow duplicate values touching
            an ancestor's value.
          </div>

          <h3 className="ds-h3 green">Why root always starts at (MIN_VALUE, MAX_VALUE)</h3>
          <p className="ds-p">
            The root has no ancestors constraining it — any value is acceptable at the
            top. Starting with the widest possible range ensures the root never falsely
            fails the bounds check; all real constraints get introduced only as we
            descend into subtrees.
          </p>

          <h3 className="ds-h3">Complexity</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {[
                ["Time","O(n)","Every node visited exactly once"],
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

          <div className="callout purple">
            <div className="callout-label">Author's Insight — Why this is different from BST search/insert</div>
            Search and insert in a BST only need to compare against the immediate node on
            the path — the BST property guarantees correctness automatically once you're
            inside a valid BST. Validation is the opposite problem: you don't know yet
            whether the tree is valid, so you can't rely on local comparisons alone. The
            range-passing technique is what makes a global property checkable through
            purely local, per-node decisions.
          </div>
        </>
      ),
    },
  ],
};