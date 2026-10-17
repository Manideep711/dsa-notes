import React from "react";
import { tokens } from "../../../../tokens";

export const bstDeleteTab = {
  id: "bstDelete",
  label: "Delete a Node",
  colorVar: tokens.accent5,
  sections: [
    // ─── Section 01 ────────────────────────────────────────────────────────
    {
      id: "bstdel1",
      labelText: "Section 01",
      labelColor: tokens.accent5,
      title: "Delete Node in a BST — Problem & The Three Cases",
      navLabel: "Problem & Three Cases",
      render: () => (
        <>
          <div className="callout info">
            <div className="callout-label">Problem</div>
            Given the root of a BST and a key, delete the node with that key value and
            return the (possibly updated) root. The deletion breaks into two stages:{" "}
            <strong className="ds-strong">search for the node</strong>, then{" "}
            <strong className="ds-strong">delete it</strong> while keeping the tree a
            valid BST.
          </div>

          <p className="ds-p">
            Every deletion falls into exactly one of three cases, based on how many
            children the node-to-delete has:
          </p>

          <div className="prop-grid">
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Case 1: Leaf node</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                No children at all. Simplest case — just remove it; nothing else in the
                tree is affected.
              </p>
            </div>
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Case 2: One child</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                Either a left child or a right child exists. Attach that single child
                directly to the deleted node's parent.
              </p>
            </div>
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}`, gridColumn: "1/-1" }}>
              <h4 className="ds-h4" style={{ color: tokens.accent5 }}>Case 3: Two children</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                The interesting case. Replace the node's value with a carefully chosen
                neighbor, then recursively delete that neighbor instead.
              </p>
            </div>
          </div>

          <div className="diagram-wrap">
            <svg width="100%" viewBox="0 0 200 140">
              <circle cx="100" cy="20" r="16" fill="#1a1f2e" stroke={tokens.accent3} strokeWidth="1.5"/>
              <text x="100" y="25" textAnchor="middle" fill={tokens.accent3} fontSize="11" fontFamily="JetBrains Mono">15</text>
              <text x="100" y="48" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Case 1 — leaf, just remove</text>

              <circle cx="100" cy="80" r="16" fill="#1a1f2e" stroke={tokens.accent2} strokeWidth="1.5"/>
              <text x="100" y="85" textAnchor="middle" fill={tokens.accent2} fontSize="11" fontFamily="JetBrains Mono">14</text>
              <line x1="100" y1="96" x2="100" y2="118" stroke="#252b3d" strokeWidth="1.5"/>
              <circle cx="100" cy="125" r="13" fill="#1a1f2e" stroke="#64748b" strokeWidth="1.5"/>
              <text x="100" y="129" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">15</text>
            </svg>
            <figcaption>Case 1 (top): deleting 15 just removes it. Case 2 (bottom): deleting 14 reattaches its single child 15 directly to 14's old parent.</figcaption>
          </div>

          <div className="callout proof">
            <div className="callout-label">Case 1 — Leaf Node Deletion</div>
            When the target has no children, simply set the link from its parent to{" "}
            <code className="ds-code">null</code>. The tree's structure elsewhere is
            completely unaffected.
          </div>

          <div className="callout proof">
            <div className="callout-label">Case 2 — Single Child Deletion</div>
            Whichever single child the node has (left or right), that child takes the
            deleted node's exact position — attached directly to the deleted node's
            parent on the same side. The deleted node simply gets bypassed.
          </div>
        </>
      ),
    },

    // ─── Section 02 ────────────────────────────────────────────────────────
    {
      id: "bstdel2",
      labelText: "Section 02",
      labelColor: tokens.accent5,
      title: "Two-Child Case — Finding a Valid Replacement",
      navLabel: "Two-Child Replacement",
      render: () => (
        <>
          <p className="ds-p">
            Deleting a node with two children is trickier because we can't just pick an
            arbitrary value to fill the gap — whatever replaces it must still satisfy the
            BST property relative to <strong className="ds-strong">both</strong> subtrees.
          </p>

          <div className="callout warn">
            <div className="callout-label">Why an arbitrary replacement breaks things</div>
            If you pick a random value to place at the deleted position, you'd likely
            need to rearrange large portions of the tree to keep the BST property intact
            — far too complicated. We need a replacement that{" "}
            <strong className="ds-strong">already fits perfectly</strong> without any
            further rearrangement.
          </div>

          <h3 className="ds-h3">The Insight — Only Two Values Qualify</h3>
          <p className="ds-p">
            We need a value that is <strong className="ds-strong">greater than
            everything in the left subtree</strong> and{" "}
            <strong className="ds-strong">smaller than everything in the right
            subtree</strong>. Exactly two candidates satisfy this:
          </p>

          <div className="prop-grid">
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent3 }}>In-order Predecessor</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                The <strong className="ds-strong">largest value in the left
                subtree</strong>. Coming from the left subtree, it's automatically
                smaller than everything on the right, and being the largest of the left,
                it's still larger than everything else on the left.
              </p>
            </div>
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent2 }}>In-order Successor</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                The <strong className="ds-strong">smallest value in the right
                subtree</strong>. Symmetric reasoning: automatically larger than the
                entire left subtree, and the smallest of the right subtree.
              </p>
            </div>
          </div>

          <div className="callout proof">
            <div className="callout-label">Why these names — connection to in-order traversal</div>
            In-order traversal of a BST visits nodes in sorted order. The node being
            deleted has a position in that sorted sequence. The value immediately{" "}
            <em>before</em> it is its in-order predecessor (largest of left subtree); the
            value immediately <em>after</em> is its in-order successor (smallest of right
            subtree).
          </div>

          <div className="diagram-wrap">
            <svg width="100%" viewBox="0 0 460 220">
              <line x1="230" y1="20" x2="140" y2="75" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="230" y1="20" x2="320" y2="75" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="140" y1="75" x2="100" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="140" y1="75" x2="180" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="320" y1="75" x2="280" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="320" y1="75" x2="360" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="280" y1="130" x2="280" y2="185" stroke={tokens.accent2} strokeWidth="2.5"/>
              <line x1="100" y1="130" x2="100" y2="185" stroke={tokens.accent3} strokeWidth="2.5"/>
              {[
                ["10",230,20,tokens.danger],
                ["2",140,77,"#64748b"],["17",320,77,"#64748b"],
                ["4",100,132,"#64748b"],["8",180,132,tokens.accent3],
                ["15",280,132,tokens.accent2],["19",360,132,"#64748b"],
                ["6",100,187,"#64748b"],["14",280,187,"#64748b"],
              ].map(([v,cx,cy,col]) => (
                <g key={cx+""+cy}>
                  <circle cx={cx} cy={cy} r="16" fill="#1a1f2e" stroke={col} strokeWidth={col===tokens.danger?2.5:1.5}/>
                  <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
                </g>
              ))}
              <text x="10"  y="210" fill={tokens.accent3} fontSize="9" fontFamily="JetBrains Mono">predecessor: 8 (largest of left subtree)</text>
              <text x="240" y="210" fill={tokens.accent2} fontSize="9" fontFamily="JetBrains Mono">successor: 14 (smallest of right subtree)</text>
            </svg>
            <figcaption>Deleting root 10: either 8 (predecessor) or 14 (successor) can safely replace it.</figcaption>
          </div>

          <div className="callout info">
            <div className="callout-label">Either candidate works — pick one consistently</div>
            Using the predecessor or the successor both produce a valid BST after
            deletion. Pick one approach and use it consistently throughout your code.
          </div>
        </>
      ),
    },

    // ─── Section 03 ────────────────────────────────────────────────────────
    {
      id: "bstdel3",
      labelText: "Section 03",
      labelColor: tokens.accent5,
      title: "How to Find Predecessor & Successor",
      navLabel: "Finding Predecessor/Successor",
      render: () => (
        <>
          <h3 className="ds-h3">Finding the In-order Predecessor</h3>
          <p className="ds-p">
            From the node being deleted, move <strong className="ds-strong">one step
            left</strong>, then keep moving{" "}
            <strong className="ds-strong">right</strong> as far as possible. The node
            where you can no longer move right holds the largest value in the left
            subtree.
          </p>

          <ol className="ds-steps">
            <li><div>Start at <code className="ds-code">root.left</code>.</div></li>
            <li><div>While <code className="ds-code">node.right != null</code>: move <code className="ds-code">node = node.right</code>.</div></li>
            <li><div>Return <code className="ds-code">node</code> — this is the predecessor.</div></li>
          </ol>

          <h3 className="ds-h3">Finding the In-order Successor</h3>
          <p className="ds-p">
            Symmetric logic: move <strong className="ds-strong">one step right</strong>,
            then keep moving <strong className="ds-strong">left</strong> as far as
            possible.
          </p>

          <ol className="ds-steps">
            <li><div>Start at <code className="ds-code">root.right</code>.</div></li>
            <li><div>While <code className="ds-code">node.left != null</code>: move <code className="ds-code">node = node.left</code>.</div></li>
            <li><div>Return <code className="ds-code">node</code> — this is the successor.</div></li>
          </ol>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">findPredecessor</span>(<span class="type">TreeNode</span> node) {
    <span class="kw">while</span> (node.right != <span class="kw">null</span>) {
        node = node.right;                   <span class="cm">// keep going right — find the largest</span>
    }
    <span class="kw">return</span> node;
}

<span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">findSuccessor</span>(<span class="type">TreeNode</span> node) {
    <span class="kw">while</span> (node.left != <span class="kw">null</span>) {
        node = node.left;                    <span class="cm">// keep going left — find the smallest</span>
    }
    <span class="kw">return</span> node;
}`
          }}/></pre>

          <div className="callout warn">
            <div className="callout-label">Caller passes the correct subtree root</div>
            Notice these helpers take an already-positioned node — the caller is
            responsible for passing <code className="ds-code">root.left</code> to{" "}
            <code className="ds-code">findPredecessor</code>, or{" "}
            <code className="ds-code">root.right</code> to{" "}
            <code className="ds-code">findSuccessor</code>. The "one step" move
            (left-once or right-once) happens at the call site, not inside the helper.
          </div>

          <div className="trick-box">
            <div className="trick-title">Dry Run — In-order Traversal Confirms Predecessor/Successor</div>
            <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 8 }}>
              In-order traversal of the example tree gives:{" "}
              <code className="ds-code">2 4 6 8 10 14 15 17 19</code>. Deleting 10:
            </p>
            <table className="ds-tbl" style={{ marginTop: 0 }}>
              <thead>
                <tr><th>Term</th><th>Value</th><th>Position relative to 10 in sorted order</th></tr>
              </thead>
              <tbody>
                {[
                  ["Predecessor","8","immediately before 10"],
                  ["Successor","14","immediately after 10"],
                ].map(([term,val,pos]) => (
                  <tr key={term}>
                    <td style={{color:tokens.accent5}}>{term}</td>
                    <td style={{color:tokens.accent3,fontWeight:500}}>{val}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}}>{pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ),
    },

    // ─── Section 04 ────────────────────────────────────────────────────────
    {
      id: "bstdel4",
      labelText: "Section 04",
      labelColor: tokens.accent5,
      title: "Two-Child Deletion — Replace Then Recurse",
      navLabel: "Replace & Recurse",
      render: () => (
        <>
          <p className="ds-p">
            Once a predecessor (or successor) is found, deletion becomes a two-step move:{" "}
            <strong className="ds-strong">copy its value into the node we wanted to
            delete</strong>, then{" "}
            <strong className="ds-strong">recursively delete the predecessor's original
            position</strong> instead — which is now guaranteed to be an easy case.
          </p>

          <div className="callout proof">
            <div className="callout-label">Why the replacement's old spot is always easy to delete</div>
            The in-order successor is found by going right once then left as far as
            possible — meaning it can have <strong className="ds-strong">no left
            child</strong> (otherwise we'd have kept going left). So removing it from its
            original position is always a leaf deletion or single-child deletion — never
            the hard two-child case again. (Symmetric reasoning applies to the predecessor.)
          </div>

          <ol className="ds-steps">
            <li><div>Find the node to delete (<code className="ds-code">root.val == key</code>), confirm it has two children.</div></li>
            <li><div>Find the successor: <code className="ds-code">node = findSuccessor(root.right)</code>.</div></li>
            <li><div>Overwrite: <code className="ds-code">root.val = node.val</code> — value shifted into place.</div></li>
            <li><div>Recursively delete that value from the right subtree: <code className="ds-code">root.right = deleteNode(root.right, node.val)</code>.</div></li>
            <li><div>Return <code className="ds-code">root</code> (value updated, structure fixed below it).</div></li>
          </ol>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Delete 10 using In-order Successor</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>Step</th><th>Action</th><th>Result</th></tr>
              </thead>
              <tbody>
                {[
                  ["1","Find 10 — has both left (8-side) and right (17-side) children","two-child case confirmed"],
                  ["2","findSuccessor(17) → go left as far as possible: 17→14, 14.left=null, stop","successor = 14"],
                  ["3","root.val = 14 — value 10 overwritten","node value is now 14"],
                  ["4","root.right = deleteNode(17-subtree, 14)","recurse to remove old 14"],
                  ["5","Inside recursion: 14 found, single-child (right=15) — return 15","17.left = 15"],
                ].map(([s,act,res]) => (
                  <tr key={s}>
                    <td style={{color:tokens.accent5}}>{s}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}}>{act}</td>
                    <td style={{color:tokens.accent3,fontSize:12}}>{res}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
              Final result: root value is 14, with 17.left now pointing to 15 — tree
              remains a valid BST without restructuring anything else.
            </p>
          </div>
        </>
      ),
    },

    // ─── Section 05 ────────────────────────────────────────────────────────
    {
      id: "bstdel5",
      labelText: "Section 05",
      labelColor: tokens.accent5,
      title: "Full Algorithm & Code",
      navLabel: "Full Algorithm & Code",
      render: () => (
        <>
          <h3 className="ds-h3">Algorithm — Combining All Three Cases</h3>
          <ol className="ds-steps">
            <li><div>Base case: <code className="ds-code">root == null</code> → return <code className="ds-code">root</code> (nothing to delete).</div></li>
            <li><div>If <code className="ds-code">key &lt; root.val</code> → recurse left: <code className="ds-code">root.left = deleteNode(root.left, key)</code>.</div></li>
            <li><div>Else if <code className="ds-code">key &gt; root.val</code> → recurse right: <code className="ds-code">root.right = deleteNode(root.right, key)</code>.</div></li>
            <li><div>Else (<code className="ds-code">root.val == key</code> — found it): check children count.</div></li>
            <li><div>Both null (leaf) → return <code className="ds-code">null</code>.</div></li>
            <li><div>Left null only → return <code className="ds-code">root.right</code>.</div></li>
            <li><div>Right null only → return <code className="ds-code">root.left</code>.</div></li>
            <li><div>Both present → find successor, overwrite value, recursively delete from right subtree.</div></li>
            <li><div>Return <code className="ds-code">root</code> at the end (re-attachment happens naturally through the recursive assignments).</div></li>
          </ol>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">deleteNode</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> key) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) {
            <span class="kw">return</span> root; <span class="cm">// base case — nothing here to delete</span>
        }

        <span class="kw">if</span> (key &lt; root.val) {
            root.left = <span class="fn">deleteNode</span>(root.left, key);   <span class="cm">// search left, reattach result</span>
        } <span class="kw">else if</span> (key &gt; root.val) {
            root.right = <span class="fn">deleteNode</span>(root.right, key); <span class="cm">// search right, reattach result</span>
        } <span class="kw">else</span> {
            <span class="cm">// root.val == key — this is the node to delete</span>

            <span class="cm">// Case 1: leaf node</span>
            <span class="kw">if</span> (root.left == <span class="kw">null</span> &amp;&amp; root.right == <span class="kw">null</span>) {
                <span class="kw">return null</span>;
            }

            <span class="cm">// Case 2: single child</span>
            <span class="kw">if</span> (root.left == <span class="kw">null</span>) {
                <span class="kw">return</span> root.right;
            } <span class="kw">else if</span> (root.right == <span class="kw">null</span>) {
                <span class="kw">return</span> root.left;
            } <span class="kw">else</span> {
                <span class="cm">// Case 3: two children — use in-order successor</span>
                <span class="type">TreeNode</span> node = <span class="fn">findSuccessor</span>(root.right);
                root.val = node.val;                              <span class="cm">// shift value up</span>
                root.right = <span class="fn">deleteNode</span>(root.right, node.val); <span class="cm">// remove old position</span>
            }
        }
        <span class="kw">return</span> root;
    }

    <span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">findSuccessor</span>(<span class="type">TreeNode</span> node) {
        <span class="kw">while</span> (node.left != <span class="kw">null</span>) {
            node = node.left;
        }
        <span class="kw">return</span> node;
    }

    <span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">findPredecessor</span>(<span class="type">TreeNode</span> node) {
        <span class="kw">while</span> (node.right != <span class="kw">null</span>) {
            node = node.right;
        }
        <span class="kw">return</span> node;
    }
}`
          }}/></pre>

          <div className="callout info">
            <div className="callout-label">Predecessor and successor are interchangeable here</div>
            The implementation above uses the successor (right-then-leftmost). Swapping
            to <code className="ds-code">findPredecessor(root.left)</code> and recursing
            into <code className="ds-code">root.left</code> instead works identically —
            both are valid, equally correct strategies.
          </div>

          <div className="callout purple">
            <div className="callout-label">Author's Insight — Same skeleton as Insert</div>
            Notice the structural parallel with Insert into BST: both use the
            comparison-based left/right recursion, both reattach results via{" "}
            <code className="ds-code">root.left = ...</code> /{" "}
            <code className="ds-code">root.right = ...</code>, and both finish by
            returning <code className="ds-code">root</code>. Delete simply adds the
            three-case handling once the target node is actually found.
          </div>

          <h3 className="ds-h3">Complexity</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {[
                ["Time","O(h)","Search to find the node costs O(h); finding successor/predecessor and re-deleting costs at most the remaining height — h1 + h2 = h total"],
                ["Space","O(h)","Recursion stack depth = height of tree"],
                ["Worst case (skewed tree)","O(n)","h = n when tree is fully skewed"],
                ["Best case (balanced tree)","O(log n)","h = log n when tree is balanced"],
              ].map(([m,v,r]) => (
                <tr key={m}>
                  <td><strong className="ds-strong">{m}</strong></td>
                  <td><span className={v.includes("n)")&&!v.includes("log")?"tc tc-n":"tc tc-log"}>{v}</span></td>
                  <td style={{color:"#64748b",fontSize:12}}>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="callout proof">
            <div className="callout-label">Why h1 + h2 = h, not h1 × h2</div>
            Searching for the target node travels down some distance h1. Then finding the
            successor/predecessor and recursively deleting it travels the{" "}
            <em>remaining</em> height h2 below that point. Since these are sequential
            (not nested) traversals along the same path, total work is h1 + h2 — which is
            exactly the tree's height h, not a multiplied cost. This is why the technique
            stays efficient: replace the value first, then delete the easy case below,
            without ever needing to restructure the tree.
          </div>
        </>
      ),
    },
  ],
};