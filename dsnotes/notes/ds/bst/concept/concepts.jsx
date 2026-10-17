import React from "react";
import { tokens } from "../../../../tokens";

export const bstConceptsTab = {
  id: "bstConcepts",
  label: "BST Basics",
  colorVar: tokens.accent3,
  sections: [
    // ─── Section 01 ────────────────────────────────────────────────────────
    {
      id: "bst1",
      labelText: "Section 01",
      labelColor: tokens.accent3,
      title: "What is a Binary Search Tree?",
      navLabel: "What is a BST?",
      render: () => (
        <>
          <p className="ds-p">
            A <span className="hi3">Binary Search Tree (BST)</span> is a binary tree with
            one extra rule layered on top: for{" "}
            <strong className="ds-strong">every single node</strong>, its{" "}
            <strong className="ds-strong">left subtree</strong> contains only smaller
            values, and its <strong className="ds-strong">right subtree</strong> contains
            only larger values.
          </p>

          <div className="formula">
            <div className="formula-label">BST Property</div>
            left subtree &lt; node &lt; right subtree &nbsp;&nbsp;(applies to every node, not just the root)
          </div>

          <div className="diagram-wrap">
            <svg width="100%" viewBox="0 0 420 200">
              <line x1="210" y1="25" x2="120" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="210" y1="25" x2="300" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="120" y1="80" x2="80"  y2="135" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="120" y1="80" x2="160" y2="135" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="300" y1="80" x2="260" y2="135" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="300" y1="80" x2="340" y2="135" stroke="#252b3d" strokeWidth="1.5"/>
              {[
                ["10",210,25],["8",120,82],["12",300,82],
                ["2",80,137],["9",160,137],["11",260,137],["15",340,137],
              ].map(([v,cx,cy]) => (
                <g key={cx+""+cy}>
                  <circle cx={cx} cy={cy} r="17" fill="#1a1f2e" stroke={tokens.accent3} strokeWidth="1.5"/>
                  <text x={cx} y={cy+5} textAnchor="middle" fill={tokens.accent3} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
                </g>
              ))}
              <text x="10"  y="60" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">left subtree of 10: {"{8,2,9}"} all &lt; 10</text>
              <text x="230" y="60" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">right subtree of 10: {"{12,11,15}"} all &gt; 10</text>
            </svg>
            <figcaption>
              Every node obeys the property relative to its own subtrees — not just the
              root. Node 8's left (2) is smaller, right (9) is larger, and so on recursively.
            </figcaption>
          </div>

          <div className="callout info">
            <div className="callout-label">It's a Constraint, Not a New Shape</div>
            A BST has the exact same internal structure as a regular binary tree —{" "}
            <code className="ds-code">val</code>, <code className="ds-code">left</code>,{" "}
            <code className="ds-code">right</code>. The only difference is the ordering
            constraint on values. Every BST is a binary tree, but not every binary tree
            is a BST.
          </div>
        </>
      ),
    },

    // ─── Section 02 ────────────────────────────────────────────────────────
    {
      id: "bst2",
      labelText: "Section 02",
      labelColor: tokens.accent3,
      title: "Handling Duplicates",
      navLabel: "Handling Duplicates",
      render: () => (
        <>
          <p className="ds-p">
            By <strong className="ds-strong">definition</strong>, a BST does not support
            duplicate values — that's a core part of what makes it a BST. Unless a problem
            explicitly says otherwise, always assume{" "}
            <strong className="ds-strong">no duplicates exist</strong>.
          </p>

          <div className="callout warn">
            <div className="callout-label">If a problem explicitly asks you to handle duplicates</div>
            Two common tricks:
          </div>

          <div className="prop-grid">
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Trick 1 — Relax one side</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                Either: <code className="ds-code">left ≤ root &lt; right</code>{" "}
                (left side allows equal), or <code className="ds-code">left &lt; root ≤ right</code>{" "}
                (right side allows equal). Pick one convention and stay consistent.
              </p>
            </div>
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent}` }}>
              <h4 className="ds-h4">Trick 2 — Frequency counter</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                Don't insert the duplicate as a new node. Instead, store a{" "}
                <code className="ds-code">count</code> field on the existing node and
                increment it. E.g., inserting 10 again when 10 already exists → count
                becomes 2.
              </p>
            </div>
          </div>

          <div className="callout proof">
            <div className="callout-label">Default Assumption</div>
            Theoretically, true BSTs never have duplicates. So when a problem doesn't
            mention duplicates at all, treat the input as duplicate-free — this is the
            standard assumption across nearly every BST interview question.
          </div>
        </>
      ),
    },

    // ─── Section 03 ────────────────────────────────────────────────────────
    {
      id: "bst3",
      labelText: "Section 03",
      labelColor: tokens.accent3,
      title: "Constructing a BST from an Array",
      navLabel: "Construct from Array",
      render: () => (
        <>
          <p className="ds-p">
            Given an array with no duplicates, build a BST by{" "}
            <strong className="ds-strong">inserting elements one at a time</strong>, left
            to right, each time following the BST property to find the correct position.
          </p>

          <ol className="ds-steps">
            <li><div>Start with <code className="ds-code">root = null</code>.</div></li>
            <li><div>For each array element (left to right): insert it into the BST built so far.</div></li>
            <li><div>To insert: starting at root, compare the new value against the current node. Smaller → go left, larger → go right.</div></li>
            <li><div>When you reach a <code className="ds-code">null</code> position, place the new node there.</div></li>
          </ol>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Array: [9, 8, 4, 6, 11, 15, 7, 19, 10]</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>Insert</th><th>Path taken</th><th>Placed at</th></tr>
              </thead>
              <tbody>
                {[
                  ["9","root is null","becomes root"],
                  ["8","9 → left (8&lt;9)","9.left"],
                  ["4","9→left→8→left (4&lt;9, 4&lt;8)","8.left"],
                  ["6","9→8→4→right (6&lt;9,6&lt;8,6&gt;4)","4.right"],
                  ["11","9→right (11&gt;9)","9.right"],
                  ["15","9→11→right (15&gt;9,15&gt;11)","11.right"],
                  ["7","9→8→4→6→right (7&gt;4,7&gt;6, 7&lt;8,7&lt;9)","6.right"],
                  ["19","9→11→15→right (19&gt; all three)","15.right"],
                  ["10","9→11→left (10&gt;9, 10&lt;11)","11.left"],
                ].map(([v,path,pos]) => (
                  <tr key={v}>
                    <td style={{color:tokens.accent3}}>{v}</td>
                    <td style={{color:"#c8d3e0",fontSize:11}} dangerouslySetInnerHTML={{__html:path}}/>
                    <td style={{color:tokens.accent2,fontSize:12}}>{pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="diagram-wrap">
            <svg width="100%" viewBox="0 0 460 220">
              <line x1="230" y1="20" x2="150" y2="75" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="230" y1="20" x2="320" y2="75" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="150" y1="75" x2="120" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="120" y1="130" x2="150" y2="185" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="320" y1="75" x2="280" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="320" y1="75" x2="370" y2="130" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="280" y1="130" x2="260" y2="185" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="370" y1="130" x2="390" y2="185" stroke="#252b3d" strokeWidth="1.5"/>
              {[
                ["9",230,20],["8",150,77],["11",320,77],
                ["4",120,132],["10",280,132],["15",370,132],
                ["6",150,187],["19",390,187],
              ].map(([v,cx,cy]) => (
                <g key={cx+""+cy}>
                  <circle cx={cx} cy={cy} r="16" fill="#1a1f2e" stroke={tokens.accent3} strokeWidth="1.5"/>
                  <text x={cx} y={cy+5} textAnchor="middle" fill={tokens.accent3} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
                </g>
              ))}
              <text x="260" y="195" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">7 →</text>
              <line x1="245" y1="187" x2="262" y2="187" stroke="#64748b" strokeWidth="1"/>
            </svg>
            <figcaption>Final BST shape after all 9 insertions (node 7 attaches to 6's right, omitted above for space).</figcaption>
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">constructBST</span>(<span class="kw">int</span>[] arr) {
    <span class="type">TreeNode</span> root = <span class="kw">null</span>;
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; arr.length; i++) {
        root = <span class="fn">insertIntoBST</span>(root, arr[i]); <span class="cm">// re-bind root each time</span>
    }
    <span class="kw">return</span> root;
}`
          }}/></pre>

          <div className="callout info">
            <div className="callout-label">Why root keeps getting reassigned</div>
            On the very first insertion, <code className="ds-code">root</code> is{" "}
            <code className="ds-code">null</code> and must become the newly created node.
            <code className="ds-code">insertIntoBST</code> always returns the (possibly
            unchanged) root, so re-assigning <code className="ds-code">root =
            insertIntoBST(root, val)</code> safely handles both the first insertion and
            every subsequent one.
          </div>
        </>
      ),
    },

    // ─── Section 04 ────────────────────────────────────────────────────────
    {
      id: "bst4",
      labelText: "Section 04",
      labelColor: tokens.accent3,
      title: "Insert into BST — Iterative",
      navLabel: "Insert — Iterative",
      render: () => (
        <>
          <p className="ds-p">
            Walk down the tree from root using a temporary pointer, comparing the new
            value at each step, until an empty (<code className="ds-code">null</code>)
            spot is found — then attach the new node there.
          </p>

          <ol className="ds-steps">
            <li><div>If <code className="ds-code">root == null</code>: create a new node, return it immediately. (Tree was empty.)</div></li>
            <li><div>Otherwise, create <code className="ds-code">temp = root</code>.</div></li>
            <li><div>Loop while <code className="ds-code">temp != null</code>: compare value with <code className="ds-code">temp.val</code>.</div></li>
            <li><div>If smaller → check <code className="ds-code">temp.left</code>. If null, insert there and <code className="ds-code">break</code>. Else move <code className="ds-code">temp = temp.left</code>.</div></li>
            <li><div>If larger → same logic on <code className="ds-code">temp.right</code>.</div></li>
            <li><div>Return the (unchanged) <code className="ds-code">root</code>.</div></li>
          </ol>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">insertIntoBST</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> val) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) {
        root = <span class="kw">new</span> <span class="type">TreeNode</span>(val); <span class="cm">// empty tree — new node becomes root</span>
        <span class="kw">return</span> root;
    }

    <span class="type">TreeNode</span> temp = root;
    <span class="kw">while</span> (temp != <span class="kw">null</span>) {
        <span class="kw">if</span> (val &lt; temp.val) {
            <span class="kw">if</span> (temp.left == <span class="kw">null</span>) {
                temp.left = <span class="kw">new</span> <span class="type">TreeNode</span>(val);
                <span class="kw">break</span>;                 <span class="cm">// done — found the spot</span>
            } <span class="kw">else</span> {
                temp = temp.left;             <span class="cm">// keep searching left</span>
            }
        } <span class="kw">else</span> {
            <span class="kw">if</span> (temp.right == <span class="kw">null</span>) {
                temp.right = <span class="kw">new</span> <span class="type">TreeNode</span>(val);
                <span class="kw">break</span>;
            } <span class="kw">else</span> {
                temp = temp.right;            <span class="cm">// keep searching right</span>
            }
        }
    }
    <span class="kw">return</span> root; <span class="cm">// root pointer never changes after the first insertion</span>
}`
          }}/></pre>

          <div className="callout proof">
            <div className="callout-label">Why temp, not root, walks down</div>
            We never move <code className="ds-code">root</code> itself — it must always
            be returned pointing to the top of the tree. A separate{" "}
            <code className="ds-code">temp</code> pointer does the walking, leaving{" "}
            <code className="ds-code">root</code> untouched for the final return.
          </div>
        </>
      ),
    },

    // ─── Section 05 ────────────────────────────────────────────────────────
    {
      id: "bst5",
      labelText: "Section 05",
      labelColor: tokens.accent3,
      title: "Insert into BST — Recursive",
      navLabel: "Insert — Recursive",
      render: () => (
        <>
          <p className="ds-p">
            The recursive approach mirrors the iterative one but lets the call stack do
            the "remembering" instead of a temp pointer. Each call decides which side to
            recurse into, then{" "}
            <strong className="ds-strong">re-attaches the returned subtree</strong> to
            itself before returning upward.
          </p>

          <div className="callout proof">
            <div className="callout-label">The Core Idea — Reattach on the way back up</div>
            Find the correct position, insert there, then return that node. The parent
            who made the recursive call attaches the returned node as its{" "}
            <code className="ds-code">left</code> or <code className="ds-code">right</code>{" "}
            child, then returns itself. This chains all the way back to the root.
          </div>

          <ol className="ds-steps">
            <li><div>Base case: <code className="ds-code">root == null</code> → create new node, return it (this becomes the attachment point).</div></li>
            <li><div>If <code className="ds-code">val &lt; root.val</code> → <code className="ds-code">root.left = insertIntoBST(root.left, val)</code>.</div></li>
            <li><div>Else → <code className="ds-code">root.right = insertIntoBST(root.right, val)</code>.</div></li>
            <li><div>Return <code className="ds-code">root</code>.</div></li>
          </ol>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Insert 30 into a tree where 20.right = 25</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>Call</th><th>Node</th><th>Comparison</th><th>Action</th><th>Returns</th></tr>
              </thead>
              <tbody>
                {[
                  ["insertIntoBST(20,30)","20","30 &gt; 20","root.right = insert(25,30)","20 (after attach)"],
                  ["insertIntoBST(25,30)","25","30 &gt; 25","root.right = insert(null,30)","25 (after attach)"],
                  ["insertIntoBST(null,30)","null","—","create new node(30)","30 ← new node"],
                ].map(([call,node,cmp,act,ret]) => (
                  <tr key={call}>
                    <td style={{fontSize:10}}><code className="ds-code">{call}</code></td>
                    <td style={{color:tokens.accent5}}>{node}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}}>{cmp}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}}>{act}</td>
                    <td style={{color:tokens.accent3,fontWeight:500,fontSize:12}}>{ret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:8, marginBottom:0}}>
              25.right gets set to the new node(30) on the way back up; 20.right gets set
              to (now-modified) 25 on the way further up. Root reaches the top unchanged.
            </p>
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">insertIntoBST</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> val) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) {
        root = <span class="kw">new</span> <span class="type">TreeNode</span>(val); <span class="cm">// base case: this null slot becomes the new node</span>
        <span class="kw">return</span> root;
    }
    <span class="kw">if</span> (val &lt; root.val) {
        root.left = <span class="fn">insertIntoBST</span>(root.left, val);  <span class="cm">// reattach left subtree</span>
    } <span class="kw">else</span> {
        root.right = <span class="fn">insertIntoBST</span>(root.right, val); <span class="cm">// reattach right subtree</span>
    }
    <span class="kw">return</span> root; <span class="cm">// pass self back up to parent</span>
}`
          }}/></pre>

          <div className="callout purple">
            <div className="callout-label">Iterative vs Recursive — Same Time, Different Space</div>
            Both approaches find the same position and run in O(h) time. The recursive
            version additionally uses O(h) recursion stack space, while the iterative
            version uses O(1) extra space (just the temp pointer). When asked, mention
            this trade-off explicitly — it's a common interview follow-up.
          </div>
        </>
      ),
    },

    // ─── Section 06 ────────────────────────────────────────────────────────
    {
      id: "bst6",
      labelText: "Section 06",
      labelColor: tokens.accent3,
      title: "In-order Traversal Gives Sorted Output",
      navLabel: "In-order = Sorted",
      render: () => (
        <>
          <p className="ds-p">
            This is one of the most useful properties of a BST:{" "}
            <strong className="ds-strong">in-order traversal always visits nodes in
            increasing sorted order</strong>. It follows directly from the BST property
            itself.
          </p>

          <div className="callout proof">
            <div className="callout-label">Why this is guaranteed</div>
            In-order traversal visits Left → Root → Right. Since every node's left
            subtree holds strictly smaller values and right subtree holds strictly larger
            values, visiting left-first always emits smaller values before the current
            node, and right-last always emits larger values after it. This recursively
            holds at every level, producing fully sorted output.
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">public void</span> <span class="fn">inorderTraversal</span>(<span class="type">TreeNode</span> root) {
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span>;
    <span class="fn">inorderTraversal</span>(root.left);             <span class="cm">// smaller values first</span>
    System.out.<span class="fn">print</span>(root.val + <span class="str">" "</span>);  <span class="cm">// current node</span>
    <span class="fn">inorderTraversal</span>(root.right);            <span class="cm">// larger values last</span>
}`
          }}/></pre>

          <div className="trick-box">
            <div className="trick-title">Verification — BST built from [9,8,4,6,11,15,7,19,10]</div>
            <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
              In-order traversal output:{" "}
              <code className="ds-code">4 6 7 8 9 10 11 15 19</code> — exactly the input
              array sorted ascending. This is a reliable way to{" "}
              <strong className="ds-strong">verify</strong> that a constructed tree is a
              valid BST: build it, run in-order traversal, and check the output is sorted.
            </p>
          </div>

          <div className="callout info">
            <div className="callout-label">Practical use — BST validation</div>
            Whenever you need to confirm a tree-construction function is correct, run
            in-order traversal on the result and compare against the sorted input array.
            If they match, your BST property holds throughout the entire tree — not just
            at the root.
          </div>
        </>
      ),
    },

    // ─── Section 07 ────────────────────────────────────────────────────────
    {
      id: "bst7",
      labelText: "Section 07",
      labelColor: tokens.accent3,
      title: "Search in a BST",
      navLabel: "Search in BST",
      render: () => (
        <>
          <p className="ds-p">
            Given a BST and a target value, find the node holding that value (and return
            the subtree rooted there), or return <code className="ds-code">null</code>{" "}
            if it doesn't exist.
          </p>

          <h3 className="ds-h3">The Core Insight — Address Bubbling</h3>
          <p className="ds-p">
            Once the target node is found, simply{" "}
            <strong className="ds-strong">return its address upward unchanged</strong>.
            Each ancestor that made the recursive call just passes that same address
            further up — no extra work needed, because the BST property already
            guarantees we searched in the correct direction.
          </p>

          <div className="callout proof">
            <div className="callout-label">Why we never need to check the "other side"</div>
            Unlike a general binary tree, a BST tells you exactly which subtree the value
            must be in — there's no need to ever search both sides at any node. Once you
            commit to going left or right, that decision is final and correct.
          </div>

          <ol className="ds-steps">
            <li><div>If <code className="ds-code">root == null</code> OR <code className="ds-code">root.val == val</code> → return <code className="ds-code">root</code> (found it, or hit a dead end).</div></li>
            <li><div>If <code className="ds-code">val &lt; root.val</code> → recurse into <code className="ds-code">root.left</code>.</div></li>
            <li><div>Else → recurse into <code className="ds-code">root.right</code>.</div></li>
            <li><div>Return whatever the recursive call returned (either the found node, or <code className="ds-code">null</code>).</div></li>
          </ol>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Search for 1 in BST: 4 → left:2 → left:1</div>
            <table className="ds-tbl" style={{ marginTop: 12 }}>
              <thead>
                <tr><th>Call</th><th>Node</th><th>Comparison</th><th>Returns</th></tr>
              </thead>
              <tbody>
                {[
                  ["searchBST(4,1)","4","1 &lt; 4 → go left","whatever search(2,1) returns"],
                  ["searchBST(2,1)","2","1 &lt; 2 → go left","whatever search(1,1) returns"],
                  ["searchBST(1,1)","1","1 == 1 → match!","return node 1 (address found)"],
                ].map(([call,node,cmp,ret],i) => (
                  <tr key={call}>
                    <td style={{fontSize:10}}><code className="ds-code">{call}</code></td>
                    <td style={{color:tokens.accent5}}>{node}</td>
                    <td style={{color:"#c8d3e0",fontSize:12}}>{cmp}</td>
                    <td style={{color:i===2?tokens.accent3:"#c8d3e0",fontWeight:i===2?600:400,fontSize:12}}>{ret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:8, marginBottom:0}}>
              The address of node 1 bubbles straight up through search(2,1) and search(4,1) unchanged.
            </p>
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">searchBST</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> val) {
        <span class="kw">if</span> (root == <span class="kw">null</span> || root.val == val) {
            <span class="kw">return</span> root; <span class="cm">// found it, or ran out of tree</span>
        }

        <span class="type">TreeNode</span> ans = <span class="kw">null</span>;
        <span class="kw">if</span> (val &lt; root.val) {
            ans = <span class="fn">searchBST</span>(root.left, val);   <span class="cm">// BST guarantees value must be here</span>
        } <span class="kw">else</span> {
            ans = <span class="fn">searchBST</span>(root.right, val);
        }
        <span class="kw">return</span> ans; <span class="cm">// either null, or the found node's address</span>
    }
}`
          }}/></pre>

          <div className="callout warn">
            <div className="callout-label">Search vs Insert — same direction logic, different goal</div>
            Both search and insert use identical left/right decision logic based on value
            comparison. The difference: insert stops at a{" "}
            <code className="ds-code">null</code> and creates a node there; search stops
            at a <code className="ds-code">null</code> and reports "not found," or stops
            earlier the moment values match.
          </div>
        </>
      ),
    },

    // ─── Section 08 ────────────────────────────────────────────────────────
    {
      id: "bst8",
      labelText: "Section 08",
      labelColor: tokens.accent3,
      title: "Complexity Summary",
      navLabel: "Complexity",
      render: () => (
        <>
          <table className="ds-tbl">
            <thead>
              <tr><th>Operation</th><th>Time</th><th>Space</th><th>Note</th></tr>
            </thead>
            <tbody>
              {[
                ["Insert (iterative)","O(h)","O(1)","h = height of tree"],
                ["Insert (recursive)","O(h)","O(h)","extra space from recursion stack"],
                ["Search","O(h)","O(h)","O(1) if implemented iteratively"],
                ["Construct from array of n elements","O(n·h)","O(h)","n insertions, each costing O(h)"],
                ["In-order traversal","O(n)","O(h)","visits every node exactly once"],
              ].map(([op,t,s,note]) => (
                <tr key={op}>
                  <td>{op}</td>
                  <td><span className="tc tc-log">{t}</span></td>
                  <td><span className="tc tc-log">{s}</span></td>
                  <td style={{color:"#64748b",fontSize:12}}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="ds-h3">Why height (h), not log n — the case split</h3>
          <div className="prop-grid">
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.danger}` }}>
              <h4 className="ds-h4" style={{ color: tokens.danger }}>Skewed BST (worst case)</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                All nodes chained on one side (e.g., inserting a sorted array in order)
                → height = n. Every operation degrades to O(n).
              </p>
            </div>
            <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
              <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Complete BST (best case)</h4>
              <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
                Balanced insertion order → height = log₂ n. Every operation runs in
                O(log n) — this is the performance BSTs are known for.
              </p>
            </div>
          </div>

          <div className="callout danger">
            <div className="callout-label">The Core Weakness of a Plain BST</div>
            A plain BST gives no guarantee about its shape — insertion order entirely
            determines whether you get O(log n) or O(n) operations. This is exactly the
            problem that <strong className="ds-strong">self-balancing trees</strong>{" "}
            (AVL, Red-Black) solve, by actively restructuring the tree to keep height at
            O(log n) regardless of insertion order.
          </div>
        </>
      ),
    },
  ],
};