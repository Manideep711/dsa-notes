import React from "react";
import { tokens } from "../../../../tokens";

export const treeQ10 = {
  id: "tiq10",
  labelText: "Question 10",
  labelColor: tokens.accent5,
  title: "Vertical Order Traversal of Binary Tree",
  navLabel: "Vertical Traversal",
  render: () => (
    <>
      <div className="callout info">
        <div className="callout-label">Problem</div>
        Given the root of a binary tree, return its{" "}
        <strong className="ds-strong">vertical order traversal</strong> — a list of
        lists, one per vertical column from leftmost to rightmost, each column ordered
        top to bottom. If multiple nodes share the same row and column, sort them by
        value.
      </div>

      <h3 className="ds-h3">Grid Visualization — Rows and Columns</h3>
      <p className="ds-p">
        Think of the tree overlaid on a grid. Every node gets a{" "}
        <strong className="ds-strong">(column, level)</strong> coordinate:
      </p>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Column rules</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Root = col 0. Left child = <code className="ds-code">col − 1</code>. Right
            child = <code className="ds-code">col + 1</code>. Columns extend negatively
            left and positively right.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent5}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent5 }}>Level rules</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Root = level 0. Every child = <code className="ds-code">level + 1</code>.
            Levels always increase going down — no exceptions.
          </p>
        </div>
      </div>

      <div className="diagram-wrap">
        <svg width="100%" viewBox="0 0 520 220">
          {/* column lines */}
          {[-2,-1,0,1,2].map((c,i) => (
            <line key={c} x1={60+i*100} y1="15" x2={60+i*100} y2="215"
              stroke="#252b3d" strokeWidth="1" strokeDasharray="3,4"/>
          ))}
          {[-2,-1,0,1,2].map((c,i) => (
            <text key={c} x={60+i*100} y="13" textAnchor="middle"
              fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">col {c}</text>
          ))}
          {/* edges */}
          <line x1="260" y1="40" x2="160" y2="100" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="260" y1="40" x2="360" y2="100" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="160" y1="100" x2="60"  y2="165" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="160" y1="100" x2="260" y2="165" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="360" y1="100" x2="260" y2="165" stroke="#252b3d" strokeWidth="1.5"/>
          <line x1="360" y1="100" x2="460" y2="165" stroke="#252b3d" strokeWidth="1.5"/>
          {/* nodes */}
          {[
            ["1",260,32,"(0,0)",tokens.accent5],
            ["2",160,92,"(−1,1)",tokens.accent2],
            ["3",360,92,"(1,1)",tokens.accent2],
            ["7",60,158,"(−2,2)",tokens.accent3],
            ["6",260,158,"(0,2)",tokens.accent],
            ["8",260,175,"(0,2)",tokens.danger],
            ["10",460,158,"(2,2)",tokens.accent3],
          ].map(([v,cx,cy,coord,col],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="18" fill="#1a1f2e" stroke={col} strokeWidth="1.5"/>
              <text x={cx} y={cy+5} textAnchor="middle" fill={col} fontSize="12" fontFamily="JetBrains Mono">{v}</text>
              <text x={cx} y={cy+26} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">{coord}</text>
            </g>
          ))}
          <text x="10" y="210" fill={tokens.danger} fontSize="9" fontFamily="JetBrains Mono">Nodes 6 &amp; 8 share (0,2) → sort by value → [6, 8]</text>
        </svg>
        <figcaption>
          Each node's (col, level) coordinate. Column −2 has [7], col −1 has [2],
          col 0 has [1, 6, 8] (sorted), col 1 has [3], col 2 has [10].
        </figcaption>
      </div>

      <h3 className="ds-h3">Why This is Harder Than Top/Bottom View</h3>
      <p className="ds-p">
        Top/Bottom view kept only one node per column. Here we keep{" "}
        <strong className="ds-strong">all nodes</strong> in every column, grouped by level,
        with values sorted when nodes collide at the same (col, level). This requires a
        richer data structure.
      </p>

      <h3 className="ds-h3">The Nested TreeMap Structure</h3>
      <div className="formula">
        <div className="formula-label">Data structure</div>
        TreeMap&lt;col, TreeMap&lt;level, ArrayList&lt;val&gt;&gt;&gt;
      </div>
      <div className="prop-grid">
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent3}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent3 }}>Outer TreeMap (col)</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Keys = column numbers. Auto-sorted left-to-right because it's a TreeMap.
            Iterating gives columns in order: −2, −1, 0, 1, 2.
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent2}` }}>
          <h4 className="ds-h4" style={{ color: tokens.accent2 }}>Inner TreeMap (level)</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            Keys = level numbers. Auto-sorted top-to-bottom. Iterating gives levels in
            order: 0, 1, 2, …
          </p>
        </div>
        <div className="prop-card" style={{ borderLeft: `3px solid ${tokens.accent}`, gridColumn: "1/-1" }}>
          <h4 className="ds-h4">ArrayList (values)</h4>
          <p className="ds-p" style={{ color: "#c8d3e0", marginBottom: 0 }}>
            All node values at that (col, level). May have multiple values if nodes
            overlap. <strong className="ds-strong">Sort this list</strong> before adding
            to result.
          </p>
        </div>
      </div>

      <div className="callout info">
        <div className="callout-label">Why two TreeMaps (not HashMap)?</div>
        We need the output ordered by column and within each column ordered by level.
        TreeMap guarantees sorted iteration — HashMap doesn't. Using nested TreeMaps
        means no explicit sorting step for columns or levels. The only sort needed is
        for the ArrayList when values collide at the same (col, level).
      </div>

      <h3 className="ds-h3">Why DFS (not BFS)?</h3>
      <p className="ds-p">
        Either works here. The author chooses DFS because it requires less boilerplate
        code — no queue, no size tracking. Since we store the{" "}
        <code className="ds-code">level</code> parameter explicitly in the map, we don't
        need BFS's level-by-level processing to know which level a node is on. DFS with
        (col, level) args gives us everything we need.
      </p>

      <h3 className="ds-h3">Algorithm</h3>
      <ol className="ds-steps">
        <li><div>Declare <code className="ds-code">map</code> as a global TreeMap (col → TreeMap (level → ArrayList)).</div></li>
        <li><div>Base case: <code className="ds-code">root == null → return</code>.</div></li>
        <li><div>If col not in map → add it with a new inner TreeMap.</div></li>
        <li><div>If level not in inner map → add it with a new ArrayList.</div></li>
        <li><div>Add <code className="ds-code">root.val</code> to the ArrayList at map[col][level].</div></li>
        <li><div>Recurse: left child with <code className="ds-code">(col−1, level+1)</code>, right child with <code className="ds-code">(col+1, level+1)</code>.</div></li>
        <li>
          <div>
            After DFS, iterate the outer TreeMap (column-sorted). For each column, iterate
            inner TreeMap (level-sorted). Sort each ArrayList, then <code className="ds-code">addAll</code>{" "}
            its elements into a column list. Add that column list to result.
          </div>
        </li>
      </ol>

      <div className="trick-box">
        <div className="trick-title">DFS Trace — Tree: [1, 2, 3, 7, null, 6, 8, null, null, 10]</div>
        <table className="ds-tbl" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Call</th><th>Node</th><th>col</th><th>level</th><th>Map update</th></tr>
          </thead>
          <tbody>
            {[
              ["dfs(1,0,0)","1","0","0","map[0][0] = [1]"],
              ["dfs(2,−1,1)","2","−1","1","map[−1][1] = [2]"],
              ["dfs(7,−2,2)","7","−2","2","map[−2][2] = [7]"],
              ["dfs(null,…)","null","—","—","return (base case)"],
              ["dfs(null,…)","null","—","—","return (base case)"],
              ["dfs(3,1,1)","3","1","1","map[1][1] = [3]"],
              ["dfs(6,0,2)","6","0","2","map[0][2] = [6]"],
              ["dfs(8,0,2)","8","0","2","map[0][2] = [6, 8] ← collision!"],
              ["dfs(10,2,2)","10","2","2","map[2][2] = [10]"],
            ].map(([call,node,col,lv,upd]) => (
              <tr key={call}>
                <td style={{fontSize:10}}><code className="ds-code">{call}</code></td>
                <td style={{color:tokens.accent5}}>{node}</td>
                <td style={{color:tokens.accent2}}>{col}</td>
                <td style={{color:tokens.accent}}>{lv}</td>
                <td style={{color:"#c8d3e0",fontSize:12}}>{upd}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ds-p" style={{color:tokens.accent3, marginTop:10, marginBottom:4}}>
          After DFS, sort map[0][2] = [6, 8] (already sorted here). Build result:
        </p>
        <p className="ds-p" style={{color:"#c8d3e0", marginBottom:0}}>
          col −2 → [7] | col −1 → [2] | col 0 → [1, 6, 8] | col 1 → [3] | col 2 → [10]
        </p>
      </div>

      <pre className="ds-pre"><code dangerouslySetInnerHTML={{ __html:
`<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="cm">// col → (level → values) — global so dfs can access without passing it</span>
    <span class="type">TreeMap</span>&lt;<span class="type">Integer</span>, <span class="type">TreeMap</span>&lt;<span class="type">Integer</span>, <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt;&gt;&gt; map = <span class="kw">new</span> <span class="type">TreeMap</span>&lt;&gt;();

    <span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">List</span>&lt;<span class="type">Integer</span>&gt;&gt; <span class="fn">verticalTraversal</span>(<span class="type">TreeNode</span> root) {
        <span class="type">List</span>&lt;<span class="type">List</span>&lt;<span class="type">Integer</span>&gt;&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

        <span class="fn">dfs</span>(root, <span class="num">0</span>, <span class="num">0</span>); <span class="cm">// fill the map</span>

        <span class="cm">// column-wise iteration (TreeMap → already sorted)</span>
        <span class="kw">for</span> (<span class="type">Map.Entry</span>&lt;<span class="type">Integer</span>, <span class="type">TreeMap</span>&lt;<span class="type">Integer</span>, <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt;&gt;&gt; entry : map.<span class="fn">entrySet</span>()) {
            <span class="type">TreeMap</span>&lt;<span class="type">Integer</span>, <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt;&gt; levelMap = entry.<span class="fn">getValue</span>();
            <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; list = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();

            <span class="cm">// level-wise iteration (inner TreeMap → already sorted)</span>
            <span class="kw">for</span> (<span class="type">Map.Entry</span>&lt;<span class="type">Integer</span>, <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt;&gt; subEntry : levelMap.<span class="fn">entrySet</span>()) {
                <span class="type">ArrayList</span>&lt;<span class="type">Integer</span>&gt; sublist = subEntry.<span class="fn">getValue</span>();
                Collections.<span class="fn">sort</span>(sublist); <span class="cm">// sort values colliding at same (col, level)</span>
                list.<span class="fn">addAll</span>(sublist);      <span class="cm">// append elements (not a sub-list)</span>
            }
            res.<span class="fn">add</span>(list); <span class="cm">// one list per column</span>
        }
        <span class="kw">return</span> res;
    }

    <span class="kw">public void</span> <span class="fn">dfs</span>(<span class="type">TreeNode</span> root, <span class="kw">int</span> col, <span class="kw">int</span> level) {
        <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span>;

        <span class="kw">if</span> (!map.<span class="fn">containsKey</span>(col))
            map.<span class="fn">put</span>(col, <span class="kw">new</span> <span class="type">TreeMap</span>&lt;&gt;());

        <span class="kw">if</span> (!map.<span class="fn">get</span>(col).<span class="fn">containsKey</span>(level))
            map.<span class="fn">get</span>(col).<span class="fn">put</span>(level, <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;());

        map.<span class="fn">get</span>(col).<span class="fn">get</span>(level).<span class="fn">add</span>(root.val);

        <span class="fn">dfs</span>(root.left,  col - <span class="num">1</span>, level + <span class="num">1</span>); <span class="cm">// left → col−1, level+1</span>
        <span class="fn">dfs</span>(root.right, col + <span class="num">1</span>, level + <span class="num">1</span>); <span class="cm">// right → col+1, level+1</span>
    }
}`
      }}/></pre>

      <div className="callout warn">
        <div className="callout-label">addAll vs add — critical distinction</div>
        <code className="ds-code">list.add(sublist)</code> would nest a list inside a list
        — wrong type. <code className="ds-code">list.addAll(sublist)</code> unpacks all
        elements from sublist and appends them individually. Always use{" "}
        <code className="ds-code">addAll</code> when merging collections.
      </div>

      <div className="callout purple">
        <div className="callout-label">Why map is global (not passed as parameter)</div>
        The TreeMap type signature is very long. Passing it as a parameter on every
        recursive call is verbose and harder to read. Making it a class field lets all
        DFS calls share it implicitly — the author's preferred style for complex maps in
        recursive solutions.
      </div>

      <h3 className="ds-h3">Comparison with Top/Bottom View (Q9)</h3>
      <table className="ds-tbl">
        <thead>
          <tr><th>Aspect</th><th>Top/Bottom View (Q9)</th><th>Vertical Traversal (Q10)</th></tr>
        </thead>
        <tbody>
          {[
            ["Nodes per col","One (first or last)","All of them"],
            ["Map structure","TreeMap<col, val>","TreeMap<col, TreeMap<level, List<val>>>"],
            ["Level tracking","Not needed","Needed (inner map key)"],
            ["Sorting","Column only (TreeMap)","Column + level (both TreeMaps) + values (Collections.sort)"],
            ["Result shape","Flat list","List of lists"],
          ].map(([asp,q9,q10]) => (
            <tr key={asp}>
              <td><strong className="ds-strong">{asp}</strong></td>
              <td style={{color:"#c8d3e0",fontSize:13}}>{q9}</td>
              <td style={{color:"#c8d3e0",fontSize:13}}>{q10}</td>
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
            ["Time","O(n log n)","DFS visits n nodes; each TreeMap insert is O(log n); sorting lists at each (col,level) adds at most O(n log n) overall"],
            ["Space","O(n)","Map stores all n values; recursion stack O(h)"],
          ].map(([m,v,r]) => (
            <tr key={m}>
              <td><strong className="ds-strong">{m}</strong></td>
              <td><span className="tc tc-nlogn">{v}</span></td>
              <td style={{color:"#64748b",fontSize:13}}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ),
};