import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ6 = {
  id: "tiq6",
  labelText: "Question 06",
  labelColor: tokens.accent5,
  title: "Sum of Binary Tree",
  navLabel: "Sum of Tree",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given a binary tree of size n, return the{" "}
        <strong className="ds-strong">sum of all node values</strong>.
      </div>

      <h3 className="ds-h3">Core Idea</h3>
      <p className="ds-p">
        The total sum of any tree rooted at a node is:{" "}
        <strong className="ds-strong">current node's value + sum of left subtree + sum of right subtree</strong>.
        This is a natural post-order recursion — resolve children first, then combine at
        the current node.
      </p>
      <div className="formula">
        <div className="formula-label">Recurrence</div>
        sum(node) = 0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if node == null
        <br/>
        sum(node) = node.data + sum(node.left) + sum(node.right) &nbsp;otherwise
      </div>

      <h3 className="ds-h3">Two Approaches</h3>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>BFS — Level Order</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Use a queue. Process each level and accumulate the sum. Straightforward but
            requires O(n) queue space.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>DFS — Post-order ← used here</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Recurse left, recurse right, add current. Cleaner code, space = recursion
            stack height.
          </p>
        </div>
      </div>

      <div className="callout info">
        <div className="callout-label">Why the author switches between BFS and DFS</div>
        Both approaches give the same O(n) time complexity. The author intentionally
        alternates between them across questions so your thinking skills develop equally
        in both directions — not just one pattern.
      </div>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Tree: [10, 20, 60, 30, null, 15, null, 40]</div>
        <div className="diagram-wrap" style={{ marginTop: 12 }}>
          <svg width="100%" viewBox="0 0 420 200">
            <line x1="210" y1="30" x2="120" y2="88" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="210" y1="30" x2="300" y2="88" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="120" y1="88" x2="70"  y2="150" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="70"  y1="150" x2="50" y2="195" stroke="#252b3d" strokeWidth="1.5"/>
            <line x1="300" y1="88" x2="260" y2="150" stroke="#252b3d" strokeWidth="1.5"/>
            {[["10",210,22],["20",120,80],["60",300,80],["30",70,142],["15",260,142],["40",50,190]].map(([v,cx,cy]) => (
              <g key={cx+cy}>
                <circle cx={cx} cy={cy} r="18" fill="#1a1f2e" stroke={tokens.accent5} strokeWidth="1.5"/>
                <text x={cx} y={cy+5} textAnchor="middle" fill={tokens.accent5} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
              </g>
            ))}
          </svg>
          <figcaption>Sum = 10 + 20 + 60 + 30 + 15 + 40 = 175</figcaption>
        </div>
        <table className="ds-tbl" style={{ marginTop: 14 }}>
          <thead>
            <tr><th>Call</th><th>Node</th><th>leftSum</th><th>rightSum</th><th>Returns</th></tr>
          </thead>
          <tbody>
            {[
              ["sumBT(null)","null","—","—","0 ← base case"],
              ["sumBT(40)","40","0","0","0+0+40 = 40"],
              ["sumBT(null)","null","—","—","0 ← base case"],
              ["sumBT(30)","30","40","0","40+0+30 = 70"],
              ["sumBT(null)","null","—","—","0 ← base case"],
              ["sumBT(20)","20","70","0","70+0+20 = 90"],
              ["sumBT(null)","null","—","—","0 ← base case"],
              ["sumBT(15)","15","0","0","0+0+15 = 15"],
              ["sumBT(null)","null","—","—","0 ← base case"],
              ["sumBT(60)","60","15","0","15+0+60 = 75"],
              ["sumBT(10)","10","90","75","90+75+10 = 175 ✓"],
            ].map(([call,node,ls,rs,ret]) => (
              <tr key={call+node}>
                <td style={{fontSize:10}}><code className="ds-code">{call}</code></td>
                <td style={{color:tokens.accent5}}>{node}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{ls}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{rs}</td>
                <td style={{color:tokens.accent3,fontWeight:500,fontSize:12}}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">BinaryTree</span> {
    <span class="kw">static int</span> <span class="fn">sumBT</span>(<span class="type">Node</span> head) {
        <span class="kw">if</span> (head == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>; <span class="cm">// null node contributes 0</span>

        <span class="kw">int</span> leftSum  = <span class="fn">sumBT</span>(head.left);  <span class="cm">// sum of left subtree</span>
        <span class="kw">int</span> rightSum = <span class="fn">sumBT</span>(head.right); <span class="cm">// sum of right subtree</span>

        <span class="kw">return</span> (leftSum + rightSum + head.data); <span class="cm">// combine at current node</span>
    }
}`
      }}/></pre>

      <div className="callout purple">
        <div className="callout-label">Pattern — Same skeleton as Max Depth (Q1)</div>
        Compare the structure of Q1 and Q6 side by side:
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="cm">// Q1 — Max Depth</span>
<span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>;
<span class="kw">int</span> lh = <span class="fn">maxDepth</span>(root.left);
<span class="kw">int</span> rh = <span class="fn">maxDepth</span>(root.right);
<span class="kw">return</span> <span class="num">1</span> + Math.<span class="fn">max</span>(lh, rh);    <span class="cm">// ← take max, add 1</span>

<span class="cm">// Q6 — Sum of Tree</span>
<span class="kw">if</span> (head == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>;
<span class="kw">int</span> ls = <span class="fn">sumBT</span>(head.left);
<span class="kw">int</span> rs = <span class="fn">sumBT</span>(head.right);
<span class="kw">return</span> ls + rs + head.data;    <span class="cm">// ← take sum, add current value</span>`
      }}/></pre>

      <p className="ds-p">
        The skeleton is identical — base case, recurse left, recurse right, combine.
        Only the <strong className="ds-strong">combination step</strong> differs:{" "}
        <code className="ds-code">max + 1</code> vs <code className="ds-code">sum + data</code>.
        This is the post-order DFS pattern that underlies most tree problems.
      </p>

      <h3 className="ds-h3">Complexity</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Every node visited exactly once"],
            ["Space — balanced","O(log n)","Recursion stack = height of tree"],
            ["Space — skewed","O(n)","Stack depth = n in worst case"],
            ["Space — general","O(h)","h = height; always state this in interviews"],
          ].map(([m,v,r]) => (
            <tr key={m}>
              <td><strong className="ds-strong">{m}</strong></td>
              <td><span className={v==="O(n)"?"tc tc-n":"tc tc-log"}>{v}</span></td>
              <td style={{color:"#64748b",fontSize:13}}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout warn">
        <div className="callout-label">Always say O(h) for space, not O(n)</div>
        Saying <code className="ds-code">O(n)</code> for recursion stack space isn't wrong,
        but saying <code className="ds-code">O(h)</code> where h is the height shows you
        understand the actual bound. For a balanced tree h = log n — much better than n.
        Interviewers notice this distinction.
      </div>
    </>
  ),
};