import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ2 = {
  id: "tiq2",
  labelText: "Question 02",
  labelColor: tokens.accent5,
  title: "Maximum Depth of N-ary Tree",
  navLabel: "Max Depth N-ary",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the <code className="ds-code">root</code> of an{" "}
        <strong className="ds-strong">N-ary tree</strong>, return its{" "}
        <strong className="ds-strong">maximum depth</strong> — the number of nodes along the
        longest path from the root down to the farthest leaf node.
      </div>

      <h3 className="ds-h3">Connection to Q1 — Binary → N-ary</h3>
      <p className="ds-p">
        If you solved Maximum Depth of Binary Tree (Q1), this is a{" "}
        <strong className="ds-strong">one-line modification</strong>. The only difference:
      </p>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Binary Tree (Q1)</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            At most <strong className="ds-strong">2 children</strong> (left, right).<br/>
            Formula: <code className="ds-code">1 + max(leftHeight, rightHeight)</code>
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>N-ary Tree (Q2)</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            <strong className="ds-strong">N children</strong> stored in a list.<br/>
            Formula: <code className="ds-code">1 + max(height of ALL children)</code>
          </p>
        </div>
      </div>
      <p className="ds-p">
        The recurrence is identical — just loop over{" "}
        <code className="ds-code">root.children</code> instead of checking{" "}
        <code className="ds-code">root.left</code> and <code className="ds-code">root.right</code>.
      </p>

      <h3 className="ds-h3">What is an N-ary Tree?</h3>
      <p className="ds-p">
        A tree where each node can have <strong className="ds-strong">any number of children</strong>,
        not limited to two. Children are stored in a{" "}
        <code className="ds-code">List&lt;Node&gt;</code>.
      </p>
      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 480 185">
          <line x1="240" y1="32" x2="100" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="240" y1="32" x2="240" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="240" y1="32" x2="380" y2="90" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="100" y1="92" x2="60" y2="150" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="100" y1="92" x2="140" y2="150" stroke="#252b3d" strokeWidth="1.5"/>
          <circle cx="240" cy="30" r="20" fill="#1a1f2e" stroke="#f43f5e" strokeWidth="2"/>
          <text x="240" y="35" textAnchor="middle" fill="#f43f5e" fontSize="13" fontFamily="JetBrains Mono">1</text>
          <text x="264" y="18" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">root · Level 0</text>
          <circle cx="100" cy="92" r="20" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
          <text x="100" y="97" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">3</text>
          <circle cx="240" cy="92" r="20" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
          <text x="240" y="97" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">2</text>
          <circle cx="380" cy="92" r="20" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
          <text x="380" y="97" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">4</text>
          <text x="8" y="97" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Level 1</text>
          <circle cx="60" cy="152" r="20" fill="#1a1f2e" stroke="#10b981" strokeWidth="1.5"/>
          <text x="60" y="157" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="JetBrains Mono">5</text>
          <circle cx="140" cy="152" r="20" fill="#1a1f2e" stroke="#10b981" strokeWidth="1.5"/>
          <text x="140" y="157" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="JetBrains Mono">6</text>
          <text x="8" y="157" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Level 2</text>
          <text x="175" y="120" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">3 children of root</text>
          <text x="52" y="178" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">2 children of node 3</text>
        </svg>
        <figcaption>
          Root(1) has 3 children [3,2,4]. Node 3 has 2 children [5,6].
          Max depth = 3 (path: 1→3→5 or 1→3→6).
        </figcaption>
      </div>

      <h3 className="ds-h3">Algorithm — DFS (Recursive Post-order)</h3>
      <p className="ds-p">
        Same post-order logic as Q1. For every node: recurse into{" "}
        <strong className="ds-strong">each child</strong>, track the deepest one found,
        then return <code className="ds-code">1 + maxChildDepth</code>.
      </p>

      <ol className="ds-steps">
        <li><div>Base case: <code className="ds-code">root == null</code> → return <code className="ds-code">0</code>.</div></li>
        <li><div>Initialize <code className="ds-code">maxDepth = 0</code> — tracks the deepest child seen so far.</div></li>
        <li><div>Loop over <code className="ds-code">root.children</code>. For each non-null child, recurse and update <code className="ds-code">maxDepth</code> if larger.</div></li>
        <li><div>Return <code className="ds-code">1 + maxDepth</code> (current node + deepest subtree).</div></li>
      </ol>

      <div className="callout warn">
        <div className="callout-label">Author's Tip — Always null-check children</div>
        Even if the problem guarantees children are non-null, in production code{" "}
        <strong className="ds-strong">null-checking is non-negotiable</strong>. A
        NullPointerException from skipping a null-check is a sign of sloppy engineering.
        The author makes this a personal rule — always check{" "}
        <code className="ds-code">if (node != null)</code> before accessing any field.
      </div>

      <div className="trick-box">
        <div className="trick-title">
          DFS Dry Run — root=1, children=[3,2,4], node3.children=[5,6]
        </div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>Call</th>
              <th>Node</th>
              <th>Children looped</th>
              <th>maxDepth after loop</th>
              <th>Returns</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["maxDepth(null)","null","—","—","0  ← base case"],
              ["maxDepth(5)","5","[] (leaf)","0","1 + 0 = 1"],
              ["maxDepth(6)","6","[] (leaf)","0","1 + 0 = 1"],
              ["maxDepth(3)","3","5→1, 6→1","max(1,1) = 1","1 + 1 = 2"],
              ["maxDepth(2)","2","[] (leaf)","0","1 + 0 = 1"],
              ["maxDepth(4)","4","[] (leaf)","0","1 + 0 = 1"],
              ["maxDepth(1) root","1","3→2, 2→1, 4→1","max(2,1,1) = 2","1 + 2 = 3 ✓"],
            ].map(([call,node,ch,mx,ret]) => (
              <tr key={call}>
                <td style={{fontSize:11}}><code className="ds-code">{call}</code></td>
                <td style={{color:"#f43f5e"}}>{node}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{ch}</td>
                <td style={{color:tokens.accent,fontSize:12}}>{mx}</td>
                <td style={{color:tokens.accent3,fontWeight:500,fontSize:12}}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
          Answer = <code className="ds-code">3</code> ✓
        </p>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public int</span> <span class="fn">maxDepth</span>(<span class="type">Node</span> root) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>;

        <span class="kw">int</span> maxDepth = <span class="num">0</span>; <span class="cm">// deepest child found so far</span>

        <span class="kw">for</span> (<span class="type">Node</span> node : root.children) {
            <span class="kw">if</span> (node != <span class="kw">null</span>) { <span class="cm">// null-check: production habit</span>
                maxDepth = Math.<span class="fn">max</span>(maxDepth, <span class="fn">maxDepth</span>(node));
            }
        }

        <span class="kw">return</span> (<span class="num">1</span> + maxDepth); <span class="cm">// current node + deepest child</span>
    }
}`}}/></pre>

      <h3 className="ds-h3">Recursion Stack Space — Deep Dive</h3>
      <p className="ds-p">
        The author spends time on this because it's a{" "}
        <strong className="ds-strong">favourite interview follow-up</strong>:{" "}
        <em>"What is your space complexity and why?"</em> The max number of stack frames
        alive at once = the deepest path currently being traversed ={" "}
        <strong className="ds-strong">the height of the tree</strong>.
      </p>

      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.danger}` }}>
          <h4 className="ds-h4" style={{ color: tokens.danger }}>Skewed Tree — worst case</h4>
          <p className="ds-p" style={{ color: "#c8d3e0" }}>
            Every node has exactly 1 child → chain of n nodes → height = n.
            All n frames on the stack at once.
          </p>
          <div className="formula" style={{ fontSize: 12, textAlign: "left" }}>
            Stack depth = n → Space = <strong>O(n)</strong>
          </div>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Balanced Tree — best case</h4>
          <p className="ds-p" style={{ color: "#c8d3e0" }}>
            Nodes spread evenly → height = log n. At any moment only log n
            frames are on the stack simultaneously.
          </p>
          <div className="formula" style={{ fontSize: 12, textAlign: "left" }}>
            Stack depth = log n → Space = <strong>O(log n)</strong>
          </div>
        </div>
      </div>

      <div className="callout proof">
        <div className="callout-label">The Key Insight — Stack depth = height, not node count</div>
        The recursion stack holds one frame per level of the <em>current path</em> being
        explored. It never holds all n nodes at once unless the tree is fully skewed.
        Maximum simultaneous frames = height of tree = h.
        <br/><br/>
        <strong className="ds-strong">General rule:</strong> Space = O(h).
        For skewed h = n, for balanced h = log n.
      </div>

      <div className="trick-box">
        <div className="trick-title">Visual — Skewed (n=5) vs Balanced (n=4): max stack depth at any moment</div>
        <div className="diagram-wrap" style={{ marginTop: 12 }}>
          <svg width="100%" viewBox="0 0 500 210">
            <text x="10" y="18" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">SKEWED — all 5 frames on stack at once</text>
            <line x1="60" y1="38" x2="60" y2="68" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="60" y1="78" x2="60" y2="108" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="60" y1="118" x2="60" y2="148" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="60" y1="158" x2="60" y2="188" stroke="#252b3d" strokeWidth="1.5"/>
            {[["1",28],["2",68],["3",108],["4",148],["5",188]].map(([v,cy]) => (
              <g key={v}>
                <circle cx="60" cy={cy} r="16" fill="#1a1f2e" stroke={tokens.danger} strokeWidth="1.5"/>
                <text x="60" y={cy+5} textAnchor="middle" fill={tokens.danger} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
              </g>
            ))}
            <rect x="104" y="24" width="32" height="180" fill="none" stroke="#252b3d" strokeWidth="1" rx="3"/>
            {[["5",172],["4",140],["3",108],["2",76],["1",44]].map(([v,y]) => (
              <g key={v}>
                <rect x="105" y={y} width="30" height="26" fill={`${tokens.danger}22`} stroke={tokens.danger} strokeWidth="0.8" rx="2"/>
                <text x="120" y={y+17} textAnchor="middle" fill={tokens.danger} fontSize="10" fontFamily="JetBrains Mono">{v}</text>
              </g>
            ))}
            <text x="108" y="17" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">stack</text>

            <text x="270" y="18" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">BALANCED — only 3 frames at once</text>
            <line x1="355" y1="42" x2="310" y2="92" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="355" y1="42" x2="400" y2="92" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="310" y1="102" x2="288" y2="152" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="310" y1="102" x2="332" y2="152" stroke="#252b3d" strokeWidth="1.5"/>
            {[["1",355,28],["2",310,92],["3",400,92],["4",288,152],["5",332,152]].map(([v,cx,cy]) => (
              <g key={`b${v}`}>
                <circle cx={cx} cy={cy} r="16" fill="#1a1f2e" stroke={tokens.accent3} strokeWidth="1.5"/>
                <text x={cx} y={cy+5} textAnchor="middle" fill={tokens.accent3} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
              </g>
            ))}
            <rect x="440" y="96" width="32" height="110" fill="none" stroke="#252b3d" strokeWidth="1" rx="3"/>
            {[["4",178],["2",148],["1",118]].map(([v,y]) => (
              <g key={`bs${v}`}>
                <rect x="441" y={y} width="30" height="26" fill={`${tokens.accent3}22`} stroke={tokens.accent3} strokeWidth="0.8" rx="2"/>
                <text x="456" y={y+17} textAnchor="middle" fill={tokens.accent3} fontSize="10" fontFamily="JetBrains Mono">{v}</text>
              </g>
            ))}
            <text x="444" y="90" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">stack</text>
          </svg>
          <figcaption>
            Left: skewed tree — all 5 frames live simultaneously = O(n).
            Right: balanced tree — only 3 frames (= height = log n) at once = O(log n).
          </figcaption>
        </div>
      </div>

      <h3 className="ds-h3 green">Complexity Summary</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Every node visited once (going down + returning up = 2n = O(n))"],
            ["Space — skewed","O(n)","Stack depth = n (all nodes in a single chain)"],
            ["Space — balanced","O(log n)","Stack depth = height = log n"],
            ["Space — general","O(h)","h = height; h ∈ [log n, n]"],
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
        <div className="callout-label">Interview Answer the Author Recommends</div>
        <em>"Time is O(n) — every node visited once. Space is O(h) where h is the height.
        Worst case O(n) for a skewed tree, best case O(log n) for a balanced tree."</em>
        <br/><br/>
        This shows you understand that space depends on the{" "}
        <strong className="ds-strong">shape of the tree</strong>, not just node count.
        That distinction is exactly what interviewers are listening for.
      </div>

      <h3 className="ds-h3">Q1 vs Q2 — The Only Code Difference</h3>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="cm">// Q1 — Binary Tree: exactly 2 named children</span>
<span class="kw">int</span> lh = <span class="fn">maxDepth</span>(root.left);
<span class="kw">int</span> rh = <span class="fn">maxDepth</span>(root.right);
<span class="kw">return</span> (<span class="num">1</span> + Math.<span class="fn">max</span>(lh, rh));

<span class="cm">// Q2 — N-ary Tree: N children in a list, loop over all</span>
<span class="kw">int</span> maxDepth = <span class="num">0</span>;
<span class="kw">for</span> (<span class="type">Node</span> node : root.children) {
    <span class="kw">if</span> (node != <span class="kw">null</span>)
        maxDepth = Math.<span class="fn">max</span>(maxDepth, <span class="fn">maxDepth</span>(node));
}
<span class="kw">return</span> (<span class="num">1</span> + maxDepth);`}}/></pre>
    </>
  ),
};
