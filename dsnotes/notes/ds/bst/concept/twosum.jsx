import React from "react";
import { tokens } from "../../../../tokens";

export const bstTwoSumTab = {
  id: "bstTwoSum",
  label: "Two Sum IV (BST)",
  colorVar: tokens.accent4,
  sections: [
    // ─── Section 01 ────────────────────────────────────────────────────────
    {
      id: "bstts1",
      labelText: "Section 01",
      labelColor: tokens.accent4,
      title: "Two Sum IV — Input is a BST — Problem",
      navLabel: "Problem",
      render: () => (
        <>
          <div className="callout info">
            <div className="callout-label">Problem</div>
            Given the root of a BST and an integer k, return{" "}
            <code className="ds-code">true</code> if there exist two elements in the BST
            whose sum equals k.
          </div>

          <p className="ds-p">
            Multiple pairs may sum to k — finding just{" "}
            <strong className="ds-strong">one</strong> valid pair is enough to return{" "}
            <code className="ds-code">true</code>. There's no need to enumerate all pairs.
          </p>

          <div className="formula">
            <div className="formula-label">The core equation</div>
            x + y = k &nbsp;→&nbsp; x = k − y
          </div>

          <p className="ds-p">
            If we know one number <code className="ds-code">y</code>, the partner we need
            is exactly <code className="ds-code">k − y</code>. This turns the problem into:
            "for every node value, does its complement also exist somewhere in the tree?"
          </p>
        </>
      ),
    },

    // ─── Section 02 ────────────────────────────────────────────────────────
    {
      id: "bstts2",
      labelText: "Section 02",
      labelColor: tokens.accent4,
      title: "Approach 1 — Hashing (Works on Any Binary Tree)",
      navLabel: "Approach 1 — Hashing",
      render: () => (
        <>
          <p className="ds-p">
            The most general approach: traverse the tree (DFS or BFS, either works) and
            maintain a <code className="ds-code">HashSet</code> of values seen so far.
            For every node, check if its complement (<code className="ds-code">k −
            node.val</code>) already exists in the set.
          </p>

          <div className="callout info">
            <div className="callout-label">Why a Set, not a Map</div>
            BSTs guarantee unique values (no duplicates), so we only need to track{" "}
            <em>which</em> values have been seen — a <code className="ds-code">HashSet</code>{" "}
            is sufficient. No need for a Map storing counts or positions.
          </div>

          <ol className="ds-steps">
            <li><div>Initialize an empty <code className="ds-code">HashSet&lt;Integer&gt;</code>.</div></li>
            <li><div>Do any traversal (pre-order, in-order, post-order, or BFS — direction doesn't matter here).</div></li>
            <li><div>At each node, compute <code className="ds-code">complement = k - node.val</code>.</div></li>
            <li><div>If <code className="ds-code">set.contains(complement)</code> → return <code className="ds-code">true</code> immediately.</div></li>
            <li><div>Otherwise, insert <code className="ds-code">node.val</code> into the set, and continue.</div></li>
            <li><div>If traversal completes without finding a match → return <code className="ds-code">false</code>.</div></li>
          </ol>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Pre-order traversal, k=9, Tree: 5→left:3→left:2, 5→right:4</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>Node</th><th>Complement (9−val)</th><th>In set?</th><th>Action</th></tr>
              </thead>
              <tbody>
                {[
                  ["5","4","No (set empty)","insert 5 → {5}"],
                  ["3","6","No","insert 3 → {5,3}"],
                  ["2","7","No","insert 2 → {5,3,2}"],
                  ["4","5","Yes! 5 is in set","return true ✓"],
                ].map(([node,comp,has,act],i) => (
                  <tr key={node+i}>
                    <td style={{color:tokens.accent4}}>{node}</td>
                    <td style={{color:tokens.accent2,fontSize:12}}>{comp}</td>
                    <td style={{color:i===3?tokens.accent3:"#c8d3e0",fontSize:12}}>{has}</td>
                    <td style={{color:i===3?tokens.accent3:"#c8d3e0",fontWeight:i===3?600:400,fontSize:12}}>{act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
              Pair found: 4 + 5 = 9 ✓ (node 4's complement, 5, was already in the set)
            </p>
          </div>

          <div className="callout proof">
            <div className="callout-label">This works on ANY binary tree</div>
            Notice this approach never used the BST property at all — it would work
            identically on a plain (unordered) binary tree. That's both its strength
            (general-purpose) and its limitation (doesn't exploit what makes this input
            special).
          </div>

          <h3 className="ds-h3">Complexity</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {[
                ["Time","O(n)","Each node visited once; set insert/lookup is O(1)"],
                ["Space","O(n)","Recursion stack O(h) + HashSet holding up to n values"],
              ].map(([m,v,r]) => (
                <tr key={m}>
                  <td><strong className="ds-strong">{m}</strong></td>
                  <td><span className={v==="O(n)"?"tc tc-n":"tc tc-log"}>{v}</span></td>
                  <td style={{color:"#64748b",fontSize:13}}>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ),
    },

    // ─── Section 03 ────────────────────────────────────────────────────────
    {
      id: "bstts3",
      labelText: "Section 03",
      labelColor: tokens.accent4,
      title: "Approach 2 — In-order + Two Pointers (BST-Specific)",
      navLabel: "Approach 2 — Two Pointer",
      render: () => (
        <>
          <p className="ds-p">
            A BST has a property the hashing approach completely ignores:{" "}
            <strong className="ds-strong">in-order traversal always yields a sorted
            array</strong>. Once we have that sorted array, finding a pair summing to k
            is a classic two-pointer problem.
          </p>

          <div className="callout proof">
            <div className="callout-label">Why this is "more BST-aware"</div>
            The hashing approach treats the tree as a generic graph of values. This
            approach explicitly leverages the defining property of a BST — that in-order
            traversal sorts the data for free, without any separate sort step. Interviewers
            specifically look for this kind of property-aware thinking when the input type
            is called out (BST, not just "binary tree").
          </div>

          <ol className="ds-steps">
            <li><div>Run in-order traversal, collecting values into an <code className="ds-code">ArrayList&lt;Integer&gt;</code> — this list is guaranteed sorted ascending.</div></li>
            <li><div>Set <code className="ds-code">start = 0</code>, <code className="ds-code">end = list.size() - 1</code>.</div></li>
            <li><div>While <code className="ds-code">start &lt; end</code>: compute <code className="ds-code">sum = list[start] + list[end]</code>.</div></li>
            <li><div>If <code className="ds-code">sum == k</code> → return <code className="ds-code">true</code>.</div></li>
            <li><div>If <code className="ds-code">sum &lt; k</code> → sum too small, need a bigger contribution → <code className="ds-code">start++</code>.</div></li>
            <li><div>Else (<code className="ds-code">sum &gt; k</code>) → sum too big, need a smaller contribution → <code className="ds-code">end--</code>.</div></li>
            <li><div>If the loop ends without a match → return <code className="ds-code">false</code>.</div></li>
          </ol>

          <div className="callout warn">
            <div className="callout-label">Why start &lt; end, not start &lt;= end</div>
            Using <code className="ds-code">&lt;=</code> would allow{" "}
            <code className="ds-code">start == end</code> — pairing a single element with
            itself. Since we need two <em>distinct</em> elements, the pointers must never
            meet at the same index.
          </div>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Sorted array [2,3,4,5,6,7], target k=7</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>start</th><th>end</th><th>sum</th><th>Compare to k=7</th><th>Action</th></tr>
              </thead>
              <tbody>
                {[
                  ["0 (val=2)","5 (val=7)","2+7=9","9 &gt; 7","end-- (sum too big)"],
                  ["0 (val=2)","4 (val=6)","2+6=8","8 &gt; 7","end-- (still too big)"],
                  ["0 (val=2)","3 (val=5)","2+5=7","7 == 7 ✓","return true"],
                ].map(([s,e,sum,cmp,act],i) => (
                  <tr key={i}>
                    <td style={{color:tokens.accent2,fontSize:12}}>{s}</td>
                    <td style={{color:tokens.accent2,fontSize:12}}>{e}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}}>{sum}</td>
                    <td style={{color:i===2?tokens.accent3:"#c8d3e0",fontSize:12}}>{cmp}</td>
                    <td style={{color:i===2?tokens.accent3:"#c8d3e0",fontWeight:i===2?600:400,fontSize:12}}>{act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
              Found pair: 2 + 5 = 7 ✓ — pointers converged correctly by shrinking the
              search space from both directions.
            </p>
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public boolean</span> <span class="fn">findTarget</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> k) {
        <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; inorder = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
        <span class="fn">inorderTraversal</span>(root, inorder); <span class="cm">// sorted by BST property</span>

        <span class="kw">int</span> start = <span class="num">0</span>;
        <span class="kw">int</span> end = inorder.size() - <span class="num">1</span>;

        <span class="kw">while</span> (start &lt; end) {
            <span class="kw">int</span> sum = inorder.<span class="fn">get</span>(start) + inorder.<span class="fn">get</span>(end);

            <span class="kw">if</span> (sum == k) {
                <span class="kw">return true</span>;
            }
            <span class="kw">if</span> (sum &lt; k) {
                start++;      <span class="cm">// need a bigger number — drop the smallest</span>
            } <span class="kw">else</span> {
                end--;        <span class="cm">// need a smaller number — drop the largest</span>
            }
        }
        <span class="kw">return false</span>;
    }

    <span class="kw">public void</span> <span class="fn">inorderTraversal</span>(<span class="type">TreeNode</span> root, <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; inorder) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) {
            <span class="kw">return</span>;
        }
        <span class="fn">inorderTraversal</span>(root.left, inorder);  <span class="cm">// left</span>
        inorder.<span class="fn">add</span>(root.val);                <span class="cm">// visit root</span>
        <span class="fn">inorderTraversal</span>(root.right, inorder); <span class="cm">// right</span>
    }
}`
          }}/></pre>

          <h3 className="ds-h3">Complexity</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {[
                ["Time","O(n)","O(n) for in-order traversal + O(n) for two-pointer scan"],
                ["Space","O(n)","O(h) recursion stack + O(n) ArrayList storing all values"],
              ].map(([m,v,r]) => (
                <tr key={m}>
                  <td><strong className="ds-strong">{m}</strong></td>
                  <td><span className={v==="O(n)"?"tc tc-n":"tc tc-log"}>{v}</span></td>
                  <td style={{color:"#64748b",fontSize:13}}>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ),
    },

    // ─── Section 04 ────────────────────────────────────────────────────────
    {
      id: "bstts4",
      labelText: "Section 04",
      labelColor: tokens.accent4,
      title: "Approach Comparison — Hashing vs Two Pointer",
      navLabel: "Comparison",
      render: () => (
        <>
          <table className="ds-tbl">
            <thead>
              <tr><th>Aspect</th><th>Hashing (Set)</th><th>In-order + Two Pointer</th></tr>
            </thead>
            <tbody>
              {[
                ["Works on any binary tree?","Yes","No — relies on BST's sorted in-order property"],
                ["Uses BST property?","No","Yes — explicitly exploits sortedness"],
                ["Traversal needed","Any (pre/in/post/BFS)","In-order specifically"],
                ["Extra data structure","HashSet","ArrayList"],
                ["Time","O(n)","O(n)"],
                ["Space","O(n)","O(n)"],
                ["Early exit?","Yes — returns the moment a match is found mid-traversal","Yes — returns the moment pointers find a match"],
              ].map(([asp,hash,tp]) => (
                <tr key={asp}>
                  <td><strong className="ds-strong">{asp}</strong></td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{hash}</td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{tp}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="callout purple">
            <div className="callout-label">Author's Insight — Why the interviewer prefers the BST-specific approach</div>
            Both approaches run in identical O(n) time and space — there's no performance
            difference. But the hashing solution would solve this problem the same way{" "}
            <strong className="ds-strong">even if the input were a plain binary
            tree</strong>, ignoring the BST guarantee entirely. The in-order + two-pointer
            approach demonstrates that you recognized and exploited the specific structure
            the problem handed you. When a question explicitly says "input is a BST," that
            phrase is a hint — interviewers want to see you use it, not just solve the
            problem in a way that happens to also work.
          </div>

          <div className="callout info">
            <div className="callout-label">General principle for BST problems</div>
            Whenever a problem statement specifically calls out "BST" rather than "binary
            tree," ask: <em>does in-order traversal's sorted-order guarantee simplify
            this?</em> Two Sum, finding the k-th smallest element, and range-sum queries
            all become easier once you convert the BST into its sorted in-order sequence.
          </div>
        </>
      ),
    },
  ],
};