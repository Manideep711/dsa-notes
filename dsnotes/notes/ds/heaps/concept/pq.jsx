import React from "react";
import { tokens } from "../../../../tokens";

export const pqTab = {
      id: "pq",
      label: "Priority Queue",
      colorVar: tokens.accent2,
      sections: [
        {
          id: "pq1",
          labelText: "Section PQ-01",
          labelColor: tokens.accent2,
          title: "What is a Priority Queue?",
          navLabel: "What is a PQ?",
          render: () => (
            <>
              <p className="ds-p">A <span className="hi2">Priority Queue (PQ)</span> is an abstract data type where each element has a <strong className="ds-strong">priority</strong>, and elements are retrieved in order of that priority — not insertion order.</p>
              <div className="callout info">
                <div className="callout-label">Implementation</div>
                Priority Queues are <strong className="ds-strong">implemented using Heaps</strong>. The heap property directly gives you the highest (or lowest) priority element at the root in O(1), with O(log n) insert and delete.
              </div>
              <div className="diagram-wrap">
                <svg width="100%" viewBox="0 0 440 100">
                  <rect x="10" y="20" width="200" height="60" rx="8" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="110" y="48" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">Priority Queue</text>
                  <text x="110" y="66" textAnchor="middle" fill="#64748b" fontSize="11">offer / peek / poll</text>
                  <text x="235" y="55" fill="#546e7a" fontSize="14">→</text>
                  <rect x="255" y="20" width="170" height="60" rx="8" fill="#1a1f2e" stroke="#f0a500" strokeWidth="1.5"/>
                  <text x="340" y="48" textAnchor="middle" fill="#f0a500" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">Heap</text>
                  <text x="340" y="66" textAnchor="middle" fill="#64748b" fontSize="11">underlying structure</text>
                </svg>
                <figcaption>PQ is the interface; Heap is the engine.</figcaption>
              </div>
              <h3 className="ds-h3">Why Not Just Sort?</h3>
              <p className="ds-p">If data is arriving as a stream (continuous insertions + queries), sorting after every insertion costs O(n log n) each time. A Priority Queue handles <strong className="ds-strong">each insertion in O(log n)</strong> while always keeping the min/max accessible in O(1). No re-sorting needed.</p>
            </>
          ),
        },
        {
          id: "pq2",
          labelText: "Section PQ-02",
          labelColor: tokens.accent2,
          title: "Min PQ vs Max PQ",
          navLabel: "Min PQ vs Max PQ",
          render: () => (
            <>
              <div className="prop-grid">
                <div className="prop-card">
                  <h4 className="ds-h4">MIN PRIORITY QUEUE</h4>
                  <p className="ds-p" style={{color:"#c8d3e0"}}>Built on a <strong className="ds-strong">Min Heap</strong>. Smaller value = higher priority. <code className="ds-code">peek()</code> returns the smallest element.</p>
                  <div className="formula" style={{fontSize:12}}>Elements: {"{1, 2, 3, 4, 5}"}<br/>peek() → 1</div>
                  <p className="ds-p" style={{color:"#64748b", fontSize:13, marginBottom:0}}>Default in Java's <code className="ds-code">PriorityQueue</code>.</p>
                </div>
                <div className="prop-card">
                  <h4 className="ds-h4" style={{color:tokens.accent2}}>MAX PRIORITY QUEUE</h4>
                  <p className="ds-p" style={{color:"#c8d3e0"}}>Built on a <strong className="ds-strong">Max Heap</strong>. Larger value = higher priority. <code className="ds-code">peek()</code> returns the largest element.</p>
                  <div className="formula" style={{fontSize:12}}>Elements: {"{1, 2, 3, 4, 5}"}<br/>peek() → 5</div>
                  <p className="ds-p" style={{color:"#64748b", fontSize:13, marginBottom:0}}>Use <code className="ds-code">Collections.reverseOrder()</code> in Java.</p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: "pq3",
          labelText: "Section PQ-03",
          labelColor: tokens.accent2,
          title: "Java PriorityQueue API",
          navLabel: "Java API",
          render: () => (
            <>
              <p className="ds-p">Java's <code className="ds-code">PriorityQueue</code> lives in <code className="ds-code">java.util</code>. Default is a <strong className="ds-strong">min priority queue</strong>.</p>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="cm">// MIN Priority Queue (default)</span>
<span class="type">PriorityQueue</span>&lt;<span class="type">Integer</span>&gt; minPq = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;();
minPq.<span class="fn">offer</span>(<span class="num">1</span>);   <span class="cm">// insert</span>
minPq.<span class="fn">offer</span>(<span class="num">10</span>);
minPq.<span class="fn">offer</span>(<span class="num">0</span>);
minPq.<span class="fn">peek</span>();    <span class="cm">// returns 0 (min) — does NOT remove</span>
minPq.<span class="fn">poll</span>();    <span class="cm">// returns 0 AND removes it</span>
minPq.<span class="fn">contains</span>(<span class="num">10</span>); <span class="cm">// true/false check</span>

<span class="cm">// MAX Priority Queue</span>
<span class="type">PriorityQueue</span>&lt;<span class="type">Integer</span>&gt; maxPq = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;(Collections.<span class="fn">reverseOrder</span>());
maxPq.<span class="fn">offer</span>(<span class="num">1</span>);
maxPq.<span class="fn">offer</span>(<span class="num">10</span>);
maxPq.<span class="fn">peek</span>();    <span class="cm">// returns 10 (max)</span>`}}
              /></pre>
              <table className="ds-tbl">
                <thead><tr><th>Method</th><th>Action</th><th>Time</th></tr></thead>
                <tbody>
                  {[
                    ["offer(e)",    "Insert element",                         "O(log n)", "tc-log"],
                    ["peek()",      "View highest priority — does NOT remove", "O(1)",     "tc-1"],
                    ["poll()",      "Remove & return highest priority",        "O(log n)", "tc-log"],
                    ["contains(e)", "Check if element exists",                "O(n)",     "tc-bad"],
                    ["size()",      "Number of elements",                     "O(1)",     "tc-1"],
                  ].map(([m, a, t, tc]) => (
                    <tr key={m}>
                      <td><code className="ds-code">{m}</code></td>
                      <td style={{color:"#c8d3e0"}}>{a}</td>
                      <td><span className={`tc ${tc}`}>{t}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="callout warn">
                <div className="callout-label">peek() vs poll()</div>
                <code className="ds-code">peek()</code> is a <strong className="ds-strong">non-destructive read</strong> — use it when you want to check without consuming. <code className="ds-code">poll()</code> removes the element. A common bug is calling <code className="ds-code">poll()</code> when you only wanted to look.
              </div>
            </>
          ),
        },
        {
          id: "pq4",
          labelText: "Section PQ-04",
          labelColor: tokens.accent2,
          title: "Custom Objects in a Priority Queue",
          navLabel: "Custom Objects in PQ",
          render: () => (
            <>
              <p className="ds-p">When storing non-primitive objects, Java needs to know <em>how to compare them</em>. Without a comparison strategy, <code className="ds-code">PriorityQueue</code> throws a <code className="ds-code">ClassCastException</code> at runtime.</p>
              <p className="ds-p">Solution: implement <code className="ds-code">Comparable&lt;T&gt;</code> on your class and override <code className="ds-code">compareTo()</code>.</p>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">NewStudent</span> <span class="kw">implements</span> Comparable&lt;<span class="type">NewStudent</span>&gt; {
    <span class="kw">int</span> marks;
    <span class="type">String</span> name;

    <span class="fn">NewStudent</span>(<span class="type">String</span> name, <span class="kw">int</span> marks) {
        <span class="kw">this</span>.name = name; <span class="kw">this</span>.marks = marks;
    }

    <span class="ann">@Override</span>
    <span class="kw">public int</span> <span class="fn">compareTo</span>(<span class="type">NewStudent</span> that) {
        <span class="cm">// Tie-break: if marks equal, sort by name lexicographically</span>
        <span class="kw">if</span> (that.marks == <span class="kw">this</span>.marks) {
            <span class="kw">return this</span>.name.<span class="fn">compareTo</span>(that.name); <span class="cm">// ascending name</span>
        }
        <span class="kw">return</span> that.marks - <span class="kw">this</span>.marks; <span class="cm">// descending marks = max PQ behaviour</span>
    }

    <span class="ann">@Override</span>
    <span class="kw">public</span> <span class="type">String</span> <span class="fn">toString</span>() {
        <span class="kw">return</span> <span class="str">"Student name: "</span> + name + <span class="str">" , marks: "</span> + marks;
    }
}

<span class="cm">// Usage</span>
<span class="type">PriorityQueue</span>&lt;<span class="type">NewStudent</span>&gt; pq = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;();
pq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">NewStudent</span>(<span class="str">"shashwat"</span>, <span class="num">90</span>));
pq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">NewStudent</span>(<span class="str">"aman"</span>,     <span class="num">70</span>));
pq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">NewStudent</span>(<span class="str">"mohit"</span>,    <span class="num">90</span>));
System.out.println(pq.<span class="fn">peek</span>());
<span class="cm">// → Student name: mohit , marks: 90</span>
<span class="cm">// (mohit comes before shashwat lexicographically when marks are equal)</span>`}} /></pre>
              <div className="callout proof">
                <div className="callout-label">Tie-break Intuition</div>
                When shashwat and mohit both have 90 marks, the <code className="ds-code">compareTo</code> falls through to name comparison. <code className="ds-code">"mohit".compareTo("shashwat")</code> returns a negative number (m &lt; s lexicographically) → no swap → mohit stays at top. PQ returns mohit first.
              </div>
            </>
          ),
        },
        {
          id: "pq5",
          labelText: "Section PQ-05",
          labelColor: tokens.accent2,
          title: "Overriding equals() for contains()",
          navLabel: "equals() Override",
          render: () => (
            <>
              <p className="ds-p"><code className="ds-code">PriorityQueue.contains()</code> uses <code className="ds-code">equals()</code> to find an element. If you don't override it, Java compares object <strong className="ds-strong">references</strong> — two <code className="ds-code">new Student("shashwat", 80)</code> will be different objects even if logically equal.</p>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="ann">@Override</span>
<span class="kw">public boolean</span> <span class="fn">equals</span>(<span class="type">Object</span> obj) {
    <span class="cm">// Step 1: type-safe check</span>
    <span class="kw">if</span> (obj <span class="kw">instanceof</span> <span class="type">NewStudent</span>) {
        <span class="type">NewStudent</span> that = (<span class="type">NewStudent</span>) obj; <span class="cm">// safe cast inside instanceof</span>
        <span class="cm">// Step 2: compare all identity fields</span>
        <span class="kw">return this</span>.marks == that.marks &amp;&amp; <span class="kw">this</span>.name.<span class="fn">equals</span>(that.name);
    }
    <span class="kw">return false</span>;
}

<span class="ann">@Override</span>
<span class="kw">public int</span> <span class="fn">hashCode</span>() {
    <span class="kw">return</span> <span class="type">Objects</span>.<span class="fn">hash</span>(name, marks);
}`}} /></pre>
              <div className="callout info">
                <div className="callout-label">Always override hashCode() too!</div>
                Whenever you override <code className="ds-code">equals()</code>, you must also override <code className="ds-code">hashCode()</code>. Even though PriorityQueue might not strictly require it, if you ever add your objects to a <code className="ds-code">HashSet</code> or <code className="ds-code">HashMap</code>, it will break if <code className="ds-code">hashCode()</code> is missing.
              </div>
              <div className="callout warn">
                <div className="callout-label">instanceof + Cast Pattern</div>
                Always cast <em>inside</em> the <code className="ds-code">instanceof</code> check. Casting outside risks a <code className="ds-code">ClassCastException</code> if an unexpected object type is passed in. This pattern is called <strong className="ds-strong">type-safe casting</strong>.
              </div>
              <div className="callout info">
                <div className="callout-label">Why not use == for strings?</div>
                <code className="ds-code">==</code> compares references. Two <code className="ds-code">String</code> objects with the same content can have different references. Always use <code className="ds-code">.compareTo()</code> (returns 0 if equal) or <code className="ds-code">.equals()</code> for string content comparison.
              </div>
            </>
          ),
        },
        {
          id: "pq6",
          labelText: "Section PQ-06",
          labelColor: tokens.accent2,
          title: "When to Use a Priority Queue",
          navLabel: "When to Use PQ",
          render: () => (
            <>
              <div className="callout proof">
                <div className="callout-label">Pattern Recognition</div>
                Use a PQ when you have a <strong className="ds-strong">group of elements with priorities</strong> and need to repeatedly retrieve the min/max while the collection keeps changing (insertions + deletions happening together).
              </div>
              <h3 className="ds-h3 green">Two Signatures to Spot</h3>
              <ul className="ds-ul">
                <li><strong className="ds-strong">Signature 1:</strong> "From a group of elements, find the one with highest/lowest priority based on some property." → PQ retrieval.</li>
                <li><strong className="ds-strong">Signature 2:</strong> "Elements are continuously being inserted and you need to query min/max frequently." → PQ beats sorting-on-every-insert.</li>
              </ul>
              <h3 className="ds-h3 green">Priority Can Be…</h3>
              <div className="prop-grid">
                <div className="prop-card">
                  <h4 className="ds-h4">ELEMENT ITSELF</h4>
                  <p className="ds-p" style={{color:"#c8d3e0"}}>Raw numbers in the queue. The value is the priority. E.g., find kth smallest from a stream.</p>
                  <pre className="ds-pre" style={{marginTop:8}}><code dangerouslySetInnerHTML={{__html:`<span class="type">PriorityQueue</span>&lt;<span class="type">Integer</span>&gt; pq = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;();
pq.<span class="fn">offer</span>(<span class="num">5</span>); pq.<span class="fn">offer</span>(<span class="num">3</span>); pq.<span class="fn">offer</span>(<span class="num">8</span>);
pq.<span class="fn">peek</span>(); <span class="cm">// → 3</span>`}}/></pre>
                </div>
                <div className="prop-card">
                  <h4 className="ds-h4" style={{color:tokens.accent2}}>PROPERTY OF OBJECT</h4>
                  <p className="ds-p" style={{color:"#c8d3e0"}}>Object has multiple fields; one (or more) determines priority. E.g., student with highest marks.</p>
                  <pre className="ds-pre" style={{marginTop:8}}><code dangerouslySetInnerHTML={{__html:`<span class="cm">// compareTo uses marks field</span>
pq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">Student</span>(<span class="str">"A"</span>, <span class="num">80</span>));
pq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">Student</span>(<span class="str">"B"</span>, <span class="num">95</span>));
pq.<span class="fn">peek</span>(); <span class="cm">// → Student B (95)</span>`}}/></pre>
                </div>
              </div>
            </>
          ),
        },
        {
          id: "pq7",
          labelText: "Section PQ-07",
          labelColor: tokens.accent2,
          title: "Priority Queue — Complexity",
          navLabel: "Complexity",
          render: () => (
            <>
              <p className="ds-p">Since PQ is built on a Heap, it inherits heap's time complexities.</p>
              <table className="ds-tbl">
                <thead><tr><th>Operation</th><th>Time</th><th>Note</th></tr></thead>
                <tbody>
                  {[
                    ["offer() — insert",     "O(log n)", "tc-log", "Sift-up after placement"],
                    ["peek() — view top",    "O(1)",     "tc-1",   "Root is always accessible"],
                    ["poll() — remove top",  "O(log n)", "tc-log", "Sift-down after removal"],
                    ["contains()",           "O(n)",     "tc-bad", "Linear scan — heap doesn't support search"],
                  ].map(([op, t, tc, note]) => (
                    <tr key={op}>
                      <td><code className="ds-code">{op}</code></td>
                      <td><span className={`tc ${tc}`}>{t}</span></td>
                      <td style={{color:"#64748b", fontSize:13}}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="callout warn">
                <div className="callout-label">contains() is O(n) — Use Carefully</div>
                The heap structure gives no search shortcut. If you frequently need membership checks, consider augmenting with a <code className="ds-code">HashSet</code> in parallel.
              </div>
            </>
          ),
        },
      ],
};
