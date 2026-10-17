import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ9 = {
  id: "tiq9",
  labelText: "Question 09",
  labelColor: tokens.accent5,
  title: "Top View & Bottom View of Binary Tree",
  navLabel: "Top & Bottom View",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Two Problems, One Framework</div>
        <strong className="ds-strong">Top View:</strong> nodes visible when the tree is
        viewed from above — for each vertical column, return the{" "}
        <strong className="ds-strong">first (shallowest) node</strong>.
        <br /><br />
        <strong className="ds-strong">Bottom View:</strong> nodes visible when the tree
        is viewed from below — for each vertical column, return the{" "}
        <strong className="ds-strong">last (deepest) node</strong>.
      </div>

      <h3 className="ds-h3">The Column Number Concept</h3>
      <p className="ds-p">
        Think of the tree overlaid on a grid. Each node belongs to a{" "}
        <strong className="ds-strong">vertical column</strong>. The root is column 0.
        Every left child is <code className="ds-code">parent.col − 1</code>, every right
        child is <code className="ds-code">parent.col + 1</code>.
      </p>
      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 500 220">
          {/* column lines */}
          {[-2,-1,0,1,2].map((c,i) => (
            <line key={c} x1={80+i*90} y1="10" x2={80+i*90} y2="210"
              stroke="#252b3d" strokeWidth="1" strokeDasharray="4,4"/>
          ))}
          {[-2,-1,0,1,2].map((c,i) => (
            <text key={c} x={80+i*90} y="10" textAnchor="middle"
              fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">col {c}</text>
          ))}
          {/* edges */}
          <line x1="260" y1="40" x2="170" y2="100" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="260" y1="40" x2="350" y2="100" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="170" y1="100" x2="80"  y2="165" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="170" y1="100" x2="260" y2="165" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="350" y1="100" x2="350" y2="165" stroke="#252b3d" strokeWidth="1.5"/>
          {/* nodes */}
          {[
            ["1",260,32,0,tokens.accent5],
            ["2",170,92,-1,tokens.accent2],
            ["7",350,92,1,tokens.accent2],
            ["3",80,157,-2,tokens.accent3],
            ["4",260,157,0,tokens.accent],
            ["8",350,157,1,tokens.accent3],
          ].map(([v,cx,cy,col,color]) => (
            <g key={cx+cy}>
              <circle cx={cx} cy={cy} r="20" fill="#1a1f2e" stroke={color} strokeWidth="1.5"/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={color} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
              <text x={cx} y={cy+18} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">c={col}</text>
            </g>
          ))}
          <text x="10" y="50"  fill={tokens.accent5} fontSize="9" fontFamily="JetBrains Mono">Top view:    3, 2, 1, 7, 8</text>
          <text x="10" y="65"  fill={tokens.accent3} fontSize="9" fontFamily="JetBrains Mono">Bottom view: 3, 2, 4, 7, 8</text>
        </svg>
        <figcaption>
          Column assignments. Node 4 is at col=0, same as node 1. Top view picks node 1 (shallower). Bottom view picks node 4 (deeper).
        </figcaption>
      </div>

      <h3 className="ds-h3">Why BFS (not DFS)?</h3>
      <p className="ds-p">
        Both views require knowing which node appears{" "}
        <strong className="ds-strong">first or last at each column</strong>. BFS processes
        nodes level by level, so the first time a column is encountered it's the shallowest
        node (top view), and each subsequent encounter is a deeper node (bottom view).
        DFS cannot guarantee this — it might visit a deep node in a column before a
        shallower one in the same column.
      </p>
      <div className="callout danger">
        <div className="callout-label">Why DFS fails here</div>
        DFS dives into one subtree completely before exploring others. It can fill a column
        with a deep node before the shallower node in that column is even visited. This
        corrupts both top and bottom view results. The author explicitly demonstrates this
        — always use BFS for column-based tree problems.
      </div>

      <h3 className="ds-h3">CustomNode — The Key Data Structure</h3>
      <p className="ds-p">
        Standard BFS queues only nodes. Here we need to track the{" "}
        <strong className="ds-strong">column number</strong> alongside each node.
        We wrap them in a <code className="ds-code">CustomNode</code>:
      </p>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">CustomNode</span> {
    <span class="type">Node</span> node;
    <span class="kw">int</span> col;
    <span class="fn">CustomNode</span>(<span class="type">Node</span> node, <span class="kw">int</span> col) {
        <span class="kw">this</span>.node = node;
        <span class="kw">this</span>.col  = col;
    }
}`
      }}/></pre>

      <h3 className="ds-h3">TreeMap — Sorted Columns Automatically</h3>
      <p className="ds-p">
        We store results in a <code className="ds-code">TreeMap&lt;Integer, Integer&gt;</code>{" "}
        (column → node value). A <code className="ds-code">TreeMap</code> keeps its keys in
        sorted order automatically (internally a Red-Black Tree), so iterating it gives
        columns left-to-right without any manual sorting.
      </p>
      <div className="callout info">
        <div className="callout-label">TreeMap vs HashMap</div>
        <code className="ds-code">HashMap</code>: O(1) insert/lookup, unordered keys.
        <br/>
        <code className="ds-code">TreeMap</code>: O(log n) insert/lookup, keys always in
        ascending order. Use TreeMap here because we need left-to-right column output.
        The O(log n) cost per insertion makes total time O(n log n) vs O(n) for HashMap —
        but ordering is essential, so it's worth it.
      </div>

      <h3 className="ds-h3">Top View vs Bottom View — The One-Line Difference</h3>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Top View</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 8 }}>
            Insert into map <strong className="ds-strong">only if column not already present</strong>.
            First node encountered per column (shallowest) wins.
          </p>
          <pre className="ds-pre" style={{margin:0}}><code dangerouslySetInnerHTML={{__html:
`<span class="kw">if</span> (!map.<span class="fn">containsKey</span>(col)) {
    map.<span class="fn">put</span>(col, node.data); <span class="cm">// first = top</span>
}`
          }}/></pre>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>Bottom View</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 8 }}>
            <strong className="ds-strong">Always overwrite</strong> the column entry.
            Last node encountered per column (deepest) wins.
          </p>
          <pre className="ds-pre" style={{margin:0}}><code dangerouslySetInnerHTML={{__html:
`<span class="cm">// no containsKey check — just overwrite</span>
map.<span class="fn">put</span>(col, node.data); <span class="cm">// last = bottom</span>`
          }}/></pre>
        </div>
      </div>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Top View, Tree: [1, 2, 7, 3, 4, null, 8]</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Dequeued</th><th>col</th><th>Map has col?</th><th>Action</th><th>Map state</th></tr>
          </thead>
          <tbody>
            {[
              ["1 (root)","0","No","Insert 0→1","{0:1}"],
              ["2","−1","No","Insert −1→2","{−1:2, 0:1}"],
              ["7","1","No","Insert 1→7","{−1:2, 0:1, 1:7}"],
              ["3","−2","No","Insert −2→3","{−2:3, −1:2, 0:1, 1:7}"],
              ["4","0","Yes","Skip (top view)","unchanged"],
              ["8","2","No","Insert 2→8","{−2:3, −1:2, 0:1, 1:7, 2:8}"],
            ].map(([node,col,has,act,map]) => (
              <tr key={node+col}>
                <td style={{color:tokens.accent5}}>{node}</td>
                <td style={{color:tokens.accent}}>{col}</td>
                <td style={{color:has==="Yes"?tokens.danger:tokens.accent3}}>{has}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{act}</td>
                <td style={{color:"#64748b",fontSize:11}}>{map}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
          Top view = [3, 2, 1, 7, 8] ✓ (iterate TreeMap left to right)
        </p>
      </div>

      <div className="trick-box">
        <div className="trick-title">Dry Run — Bottom View (same tree, always overwrite)</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Dequeued</th><th>col</th><th>Action</th><th>Map state</th></tr>
          </thead>
          <tbody>
            {[
              ["1","0","put 0→1","{0:1}"],
              ["2","−1","put −1→2","{−1:2, 0:1}"],
              ["7","1","put 1→7","{−1:2, 0:1, 1:7}"],
              ["3","−2","put −2→3","{−2:3, −1:2, 0:1, 1:7}"],
              ["4","0","put 0→4 (overwrites 1)","{−2:3, −1:2, 0:4, 1:7}"],
              ["8","2","put 2→8","{−2:3, −1:2, 0:4, 1:7, 2:8}"],
            ].map(([node,col,act,map]) => (
              <tr key={node+col}>
                <td style={{color:tokens.accent5}}>{node}</td>
                <td style={{color:tokens.accent}}>{col}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{act}</td>
                <td style={{color:"#64748b",fontSize:11}}>{map}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:0}}>
          Bottom view = [3, 2, 4, 7, 8] ✓
        </p>
      </div>

      <h3 className="ds-h3">Top View — Code</h3>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">CustomNode</span> {
    <span class="type">Node</span> node; <span class="kw">int</span> col;
    <span class="fn">CustomNode</span>(<span class="type">Node</span> node, <span class="kw">int</span> col) { <span class="kw">this</span>.node=node; <span class="kw">this</span>.col=col; }
}

<span class="kw">static</span> <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">topView</span>(<span class="type">Node</span> root) {
    <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

    <span class="type">Queue</span>&lt;<span class="type">CustomNode</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
    queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(root, <span class="num">0</span>));
    <span class="type">TreeMap</span>&lt;<span class="type">Integer</span>, <span class="type">Integer</span>&gt; map = <span class="kw">new</span> <span class="type">TreeMap</span>&lt;&gt;();

    <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
        <span class="type">CustomNode</span> cn   = queue.<span class="fn">poll</span>();
        <span class="type">Node</span>       node = cn.node;
        <span class="kw">int</span>        col  = cn.col;

        <span class="kw">if</span> (!map.<span class="fn">containsKey</span>(col))       <span class="cm">// ← TOP VIEW: first wins</span>
            map.<span class="fn">put</span>(col, node.data);

        <span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(node.left,  col - <span class="num">1</span>));
        <span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(node.right, col + <span class="num">1</span>));
    }
    <span class="kw">for</span> (<span class="type">Map.Entry</span>&lt;<span class="type">Integer</span>, <span class="type">Integer</span>&gt; entry : map.<span class="fn">entrySet</span>())
        res.<span class="fn">add</span>(entry.<span class="fn">getValue</span>());
    <span class="kw">return</span> res;
}`
      }}/></pre>

      <h3 className="ds-h3">Bottom View — Code</h3>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">public</span> <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">bottomView</span>(<span class="type">Node</span> root) {
    <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

    <span class="type">Queue</span>&lt;<span class="type">CustomNode</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
    queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(root, <span class="num">0</span>));
    <span class="type">TreeMap</span>&lt;<span class="type">Integer</span>, <span class="type">Integer</span>&gt; map = <span class="kw">new</span> <span class="type">TreeMap</span>&lt;&gt;();

    <span class="kw">while</span> (!queue.<span class="fn">isEmpty</span>()) {
        <span class="type">CustomNode</span> cn   = queue.<span class="fn">poll</span>();
        <span class="type">Node</span>       node = cn.node;
        <span class="kw">int</span>        col  = cn.col;

        map.<span class="fn">put</span>(col, node.data);           <span class="cm">// ← BOTTOM VIEW: always overwrite</span>

        <span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(node.left,  col - <span class="num">1</span>));
        <span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(node.right, col + <span class="num">1</span>));
    }
    <span class="kw">for</span> (<span class="type">Map.Entry</span>&lt;<span class="type">Integer</span>, <span class="type">Integer</span>&gt; entry : map.<span class="fn">entrySet</span>())
        res.<span class="fn">add</span>(entry.<span class="fn">getValue</span>());
    <span class="kw">return</span> res;
}`
      }}/></pre>

      <h3 className="ds-h3 green">Follow-up — What if we want leftmost node when overlapping?</h3>
      <p className="ds-p">
        By default BFS processes left child before right, so when two nodes share a
        column at the same level, the right one overwrites the left (bottom view) or the
        left one wins (top view). To reverse this — prefer the left node on overlap in
        bottom view — simply{" "}
        <strong className="ds-strong">swap the insertion order in the queue</strong>:
        push right child first, then left child. Now the left child is processed last and
        overwrites the right.
      </p>
      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="cm">// Default: left child processed first → right overwrites (default behavior)</span>
<span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(node.left,  col - <span class="num">1</span>));
<span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(node.right, col + <span class="num">1</span>));

<span class="cm">// Follow-up: right child processed first → left overwrites (prefer left on tie)</span>
<span class="kw">if</span> (node.right != <span class="kw">null</span>) queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(node.right, col + <span class="num">1</span>));
<span class="kw">if</span> (node.left  != <span class="kw">null</span>) queue.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">CustomNode</span>(node.left,  col - <span class="num">1</span>));`
      }}/></pre>

      <h3 className="ds-h3">All Four Views — Summary</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>View</th><th>Map strategy</th><th>Queue order</th><th>Result</th></tr>
        </thead>
        <tbody>
          {[
            ["Top view","Insert only if col absent","Left first","Shallowest node per column"],
            ["Bottom view (right wins)","Always overwrite","Left first","Deepest node per col, right on tie"],
            ["Bottom view (left wins)","Always overwrite","Right first","Deepest node per col, left on tie"],
            ["Left view (Q8)","First node per level","Normal BFS","Leftmost node per level"],
            ["Right view (Q8)","Last node per level","Normal BFS","Rightmost node per level"],
          ].map(([v,ms,qo,res]) => (
            <tr key={v}>
              <td style={{color:tokens.accent5}}>{v}</td>
              <td style={{color:"#c8d3e0",fontSize:12}}>{ms}</td>
              <td style={{color:"#c8d3e0",fontSize:12}}>{qo}</td>
              <td style={{color:tokens.accent3,fontSize:12}}>{res}</td>
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
            ["Time","O(n log n)","BFS is O(n) + each TreeMap insert is O(log n)"],
            ["Space","O(n)","Queue + TreeMap both hold at most n entries"],
          ].map(([m,v,r]) => (
            <tr key={m}>
              <td><strong className="ds-strong">{m}</strong></td>
              <td><span className="tc tc-nlogn">{v}</span></td>
              <td style={{color:"#64748b",fontSize:13}}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout purple">
        <div className="callout-label">Interview Tip — TreeMap costs O(log n) per insert</div>
        If an interviewer asks why not HashMap, explain: HashMap gives O(1) inserts but
        unordered keys, requiring an O(n log n) sort at the end anyway. TreeMap gives
        O(log n) inserts and keys stay sorted throughout — same total complexity, cleaner
        code, no separate sort step.
      </div>
    </>
  ),
};