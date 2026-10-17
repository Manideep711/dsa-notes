import React from "react";
import { tokens } from "../../../../tokens";

export const bstKthSmallestTab = {
  id: "bstKthSmallest",
  label: "Kth Smallest in BST",
  colorVar: tokens.accent,
  sections: [
    // ─── Section 01 ────────────────────────────────────────────────────────
    {
      id: "bstkth1",
      labelText: "Section 01",
      labelColor: tokens.accent,
      title: "Kth Smallest Element in a BST — Problem",
      navLabel: "Problem",
      render: () => (
        <>
          <div className="callout info">
            <div className="callout-label">Problem</div>
            Given the root of a BST and an integer k, return the{" "}
            <strong className="ds-strong">k-th smallest value</strong> among all node
            values in the tree — using{" "}
            <strong className="ds-strong">1-based indexing</strong> (k=1 means the
            smallest element, not the second).
          </div>

          <p className="ds-p">
            For example, with k=1 the answer is the single smallest value in the tree.
            With k=3, the answer is the third smallest — i.e., the smallest, then the
            second smallest, then this one.
          </p>

          <div className="callout proof">
            <div className="callout-label">The BST Property That Solves Everything</div>
            In-order traversal of a BST always produces values in{" "}
            <strong className="ds-strong">sorted ascending order</strong>. So the
            k-th smallest value is simply the{" "}
            <code className="ds-code">(k-1)</code>-th element (0-indexed) of the
            in-order traversal list.
          </div>
        </>
      ),
    },

    // ─── Section 02 ────────────────────────────────────────────────────────
    {
      id: "bstkth2",
      labelText: "Section 02",
      labelColor: tokens.accent,
      title: "Approach 1 — Full In-order Traversal + Indexing",
      navLabel: "Approach 1 — Full Traversal",
      render: () => (
        <>
          <p className="ds-p">
            The most straightforward approach: collect the entire in-order traversal
            into a list, then directly index into it.
          </p>

          <ol className="ds-steps">
            <li><div>Run in-order traversal (Left → Root → Right), collecting values into a list.</div></li>
            <li><div>Since in-order gives sorted ascending order, the list's index <code className="ds-code">0</code> holds the smallest, index <code className="ds-code">1</code> the second smallest, and so on.</div></li>
            <li><div>To get the k-th smallest (1-indexed), simply look up <code className="ds-code">list.get(k - 1)</code>.</div></li>
          </ol>

          <div className="trick-box">
            <div className="trick-title">Dry Run — In-order traversal of a tree, k=1 and k=4</div>
            <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 8 }}>
              Suppose in-order traversal produces:{" "}
              <code className="ds-code">[1, 2, 3, 5, 7]</code>
            </p>
            <table className="ds-tbl" style={{ marginTop: 0 }}>
              <thead>
                <tr><th>k</th><th>Index to check (k−1)</th><th>Value at that index</th><th>Answer</th></tr>
              </thead>
              <tbody>
                {[
                  ["1","0","1","1"],
                  ["3","2","3","3"],
                  ["4","3","5","5"],
                ].map(([k,idx,val,ans]) => (
                  <tr key={k}>
                    <td style={{color:tokens.accent}}>{k}</td>
                    <td style={{color:tokens.accent2,fontSize:12}}>{idx}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}}>{val}</td>
                    <td style={{color:tokens.accent3,fontWeight:500}}>{ans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="ds-h3">Complexity</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {[
                ["Time","O(n)","Full in-order traversal visits every node regardless of k"],
                ["Space","O(n)","Recursion stack O(h) + list storing all n values"],
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
            <div className="callout-label">The inefficiency — doing more work than needed</div>
            This always visits <strong className="ds-strong">every</strong> node and
            builds a list of <strong className="ds-strong">all</strong> n values — even
            when k is small. If k=1, we only actually need the very first element found
            during traversal, yet this approach still processes the entire tree.
          </div>
        </>
      ),
    },

    // ─── Section 03 ────────────────────────────────────────────────────────
    {
      id: "bstkth3",
      labelText: "Section 03",
      labelColor: tokens.accent,
      title: "Approach 2 — Optimized: Stop Early With a Counter",
      navLabel: "Approach 2 — Early Stop",
      render: () => (
        <>
          <h3 className="ds-h3">The Key Realization</h3>
          <p className="ds-p">
            When building the list in Approach 1, the moment we{" "}
            <strong className="ds-strong">insert the k-th element</strong>, that is
            exactly the answer — we don't need to keep traversing afterward. Instead of
            collecting a full list and indexing into it later, we can{" "}
            <strong className="ds-strong">track a running position counter</strong> and
            stop the instant it reaches k.
          </p>

          <div className="callout proof">
            <div className="callout-label">Why this saves work</div>
            If k=1, we only ever need to traverse until the very first node is visited in
            in-order sequence — we never need to look at any node after that. If k=3, we
            stop after the third. The traversal effectively "cuts off" early instead of
            always processing the whole tree.
          </div>

          <h3 className="ds-h3">The Return-Value Trick</h3>
          <p className="ds-p">
            Instead of printing during in-order traversal, each recursive call now
            returns either: the <strong className="ds-strong">found answer node</strong>{" "}
            (once the position counter hits k), or{" "}
            <strong className="ds-strong">null</strong> (haven't found it yet). Once any
            subtree returns a non-null node, every ancestor just passes that same node
            upward without further work — no need to explore the remaining subtree.
          </p>

          <ol className="ds-steps">
            <li><div>Maintain a class-level <code className="ds-code">pos = 0</code> counter.</div></li>
            <li><div>Base case: <code className="ds-code">root == null</code> → return <code className="ds-code">root</code> (i.e. null).</div></li>
            <li><div>Recurse left first: <code className="ds-code">left = inorder(root.left, k)</code>.</div></li>
            <li><div>If <code className="ds-code">left != null</code> → the answer was already found in the left subtree — return it immediately without touching the current node or right subtree.</div></li>
            <li><div>Otherwise: increment <code className="ds-code">pos++</code> (this is the "visit root" step).</div></li>
            <li><div>If <code className="ds-code">pos == k</code> → this node is the answer — return it.</div></li>
            <li><div>Otherwise, recurse right and return whatever comes back: <code className="ds-code">return inorder(root.right, k)</code>.</div></li>
          </ol>

          <div className="trick-box">
            <div className="trick-title">Dry Run — k=4, Tree giving in-order [1,2,3,5,7]</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>Node visited</th><th>left result</th><th>pos after increment</th><th>pos==k?</th><th>Action</th></tr>
              </thead>
              <tbody>
                {[
                  ["1 (deepest left)","null (leaf)","1","No (k=4)","recurse right → null"],
                  ["2","null","2","No","recurse right → null"],
                  ["3","null","3","No","recurse right..."],
                  ["5","null","4","Yes! pos==4","return node 5 — STOP, don't recurse right"],
                ].map(([node,lr,pos,eq,act],i) => (
                  <tr key={node}>
                    <td style={{color:tokens.accent}}>{node}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}}>{lr}</td>
                    <td style={{color:tokens.accent2,fontSize:12}}>{pos}</td>
                    <td style={{color:i===3?tokens.accent3:"#c8d3e0",fontSize:12}}>{eq}</td>
                    <td style={{color:i===3?tokens.accent3:"#c8d3e0",fontWeight:i===3?600:400,fontSize:12}}>{act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
              Node 5's address bubbles straight up through every ancestor unchanged —
              none of them re-examine their right subtrees once a non-null result appears.
            </p>
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">int</span> pos = <span class="num">0</span>; <span class="cm">// class-level counter, shared across recursive calls</span>

    <span class="kw">public int</span> <span class="fn">kthSmallest</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> k) {
        <span class="type">TreeNode</span> node = <span class="fn">inorder</span>(root, k);
        <span class="kw">if</span> (node == <span class="kw">null</span>) {
            <span class="kw">return</span> -<span class="num">1</span>; <span class="cm">// k larger than tree size — no valid answer</span>
        }
        <span class="kw">return</span> node.val;
    }

    <span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">inorder</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> k) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) {
            <span class="kw">return</span> root; <span class="cm">// returns null</span>
        }

        <span class="type">TreeNode</span> left = <span class="fn">inorder</span>(root.left, k);
        <span class="kw">if</span> (left != <span class="kw">null</span>) {
            <span class="kw">return</span> left; <span class="cm">// already found — bubble up, skip everything else</span>
        }

        <span class="cm">// "visit" the root — instead of printing, advance the counter</span>
        pos++;
        <span class="kw">if</span> (pos == k) {
            <span class="kw">return</span> root; <span class="cm">// this node is the k-th smallest</span>
        }

        <span class="kw">return</span> <span class="fn">inorder</span>(root.right, k); <span class="cm">// either the answer, or null — pass it up as-is</span>
    }
}`
          }}/></pre>

          <div className="callout purple">
            <div className="callout-label">Author's simplification — why the right-call collapses to one line</div>
            A naive version might write:
            <pre className="ds-pre" style={{margin:"8px 0 0"}}><code dangerouslySetInnerHTML={{__html:
`<span class="type">TreeNode</span> right = <span class="fn">inorder</span>(root.right, k);
<span class="kw">if</span> (right != <span class="kw">null</span>) <span class="kw">return</span> right;
<span class="kw">return null</span>;`
            }}/></pre>
            But since we want to return exactly what the right call gives back regardless
            of whether it's null or a found node, this collapses to simply{" "}
            <code className="ds-code">return inorder(root.right, k);</code> — no
            intermediate variable or conditional needed.
          </div>
        </>
      ),
    },

    // ─── Section 04 ────────────────────────────────────────────────────────
    {
      id: "bstkth4",
      labelText: "Section 04",
      labelColor: tokens.accent,
      title: "Complexity & Approach Comparison",
      navLabel: "Complexity & Comparison",
      render: () => (
        <>
          <h3 className="ds-h3">Why Optimized Time is O(h), Not O(n)</h3>
          <p className="ds-p">
            Think about k=1: the traversal stops at the very first node visited — only
            one node examined, regardless of tree size. For k=2, only two nodes. In
            general, the number of nodes actually visited before stopping is bounded by
            how far down the tree we need to travel — which is at most the{" "}
            <strong className="ds-strong">height</strong> of the tree, not the total node
            count.
          </p>

          <table className="ds-tbl">
            <thead>
              <tr><th>Metric</th><th>Approach 1 (Full Traversal)</th><th>Approach 2 (Early Stop)</th></tr>
            </thead>
            <tbody>
              {[
                ["Time","O(n)","O(h) — worst case still O(n) if k is large or tree is skewed"],
                ["Space","O(n)","O(h) — only recursion stack, no list storage"],
                ["Stops early?","No — always visits all n nodes","Yes — stops the moment the k-th element is found"],
                ["Best for","Simplicity, when k is unknown ahead or close to n","Small/moderate k relative to n"],
              ].map(([m,a1,a2]) => (
                <tr key={m}>
                  <td><strong className="ds-strong">{m}</strong></td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{a1}</td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{a2}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="callout info">
            <div className="callout-label">Worst case is still O(n) for Approach 2</div>
            If k equals n (asking for the largest element), the early-stop approach still
            ends up visiting nearly every node — the savings only materialize when k is
            meaningfully smaller than n. State this honestly in interviews: the
            optimization is about <em>average</em>/<em>practical</em> savings, not a
            change in worst-case asymptotic bound.
          </div>

          <div className="callout warn">
            <div className="callout-label">-1 sentinel for invalid k</div>
            If <code className="ds-code">k</code> exceeds the total number of nodes, the
            traversal exhausts the entire tree without ever hitting{" "}
            <code className="ds-code">pos == k</code>, so every call returns{" "}
            <code className="ds-code">null</code> all the way up. The wrapper function
            checks for this and returns <code className="ds-code">-1</code> as a sentinel
            for "no valid k-th element exists."
          </div>

          <div className="callout proof">
            <div className="callout-label">Connection to Two Sum IV (BST)</div>
            Both this problem and the BST Two Sum problem rely on the same core BST fact
            — in-order traversal gives sorted output for free. Two Sum then layers a
            two-pointer scan on top of that sorted list; this problem instead avoids
            building the full list at all, short-circuiting the traversal itself once the
            answer is found. Recognizing when you can skip materializing the full sorted
            sequence — versus when you actually need it — is the deeper skill both
            problems are testing.
          </div>
        </>
      ),
    },
  ],
};