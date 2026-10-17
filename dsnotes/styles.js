import { tokens } from "./tokens";

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=JetBrains+Mono:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg: ${tokens.bg};
    --surface: ${tokens.surface};
    --surface-2: ${tokens.surface2};
    --border: ${tokens.border};
    --accent: ${tokens.accent};
    --accent-2: ${tokens.accent2};
    --accent-3: ${tokens.accent3};
    --accent-4: ${tokens.accent4};
    --accent-5: ${tokens.accent5};
    --danger: ${tokens.danger};
    --text: ${tokens.text};
    --muted: ${tokens.muted};
    --code-bg: ${tokens.codeBg};
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body, #root {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    line-height: 1.8;
    font-size: 16px;
    min-height: 100vh;
  }

  button { font: inherit; }
  ::selection { background: rgba(240, 165, 0, 0.28); }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }

  .kw { color: #c792ea; }
  .fn { color: #82aaff; }
  .cm { color: #546e7a; font-style: italic; }
  .str { color: #c3e88d; }
  .num { color: #f78c6c; }
  .type { color: #ffcb6b; }
  .ann { color: var(--accent); }

  .hi { color: var(--accent); font-weight: 500; }
  .hi2 { color: var(--accent-2); font-weight: 500; }
  .hi3 { color: var(--accent-3); font-weight: 500; }
  .hi4 { color: var(--accent-4); font-weight: 500; }

  .ds-p { margin-bottom: 14px; color: #c8d3e0; }
  .ds-ul { padding-left: 20px; margin: 10px 0; }
  .ds-ul li { margin: 6px 0; color: #c8d3e0; }
  .ds-strong { color: var(--text); font-weight: 500; }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .ds-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3vw, 28px);
    color: #fff;
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }
  .ds-h3 { font-weight: 500; font-size: 17px; color: var(--accent-2); margin: 28px 0 12px; }
  .ds-h3.green { color: var(--accent-3); }
  .ds-h3.purple { color: var(--accent-4); }
  .ds-h3.amber { color: var(--accent); }
  .ds-h4 {
    font-size: 14px;
    font-weight: 500;
    color: var(--accent-3);
    margin: 18px 0 8px;
    font-family: 'JetBrains Mono', monospace;
  }

  .ds-pre {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 18px 22px;
    overflow-x: auto;
    margin: 14px 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    line-height: 1.75;
  }
  .ds-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    background: rgba(255,255,255,0.06);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--text);
  }

  .callout {
    border-radius: 8px;
    padding: 14px 18px;
    margin: 18px 0;
    border-left: 3px solid;
    font-size: 14px;
  }
  .callout-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-weight: 600;
  }
  .callout.info { background: rgba(59,130,246,0.07); border-color: var(--accent-2); }
  .callout.warn { background: rgba(240,165,0,0.07); border-color: var(--accent); }
  .callout.proof { background: rgba(16,185,129,0.07); border-color: var(--accent-3); }
  .callout.danger { background: rgba(239,68,68,0.07); border-color: var(--danger); }
  .callout.purple { background: rgba(167,139,250,0.07); border-color: var(--accent-4); }
  .callout.info .callout-label { color: var(--accent-2); }
  .callout.warn .callout-label { color: var(--accent); }
  .callout.proof .callout-label { color: var(--accent-3); }
  .callout.danger .callout-label { color: var(--danger); }
  .callout.purple .callout-label { color: var(--accent-4); }

  .formula {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 18px;
    margin: 14px 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--accent);
    text-align: center;
  }
  .formula-label {
    font-size: 10px;
    color: var(--muted);
    margin-bottom: 5px;
    text-align: left;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .ds-tbl { width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 13.5px; }
  .ds-tbl th {
    background: var(--surface-2);
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .ds-tbl td { padding: 9px 14px; border-bottom: 1px solid var(--border); color: #c8d3e0; }
  .ds-tbl tr:last-child td { border-bottom: none; }
  .ds-tbl tr:hover td { background: var(--surface); }

  .tc { font-family: 'JetBrains Mono', monospace; font-weight: 600; }
  .tc-log { color: var(--accent-2); }
  .tc-n, .tc-1 { color: var(--accent-3); }
  .tc-nlogn { color: var(--accent); }
  .tc-bad { color: var(--danger); }

  .ds-steps { counter-reset: step; list-style: none; padding: 0; margin: 14px 0; }
  .ds-steps li { counter-increment: step; display: flex; gap: 14px; margin-bottom: 14px; align-items: flex-start; }
  .ds-steps li::before {
    content: counter(step);
    min-width: 26px;
    height: 26px;
    background: var(--accent);
    color: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
    flex-shrink: 0;
    margin-top: 3px;
  }
  .ds-steps li div { flex: 1; color: #c8d3e0; }

  .prop-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin: 18px 0; }
  .prop-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px 18px; }
  .prop-card .ds-h4 { margin-top: 0; }
  .diagram-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 22px;
    margin: 18px 0;
    text-align: center;
    overflow-x: auto;
  }
  .diagram-wrap figcaption {
    font-size: 11px;
    color: var(--muted);
    margin-top: 10px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 1px;
  }
  .trick-box {
    background: linear-gradient(135deg, rgba(240,165,0,0.05), rgba(16,185,129,0.05));
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 18px 20px;
    margin: 18px 0;
  }
  .trick-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .badge {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 3px;
    letter-spacing: 1px;
    font-weight: 600;
  }
  .badge-a { background: rgba(16,185,129,0.15); color: var(--accent-3); }
  .badge-b { background: rgba(167,139,250,0.15); color: var(--accent-4); }
  .divider { height: 1px; background: linear-gradient(to right, transparent, var(--border), transparent); margin: 44px 0; }
  .fade-in { animation: fadeIn 0.25s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  .ds-app {
    display: flex;
    min-height: 100vh;
    background:
      radial-gradient(circle at 82% 12%, rgba(59,130,246,0.08), transparent 28rem),
      linear-gradient(180deg, rgba(255,255,255,0.015), transparent 18rem),
      var(--bg);
  }
  .ds-main {
    flex: 1;
    min-width: 0;
    transition: margin-left 0.25s ease;
  }
  .ds-document {
    flex: 1;
    min-width: 0;
  }
  .ds-sidebar-toggle {
    position: fixed;
    top: 20px;
    z-index: 200;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ds-sidebar-toggle:hover { color: var(--text); border-color: rgba(255,255,255,0.22); }
  .ds-sidebar {
    width: 264px;
    min-height: 100vh;
    background: rgba(10,12,16,0.96);
    border-right: 1px solid var(--border);
    position: fixed;
    inset: 0 auto 0 0;
    overflow-y: auto;
    z-index: 100;
    padding-bottom: 40px;
    transition: transform 0.25s ease;
    backdrop-filter: blur(12px);
  }
  .ds-sidebar-header {
    padding: 24px 20px 16px;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: rgba(10,12,16,0.98);
    z-index: 1;
  }
  .ds-overline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: var(--muted);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .ds-brand {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    margin-top: 6px;
  }
  .ds-sidebar-group-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 20px 4px;
    color: var(--muted);
  }
  .ds-node-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    border-left: 3px solid transparent;
    user-select: none;
  }
  .ds-node-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    flex-shrink: 0;
  }
  .ds-node-children { padding-left: 20px; border-left: 1px solid var(--border); margin-left: 29px; }
  .ds-tab-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px 8px 8px;
    font-size: 11.5px;
    font-family: 'JetBrains Mono', monospace;
    color: var(--muted);
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .ds-section-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px 5px 20px;
    font-size: 12px;
    color: var(--muted);
    text-decoration: none;
    border-radius: 4px;
  }
  .ds-section-link:hover { color: var(--text); }
  .ds-header {
    background: linear-gradient(135deg, rgba(13,15,20,0.98) 0%, rgba(20,23,32,0.94) 62%, rgba(10,14,26,0.98) 100%);
    border-bottom: 1px solid var(--border);
    padding: 52px 48px 36px;
    position: relative;
    overflow: hidden;
  }
  .ds-header::after {
    content: "";
    position: absolute;
    inset: auto 48px 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--active-color), transparent);
    opacity: 0.5;
  }
  .ds-kicker {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--active-color);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .ds-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 12px;
  }
  .ds-summary {
    color: var(--muted);
    font-size: 14px;
    max-width: 640px;
  }
  .ds-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 22px;
  }
  .ds-stat {
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.03);
    border-radius: 999px;
    padding: 5px 10px;
    color: #b7c3d3;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
  }
  .ds-tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
    background: rgba(20,23,32,0.96);
    position: sticky;
    top: 0;
    z-index: 50;
    overflow-x: auto;
    backdrop-filter: blur(12px);
  }
  .ds-tab-button {
    padding: 14px 24px;
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    cursor: pointer;
    background: none;
    border: 0;
    border-bottom: 2px solid transparent;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .ds-tab-button:hover { color: var(--text); }
  .ds-content { padding: 40px 48px 80px; max-width: 1040px; }
  .ds-empty {
    border: 1px dashed var(--border);
    background: rgba(255,255,255,0.025);
    border-radius: 8px;
    padding: 24px;
    color: var(--muted);
  }

  @media (max-width: 860px) {
    .ds-sidebar { box-shadow: 0 18px 70px rgba(0,0,0,0.45); }
    .ds-header { padding: 42px 24px 28px; }
    .ds-content { padding: 30px 22px 64px; }
    .prop-grid { grid-template-columns: 1fr; }
  }
`;
