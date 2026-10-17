import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ8 = {
  id: "tiq8",
  labelText: "Question 08",
  labelColor: tokens.accent5,
  title: "Left View & Right Side View of Binary Tree",
  navLabel: "Left & Right View",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Two Problems, One Pattern</div>
        <strong className="ds-strong">Right Side View</strong> (LeetCode): given the root
        of a binary tree, return the values of nodes visible when the tree is viewed from
        the right side, top to bottom.
        <br /><br />
        <strong className="ds-strong">Left View</strong> (GFG): same idea — return the
        nodes visible from the left side, top to bottom.
      </div>

      <h3 className="ds-h3">Core Insight</h3>
      <p className="ds-p">
        The right side view is nothing but the{" "}
        <strong className="ds-strong">last node of every level</strong>. The left view is
        the <strong className="ds-strong">first node of every level</strong>. Both use the
        exact same BFS (level-order traversal) — the only difference is which node per
        level gets added to the result.
      </p>

      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 480 220">
          {/* tree edges */}
          <line x1="240" y1="30" x2="140" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="240" y1="30" x2="340" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="140" y1="90" x2="90"  y2="155" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="140" y1="90" x2="190" y2="155" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="340" y1="90" x2="340" y2="155" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="90"  y1="155" x2="70" y2="200" stroke="#252b3d" strokeWidth="1.5"/>
          {/* nodes */}
          {[
            ["1",240,22,tokens.accent5],
            ["2",140,82,tokens.accent2],
            ["7",340,82,tokens.accent5],
            ["3",90,147,tokens.accent2],
            ["8",190,147,"#64748b"],
            ["9",340,147,tokens.accent5],
            ["10",70,197,tokens.accent2],
          ].map(([v,cx,cy,col]) => (
            <g key={cx+cy}>
              <circle cx={cx} cy={cy} r="20" fill="#1a1f2e" stroke={col} strokeWidth={col===tokens.accent5?2.5:1.5}/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          {/* annotations */}
          <text x="10"  y="30"  fill={tokens.accent2} fontSize="10" fontFamily="JetBrains Mono">L0: 1</text>
          <text x="10"  y="95"  fill={tokens.accent2} fontSize="10" fontFamily="JetBrains Mono">L1: 2</text>
          <text x="10"  y="155" fill={tokens.accent2} fontSize="10" fontFamily="JetBrains Mono">L2: 3</text>
          <text x="10"  y="205" fill={tokens.accent2} fontSize="10" fontFamily="JetBrains Mono">L3: 10</text>
          <text x="390" y="30"  fill={tokens.accent5} fontSize="10" fontFamily="JetBrains Mono">1 ←R</text>
          <text x="390" y="95"  fill={tokens.accent5} fontSize="10" fontFamily="JetBrains Mono">7 ←R</text>
          <text x="390" y="155" fill={tokens.accent5} fontSize="10" fontFamily="JetBrains Mono">9 ←R</text>
          <text x="390" y="205" fill={tokens.accent5} fontSize="10" fontFamily="JetBrains Mono">10←R</text>
        </svg>
        <figcaption>
          Left view (blue): first node per level → [1, 2, 3, 10].
          Right view (rose): last node per level → [1, 7, 9, 10].
        </figcaption>
      </div>

      <h3 className="ds-h3">BFS — The Only Approach Needed</h3>
      <p className="ds-p">
        Level-order traversal processes one complete level at a time. By snapshotting{" "}
        <code className="ds-code">size = queue.size()</code> before the inner loop, we
        know exactly how many nodes belong to the current level. This lets us identify
        the first (<code className="ds-code">i == 0</code>) and last (
        <code className="ds-code">size == 0</code>) node of each level precisely.
      </p>

      <ol className="ds-steps">
        <li><div>Base case: <code className="ds-code">root == null → return empty list</code>.</div></li>
        <li><div>Create queue, offer root.</div></li>
        <li><div>While queue is not empty: snapshot <code className="ds-code">size = queue.size()</code>.</div></li>
        <li><div>Inner loop over <code className="ds-code">size</code> nodes: poll each, offer non-null left and right children.</div></li>
        <li>
          <div>
            <strong className="ds-strong">Right view:</strong> when <code className="ds-code">size == 0</code> after decrementing → this was the last node → add to result.
            <br/>
            <strong className="ds-strong">Left view:</strong> when <code className="ds-code">i == 0</code> → this is the first node → add to result.
          </div>
        </li>
      </ol>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Right View, Tree: [1, 2, 7, 3, 8, null, 9, 10]</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Level</th><th>Queue before</th><th>Nodes processed</th><th>Last node (added)</th></tr>
          </thead>
          <tbody>
            {[
              ["0","[1]","1 → push 2,7","1 ✓"],
              ["1","[2,7]","2 → push 3,8 | 7 → push 9","7 ✓"],
              ["2","[3,8,9]","3 → push 10 | 8 (no children) | 9 (no children)","9 ✓"],
              ["3","[10]","10 (no children)","10 ✓"],
            ].map(([lv,qb,proc,last]) => (
              <tr key={lv}>
                <td style={{color:tokens.accent5}}>{lv}</td>
                <td><code className="ds-code">{qb}</code></td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{proc}</td>
                <td style={{color:tokens.accent3,fontWeight:500}}>{last}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
          Right view = [1, 7, 9, 10] ✓
        </p>
      </div>

      <h3 className="ds-h3">Right Side View — Code</h3>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">rightSideView</span>(<span class="type">TreeNode</span> root) {
        <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

        <span class="type">Queue</span>&lt;<span class="type">TreeNode</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
        queue.<span class="fn">offer</span>(root);

        <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
            <span class="kw">int</span> size = queue.<span class="fn">size</span>(); <span class="cm">// nodes at this level</span>

            <span class="kw">while</span> (size &gt; <span class="num">0</span>) {
                <span class="type">TreeNode</span> node = queue.<span class="fn">poll</span>();
                <span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.<span class="fn">offer</span>(node.left);
                <span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.<span class="fn">offer</span>(node.right);
                size--;
                <span class="kw">if</span> (size == <span class="num">0</span>) res.<span class="fn">add</span>(node.val); <span class="cm">// last of this level</span>
            }
        }
        <span class="kw">return</span> res;
    }
}`
      }}/></pre>

      <h3 className="ds-h3">Left View — Code</h3>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Tree</span> {
    <span class="kw">public</span> <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">leftView</span>(<span class="type">Node</span> root) {
        <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

        <span class="type">Queue</span>&lt;<span class="type">Node</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
        queue.<span class="fn">offer</span>(root);

        <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
            <span class="kw">int</span> size = queue.<span class="fn">size</span>();

            <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; size; i++) {
                <span class="type">Node</span> node = queue.<span class="fn">poll</span>();
                <span class="kw">if</span> (i == <span class="num">0</span>) res.<span class="fn">add</span>(node.data); <span class="cm">// first of this level</span>
                <span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.<span class="fn">offer</span>(node.left);
                <span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.<span class="fn">offer</span>(node.right);
            }
        }
        <span class="kw">return</span> res;
    }
}`
      }}/></pre>

      <h3 className="ds-h3 green">Side-by-Side Diff — The Only Line That Changes</h3>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="cm">// Right View — add LAST node of each level</span>
size--;
<span class="kw">if</span> (size == <span class="num">0</span>) res.<span class="fn">add</span>(node.val);  <span class="cm">// ← after decrement, size==0 means last</span>

<span class="cm">// Left View — add FIRST node of each level</span>
<span class="kw">if</span> (i == <span class="num">0</span>) res.<span class="fn">add</span>(node.data);   <span class="cm">// ← i==0 means first node of the level</span>`
      }}/></pre>

      <div className="callout purple">
        <div className="callout-label">Author's Insight — Two implementations, one concept</div>
        Both approaches use the same BFS skeleton. The right view uses a{" "}
        <code className="ds-code">while (size &gt; 0)</code> inner loop — detecting the
        last node by checking <code className="ds-code">size == 0</code> after decrementing.
        The left view uses a <code className="ds-code">for (i = 0; i &lt; size; i++)</code>{" "}
        loop — detecting the first node via <code className="ds-code">i == 0</code>. Either
        loop style works for both problems — it's a stylistic choice.
      </div>

      <div className="callout warn">
        <div className="callout-label">For vs While inner loop — which to use?</div>
        Both are equivalent in complexity. The <code className="ds-code">for</code> loop is
        cleaner for left view (<code className="ds-code">i == 0</code> check is natural).
        The <code className="ds-code">while (size &gt; 0)</code> loop is slightly more
        natural for right view (<code className="ds-code">size == 0</code> after decrement).
        The author says: use <code className="ds-code">for</code> — it's cleaner and
        interviewers prefer it. The <code className="ds-code">while</code> version with
        manual <code className="ds-code">size--</code> looks messy.
      </div>

      <h3 className="ds-h3">Complexity</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Every node enqueued and dequeued exactly once"],
            ["Space","O(m)","m = max nodes on any single level (widest level)"],
            ["Space — perfect tree","O(n/2) ≈ O(n)","Last level holds n/2 nodes"],
            ["Space — skewed tree","O(1)","One node per level, queue never grows"],
          ].map(([m,v,r]) => (
            <tr key={m}>
              <td><strong className="ds-strong">{m}</strong></td>
              <td><span className={v==="O(n)"?"tc tc-n":"tc tc-log"}>{v}</span></td>
              <td style={{color:"#64748b",fontSize:13}}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout info">
        <div className="callout-label">Space is O(m), not O(n)</div>
        The queue never holds the entire tree — only one level at a time. The maximum
        queue size equals <strong className="ds-strong">m</strong>, the width of the
        widest level. For a perfect binary tree that's n/2 (worst case O(n)), but for
        skewed trees it's O(1). Always say O(m) or "width of the tree" in interviews.
      </div>
    </>
  ),
};