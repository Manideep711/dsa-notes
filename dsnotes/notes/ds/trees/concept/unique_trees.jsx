import React from "react";
import { tokens } from "../../../../tokens";

export const treeUniqueTab = {
  id: "treeUnique",
  label: "Unique Trees",
  colorVar: tokens.accent2,
  sections: [
    {
      id: "unique1",
      labelText: "Section 01",
      labelColor: tokens.accent2,
      title: "Why One Traversal Isn't Enough",
      navLabel: "Building Unique Trees",
      render: () => (
        <>
          <p className="ds-p">
            Can we construct a unique binary tree given just <em className="ds-em">one</em> traversal? <strong className="ds-strong">No!</strong> 
          </p>
          <div className="callout info">
            <div className="callout-label">The Problem with Single Traversals</div>
            <p className="mb-2">If we are given the <strong className="ds-strong">Preorder</strong> traversal <code className="ds-code">[1, 2, 3]</code>, we know that <code className="ds-code">1</code> is the root. But where do <code className="ds-code">2</code> and <code className="ds-code">3</code> go? Are they both on the left? Both on the right? Is <code className="ds-code">2</code> left and <code className="ds-code">3</code> right? Preorder alone cannot guarantee subtree boundaries.</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-6">
              {/* Left Skewed */}
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 100 120" className="w-[100px]" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
                  <line x1="80" y1="20" x2="50" y2="60" stroke={tokens.accent2} strokeWidth="2" />
                  <line x1="50" y1="60" x2="20" y2="100" stroke={tokens.accent2} strokeWidth="2" />
                  
                  <circle cx="80" cy="20" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="80" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
                  
                  <circle cx="50" cy="60" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="50" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
                  
                  <circle cx="20" cy="100" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="20" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
                </svg>
                <span className="text-xs text-gray-400 mt-2">Left Skewed</span>
              </div>

              {/* Balanced */}
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 100 120" className="w-[100px]" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
                  <line x1="50" y1="20" x2="20" y2="60" stroke={tokens.accent2} strokeWidth="2" />
                  <line x1="50" y1="20" x2="80" y2="60" stroke={tokens.accent2} strokeWidth="2" />
                  
                  <circle cx="50" cy="20" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="50" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
                  
                  <circle cx="20" cy="60" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="20" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
                  
                  <circle cx="80" cy="60" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="80" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
                </svg>
                <span className="text-xs text-gray-400 mt-2">Balanced</span>
              </div>

              {/* Right Skewed */}
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 100 120" className="w-[100px]" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
                  <line x1="20" y1="20" x2="50" y2="60" stroke={tokens.accent2} strokeWidth="2" />
                  <line x1="50" y1="60" x2="80" y2="100" stroke={tokens.accent2} strokeWidth="2" />
                  
                  <circle cx="20" cy="20" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="20" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
                  
                  <circle cx="50" cy="60" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="50" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
                  
                  <circle cx="80" cy="100" r="14" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
                  <text x="80" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
                </svg>
                <span className="text-xs text-gray-400 mt-2">Right Skewed</span>
              </div>
            </div>
            
            <div className="mt-4 text-center italic text-sm text-gray-300">
              All 3 of these trees produce the EXACT same Preorder traversal: <code className="ds-code">[1, 2, 3]</code>.
            </div>
          </div>
          
          <p className="ds-p mt-4">
            To build a <em className="ds-em">unique</em> binary tree, we need two traversals, and one of them <strong className="ds-strong">MUST</strong> be <strong className="ds-strong">Inorder</strong>.
          </p>
          <ul className="ds-list">
            <li><strong className="ds-strong">Preorder + Inorder:</strong> Preorder gives the Root. Inorder gives Left and Right boundaries.</li>
            <li><strong className="ds-strong">Postorder + Inorder:</strong> Postorder gives the Root. Inorder gives Left and Right boundaries.</li>
            <li><strong className="ds-strong">Preorder + Postorder:</strong> Cannot guarantee a unique tree because we don't know the boundaries of Left and Right subtrees.</li>
          </ul>
        </>
      ),
    },
    {
      id: "unique2",
      labelText: "Section 02",
      labelColor: tokens.accent2,
      title: "Preorder & Inorder Construction",
      navLabel: "Preorder & Inorder",
      render: () => (
        <>
          <p className="ds-p">
            Let's build a tree using <code className="ds-code">Preorder = [3, 9, 20, 15, 7]</code> and <code className="ds-code">Inorder = [9, 3, 15, 20, 7]</code>.
          </p>
          
          <div className="callout info">
            <div className="callout-label">Step-by-Step Logic</div>
            <ol className="ds-list">
              <li><strong className="ds-strong">Find the Root:</strong> The first element of Preorder is <code className="ds-code">3</code>. That's our root!</li>
              <li><strong className="ds-strong">Find the Boundaries:</strong> Look for <code className="ds-code">3</code> in the Inorder array. It is at index 1. Everything to the left of index 1 (<code className="ds-code">[9]</code>) belongs to the Left Subtree. Everything to the right (<code className="ds-code">[15, 20, 7]</code>) belongs to the Right Subtree.</li>
              <li><strong className="ds-strong">Count the Sizes:</strong> The left subtree has exactly 1 element. So in the Preorder array, the 1 element directly after the root (<code className="ds-code">[9]</code>) belongs to the left. The remaining elements (<code className="ds-code">[20, 15, 7]</code>) belong to the right.</li>
              <li><strong className="ds-strong">Recursion:</strong> Recursively pass the new sliced arrays to build the left and right children.</li>
            </ol>
          </div>

          <h3 className="ds-h3 mt-6 mb-2">Detailed Dry Run</h3>
          <div className="overflow-x-auto my-4">
            <table className="ds-tbl w-full text-left text-sm">
              <thead>
                <tr>
                  <th>Call</th>
                  <th>Root</th>
                  <th>Preorder Slice</th>
                  <th>Inorder Slice</th>
                  <th><code>inRoot</code> idx</th>
                  <th><code>numsLeft</code></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Main Call</td>
                  <td><code className="ds-code">3</code></td>
                  <td><code className="ds-code">[3, 9, 20, 15, 7]</code> (0 to 4)</td>
                  <td><code className="ds-code">[9, 3, 15, 20, 7]</code> (0 to 4)</td>
                  <td>1</td>
                  <td>1 - 0 = 1</td>
                </tr>
                <tr>
                  <td>&rarr; Left of 3</td>
                  <td><code className="ds-code">9</code></td>
                  <td><code className="ds-code">[9]</code> (1 to 1)</td>
                  <td><code className="ds-code">[9]</code> (0 to 0)</td>
                  <td>0</td>
                  <td>0 - 0 = 0</td>
                </tr>
                <tr>
                  <td>&rarr; Right of 3</td>
                  <td><code className="ds-code">20</code></td>
                  <td><code className="ds-code">[20, 15, 7]</code> (2 to 4)</td>
                  <td><code className="ds-code">[15, 20, 7]</code> (2 to 4)</td>
                  <td>3</td>
                  <td>3 - 2 = 1</td>
                </tr>
                <tr>
                  <td>&rarr; &rarr; Left of 20</td>
                  <td><code className="ds-code">15</code></td>
                  <td><code className="ds-code">[15]</code> (3 to 3)</td>
                  <td><code className="ds-code">[15]</code> (2 to 2)</td>
                  <td>2</td>
                  <td>2 - 2 = 0</td>
                </tr>
                <tr>
                  <td>&rarr; &rarr; Right of 20</td>
                  <td><code className="ds-code">7</code></td>
                  <td><code className="ds-code">[7]</code> (4 to 4)</td>
                  <td><code className="ds-code">[7]</code> (4 to 4)</td>
                  <td>4</td>
                  <td>4 - 4 = 0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="callout warn">
            <div className="callout-label">O(N) Optimization: The Index HashMap</div>
            Instead of doing a linear search <code className="ds-code">O(N)</code> to find the root in the Inorder array at every recursive step (which would make the overall algorithm <code className="ds-code">O(N^2)</code>), we pre-hash the Inorder array values to their indices using a <strong className="ds-strong">HashMap</strong>. This brings the lookup time to <code className="ds-code">O(1)</code>, keeping the whole process at <strong className="ds-strong">O(N)</strong> Time Complexity.
          </div>
          
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">buildTree</span>(<span class="kw">int</span>[] preorder, <span class="kw">int</span>[] inorder) {
    <span class="type">Map</span>&lt;<span class="type">Integer</span>, <span class="type">Integer</span>&gt; inMap = <span class="kw">new</span> <span class="type">HashMap</span>&lt;&gt;();
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; inorder.length; i++) {
        inMap.<span class="fn">put</span>(inorder[i], i);
    }
    <span class="kw">return</span> <span class="fn">buildTree</span>(preorder, <span class="num">0</span>, preorder.length - <span class="num">1</span>, 
                     inorder, <span class="num">0</span>, inorder.length - <span class="num">1</span>, inMap);
}

<span class="kw">private</span> <span class="type">TreeNode</span> <span class="fn">buildTree</span>(<span class="kw">int</span>[] preorder, <span class="kw">int</span> preStart, <span class="kw">int</span> preEnd, 
                           <span class="kw">int</span>[] inorder, <span class="kw">int</span> inStart, <span class="kw">int</span> inEnd, 
                           <span class="type">Map</span>&lt;<span class="type">Integer</span>, <span class="type">Integer</span>&gt; inMap) {
    <span class="cm">// Base Case: Pointers crossed</span>
    <span class="kw">if</span> (preStart &gt; preEnd || inStart &gt; inEnd) <span class="kw">return</span> <span class="kw">null</span>;
    
    <span class="cm">// Create the root from the start of the Preorder segment</span>
    <span class="type">TreeNode</span> root = <span class="kw">new</span> <span class="type">TreeNode</span>(preorder[preStart]);
    
    <span class="cm">// Find root's position in Inorder array (O(1) lookup)</span>
    <span class="kw">int</span> inRoot = inMap.<span class="fn">get</span>(root.val);
    <span class="kw">int</span> numsLeft = inRoot - inStart; <span class="cm">// Number of elements in left subtree</span>
    
    <span class="cm">// Left subtree: Skip the root in Preorder (+1), take exactly 'numsLeft' elements</span>
    root.left = <span class="fn">buildTree</span>(preorder, preStart + <span class="num">1</span>, preStart + numsLeft, 
                          inorder, inStart, inRoot - <span class="num">1</span>, inMap);
                          
    <span class="cm">// Right subtree: Skip root and left subtree in Preorder</span>
    root.right = <span class="fn">buildTree</span>(preorder, preStart + numsLeft + <span class="num">1</span>, preEnd, 
                           inorder, inRoot + <span class="num">1</span>, inEnd, inMap);
                           
    <span class="kw">return</span> root;
}`}} /></pre>
        </>
      ),
    },
    {
      id: "unique3",
      labelText: "Section 03",
      labelColor: tokens.accent2,
      title: "Postorder & Inorder Construction",
      navLabel: "Postorder & Inorder",
      render: () => (
        <>
          <p className="ds-p">
            This works identically to Preorder & Inorder, but because Postorder is <strong className="ds-strong">Left &rarr; Right &rarr; Root</strong>, the root is <em className="ds-em">always</em> at the <strong className="ds-strong">end</strong> of the Postorder array segment. 
          </p>
          <div className="callout info">
            <div className="callout-label">Index Adjustments</div>
            The math for the left and right array bounds shifts slightly. For the root, instead of pulling from <code className="ds-code">preorder[preStart]</code>, we pull from <code className="ds-code">postorder[postEnd]</code>.
          </div>
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public</span> <span class="type">TreeNode</span> <span class="fn">buildTree</span>(<span class="kw">int</span>[] inorder, <span class="kw">int</span>[] postorder) {
    <span class="type">Map</span>&lt;<span class="type">Integer</span>, <span class="type">Integer</span>&gt; inMap = <span class="kw">new</span> <span class="type">HashMap</span>&lt;&gt;();
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; inorder.length; i++) {
        inMap.<span class="fn">put</span>(inorder[i], i);
    }
    <span class="kw">return</span> <span class="fn">buildTree</span>(inorder, <span class="num">0</span>, inorder.length - <span class="num">1</span>, 
                     postorder, <span class="num">0</span>, postorder.length - <span class="num">1</span>, inMap);
}

<span class="kw">private</span> <span class="type">TreeNode</span> <span class="fn">buildTree</span>(<span class="kw">int</span>[] inorder, <span class="kw">int</span> inStart, <span class="kw">int</span> inEnd, 
                           <span class="kw">int</span>[] postorder, <span class="kw">int</span> postStart, <span class="kw">int</span> postEnd, 
                           <span class="type">Map</span>&lt;<span class="type">Integer</span>, <span class="type">Integer</span>&gt; inMap) {
    <span class="cm">// Base Case</span>
    <span class="kw">if</span> (inStart &gt; inEnd || postStart &gt; postEnd) <span class="kw">return</span> <span class="kw">null</span>;
    
    <span class="cm">// Create the root from the END of the Postorder segment</span>
    <span class="type">TreeNode</span> root = <span class="kw">new</span> <span class="type">TreeNode</span>(postorder[postEnd]);
    
    <span class="kw">int</span> inRoot = inMap.<span class="fn">get</span>(root.val);
    <span class="kw">int</span> numsLeft = inRoot - inStart;
    
    <span class="cm">// Left subtree: Postorder ends right before the right subtree begins</span>
    root.left = <span class="fn">buildTree</span>(inorder, inStart, inRoot - <span class="num">1</span>, 
                          postorder, postStart, postStart + numsLeft - <span class="num">1</span>, inMap);
                          
    <span class="cm">// Right subtree: Postorder starts after the left subtree and ends right before the root</span>
    root.right = <span class="fn">buildTree</span>(inorder, inRoot + <span class="num">1</span>, inEnd, 
                           postorder, postStart + numsLeft, postEnd - <span class="num">1</span>, inMap);
                           
    <span class="kw">return</span> root;
}`}} /></pre>
        </>
      ),
    },
  ],
};
