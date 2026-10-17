import React from "react";
import { tokens } from "../../../../tokens";

export const iqTab = {
      id: "iq",
      label: "Interview Questions",
      colorVar: tokens.accent3,
      sections: [
        {
          id: "iq1",
          labelText: "Question 01",
          labelColor: tokens.accent3,
          title: "Top K Frequent Elements",
          navLabel: "Top K Frequent",
          render: () => (
            <>
              <div className="callout info">
                <div className="callout-label">Problem</div>
                Given an integer array <code className="ds-code">nums</code> and an integer <code className="ds-code">k</code>, return the <strong className="ds-strong">k most frequent elements</strong> in any order.
              </div>
              <h3 className="ds-h3">Intuition — Why Priority Queue?</h3>
              <p className="ds-p">Elements need to be differentiated by <strong className="ds-strong">priority = frequency</strong>. Higher frequency → higher priority. Two cases: (1) element itself is the priority, or (2) <strong className="ds-strong">element ≠ priority</strong> — here the number is the element, its frequency is the priority. We need both stored together.</p>
              <h3 className="ds-h3">Approach 1 — Max Heap (O(T log T))</h3>
              <ol className="ds-steps">
                <li><div>Build a <code className="ds-code">HashMap</code> → element : frequency in O(n).</div></li>
                <li><div>Insert all (element, freq) pairs into a max-heap (descending freq).</div></li>
                <li><div>Poll k times — each gives the next most frequent element.</div></li>
              </ol>
              <h3 className="ds-h3">Approach 2 — Min Heap of size k (O(T log k))</h3>
              <p className="ds-p">Maintain a min-heap capped at size k. Whenever size exceeds k, evict the smallest-frequency element. At the end the heap holds exactly the top-k.</p>
              <div className="callout proof">
                <div className="callout-label">Why min-heap saves time</div>
                Insert + delete time per element = O(log k) instead of O(log T). Since k ≤ T this is strictly better. The heap never grows beyond k.
              </div>
              <div className="trick-box">
                <div className="trick-title">Min Heap Walk-through (k=2, freqs: 1→3, 2→2, 3→1)</div>
                <table className="ds-tbl" style={{margin:0}}>
                  <thead><tr><th>Insert</th><th>Heap after</th><th>Action</th></tr></thead>
                  <tbody>
                    {[
                      ["(1,freq=3)","{ (1,3) }","size=1 ≤ k, no eviction"],
                      ["(2,freq=2)","{ (2,2),(1,3) }","size=2 ≤ k, no eviction"],
                      ["(3,freq=1)","{ (3,1),(2,2),(1,3) }","size=3 > k → poll min → remove (3,1)"],
                    ].map(([ins,h,act]) => (
                      <tr key={ins}>
                        <td><code className="ds-code">{ins}</code></td>
                        <td style={{color:"#c8d3e0"}}>{h}</td>
                        <td style={{color:"#64748b",fontSize:12}}>{act}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="ds-p" style={{color:tokens.accent3,marginTop:8,marginBottom:0}}>Final heap → answer: [1, 2] ✓</p>
              </div>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">Number</span> <span class="kw">implements</span> Comparable&lt;<span class="type">Number</span>&gt; {
    <span class="kw">int</span> element, freq;
    <span class="fn">Number</span>(<span class="kw">int</span> element, <span class="kw">int</span> freq) { <span class="kw">this</span>.element=element; <span class="kw">this</span>.freq=freq; }
    <span class="kw">public int</span> <span class="fn">compareTo</span>(<span class="type">Number</span> that) {
        <span class="kw">return this</span>.freq - that.freq; <span class="cm">// min-heap by freq</span>
    }
}
<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public int</span>[] <span class="fn">topKFrequent</span>(<span class="kw">int</span>[] nums, <span class="kw">int</span> k) {
        <span class="type">HashMap</span>&lt;<span class="type">Integer</span>,<span class="type">Integer</span>&gt; freqMap = <span class="kw">new</span> <span class="type">HashMap</span>&lt;&gt;();
        <span class="kw">for</span> (<span class="kw">int</span> element : nums)
            freqMap.<span class="fn">put</span>(element, freqMap.<span class="fn">getOrDefault</span>(element, <span class="num">0</span>) + <span class="num">1</span>);

        <span class="type">PriorityQueue</span>&lt;<span class="type">Number</span>&gt; pq = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;();
        <span class="kw">for</span> (<span class="type">Map.Entry</span>&lt;<span class="type">Integer</span>,<span class="type">Integer</span>&gt; entry : freqMap.<span class="fn">entrySet</span>()) {
            pq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">Number</span>(entry.<span class="fn">getKey</span>(), entry.<span class="fn">getValue</span>()));
            <span class="kw">if</span> (pq.<span class="fn">size</span>() &gt; k) pq.<span class="fn">poll</span>(); <span class="cm">// evict lowest-freq</span>
        }
        <span class="kw">int</span>[] res = <span class="kw">new int</span>[k];
        <span class="kw">int</span> index = <span class="num">0</span>;
        <span class="kw">while</span> (index &lt; k) res[index++] = pq.<span class="fn">poll</span>().element;
        <span class="kw">return</span> res;
    }
}`}} /></pre>
              <table className="ds-tbl">
                <thead><tr><th>Approach</th><th>Time</th><th>Space</th></tr></thead>
                <tbody>
                  <tr><td>Max Heap</td><td><span className="tc tc-nlogn">O(n + T log T)</span></td><td><span className="tc tc-n">O(T)</span></td></tr>
                  <tr><td>Min Heap (k)</td><td><span className="tc tc-log">O(n + T log k)</span></td><td><span className="tc tc-n">O(T + k)</span></td></tr>
                </tbody>
              </table>
              <p className="ds-p" style={{color:"#64748b",fontSize:13}}>T = number of unique elements in nums.</p>
            </>
          ),
        },
        {
          id: "iq2",
          labelText: "Question 02",
          labelColor: tokens.accent3,
          title: "Sort Characters By Frequency",
          navLabel: "Sort Chars by Freq",
          render: () => (
            <>
              <div className="callout info">
                <div className="callout-label">Problem</div>
                Given a string <code className="ds-code">s</code>, sort it in <strong className="ds-strong">decreasing order</strong> based on character frequency. Return any valid answer.
              </div>
              <h3 className="ds-h3">Pattern Recognition</h3>
              <p className="ds-p">Same two-step pattern as Q1: build frequency map → max-heap to retrieve characters highest-frequency-first. For each polled element, append its character <strong className="ds-strong">freq times</strong> to a StringBuilder.</p>
              <div className="callout warn">
                <div className="callout-label">String vs StringBuilder</div>
                Java <code className="ds-code">String</code> is immutable — every <code className="ds-code">+</code> creates a new object → O(n²) total. <code className="ds-code">StringBuilder</code> is mutable → O(n). Always use it when building strings in a loop.
              </div>
              <ol className="ds-steps">
                <li><div>Build <code className="ds-code">HashMap&lt;Character,Integer&gt;</code> for character frequencies.</div></li>
                <li><div>Insert all pairs into a max-heap (descending freq via <code className="ds-code">compareTo</code>).</div></li>
                <li><div>Poll each element; append its character <code className="ds-code">freq</code> times to StringBuilder.</div></li>
                <li><div>Return <code className="ds-code">sb.toString()</code>.</div></li>
              </ol>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">Element</span> <span class="kw">implements</span> Comparable&lt;<span class="type">Element</span>&gt; {
    <span class="kw">char</span> ch; <span class="kw">int</span> freq;
    <span class="fn">Element</span>(<span class="kw">char</span> ch, <span class="kw">int</span> freq) { <span class="kw">this</span>.ch=ch; <span class="kw">this</span>.freq=freq; }
    <span class="kw">public int</span> <span class="fn">compareTo</span>(<span class="type">Element</span> that) {
        <span class="kw">return</span> that.freq - <span class="kw">this</span>.freq; <span class="cm">// max-heap by freq</span>
    }
}
<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public</span> <span class="type">String</span> <span class="fn">frequencySort</span>(<span class="type">String</span> s) {
        <span class="type">HashMap</span>&lt;<span class="type">Character</span>,<span class="type">Integer</span>&gt; freqMap = <span class="kw">new</span> <span class="type">HashMap</span>&lt;&gt;();
        <span class="kw">for</span> (<span class="kw">char</span> ch : s.<span class="fn">toCharArray</span>())
            freqMap.<span class="fn">put</span>(ch, freqMap.<span class="fn">getOrDefault</span>(ch, <span class="num">0</span>) + <span class="num">1</span>);

        <span class="type">PriorityQueue</span>&lt;<span class="type">Element</span>&gt; pq = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;();
        <span class="kw">for</span> (<span class="type">Map.Entry</span>&lt;<span class="type">Character</span>,<span class="type">Integer</span>&gt; entry : freqMap.<span class="fn">entrySet</span>())
            pq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">Element</span>(entry.<span class="fn">getKey</span>(), entry.<span class="fn">getValue</span>()));

        <span class="type">StringBuilder</span> sb = <span class="kw">new</span> <span class="type">StringBuilder</span>();
        <span class="kw">while</span> (!pq.<span class="fn">isEmpty</span>()) {
            <span class="type">Element</span> e = pq.<span class="fn">poll</span>();
            <span class="kw">while</span> (e.freq-- &gt; <span class="num">0</span>) sb.<span class="fn">append</span>(e.ch);
        }
        <span class="kw">return</span> sb.<span class="fn">toString</span>();
    }
}`}} /></pre>
              <table className="ds-tbl">
                <thead><tr><th>Step</th><th>Time</th><th>Space</th></tr></thead>
                <tbody>
                  {[
                    ["Frequency map","O(n)","O(k)"],
                    ["Heap insertions","O(k log k)","O(k)"],
                    ["Build result","O(n)","O(n)"],
                    ["Total","O(n + k log k)","O(n + k)"],
                  ].map(([s,t,sp]) => (
                    <tr key={s}><td>{s}</td><td><span className="tc tc-log">{t}</span></td><td><span className="tc tc-1">{sp}</span></td></tr>
                  ))}
                </tbody>
              </table>
              <p className="ds-p" style={{color:"#64748b",fontSize:13}}>k = unique characters ≤ 62. In practice heap ops are nearly constant.</p>
            </>
          ),
        },
        {
          id: "iq3",
          labelText: "Question 03",
          labelColor: tokens.accent3,
          title: "IPO — Maximize Capital",
          navLabel: "IPO",
          render: () => (
            <>
              <div className="callout info">
                <div className="callout-label">Problem</div>
                Given n projects each with <code className="ds-code">profit[i]</code> and required <code className="ds-code">capital[i]</code>, initial capital <code className="ds-code">w</code>, and at most <code className="ds-code">k</code> projects — return the <strong className="ds-strong">maximum capital</strong> achievable.
              </div>
              <h3 className="ds-h3">Greedy Insight</h3>
              <p className="ds-p">At each step, among all projects we can currently afford (capital ≤ w), pick the one with <strong className="ds-strong">maximum profit</strong>. Higher profit now → more projects unlocked next round.</p>
              <h3 className="ds-h3">Two-Heap Strategy</h3>
              <div className="prop-grid">
                <div className="prop-card" style={{borderLeft:`3px solid ${tokens.accent2}`}}>
                  <h4 className="ds-h4" style={{color:tokens.accent2}}>Min-Heap (by capital)</h4>
                  <p className="ds-p" style={{color:"#c8d3e0",marginBottom:0}}>All projects sorted by required capital. Cheapest at top — O(log n) to find newly affordable ones as w grows.</p>
                </div>
                <div className="prop-card" style={{borderLeft:`3px solid ${tokens.accent}`}}>
                  <h4 className="ds-h4">Max-Heap (by profit)</h4>
                  <p className="ds-p" style={{color:"#c8d3e0",marginBottom:0}}>Currently affordable projects. Poll for highest-profit choice in O(log n).</p>
                </div>
              </div>
              <ol className="ds-steps">
                <li><div>Insert all projects into <strong className="ds-strong">min-heap</strong> by capital.</div></li>
                <li><div>Repeat k times: drain all projects with <code className="ds-code">capital ≤ w</code> from min-heap → push profits into max-heap.</div></li>
                <li><div>Poll max-heap → add profit to <code className="ds-code">w</code>. If max-heap empty → break.</div></li>
              </ol>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">Project</span> <span class="kw">implements</span> Comparable&lt;<span class="type">Project</span>&gt; {
    <span class="kw">int</span> profit, capital;
    <span class="fn">Project</span>(<span class="kw">int</span> profit, <span class="kw">int</span> capital) { <span class="kw">this</span>.profit=profit; <span class="kw">this</span>.capital=capital; }
    <span class="kw">public int</span> <span class="fn">compareTo</span>(<span class="type">Project</span> that) {
        <span class="kw">return this</span>.capital - that.capital; <span class="cm">// min-heap by capital</span>
    }
}
<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public int</span> <span class="fn">findMaximizedCapital</span>(<span class="kw">int</span> k, <span class="kw">int</span> w, <span class="kw">int</span>[] profits, <span class="kw">int</span>[] capital) {
        <span class="type">PriorityQueue</span>&lt;<span class="type">Project</span>&gt; minPQ = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;();
        <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; capital.length; i++)
            minPQ.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">Project</span>(profits[i], capital[i]));

        <span class="type">PriorityQueue</span>&lt;<span class="type">Integer</span>&gt; maxPQ = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;(Collections.<span class="fn">reverseOrder</span>());
        <span class="kw">while</span> (k-- &gt; <span class="num">0</span>) {
            <span class="cm">// unlock all affordable projects</span>
            <span class="kw">while</span> (!minPQ.<span class="fn">isEmpty</span>() &amp;&amp; minPQ.<span class="fn">peek</span>().capital &lt;= w)
                maxPQ.<span class="fn">offer</span>(minPQ.<span class="fn">poll</span>().profit);
            <span class="kw">if</span> (maxPQ.<span class="fn">isEmpty</span>()) <span class="kw">break</span>;
            w += maxPQ.<span class="fn">poll</span>(); <span class="cm">// pick most profitable</span>
        }
        <span class="kw">return</span> w;
    }
}`}} /></pre>
              <div className="callout proof">
                <div className="callout-label">Walk-through: k=2, w=0, profits=[1,3], capital=[0,1]</div>
                Round 1: drain → capital 0 ≤ 0 → push profit 1. Poll 1 → w=1, k=1.<br/>
                Round 2: drain → capital 1 ≤ 1 → push profit 3. Poll 3 → w=4, k=0.<br/>
                <strong className="ds-strong">Answer: 4 ✓</strong>
              </div>
              <table className="ds-tbl">
                <thead><tr><th>Operation</th><th>Time</th></tr></thead>
                <tbody>
                  {[
                    ["Build min-heap","O(n log n)"],
                    ["k rounds (each project processed once)","O(n log n)"],
                    ["Total","O(n log n)"],
                  ].map(([op,t]) => (
                    <tr key={op}><td>{op}</td><td><span className="tc tc-nlogn">{t}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </>
          ),
        },
        {
          id: "iq4",
          labelText: "Question 04",
          labelColor: tokens.accent3,
          title: "Design Twitter",
          navLabel: "Design Twitter",
          render: () => (
            <>
              <div className="callout info">
                <div className="callout-label">Problem</div>
                Design a mini Twitter: <code className="ds-code">postTweet</code>, <code className="ds-code">getNewsFeed</code> (10 most recent from self + followees), <code className="ds-code">follow</code>, <code className="ds-code">unfollow</code>.
              </div>
              <h3 className="ds-h3">Data Model</h3>
              <div className="prop-grid">
                <div className="prop-card" style={{borderLeft:`3px solid ${tokens.accent4}`}}>
                  <h4 className="ds-h4" style={{color:tokens.accent4}}>Tweet class</h4>
                  <p className="ds-p" style={{color:"#c8d3e0",marginBottom:0}}><code className="ds-code">tweetId</code> + global <code className="ds-code">time</code> counter. <code className="ds-code">compareTo</code> descending by time → most recent first in max-heap.</p>
                </div>
                <div className="prop-card" style={{borderLeft:`3px solid ${tokens.accent2}`}}>
                  <h4 className="ds-h4" style={{color:tokens.accent2}}>User class</h4>
                  <p className="ds-p" style={{color:"#c8d3e0",marginBottom:0}}><code className="ds-code">HashSet&lt;Integer&gt; followers</code> (includes self) + <code className="ds-code">LinkedList&lt;Tweet&gt; tweets</code> (head = most recent).</p>
                </div>
              </div>
              <p className="ds-p">A global <code className="ds-code">HashMap&lt;Integer,User&gt; userMap</code> maps userId → User for O(1) lookup in every API.</p>
              <h3 className="ds-h3">Key Optimization — LinkedList + Head Insertion</h3>
              <p className="ds-p">Tweets are stored in a <strong className="ds-strong">LinkedList with head insertion</strong> (newest-first). <code className="ds-code">getNewsFeed</code> only reads the first 10 tweets per user — skipping potentially thousands of old ones.</p>
              <div className="callout proof">
                <div className="callout-label">Impact</div>
                User with 1000 tweets → traverse 10, not 1000. Across N followees: N×990 fewer heap insertions saved.
              </div>
              <h3 className="ds-h3 green">Self-follow Trick</h3>
              <p className="ds-p">When creating a User, immediately add their own userId to <code className="ds-code">followers</code>. <code className="ds-code">getNewsFeed</code> then only loops over <code className="ds-code">user.followers</code> — no separate self-tweet block needed.</p>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">Tweet</span> <span class="kw">implements</span> Comparable&lt;<span class="type">Tweet</span>&gt; {
    <span class="kw">int</span> time, tweetId;
    <span class="fn">Tweet</span>(<span class="kw">int</span> t, <span class="kw">int</span> id) { time=t; tweetId=id; }
    <span class="kw">public int</span> <span class="fn">compareTo</span>(<span class="type">Tweet</span> that) { <span class="kw">return</span> that.time - <span class="kw">this</span>.time; } <span class="cm">// most recent first</span>
}
<span class="kw">class</span> <span class="type">User</span> {
    <span class="kw">int</span> userId;
    <span class="type">HashSet</span>&lt;<span class="type">Integer</span>&gt; followers;
    <span class="type">List</span>&lt;<span class="type">Tweet</span>&gt; tweets;
    <span class="fn">User</span>(<span class="kw">int</span> userId) {
        <span class="kw">this</span>.userId = userId;
        followers = <span class="kw">new</span> <span class="type">HashSet</span>&lt;&gt;();
        followers.<span class="fn">add</span>(userId); <span class="cm">// self-follow ← key trick</span>
        tweets = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
    }
    <span class="kw">public void</span> <span class="fn">addTweet</span>(<span class="type">Tweet</span> t)       { tweets.<span class="fn">add</span>(<span class="num">0</span>, t); } <span class="cm">// O(1) head insert</span>
    <span class="kw">public void</span> <span class="fn">addFollower</span>(<span class="kw">int</span> id)     { followers.<span class="fn">add</span>(id); }
    <span class="kw">public void</span> <span class="fn">removeFollower</span>(<span class="kw">int</span> id)  { followers.<span class="fn">remove</span>(id); }
}
<span class="kw">class</span> <span class="type">Twitter</span> {
    <span class="type">HashMap</span>&lt;<span class="type">Integer</span>,<span class="type">User</span>&gt; userMap = <span class="kw">new</span> <span class="type">HashMap</span>&lt;&gt;();
    <span class="kw">int</span> timeCounter = <span class="num">0</span>;

    <span class="kw">public void</span> <span class="fn">postTweet</span>(<span class="kw">int</span> userId, <span class="kw">int</span> tweetId) {
        timeCounter++;
        userMap.<span class="fn">putIfAbsent</span>(userId, <span class="kw">new</span> <span class="type">User</span>(userId));
        userMap.<span class="fn">get</span>(userId).<span class="fn">addTweet</span>(<span class="kw">new</span> <span class="type">Tweet</span>(timeCounter, tweetId));
    }
    <span class="kw">public</span> <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; <span class="fn">getNewsFeed</span>(<span class="kw">int</span> userId) {
        <span class="kw">if</span> (!userMap.<span class="fn">containsKey</span>(userId)) <span class="kw">return new</span> <span class="type">ArrayList</span>&lt;&gt;();
        <span class="type">PriorityQueue</span>&lt;<span class="type">Tweet</span>&gt; pq = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;();
        <span class="type">User</span> user = userMap.<span class="fn">get</span>(userId);
        <span class="kw">for</span> (<span class="kw">int</span> fId : user.followers) {
            <span class="kw">int</span> count = <span class="num">0</span>;
            <span class="kw">for</span> (<span class="type">Tweet</span> tweet : userMap.<span class="fn">get</span>(fId).tweets) {
                pq.<span class="fn">offer</span>(tweet);
                <span class="kw">if</span> (++count &gt; <span class="num">10</span>) <span class="kw">break</span>; <span class="cm">// ← the optimization</span>
            }
        }
        <span class="type">List</span>&lt;<span class="type">Integer</span>&gt; res = <span class="kw">new</span> <span class="type">ArrayList</span>&lt;&gt;();
        <span class="kw">while</span> (!pq.<span class="fn">isEmpty</span>() &amp;&amp; res.<span class="fn">size</span>() &lt; <span class="num">10</span>)
            res.<span class="fn">add</span>(pq.<span class="fn">poll</span>().tweetId);
        <span class="kw">return</span> res;
    }
    <span class="kw">public void</span> <span class="fn">follow</span>(<span class="kw">int</span> followerId, <span class="kw">int</span> followeeId) {
        userMap.<span class="fn">putIfAbsent</span>(followerId, <span class="kw">new</span> <span class="type">User</span>(followerId));
        userMap.<span class="fn">putIfAbsent</span>(followeeId, <span class="kw">new</span> <span class="type">User</span>(followeeId));
        userMap.<span class="fn">get</span>(followerId).<span class="fn">addFollower</span>(followeeId);
    }
    <span class="kw">public void</span> <span class="fn">unfollow</span>(<span class="kw">int</span> followerId, <span class="kw">int</span> followeeId) {
        <span class="kw">if</span> (!userMap.<span class="fn">containsKey</span>(followerId) || !userMap.<span class="fn">containsKey</span>(followeeId)) <span class="kw">return</span>;
        userMap.<span class="fn">get</span>(followerId).<span class="fn">removeFollower</span>(followeeId);
    }
}`}} /></pre>
              <table className="ds-tbl">
                <thead><tr><th>API</th><th>Time</th><th>Why</th></tr></thead>
                <tbody>
                  {[
                    ["postTweet","O(1)","HashMap lookup + LinkedList head insert"],
                    ["follow / unfollow","O(1)","HashMap lookup + HashSet add/remove"],
                    ["getNewsFeed","O(N · 10 log 10)","N followees × 10 tweets × heap ops"],
                  ].map(([api,t,why]) => (
                    <tr key={api}>
                      <td><code className="ds-code">{api}</code></td>
                      <td><span className="tc tc-log">{t}</span></td>
                      <td style={{color:"#64748b",fontSize:13}}>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ),
        },
        {
          id: "iq5",
          labelText: "Question 05",
          labelColor: tokens.accent3,
          title: "Task Scheduler",
          navLabel: "Task Scheduler",
          render: () => (
            <>
              <div className="callout info">
                <div className="callout-label">Problem</div>
                Given CPU tasks and cooldown <code className="ds-code">n</code> — same task cannot run again within <code className="ds-code">n</code> intervals. Return <strong className="ds-strong">minimum total intervals</strong> to finish all tasks.
              </div>
              <h3 className="ds-h3">Greedy Insight</h3>
              <p className="ds-p">At each time unit, if a task is available, always pick the one with <strong className="ds-strong">highest remaining frequency</strong>. Frequent tasks need the most cooldown gaps — finishing them early leaves room for others and minimizes idle time.</p>
              <div className="callout warn">
                <div className="callout-label">Naive vs Greedy</div>
                Random order: [C,C,C,Z,Z,M,M], n=1 → up to 9 intervals.<br/>
                Greedy (highest freq first) → <strong className="ds-strong">7 intervals</strong>.
              </div>
              <h3 className="ds-h3">Three Building Blocks</h3>
              <div className="prop-grid">
                <div className="prop-card">
                  <h4 className="ds-h4">Frequency Map</h4>
                  <p className="ds-p" style={{color:"#c8d3e0",marginBottom:0}}>Count each task type with a <code className="ds-code">HashMap</code>.</p>
                </div>
                <div className="prop-card">
                  <h4 className="ds-h4" style={{color:tokens.accent2}}>Max-Heap (by freq)</h4>
                  <p className="ds-p" style={{color:"#c8d3e0",marginBottom:0}}>After each operation the max-freq task changes. Heap gives it in O(log n) without re-sorting.</p>
                </div>
                <div className="prop-card" style={{gridColumn:"1/-1", borderLeft:`3px solid ${tokens.accent4}`}}>
                  <h4 className="ds-h4" style={{color:tokens.accent4}}>Cooldown Queue</h4>
                  <p className="ds-p" style={{color:"#c8d3e0",marginBottom:0}}>After processing a task, store it with <code className="ds-code">executionTime = currentTime + n</code>. When the queue front's executionTime matches current time, move it back to the heap — cooldown over.</p>
                </div>
              </div>
              <div className="trick-box">
                <div className="trick-title">Walk-through: [C,C,C,Z,Z,M,M], n=1 — freqs: C=3, Z=2, M=2</div>
                <table className="ds-tbl" style={{margin:0,fontSize:12}}>
                  <thead><tr><th>t</th><th>Heap top</th><th>Action</th><th>Queue</th></tr></thead>
                  <tbody>
                    {[
                      ["1","C(3)","Process C→freq=2, nextExec=2","C(2,t2)"],
                      ["2","Z(2)","Process Z→freq=1, nextExec=3 | C(t2) released→heap","Z(1,t3)"],
                      ["3","C(2)","Process C→freq=1, nextExec=4 | Z(t3) released→heap","C(1,t4)"],
                      ["4","M(2)","Process M→freq=1, nextExec=5 | C(t4) released→heap","M(1,t5)"],
                      ["5","C(1)","Process C→freq=0 done | M(t5) released→heap","–"],
                      ["6","Z(1)","Process Z→freq=0 done","–"],
                      ["7","M(1)","Process M→freq=0 done","–"],
                    ].map(([t,h,a,q]) => (
                      <tr key={t}>
                        <td style={{color:tokens.accent}}>{t}</td>
                        <td><code className="ds-code">{h}</code></td>
                        <td style={{color:"#c8d3e0",fontSize:11}}>{a}</td>
                        <td style={{color:"#64748b",fontSize:11}}>{q}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="ds-p" style={{color:tokens.accent3,marginTop:8,marginBottom:0}}>Total = 7 intervals ✓</p>
              </div>
              <h3 className="ds-h3 green">Bonus: The O(1) Space Math Approach</h3>
              <p className="ds-p">Interviewers often ask if you can solve this without simulating the queue. We can calculate the exact idle slots needed using math.</p>
              <ol className="ds-steps">
                <li><div>Find the maximum frequency of any task (<code className="ds-code">maxFreq</code>).</div></li>
                <li><div>Count how many tasks share that maximum frequency (<code className="ds-code">numMaxFreqTasks</code>).</div></li>
                <li><div>Calculate the total length: <br/><code className="ds-code">ans = (maxFreq - 1) * (n + 1) + numMaxFreqTasks</code></div></li>
              </ol>
              <div className="callout proof">
                <div className="callout-label">Why the formula works?</div>
                Imagine the most frequent task is 'A' (count=3) and n=2. We arrange them as anchors: <br/>
                <code className="ds-code">A _ _ | A _ _ | A</code> <br/>
                The number of blocks we need is <code className="ds-code">(maxFreq - 1)</code>. The size of each block is <code className="ds-code">(n + 1)</code>. The final block just contains the tasks that also had the maximum frequency. If the calculated answer is less than <code className="ds-code">tasks.length</code>, it means we had enough tasks to fill all idle slots naturally, so we just return <code className="ds-code">tasks.length</code>!
              </div>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">public int</span> <span class="fn">leastInterval</span>(<span class="kw">char</span>[] tasks, <span class="kw">int</span> n) {
    <span class="kw">int</span>[] counts = <span class="kw">new int</span>[<span class="num">26</span>];
    <span class="kw">int</span> maxFreq = <span class="num">0</span>, numMaxFreqTasks = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">char</span> c : tasks) {
        counts[c - <span class="str">'A'</span>]++;
        <span class="kw">if</span> (counts[c - <span class="str">'A'</span>] &gt; maxFreq) {
            maxFreq = counts[c - <span class="str">'A'</span>];
            numMaxFreqTasks = <span class="num">1</span>;
        } <span class="kw">else if</span> (counts[c - <span class="str">'A'</span>] == maxFreq) {
            numMaxFreqTasks++;
        }
    }
    <span class="kw">int</span> ans = (maxFreq - <span class="num">1</span>) * (n + <span class="num">1</span>) + numMaxFreqTasks;
    <span class="kw">return</span> Math.<span class="fn">max</span>(ans, tasks.length);
}`}} /></pre>
              <pre className="ds-pre"><code dangerouslySetInnerHTML={{__html:`<span class="kw">class</span> <span class="type">Task</span> <span class="kw">implements</span> Comparable&lt;<span class="type">Task</span>&gt; {
    <span class="kw">int</span> frequency, executionTime;
    <span class="fn">Task</span>(<span class="kw">int</span> f, <span class="kw">int</span> t) { frequency=f; executionTime=t; }
    <span class="kw">public int</span> <span class="fn">compareTo</span>(<span class="type">Task</span> that) {
        <span class="kw">return</span> that.frequency - <span class="kw">this</span>.frequency; <span class="cm">// max-heap by frequency</span>
    }
}
<span class="kw">class</span> <span class="type">Solution</span> {
    <span class="kw">public int</span> <span class="fn">leastInterval</span>(<span class="kw">char</span>[] tasks, <span class="kw">int</span> n) {
        <span class="type">HashMap</span>&lt;<span class="type">Character</span>,<span class="type">Integer</span>&gt; freqMap = <span class="kw">new</span> <span class="type">HashMap</span>&lt;&gt;();
        <span class="kw">for</span> (<span class="kw">char</span> ch : tasks)
            freqMap.<span class="fn">put</span>(ch, freqMap.<span class="fn">getOrDefault</span>(ch, <span class="num">0</span>) + <span class="num">1</span>);

        <span class="type">PriorityQueue</span>&lt;<span class="type">Task</span>&gt; pq = <span class="kw">new</span> <span class="type">PriorityQueue</span>&lt;&gt;();
        <span class="kw">for</span> (<span class="kw">char</span> ch : freqMap.<span class="fn">keySet</span>())
            pq.<span class="fn">offer</span>(<span class="kw">new</span> <span class="type">Task</span>(freqMap.<span class="fn">get</span>(ch), <span class="num">0</span>));

        <span class="type">Queue</span>&lt;<span class="type">Task</span>&gt; queue = <span class="kw">new</span> <span class="type">LinkedList</span>&lt;&gt;();
        <span class="kw">int</span> time = <span class="num">0</span>;
        <span class="kw">while</span> (!pq.<span class="fn">isEmpty</span>() || !queue.<span class="fn">isEmpty</span>()) {
            time++;
            <span class="kw">if</span> (!pq.<span class="fn">isEmpty</span>()) {
                <span class="type">Task</span> task = pq.<span class="fn">poll</span>();
                task.frequency--;
                <span class="kw">if</span> (task.frequency &gt; <span class="num">0</span>) {
                    task.executionTime = time + n; <span class="cm">// cooldown end</span>
                    queue.<span class="fn">offer</span>(task);
                }
            }
            <span class="kw">if</span> (!queue.<span class="fn">isEmpty</span>() &amp;&amp; queue.<span class="fn">peek</span>().executionTime == time)
                pq.<span class="fn">offer</span>(queue.<span class="fn">poll</span>()); <span class="cm">// cooldown over → back to heap</span>
        }
        <span class="kw">return</span> time;
    }
}`}} /></pre>
              <table className="ds-tbl">
                <thead><tr><th>Phase</th><th>Time</th><th>Space</th></tr></thead>
                <tbody>
                  {[
                    ["Freq map","O(n)","O(26) = O(1)"],
                    ["Heap build","O(26 log 26) = O(1)","O(26)"],
                    ["Simulation","O(n log 26) ≈ O(n)","O(26)"],
                    ["Total","O(n)","O(1)*"],
                  ].map(([p,t,s]) => (
                    <tr key={p}><td>{p}</td><td><span className="tc tc-log">{t}</span></td><td><span className="tc tc-1">{s}</span></td></tr>
                  ))}
                </tbody>
              </table>
              <p className="ds-p" style={{color:"#64748b",fontSize:13}}>* At most 26 distinct task types → heap and queue sizes are bounded by 26 (constant).</p>
            </>
          ),
        },
      ],
};
