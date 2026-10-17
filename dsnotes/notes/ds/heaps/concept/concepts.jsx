import React from "react";
import { tokens } from "../../../../tokens";

export const heapConceptsTab =     {
      id: "heap",
      label: "Heap Concepts",
      colorVar: tokens.accent,
      // sections are the scrollable blocks inside this tab
      sections: [
        {
          id: "s1",
          labelText: "Section 01",
          labelColor: tokens.accent,
          title: "What is a Heap?",
          navLabel: "What is a Heap?",
          render: () => (
            <>
              <p className="ds-p">A <span className="hi">Heap</span> = <strong className="ds-strong">Complete Binary Tree</strong> + <strong className="ds-strong">Heap Property</strong>. Both must hold simultaneously.</p>
              <h3 className="ds-h3">Complete Binary Tree</h3>
              <ul className="ds-ul">
                <li>Every level except possibly the last is <strong className="ds-strong">completely filled</strong>.</li>
                <li>The last level fills from <strong className="ds-strong">left to right</strong>.</li>
                <li>This guarantees the tree is naturally balanced -&gt; height = O(log n).</li>
              </ul>
              <div className="diagram-wrap">
                <svg width="100%" viewBox="0 0 540 160">
                  <text x="10" y="18" fill="#64748b" fontSize="11" fontFamily="JetBrains Mono">VALID - Complete Binary Tree</text>
                  <circle cx="130" cy="50" r="18" fill="#1a1f2e" stroke="#f0a500" strokeWidth="1.5"/>
                  <text x="130" y="55" textAnchor="middle" fill="#f0a500" fontSize="13" fontFamily="JetBrains Mono">A</text>
                  <circle cx="70" cy="110" r="18" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="70" y="115" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">B</text>
                  <circle cx="190" cy="110" r="18" fill="#1a1f2e" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="190" y="115" textAnchor="middle" fill="#3b82f6" fontSize="13" fontFamily="JetBrains Mono">C</text>
                  <circle cx="40" cy="148" r="12" fill="#1a1f2e" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="40" y="153" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="JetBrains Mono">D</text>
                  <circle cx="100" cy="148" r="12" fill="#1a1f2e" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="100" y="153" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="JetBrains Mono">E</text>
                  <line x1="130" y1="68" x2="70" y2="92" stroke="#252b3d" strokeWidth="1.5"/>
                  <line x1="130" y1="68" x2="190" y2="92" stroke="#252b3d" strokeWidth="1.5"/>
                  <line x1="70" y1="128" x2="40" y2="136" stroke="#252b3d" strokeWidth="1.5"/>
                  <line x1="70" y1="128" x2="100" y2="136" stroke="#252b3d" strokeWidth="1.5"/>
                  <text x="310" y="18" fill="#64748b" fontSize="11" fontFamily="JetBrains Mono">INVALID - Gap in last level</text>
                  <circle cx="430" cy="50" r="18" fill="#1a1f2e" stroke="#ef4444" strokeWidth="1.5"/>
                  <text x="430" y="55" textAnchor="middle" fill="#ef4444" fontSize="13" fontFamily="JetBrains Mono">A</text>
                  <circle cx="370" cy="110" r="18" fill="#1a1f2e" stroke="#ef4444" strokeWidth="1.5"/>
                  <text x="370" y="115" textAnchor="middle" fill="#ef4444" fontSize="13" fontFamily="JetBrains Mono">B</text>
                  <circle cx="490" cy="110" r="18" fill="#1a1f2e" stroke="#ef4444" strokeWidth="1.5"/>
                  <text x="490" y="115" textAnchor="middle" fill="#ef4444" fontSize="13" fontFamily="JetBrains Mono">C</text>
                  <circle cx="490" cy="148" r="12" fill="#1a1f2e" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2"/>
                  <text x="490" y="153" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="JetBrains Mono">D</text>
                  <line x1="430" y1="68" x2="370" y2="92" stroke="#252b3d" strokeWidth="1.5"/>
                  <line x1="430" y1="68" x2="490" y2="92" stroke="#252b3d" strokeWidth="1.5"/>
                  <line x1="490" y1="128" x2="490" y2="136" stroke="#252b3d" strokeWidth="1.5"/>
                  <text x="348" y="153" fill="#ef4444" fontSize="9" fontFamily="JetBrains Mono">missing D</text>
                </svg>
                <figcaption>Left: valid complete binary tree. Right: invalid - last level not filled left-to-right.</figcaption>
              </div>
              <h3 className="ds-h3">Heap Property</h3>
              <div className="prop-grid">
                <div className="prop-card">
                  <h4 className="ds-h4">Max-Heap</h4>
                  <p className="ds-p" style={{color:"#c8d3e0"}}>Every parent &gt;= its children.<br/>Root holds the <span className="hi">maximum</span>.</p>
                </div>
                <div className="prop-card">
                  <h4 className="ds-h4" style={{color:tokens.accent2}}>Min-Heap</h4>
                  <p className="ds-p" style={{color:"#c8d3e0"}}>Every parent &lt;= its children.<br/>Root holds the <span className="hi2">minimum</span>.</p>
                </div>
              </div>
              <div className="callout warn">
                <div className="callout-label">Not a BST</div>
                Unlike a Binary Search Tree, the heap property only cares about parent vs. child - not left vs. right. There is no guaranteed order between siblings.
              </div>
            </>
          ),
        },
        {
          id: "s2",
          labelText: "Section 02",
          labelColor: tokens.accent,
          title: "Array Representation",
          navLabel: "Array Representation",
          render: () => (
            <>
              <p className="ds-p">Because a heap is a <strong className="ds-strong">Complete Binary Tree</strong>, we can store it in a plain array with zero wasted space. No pointers needed.</p>
              <div className="formula">
                <div className="formula-label">Index formulas (1-based index)</div>
                Parent(i) = floor(i/2) &nbsp;|&nbsp; Left(i) = 2i &nbsp;|&nbsp; Right(i) = 2i + 1
              </div>
              <div className="formula">
                <div className="formula-label">Index formulas (0-based index)</div>
                Parent(i) = floor((i-1)/2) &nbsp;|&nbsp; Left(i) = 2i+1 &nbsp;|&nbsp; Right(i) = 2i+2
              </div>
              <div className="callout info">
                <div className="callout-label">Why it works</div>
                Level-order traversal of a complete binary tree maps perfectly to a contiguous array - no gaps, no pointers. This gives cache-friendly O(1) navigation.
              </div>
            </>
          ),
        },
        {
          id: "s3",
          labelText: "Section 03",
          labelColor: tokens.accent,
          title: "Key Formulas",
          navLabel: "Key Formulas",
          render: () => (
            <>
              <p className="ds-p">Quick reference for the index-navigation formulas that all heap algorithms rely on.</p>
              <table className="ds-tbl">
                <thead>
                  <tr>
                    <th>Relation</th>
                    <th>0-based</th>
                    <th>1-based</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Parent of i",     "floor((i-1)/2)", "floor(i/2)"],
                    ["Left child of i",  "2i + 1",    "2i"],
                    ["Right child of i", "2i + 2",    "2i + 1"],
                    ["Last non-leaf",    "floor(n/2) - 1", "floor(n/2)"],
                    ["Height of heap",   "floor(log2 n)",  "floor(log2 n)"],
                  ].map(([rel, z, o]) => (
                    <tr key={rel}>
                      <td>{rel}</td>
                      <td><code className="ds-code tc tc-log">{z}</code></td>
                      <td><code className="ds-code tc tc-log">{o}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ),
        },
        {
          id: "s4",
          labelText: "Section 04",
          labelColor: tokens.accent,
          title: "Heapify (Sift-Down)",
          navLabel: "Heapify",
          render: () => (
            <>
              <p className="ds-p"><span className="hi">heapify(i)</span> assumes both subtrees of node <code className="ds-code">i</code> are already valid heaps. It fixes only node <code className="ds-code">i</code> by sifting it downward.</p>
              <ol className="ds-steps">
                <li><div>Find the <strong className="ds-strong">largest</strong> among <code className="ds-code">heap[i]</code>, <code className="ds-code">heap[left(i)]</code>, <code className="ds-code">heap[right(i)]</code> — skip children outside heapSize.</div></li>
                <li><div>If <code className="ds-code">heap[i]</code> is already the largest → <strong className="ds-strong">stop</strong>.</div></li>
                <li><div><strong className="ds-strong">Swap</strong> heap[i] with the larger child. The swapped child's subtree may now be violated.</div></li>
                <li><div><strong className="ds-strong">Recurse</strong> on the swapped child's index.</div></li>
              </ol>
              <p className="ds-p"><strong className="ds-strong">Stopping conditions:</strong> reached a leaf node, or current node ≥ both children.</p>
              <pre className="ds-pre"><code
                dangerouslySetInnerHTML={{__html:`<span class="kw">public void</span> <span class="fn">heapify</span>(<span class="kw">int</span> index) {
    <span class="kw">int</span> largest = index;
    <span class="kw">int</span> L = <span class="num">2</span> * index + <span class="num">1</span>;
    <span class="kw">int</span> R = <span class="num">2</span> * index + <span class="num">2</span>;

    <span class="kw">if</span> (L &lt; heapSize &amp;&amp; heap[L] &gt; heap[largest]) largest = L;
    <span class="kw">if</span> (R &lt; heapSize &amp;&amp; heap[R] &gt; heap[largest]) largest = R;

    <span class="kw">if</span> (largest != index) {
        <span class="fn">swap</span>(index, largest);
        <span class="fn">heapify</span>(largest); <span class="cm">// recurse on displaced element</span>
    }
}`}}
              /></pre>
              <div className="callout info">
                <div className="callout-label">Direction</div>
                Heapify is a <strong className="ds-strong">top-down / sift-down</strong> operation. Time: O(log n) — traverses at most the tree height.
              </div>
            </>
          ),
        },
        {
          id: "s5",
          labelText: "Section 05",
          labelColor: tokens.accent,
          title: "Build Heap — O(n)",
          navLabel: "Build Heap",
          render: () => (
            <>
              <p className="ds-p">Convert any random array into a valid heap in-place. The naive approach (n insertions) costs O(n log n). BuildHeap does it in <span className="hi3">O(n)</span>.</p>
              <ol className="ds-steps">
                <li><div>Skip all leaf nodes (indices ⌊n/2⌋ to n−1) — they're already trivially valid heaps (no children to violate).</div></li>
                <li><div>Start from the <strong className="ds-strong">last internal node</strong> (⌊n/2⌋ − 1) and move right-to-left toward root.</div></li>
                <li><div>Call <code className="ds-code">heapify(i)</code> at each internal node. By the time you reach node i, both its subtrees are already heapified.</div></li>
              </ol>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public void</span> <span class="fn">buildTree</span>() {
    <span class="kw">for</span> (<span class="kw">int</span> i = heapSize / <span class="num">2</span> - <span class="num">1</span>; i &gt;= <span class="num">0</span>; i--) {
        <span class="fn">heapify</span>(i);
    }
}`}} /></pre>
              <div className="callout proof">
                <div className="callout-label">Proof Sketch — Why O(n) not O(n log n)</div>
                Nodes near the bottom do very little work in heapify. Nodes at height h from the bottom take at most h swaps, and there are ≈ n/2^(h+1) nodes at that height. Summing: Σ(n/2^(h+1)) × h = O(n) because the geometric series converges to a constant. Most of the n nodes are leaves or near-leaves with h ≈ 0.
              </div>
            </>
          ),
        },
        {
          id: "s6",
          labelText: "Section 06",
          labelColor: tokens.accent,
          title: "Extract Max — O(log n)",
          navLabel: "Extract Max",
          render: () => (
            <>
              <p className="ds-p">Remove and return the maximum element. The root always holds the max, but we can't simply delete it — the tree must stay complete.</p>
              <ol className="ds-steps">
                <li><div>Save <code className="ds-code">heap[0]</code> (the max) to return later.</div></li>
                <li><div>Move the <strong className="ds-strong">last element</strong> to root: <code className="ds-code">heap[0] = heap[heapSize - 1]</code>.</div></li>
                <li><div>Shrink heap: <code className="ds-code">heapSize--</code> (logically deletes the last slot).</div></li>
                <li><div>Call <code className="ds-code">heapify(0)</code> to restore the heap property downward.</div></li>
              </ol>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public int</span> <span class="fn">extractMax</span>() {
    <span class="cm">// Returning -1 works if heap only contains positive values.</span>
    <span class="cm">// For a robust implementation, throw an exception:</span>
    <span class="cm">// if (heapSize == 0) { throw new IllegalStateException("Heap is empty"); }</span>
    <span class="kw">if</span> (heapSize == <span class="num">0</span>) { <span class="kw">return</span> -<span class="num">1</span>; }
    <span class="kw">int</span> max = heap[<span class="num">0</span>];
    heap[<span class="num">0</span>] = heap[heapSize - <span class="num">1</span>];
    heapSize--;
    <span class="fn">heapify</span>(<span class="num">0</span>);
    <span class="kw">return</span> max;
}`}} /></pre>
              <div className="callout warn">
                <div className="callout-label">Why the Last Element?</div>
                The only node we can cleanly remove from a complete binary tree is the last one — it's a leaf. Overwriting the root with it preserves the complete structure, then heapify fixes the ordering.
              </div>
            </>
          ),
        },
        {
          id: "s7",
          labelText: "Section 07",
          labelColor: tokens.accent,
          title: "Increase Key — O(log n)",
          navLabel: "Increase Key",
          render: () => (
            <>
              <p className="ds-p">Update a node's value to a <strong className="ds-strong">larger</strong> value. The node may now violate the heap property with its <em>parent</em> (it's bigger than it should be). Fix: <strong className="ds-strong">sift-up</strong>.</p>
              <div className="callout info">
                <div className="callout-label">Direction is opposite to heapify</div>
                Heapify sifts <em>down</em>. Increase Key sifts <em>up</em> — keep swapping with parent while the node is larger than its parent.
              </div>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public void</span> <span class="fn">increaseKey</span>(<span class="kw">int</span> index, <span class="kw">int</span> newValue) {
    <span class="kw">if</span> (index &lt; <span class="num">0</span> || index &gt;= heapSize || heap[index] &gt;= newValue) <span class="kw">return</span>;
    heap[index] = newValue;
    <span class="kw">while</span> (index &gt; <span class="num">0</span> &amp;&amp; heap[index] &gt; heap[(<span class="kw">int</span>)(Math.<span class="fn">ceil</span>(index / <span class="num">2.0</span>) - <span class="num">1</span>)]) {
        <span class="fn">swap</span>(index, (<span class="kw">int</span>)(Math.<span class="fn">ceil</span>(index / <span class="num">2.0</span>) - <span class="num">1</span>));
        index = (<span class="kw">int</span>)(Math.<span class="fn">ceil</span>(index / <span class="num">2.0</span>) - <span class="num">1</span>);
    }
}`}} /></pre>
              <p className="ds-p" style={{color:"#c8d3e0"}}>The parent index formula is <code className="ds-code">(int)(Math.ceil(index / 2.0) - 1)</code>. We need floating-point division here because integer division truncates, breaking the math for right children.</p>
              <h3 className="ds-h3 green">Optimization: Integer Division Approach</h3>
              <p className="ds-p" style={{color:"#c8d3e0"}}>Alternatively, the parent formula <code className="ds-code">(index - 1) / 2</code> elegantly takes advantage of Java's integer division truncation. It correctly maps both left (<code className="ds-code">2i + 1</code>) and right (<code className="ds-code">2i + 2</code>) children back to their parent index without any floating-point math.</p>
            </>
          ),
        },
        {
          id: "s8",
          labelText: "Section 08",
          labelColor: tokens.accent,
          title: "Decrease Key — O(log n)",
          navLabel: "Decrease Key",
          render: () => (
            <>
              <p className="ds-p">Update a node's value to a <strong className="ds-strong">smaller</strong> value. The node may now violate the heap property with its <em>children</em>. Fix: <strong className="ds-strong">sift-down</strong> — just call heapify.</p>
              <div className="callout proof">
                <div className="callout-label">Why just call heapify?</div>
                After decreasing <code className="ds-code">heap[index]</code>, both subtrees are still valid heaps (untouched). But the node at index might now be too small for its position — exactly the precondition heapify requires. So we simply delegate.
              </div>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public void</span> <span class="fn">decreaseKey</span>(<span class="kw">int</span> index, <span class="kw">int</span> newValue) {
    <span class="kw">if</span> (index &lt; <span class="num">0</span> || index &gt;= heapSize || heap[index] &lt;= newValue) <span class="kw">return</span>;
    heap[index] = newValue;
    <span class="fn">heapify</span>(index); <span class="cm">// sift down from this index</span>
}`}} /></pre>
              <div className="callout info">
                <div className="callout-label">Contrast with Increase Key</div>
                Increase Key → value goes up → may violate parent → sift-up (while loop).<br/>
                Decrease Key → value goes down → may violate children → sift-down (heapify).
              </div>
            </>
          ),
        },
        {
          id: "s9",
          labelText: "Section 09",
          labelColor: tokens.accent,
          title: "Insert — O(log n)",
          navLabel: "Insert",
          render: () => (
            <>
              <p className="ds-p">Add a new element. Insert at the end (maintains complete tree shape), then sift-up — identical logic to Increase Key.</p>
              <ol className="ds-steps">
                <li><div>If array is full, double the capacity (amortized O(1)).</div></li>
                <li><div>Place the new value at <code className="ds-code">heap[heapSize]</code> and increment heapSize.</div></li>
                <li><div>Sift-up: while the new node is larger than its parent, swap upward.</div></li>
              </ol>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public void</span> <span class="fn">insert</span>(<span class="kw">int</span> newValue) {
    <span class="kw">if</span> (heapSize + <span class="num">1</span> &gt;= capacity) <span class="fn">increaseCapacity</span>(); <span class="cm">// double array</span>
    heap[heapSize++] = newValue;
    <span class="kw">int</span> index = heapSize - <span class="num">1</span>;
    <span class="kw">while</span> (index &gt; <span class="num">0</span> &amp;&amp; heap[index] &gt; heap[(<span class="kw">int</span>)(Math.<span class="fn">ceil</span>(index / <span class="num">2.0</span>) - <span class="num">1</span>)]) {
        <span class="fn">swap</span>(index, (<span class="kw">int</span>)(Math.<span class="fn">ceil</span>(index / <span class="num">2.0</span>) - <span class="num">1</span>));
        index = (<span class="kw">int</span>)(Math.<span class="fn">ceil</span>(index / <span class="num">2.0</span>) - <span class="num">1</span>);
    }
}`}} /></pre>
              <div className="callout info">
                <div className="callout-label">Capacity Doubling — Amortized O(1)</div>
                When the array is full, double the capacity and copy elements. Doubling at sizes 1, 2, 4 … n means total copy work = 1+2+4+…+n = 2n = O(n). Amortized O(1) per insert for capacity management; the sift-up dominates at O(log n).
              </div>
            </>
          ),
        },
        {
          id: "s10",
          labelText: "Section 10",
          labelColor: tokens.accent,
          title: "Heap Sort — O(n log n)",
          navLabel: "Heap Sort",
          render: () => (
            <>
              <p className="ds-p">Sort in ascending order using a Max Heap. The max element is always at the root — extract it to the end, shrink the heap, repeat.</p>
              <ol className="ds-steps">
                <li><div><strong className="ds-strong">Build Heap</strong> from input array — O(n).</div></li>
                <li><div>n times: swap root with last active element, shrink heapSize, call heapify(0).</div></li>
                <li><div>Result: elements sorted ascending in the original array — in-place, O(1) extra space.</div></li>
              </ol>
              <div className="diagram-wrap">
                <svg width="100%" viewBox="0 0 500 250">
                  <text x="5" y="14" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">Array after each extractMaxAndStore pass</text>
                  <text x="5" y="46" fill="#546e7a" fontSize="10" fontFamily="JetBrains Mono">Start</text>
                  <g transform="translate(60,30)">
                    <rect x="0"   y="0" width="34" height="28" fill="#1a1f2e" stroke="#f0a500" strokeWidth="1.5" rx="3"/><text x="17"  y="19" textAnchor="middle" fill="#f0a500" fontSize="12" fontFamily="JetBrains Mono">30</text>
                    <rect x="38"  y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="55"  y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">20</text>
                    <rect x="76"  y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="93"  y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">18</text>
                    <rect x="114" y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="131" y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">10</text>
                    <rect x="152" y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="169" y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">5</text>
                    <text x="198" y="19" fill="#64748b" fontSize="11">← max heap</text>
                  </g>
                  <text x="5" y="96" fill="#546e7a" fontSize="10" fontFamily="JetBrains Mono">Pass 1</text>
                  <g transform="translate(60,80)">
                    <rect x="0"   y="0" width="34" height="28" fill="#1a1f2e" stroke="#f0a500" strokeWidth="1.5" rx="3"/><text x="17"  y="19" textAnchor="middle" fill="#f0a500" fontSize="12" fontFamily="JetBrains Mono">20</text>
                    <rect x="38"  y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="55"  y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">10</text>
                    <rect x="76"  y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="93"  y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">18</text>
                    <rect x="114" y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="131" y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">5</text>
                    <rect x="152" y="0" width="34" height="28" fill="#0d2a1a" stroke="#10b981" strokeWidth="1.5" rx="3"/><text x="169" y="19" textAnchor="middle" fill="#10b981" fontSize="12" fontFamily="JetBrains Mono">30</text>
                    <text x="198" y="19" fill="#10b981" fontSize="11">✓ 30 sorted</text>
                  </g>
                  <text x="5" y="146" fill="#546e7a" fontSize="10" fontFamily="JetBrains Mono">Pass 2</text>
                  <g transform="translate(60,130)">
                    <rect x="0"   y="0" width="34" height="28" fill="#1a1f2e" stroke="#f0a500" strokeWidth="1.5" rx="3"/><text x="17"  y="19" textAnchor="middle" fill="#f0a500" fontSize="12" fontFamily="JetBrains Mono">18</text>
                    <rect x="38"  y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="55"  y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">10</text>
                    <rect x="76"  y="0" width="34" height="28" fill="#1a1f2e" stroke="#252b3d" strokeWidth="1"   rx="3"/><text x="93"  y="19" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono">5</text>
                    <rect x="114" y="0" width="34" height="28" fill="#0d2a1a" stroke="#10b981" strokeWidth="1.5" rx="3"/><text x="131" y="19" textAnchor="middle" fill="#10b981" fontSize="12" fontFamily="JetBrains Mono">20</text>
                    <rect x="152" y="0" width="34" height="28" fill="#0d2a1a" stroke="#10b981" strokeWidth="1.5" rx="3"/><text x="169" y="19" textAnchor="middle" fill="#10b981" fontSize="12" fontFamily="JetBrains Mono">30</text>
                  </g>
                  <text x="5" y="246" fill="#10b981" fontSize="10" fontFamily="JetBrains Mono">Done ✓</text>
                  <g transform="translate(60,230)">
                    {[5,10,18,20,30].map((v,i) => (
                      <g key={i}>
                        <rect x={i*38} y="0" width="34" height="28" fill="#0d2a1a" stroke="#10b981" strokeWidth="2" rx="3"/>
                        <text x={i*38+17} y="19" textAnchor="middle" fill="#10b981" fontSize="12" fontFamily="JetBrains Mono">{v}</text>
                      </g>
                    ))}
                  </g>
                </svg>
                <figcaption>Largest values accumulate right-to-right. After n passes the array is fully ascending.</figcaption>
              </div>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public void</span> <span class="fn">extractMaxAndStore</span>() {
    <span class="kw">if</span> (heapSize == <span class="num">0</span>) <span class="kw">return</span>;
    <span class="fn">swap</span>(<span class="num">0</span>, heapSize - <span class="num">1</span>); <span class="cm">// store max at end, not discard</span>
    heapSize--;
    <span class="fn">heapify</span>(<span class="num">0</span>);
}
<span class="kw">public int</span>[] <span class="fn">heapSort</span>() {
    <span class="fn">buildTree</span>();
    <span class="kw">int</span> size = heapSize;
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; size; i++) <span class="fn">extractMaxAndStore</span>();
    <span class="kw">return</span> heap;
}`}} /></pre>
              <div className="callout warn">
                <div className="callout-label">Stable?</div>
                Heap Sort is <strong className="ds-strong">NOT stable</strong>. Equal elements may change relative order due to the swap step. Prefer Merge Sort when stability matters.
              </div>
            </>
          ),
        },
        {
          id: "s11",
          labelText: "Section 11",
          labelColor: tokens.accent,
          title: "Full Java Implementation",
          navLabel: "Full Code",
          render: () => (
            <>
              <p className="ds-p">Complete <code className="ds-code">MyHeap</code> class with all operations — buildTree, heapify, extractMax, increaseKey, decreaseKey, insert, and heapSort in one place.</p>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public class</span> <span class="type">MyHeap</span> {
    <span class="kw">int</span> heapSize, capacity;
    <span class="kw">int</span>[] heap;

    <span class="fn">MyHeap</span>(<span class="kw">int</span>[] arr) { heap = arr; heapSize = capacity = arr.length; }

    <span class="kw">private int</span> <span class="fn">parentIdx</span>(<span class="kw">int</span> j) {
        <span class="cm">// return (j - 1) / 2; // optimized integer division approach</span>
        <span class="kw">return</span> (<span class="kw">int</span>)(Math.<span class="fn">ceil</span>(j / <span class="num">2.0</span>) - <span class="num">1</span>);
    }

    <span class="kw">public void</span> <span class="fn">swap</span>(<span class="kw">int</span> i, <span class="kw">int</span> j) {
        <span class="kw">int</span> t = heap[i]; heap[i] = heap[j]; heap[j] = t;
    }
    <span class="kw">public void</span> <span class="fn">increaseCapacity</span>() {
        capacity *= <span class="num">2</span>;
        <span class="kw">int</span>[] n = <span class="kw">new int</span>[capacity];
        <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; heapSize; i++) n[i] = heap[i];
        heap = n;
    }
    <span class="kw">public void</span> <span class="fn">heapify</span>(<span class="kw">int</span> idx) {
        <span class="kw">int</span> lg = idx, L = <span class="num">2</span>*idx+<span class="num">1</span>, R = <span class="num">2</span>*idx+<span class="num">2</span>;
        <span class="kw">if</span> (L &lt; heapSize &amp;&amp; heap[L] &gt; heap[lg]) lg = L;
        <span class="kw">if</span> (R &lt; heapSize &amp;&amp; heap[R] &gt; heap[lg]) lg = R;
        <span class="kw">if</span> (lg != idx) { <span class="fn">swap</span>(idx, lg); <span class="fn">heapify</span>(lg); }
    }
    <span class="kw">public void</span> <span class="fn">buildTree</span>() {
        <span class="kw">for</span> (<span class="kw">int</span> i = heapSize/<span class="num">2</span>-<span class="num">1</span>; i &gt;= <span class="num">0</span>; i--) <span class="fn">heapify</span>(i);
    }
    <span class="kw">public int</span>  <span class="fn">extractMax</span>() {
        <span class="kw">if</span> (heapSize==<span class="num">0</span>) <span class="kw">return</span> -<span class="num">1</span>; <span class="cm">// Or throw new IllegalStateException("Heap is empty");</span>
        <span class="kw">int</span> max=heap[<span class="num">0</span>]; heap[<span class="num">0</span>]=heap[--heapSize]; <span class="fn">heapify</span>(<span class="num">0</span>); <span class="kw">return</span> max;
    }
    <span class="kw">public void</span> <span class="fn">increaseKey</span>(<span class="kw">int</span> i, <span class="kw">int</span> v) {
        <span class="kw">if</span> (i&lt;<span class="num">0</span>||i&gt;=heapSize||heap[i]&gt;=v) <span class="kw">return</span>;
        heap[i]=v;
        <span class="kw">while</span>(i&gt;<span class="num">0</span>&amp;&amp;heap[i]&gt;heap[<span class="fn">parentIdx</span>(i)]) { <span class="fn">swap</span>(i,<span class="fn">parentIdx</span>(i)); i=<span class="fn">parentIdx</span>(i); }
    }
    <span class="kw">public void</span> <span class="fn">decreaseKey</span>(<span class="kw">int</span> i, <span class="kw">int</span> v) {
        <span class="kw">if</span> (i&lt;<span class="num">0</span>||i&gt;=heapSize||heap[i]&lt;=v) <span class="kw">return</span>;
        heap[i]=v; <span class="fn">heapify</span>(i);
    }
    <span class="kw">public void</span> <span class="fn">insert</span>(<span class="kw">int</span> v) {
        <span class="kw">if</span> (heapSize+<span class="num">1</span>&gt;=capacity) <span class="fn">increaseCapacity</span>();
        heap[heapSize++]=v; <span class="kw">int</span> i=heapSize-<span class="num">1</span>;
        <span class="kw">while</span>(i&gt;<span class="num">0</span>&amp;&amp;heap[i]&gt;heap[<span class="fn">parentIdx</span>(i)]) { <span class="fn">swap</span>(i,<span class="fn">parentIdx</span>(i)); i=<span class="fn">parentIdx</span>(i); }
    }
    <span class="kw">public void</span> <span class="fn">extractMaxAndStore</span>() {
        <span class="kw">if</span>(heapSize==<span class="num">0</span>) <span class="kw">return</span>; <span class="fn">swap</span>(<span class="num">0</span>,heapSize-<span class="num">1</span>); heapSize--; <span class="fn">heapify</span>(<span class="num">0</span>);
    }
    <span class="kw">public int</span>[] <span class="fn">heapSort</span>() {
        <span class="fn">buildTree</span>(); <span class="kw">int</span> sz=heapSize;
        <span class="kw">for</span>(<span class="kw">int</span> i=<span class="num">0</span>;i&lt;sz;i++) <span class="fn">extractMaxAndStore</span>(); <span class="kw">return</span> heap;
    }
}`}} /></pre>
            </>
          ),
        },
        {
          id: "s12",
          labelText: "Section 12",
          labelColor: tokens.accent,
          title: "Time Complexity Summary",
          navLabel: "Complexity",
          render: () => (
            <>
              <table className="ds-tbl">
                <thead>
                  <tr><th>Operation</th><th>Time</th><th>Direction</th><th>Notes</th></tr>
                </thead>
                <tbody>
                  {[
                    ["Heapify",      "O(log n)",   "tc-log",   "Sift-down",  "At most tree height traversal"],
                    ["Build Heap",   "O(n)",        "tc-n",     "Bottom-up",  "Geometric series — not O(n log n)"],
                    ["Extract Max",  "O(log n)",   "tc-log",   "Sift-down",  "O(1) swap + heapify"],
                    ["Increase Key", "O(log n)",   "tc-log",   "Sift-up",    "Full height traversal upward"],
                    ["Decrease Key", "O(log n)",   "tc-log",   "Sift-down",  "Delegates to heapify"],
                    ["Insert",       "O(log n)",   "tc-log",   "Sift-up",    "O(1) place + bubble-up"],
                    ["Peek (max)",   "O(1)",        "tc-1",     "—",          "Just return heap[0]"],
                    ["Search",       "O(n)",        "tc-bad",   "Traversal",  "No BST decision factor"],
                    ["Heap Sort",    "O(n log n)",  "tc-nlogn", "—",          "O(n) build + n × O(log n) extract"],
                  ].map(([op, t, tcClass, dir, note]) => (
                    <tr key={op}>
                      <td>{op}</td>
                      <td><span className={`tc ${tcClass}`}>{t}</span></td>
                      <td style={{color:"#64748b", fontSize:13}}>{dir}</td>
                      <td style={{color:"#64748b", fontSize:13}}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="callout danger">
                <div className="callout-label">Heap is Not Unique — Interview Gotcha</div>
                A given set of elements can form multiple valid max heaps. Sibling nodes have no ordering constraint between them. So your buildHeap output and a classmate's may differ while both being perfectly correct.
              </div>
            </>
          ),
        },
      ],
};
