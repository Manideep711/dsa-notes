import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ7 = {
  id: "tiq7",
  labelText: "Question 07",
  labelColor: tokens.accent5,
  title: "Cousins in a Binary Tree",
  navLabel: "Cousins in Tree",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the root of a binary tree with unique values, and two node values{" "}
        <code className="ds-code">x</code> and <code className="ds-code">y</code>, return{" "}
        <code className="ds-code">true</code> if the corresponding nodes are{" "}
        <strong className="ds-strong">cousins</strong>.
      </div>

      <h3 className="ds-h3">What are Cousins?</h3>
      <p className="ds-p">
        Two nodes are cousins if they satisfy{" "}
        <strong className="ds-strong">both</strong> conditions:
      </p>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Condition 1 — Same Depth</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Both nodes must be on the <strong className="ds-strong">same level</strong>{" "}
            (depth) of the tree. Root is depth 0, its children depth 1, and so on.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>Condition 2 — Different Parents</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Both nodes must have <strong className="ds-strong">different parent nodes</strong>.
            Same level but same parent = siblings, not cousins.
          </p>
        </div>
      </div>

      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 440 200">
          <line x1="220" y1="30" x2="130" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="220" y1="30" x2="310" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="130" y1="90" x2="85"  y2="155" stroke={tokens.accent3} strokeWidth="2.5"/>
          <line x1="130" y1="90" x2="175" y2="155" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="310" y1="90" x2="310" y2="155" stroke={tokens.accent3} strokeWidth="2.5"/>
          {[["7",220,22,"#3b82f6"],["1",130,82,"#3b82f6"],["2",310,82,"#3b82f6"],
            ["3",85,148,tokens.accent3],["4",175,148,"#64748b"],["5",310,148,tokens.accent3]
          ].map(([v,cx,cy,col]) => (
            <g key={cx+cy}>
              <circle cx={cx} cy={cy} r="20" fill="#1a1f2e" stroke={col} strokeWidth={col===tokens.accent3?2.5:1.5}/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="13" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          <text x="10" y="168" fill={tokens.accent3} fontSize="10" fontFamily="JetBrains Mono">3 &amp; 5 → cousins ✓ (same level, diff parents)</text>
          <text x="10" y="185" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">3 &amp; 4 → siblings ✗ (same level, same parent=1)</text>
        </svg>
        <figcaption>Nodes 3 and 5: same depth (level 2), different parents (1 and 2) → cousins. Nodes 3 and 4: same parent (1) → siblings, not cousins.</figcaption>
      </div>

      <h3 className="ds-h3">Why BFS?</h3>
      <p className="ds-p">
        The problem is fundamentally about <strong className="ds-strong">levels</strong> —
        we need to check if both nodes appear on the same level. BFS processes the tree
        level by level, so at any point in the inner loop we are guaranteed to be looking
        at nodes from exactly one level. This makes the same-depth check trivial.
      </p>

      <h3 className="ds-h3">Two Tracking Variables</h3>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>childCount</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Global counter across the entire level. How many of x or y have been found
            so far on this level. If it hits 2 → both found same level →
            check parent condition.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.danger}` }}>
          <h4 className="ds-h4" style={{ color: tokens.danger }}>sameParentCount</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Reset for <strong className="ds-strong">each parent node</strong> we process.
            If both x and y are children of the same parent, this hits 2 →
            return false immediately (siblings, not cousins).
          </p>
        </div>
      </div>

      <div className="callout warn">
        <div className="callout-label">Key Insight — Check parent before moving to next level</div>
        We look at <em>children</em> while processing the <em>parent</em>. This is the
        trick: when we pop a node from the queue, we inspect its left and right children
        to see if they match x or y. If both match from the same parent →{" "}
        <code className="ds-code">sameParentCount == 2</code> → siblings → return false
        immediately, before even finishing the level.
      </div>

      <h3 className="ds-h3">Algorithm</h3>
      <ol className="ds-steps">
        <li><div>Base case: <code className="ds-code">root == null → return false</code>.</div></li>
        <li><div>Create a queue, offer root. Initialize <code className="ds-code">childCount = 0</code>.</div></li>
        <li><div>BFS level loop. For each node popped, reset <code className="ds-code">sameParentCount = 0</code>.</div></li>
        <li><div>Check left child: if it matches x or y → increment both <code className="ds-code">sameParentCount</code> and <code className="ds-code">childCount</code>. Then offer it to the queue.</div></li>
        <li><div>Same for right child.</div></li>
        <li><div>After processing a node: if <code className="ds-code">sameParentCount == 2</code> → siblings → <code className="ds-code">return false</code>.</div></li>
        <li><div>After the level (inner for loop) ends: if <code className="ds-code">childCount == 2</code> → both found, different parents → <code className="ds-code">return true</code>. If <code className="ds-code">childCount == 1</code> → one found, other is on a different level → <code className="ds-code">return false</code>.</div></li>
      </ol>

      <div className="trick-box">
        <div className="trick-title">Dry Run — x=3, y=5, Tree: [7, 1, 2, 3, 4, null, 5]</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Level</th><th>Node popped</th><th>Left child</th><th>Right child</th><th>sameParentCount</th><th>childCount</th><th>Action</th></tr>
          </thead>
          <tbody>
            {[
              ["0","7","1 (no match)","2 (no match)","0","0","continue"],
              ["—","end of level","—","—","—","childCount=0","move to next level"],
              ["1","1","3 ✓ match x","4 (no match)","1","1","sameParentCount<2, continue"],
              ["1","2","no left","5 ✓ match y","1","2","sameParentCount<2, continue"],
              ["—","end of level","—","—","—","childCount=2","return true ✓"],
            ].map(([lv,node,lc,rc,spc,cc,act]) => (
              <tr key={node+lv}>
                <td style={{color:tokens.accent5}}>{lv}</td>
                <td style={{color:"#c8d3e0"}}>{node}</td>
                <td style={{color:tokens.accent3,fontSize:12}}>{lc}</td>
                <td style={{color:tokens.accent3,fontSize:12}}>{rc}</td>
                <td style={{color:tokens.accent,fontSize:12}}>{spc}</td>
                <td style={{color:tokens.accent2,fontSize:12,fontWeight:500}}>{cc}</td>
                <td style={{color:"#64748b",fontSize:12}}>{act}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{ color: tokens.accent3, marginTop: 10, marginBottom: 0 }}>
          childCount == 2 and sameParentCount never hit 2 → <strong>return true</strong> ✓
        </p>
      </div>

      <div className="trick-box">
        <div className="trick-title">Sibling Case — x=3, y=4 (same parent, should return false)</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Node popped</th><th>Left child</th><th>Right child</th><th>sameParentCount</th><th>Action</th></tr>
          </thead>
          <tbody>
            {[
              ["7","1 (no match)","2 (no match)","0","continue"],
              ["1","3 ✓ match x","4 ✓ match y","2","return false immediately ✗"],
            ].map(([node,lc,rc,spc,act]) => (
              <tr key={node}>
                <td style={{color:"#c8d3e0"}}>{node}</td>
                <td style={{color:tokens.accent3,fontSize:12}}>{lc}</td>
                <td style={{color:tokens.accent3,fontSize:12}}>{rc}</td>
                <td style={{color:tokens.danger,fontSize:12,fontWeight:500}}>{spc}</td>
                <td style={{color:tokens.danger,fontSize:12}}>{act}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public boolean</span> <span class="fn">isCousins</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> x, <span class="kw">int</span> y) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return false</span>;

        <span class="type">Queue</span>&lt;<span class="type">TreeNode</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
        queue.<span class="fn">offer</span>(root);
        <span class="kw">int</span> childCount = <span class="num">0</span>; <span class="cm">// how many of x,y found this level</span>

        <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
            <span class="kw">int</span> size = queue.<span class="fn">size</span>();

            <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; size; i++) {
                <span class="type">TreeNode</span> node = queue.<span class="fn">poll</span>();
                <span class="kw">int</span> sameParentCount = <span class="num">0</span>; <span class="cm">// reset per parent node</span>

                <span class="kw">if</span> (node.left != <span class="kw">null</span>) {
                    <span class="kw">if</span> (node.left.val == x || node.left.val == y) {
                        sameParentCount++;
                        childCount++;
                    }
                    queue.<span class="fn">offer</span>(node.left);
                }
                <span class="kw">if</span> (node.right != <span class="kw">null</span>) {
                    <span class="kw">if</span> (node.right.val == x || node.right.val == y) {
                        sameParentCount++;
                        childCount++;
                    }
                    queue.<span class="fn">offer</span>(node.right);
                }

                <span class="cm">// both x and y have same parent → siblings, not cousins</span>
                <span class="kw">if</span> (sameParentCount == <span class="num">2</span>) <span class="kw">return false</span>;
            }

            <span class="cm">// end of level — evaluate childCount</span>
            <span class="kw">if</span> (childCount == <span class="num">2</span>) <span class="kw">return true</span>;  <span class="cm">// both found, diff parents</span>
            <span class="kw">if</span> (childCount == <span class="num">1</span>) <span class="kw">return false</span>; <span class="cm">// one found, other on diff level</span>
        }
        <span class="kw">return false</span>;
    }
}`
      }}/></pre>

      <div className="callout purple">
        <div className="callout-label">Why childCount == 1 means false</div>
        If only one of x or y is found after completing an entire level, the other node
        must be on a different level — so they can never be cousins (different depth).
        Return false immediately rather than continuing the BFS.
      </div>

      <h3 className="ds-h3">Complexity</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Worst case: traverse all nodes to find x and y on last level"],
            ["Space","O(k)","k = max nodes on any single level (widest level of tree)"],
            ["Space — perfect tree","O(n/2) ≈ O(n)","Last level has n/2 nodes, all in queue simultaneously"],
            ["Space — skewed tree","O(1)","Only one node per level, queue never holds more than 1"],
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
        <div className="callout-label">Author's note on space complexity</div>
        For BFS the correct answer is <strong className="ds-strong">O(k)</strong> where k
        is the maximum number of nodes on any level — not O(n). For a perfect binary tree
        the last level alone holds n/2 nodes, making it O(n) in the worst case. For a
        skewed tree it's O(1). Always state it as O(k) in interviews — it shows you
        understand that queue space depends on tree width, not total node count.
      </div>
    </>
  ),
};