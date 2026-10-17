import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ5 = {
  id: "tiq5",
  labelText: "Question 05",
  labelColor: tokens.accent5,
  title: "Count Nodes in a Complete Binary Tree",
  navLabel: "Count Nodes",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the <code className="ds-code">root</code> of a{" "}
        <strong className="ds-strong">complete binary tree</strong>, return the total
        number of nodes. Design an algorithm that runs{" "}
        <strong className="ds-strong">better than O(n)</strong>.
      </div>

      <h3 className="ds-h3">What is a Complete Binary Tree?</h3>
      <p className="ds-p">
        A binary tree where all levels are{" "}
        <strong className="ds-strong">completely filled except possibly the last</strong>,
        and the last level is filled from{" "}
        <strong className="ds-strong">left to right</strong> with no gaps.
      </p>
      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 480 210">
          {/* Valid complete tree */}
          <text x="10" y="16" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">VALID — complete</text>
          <line x1="100" y1="40" x2="55"  y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="100" y1="40" x2="145" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="55"  y1="90" x2="32"  y2="148" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="55"  y1="90" x2="78"  y2="148" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="145" y1="90" x2="122" y2="148" stroke="#252b3d" strokeWidth="1.5"/>
          {[["20",100,30],["10",55,82],["30",145,82],["15",32,142],["5",78,142],["25",122,142]].map(([v,cx,cy]) => (
            <g key={cx}>
              <circle cx={cx} cy={cy} r="18" fill="#1a1f2e" stroke={tokens.accent3} strokeWidth="1.5"/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={tokens.accent3} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          <text x="10" y="175" fill={tokens.accent3} fontSize="9" fontFamily="JetBrains Mono">last level fills L→R ✓</text>
          {/* Invalid */}
          <text x="270" y="16" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">INVALID — gap in last level</text>
          <line x1="360" y1="40" x2="315" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="360" y1="40" x2="405" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="315" y1="90" x2="292" y2="148" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="405" y1="90" x2="428" y2="148" stroke="#252b3d" strokeWidth="1.5" strokeDasharray="4,3"/>
          {[["20",360,30],["10",315,82],["30",405,82],["15",292,142]].map(([v,cx,cy]) => (
            <g key={cx+cy}>
              <circle cx={cx} cy={cy} r="18" fill="#1a1f2e" stroke={tokens.danger} strokeWidth="1.5"/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={tokens.danger} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          <circle cx="428" cy="148" r="18" fill="#1a1f2e" stroke={tokens.danger} strokeWidth="1.5" strokeDasharray="4,3"/>
          <text x="428" y="153" textAnchor="middle" fill={tokens.danger} fontSize="10" fontFamily="JetBrains Mono">?</text>
          <text x="270" y="175" fill={tokens.danger} fontSize="9" fontFamily="JetBrains Mono">skipped left → not complete ✗</text>
        </svg>
        <figcaption>Left: valid complete binary tree — last level fills left-to-right. Right: invalid — gap skips left side.</figcaption>
      </div>

      <h3 className="ds-h3">Naive Approach — O(n)</h3>
      <p className="ds-p">
        The simplest solution is to recursively count every node:{" "}
        <code className="ds-code">1 + countLeft + countRight</code>. This works for any
        binary tree but visits all n nodes — O(n). The problem explicitly asks for better.
      </p>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="cm">// O(n) — too slow, doesn't use the "complete" property</span>
<span class="kw">return</span> <span class="num">1</span> + <span class="fn">countNodes</span>(root.left) + <span class="fn">countNodes</span>(root.right);`
      }}/></pre>

      <h3 className="ds-h3">Key Property — Fully Filled Subtrees Have a Formula</h3>
      <p className="ds-p">
        A <strong className="ds-strong">perfectly filled</strong> binary tree of height h
        has exactly:
      </p>
      <div className="formula">
        <div className="formula-label">Node count for a perfectly filled tree</div>
        2<sup>h</sup> − 1
      </div>
      <p className="ds-p">
        We don't need to visit every node if we can detect that a subtree is perfectly
        filled — we just apply the formula directly and skip the recursion entirely.
      </p>

      <h3 className="ds-h3">How to Detect a Perfectly Filled Subtree</h3>
      <p className="ds-p">
        Walk <strong className="ds-strong">extreme left</strong> from the current node,
        counting steps. Walk <strong className="ds-strong">extreme right</strong>, counting
        steps. If both counts are equal → the subtree is perfectly filled (because a
        complete binary tree fills left-to-right, so equal depth on both extremes means
        no gaps anywhere).
      </p>
      <div className="callout proof">
        <div className="callout-label">Why extreme left = extreme right implies perfectly filled</div>
        In a complete binary tree, the last level fills left-to-right. If the extreme-left
        path and extreme-right path reach the same depth, the rightmost node of the last
        level is present — meaning all nodes before it (filling left-to-right) must also
        be present. No gaps possible.
      </div>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent3 }}>leftHeight == rightHeight</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Subtree is perfectly filled. Apply formula:{" "}
            <code className="ds-code">2^leftHeight - 1</code>. No further recursion needed.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>leftHeight != rightHeight</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Last level is incomplete. Must recurse:{" "}
            <code className="ds-code">1 + countNodes(left) + countNodes(right)</code>.
          </p>
        </div>
      </div>

      <h3 className="ds-h3">Algorithm</h3>
      <ol className="ds-steps">
        <li><div>Base case: <code className="ds-code">root == null → return 0</code>.</div></li>
        <li><div>Compute <code className="ds-code">leftHeight</code> by walking left repeatedly from root.</div></li>
        <li><div>Compute <code className="ds-code">rightHeight</code> by walking right repeatedly from root.</div></li>
        <li><div>If equal → return <code className="ds-code">2^leftHeight - 1</code> (formula, no recursion).</div></li>
        <li><div>If not equal → return <code className="ds-code">1 + countNodes(root.left) + countNodes(root.right)</code>.</div></li>
      </ol>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Tree: [20, 10, 30, 15, 5, 25] (6 nodes, last level missing one)</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>At node</th><th>leftH</th><th>rightH</th><th>Equal?</th><th>Action</th><th>Returns</th></tr>
          </thead>
          <tbody>
            {[
              ["20 (root)","3","2","No","recurse left + right","1 + 3 + 2 = 6 ✓"],
              ["10 (left)","2","2","Yes","formula: 2²−1","3"],
              ["30 (right)","1","1","Yes","formula: 2¹−1","1"],
            ].map(([node,lh,rh,eq,action,ret]) => (
              <tr key={node}>
                <td style={{ color: tokens.accent5 }}>{node}</td>
                <td style={{ color: tokens.accent3 }}>{lh}</td>
                <td style={{ color: tokens.accent2 }}>{rh}</td>
                <td style={{ color: eq === "Yes" ? tokens.accent3 : tokens.danger }}>{eq}</td>
                <td style={{ color: "#c8d3e0", fontSize: 12 }}>{action}</td>
                <td style={{ color: tokens.accent3, fontWeight: 500 }}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{ color: tokens.accent3, marginTop: 10, marginBottom: 0 }}>
          Only 3 nodes visited — not all 6. That's the O(log²n) saving.
        </p>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {

    <span class="kw">public static int</span> <span class="fn">findLeftHeight</span>(<span class="type">Node</span> root) {
        <span class="kw">int</span> count = <span class="num">1</span>;
        <span class="kw">while</span> (root.left != <span class="kw">null</span>) {
            count++;
            root = root.left;
        }
        <span class="kw">return</span> count;
    }

    <span class="kw">public static int</span> <span class="fn">findRightHeight</span>(<span class="type">Node</span> root) {
        <span class="kw">int</span> count = <span class="num">1</span>;
        <span class="kw">while</span> (root.right != <span class="kw">null</span>) {
            count++;
            root = root.right;
        }
        <span class="kw">return</span> count;
    }

    <span class="kw">public static int</span> <span class="fn">countNodes</span>(<span class="type">Node</span> root) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>;

        <span class="kw">int</span> leftHeight  = <span class="fn">findLeftHeight</span>(root);
        <span class="kw">int</span> rightHeight = <span class="fn">findRightHeight</span>(root);

        <span class="kw">if</span> (leftHeight == rightHeight) {
            <span class="cm">// perfectly filled subtree — use formula, skip recursion</span>
            <span class="kw">return</span> (<span class="kw">int</span>) Math.<span class="fn">pow</span>(<span class="num">2</span>, leftHeight) - <span class="num">1</span>;
        }

        <span class="cm">// last level incomplete — recurse into both subtrees</span>
        <span class="kw">return</span> <span class="num">1</span> + <span class="fn">countNodes</span>(root.left) + <span class="fn">countNodes</span>(root.right);
    }
}`
      }}/></pre>

      <div className="callout warn">
        <div className="callout-label">Cast to int — Math.pow returns double</div>
        <code className="ds-code">Math.pow(2, h)</code> returns a{" "}
        <code className="ds-code">double</code> in Java. Cast it to{" "}
        <code className="ds-code">int</code> explicitly, otherwise the return type
        mismatch causes a compile error.
      </div>

      <div className="callout info">
        <div className="callout-label">Bit shift alternative — faster than Math.pow</div>
        <code className="ds-code">(1 &lt;&lt; leftHeight) - 1</code> is equivalent to{" "}
        <code className="ds-code">2^leftHeight - 1</code> and avoids the floating-point
        overhead of <code className="ds-code">Math.pow</code>. Left-shifting 1 by h bits
        is the same as multiplying by 2^h.
      </div>

      <h3 className="ds-h3">Why This is Better Than O(n) — Complexity</h3>
      <p className="ds-p">
        At each node where the tree isn't perfectly filled, we recurse into two subtrees
        but only go one level deeper before hitting a perfectly filled subtree (which
        we resolve with the formula). The recursion only goes down{" "}
        <strong className="ds-strong">log n levels</strong> (the height of the tree).
        At each level, computing left/right height costs another{" "}
        <strong className="ds-strong">log n</strong>. Total:
      </p>
      <div className="formula">
        <div className="formula-label">Time complexity</div>
        O(log n × log n) = O(log² n)
      </div>

      <table className="ds-tbl">
        <thead>
          <tr><th>Approach</th><th>Time</th><th>Space</th><th>Uses "complete" property?</th></tr>
        </thead>
        <tbody>
          {[
            ["Naive recursion","O(n)","O(log n)","No"],
            ["Formula + recursion","O(log² n)","O(log n)","Yes ← this solution"],
          ].map(([app,t,s,uses]) => (
            <tr key={app}>
              <td>{app}</td>
              <td><span className={t==="O(n)"?"tc tc-n":"tc tc-log"}>{t}</span></td>
              <td><span className="tc tc-log">{s}</span></td>
              <td style={{ color: uses.includes("Yes") ? tokens.accent3 : tokens.muted, fontSize: 13 }}>{uses}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout purple">
        <div className="callout-label">Author's Key Insight</div>
        The problem says "complete binary tree" for a reason — that word is the hint.
        Whenever a problem constrains the tree type, that constraint is the optimization.
        Here the constraint (complete = fills left-to-right) lets us detect perfectly
        filled subtrees in O(log n) and skip their recursion entirely, turning O(n) into
        O(log² n). Always look at what the problem guarantees — it's almost always the key.
      </div>
    </>
  ),
};