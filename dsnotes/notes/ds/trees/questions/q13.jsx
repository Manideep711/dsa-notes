import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ13 = {
  id: "tiq13",
  labelText: "Question 13",
  labelColor: tokens.accent5,
  title: "Balanced Binary Tree",
  navLabel: "Balanced Tree",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given a binary tree, determine if it is{" "}
        <strong className="ds-strong">height-balanced</strong>: for every node, the
        depths of its two subtrees never differ by more than 1.
      </div>

      <h3 className="ds-h3">Definition Recap — Depth</h3>
      <p className="ds-p">
        Depth (height) of a tree = the longest path from root to any leaf, counted in
        nodes. For every single node in the tree, we need the{" "}
        <strong className="ds-strong">absolute difference</strong> between its left
        subtree's depth and right subtree's depth to be{" "}
        <strong className="ds-strong">at most 1</strong>.
      </p>

      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 440 200">
          <line x1="220" y1="25" x2="140" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="220" y1="25" x2="300" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="140" y1="80" x2="100" y2="135" stroke={tokens.danger} strokeWidth="2.5"/>
          <line x1="100" y1="135" x2="80"  y2="190" stroke={tokens.danger} strokeWidth="2.5"/>
          {[
            ["1",220,25,tokens.accent],
            ["2",140,82,tokens.danger],["3",300,82,tokens.accent3],
            ["4",100,137,tokens.danger],
            ["5",80,192,tokens.danger],
          ].map(([v,cx,cy,col]) => (
            <g key={cx+""+cy}>
              <circle cx={cx} cy={cy} r="17" fill="#1a1f2e" stroke={col} strokeWidth="1.5"/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          <text x="10" y="60" fill={tokens.danger} fontSize="9" fontFamily="JetBrains Mono">Node 2: left depth=3 (2→4→5), right depth=0 → |3-0|=3 &gt; 1 ✗</text>
          <text x="10" y="178" fill={tokens.accent3} fontSize="9" fontFamily="JetBrains Mono">Node 3: leaf, balanced trivially</text>
        </svg>
        <figcaption>Node 2 violates balance: left subtree depth 3 vs right subtree depth 0 → unbalanced tree overall.</figcaption>
      </div>

      <h3 className="ds-h3">The Key Reuse — Height Calculation Already Computes What We Need</h3>
      <p className="ds-p">
        Computing height already requires <code className="ds-code">leftSubtreeHeight</code>{" "}
        and <code className="ds-code">rightSubtreeHeight</code> at every node — exactly
        the two values needed to check balance. Instead of a separate balance check, we{" "}
        <strong className="ds-strong">fold the check into the height function itself</strong>.
      </p>

      <div className="callout proof">
        <div className="callout-label">The -1 Sentinel Trick</div>
        Normally <code className="ds-code">getHeight</code> returns the actual height. But
        if at any node the balance condition is violated, instead of returning the real
        height, we return <code className="ds-code">-1</code> — a signal value meaning
        "unbalanced somewhere below." Once <code className="ds-code">-1</code> propagates
        up, every ancestor just passes it further up without recomputing anything.
      </div>

      <h3 className="ds-h3">Algorithm</h3>
      <ol className="ds-steps">
        <li><div>Base case: <code className="ds-code">root == null → return 0</code> (height of empty tree).</div></li>
        <li><div>Recurse: <code className="ds-code">leftSubtreeHeight = getHeight(root.left)</code>, <code className="ds-code">rightSubtreeHeight = getHeight(root.right)</code>.</div></li>
        <li><div>If either child returned <code className="ds-code">-1</code> → propagate <code className="ds-code">-1</code> immediately (short-circuit, don't bother checking current node).</div></li>
        <li><div>If <code className="ds-code">|leftSubtreeHeight − rightSubtreeHeight| &gt; 1</code> → return <code className="ds-code">-1</code> (violation found here).</div></li>
        <li><div>Otherwise return the real height: <code className="ds-code">1 + max(leftSubtreeHeight, rightSubtreeHeight)</code>.</div></li>
        <li><div>In the main function: call <code className="ds-code">getHeight(root)</code>. Tree is balanced iff the result is not <code className="ds-code">-1</code>.</div></li>
      </ol>

      <div className="callout warn">
        <div className="callout-label">Why check child's -1 BEFORE computing current node's difference</div>
        If a child already returned -1, its actual height is unknown/invalid — using it
        in <code className="ds-code">Math.abs(left - right)</code> would produce garbage.
        Always propagate -1 immediately without further computation once detected.
      </div>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Unbalanced Tree: 1(left=6, right=null), 6(left=11, right=null), 11(left=null, right=null)</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Call</th><th>Node</th><th>leftH</th><th>rightH</th><th>|diff|</th><th>Returns</th></tr>
          </thead>
          <tbody>
            {[
              ["getHeight(11)","11","0","0","0","1 + max(0,0) = 1"],
              ["getHeight(6)","6","1 ←11","0 (null right)","1","1 + max(1,0) = 2"],
              ["getHeight(1)","1","2 ←6","0 (null right)","2 &gt; 1 ✗","-1 ← violation!"],
            ].map(([call,node,lh,rh,diff,ret],i) => (
              <tr key={call}>
                <td style={{fontSize:11}}><code className="ds-code">{call}</code></td>
                <td style={{color:tokens.accent5}}>{node}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{lh}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{rh}</td>
                <td style={{color:i===2?tokens.danger:tokens.accent3,fontSize:12}}>{diff}</td>
                <td style={{color:i===2?tokens.danger:tokens.accent3,fontWeight:500,fontSize:12}}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.danger, marginTop:10, marginBottom:0}}>
          getHeight(root) returns -1 → isBalanced returns false ✓
        </p>
      </div>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Balanced Tree (every node satisfies |diff| ≤ 1)</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Node</th><th>leftH</th><th>rightH</th><th>|diff|</th><th>Returns</th></tr>
          </thead>
          <tbody>
            {[
              ["12 (leaf)","0","0","0","1"],
              ["10","1 ←12","0","1","2"],
              ["9","2 ←10","0","2 &gt; 1 ✗","this would be -1 if it existed"],
            ].map(([node,lh,rh,diff,ret],i) => (
              <tr key={node}>
                <td style={{color:tokens.accent5}}>{node}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{lh}</td>
                <td style={{color:tokens.accent2,fontSize:12}}>{rh}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{diff}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:"#64748b", marginTop:8, marginBottom:0, fontSize:12}}>
          (Illustrative: a node with left=2, right=0 also violates — shown for contrast with the next safe case below)
        </p>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public boolean</span> <span class="fn">isBalanced</span>(<span class="type">TreeNode</span> root) {
        <span class="kw">int</span> height = <span class="fn">getHeight</span>(root);
        <span class="kw">return</span> (height != -<span class="num">1</span>); <span class="cm">// -1 anywhere means unbalanced</span>
    }

    <span class="kw">public int</span> <span class="fn">getHeight</span>(<span class="type">TreeNode</span> root) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> <span class="num">0</span>;

        <span class="cm">// post-order: resolve children before this node</span>
        <span class="kw">int</span> leftSubtreeHeight  = <span class="fn">getHeight</span>(root.left);
        <span class="kw">int</span> rightSubtreeHeight = <span class="fn">getHeight</span>(root.right);

        <span class="cm">// propagate violation from below without further work</span>
        <span class="kw">if</span> (leftSubtreeHeight == -<span class="num">1</span> || rightSubtreeHeight == -<span class="num">1</span>) {
            <span class="kw">return</span> -<span class="num">1</span>;
        }

        <span class="cm">// check THIS node's balance condition</span>
        <span class="kw">if</span> (Math.<span class="fn">abs</span>(leftSubtreeHeight - rightSubtreeHeight) &gt; <span class="num">1</span>) {
            <span class="kw">return</span> -<span class="num">1</span>;
        }

        <span class="cm">// all good so far — return the real height</span>
        <span class="kw">return</span> <span class="num">1</span> + Math.<span class="fn">max</span>(leftSubtreeHeight, rightSubtreeHeight);
    }
}`
      }}/></pre>

      <div className="callout purple">
        <div className="callout-label">Why this is elegant — one pass does two jobs</div>
        A naive approach computes height separately for every node (calling a height
        function inside another traversal) — that's O(n) work done O(n) times = O(n²)
        total. This solution computes height <strong className="ds-strong">once per
        node</strong> via post-order DFS, checking balance as a side-effect of the same
        recursive call. Height calculation and balance checking are fused into a single
        O(n) pass.
      </div>

      <h3 className="ds-h3 green">Naive vs Optimized — Why O(n²) is the trap</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Approach</th><th>Time</th><th>Why</th></tr>
        </thead>
        <tbody>
          {[
            ["Naive: call getHeight(node.left) and getHeight(node.right) at every node separately","O(n²)","Each call re-traverses its entire subtree — heights recomputed repeatedly"],
            ["Optimized: single post-order pass with -1 sentinel","O(n)","Each node's height computed exactly once; checks happen using already-computed values"],
          ].map(([app,t,why]) => (
            <tr key={app}>
              <td style={{fontSize:12}}>{app}</td>
              <td><span className={t==="O(n)"?"tc tc-n":"tc tc-bad"}>{t}</span></td>
              <td style={{color:"#64748b",fontSize:12}}>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="ds-h3">Complexity</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Single post-order DFS pass — every node visited exactly once"],
            ["Space — balanced tree","O(log n)","Recursion stack depth = height"],
            ["Space — skewed tree","O(n)","Stack depth = n"],
            ["Space — general","O(h)","h = height of tree"],
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
        <div className="callout-label">Connection to Q1 (Max Depth)</div>
        <code className="ds-code">getHeight</code> here is almost identical to Q1's{" "}
        <code className="ds-code">maxDepth</code> — same base case, same post-order
        recursion, same <code className="ds-code">1 + max(left, right)</code> return.
        The only addition is the two -1 checks inserted between computing heights and
        returning them. This is a recurring pattern: many tree problems are "height
        calculation + one extra check."
      </div>
    </>
  ),
};