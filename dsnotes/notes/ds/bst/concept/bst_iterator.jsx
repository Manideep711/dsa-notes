import React from "react";
import { tokens } from "../../../../tokens";

export const bstIteratorTab = {
  id: "bstIterator",
  label: "BST Iterator",
  colorVar: tokens.accent2,
  sections: [
    // ─── Section 01 ────────────────────────────────────────────────────────
    {
      id: "bstiter1",
      labelText: "Section 01",
      labelColor: tokens.accent2,
      title: "BST Iterator — Problem",
      navLabel: "Problem",
      render: () => (
        <>
          <div className="callout info">
            <div className="callout-label">Problem</div>
            Implement a <code className="ds-code">BSTIterator</code> class that
            represents an iterator over the in-order traversal of a BST. The constructor
            takes the root. <code className="ds-code">next()</code> moves the pointer
            forward and returns the number at the pointer.{" "}
            <code className="ds-code">hasNext()</code> returns whether a next number
            exists, without advancing.
          </div>

          <p className="ds-p">
            The pointer starts conceptually before the smallest element, so the first
            call to <code className="ds-code">next()</code> returns the smallest value
            in the BST. Calls to <code className="ds-code">next()</code> are guaranteed
            valid — there will always be a next element when it's called.
          </p>

          <div className="callout proof">
            <div className="callout-label">The Core Task — Simulate In-order Traversal Across Multiple Calls</div>
            Normally in-order traversal runs start-to-finish in one recursive sweep. Here
            we need to <strong className="ds-strong">pause</strong> after each node and{" "}
            <strong className="ds-strong">resume exactly where we left off</strong> on
            the next call — without re-traversing from the root each time.
          </div>
        </>
      ),
    },

    // ─── Section 02 ────────────────────────────────────────────────────────
    {
      id: "bstiter2",
      labelText: "Section 02",
      labelColor: tokens.accent2,
      title: "Approach 1 — Precompute Full In-order List",
      navLabel: "Approach 1 — Precompute",
      render: () => (
        <>
          <p className="ds-p">
            The simplest idea: in the constructor, run a full in-order traversal once,
            store all values in a list, and maintain an index pointer.
          </p>

          <ol className="ds-steps">
            <li><div>Constructor: run in-order traversal, store results in a list. Initialize <code className="ds-code">index = -1</code>.</div></li>
            <li><div><code className="ds-code">next()</code>: increment <code className="ds-code">index</code>, return <code className="ds-code">list.get(index)</code>.</div></li>
            <li><div><code className="ds-code">hasNext()</code>: return <code className="ds-code">index &lt; list.size() - 1</code>.</div></li>
          </ol>

          <h3 className="ds-h3">Complexity</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Operation</th><th>Time</th><th>Space</th></tr>
            </thead>
            <tbody>
              {[
                ["Constructor","O(n)","O(n) — full list stored"],
                ["next()","O(1)","—"],
                ["hasNext()","O(1)","—"],
              ].map(([op,t,s]) => (
                <tr key={op}>
                  <td>{op}</td>
                  <td><span className={t==="O(n)"?"tc tc-n":"tc tc-1"}>{t}</span></td>
                  <td style={{color:"#64748b",fontSize:12}}>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="callout warn">
            <div className="callout-label">The follow-up that breaks this approach</div>
            The problem's constraints explicitly ask: can{" "}
            <code className="ds-code">next()</code> and{" "}
            <code className="ds-code">hasNext()</code> run in O(1){" "}
            <strong className="ds-strong">average</strong> time using O(h) memory, where
            h is the tree's height? This approach uses O(n) memory — violating the
            constraint whenever the tree isn't a single chain (where h would equal n
            anyway). We need a fundamentally different storage strategy.
          </div>
        </>
      ),
    },

    // ─── Section 03 ────────────────────────────────────────────────────────
    {
      id: "bstiter3",
      labelText: "Section 03",
      labelColor: tokens.accent2,
      title: "Approach 2 — Controlled Stack (O(h) Space)",
      navLabel: "Approach 2 — Controlled Stack",
      render: () => (
        <>
          <p className="ds-p">
            Instead of storing every value up front, simulate in-order traversal lazily
            using a stack — exactly mimicking how recursive in-order traversal would
            behave (Left → Root → Right), but pausing after each "visit root" step.
          </p>

          <div className="callout proof">
            <div className="callout-label">The Key Idea — Only ever store the left boundary</div>
            At any point in time, the stack holds only the{" "}
            <strong className="ds-strong">current left boundary</strong> path — never
            more nodes than the height of the tree. This is what keeps space at O(h)
            instead of O(n).
          </div>

          <h3 className="ds-h3">Constructor — Push the Initial Left Boundary</h3>
          <ol className="ds-steps">
            <li><div>Start at <code className="ds-code">root</code>.</div></li>
            <li><div>While the current node is not null: push it onto the stack, then move to its left child.</div></li>
            <li><div>Stop when null is reached — the stack now holds the entire leftmost path, from root down to the smallest element, top of stack being the smallest.</div></li>
          </ol>

          <div className="diagram-wrap">
            <svg width="100%" viewBox="0 0 360 200">
              <line x1="180" y1="20" x2="180" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
              <line x1="180" y1="80" x2="180" y2="140" stroke="#252b3d" strokeWidth="1.5"/>
              {[
                ["8",180,20,tokens.accent2],["7",180,82,tokens.accent2],["6",180,144,tokens.accent2],
              ].map(([v,cx,cy,col]) => (
                <g key={cx+""+cy}>
                  <circle cx={cx} cy={cy} r="16" fill="#1a1f2e" stroke={col} strokeWidth="1.5"/>
                  <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
                </g>
              ))}
              {/* stack visualization */}
              <rect x="240" y="60" width="60" height="100" fill="none" stroke="#252b3d" strokeWidth="1" rx="3"/>
              <text x="270" y="50" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">stack</text>
              <rect x="245" y="65" width="50" height="26" fill={`${tokens.accent2}22`} stroke={tokens.accent2} strokeWidth="1" rx="2"/>
              <text x="270" y="82" textAnchor="middle" fill={tokens.accent2} fontSize="11" fontFamily="JetBrains Mono">6 ← top</text>
              <rect x="245" y="95" width="50" height="26" fill={`${tokens.accent2}22`} stroke={tokens.accent2} strokeWidth="1" rx="2"/>
              <text x="270" y="112" textAnchor="middle" fill={tokens.accent2} fontSize="11" fontFamily="JetBrains Mono">7</text>
              <rect x="245" y="125" width="50" height="26" fill={`${tokens.accent2}22`} stroke={tokens.accent2} strokeWidth="1" rx="2"/>
              <text x="270" y="142" textAnchor="middle" fill={tokens.accent2} fontSize="11" fontFamily="JetBrains Mono">8</text>
            </svg>
            <figcaption>After constructor: stack holds [8, 7, 6] bottom-to-top, with 6 (smallest) on top — ready for the first next() call.</figcaption>
          </div>

          <h3 className="ds-h3">next() — Pop, Then Push the New Left Boundary on the Right Side</h3>
          <ol className="ds-steps">
            <li><div>Pop the top of the stack — this is the answer (the next smallest unvisited value).</div></li>
            <li><div>Save its value to return.</div></li>
            <li><div>Move to that node's <strong className="ds-strong">right child</strong>.</div></li>
            <li><div>While that node is not null: push it, move to its left child — exactly the same left-boundary-pushing logic as the constructor.</div></li>
            <li><div>Return the saved value.</div></li>
          </ol>

          <div className="callout info">
            <div className="callout-label">Why move right then push the left boundary again</div>
            This precisely mimics recursive in-order traversal: after visiting a node
            (popping/printing it), in-order moves to its right subtree and then dives as
            far left as possible within that subtree — because the smallest unvisited
            value is always the leftmost node of whatever subtree comes next.
          </div>

          <div className="trick-box">
            <div className="trick-title">Dry Run — Tree: 8→left:7→left:6, 8→right(none); 12→right:13→left:nothing,right:15→left:nothing</div>
            <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 8 }}>
              Full tree in-order: 6, 7, 8, 12, 13, 15, 18
            </p>
            <table className="ds-tbl" style={{ marginTop: 0 }}>
              <thead>
                <tr><th>Call</th><th>Stack before</th><th>Popped/Returned</th><th>Right-move + left-push</th><th>Stack after</th></tr>
              </thead>
              <tbody>
                {[
                  ["constructor","—","—","push 8,7,6 (left boundary)","[8,7,6]"],
                  ["next()","[8,7,6]","6","6.right = null, nothing pushed","[8,7]"],
                  ["next()","[8,7]","7","7.right = null, nothing pushed","[8]"],
                  ["next()","[8]","8","8.right = 12 → push 12 (12.left=null, stop)","[12]"],
                  ["next()","[12]","12","12.right = 13 → push 13, 13.left=null, stop","[13]"],
                  ["next()","[13]","13","13.right = null, nothing pushed","[]"],
                ].map(([call,before,popped,act,after],i) => (
                  <tr key={call+i}>
                    <td style={{fontSize:10}}>{call}</td>
                    <td><code className="ds-code">{before}</code></td>
                    <td style={{color:tokens.accent3,fontWeight:500}}>{popped}</td>
                    <td style={{color:"#c8d3e0",fontSize:11}}>{act}</td>
                    <td><code className="ds-code">{after}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
              Values returned in order so far: 6, 7, 8, 12, 13 — exactly matching sorted
              in-order sequence, with the stack at no point holding more than the height
              of the tree's current path.
            </p>
          </div>

          <h3 className="ds-h3">hasNext() — Trivial Check</h3>
          <p className="ds-p">
            Simply check whether the stack is non-empty.{" "}
            <strong className="ds-strong">Crucially, this does not modify the
            stack</strong> — no popping, no peeking deeper than the top.
          </p>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">BSTIterator</span> {
    <span class="type">Stack</span>&lt;<span class="type">TreeNode</span>&gt; stack;

    <span class="kw">public</span> <span class="fn">BSTIterator</span>(<span class="type">TreeNode</span> root) {
        stack = <span class="kw">new</span> <span class="type">Stack</span>&lt;&gt;();
        <span class="cm">// insert left boundary</span>
        <span class="type">TreeNode</span> node = root;
        <span class="kw">while</span> (node != <span class="kw">null</span>) {
            stack.<span class="fn">push</span>(node);
            node = node.left;
        }
    }

    <span class="kw">public int</span> <span class="fn">next</span>() {
        <span class="type">TreeNode</span> node = stack.<span class="fn">pop</span>();
        <span class="kw">int</span> val = node.val;

        node = node.right;             <span class="cm">// move right once</span>
        <span class="kw">while</span> (node != <span class="kw">null</span>) {  <span class="cm">// then push the new left boundary</span>
            stack.<span class="fn">push</span>(node);
            node = node.left;
        }
        <span class="kw">return</span> val;
    }

    <span class="kw">public boolean</span> <span class="fn">hasNext</span>() {
        <span class="kw">return</span> !stack.<span class="fn">isEmpty</span>();
    }
}`
          }}/></pre>
        </>
      ),
    },

    // ─── Section 04 ────────────────────────────────────────────────────────
    {
      id: "bstiter4",
      labelText: "Section 04",
      labelColor: tokens.accent2,
      title: "Complexity — Why next() is O(1) Average, Not Worst-Case",
      navLabel: "Amortized Complexity",
      render: () => (
        <>
          <p className="ds-p">
            A single call to <code className="ds-code">next()</code> can, in the worst
            case, push many nodes onto the stack (an entire left boundary of a subtree)
            — that single call is not strictly O(1). The constraint specifically asks
            for O(1) <strong className="ds-strong">average</strong> (amortized) time,
            not true worst-case O(1) per call.
          </p>

          <div className="callout proof">
            <div className="callout-label">The Amortized Argument</div>
            Across the entire lifetime of the iterator, every node in the tree gets{" "}
            <strong className="ds-strong">pushed onto the stack exactly once</strong>{" "}
            (either during the constructor or during some <code className="ds-code">next()</code>{" "}
            call) and <strong className="ds-strong">popped exactly once</strong>. With n
            total nodes, the total work across all push/pop operations is O(n). Since{" "}
            <code className="ds-code">next()</code> is called at most n times (once per
            node), the average cost per call is{" "}
            <code className="ds-code">O(n) / n = O(1)</code>.
          </div>

          <h3 className="ds-h3">Complexity Table</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Operation</th><th>Worst-case single call</th><th>Average (amortized)</th><th>Space</th></tr>
            </thead>
            <tbody>
              {[
                ["Constructor","O(h)","—","O(h)"],
                ["next()","O(h) in worst single call","O(1) amortized","—"],
                ["hasNext()","O(1)","O(1)","—"],
              ].map(([op,wc,avg,sp]) => (
                <tr key={op}>
                  <td>{op}</td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{wc}</td>
                  <td><span className="tc tc-1">{avg}</span></td>
                  <td><span className="tc tc-log">{sp}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="callout warn">
            <div className="callout-label">Space is O(h), not O(n) — exactly meeting the follow-up</div>
            The stack only ever holds nodes along the current left-boundary path — at
            most the height of the tree at any moment. This is what makes the controlled
            stack approach satisfy the stricter O(h) memory requirement that Approach 1
            (precomputed full list) could not.
          </div>

          <div className="callout purple">
            <div className="callout-label">Author's Insight — Reusing the iterative in-order pattern</div>
            This solution directly reuses the technique from{" "}
            <strong className="ds-strong">iterative in-order traversal using a
            stack</strong> (covered separately): push the entire left boundary first,
            then each "visit" pops one node and pushes the left boundary of its right
            subtree. The BST Iterator problem is really asking you to{" "}
            <em>pause</em> that same algorithm between steps rather than run it to
            completion in one shot.
          </div>

          <h3 className="ds-h3 green">Approach Comparison</h3>
          <table className="ds-tbl">
            <thead>
              <tr><th>Aspect</th><th>Approach 1 — Precompute</th><th>Approach 2 — Controlled Stack</th></tr>
            </thead>
            <tbody>
              {[
                ["Constructor time","O(n)","O(h)"],
                ["Space","O(n)","O(h)"],
                ["next() time","O(1) true","O(1) amortized"],
                ["Meets the O(h)-memory follow-up?","No","Yes"],
              ].map(([asp,a1,a2]) => (
                <tr key={asp}>
                  <td><strong className="ds-strong">{asp}</strong></td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{a1}</td>
                  <td style={{color:"#c8d3e0",fontSize:12}}>{a2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ),
    },
  ],
};