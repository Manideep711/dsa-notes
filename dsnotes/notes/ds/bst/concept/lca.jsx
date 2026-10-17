import React from "react";
import { tokens } from "../../../../tokens";

export const bstLcaTab = {
  id: "bstLca",
  label: "LCA in BST",
  colorVar: tokens.accent5,
  sections: [
    // ─── Section 01 ────────────────────────────────────────────────────────
    {
      id: "bstlca1",
      labelText: "Section 01",
      labelColor: tokens.accent5,
      title: "Lowest Common Ancestor in a BST — Problem & Recap",
      navLabel: "Problem & Recap",
      render: () => (
        <>
          <div className="callout info">
            <div className="callout-label">Problem</div>
            Given a BST and two nodes p and q, find their{" "}
            <strong className="ds-strong">lowest common ancestor (LCA)</strong>.
          </div>

          <h3 className="ds-h3">Recap — LCA Definition (from general binary trees)</h3>
          <p className="ds-p">
            Trace each node's path from the root. The{" "}
            <strong className="ds-strong">last common node</strong> in both paths (going
            top-down), or equivalently the{" "}
            <strong className="ds-strong">first common node</strong> (going bottom-up
            from each node toward the root), is the LCA. A node can be its own ancestor —
            if one target lies directly on the path to the other, the ancestor itself is
            the LCA.
          </p>

          <div className="callout warn">
            <div className="callout-label">This problem is specifically about BSTs</div>
            The general binary-tree LCA technique (covered separately) works here too,
            but ignores the ordering property entirely. Since this is a BST, there's a
            much faster, more direct technique available.
          </div>
        </>
      ),
    },

    // ─── Section 02 ────────────────────────────────────────────────────────
    {
      id: "bstlca2",
      labelText: "Section 02",
      labelColor: tokens.accent5,
      title: "The Core Insight — Find the Splitting Point",
      navLabel: "The Splitting Point Insight",
      render: () => (
        <>
          <p className="ds-p">
            In a BST, as we search for both p and q simultaneously, both values will
            initially move in the{" "}
            <strong className="ds-strong">same direction</strong> (both left, or both
            right) relative to each node we visit — because the BST property fully
            determines which side a value belongs on. The moment they{" "}
            <strong className="ds-strong">diverge</strong> — one smaller, one larger
            than the current node — that node is the{" "}
            <strong className="ds-strong">split point</strong>, and it's exactly the LCA.
          </p>

          <div className="prop-grid">
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Both p, q &lt; current node</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                Both targets must be in the left subtree. No splitting yet — recurse left.
              </p>
            </div>
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Both p, q &gt; current node</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                Both targets must be in the right subtree. No splitting yet — recurse right.
              </p>
            </div>
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}`, gridColumn: "1/-1" }}>
              <h4 className="ds-h4" style={{ color: tokens.accent5 }}>One smaller, one larger (or one matches current node)</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                The paths have just diverged — this node is the splitting point, and
                therefore the LCA. Stop and return it immediately.
              </p>
            </div>
          </div>

          <div className="diagram-wrap">
            <svg width="100%" viewBox="0 0 440 200">
              <line x1="220" y1="20" x2="220" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="220" y1="80" x2="220" y2="140" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="220" y1="140" x2="160" y2="180" stroke={tokens.accent5} strokeWidth="2.5"/>
              <line x1="220" y1="140" x2="280" y2="180" stroke={tokens.accent5} strokeWidth="2.5"/>
              {[
                ["8",220,20,"#64748b"],["9",220,82,"#64748b"],["13",220,142,tokens.accent5],
                ["11",160,182,tokens.accent2],["14",280,182,tokens.accent3],
              ].map(([v,cx,cy,col]) => (
                <g key={cx+""+cy}>
                  <circle cx={cx} cy={cy} r="16" fill="#1a1f2e" stroke={col} strokeWidth={col===tokens.accent5?2.5:1.5}/>
                  <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
                </g>
              ))}
              <text x="10" y="195" fill={tokens.accent5} fontSize="9" fontFamily="JetBrains Mono">Searching 11 &amp; 14: both &gt; 8, both &gt; 9, then split at 13 (11&lt;13, 14&gt;13)</text>
            </svg>
            <figcaption>
              Path for both 11 and 14 stays identical (right, right) until node 13, where
              they diverge — 13 is the LCA.
            </figcaption>
          </div>

          <div className="callout proof">
            <div className="callout-label">Special case — one target is an ancestor of the other</div>
            If, say, p equals the current node being visited (e.g., searching for 4 and
            2, where 4 is the parent of 2), the base case catches this immediately:
            reaching a node equal to p or q means that node itself is the answer — no
            need to check left/right comparisons at all.
          </div>
        </>
      ),
    },

    // ─── Section 03 ────────────────────────────────────────────────────────
    {
      id: "bstlca3",
      labelText: "Section 03",
      labelColor: tokens.accent5,
      title: "Dry Run & Algorithm",
      navLabel: "Dry Run & Algorithm",
      render: () => (
        <>
          <div className="trick-box">
            <div className="trick-title">Dry Run — LCA(10, 12) in a BST where 8→9(right)→13(left)→11→[10,12]</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>Node</th><th>10 vs node</th><th>12 vs node</th><th>Same direction?</th><th>Action</th></tr>
              </thead>
              <tbody>
                {[
                  ["8","10 &gt; 8","12 &gt; 8","Yes — both right","recurse right"],
                  ["9","10 &gt; 9","12 &gt; 9","Yes — both right","recurse right"],
                  ["13","10 &lt; 13","12 &lt; 13","Yes — both left","recurse left"],
                  ["11","10 &lt; 11","12 &gt; 11","No — split!","return 11 — this is the LCA"],
                ].map(([node,p,q,same,act],i) => (
                  <tr key={node}>
                    <td style={{color:tokens.accent5}}>{node}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}} dangerouslySetInnerHTML={{__html:p}}/>
                    <td style={{color:"#c8d3e0",fontSize:12}} dangerouslySetInnerHTML={{__html:q}}/>
                    <td style={{color:i===3?tokens.danger:tokens.accent3,fontSize:12}}>{same}</td>
                    <td style={{color:i===3?tokens.accent3:"#64748b",fontWeight:i===3?600:400,fontSize:12}}>{act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
              LCA(10, 12) = 11 ✓ — found purely through comparisons, without ever
              explicitly searching for either node's position.
            </p>
          </div>

          <h3 className="ds-h3">Algorithm</h3>
          <ol className="ds-steps">
            <li><div>Base case: if <code className="ds-code">root == null</code> OR <code className="ds-code">root == p</code> OR <code className="ds-code">root == q</code> → return <code className="ds-code">root</code>.</div></li>
            <li><div>If <code className="ds-code">p.val &lt; root.val</code> AND <code className="ds-code">q.val &lt; root.val</code> → both belong in the left subtree → recurse: <code className="ds-code">return lowestCommonAncestor(root.left, p, q)</code>.</div></li>
            <li><div>If <code className="ds-code">p.val &gt; root.val</code> AND <code className="ds-code">q.val &gt; root.val</code> → both belong in the right subtree → recurse: <code className="ds-code">return lowestCommonAncestor(root.right, p, q)</code>.</div></li>
            <li><div>Otherwise (neither condition holds — paths have diverged, or one value equals root) → the current node is the splitting point → return <code className="ds-code">root</code>.</div></li>
          </ol>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">lowestCommonAncestor</span>(<span class="type">TreeNode</span> root, <span class="type">TreeNode</span> p, <span class="type">TreeNode</span> q) {
        <span class="cm">// base case</span>
        <span class="kw">if</span> (root == <span class="kw">null</span> || root == p || root == q) {
            <span class="kw">return</span> root;
        }

        <span class="cm">// check if both nodes are on the left</span>
        <span class="kw">if</span> (p.val &lt; root.val &amp;&amp; q.val &lt; root.val) {
            <span class="kw">return</span> <span class="fn">lowestCommonAncestor</span>(root.left, p, q);
        }

        <span class="cm">// check if both nodes are on the right</span>
        <span class="kw">if</span> (p.val &gt; root.val &amp;&amp; q.val &gt; root.val) {
            <span class="kw">return</span> <span class="fn">lowestCommonAncestor</span>(root.right, p, q);
        }

        <span class="cm">// current node is the split point — neither left-only nor right-only</span>
        <span class="kw">return</span> root;
    }
}`
          }}/></pre>

          <div className="callout warn">
            <div className="callout-label">No need to recurse into both subtrees</div>
            Unlike the general binary-tree LCA algorithm (which must explore both
            <code className="ds-code">root.left</code> and{" "}
            <code className="ds-code">root.right</code> and compare their results), the
            BST version only ever recurses into{" "}
            <strong className="ds-strong">one</strong> side at each step — the BST
            property tells us exactly where to look, so there's no need to check the
            other side "just in case."
          </div>
        </>
      ),
    },

    // ─── Section 04 ────────────────────────────────────────────────────────
    {
      id: "bstlca4",
      labelText: "Section 04",
      labelColor: tokens.accent5,
      title: "Complexity & Comparison with General Binary Tree LCA",
      navLabel: "Complexity & Comparison",
      render: () => (
        <>
          <table className="ds-tbl">
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {[
                ["Time","O(h)","Only one direction explored at each step — at most h nodes visited"],
                ["Space","O(h)","Recursion stack depth = height of tree"],
                ["Worst case (skewed tree)","O(n)","h = n when the tree degenerates into a chain"],
              ].map(([m,v,r]) => (
                <tr key={m}>
                  <td><strong className="ds-strong">{m}</strong></td>
                  <td><span className={v==="O(n)"?"tc tc-n":"tc tc-log"}>{v}</span></td>
                  <td style={{color:"#64748b",fontSize:13}}>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="ds-h3 green">BST LCA vs General Binary Tree LCA</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Aspect</th><th>General Binary Tree</th><th>BST</th></tr>
            </thead>
            <tbody>
              {[
                ["Recursion calls per node","Both left AND right (must check both)","Only one side, decided by comparison"],
                ["Time complexity","O(n) — must visit every node in worst case","O(h) — only travels down one path"],
                ["How LCA is detected","Both subtrees return non-null → current node is LCA","Values diverge (one smaller, one larger) → current node is LCA"],
                ["Uses node values?","No — works by structural position only","Yes — directly compares p.val and q.val against root.val"],
              ].map(([asp,gen,bst]) => (
                <tr key={asp}>
                  <td><strong className="ds-strong">{asp}</strong></td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{gen}</td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{bst}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="callout purple">
            <div className="callout-label">Author's Insight — Why BST LCA is dramatically faster</div>
            The general binary-tree LCA algorithm must explore the entire tree in the
            worst case because it has no way to know in advance which subtree contains a
            target node — it discovers this only by actually visiting nodes. A BST's
            ordering property eliminates this uncertainty completely: comparing values
            tells you immediately which single subtree to recurse into, turning an O(n)
            algorithm into an O(h) one. This is one of the clearest illustrations of why
            BSTs are valuable — the same logical problem becomes asymptotically cheaper
            purely because of how the data is organized.
          </div>

          <div className="callout info">
            <div className="callout-label">Recognizing this pattern in other BST problems</div>
            Whenever a BST problem asks you to "find" or "locate" something defined by
            position or value relationships, check whether comparing against the current
            node's value can immediately tell you which single direction to go — if so,
            you likely have an O(h) solution instead of an O(n) one.
          </div>
        </>
      ),
    },
  ],
};