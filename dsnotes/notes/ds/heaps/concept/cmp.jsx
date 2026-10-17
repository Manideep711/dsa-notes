import React from "react";
import { tokens } from "../../../../tokens";

export const cmpTab = {
      id: "cmp",
      label: "Comparable & Comparator",
      colorVar: tokens.accent4,
      sections: [
        {
          id: "c1",
          labelText: "Section C-01",
          labelColor: tokens.accent4,
          title: "Why Compare Objects?",
          navLabel: "Why Compare Objects?",
          render: () => (
            <>
              <p className="ds-p">Integers compare naturally: 3 &lt; 5 is obvious. But a <code className="ds-code">Student</code> object with name, rollNo, and marks — how do you compare two of them? By name? By marks? By rollNo?</p>
              <p className="ds-p">Java provides two interfaces to define comparison logic for custom objects:</p>
              <div className="prop-grid">
                <div className="prop-card" style={{borderLeft:`3px solid ${tokens.accent4}`}}>
                  <h4 className="ds-h4" style={{color:tokens.accent4}}>COMPARABLE</h4>
                  <p className="ds-p" style={{color:"#c8d3e0"}}><strong className="ds-strong">Natural/default ordering.</strong> Defined inside the class itself. Method: <code className="ds-code">compareTo(T other)</code>. Package: <code className="ds-code">java.lang</code> (auto-imported).</p>
                  <p className="ds-p" style={{fontSize:13, color:"#64748b", marginBottom:0}}>"This is how Student is <em>always</em> compared by default."</p>
                </div>
                <div className="prop-card" style={{borderLeft:`3px solid ${tokens.accent3}`}}>
                  <h4 className="ds-h4" style={{color:tokens.accent3}}>COMPARATOR</h4>
                  <p className="ds-p" style={{color:"#c8d3e0"}}><strong className="ds-strong">Custom/ad-hoc ordering.</strong> Defined outside the class. Method: <code className="ds-code">compare(T o1, T o2)</code>. Package: <code className="ds-code">java.util</code>.</p>
                  <p className="ds-p" style={{fontSize:13, color:"#64748b", marginBottom:0}}>"For this specific call, sort Students by marks instead."</p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: "c2",
          labelText: "Section C-02",
          labelColor: tokens.accent4,
          title: "Comparable Interface",
          navLabel: "Comparable Interface",
          render: () => (
            <>
              <p className="ds-p">Implement <code className="ds-code">Comparable&lt;T&gt;</code> on your class. Override <code className="ds-code">compareTo(T that)</code>. Inside it, <code className="ds-code">this</code> = current object, <code className="ds-code">that</code> = the one you're comparing against.</p>
              <div className="trick-box">
                <div className="trick-title">The 3-Return-Value Rule</div>
                <table className="ds-tbl" style={{margin:0}}>
                  <thead>
                    <tr><th>Return value</th><th>Meaning</th><th>Action taken by sort</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="tc" style={{color:"#ef4444"}}>Negative</span></td>
                      <td>this &lt; that</td>
                      <td>No swap — order is already correct</td>
                    </tr>
                    <tr>
                      <td><span className="tc" style={{color:tokens.accent3}}>Zero</span></td>
                      <td>this == that</td>
                      <td>Equal — sorting algorithm decides</td>
                    </tr>
                    <tr>
                      <td><span className="tc" style={{color:tokens.accent}}>Positive</span></td>
                      <td>this &gt; that</td>
                      <td>Swap — put that before this</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="callout danger">
                <div className="callout-label">Never Mutate Objects in a PQ</div>
                Once a custom object is inserted into a <code className="ds-code">PriorityQueue</code>, <strong className="ds-strong">never change the fields that determine its priority</strong>. The PriorityQueue does not automatically re-sort itself when object properties change. If you do this, the heap property will break, and <code className="ds-code">poll()</code> will return incorrect results. If you must update a value, remove the object, update it, and re-insert it.
              </div>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">Student</span> <span class="kw">implements</span> Comparable&lt;<span class="type">Student</span>&gt; {
    <span class="kw">int</span> rollNo, marks;
    <span class="type">String</span> name;
    <span class="fn">Student</span>(<span class="kw">int</span> r, <span class="type">String</span> n, <span class="kw">int</span> m) { rollNo=r; name=n; marks=m; }

    <span class="ann">@Override</span>
    <span class="kw">public int</span> <span class="fn">compareTo</span>(<span class="type">Student</span> that) {
        <span class="cm">// Natural ordering: increasing rollNo</span>
        <span class="kw">if</span> (<span class="kw">this</span>.rollNo &lt; that.rollNo) <span class="kw">return</span> -<span class="num">1</span>; <span class="cm">// no swap</span>
        <span class="kw">else</span>                           <span class="kw">return</span>  <span class="num">1</span>; <span class="cm">// swap</span>
    }
}

Collections.<span class="fn">sort</span>(list); <span class="cm">// uses compareTo automatically</span>
<span class="cm">// Output: 1 Ravi, 2 Neha, 3 Amit  (sorted by rollNo ascending)</span>`}} /></pre>
            </>
          ),
        },
        {
          id: "c3",
          labelText: "Section C-03",
          labelColor: tokens.accent4,
          title: "Comparator Interface",
          navLabel: "Comparator Interface",
          render: () => (
            <>
              <p className="ds-p">Create a separate class implementing <code className="ds-code">Comparator&lt;T&gt;</code>. Override <code className="ds-code">compare(T s1, T s2)</code>. Here both objects are explicit parameters — no <code className="ds-code">this</code>/<code className="ds-code">that</code> convention needed.</p>
              <p className="ds-p">This is the <strong className="ds-strong">external, pluggable</strong> approach — you can have multiple Comparators for the same class.</p>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">MyCustomComparator</span> <span class="kw">implements</span> Comparator&lt;<span class="type">Student</span>&gt; {
    <span class="ann">@Override</span>
    <span class="kw">public int</span> <span class="fn">compare</span>(<span class="type">Student</span> s1, <span class="type">Student</span> s2) {
        <span class="cm">// Decreasing order of marks</span>
        <span class="kw">if</span> (s1.marks &lt; s2.marks) <span class="kw">return</span>  <span class="num">1</span>; <span class="cm">// swap (want s2 first)</span>
        <span class="kw">else</span>                     <span class="kw">return</span> -<span class="num">1</span>; <span class="cm">// no swap</span>
    }
}

Collections.<span class="fn">sort</span>(list, <span class="kw">new</span> <span class="type">MyCustomComparator</span>());
<span class="cm">// Output: 80 Neha, 70 Ravi, 50 Amit</span>`}} /></pre>
            </>
          ),
        },
        {
          id: "c4",
          labelText: "Section C-04",
          labelColor: tokens.accent4,
          title: "Anonymous Class — Skip the Separate Class",
          navLabel: "Anonymous Class",
          render: () => (
            <>
              <p className="ds-p">Instead of defining a whole new class file, write the Comparator logic inline as an anonymous class. Same result, less boilerplate.</p>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`Collections.<span class="fn">sort</span>(list, <span class="kw">new</span> Comparator&lt;<span class="type">Student</span>&gt;() {
    <span class="ann">@Override</span>
    <span class="kw">public int</span> <span class="fn">compare</span>(<span class="type">Student</span> s1, <span class="type">Student</span> s2) {
        <span class="kw">if</span> (s1.marks &lt; s2.marks) <span class="kw">return</span> <span class="num">1</span>;
        <span class="kw">else</span>                     <span class="kw">return</span> -<span class="num">1</span>;
    }
});`}} /></pre>
              <div className="callout info">
                <div className="callout-label">Anonymous Class = Inline Definition</div>
                You're creating an object of an unnamed class that implements Comparator, defined and instantiated all at once. This is the traditional Java 7 way — Lambda (Section C-06) is the modern alternative.
              </div>
            </>
          ),
        },
        {
          id: "c5",
          labelText: "Section C-05",
          labelColor: tokens.accent4,
          title: "The ± Subtraction Trick",
          navLabel: "The ± Trick",
          render: () => (
            <>
              <p className="ds-p">For numeric fields you can collapse the if-else into a single subtraction. This works because subtraction naturally produces negative, zero, or positive numbers — matching the 3-value rule.</p>
              <div className="trick-box">
                <div className="trick-title">The Shortcut</div>
                <p className="ds-p" style={{color:"#c8d3e0", marginBottom:10}}>In <code className="ds-code">compare(first, second)</code> or <code className="ds-code">compareTo(that)</code>:</p>
                <div className="formula" style={{textAlign:"left", lineHeight:2, marginTop:0}}>
                  Increasing / Ascending order &nbsp;→&nbsp; <strong>return first − second</strong><br/>
                  Decreasing / Descending order →&nbsp; <strong>return second − first</strong>
                </div>
              </div>
              <div className="callout proof">
                <div className="callout-label">Why it works — example</div>
                Decreasing order, s1.marks=7, s2.marks=10:<br/>
                <strong className="ds-strong">s2 − s1 = 10 − 7 = 3 (positive) → swap</strong> → 10 comes before 7 ✓<br/><br/>
                Flip: s1.marks=10, s2.marks=7:<br/>
                <strong className="ds-strong">s2 − s1 = 7 − 10 = −3 (negative) → no swap</strong> → 10 stays first ✓
              </div>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="cm">// Decreasing order of marks (one line!)</span>
Collections.<span class="fn">sort</span>(list, (s1, s2) -&gt; s2.marks - s1.marks);

<span class="cm">// Increasing order of marks</span>
Collections.<span class="fn">sort</span>(list, (s1, s2) -&gt; s1.marks - s2.marks);`}} /></pre>
              <div className="callout danger">
                <div className="callout-label">Integer Overflow Warning</div>
                The subtraction trick only works safely when values are well within int range. If values could be very large or very small (e.g., <code className="ds-code">Integer.MIN_VALUE</code>), overflow can flip the sign. In those cases use <code className="ds-code">Integer.compare(a, b)</code> instead.
              </div>
            </>
          ),
        },
        {
          id: "c6",
          labelText: "Section C-06",
          labelColor: tokens.accent4,
          title: "Lambda Expressions (Java 8+)",
          navLabel: "Lambda Expressions",
          render: () => (
            <>
              <p className="ds-p"><code className="ds-code">Comparator</code> is a <strong className="ds-strong">functional interface</strong> — it has exactly one abstract method (<code className="ds-code">compare</code>). Any functional interface can be replaced by a lambda.</p>
              <div className="formula" style={{textAlign:"left", fontSize:12, lineHeight:2}}>
                <span style={{color:"#64748b"}}>Lambda syntax:</span><br/>
                (param1, param2) → expression<br/>
                (param1, param2) → {"{ multiple; statements; return val; }"}
              </div>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="cm">// Anonymous class (verbose, Java 7)</span>
Collections.<span class="fn">sort</span>(list, <span class="kw">new</span> Comparator&lt;<span class="type">Student</span>&gt;() {
    <span class="ann">@Override</span>
    <span class="kw">public int</span> <span class="fn">compare</span>(<span class="type">Student</span> s1, <span class="type">Student</span> s2) {
        <span class="kw">return</span> s2.marks - s1.marks;
    }
});

<span class="cm">// Lambda (concise, Java 8+)</span>
Collections.<span class="fn">sort</span>(list, (s1, s2) -&gt; s2.marks - s1.marks);

<span class="cm">// Both are 100% equivalent</span>`}} /></pre>
              <div className="callout info">
                <div className="callout-label">What lambda does</div>
                The lambda <code className="ds-code">(s1, s2) → s2.marks - s1.marks</code> is shorthand for implementing the <code className="ds-code">compare</code> method. Java infers the parameter types from context (<code className="ds-code">Comparator&lt;Student&gt;</code>). You don't write <code className="ds-code">@Override</code>, method name, or return type.
              </div>
            </>
          ),
        },
        {
          id: "c7",
          labelText: "Section C-07",
          labelColor: tokens.accent4,
          title: "Multi-field Sorting",
          navLabel: "Multi-field Sorting",
          render: () => (
            <>
              <p className="ds-p">Sort by primary key; if tied, sort by secondary key. Chain conditions inside your comparator.</p>
              <p className="ds-p"><strong className="ds-strong">Problem:</strong> Sort students by marks descending; if marks are equal, sort by rollNo ascending.</p>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`Collections.<span class="fn">sort</span>(list, (s1, s2) -&gt; {
    <span class="kw">if</span> (s1.marks == s2.marks) {
        <span class="kw">return</span> s1.rollNo - s2.rollNo; <span class="cm">// ascending rollNo (tie-break)</span>
    }
    <span class="kw">return</span> s2.marks - s1.marks;     <span class="cm">// descending marks (primary)</span>
});

<span class="cm">// Input:  Amit(3,50), Ravi(1,70), Neha(2,80), Priya(4,80)</span>
<span class="cm">// Output: Neha(80), Priya(80), Ravi(70), Amit(50)</span>
<span class="cm">// Neha before Priya because rollNo 2 &lt; 4</span>`}} /></pre>
              <div className="callout proof">
                <div className="callout-label">Walkthrough — Neha vs Priya</div>
                s1=Neha(marks=80, roll=2), s2=Priya(marks=80, roll=4).<br/>
                marks equal → tie-break: s1.rollNo − s2.rollNo = 2 − 4 = <strong className="ds-strong">−2 (negative) → no swap</strong> → Neha stays first ✓
              </div>
            </>
          ),
        },
        {
          id: "c8",
          labelText: "Section C-08",
          labelColor: tokens.accent4,
          title: "When to Use Which",
          navLabel: "When to Use Which",
          render: () => (
            <>
              <table className="ds-tbl">
                <thead><tr><th></th><th>Comparable</th><th>Comparator</th></tr></thead>
                <tbody>
                  {[
                    ["Location",           "Inside the class",           "Outside the class"],
                    ["Method",             "compareTo(T that)",           "compare(T o1, T o2)"],
                    ["Package",            "java.lang (auto)",            "java.util"],
                    ["Purpose",            "Natural / default ordering",  "Custom / ad-hoc ordering"],
                    ["Multiple sorts?",    "No — one fixed ordering",     "Yes — create many Comparators"],
                    ["Modifies class?",    "Yes",                         "No — non-invasive"],
                    ["Used by PQ?",        "Yes (default constructor)",   "Yes (pass to constructor)"],
                  ].map(([prop, a, b]) => (
                    <tr key={prop}>
                      <td><strong className="ds-strong">{prop}</strong></td>
                      <td style={{color:"#c8d3e0"}}>{a}</td>
                      <td style={{color:"#c8d3e0"}}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="callout purple">
                <div className="callout-label">Rule of Thumb</div>
                <strong className="ds-strong">Comparable</strong> = "this class has one obvious way to be ordered" (e.g., Student by rollNo by default).<br/>
                <strong className="ds-strong">Comparator</strong> = "I need a specific ordering for this use-case without touching the class" (e.g., sort by marks for exam results, by name for a report).
              </div>
              <h3 className="ds-h3 purple">Connection to Priority Queue</h3>
              <p className="ds-p">When you put a custom object into a <code className="ds-code">PriorityQueue</code>, Java uses <code className="ds-code">compareTo</code> (Comparable) to decide ordering — exactly what determines which element <code className="ds-code">peek()</code> returns. Getting <code className="ds-code">compareTo</code> right means getting your PQ right.</p>
            </>
          ),
        },
      ],
};
