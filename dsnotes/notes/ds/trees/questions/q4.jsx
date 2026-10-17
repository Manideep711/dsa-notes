import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ4 = {
  id: "tiq4",
  labelText: "Question 04",
  labelColor: tokens.accent5,
  title: "Diameter of N-ary Tree",
  navLabel: "Diameter N-ary",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the <code className="ds-code">root</code> of an N-ary tree, return the{" "}
        <strong className="ds-strong">length of the diameter</strong> — the longest path
        between any two nodes. The path may or may not pass through the root.
        Length = number of <strong className="ds-strong">edges</strong>.
      </div>

      <h3 className="ds-h3">Connection to Q3 — Binary → N-ary Diameter</h3>
      <p className="ds-p">
        In Q3 (Binary Tree Diameter), each node had exactly two subtrees — left and right.
        We computed <code className="ds-code">leftHeight + rightHeight</code> as the diameter
        candidate at each turning point.
      </p>
      <p className="ds-p">
        Here each node has <strong className="ds-strong">N children</strong>. The longest
        path through any node still bends at exactly two directions — the{" "}
        <strong className="ds-strong">two deepest subtrees</strong>. So the formula becomes:
      </p>
      <div className="formula">
        <div className="formula-label">Diameter candidate at any turning point</div>
        h1 + h2 &nbsp;(top-2 heights among all children)
      </div>
      <div className="callout proof">
        <div className="callout-label">Why only top-2 heights?</div>
        A path bends at exactly one node and goes down two branches. No matter how many
        children exist, the longest path through a node always picks the{" "}
        <strong className="ds-strong">deepest child</strong> on one side and the{" "}
        <strong className="ds-strong">second deepest</strong> on the other. All other
        children are irrelevant for the diameter candidate at that node.
      </div>

      <h3 className="ds-h3">The h1 / h2 Tracking Trick</h3>
      <p className="ds-p">
        As we loop over children, we maintain two variables:{" "}
        <strong className="ds-strong">h1</strong> = tallest child height seen so far,{" "}
        <strong className="ds-strong">h2</strong> = second tallest. Three cases when a
        new height <code className="ds-code">h</code> arrives:
      </p>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Case 1: h &gt; h1</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            New tallest found. Old h1 drops to h2, new h becomes h1.
            <br/>
            <code className="ds-code">h2 = h1; h1 = h;</code>
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Case 2: h &gt; h2</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Not tallest but beats second. Only h2 updates.
            <br/>
            <code className="ds-code">h2 = h;</code>
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.muted}`, gridColumn: "1/-1" }}>
          <h4 className="ds-h4" style={{ color: tokens.muted }}>Case 3: h ≤ h2</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Shorter than both. Neither h1 nor h2 changes. Ignore.
          </p>
        </div>
      </div>

      <div className="trick-box">
        <div className="trick-title">h1 / h2 Walk-through with values [3, 1, 5]</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>h arrives</th><th>h &gt; h1?</th><th>h &gt; h2?</th><th>h1 after</th><th>h2 after</th></tr>
          </thead>
          <tbody>
            {[
              ["3", "3 > 0 ✓", "—", "3", "0"],
              ["1", "1 > 3 ✗", "1 > 0 ✓", "3", "1"],
              ["5", "5 > 3 ✓", "—", "5", "3"],
            ].map(([h, c1, c2, h1, h2]) => (
              <tr key={h}>
                <td style={{ color: tokens.accent5 }}>{h}</td>
                <td style={{ color: "#c8d3e0", fontSize: 12 }}>{c1}</td>
                <td style={{ color: "#c8d3e0", fontSize: 12 }}>{c2}</td>
                <td style={{ color: tokens.accent3, fontWeight: 500 }}>{h1}</td>
                <td style={{ color: tokens.accent2, fontWeight: 500 }}>{h2}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{ color: tokens.accent3, marginTop: 8, marginBottom: 0 }}>
          h1 + h2 = 5 + 3 = 8 → diameter candidate at this node
        </p>
      </div>

      <h3 className="ds-h3">Algorithm</h3>
      <ol className="ds-steps">
        <li><div>Create <code className="ds-code">int[] maxi = new int[1]</code> (pass-by-reference, same trick as Q3).</div></li>
        <li><div>Call <code className="ds-code">findHeight(root, maxi)</code> — post-order DFS over all nodes.</div></li>
        <li><div>Base case: <code className="ds-code">root == null → return 0</code>.</div></li>
        <li><div>Initialize <code className="ds-code">h1 = h2 = 0</code>. Loop over all children, recurse for each, update h1/h2 with the 3-case logic above.</div></li>
        <li><div>Update <code className="ds-code">maxi[0] = max(maxi[0], h1 + h2)</code>.</div></li>
        <li><div>Return <code className="ds-code">1 + h1</code> — height of this subtree (h1 is the tallest child, so this is the longest path going up).</div></li>
        <li><div>After recursion, <code className="ds-code">maxi[0]</code> is the answer.</div></li>
      </ol>

      <div className="trick-box">
        <div className="trick-title">
          Dry Run — root=1, children=[3,2,4], node3.children=[5,6]
        </div>
        <div className="diagram-wrap" style={{ marginTop: 12 }}>
          <svg width="100%" viewBox="0 0 440 185">
            <line x1="220" y1="30" x2="100" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="220" y1="30" x2="220" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="220" y1="30" x2="340" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="100" y1="90" x2="60"  y2="152" stroke="#f43f5e" strokeWidth="2"/>
            <line x1="100" y1="90" x2="140" y2="152" stroke="#f43f5e" strokeWidth="2"/>
            <circle cx="220" cy="30"  r="18" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="220" y="35"  textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">1</text>
            <circle cx="100" cy="92"  r="18" fill="#1a1f2e" stroke="#f43f5e" strokeWidth="2"/>
            <text x="100" y="97"  textAnchor="middle" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono">3</text>
            <circle cx="220" cy="92"  r="18" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="220" y="97"  textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">2</text>
            <circle cx="340" cy="92"  r="18" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="340" y="97"  textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">4</text>
            <circle cx="60"  cy="155" r="18" fill="#1a1f2e" stroke="#f43f5e" strokeWidth="2"/>
            <text x="60"  y="160" textAnchor="middle" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono">5</text>
            <circle cx="140" cy="155" r="18" fill="#1a1f2e" stroke="#f43f5e" strokeWidth="2"/>
            <text x="140" y="160" textAnchor="middle" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono">6</text>
            <text x="165" y="178" fill="#f43f5e" fontSize="9" fontFamily="JetBrains Mono">diameter path: 5→3→1→2 or 6→3→1→2 (3 edges)</text>
          </svg>
          <figcaption>Red path passes through node 3 (h1+h2=1+1=2) and node 1 (h1=2 from node3, h2=1 from node2, candidate=3).</figcaption>
        </div>
        <table className="ds-tbl" style={{ marginTop: 14 }}>
          <thead>
            <tr><th>Call</th><th>Node</th><th>h1</th><th>h2</th><th>h1+h2</th><th>maxi[0]</th><th>Returns</th></tr>
          </thead>
          <tbody>
            {[
              ["findHeight(5,…)","5","0","0","0","0","1"],
              ["findHeight(6,…)","6","0","0","0","0","1"],
              ["findHeight(3,…)","3","1←5","1←6","1+1=2","max(0,2)=2","1+1=2"],
              ["findHeight(2,…)","2","0","0","0","2","1"],
              ["findHeight(4,…)","4","0","0","0","2","1"],
              ["findHeight(1,…)","1","2←3","1←2","2+1=3","max(2,3)=3","1+2=3"],
            ].map(([call,node,h1,h2,sum,mx,ret]) => (
              <tr key={call}>
                <td style={{fontSize:10}}><code className="ds-code">{call}</code></td>
                <td style={{color:"#f43f5e"}}>{node}</td>
                <td style={{color:tokens.accent3,fontSize:12}}>{h1}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{h2}</td>
                <td style={{color:tokens.accent,fontSize:12}}>{sum}</td>
                <td style={{color:tokens.accent3,fontWeight:500,fontSize:12}}>{mx}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{ color: tokens.accent3, marginTop: 10, marginBottom: 0 }}>
          <code className="ds-code">maxi[0] = 3</code> ✓
        </p>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public int</span> <span class="fn">diameter</span>(<span class="type">Node</span> root) {
        <span class="kw">int</span>[] maxi = <span class="kw">new int</span>[<span class="num">1</span>]; <span class="cm">// pass-by-reference trick (same as Q3)</span>
        <span class="fn">findHeight</span>(root, maxi);
        <span class="kw">return</span> maxi[<span class="num">0</span>];
    }

    <span class="kw">public int</span> <span class="fn">findHeight</span>(<span class="type">Node</span> root, <span class="kw">int</span>[] maxi) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>;

        <span class="kw">int</span> h1 = <span class="num">0</span>, h2 = <span class="num">0</span>; <span class="cm">// top-2 child heights</span>

        <span class="kw">for</span> (<span class="type">Node</span> node : root.children) {
            <span class="kw">int</span> h = <span class="fn">findHeight</span>(node, maxi);
            <span class="kw">if</span> (h &gt; h1) {
                h2 = h1; h1 = h;      <span class="cm">// new tallest — shift down</span>
            } <span class="kw">else if</span> (h &gt; h2) {
                h2 = h;               <span class="cm">// new second tallest</span>
            }
            <span class="cm">// else: shorter than both, ignore</span>
        }

        maxi[<span class="num">0</span>] = Math.<span class="fn">max</span>(maxi[<span class="num">0</span>], h1 + h2); <span class="cm">// this node as turning point</span>
        <span class="kw">return</span> (<span class="num">1</span> + h1);                          <span class="cm">// height = 1 + tallest child</span>
    }
}`
      }}/></pre>

      <div className="callout warn">
        <div className="callout-label">Why return 1 + h1 and not 1 + max(h1, h2)?</div>
        <code className="ds-code">h1</code> is <em>always</em> ≥ <code className="ds-code">h2</code>{" "}
        by construction — the 3-case logic guarantees it. So{" "}
        <code className="ds-code">max(h1, h2) == h1</code> always. Writing{" "}
        <code className="ds-code">1 + h1</code> is shorter and equally correct.
      </div>

      <div className="callout purple">
        <div className="callout-label">Author's Insight — Same pattern, minimal change from Q3</div>
        Q3 used <code className="ds-code">leftHeight</code> and <code className="ds-code">rightHeight</code>{" "}
        — exactly two values, always available. Q4 replaces them with{" "}
        <code className="ds-code">h1</code> and <code className="ds-code">h2</code> — the top-2
        heights extracted from N children via a loop. The diameter formula{" "}
        <code className="ds-code">h1 + h2</code> and the return value{" "}
        <code className="ds-code">1 + h1</code> are structurally identical to Q3's{" "}
        <code className="ds-code">lH + rH</code> and <code className="ds-code">1 + max(lH, rH)</code>.
      </div>

      <h3 className="ds-h3 green">Q3 vs Q4 — The Exact Difference</h3>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="cm">// Q3: Binary Tree — two named children</span>
<span class="kw">int</span> lH = <span class="fn">findHeight</span>(root.left,  maxi);
<span class="kw">int</span> rH = <span class="fn">findHeight</span>(root.right, maxi);
maxi[<span class="num">0</span>] = Math.<span class="fn">max</span>(maxi[<span class="num">0</span>], lH + rH);
<span class="kw">return</span> (<span class="num">1</span> + Math.<span class="fn">max</span>(lH, rH));

<span class="cm">// Q4: N-ary Tree — loop, track top-2 heights</span>
<span class="kw">int</span> h1 = <span class="num">0</span>, h2 = <span class="num">0</span>;
<span class="kw">for</span> (<span class="type">Node</span> node : root.children) {
    <span class="kw">int</span> h = <span class="fn">findHeight</span>(node, maxi);
    <span class="kw">if</span> (h &gt; h1)      { h2 = h1; h1 = h; }
    <span class="kw">else if</span> (h &gt; h2) { h2 = h; }
}
maxi[<span class="num">0</span>] = Math.<span class="fn">max</span>(maxi[<span class="num">0</span>], h1 + h2);
<span class="kw">return</span> (<span class="num">1</span> + h1);`
      }}/></pre>

      <h3 className="ds-h3">Complexity</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Every node visited once — the for loop across all children sums to n total iterations"],
            ["Space — balanced","O(log n)","Stack depth = height of tree"],
            ["Space — skewed","O(n)","Stack depth = n (chain of single-child nodes)"],
            ["Extra space","O(1)","Only h1, h2, h locals + maxi[1] — all constant"],
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
        <div className="callout-label">Total iterations across all for-loops = n</div>
        Even though every node runs a <code className="ds-code">for</code> loop over its
        children, each child is visited by exactly one parent's loop. The total number of
        child-visits across the entire tree equals the total number of edges = n − 1 =
        O(n). Not O(n²).
      </div>
    </>
  ),
};