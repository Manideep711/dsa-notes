import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ12 = {
  id: "tiq12",
  labelText: "Question 12",
  labelColor: tokens.accent5,
  title: "Binary Tree Zigzag Level Order Traversal",
  navLabel: "Zigzag Level Order",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the root of a binary tree, return the{" "}
        <strong className="ds-strong">zigzag level order traversal</strong> of its node
        values: level 0 left-to-right, level 1 right-to-left, level 2 left-to-right, and
        so on — alternating direction each level.
      </div>

      <h3 className="ds-h3">Core Insight — It's Just BFS with a Direction Flag</h3>
      <p className="ds-p">
        This is standard level-order traversal (BFS). The only addition: track whether
        the current level is <strong className="ds-strong">even</strong> (normal
        left-to-right) or <strong className="ds-strong">odd</strong> (reversed
        right-to-left), and insert accordingly.
      </p>

      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 420 200">
          <line x1="210" y1="25" x2="130" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="210" y1="25" x2="290" y2="80" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="130" y1="80" x2="90"  y2="135" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="130" y1="80" x2="170" y2="135" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="290" y1="80" x2="290" y2="135" stroke="#252b3d" strokeWidth="1.5"/>
          {[
            ["1",210,25,tokens.accent3],
            ["2",130,82,tokens.accent5],["3",290,82,tokens.accent5],
            ["4",90,137,tokens.accent3],["5",170,137,tokens.accent3],["6",290,137,tokens.accent3],
            ["7",290,190,tokens.accent5],
          ].map(([v,cx,cy,col]) => (
            <g key={cx+""+cy}>
              <circle cx={cx} cy={cy} r="17" fill="#1a1f2e" stroke={col} strokeWidth="1.5"/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="11" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}
          <line x1="290" y1="146" x2="290" y2="175" stroke="#252b3d" strokeWidth="1.5"/>
          <text x="10" y="35"  fill={tokens.accent3} fontSize="9" fontFamily="JetBrains Mono">L0 (even): [1]</text>
          <text x="10" y="95"  fill={tokens.accent5} fontSize="9" fontFamily="JetBrains Mono">L1 (odd): [3,2] ← reversed</text>
          <text x="10" y="150" fill={tokens.accent3} fontSize="9" fontFamily="JetBrains Mono">L2 (even): [4,5,6]</text>
          <text x="10" y="195" fill={tokens.accent5} fontSize="9" fontFamily="JetBrains Mono">L3 (odd): [7] ← single, still "reversed"</text>
        </svg>
        <figcaption>Result: [[1], [3,2], [4,5,6], [7]]</figcaption>
      </div>

      <h3 className="ds-h3">Two Ways to Reverse a Level</h3>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.danger}` }}>
          <h4 className="ds-h4" style={{ color: tokens.danger }}>ArrayList + insert(0, val)</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Insert each new value at index 0. Every insertion shifts all existing
            elements right by one. For k nodes in a level, this costs O(k) per insert →
            O(k²) for the whole level in the worst case.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent3 }}>LinkedList + addFirst(val)</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Insert at the head in O(1) — no shifting needed, just relink pointers. For odd
            levels, this gives reversed order automatically with zero shifting cost.
          </p>
        </div>
      </div>

      <div className="callout proof">
        <div className="callout-label">Why LinkedList addFirst is O(1)</div>
        A LinkedList maintains a head pointer. Adding at the head just creates a new node
        pointing to the old head, then updates the head pointer — two pointer operations,
        no traversal, no shifting. ArrayList must physically move every element to make
        room at index 0, costing O(k) for k existing elements.
      </div>

      <h3 className="ds-h3">Algorithm</h3>
      <ol className="ds-steps">
        <li><div>Base case: <code className="ds-code">root == null → return empty result</code>.</div></li>
        <li><div>Create a queue, offer root. Initialize <code className="ds-code">level = 0</code>.</div></li>
        <li><div>While queue is not empty: snapshot <code className="ds-code">size = queue.size()</code>, create a fresh <code className="ds-code">levelSubList</code> (LinkedList).</div></li>
        <li>
          <div>
            Inner loop over <code className="ds-code">size</code> nodes: poll each node.
            If <code className="ds-code">level % 2 != 0</code> (odd) →{" "}
            <code className="ds-code">levelSubList.addFirst(node.val)</code>. Else (even) →{" "}
            <code className="ds-code">levelSubList.add(node.val)</code>. Offer non-null
            children.
          </div>
        </li>
        <li><div>After inner loop: <code className="ds-code">level++</code>, add <code className="ds-code">levelSubList</code> to result.</div></li>
      </ol>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Level 1 (odd): nodes [2, 3]</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Pop</th><th>level % 2</th><th>Action</th><th>levelSubList after</th></tr>
          </thead>
          <tbody>
            {[
              ["2","1 (odd)","addFirst(2)","[2]"],
              ["3","1 (odd)","addFirst(3)","[3, 2]"],
            ].map(([pop,mod,act,list]) => (
              <tr key={pop}>
                <td style={{color:tokens.accent5}}>{pop}</td>
                <td style={{color:tokens.accent}}>{mod}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{act}</td>
                <td><code className="ds-code">{list}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.accent3, marginTop:8, marginBottom:0}}>
          Each new value goes to the front → final order [3, 2] ✓ (reversed automatically)
        </p>
      </div>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Level 2 (even): nodes [4, 5, 6]</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Pop</th><th>level % 2</th><th>Action</th><th>levelSubList after</th></tr>
          </thead>
          <tbody>
            {[
              ["4","0 (even)","add(4)","[4]"],
              ["5","0 (even)","add(5)","[4, 5]"],
              ["6","0 (even)","add(6)","[4, 5, 6]"],
            ].map(([pop,mod,act,list]) => (
              <tr key={pop}>
                <td style={{color:tokens.accent3}}>{pop}</td>
                <td style={{color:tokens.accent}}>{mod}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{act}</td>
                <td><code className="ds-code">{list}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">List</span>&lt;<span class="type">Integer</span>&gt;&gt; <span class="fn">zigzagLevelOrder</span>(<span class="type">TreeNode</span> root) {
        <span class="type">List</span>&lt;<span class="type">List</span>&lt;<span class="type">Integer</span>&gt;&gt; res = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

        <span class="type">Queue</span>&lt;<span class="type">TreeNode</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
        queue.<span class="fn">offer</span>(root);
        <span class="kw">int</span> level = <span class="num">0</span>;

        <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
            <span class="kw">int</span> size = queue.<span class="fn">size</span>();
            <span class="type">LinkedList</span>&lt;<span class="type">Integer</span>&gt; levelSubList = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();

            <span class="kw">while</span> (size &gt; <span class="num">0</span>) {
                <span class="type">TreeNode</span> node = queue.<span class="fn">poll</span>();

                <span class="kw">if</span> (level % <span class="num">2</span> != <span class="num">0</span>) {       <span class="cm">// odd level → reverse via head-insert</span>
                    levelSubList.<span class="fn">addFirst</span>(node.val);
                } <span class="kw">else</span> {                          <span class="cm">// even level → normal append</span>
                    levelSubList.<span class="fn">add</span>(node.val);
                }

                <span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.<span class="fn">offer</span>(node.left);
                <span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.<span class="fn">offer</span>(node.right);
                size--;
            }
            level++;
            res.<span class="fn">add</span>(levelSubList);
        }
        <span class="kw">return</span> res;
    }
}`
      }}/></pre>

      <div className="callout warn">
        <div className="callout-label">addFirst vs insert(0, val) — pick the right type</div>
        <code className="ds-code">addFirst</code> only exists on <code className="ds-code">LinkedList</code>{" "}
        (and <code className="ds-code">Deque</code>), not on <code className="ds-code">ArrayList</code>.
        If you declare the sublist as <code className="ds-code">List&lt;Integer&gt;</code>{" "}
        without specifying LinkedList, you lose access to this O(1) method. Always
        declare as <code className="ds-code">LinkedList&lt;Integer&gt;</code> when you
        need head insertion.
      </div>

      <div className="callout purple">
        <div className="callout-label">Author's benchmark note</div>
        The author explicitly tested both versions — using <code className="ds-code">LinkedList</code>{" "}
        with <code className="ds-code">addFirst</code> ran measurably faster than{" "}
        <code className="ds-code">ArrayList</code> with <code className="ds-code">insert(0, val)</code>{" "}
        because the LinkedList version avoids all the O(k) shifting cost on every odd-level insertion.
      </div>

      <h3 className="ds-h3">Complexity</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Metric</th><th>Value</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {[
            ["Time","O(n)","Every node enqueued/dequeued once. addFirst is O(1) so no extra cost from reversal"],
            ["Time (if using ArrayList.add(0,val))","O(n + k)","k = total nodes across all odd levels; each shift costs O(level size)"],
            ["Space","O(m)","m = max nodes on any single level (queue width)"],
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
        <div className="callout-label">Why the ArrayList version is O(n + k), not O(n × k)</div>
        Shifting only happens on <strong className="ds-strong">odd levels</strong>, not
        every level. If k is the total number of nodes across all odd levels, the extra
        shifting work sums to O(k) added on top of the base O(n) BFS — not multiplied,
        since each node still only does O(1) "normal" work, with the shift cost being an
        additional one-time charge per odd-level node.
      </div>
    </>
  ),
};