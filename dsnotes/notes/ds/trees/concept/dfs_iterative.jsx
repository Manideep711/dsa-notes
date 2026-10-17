import React from "react";
import { tokens } from "../../../../tokens";

export const treeDfsIterativeTab = {
  id: "treeDfsIterative",
  label: "Iterative DFS",
  colorVar: tokens.accent2,
  sections: [
    {
      id: "iter1",
      labelText: "Section 01",
      labelColor: tokens.accent2,
      title: "Iterative Preorder Traversal",
      navLabel: "Iterative Preorder",
      render: () => (
        <>
          <p className="ds-p">
            In recursion, the system call stack manages the state. To convert this to an iterative approach, we simulate that behavior using a custom <strong className="ds-strong">Stack</strong> data structure.
          </p>
          <div className="callout info">
            <div className="callout-label">The Intuition</div>
            Preorder is <strong className="ds-strong">Root &rarr; Left &rarr; Right</strong>. When we process a node, we immediately have its value. But we must process its left subtree <em>before</em> its right subtree. <br/><br/>
            Since a Stack operates on the <strong className="ds-strong">LIFO (Last-In, First-Out)</strong> principle, if we want the Left child to be processed first, we <strong className="ds-strong">must push the Right child onto the stack FIRST</strong>, followed by the Left child. This ensures the Left child sits at the top of the stack and gets popped first on the next iteration.
          </div>
          
          <div className="flex flex-col items-center my-6">
            <svg viewBox="0 0 320 200" className="w-full max-w-lg" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
              {/* Edges */}
              <line x1="160" y1="30" x2="90" y2="90" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="160" y1="30" x2="230" y2="90" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="90" y1="90" x2="50" y2="150" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="90" y1="90" x2="130" y2="150" stroke={tokens.accent2} strokeWidth="2" />
              
              {/* Nodes */}
              <circle cx="160" cy="30" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="160" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>
              
              <circle cx="90" cy="90" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="90" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">2</text>
              
              <circle cx="230" cy="90" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="230" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">3</text>
              
              <circle cx="50" cy="150" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="50" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">4</text>
              
              <circle cx="130" cy="150" r="18" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="130" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

              {/* Order Indicator */}
              <rect x="230" y="140" width="85" height="45" rx="5" fill="#2a2a2a" stroke="white" strokeWidth="1"/>
              <text x="272" y="158" textAnchor="middle" fill="white" fontSize="12">Preorder:</text>
              <text x="272" y="176" textAnchor="middle" fill={tokens.accent2} fontSize="14" fontWeight="bold">1, 2, 4, 5, 3</text>
            </svg>
          </div>

          <h3 className="ds-h3 mt-6 mb-2">Step-by-step Dry Run</h3>
          <div className="overflow-x-auto my-4">
            <table className="ds-tbl w-full text-left">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Stack State (Top &rarr; Bottom)</th>
                  <th>Output Array</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Push Root (1)</td>
                  <td><code className="ds-code">[1]</code></td>
                  <td><code className="ds-code">[]</code></td>
                </tr>
                <tr>
                  <td>Pop 1, Push Right(3), Push Left(2)</td>
                  <td><code className="ds-code">[2, 3]</code></td>
                  <td><code className="ds-code">[1]</code></td>
                </tr>
                <tr>
                  <td>Pop 2, Push Right(5), Push Left(4)</td>
                  <td><code className="ds-code">[4, 5, 3]</code></td>
                  <td><code className="ds-code">[1, 2]</code></td>
                </tr>
                <tr>
                  <td>Pop 4, No children to push</td>
                  <td><code className="ds-code">[5, 3]</code></td>
                  <td><code className="ds-code">[1, 2, 4]</code></td>
                </tr>
                <tr>
                  <td>Pop 5, No children to push</td>
                  <td><code className="ds-code">[3]</code></td>
                  <td><code className="ds-code">[1, 2, 4, 5]</code></td>
                </tr>
                <tr>
                  <td>Pop 3, No children to push</td>
                  <td><code className="ds-code">[]</code></td>
                  <td><code className="ds-code">[1, 2, 4, 5, 3]</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">preorderTraversal</span>(<span class="type">TreeNode</span> root) {
    <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;
    
    <span class="type">Stack</span>&lt;<span class="type">TreeNode</span>&gt; stack = <span class="kw">new</span> <span class="type">Stack</span>&lt;&gt;();
    stack.<span class="fn">push</span>(root);
    
    <span class="kw">while</span> (!stack.<span class="fn">isEmpty</span>()) {
        <span class="type">TreeNode</span> node = stack.<span class="fn">pop</span>();
        res.<span class="fn">add</span>(node.val); <span class="cm">// 1. Process Root</span>
        
        <span class="cm">// 2. Push Right FIRST so it's processed AFTER Left (LIFO behavior)</span>
        <span class="kw">if</span> (node.right != <span class="kw">null</span>) stack.<span class="fn">push</span>(node.right);
        <span class="kw">if</span> (node.left != <span class="kw">null</span>) stack.<span class="fn">push</span>(node.left);
    }
    <span class="kw">return</span> res;
}`}} /></pre>

          <div className="callout proof">
            <div className="callout-label">Complexity Analysis</div>
            <strong className="ds-strong">Time Complexity:</strong> <code className="ds-code">O(N)</code>. We push and pop each node exactly once. Doing <code className="ds-code">O(1)</code> work per node yields <code className="ds-code">O(N)</code> total time.<br/><br/>
            <strong className="ds-strong">Space Complexity:</strong> <code className="ds-code">O(H)</code> where H is the height of the tree. In the worst case (skewed tree), the space complexity is <code className="ds-code">O(N)</code>. In a perfectly balanced tree, the max stack size is <code className="ds-code">O(log N)</code>.
          </div>
        </>
      ),
    },
    {
      id: "iter2",
      labelText: "Section 02",
      labelColor: tokens.accent2,
      title: "Iterative Inorder Traversal",
      navLabel: "Iterative Inorder",
      render: () => (
        <>
          <p className="ds-p">
            Inorder traversal is <strong className="ds-strong">Left &rarr; Root &rarr; Right</strong>. Unlike Preorder, we cannot process the root when we first see it. We must hold onto it, traverse entirely down its left subtree, process that left subtree, and <em>only then</em> process the root.
          </p>
          <div className="callout info">
            <div className="callout-label">Dry Run & Logic</div>
            <ol className="ds-list">
              <li>Start at the root. Do not process it. Instead, push it to the stack and keep moving <code className="ds-code">node = node.left</code> until you hit <code className="ds-code">null</code>.</li>
              <li>When <code className="ds-code">node == null</code>, it means we have gone as far left as possible. The node at the top of the stack is the node whose left subtree is fully processed (because it was empty).</li>
              <li>Pop that top node, <strong className="ds-strong">process it</strong>, and now we must visit its right subtree: <code className="ds-code">node = node.right</code>.</li>
              <li>Repeat this until the stack is empty and <code className="ds-code">node</code> is null.</li>
            </ol>
          </div>
          
          <h3 className="ds-h3 mt-6 mb-2">Step-by-step Dry Run</h3>
          <p className="ds-p text-sm text-gray-400 mb-2">Using the same tree as above (1 is root, 2 is left, 3 is right, 4 is left of 2, 5 is right of 2):</p>
          <div className="overflow-x-auto my-4">
            <table className="ds-tbl w-full text-left">
              <thead>
                <tr>
                  <th>Current Node</th>
                  <th>Action</th>
                  <th>Stack State</th>
                  <th>Output Array</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Push 1, Go Left</td>
                  <td><code className="ds-code">[1]</code></td>
                  <td><code className="ds-code">[]</code></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Push 2, Go Left</td>
                  <td><code className="ds-code">[2, 1]</code></td>
                  <td><code className="ds-code">[]</code></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Push 4, Go Left</td>
                  <td><code className="ds-code">[4, 2, 1]</code></td>
                  <td><code className="ds-code">[]</code></td>
                </tr>
                <tr>
                  <td><code className="ds-code">null</code></td>
                  <td>Pop 4, Process, Go Right</td>
                  <td><code className="ds-code">[2, 1]</code></td>
                  <td><code className="ds-code">[4]</code></td>
                </tr>
                <tr>
                  <td><code className="ds-code">null</code> (4's right)</td>
                  <td>Pop 2, Process, Go Right</td>
                  <td><code className="ds-code">[1]</code></td>
                  <td><code className="ds-code">[4, 2]</code></td>
                </tr>
                <tr>
                  <td>5 (2's right)</td>
                  <td>Push 5, Go Left</td>
                  <td><code className="ds-code">[5, 1]</code></td>
                  <td><code className="ds-code">[4, 2]</code></td>
                </tr>
                <tr>
                  <td><code className="ds-code">null</code></td>
                  <td>Pop 5, Process, Go Right</td>
                  <td><code className="ds-code">[1]</code></td>
                  <td><code className="ds-code">[4, 2, 5]</code></td>
                </tr>
                <tr>
                  <td><code className="ds-code">null</code> (5's right)</td>
                  <td>Pop 1, Process, Go Right</td>
                  <td><code className="ds-code">[]</code></td>
                  <td><code className="ds-code">[4, 2, 5, 1]</code></td>
                </tr>
                <tr>
                  <td>3 (1's right)</td>
                  <td>Push 3, Go Left</td>
                  <td><code className="ds-code">[3]</code></td>
                  <td><code className="ds-code">[4, 2, 5, 1]</code></td>
                </tr>
                <tr>
                  <td><code className="ds-code">null</code></td>
                  <td>Pop 3, Process, Go Right</td>
                  <td><code className="ds-code">[]</code></td>
                  <td><code className="ds-code">[4, 2, 5, 1, 3]</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">inorderTraversal</span>(<span class="type">TreeNode</span> root) {
    <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
    <span class="type">Stack</span>&lt;<span class="type">TreeNode</span>&gt; stack = <span class="kw">new</span> <span class="type">Stack</span>&lt;&gt;();
    <span class="type">TreeNode</span> node = root;
    
    <span class="kw">while</span> (node != <span class="kw">null</span> || !stack.<span class="fn">isEmpty</span>()) {
        <span class="kw">if</span> (node != <span class="kw">null</span>) {
            <span class="cm">// Keep moving left, tracking parents in stack</span>
            stack.<span class="fn">push</span>(node);
            node = node.left;
        } <span class="kw">else</span> {
            <span class="cm">// Reached leftmost, pop and process</span>
            node = stack.<span class="fn">pop</span>();
            res.<span class="fn">add</span>(node.val);
            
            <span class="cm">// Now explore the right subtree</span>
            node = node.right;
        }
    }
    <span class="kw">return</span> res;
}`}} /></pre>
          <div className="callout warn">
            <div className="callout-label">Time & Space Complexity Proof</div>
            You might see a while loop inside a while loop (or an if-else in a while loop) and think the Time Complexity is <code className="ds-code">O(N^2)</code>. <br/><br/>
            <strong className="ds-strong">It is strictly O(N).</strong> Why? Because every single node in the tree is pushed to the stack exactly once, and popped exactly once. The operations per node are constant, making it <code className="ds-code">O(N)</code> Time and <code className="ds-code">O(H)</code> Space (for the stack height).
          </div>
        </>
      ),
    },
    {
      id: "iter3",
      labelText: "Section 03",
      labelColor: tokens.accent2,
      title: "Iterative Postorder Traversal",
      navLabel: "Iterative Postorder",
      render: () => (
        <>
          <p className="ds-p">
            Iterative Postorder (<strong className="ds-strong">Left &rarr; Right &rarr; Root</strong>) is notoriously one of the hardest algorithms. The difficulty lies in the fact that when we return to a root node from its children, we need to know: <em className="ds-em">Did we just return from the Left child, or the Right child?</em>
          </p>

          <h3 className="ds-h3 mt-6 mb-2 text-xl font-bold">Approach 1: Two Stacks (Easier to Understand)</h3>
          <p className="ds-p mb-2">
            We can modify the Preorder Traversal (<strong className="ds-strong">Root &rarr; Left &rarr; Right</strong>). If we change it to process Right then Left, the traversal becomes <strong className="ds-strong">Root &rarr; Right &rarr; Left</strong>. If we reverse that entire sequence, we get <strong className="ds-strong">Left &rarr; Right &rarr; Root</strong>, which is Postorder!
          </p>
          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">postorderTraversalTwoStacks</span>(<span class="type">TreeNode</span> root) {
    <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
    <span class="kw">if</span> (root == <span class="kw">null</span>) <span class="kw">return</span> res;

    <span class="type">Stack</span>&lt;<span class="type">TreeNode</span>&gt; stack = <span class="kw">new</span> <span class="type">Stack</span>&lt;&gt;();
    <span class="type">Stack</span>&lt;<span class="type">TreeNode</span>&gt; output = <span class="kw">new</span> <span class="type">Stack</span>&lt;&gt;();
    
    stack.<span class="fn">push</span>(root);
    <span class="kw">while</span> (!stack.<span class="fn">isEmpty</span>()) {
        <span class="type">TreeNode</span> node = stack.<span class="fn">pop</span>();
        output.<span class="fn">push</span>(node); <span class="cm">// Instead of printing, push to output stack</span>

        <span class="cm">// Push Left first, so Right is popped first (Root -> Right -> Left)</span>
        <span class="kw">if</span> (node.left != <span class="kw">null</span>) stack.<span class="fn">push</span>(node.left);
        <span class="kw">if</span> (node.right != <span class="kw">null</span>) stack.<span class="fn">push</span>(node.right);
    }
    
    <span class="kw">while</span> (!output.<span class="fn">isEmpty</span>()) {
        res.<span class="fn">add</span>(output.<span class="fn">pop</span>().val);
    }
    <span class="kw">return</span> res;
}`}} /></pre>

          <h3 className="ds-h3 mt-8 mb-2 text-xl font-bold">Approach 2: Single Stack (Optimal Space)</h3>
          <ul className="ds-list mb-4">
            <li>If we returned from the <strong className="ds-strong">Left</strong>, we must go to the Right child next.</li>
            <li>If we returned from the <strong className="ds-strong">Right</strong>, it means both Left and Right are done, so we can finally pop and process the Root.</li>
          </ul>

          <div className="callout info">
            <div className="callout-label">The "Magic Step" Intuition</div>
            To solve this without storing extra state in the node, we use the stack.
            <ol className="ds-list">
              <li>Keep moving <strong className="ds-strong">Left</strong>, pushing nodes.</li>
              <li>When you hit <code className="ds-code">null</code>, peek at the stack's top. Let's call it <code className="ds-code">parent</code>.</li>
              <li>Check <code className="ds-code">parent.right</code>. If it exists and hasn't been visited, move to it.</li>
              <li>If <code className="ds-code">parent.right</code> is null (or we just finished visiting it), we pop <code className="ds-code">parent</code> and print it.</li>
              <li><strong className="ds-strong">The Magic Step:</strong> After popping <code className="ds-code">parent</code>, we check if <code className="ds-code">parent</code> is the right child of the <em className="ds-em">new</em> top of the stack. If it is, that means the new top's right subtree is fully processed! So we can pop the new top too. We repeat this via an inner while loop.</li>
            </ol>
          </div>

          <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">postorderTraversal</span>(<span class="type">TreeNode</span> root) {
    <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
    <span class="type">Stack</span>&lt;<span class="type">TreeNode</span>&gt; stack = <span class="kw">new</span> <span class="type">Stack</span>&lt;&gt;();
    <span class="type">TreeNode</span> node = root;
    
    <span class="kw">while</span> (node != <span class="kw">null</span> || !stack.<span class="fn">isEmpty</span>()) {
        <span class="cm">// 1. Move to the left as far as possible</span>
        <span class="kw">if</span> (node != <span class="kw">null</span>) {
            stack.<span class="fn">push</span>(node);
            node = node.left;
        } 
        <span class="cm">// 2. If left is null, check if we can move right</span>
        <span class="kw">else if</span> (stack.<span class="fn">peek</span>().right != <span class="kw">null</span>) {
            node = stack.<span class="fn">peek</span>().right;
        } 
        <span class="cm">// 3. If right is also null, process node</span>
        <span class="kw">else</span> {
            <span class="type">TreeNode</span> temp = stack.<span class="fn">pop</span>();
            res.<span class="fn">add</span>(temp.val);
            
            <span class="cm">// 4. Magic Step: If the node we just popped was a right child, </span>
            <span class="cm">// its parent is now completely done! Pop the parent too.</span>
            <span class="kw">while</span> (!stack.<span class="fn">isEmpty</span>() && temp == stack.<span class="fn">peek</span>().right) {
                temp = stack.<span class="fn">pop</span>();
                res.<span class="fn">add</span>(temp.val);
            }
        }
    }
    <span class="kw">return</span> res;
}`}} /></pre>
        </>
      ),
    },
    {
      id: "iter4",
      labelText: "Section 04",
      labelColor: tokens.accent2,
      title: "Dry Run & Complexity Analysis",
      navLabel: "Dry Run & Complexity",
      render: () => (
        <>
          <p className="ds-p">
            Let's dry run the optimal Single-Stack Postorder code on a <strong className="ds-strong">Right-Skewed Tree</strong> (a tree where every node only has a right child). This proves that even with the nested <code className="ds-code">while</code> loops, our time complexity is strictly <code className="ds-code">O(N)</code>.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 my-6">
            <svg viewBox="0 0 240 280" className="w-full max-w-[200px]" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>
              <line x1="60" y1="40" x2="110" y2="100" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="110" y1="100" x2="160" y2="160" stroke={tokens.accent2} strokeWidth="2" />
              <line x1="160" y1="160" x2="210" y2="220" stroke={tokens.accent2} strokeWidth="2" />
              
              <circle cx="60" cy="40" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="60" y="46" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">1</text>
              
              <circle cx="110" cy="100" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="110" y="106" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">2</text>
              
              <circle cx="160" cy="160" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="160" y="166" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">3</text>
              
              <circle cx="210" cy="220" r="22" fill="#1e1e1e" stroke={tokens.accent2} strokeWidth="2" />
              <text x="210" y="226" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">4</text>
            </svg>
            
            <div className="flex-1 text-sm p-6 rounded-lg border border-[#252b3d]" style={{ backgroundColor: "#1a1f2e" }}>
              <strong className="text-white mb-3 block text-lg">Step-by-step Trace:</strong>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li><code style={{ color: tokens.accent2 }}>node=1</code>. Left is null. Check stack.peek().right (which is 2). Move to 2.</li>
                <li>Stack state builds up: <code style={{ color: tokens.accent3 }}>[1, 2, 3, 4]</code> as we keep moving right.</li>
                <li>At <code style={{ color: tokens.accent2 }}>node=4</code>, its left and right are null. We hit the <code style={{ color: tokens.accent5 }}>else</code> block!</li>
                <li>Pop 4. <code style={{ color: tokens.accent }}>temp=4</code>. Output: <code className="text-white">[4]</code>.</li>
                <li>Inner while loop: Is <code style={{ color: tokens.accent }}>temp</code> the right child of stack top <code className="text-white">3</code>? <strong style={{ color: tokens.accent3 }}>YES!</strong></li>
                <li>Pop 3. <code style={{ color: tokens.accent }}>temp=3</code>. Output: <code className="text-white">[4, 3]</code>.</li>
                <li>Is 3 the right child of 2? <strong style={{ color: tokens.accent3 }}>YES!</strong> Pop 2. Output: <code className="text-white">[4, 3, 2]</code>.</li>
                <li>Is 2 the right child of 1? <strong style={{ color: tokens.accent3 }}>YES!</strong> Pop 1. Output: <code className="text-white">[4, 3, 2, 1]</code>.</li>
              </ul>
            </div>
          </div>

          <div className="callout proof">
            <div className="callout-label">Time Complexity Proof</div>
            In this worst-case right-skewed tree, we inserted 4 nodes sequentially, and then the inner <code className="ds-code">while</code> loop popped all 4 nodes in a single cascading sweep. <br/><br/>
            Total pushes = N. Total pops = N. Therefore, operations = N + N = 2N. <br/>
            This evaluates to <strong className="ds-strong">O(N) Time Complexity</strong>. The Space Complexity is <strong className="ds-strong">O(H)</strong>, which equates to <strong className="ds-strong">O(N)</strong> in this skewed tree.
          </div>
        </>
      ),
    },
  ],
};
